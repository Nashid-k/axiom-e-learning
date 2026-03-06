import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/utils/security';
import { auth } from '@/lib/auth';
import { withApiVitals } from '@/lib/monitoring/api-vitals';

const GROQ_API_KEY = process.env.GROQ_API_KEY_1;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const DEFAULT_MODEL = 'llama3-70b-8192';

const MODEL_PROVIDER_MAP = {
    'llama3-70b-8192': 'groq',
    'llama-3.3-70b-versatile': 'groq',
    'openai/gpt-4o-mini': 'openrouter',
    'anthropic/claude-3.5-sonnet': 'openrouter',
} as const;

const AgentRequestSchema = z.object({
    model: z.enum(Object.keys(MODEL_PROVIDER_MAP) as [keyof typeof MODEL_PROVIDER_MAP, ...Array<keyof typeof MODEL_PROVIDER_MAP>]).optional(),
    messages: z.array(
        z.object({
            role: z.enum(['system', 'user', 'assistant']),
            content: z.string().min(1).max(64000),
        })
    ).min(1).max(60),
});

function hasValidAccessToken(req: NextRequest): boolean {
    const expectedToken = process.env.AGENT_ACCESS_TOKEN;
    if (!expectedToken) return false;

    const bearerToken = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
    const headerToken = req.headers.get('x-agent-access-token')?.trim();
    const providedToken = headerToken || bearerToken;

    return Boolean(providedToken && providedToken === expectedToken);
}

async function POSTHandler(req: NextRequest) {
    const session = await auth();
    const sessionUserId = session?.user?.email || (session?.user as { id?: string } | undefined)?.id;

    if (!sessionUserId && !hasValidAccessToken(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rateLimitResponse = await rateLimit(req, 'agent', 'AI', sessionUserId || undefined);
    if (rateLimitResponse) return rateLimitResponse;

    try {
        const parsed = AgentRequestSchema.safeParse(await req.json());
        if (!parsed.success) {
            return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
        }
        const { messages, model } = parsed.data;

        const selectedModel = model || DEFAULT_MODEL;
        const provider = MODEL_PROVIDER_MAP[selectedModel];

        const apiKey = provider === 'openrouter' ? OPENROUTER_API_KEY : GROQ_API_KEY;
        const apiUrl = provider === 'openrouter'
            ? "https://openrouter.ai/api/v1/chat/completions"
            : "https://api.groq.com/openai/v1/chat/completions";

        if (!apiKey) {
            return NextResponse.json({ error: "Missing API Configuration" }, { status: 500 });
        }

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: selectedModel,
                messages: [
                    { role: "system", content: "You are Axiom, an advanced AGI coding engine. You are helpful, concise, and an expert programmer." },
                    ...messages
                ],
                stream: true
            })
        });

        if (!response.ok) {
            return NextResponse.json({ error: "Upstream API Error" }, { status: response.status });
        }

        return new NextResponse(response.body, {
            headers: {
                'Content-Type': response.headers.get('content-type') ?? 'text/event-stream; charset=utf-8',
            },
        });

    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export const POST = withApiVitals('/api/ai/agent:POST', POSTHandler);
