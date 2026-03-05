import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { LeaderboardEntry } from "@/lib/db/models";
import { secureErrorResponse, secureSuccessResponse, rateLimit } from "@/lib/utils/security";
import { withApiVitals } from '@/lib/monitoring/api-vitals';

async function GETHandler(req: NextRequest) {
    const rateLimitResponse = await rateLimit(req, 'leaderboard', 'READ');
    if (rateLimitResponse) return rateLimitResponse;

    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
        const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10')));
        const skip = (page - 1) * limit;

        const query = { totalPoints: { $gte: 1 }, isGuest: { $ne: true } };
        const totalUsers = await LeaderboardEntry.countDocuments(query);
        const totalPages = Math.ceil(totalUsers / limit);

        const topUsers = await LeaderboardEntry.find(query)
            .sort({ totalPoints: -1, lastUpdated: -1 })
            .skip(skip)
            .limit(limit)
            .select('name image totalMastered totalPoints lastUpdated')
            .lean();

        const rankedUsers = topUsers.map((user: { totalPoints?: number, image?: string, name?: string, lastUpdated?: Date, [key: string]: unknown }, index: number) => {
            let grade = "Junior Engineer";
            const score = user.totalPoints || 0;

            if (score > 10000) grade = "Distinguished Engineer";
            else if (score > 5000) grade = "Principal Engineer";
            else if (score > 2500) grade = "Senior Engineer";
            else if (score > 1000) grade = "Software Engineer II";
            else if (score > 100) grade = "Software Engineer I";

            const validAvatars = [
                '/avatars/boy-1.png', '/avatars/boy-2.png', '/avatars/boy-3.png', '/avatars/boy-4.png', '/avatars/boy-5.png',
                '/avatars/girl-1.png', '/avatars/girl-2.png', '/avatars/girl-3.png', '/avatars/girl-4.png', '/avatars/girl-5.png',
                '/avatars/default.png'
            ];

            let image = "/avatars/default.png";
            if (user.image && validAvatars.includes(user.image)) {
                image = user.image;
            }

            return {
                ...user,
                image,
                rank: skip + index + 1,
                grade
            };
        });

        return secureSuccessResponse({
            users: rankedUsers,
            pagination: {
                totalUsers,
                totalPages,
                currentPage: page,
                limit,
            },
        });
    } catch (error) {
        console.error("Leaderboard API Error:", error);
        return secureErrorResponse("Failed to fetch leaderboard", 500);
    }
}

export const GET = withApiVitals('/api/social/leaderboard:GET', GETHandler);
