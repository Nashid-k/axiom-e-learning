import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { UserProgress } from '@/lib/db/models';
import { secureSuccessResponse, secureErrorResponse } from '@/lib/utils/security';
import { auth } from '@/lib/auth';
import { withApiVitals } from '@/lib/monitoring/api-vitals';

async function GETHandler(req: NextRequest) {
    try {
        await connectToDatabase();

        const session = await auth();
        let targetId: string | null = null;
        let isGuest = false;

        if (session?.user?.email) {
            targetId = session.user.email;
        } else {
            const { searchParams } = new URL(req.url);
            const requestedId = searchParams.get('uniqueId');

            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (requestedId && uuidRegex.test(requestedId)) {
                targetId = requestedId;
                isGuest = true;
            }
        }

        if (!targetId) {
            return secureErrorResponse('Valid authentication or guest ID required', 401);
        }

        const allProgress = await UserProgress.find({
            uniqueId: targetId
        }).lean();

        const progressMap = (allProgress as { curriculumSlug: string, checkedItems: string[] }[]).reduce((acc: Record<string, string[]>, cur: { curriculumSlug: string, checkedItems: string[] }) => {
            acc[cur.curriculumSlug] = cur.checkedItems;
            return acc;
        }, {});

        return secureSuccessResponse({
            progress: progressMap,
            isGuest
        });

    } catch (error) {
        console.error('[API] Error fetching progress:', error);
        return secureErrorResponse('Failed to fetch progress', 500);
    }
}

export const GET = withApiVitals('/api/progress/all:GET', GETHandler);
