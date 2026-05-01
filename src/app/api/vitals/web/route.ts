import { NextRequest, NextResponse } from 'next/server';
import { withApiVitals } from '@/lib/monitoring/api-vitals';
import { recordWebVital } from '@/lib/monitoring/vitals-store';
import { persistWebVital } from '@/lib/monitoring/vitals-db';

function isMetricsWriteEnabled(): boolean {
    const flag = process.env.NEXT_PUBLIC_VITALS_ENABLED;
    if (flag === undefined) {
        return true;
    }
    return flag === '1' || flag.toLowerCase() === 'true';
}

function validateMetric(input: unknown): input is {
    id: string;
    metric: string;
    value: number;
    delta?: number;
    rating?: string;
    navigationType?: string;
    path?: string;
    ts?: number;
} {
    if (!input || typeof input !== 'object') return false;
    const obj = input as Record<string, unknown>;
    return (
        typeof obj.id === 'string' &&
        typeof obj.metric === 'string' &&
        typeof obj.value === 'number'
    );
}

async function POSTHandler(request: NextRequest) {
    if (!isMetricsWriteEnabled()) {
        return NextResponse.json({ skipped: true });
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    if (!validateMetric(body)) {
        return NextResponse.json({ error: 'Invalid metric payload' }, { status: 400 });
    }

    const point = {
        ts: typeof body.ts === 'number' ? body.ts : Date.now(),
        id: body.id,
        metric: body.metric,
        value: body.value,
        delta: typeof body.delta === 'number' ? body.delta : undefined,
        rating: typeof body.rating === 'string' ? body.rating : undefined,
        navigationType: typeof body.navigationType === 'string' ? body.navigationType : undefined,
        path: typeof body.path === 'string' ? body.path : 'unknown',
    };

    recordWebVital(point);
    persistWebVital(point).catch(e => console.error('[Web Vitals] Background telemetry write failed:', e));

    return NextResponse.json({ success: true });
}

export const POST = withApiVitals('/api/vitals/web:POST', POSTHandler);
