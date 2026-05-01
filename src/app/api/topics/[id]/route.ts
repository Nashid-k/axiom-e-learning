import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { auth } from "@/lib/auth";
import mongoose from "mongoose";
import { UserTopic } from "@/lib/db/models";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        const uniqueId = session?.user?.email?.toLowerCase();
        if (!uniqueId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "Topic ID is required" }, { status: 400 });
        }

        await connectToDatabase();

        const topic = await UserTopic.findOne({
            _id: id,
            uniqueId
        }).lean();

        if (!topic) {
            return NextResponse.json({ error: "Topic not found" }, { status: 404 });
        }

        const t = topic as unknown as {
            _id: mongoose.Types.ObjectId;
            title: string;
            description?: string;
            studied: boolean;
            createdAt: Date;
            lastStudied?: Date;
            studyGuide?: string;
            category: string;
            reviewCount?: number;
            nextReviewDate?: string;
            videoUrl?: string;
        };

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
                reviewCount: t.reviewCount || 0,
                nextReviewDate: t.nextReviewDate,
                videoUrl: t.videoUrl,
            }
        });
    } catch (error: unknown) {
        console.error("Topic GET (by ID) error:", error);
        return NextResponse.json({ error: "Failed to fetch topic details" }, { status: 500 });
    }
}
