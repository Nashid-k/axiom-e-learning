import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/utils/security';

const AutocompleteSchema = z.object({
    prefix: z.string().max(2000),
    suffix: z.string().max(1000).optional(),
    language: z.string().optional()
});

function hasValidAccessToken(req: NextRequest): boolean {
    const expectedToken = process.env.AGENT_ACCESS_TOKEN;
    if (!expectedToken) return false;

    // Check headers
    const authHeader = req.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ') && authHeader.split(' ')[1] === expectedToken) return true;

    const agentTokenHeader = req.headers.get('x-agent-access-token');
    if (agentTokenHeader === expectedToken) return true;

    // Check query params
    const tokenParam = req.nextUrl.searchParams.get('token');
    if (tokenParam === expectedToken) return true;

    return false;
}

export async function POST(req: NextRequest) {
    try {
        if (!hasValidAccessToken(req)) {
            return NextResponse.json({ error: 'Unauthorized Access. Invalid Agent Token.' }, { status: 401 });
        }

        const body = await req.json();
        const parsed = AutocompleteSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        const { prefix, suffix, language } = parsed.data;

        // Use a fast model for autocomplete
        const GROQ_API_KEY = process.env.GROQ_API_KEY_1;
        if (!GROQ_API_KEY) {
            return NextResponse.json({ error: 'Groq API Key missing' }, { status: 500 });
        }

        const systemPrompt = `You are a strict code autocomplete engine for ${language || 'code'}. 
You will be given the code BEFORE the cursor, and the code AFTER the cursor.
You must output ONLY the code that belongs exactly where the cursor is.
DO NOT use markdown formatting (no \`\`\` wrappers).
DO NOT explain anything.
DO NOT repeat the prefix or suffix.
ONLY output the missing middle chunk.`;

        const userPrompt = `PREFIX:\n${prefix}\n\nSUFFIX:\n${suffix || ''}`;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama3-70b-8192', // Or 'llama-3.1-8b-instant' if available, using 70b-8192 as it's the default in the other route
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.1,
                max_tokens: 256, // Keep it short and fast
            }),
        });

        if (!response.ok) {
            throw new Error(`Groq API Error: ${response.status}`);
        }

        const data = await response.json();
        let completion = data.choices?.[0]?.message?.content || "";

        // Sometimes LLMs still add markdown despite instructions, so we clean it
        if (completion.startsWith('```')) {
            completion = completion.replace(/^```[a-z]*\n/, '').replace(/\n```$/, '');
        }

        return NextResponse.json({ completion });

    } catch (error: any) {
        console.error('Autocomplete Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
