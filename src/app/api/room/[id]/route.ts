import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { CodingRoom } from '@/lib/db/models';

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        const { id: roomId } = await params;

        if (!roomId) {
            return NextResponse.json({ error: 'Room ID is required.' }, { status: 400 });
        }

        await connectToDatabase();
        const room = await CodingRoom.findOne({ roomId });

        if (!room) {
            return NextResponse.json({ error: 'Room not found.' }, { status: 404 });
        }

        // Filter out inactive participants (inactive for more than 10 seconds)
        const tenSecondsAgo = new Date(Date.now() - 10000);
        let activeParticipants = room.participants.filter(p => new Date(p.lastActive) > tenSecondsAgo);

        // If list changed, save it in DB
        if (activeParticipants.length !== room.participants.length) {
            room.participants = activeParticipants;
            await room.save();
        }

        return NextResponse.json({
            roomId: room.roomId,
            files: room.files,
            activeFilePath: room.activeFilePath,
            participants: room.participants,
            version: room.version,
            updatedAt: room.updatedAt
        });

    } catch (error: any) {
        console.error('[Room GET Error]:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest, { params }: RouteParams) {
    try {
        const { id: roomId } = await params;
        const session = await auth();
        const userEmail = session?.user?.email || 'guest@axiom.io';
        const userName = session?.user?.name || 'Anonymous Learner';
        const userAvatar = session?.user?.image || '/avatars/default.png';

        if (!roomId) {
            return NextResponse.json({ error: 'Room ID is required.' }, { status: 400 });
        }

        const body = await req.json();
        const { files, activeFilePath } = body;

        await connectToDatabase();
        let room = await CodingRoom.findOne({ roomId });

        const now = new Date();
        const tenSecondsAgo = new Date(Date.now() - 10000);

        if (!room) {
            // Create a brand new room
            if (!files || !activeFilePath) {
                return NextResponse.json({ error: 'Files and active file path are required to initialize a room.' }, { status: 400 });
            }

            room = new CodingRoom({
                roomId,
                files,
                activeFilePath,
                participants: [{
                    email: userEmail,
                    name: userName,
                    avatar: userAvatar,
                    lastActive: now
                }],
                version: 1
            });
            await room.save();

            return NextResponse.json({
                success: true,
                version: 1,
                participants: room.participants
            });
        }

        // Room already exists. Update workspace VFS if payload has newer updates
        let isUpdated = false;
        if (files) {
            room.files = files;
            isUpdated = true;
        }
        if (activeFilePath) {
            room.activeFilePath = activeFilePath;
            isUpdated = true;
        }

        if (isUpdated) {
            room.version += 1;
            // Mark modified for mixed types
            room.markModified('files');
        }

        // Update active user presence
        const existingParticipantIndex = room.participants.findIndex(p => p.email === userEmail);
        if (existingParticipantIndex > -1) {
            room.participants[existingParticipantIndex].lastActive = now;
            room.participants[existingParticipantIndex].name = userName;
            room.participants[existingParticipantIndex].avatar = userAvatar;
        } else {
            room.participants.push({
                email: userEmail,
                name: userName,
                avatar: userAvatar,
                lastActive: now
            });
        }

        // Filter out inactive participants (inactive for more than 10 seconds)
        room.participants = room.participants.filter(p => new Date(p.lastActive) > tenSecondsAgo || p.email === userEmail);

        // Manually update updatedAt to keep TTL indexes fresh
        room.updatedAt = now;
        await room.save();

        return NextResponse.json({
            success: true,
            version: room.version,
            files: isUpdated ? undefined : room.files,
            activeFilePath: isUpdated ? undefined : room.activeFilePath,
            participants: room.participants
        });

    } catch (error: any) {
        console.error('[Room POST Error]:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
