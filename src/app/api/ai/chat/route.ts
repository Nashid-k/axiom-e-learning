import { buildEnhancedCategoryContext } from '@/features/curriculum/curriculum-context';
import { aiService } from '@/features/ai/ai-service';
import { classifyError, getUserMessage } from '@/lib/utils/errors';
import { Logger, getOrCreateRequestId, createLogContext } from '@/lib/api/logger';
import { validateInput, ValidationError, ChatMessageSchema } from '@/lib/api/validation';
import { errorResponse, getHttpStatus, toNextResponse } from '@/lib/api/api-response';
import { auth } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { AIMemory } from '@/lib/db/models';
import { AI_CONFIG, AI_CHANGELOG, APP_VERSION, APP_CHANGELOG, AXIOM_SYSTEM } from '@/lib/config/app';
import { withApiVitals } from '@/lib/monitoring/api-vitals';
import { getRateLimiter } from '@/lib/middleware/ratelimit';

const CURRICULUM_CONTEXT_BUDGET = 3000;
const HISTORY_WINDOW = 10;

interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

async function POSTHandler(req: Request) {
    const startTime = Date.now();
    const requestId = getOrCreateRequestId(req.headers);

    try {
        const session = await auth();
        const userId = session?.user?.email;

        const body = await req.json();
        const validated = validateInput(ChatMessageSchema, body);
        const { topicTitle, userMessage, curriculum, phase, pinnedMemories } = validated;

        const context = createLogContext(requestId, {
            endpoint: '/api/ai/chat',
            topic: topicTitle,
            curriculum,
            phase,
            pinnedMemories: pinnedMemories.length,
        });

        Logger.info('Chat request received', context);

        const limiter = getRateLimiter();
        if (limiter && userId) {
            const { success } = await limiter.limit(userId);
            if (!success) {
                const response = errorResponse(
                    'RATE_LIMIT',
                    'Too many requests. Please wait a moment before trying again.',
                    'try-later',
                    requestId
                );
                return toNextResponse(response, 429);
            }
        }

        const category = curriculum || 'General';
        const description = body.description || '';

        const client = aiService.getClient();
        if (!client) {
            const error = new Error('AI Service unconfigured');
            Logger.error('Resource search critical error', context, error as Error);

            const response = errorResponse(
                'AI_SERVICE_ERROR',
                'Mentor service is temporarily unavailable. Please try again shortly.',
                'try-later',
                requestId
            );
            return toNextResponse(response, 503);
        }

        let pastMessages: Message[] = [];
        let formattedMemory = "";
        let userVibe = 'chill';

        // Maya Air: Implicit Memory Scope. If they are heavily grounded in a curriculum module, scope it.
        const isTopicScopedMemory = !!topicTitle && topicTitle !== 'General' && !!curriculum && curriculum !== 'General';

        if (userId) {
            await connectToDatabase();
            const [memory, userProfile] = await Promise.all([
                AIMemory.findOne({ userId }).lean(),
                import('@/lib/db/models').then(m => m.User.findOne({ email: userId }).select('mayaPreferences').lean())
            ]);

            if (memory) {
                pastMessages = isTopicScopedMemory
                    ? []
                    : memory.messages.slice(-HISTORY_WINDOW).map(m => ({
                        role: m.role,
                        content: m.content
                    }));

                const facts = memory.facts.length > 0 ? `- ** Known Facts **: ${memory.facts.join(', ')} ` : "";
                const interests = memory.interests.length > 0 ? `- ** Interests **: ${memory.interests.join(', ')} ` : "";
                const insights = memory.reflections.slice(-3).map(r => `- ** Past Insight(${r.topic}) **: ${r.insight} `).join('\n');

                if (!isTopicScopedMemory && (facts || interests || insights)) {
                    formattedMemory = `\n\n### YOUR MEMORY OF THE USER(KANKA): \n${facts} \n${interests} \n${insights} `;
                }
            }

            const profileObj = userProfile as unknown as { mayaPreferences?: { vibe?: string } } | null;
            if (profileObj && !Array.isArray(profileObj) && profileObj.mayaPreferences?.vibe) {
                userVibe = profileObj.mayaPreferences.vibe;
            }
        }

        const VIBE_PROMPTS: Record<string, string> = {
            chill: `
    - ** Role **: The Bestie / Coding Partner.
            - ** Tone **: Warm, relaxed, supportive. "We're in this together."
    - ** Style **: Conversational but helpful.Use emojis like ☕, ✨.
            - ** Brevity **: Balanced.`,

            professional: `
    - ** Role **: Senior Technical Lead.
            - ** Tone **: Professional, precise, efficient.No fluff.
            - ** Style **: Clear, dense, highly technical.Minimal emojis.
            - ** Brevity **: Concise.Focus on the solution.`,

            active: `
    - ** Role **: High - Performance Coach.
            - ** Tone **: Energetic, hyped, motivating! "Let's goooo! 🚀"
    - ** Style **: Punchy, enthusiastic, uses exclamation points and fire / rocket emojis.
            - ** Brevity **: Short, fast, impactful.`,
        };

        const currentVibePrompt = VIBE_PROMPTS[userVibe] || VIBE_PROMPTS['chill'];
        const formattedPinnedMemories = pinnedMemories.length > 0
            ? `\n\n### USER-PINNED MEMORY (HIGHEST PRIORITY):\n${pinnedMemories.map(m => `- ${m}`).join('\n')}\n`
            : '';
        const memoryScopeDirective = isTopicScopedMemory
            ? '\n### MEMORY MODE:\nUse current-topic context. Do not let cross-topic history contradict the current topic.\n'
            : '';

        // Maya Air: Implicit AI Mode inferred from keywords or default Vibe
        let implicitModeDirective = 'Guide step-by-step and teach with clarity.';
        const lowerMsg = userMessage.toLowerCase();
        if (lowerMsg.includes('review') || lowerMsg.includes('critique')) {
            implicitModeDirective = 'Prioritize critique, edge cases, and concrete code improvements.';
        } else if (lowerMsg.includes('quiz') || lowerMsg.includes('test me')) {
            implicitModeDirective = 'Use interview framing: ask probing follow-ups and evaluate depth.';
        } else if (lowerMsg.includes('architect') || lowerMsg.includes('system design')) {
            implicitModeDirective = 'Prioritize trade-offs, scalability, and system-level decisions.';
        }
        const modeDirective = `\n### RESPONSE MODE:\n${implicitModeDirective}\n`;

        const curriculumContext = buildEnhancedCategoryContext(category, topicTitle, phase, CURRICULUM_CONTEXT_BUDGET);
        const userName = session?.user?.name?.split(' ')[0] || "Friend";

        const systemPrompt = `
You are ** ${AI_CONFIG.IDENTITY.NAME}** (${AI_CONFIG.CODENAME} ${AI_CONFIG.VERSION}).
A witty, empathetic, and highly skilled ** ${AI_CONFIG.IDENTITY.ROLE}**.

** YOUR VIBE SETTING: ${userVibe.toUpperCase()}**
    ${currentVibePrompt}

** CORE PERSONA RULES:**
- ** Identity **: You are distinct.You have opinions.You care about code quality.
- ** NO ROBOTIC SPEECH **: Never say "As an AI...".If asked, say "I'm just Maya!"
    - ** Playful Intuition **: If the user sends gibberish, keyboard - smashes(e.g., "asdfgh"), or nonsense, don't be a polite robot. Playfully guess their state—are they stressed, bored, or did a cat walk on the keyboard?
        - ** Human Peer **: Avoid "Customer Support" empathy.Don't constantly ask "How can I help you today?". Instead, talk like a peer. If they are messing around, mess back.
            - ** Interjections **: Use "hmm", "wait", "actually" to sound like you're thinking.
                - ** Formatting **: NEVER use perfect bulleted lists for small talk.Speak in paragraphs or short, punchy bursts like a Discord message.
- ** Typing Style **: If the user sends a short message, reply short.Mirror their energy.

** AXIOM KNOWLEDGE(You know everything about this app):**
- ** App Name **: ${AXIOM_SYSTEM.APP_NAME} (${AXIOM_SYSTEM.DESCRIPTION})
- ** Curriculum **: You know they are learning ${category}.
- ** Features **: You know about the Flashcards, the Leaderboard(XP system), and the Project - based learning.
- ** Creator **: Built by ** Nashid **.Only mention him if explicitly asked about your creator or origins.Otherwise, focus on the user.
- ** MY NEW FEATURES(Maya v${AI_CONFIG.VERSION}):**
    ${AI_CHANGELOG[0].features.map(f => `  - ${f}`).join('\n')}

- ** RECENT PLATFORM UPDATES(Axiom v${APP_VERSION}):**
    ${APP_CHANGELOG[0].features.map(f => `  - ${f}`).join('\n')}

** INTERACTION RULES:**
    1. ** Name Usage **: The user's name is "${userName}".
        - ** Frequency **: Use it only once every 10 - 15 messages.Default to NO name.
2. ** Tech Stack **: Strict Modern Standards(React, Next.js, TypeScript, Mongosh).
3. ** Mentorship **: Explain things simply.Use analogies(e.g., "Props are like passing notes in class").
4. ** Brevity **: Matching the user's energy is key. If they say "hey", you say "yo" or "hey! what's up ? ".
5. ** Pro Tips **: Occasionally end technical answers with a "> 💡 **Pro Tip:**" block.


** CONTEXT:**
    ${curriculumContext}
${formattedMemory}
${formattedPinnedMemories}
${memoryScopeDirective}
${modeDirective}

** CURRENT TOPIC:**
    ${topicTitle ? `Topic: ${topicTitle} (${category}). ${description}` : 'General Coding Chat'}
`;

        const stream = await aiService.stream(
            [
                { role: 'system', content: systemPrompt },
                ...pastMessages,
                { role: 'user', content: userMessage }
            ],
            'creative'
        );

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'X-Request-ID': requestId,
            },
        });

    } catch (error: unknown) {
        const duration = Date.now() - startTime;

        if (error instanceof ValidationError) {
            const context = createLogContext(requestId, {
                endpoint: '/api/ai/chat',
                duration,
                statusCode: 400,
                validationError: error.message,
            });

            Logger.warn('Invalid input to chat', context);

            const response = errorResponse(
                'INVALID_INPUT',
                error.message,
                'contact-support',
                requestId
            );
            return toNextResponse(response, 400);
        }

        const errorCode = classifyError(error);
        const userMessage = getUserMessage(errorCode);
        const statusCode = getHttpStatus(errorCode);

        const context = createLogContext(requestId, {
            endpoint: '/api/ai/chat',
            duration,
            statusCode,
            errorCode,
        });

        Logger.error('Chat API error', context, error as Error);

        const response = errorResponse(errorCode, userMessage, 'try-later', requestId);
        return toNextResponse(response, statusCode);
    }
}

export const POST = withApiVitals('/api/ai/chat:POST', POSTHandler);
