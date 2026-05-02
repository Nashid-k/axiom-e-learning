import { NextRequest, NextResponse } from 'next/server';
import { getVitalsSnapshot, clearVitals } from '@/lib/monitoring/vitals-store';
import { withApiVitals } from '@/lib/monitoring/api-vitals';
import {
    clearPersistedVitals,
    getPersistedVitalsSnapshot,
    isDbVitalsEnabled,
} from '@/lib/monitoring/vitals-db';

type VitalsSource = 'auto' | 'memory' | 'db';

function canReadVitals(request: NextRequest): boolean {
    if (process.env.NODE_ENV !== 'production') return true;

    const token = process.env.VITALS_READ_TOKEN;
    if (!token) return false;

    const headerToken = request.headers.get('x-vitals-token');
    const bearerToken = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
    const provided = headerToken || bearerToken;
    return provided === token;
}

function parseSource(input: string | null): VitalsSource {
    if (input === 'memory' || input === 'db') return input;
    return 'auto';
}

function parseNumericParam(value: string | null): number | undefined {
    if (!value) return undefined;
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed)) return undefined;
    return parsed;
}

async function GETHandler(request: NextRequest) {
    if (!canReadVitals(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const source = parseSource(request.nextUrl.searchParams.get('source'));
    const windowHours = parseNumericParam(request.nextUrl.searchParams.get('windowHours'));
    const limit = parseNumericParam(request.nextUrl.searchParams.get('limit'));
    const shouldUseDb = source === 'db' || (source === 'auto' && isDbVitalsEnabled());

    if (!shouldUseDb) {
        const snapshot = getVitalsSnapshot();
        return NextResponse.json({
            ...snapshot,
            source: 'memory',
        });
    }

    try {
        const snapshot = await getPersistedVitalsSnapshot({ windowHours, limit });
        return NextResponse.json(snapshot);
    } catch (error: unknown) {
        if (source === 'db') {
            return NextResponse.json(
                {
                    error: 'Failed to load DB vitals',
                    details: error instanceof Error ? error.message : 'Unknown error',
                },
                { status: 503 }
            );
        }

        const fallback = getVitalsSnapshot();
        return NextResponse.json({
            ...fallback,
            source: 'memory-fallback',
            warning: error instanceof Error ? error.message : 'DB unavailable',
        });
    }
}

async function DELETEHandler(request: NextRequest) {
    if (!canReadVitals(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const source = parseSource(request.nextUrl.searchParams.get('source'));
    clearVitals();

    if (source === 'memory') {
        return NextResponse.json({ success: true, memoryCleared: true, dbCleared: false });
    }

    if (!isDbVitalsEnabled()) {
        return NextResponse.json({ success: true, memoryCleared: true, dbCleared: false, reason: 'DB vitals disabled' });
    }

    try {
        const dbResult = await clearPersistedVitals();
        return NextResponse.json({
            success: true,
            memoryCleared: true,
            dbCleared: true,
            dbResult,
        });
    } catch (error: unknown) {
        return NextResponse.json(
            {
                success: false,
                memoryCleared: true,
                dbCleared: false,
                error: error instanceof Error ? error.message : 'Failed to clear DB vitals',
            },
            { status: 503 }
        );
    }
}

export const GET = withApiVitals('/api/vitals:GET', GETHandler);
export const DELETE = withApiVitals('/api/vitals:DELETE', DELETEHandler);
