import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { User } from '@/lib/db/models';
import { z } from 'zod';
import { withApiVitals } from '@/lib/monitoring/api-vitals';

const preferencesSchema = z.object({
    nickname: z.string().min(1).max(20),
    vibe: z.enum(['chill', 'professional', 'active']),
    introSeen: z.boolean().optional()
});

async function GETHandler() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        const user = await User.findOne({ email: session.user.email }).select('mayaPreferences').lean();

        return NextResponse.json({
            success: true,
            preferences: (user as any)?.mayaPreferences || {}
        });
    } catch (error: unknown) {
        console.error('[Preferences GET]', error);
        return NextResponse.json({ error: 'Failed to load preferences' }, { status: 500 });
    }
}

async function POSTHandler(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const validated = preferencesSchema.parse(body);

        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            {
                $set: {
                    'mayaPreferences.nickname': validated.nickname,
                    'mayaPreferences.vibe': validated.vibe,
                    'mayaPreferences.introSeen': true,
                }
            },
            { new: true, upsert: true }
        );

        return NextResponse.json({
            success: true,
            preferences: updatedUser.mayaPreferences
        });

    } catch (error: unknown) {
        console.error('[Preferences POST]', error);
        return NextResponse.json({ error: 'Failed to save preferences' }, { status: 500 });
    }
}

export const GET = withApiVitals('/api/user/preferences:GET', GETHandler);
export const POST = withApiVitals('/api/user/preferences:POST', POSTHandler);
