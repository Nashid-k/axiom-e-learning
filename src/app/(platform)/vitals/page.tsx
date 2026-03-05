'use client';

import { useEffect, useMemo, useState } from 'react';

interface ApiSummaryRow {
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

interface WebSummaryRow {
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

interface VitalsSnapshot {
    generatedAt: string;
    source?: string;
    windowHours?: number;
    from?: string;
    queryLimit?: number;
    warning?: string;
    lastError?: string | null;
    dropped?: {
        api: number;
        web: number;
    };
    totals: {
        apiPoints: number;
        webPoints: number;
        uniqueApiRoutes: number;
        uniqueWebMetrics: number;
    };
    apiSummary: ApiSummaryRow[];
    webSummary: WebSummaryRow[];
}

function formatTs(value: string): string {
    try {
        return new Date(value).toLocaleTimeString();
    } catch {
        return value;
    }
}

export default function VitalsPage() {
    const [snapshot, setSnapshot] = useState<VitalsSnapshot | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshMs, setRefreshMs] = useState(2000);
    const [windowHours, setWindowHours] = useState(24);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const response = await fetch(`/api/vitals?source=auto&windowHours=${windowHours}&limit=10000`, { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error(`Vitals request failed: ${response.status}`);
                }
                const data = await response.json();
                if (!cancelled) {
                    setSnapshot(data);
                    setError(null);
                }
            } catch (err: unknown) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to load vitals');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        const timer = setInterval(load, refreshMs);
        return () => {
            cancelled = true;
            clearInterval(timer);
        };
    }, [refreshMs, windowHours]);

    const title = useMemo(() => {
        if (!snapshot) return 'Vitals Dashboard';
        return `Vitals Dashboard · ${snapshot.totals.uniqueApiRoutes} API routes · ${snapshot.totals.uniqueWebMetrics} web metrics`;
    }, [snapshot]);

    return (
        <main className="min-h-screen px-4 md:px-8 py-6 bg-[var(--surface-base)] text-[var(--fg-primary)]">
            <div className="max-w-7xl mx-auto space-y-6">
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black tracking-tight">{title}</h1>
                        <p className="text-sm text-[var(--fg-muted)]">
                            Auto-refreshing vitals ({snapshot?.source || 'unknown'}). Last snapshot: {snapshot ? formatTs(snapshot.generatedAt) : 'n/a'}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm">
                        <label className="flex items-center gap-2">
                            Refresh
                            <select
                                className="bg-[var(--surface-raised)] border border-[var(--border-default)] rounded-lg px-2 py-1"
                                value={refreshMs}
                                onChange={(e) => setRefreshMs(Number(e.target.value))}
                            >
                                <option value={1000}>1s</option>
                                <option value={2000}>2s</option>
                                <option value={5000}>5s</option>
                                <option value={10000}>10s</option>
                            </select>
                        </label>
                        <label className="flex items-center gap-2">
                            Window
                            <select
                                className="bg-[var(--surface-raised)] border border-[var(--border-default)] rounded-lg px-2 py-1"
                                value={windowHours}
                                onChange={(e) => setWindowHours(Number(e.target.value))}
                            >
                                <option value={1}>1h</option>
                                <option value={6}>6h</option>
                                <option value={24}>24h</option>
                                <option value={72}>72h</option>
                                <option value={168}>7d</option>
                            </select>
                        </label>
                    </div>
                </header>

                {loading && <p className="text-sm text-[var(--fg-muted)]">Loading vitals...</p>}
                {error && <p className="text-sm text-red-500">{error}</p>}
                {snapshot?.warning && <p className="text-sm text-amber-500">{snapshot.warning}</p>}
                {snapshot?.lastError && <p className="text-sm text-amber-500">DB flush warning: {snapshot.lastError}</p>}

                {snapshot && (
                    <>
                        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <StatCard label="API Samples" value={snapshot.totals.apiPoints} />
                            <StatCard label="Web Samples" value={snapshot.totals.webPoints} />
                            <StatCard label="API Routes" value={snapshot.totals.uniqueApiRoutes} />
                            <StatCard label="Web Metrics" value={snapshot.totals.uniqueWebMetrics} />
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-xl font-black">API Endpoint Vitals</h2>
                            <div className="overflow-x-auto rounded-xl border border-[var(--border-default)]">
                                <table className="min-w-[980px] w-full text-sm">
                                    <thead className="bg-[var(--surface-raised)]">
                                        <tr className="text-left">
                                            <th className="p-3">Method</th>
                                            <th className="p-3">Path</th>
                                            <th className="p-3">Requests</th>
                                            <th className="p-3">Err %</th>
                                            <th className="p-3">Avg ms</th>
                                            <th className="p-3">P95 ms</th>
                                            <th className="p-3">Max ms</th>
                                            <th className="p-3">Last status</th>
                                            <th className="p-3">Last</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {snapshot.apiSummary.map((row) => (
                                            <tr key={`${row.method}-${row.path}-${row.endpoint}`} className="border-t border-[var(--border-default)]">
                                                <td className="p-3 font-mono">{row.method}</td>
                                                <td className="p-3 font-mono">{row.path}</td>
                                                <td className="p-3">{row.requests}</td>
                                                <td className="p-3">{row.errorRate}%</td>
                                                <td className="p-3">{row.avgMs}</td>
                                                <td className="p-3">{row.p95Ms}</td>
                                                <td className="p-3">{row.maxMs}</td>
                                                <td className="p-3">{row.lastStatus}</td>
                                                <td className="p-3">{formatTs(row.lastAt)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-xl font-black">Web Vitals</h2>
                            <div className="overflow-x-auto rounded-xl border border-[var(--border-default)]">
                                <table className="min-w-[820px] w-full text-sm">
                                    <thead className="bg-[var(--surface-raised)]">
                                        <tr className="text-left">
                                            <th className="p-3">Metric</th>
                                            <th className="p-3">Path</th>
                                            <th className="p-3">Samples</th>
                                            <th className="p-3">Avg</th>
                                            <th className="p-3">P95</th>
                                            <th className="p-3">Max</th>
                                            <th className="p-3">Rating</th>
                                            <th className="p-3">Last</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {snapshot.webSummary.map((row) => (
                                            <tr key={`${row.metric}-${row.path}`} className="border-t border-[var(--border-default)]">
                                                <td className="p-3 font-mono">{row.metric}</td>
                                                <td className="p-3 font-mono">{row.path}</td>
                                                <td className="p-3">{row.samples}</td>
                                                <td className="p-3">{row.avg}</td>
                                                <td className="p-3">{row.p95}</td>
                                                <td className="p-3">{row.max}</td>
                                                <td className="p-3">{row.lastRating || '-'}</td>
                                                <td className="p-3">{formatTs(row.lastAt)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </main>
    );
}

function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <p className="text-xs uppercase tracking-wider text-[var(--fg-muted)]">{label}</p>
            <p className="text-2xl font-black">{value}</p>
        </div>
    );
}
