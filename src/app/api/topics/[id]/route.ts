import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { auth } from "@/lib/auth";
import mongoose from "mongoose";

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

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "Topic ID is required" }, { status: 400 });
        }

        await connectToDatabase();

        const topic = await UserTopic.findOne({
            _id: id,
            userId: session.user.id
        }).lean();

        if (!topic) {
            return NextResponse.json({ error: "Topic not found" }, { status: 404 });
        }

        const t = topic as any;

        return NextResponse.json({
            topic: {
                id: t._id.toString(),
                title: t.title,
                description: t.description,
                studied: t.studied,
                createdAt: new Date(t.createdAt).toISOString(),
                lastStudied: t.lastStudied ? new Date(t.lastStudied).toISOString() : undefined,
                studyGuide: t.studyGuide,
                category: t.category,
            }
        });
    } catch (error) {
        console.error("Topic GET (by ID) error:", error);
        return NextResponse.json({ error: "Failed to fetch topic details" }, { status: 500 });
    }
}
