import { NextResponse } from "next/server";
import connectToDatabase from '@/lib/db/mongodb';
import { InteractionLog } from '@/lib/db/models';
import { auth } from '@/lib/auth';
import { withApiVitals } from '@/lib/monitoring/api-vitals';

async function GETHandler() {
    try {
        await connectToDatabase();

        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Authentication required" }, { status: 401 });
        }
        const uniqueId = session.user.email;

        const stats = await InteractionLog.aggregate([
            {
                $match: {
                    uniqueId,
                    timestamp: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) } // Last year only (Audit 2, Flaw 13)
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const data = stats.map(s => ({ date: s._id, count: s.count }));

        return NextResponse.json({ data });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to load heatmap" }, { status: 500 });
    }
}

export const GET = withApiVitals('/api/progress/heatmap:GET', GETHandler);
