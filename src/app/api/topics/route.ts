import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { auth } from "@/lib/auth";
import mongoose from "mongoose";
import { z } from "zod";
import { withApiVitals } from '@/lib/monitoring/api-vitals';

const CreateTopicSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title must be under 200 characters').trim(),
    description: z.string().max(1000, 'Description must be under 1000 characters').optional(),
    category: z.string().max(100).optional().default('Other'),
});

const UpdateTopicSchema = z.object({
    id: z.string().min(1, 'Topic ID is required'),
    title: z.string().min(1).max(200).trim().optional(),
    description: z.string().max(1000).optional(),
    studied: z.boolean().optional(),
    lastStudied: z.string().datetime().optional(),
    studyGuide: z.string().max(50000).optional(),
    category: z.string().max(100).optional(),
});

const UserTopicSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String },
    studied: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    lastStudied: { type: Date },
    studyGuide: { type: String },
    category: { type: String, default: 'Other' },
}, { timestamps: true });

UserTopicSchema.index({ userId: 1, _id: 1 });

const UserTopic = mongoose.models.UserTopicAuth || mongoose.model('UserTopicAuth', UserTopicSchema);

function isValidObjectId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id) && new mongoose.Types.ObjectId(id).toString() === id;
}

async function GETHandler(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ topics: [] });
        }

        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
        const cursor = searchParams.get('cursor');

        const query: Record<string, unknown> = { userId: session.user.id };
        if (cursor && isValidObjectId(cursor)) {
            query._id = { $gt: new mongoose.Types.ObjectId(cursor) };
        }

        const topics = await UserTopic.find(query)
            .select('-studyGuide')
            .sort({ createdAt: 1 })
            .limit(limit)
            .lean();

        interface LeanTopic {
            _id: mongoose.Types.ObjectId;
            title: string;
            description?: string;
            studied: boolean;
            createdAt: Date;
            lastStudied?: Date;
            category: string;
        }

        return NextResponse.json({
            topics: (topics as unknown as LeanTopic[]).map(t => ({
                id: t._id.toString(),
                title: t.title,
                description: t.description,
                studied: t.studied,
                createdAt: new Date(t.createdAt).toISOString(),
                lastStudied: t.lastStudied ? new Date(t.lastStudied).toISOString() : undefined,
                category: t.category,
            })),
            nextCursor: topics.length === limit ? (topics[topics.length - 1] as unknown as LeanTopic)._id.toString() : null,
        });
    } catch (error) {
        console.error("Topics GET error:", error);
        return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 });
    }
}

async function POSTHandler(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const parsed = CreateTopicSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid input' }, { status: 400 });
        }

        await connectToDatabase();

        const topic = await UserTopic.create({
            userId: session.user.id,
            title: parsed.data.title,
            description: parsed.data.description,
            category: parsed.data.category,
        });

        return NextResponse.json({
            topic: {
                id: topic._id.toString(),
                title: topic.title,
                description: topic.description,
                studied: topic.studied,
                createdAt: topic.createdAt.toISOString(),
                category: topic.category,
            }
        }, { status: 201 });
    } catch (error) {
        console.error("Topics POST error:", error);
        return NextResponse.json({ error: "Failed to create topic" }, { status: 500 });
    }
}

async function PUTHandler(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const parsed = UpdateTopicSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid input' }, { status: 400 });
        }

        const { id, ...updates } = parsed.data;
        if (!isValidObjectId(id)) {
            return NextResponse.json({ error: "Invalid topic ID format" }, { status: 400 });
        }

        await connectToDatabase();

        const topic = await UserTopic.findOneAndUpdate(
            { _id: id, userId: session.user.id },
            updates,
            { new: true }
        );

        if (!topic) {
            return NextResponse.json({ error: "Topic not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Topics PUT error:", error);
        return NextResponse.json({ error: "Failed to update topic" }, { status: 500 });
    }
}

async function DELETEHandler(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "Topic ID required" }, { status: 400 });
        }
        if (!isValidObjectId(id)) {
            return NextResponse.json({ error: "Invalid topic ID format" }, { status: 400 });
        }

        await connectToDatabase();
        await UserTopic.deleteOne({ _id: id, userId: session.user.id });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Topics DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete topic" }, { status: 500 });
    }
}

export const GET = withApiVitals('/api/topics:GET', GETHandler);
export const POST = withApiVitals('/api/topics:POST', POSTHandler);
export const PUT = withApiVitals('/api/topics:PUT', PUTHandler);
export const DELETE = withApiVitals('/api/topics:DELETE', DELETEHandler);
