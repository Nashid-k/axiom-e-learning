import { NextRequest } from 'next/server';
import {
    rateLimit,
    secureErrorResponse,
    secureSuccessResponse,
} from '@/lib/utils/security';
import { ProgressService, ProgressOperation } from '@/features/learning/progress.service';
import { auth } from '@/lib/auth';
import { withApiVitals } from '@/lib/monitoring/api-vitals';
import { z } from 'zod';

const ProgressGetSchema = z.object({
    uniqueId: z.string().optional(),
    curriculumSlug: z.string().optional(),
});

const ProgressPostSchema = z.object({
    curriculumSlug: z.string().min(1).max(100),
    checkedItems: z.array(z.string()).max(1000),
    totalItems: z.number().min(0).max(10000).optional().default(0),
    operations: z.array(z.object({
        id: z.string(),
        timestamp: z.number(),
        type: z.enum(['ADD', 'REMOVE']),
        itemId: z.string()
    })).max(100).optional().default([]),
});

const ProgressDeleteSchema = z.object({
    curriculumSlug: z.string().min(1).max(100),
});

async function getAuthenticatedUser() {
    const session = await auth();
    return session?.user?.email || (session?.user as { id?: string })?.id || null;
}

async function GETHandler(req: NextRequest) {
    try {
        const rateLimitResponse = await rateLimit(req, 'progress', 'READ');
        if (rateLimitResponse) return rateLimitResponse;

        const url = new URL(req.url);
        const params = Object.fromEntries(url.searchParams.entries());
        const validation = ProgressGetSchema.safeParse(params);

        if (!validation.success) {
            return secureErrorResponse('Invalid query parameters', 400);
        }

        const { uniqueId: clientUniqueId, curriculumSlug } = validation.data;
        const sessionUser = await getAuthenticatedUser();
        const resolvedUniqueId = sessionUser || clientUniqueId;

        if (!resolvedUniqueId) {
            return secureErrorResponse('Authentication or uniqueId is required', 401);
        }

        const result = await ProgressService.getProgress(resolvedUniqueId, curriculumSlug);
        return secureSuccessResponse(result);
    } catch (error) {
        console.error('[Progress] GET Error:', error);
        return secureErrorResponse('Failed to fetch progress', 500);
    }
}

async function POSTHandler(req: NextRequest) {
    try {
        const rateLimitResponse = await rateLimit(req, 'progress', 'WRITE');
        if (rateLimitResponse) return rateLimitResponse;
        const sessionUser = await getAuthenticatedUser();
        if (!sessionUser) {
            return secureErrorResponse('Authentication required to save progress', 401);
        }

        let body;
        try {
            body = await req.json();
        } catch {
            return secureErrorResponse('Invalid JSON', 400);
        }

        const validation = ProgressPostSchema.safeParse(body);
        if (!validation.success) {
            return secureErrorResponse(validation.error.issues[0]?.message || 'Invalid request body', 400);
        }

        const { curriculumSlug, checkedItems, totalItems, operations } = validation.data;

        const result = await ProgressService.syncProgress(sessionUser, curriculumSlug, {
            checkedItems,
            totalItems,
            operations: operations as ProgressOperation[]
        });

        return secureSuccessResponse({
            success: true,
            progress: result.progress,
            checkedItems: result.checkedItems
        });
    } catch (error) {
        console.error('[Progress] POST Error:', error);
        return secureErrorResponse('Failed to save progress', 500);
    }
}

async function DELETEHandler(req: NextRequest) {
    try {
        const rateLimitResponse = await rateLimit(req, 'progress', 'WRITE');
        if (rateLimitResponse) return rateLimitResponse;
        const sessionUser = await getAuthenticatedUser();
        if (!sessionUser) {
            return secureErrorResponse('Authentication required to reset progress', 401);
        }

        const url = new URL(req.url);
        const params = Object.fromEntries(url.searchParams.entries());
        const validation = ProgressDeleteSchema.safeParse(params);

        if (!validation.success) {
            return secureErrorResponse('Invalid curriculum slug', 400);
        }

        const { curriculumSlug } = validation.data;

        await ProgressService.deleteProgress(sessionUser, curriculumSlug);
        return secureSuccessResponse({ success: true });
    } catch (error) {
        console.error('[Progress] DELETE Error:', error);
        return secureErrorResponse('Failed to delete progress', 500);
    }
}

export const GET = withApiVitals('/api/progress:GET', GETHandler);
export const POST = withApiVitals('/api/progress:POST', POSTHandler);
export const DELETE = withApiVitals('/api/progress:DELETE', DELETEHandler);
