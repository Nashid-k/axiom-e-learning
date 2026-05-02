import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { ResourceCache, StudyGuideCache } from '@/lib/db/models';
import { auth } from '@/lib/auth';
import { withApiVitals } from '@/lib/monitoring/api-vitals';

function getAdminEmailSet(): Set<string> {
    return new Set(
        (process.env.ADMIN_EMAILS || process.env.AXIOM_ADMIN_EMAILS || '')
            .split(',')
            .map(email => email.trim().toLowerCase())
            .filter(Boolean)
    );
}

function hasValidAdminToken(request: NextRequest): boolean {
    const expectedToken = process.env.CACHE_ADMIN_TOKEN;
    if (!expectedToken) return false;

    const bearerToken = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
    const headerToken = request.headers.get('x-cache-admin-token')?.trim();
    const providedToken = headerToken || bearerToken;

    return Boolean(providedToken && providedToken === expectedToken);
}

async function isCacheAdmin(request: NextRequest): Promise<boolean> {
    if (hasValidAdminToken(request)) return true;

    const session = await auth();
    const email = session?.user?.email?.toLowerCase();
    if (!email) return false;

    const adminEmails = getAdminEmailSet();
    return adminEmails.has(email);
}

function unauthorizedResponse() {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

async function POSTHandler(request: NextRequest) {
    if (!(await isCacheAdmin(request))) {
        return unauthorizedResponse();
    }

    try {
        await connectToDatabase();

        const resourcesResult = await ResourceCache.deleteMany({});
        const guideResult = await StudyGuideCache.deleteMany({});

        return NextResponse.json({
            success: true,
            message: `Cleared ${resourcesResult.deletedCount} resources and ${guideResult.deletedCount} AI guides`,
            deletedCount: {
                resources: resourcesResult.deletedCount,
                guides: guideResult.deletedCount
            }
        });
    } catch (error: unknown) {
        console.error('[Cache Clear Error]:', error);
        return NextResponse.json(
            { error: 'Failed to clear cache' },
            { status: 500 }
        );
    }
}

async function GETHandler(request: NextRequest) {
    if (!(await isCacheAdmin(request))) {
        return unauthorizedResponse();
    }

    try {
        await connectToDatabase();

        const count = await ResourceCache.countDocuments();
        const guidesCount = await StudyGuideCache.countDocuments();

        return NextResponse.json({
            status: 'active',
            resourceCount: count,
            aiGuideCount: guidesCount,
            hint: 'Use POST on this endpoint to clear caches.'
        });
    } catch (error: unknown) {
        console.error('[Cache Status Error]:', error);
        return NextResponse.json(
            { error: 'Failed to access cache' },
            { status: 500 }
        );
    }
}

export const POST = withApiVitals('/api/resources/clear-cache:POST', POSTHandler);
export const GET = withApiVitals('/api/resources/clear-cache:GET', GETHandler);
