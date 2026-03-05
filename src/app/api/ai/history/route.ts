import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { AIMemory } from '@/lib/db/models';
import { AI_CONFIG } from '@/lib/config/app';
import { withApiVitals } from '@/lib/monitoring/api-vitals';

async function GETHandler() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        const memory = await AIMemory.findOne({ userId: session.user.email }).lean();

        return NextResponse.json({
            messages: memory?.messages || [],
            version: memory?.version || AI_CONFIG.VERSION,
            facts: memory?.facts || [],
            interests: memory?.interests || [],
            reflections: memory?.reflections || []
        });
    } catch {
        return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
    }
}

async function DELETEHandler() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        await AIMemory.findOneAndUpdate(
            { userId: session.user.email },
            { $set: { messages: [], facts: [], interests: [], reflections: [] } }
        );

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to clear history' }, { status: 500 });
    }
}

async function PUTHandler(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { messageIndex } = body;
        if (typeof messageIndex !== 'number' || !Number.isInteger(messageIndex) || messageIndex < 0) {
            return NextResponse.json({ error: 'messageIndex must be a non-negative integer' }, { status: 400 });
        }

        await connectToDatabase();
        const memory = await AIMemory.findOne({ userId: session.user.email });

        if (memory && memory.messages) {
            const safeIndex = Math.min(messageIndex, memory.messages.length);
            const keptMessages = memory.messages.slice(0, safeIndex);

            await AIMemory.updateOne(
                { userId: session.user.email },
                { $set: { messages: keptMessages } }
            );
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to update history' }, { status: 500 });
    }
}

export const GET = withApiVitals('/api/ai/history:GET', GETHandler);
export const DELETE = withApiVitals('/api/ai/history:DELETE', DELETEHandler);
export const PUT = withApiVitals('/api/ai/history:PUT', PUTHandler);
