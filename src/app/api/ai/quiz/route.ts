import { NextResponse } from 'next/server';
import { aiService } from '@/features/ai/ai-service';
import { auth } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
        }

        const { topic, category, persona } = await req.json();

        if (!topic || !category) {
            return NextResponse.json({ error: 'Topic and category are required' }, { status: 400 });
        }

        const systemPrompt = `You are an expert teaching assistant.
Generate a 3-question conceptual micro-quiz about the topic "${topic}" under the category "${category}".
The persona you should adapt for explanations is "${persona === 'buddy' ? 'Code Buddy' : 'Senior Architect'}".

You MUST return a JSON object matching this exact TypeScript structure:

interface QuizQuestion {
    question: string;
    options: string[]; // exactly 4 choices
    correctAnswer: number; // 0-indexed index of the correct option (0, 1, 2, or 3)
    explanation: string; // clear explanation of why this option is correct
}

interface Quiz {
    topic: string;
    questions: QuizQuestion[];
}

Return ONLY the JSON object. Do not wrap in markdown or add extra text.
`;

        const messages = [
            { role: 'system' as const, content: systemPrompt },
            { role: 'user' as const, content: `Generate a 3-question micro-quiz for "${topic}" in JSON format.` }
        ];

        const responseText = await aiService.complete(messages, 'creative', true);
        const quizData = JSON.parse(responseText);

        return NextResponse.json(quizData);
    } catch (error) {
        console.error('Quiz generation error:', error);
        return NextResponse.json({ error: 'Failed to generate quiz' }, { status: 500 });
    }
}
