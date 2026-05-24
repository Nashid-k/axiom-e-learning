import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { User } from '@/lib/db/models';

export async function GET() {
    try {
        const session = await auth();
        const userId = session?.user?.email;

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        const user = await User.findOne({ email: userId }).select('githubToken githubUsername githubAvatar').lean() as any;

        if (!user || !user.githubToken) {
            return NextResponse.json({ isLinked: false });
        }

        return NextResponse.json({
            isLinked: true,
            username: user.githubUsername,
            avatar: user.githubAvatar
        });

    } catch (error: any) {
        console.error('[GitHub GET Error]:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const userId = session?.user?.email;

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { token } = body;

        if (!token || typeof token !== 'string' || !token.trim()) {
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }

        const cleanToken = token.trim();

        // Verify token with GitHub
        const response = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `token ${cleanToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Axiom-Learning-OS'
            }
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Invalid GitHub Personal Access Token.' }, { status: 400 });
        }

        const data = await response.json();
        const username = data.login;
        const avatar = data.avatar_url;

        // Save to MongoDB
        await connectToDatabase();
        await User.updateOne(
            { email: userId },
            {
                $set: {
                    githubToken: cleanToken,
                    githubUsername: username,
                    githubAvatar: avatar
                }
            }
        );

        return NextResponse.json({
            success: true,
            isLinked: true,
            username,
            avatar
        });

    } catch (error: any) {
        console.error('[GitHub POST Error]:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        const session = await auth();
        const userId = session?.user?.email;

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        await User.updateOne(
            { email: userId },
            {
                $unset: {
                    githubToken: 1,
                    githubUsername: 1,
                    githubAvatar: 1
                }
            }
        );

        return NextResponse.json({
            success: true,
            isLinked: false
        });

    } catch (error: any) {
        console.error('[GitHub DELETE Error]:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
