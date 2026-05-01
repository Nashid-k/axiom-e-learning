import { AIMemory } from '@/lib/db/models';
import { aiService } from './ai-service';
import { Logger } from '@/lib/api/logger';
import { connectToDatabase } from '@/lib/db/mongodb';

export class MemoryService {
    static async reflectAndSync(userId: string, messages: { role: string; content: string; feedback?: string }[]) {
        if (!userId || messages.length < 2) return;

        try {
            await connectToDatabase();

            const currentMemory = await AIMemory.findOne({ userId });

            const recentHistory = messages.slice(-10).map(m => {
                const feedbackTag = m.feedback ? ` [USER FEEDBACK: ${m.feedback.toUpperCase()}]` : "";
                const truncatedContent = m.content.length > 2000 ? m.content.slice(0, 2000) + '...[truncated]' : m.content;
                return `${m.role.toUpperCase()}: ${truncatedContent}${feedbackTag}`;
            }).join('\n---\n');

            const currentFacts = currentMemory?.facts?.join(', ') || 'None';
            const currentInterests = currentMemory?.interests?.join(', ') || 'None';

            const reflectionPrompt = `
You are Maya's "Internal Memory Processor". Your job is to analyze a conversation and update Maya's "Long-Term Memory" about the user.

**CURRENT KNOWLEDGE:**
Facts: ${currentFacts}
Interests: ${currentInterests}

**RECENT CONVERSATION (with User Feedback labels):**
${recentHistory}

**TASK:**
1. Identify 1-2 NEW permanent facts about the user.
2. Identify 1-2 technical interests or topics.
3. Observe the "USER FEEDBACK" tags. If a response was marked "BAD", identify why (e.g., "Too formal", "Too complex", "Wrong code") and add it as a "Weakness" to avoid.
4. Provide a brief "Reflection" (1 sentence) about what they learned or how Maya should adjust her tone.

**OUTPUT FORMAT (JSON ONLY):**
{
  "newFacts": ["fact 1", "fact 2"],
  "newInterests": ["interest 1", "interest 2"],
  "newWeaknesses": ["thing to avoid"],
  "reflection": {
    "topic": "topic name",
    "insight": "the insight"
  }
}
If no new info is found, return empty arrays.
`;

            const content = await aiService.complete(
                [
                    { role: 'system', content: 'You are a precise data extraction tool. Output valid JSON only.' },
                    { role: 'user', content: reflectionPrompt }
                ],
                'fast',
                true
            );

            let result;
            try {
                result = JSON.parse(content || '{}');
            } catch {
                Logger.error('Memory reflection: malformed JSON from AI', { requestId: `reflect-${Date.now()}`, userId }, new Error('JSON parse failed'));
                return;
            }

            if (result.newFacts || result.newInterests || result.newWeaknesses || result.reflection) {
                const updateOps: Record<string, unknown> = {
                    $push: {
                        reflections: {
                            $each: result.reflection ? [result.reflection] : [],
                            $slice: -10
                        }
                    },
                    $set: { lastInteraction: new Date() }
                };

                if (result.newFacts?.length) {
                    (updateOps.$push as Record<string, unknown>).facts = {
                        $each: result.newFacts.slice(0, 5),
                        $slice: -50
                    };
                }
                if (result.newInterests?.length) {
                    (updateOps.$push as Record<string, unknown>).interests = {
                        $each: result.newInterests.slice(0, 5),
                        $slice: -50
                    };
                }
                if (result.newWeaknesses?.length) {
                    (updateOps.$push as Record<string, unknown>).weaknesses = {
                        $each: result.newWeaknesses.slice(0, 5),
                        $slice: -50
                    };
                }

                await AIMemory.findOneAndUpdate(
                    { userId },
                    updateOps,
                    { upsert: true }
                );
                const context = { requestId: `reflect-${Date.now()}` };
                Logger.info('Memory reflection synced', { ...context, userId, newFacts: result.newFacts?.length, newWeaknesses: result.newWeaknesses?.length });
            }

        } catch (error) {
            const context = { requestId: `reflect-err-${Date.now()}` };
            Logger.error('Memory reflection failed', { ...context, userId }, error as Error);
        }
    }
}
