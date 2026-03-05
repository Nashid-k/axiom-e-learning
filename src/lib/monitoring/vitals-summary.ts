export type PrimitiveTag = string | number | boolean;

export interface ApiVitalPoint {
    ts: number;
    endpoint: string;
    method: string;
    path: string;
    status: number;
    durationMs: number;
}

export interface WebVitalPoint {
    ts: number;
    metric: string;
    id: string;
    path: string;
    value: number;
    delta?: number;
    rating?: string;
    navigationType?: string;
    tags?: Record<string, PrimitiveTag>;
}

export interface ApiVitalSummary {
    endpoint: string;
    method: string;
    path: string;
    requests: number;
    errors: number;
    errorRate: number;
    avgMs: number;
    p95Ms: number;
    minMs: number;
    maxMs: number;
    lastMs: number;
    lastStatus: number;
    lastAt: string;
}

export interface WebVitalSummary {
    metric: string;
    path: string;
    samples: number;
    avg: number;
    p95: number;
    min: number;
    max: number;
    lastValue: number;
    lastRating?: string;
    lastAt: string;
}

export interface VitalsSnapshot {
    generatedAt: string;
    totals: {
        apiPoints: number;
        webPoints: number;
        uniqueApiRoutes: number;
        uniqueWebMetrics: number;
    };
    apiSummary: ApiVitalSummary[];
    webSummary: WebVitalSummary[];
    recentApi: ApiVitalPoint[];
    recentWeb: WebVitalPoint[];
}

function percentile(values: number[], p: number): number {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
    return sorted[index];
}

function round(value: number): number {
    return Math.round(value * 100) / 100;
}

export function summarizeApi(points: ApiVitalPoint[]): ApiVitalSummary[] {
    const buckets = new Map<string, ApiVitalPoint[]>();

    for (const point of points) {
        const key = `${point.method}|${point.path}|${point.endpoint}`;
        const current = buckets.get(key);
        if (current) {
            current.push(point);
        } else {
            buckets.set(key, [point]);
        }
    }

    const summaries: ApiVitalSummary[] = [];
    for (const group of buckets.values()) {
        const [first] = group;
        const durations = group.map(item => item.durationMs);
        const errors = group.filter(item => item.status >= 500).length;
        const last = group[group.length - 1];
        const avg = durations.reduce((sum, value) => sum + value, 0) / durations.length;

        summaries.push({
            endpoint: first.endpoint,
            method: first.method,
            path: first.path,
            requests: group.length,
            errors,
            errorRate: group.length > 0 ? round((errors / group.length) * 100) : 0,
            avgMs: round(avg),
            p95Ms: round(percentile(durations, 95)),
            minMs: round(Math.min(...durations)),
            maxMs: round(Math.max(...durations)),
            lastMs: round(last.durationMs),
            lastStatus: last.status,
            lastAt: new Date(last.ts).toISOString(),
        });
    }

    return summaries.sort((a, b) => b.requests - a.requests || b.p95Ms - a.p95Ms);
}

export function summarizeWeb(points: WebVitalPoint[]): WebVitalSummary[] {
    const buckets = new Map<string, WebVitalPoint[]>();

    for (const point of points) {
        const key = `${point.metric}|${point.path}`;
        const current = buckets.get(key);
        if (current) {
            current.push(point);
        } else {
            buckets.set(key, [point]);
        }
    }

    const summaries: WebVitalSummary[] = [];
    for (const group of buckets.values()) {
        const [first] = group;
        const values = group.map(item => item.value);
        const last = group[group.length - 1];
        const avg = values.reduce((sum, value) => sum + value, 0) / values.length;

        summaries.push({
            metric: first.metric,
            path: first.path,
            samples: group.length,
            avg: round(avg),
            p95: round(percentile(values, 95)),
            min: round(Math.min(...values)),
            max: round(Math.max(...values)),
            lastValue: round(last.value),
            lastRating: last.rating,
            lastAt: new Date(last.ts).toISOString(),
        });
    }

    return summaries.sort((a, b) => b.samples - a.samples || a.metric.localeCompare(b.metric));
}

export function buildVitalsSnapshot(apiPoints: ApiVitalPoint[], webPoints: WebVitalPoint[]): VitalsSnapshot {
    return {
        generatedAt: new Date().toISOString(),
        totals: {
            apiPoints: apiPoints.length,
            webPoints: webPoints.length,
            uniqueApiRoutes: new Set(apiPoints.map(point => `${point.method} ${point.path}`)).size,
            uniqueWebMetrics: new Set(webPoints.map(point => `${point.metric} ${point.path}`)).size,
        },
        apiSummary: summarizeApi(apiPoints),
        webSummary: summarizeWeb(webPoints),
        recentApi: apiPoints.slice(-100).reverse(),
        recentWeb: webPoints.slice(-100).reverse(),
    };
}
