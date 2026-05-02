import { connectToDatabase } from '@/lib/db/mongodb';
import { ApiVitalEvent, WebVitalEvent } from '@/lib/db/models';
import { buildVitalsSnapshot, type ApiVitalPoint, type WebVitalPoint } from '@/lib/monitoring/vitals-summary';

interface PersistedVitalsQueryOptions {
    windowHours?: number;
    limit?: number;
}

function parseBooleanFlag(value: string): boolean {
    const normalized = value.trim().toLowerCase();
    return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
}

function parseInteger(value: string | undefined, fallback: number, min: number, max: number): number {
    if (!value) return fallback;
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(max, Math.max(min, parsed));
}

function getDefaultWindowHours(): number {
    return parseInteger(process.env.VITALS_DB_DEFAULT_WINDOW_HOURS, 24, 1, 24 * 30);
}

function getDefaultLimit(): number {
    return parseInteger(process.env.VITALS_DB_DEFAULT_LIMIT, 5000, 100, 100000);
}

function normalizeWindowHours(input: number | undefined): number {
    if (typeof input !== 'number' || !Number.isFinite(input)) {
        return getDefaultWindowHours();
    }
    return Math.min(24 * 30, Math.max(1, Math.round(input)));
}

function normalizeLimit(input: number | undefined): number {
    if (typeof input !== 'number' || !Number.isFinite(input)) {
        return getDefaultLimit();
    }
    return Math.min(100000, Math.max(100, Math.round(input)));
}

function maybeLogWarning(message: string, error?: unknown) {
    if (process.env.AXIOM_VITALS_LOG === '0') return;
    if (error) {
        console.warn(`[vitals:db] ${message}`, error);
        return;
    }
    console.warn(`[vitals:db] ${message}`);
}

export function isDbVitalsEnabled(): boolean {
    if (!process.env.MONGODB_URI) return false;

    const raw = process.env.VITALS_DB_ENABLED;
    if (raw === undefined) {
        return process.env.NODE_ENV === 'production';
    }
    return parseBooleanFlag(raw);
}

export async function persistApiVital(point: ApiVitalPoint): Promise<void> {
    if (!isDbVitalsEnabled()) return;

    try {
        await connectToDatabase();
        await ApiVitalEvent.create({
            ts: new Date(point.ts),
            endpoint: point.endpoint,
            method: point.method,
            path: point.path,
            status: point.status,
            durationMs: point.durationMs,
        });
    } catch (error: unknown) {
        maybeLogWarning('Failed to persist API vital.', error);
    }
}

export async function persistWebVital(point: WebVitalPoint): Promise<void> {
    if (!isDbVitalsEnabled()) return;

    try {
        await connectToDatabase();
        await WebVitalEvent.create({
            ts: new Date(point.ts),
            metricId: point.id,
            metric: point.metric,
            path: point.path,
            value: point.value,
            delta: point.delta,
            rating: point.rating,
            navigationType: point.navigationType,
            tags: point.tags,
        });
    } catch (error: unknown) {
        maybeLogWarning('Failed to persist web vital.', error);
    }
}

export async function getPersistedVitalsSnapshot(options: PersistedVitalsQueryOptions = {}) {
    const windowHours = normalizeWindowHours(options.windowHours);
    const limit = normalizeLimit(options.limit);
    const from = new Date(Date.now() - windowHours * 60 * 60 * 1000);

    if (!isDbVitalsEnabled()) {
        return {
            ...buildVitalsSnapshot([], []),
            source: 'database-disabled',
            windowHours,
            from: from.toISOString(),
            queryLimit: limit,
            lastError: null,
        };
    }

    await connectToDatabase();

    const [apiDocs, webDocs] = await Promise.all([
        ApiVitalEvent.find({ ts: { $gte: from } }).sort({ ts: -1 }).limit(limit).lean().exec(),
        WebVitalEvent.find({ ts: { $gte: from } }).sort({ ts: -1 }).limit(limit).lean().exec(),
    ]);

    const apiPoints: ApiVitalPoint[] = [...apiDocs].reverse().map((doc) => ({
        ts: doc.ts instanceof Date ? doc.ts.getTime() : new Date(doc.ts).getTime(),
        endpoint: doc.endpoint,
        method: doc.method,
        path: doc.path,
        status: doc.status,
        durationMs: doc.durationMs,
    }));

    const webPoints: WebVitalPoint[] = [...webDocs].reverse().map((doc) => ({
        ts: doc.ts instanceof Date ? doc.ts.getTime() : new Date(doc.ts).getTime(),
        id: doc.metricId,
        metric: doc.metric,
        path: doc.path,
        value: doc.value,
        delta: doc.delta,
        rating: doc.rating,
        navigationType: doc.navigationType,
        tags: doc.tags,
    }));

    return {
        ...buildVitalsSnapshot(apiPoints, webPoints),
        source: 'database',
        windowHours,
        from: from.toISOString(),
        queryLimit: limit,
        lastError: null,
    };
}

export async function clearPersistedVitals() {
    if (!isDbVitalsEnabled()) {
        return { apiDeleted: 0, webDeleted: 0 };
    }

    await connectToDatabase();
    const [apiResult, webResult] = await Promise.all([
        ApiVitalEvent.deleteMany({}),
        WebVitalEvent.deleteMany({}),
    ]);

    return {
        apiDeleted: apiResult.deletedCount ?? 0,
        webDeleted: webResult.deletedCount ?? 0,
    };
}
