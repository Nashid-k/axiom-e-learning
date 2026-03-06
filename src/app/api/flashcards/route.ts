import { connectToDatabase } from '@/lib/db/mongodb';
import { UserTopic } from '@/lib/db/models';
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const email = session.user.email.toLowerCase();

    const topics = await UserTopic.find({
        uniqueId: email,
        studied: true,
    }).lean();

    const now = new Date();
    const flashcards = topics.map((topic) => {
        const nextReview = topic.nextReviewDate ? new Date(topic.nextReviewDate) : null;
        const isDue = nextReview ? nextReview <= now : true;

        return {
            id: topic._id.toString(),
            title: topic.title,
            category: topic.category || 'Other',
            description: topic.description || '',
            studyGuide: topic.studyGuide || '',
            isDue,
            reviewCount: topic.reviewCount || 0,
            nextReviewDate: topic.nextReviewDate || null,
        };
    });

    const dueFirst = flashcards.sort((a, b) => {
        if (a.isDue && !b.isDue) return -1;
        if (!a.isDue && b.isDue) return 1;
        return 0;
    });

    return NextResponse.json({ flashcards: dueFirst });
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { topicId, result } = await req.json();

    if (!topicId || !['again', 'good', 'easy'].includes(result)) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const REVIEW_INTERVALS = [1, 3, 7, 14, 30];
    const topic = await UserTopic.findById(topicId);
    if (!topic) {
        return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    let reviewCount = topic.reviewCount || 0;

    if (result === 'again') {
        reviewCount = 0;
    } else if (result === 'good') {
        reviewCount = Math.min(reviewCount + 1, REVIEW_INTERVALS.length - 1);
    } else if (result === 'easy') {
        reviewCount = Math.min(reviewCount + 2, REVIEW_INTERVALS.length - 1);
    }

    const intervalIndex = Math.min(reviewCount, REVIEW_INTERVALS.length - 1);
    const daysUntilReview = REVIEW_INTERVALS[intervalIndex];
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + daysUntilReview);

    await UserTopic.findByIdAndUpdate(topicId, {
        $set: {
            reviewCount,
            nextReviewDate: nextReviewDate.toISOString(),
            lastStudied: new Date(),
        },
    });

    return NextResponse.json({
        success: true,
        nextReviewDate: nextReviewDate.toISOString(),
        reviewCount,
    });
}
