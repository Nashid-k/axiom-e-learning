'use client';

import { useEffect, useState } from 'react';

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
    const [refreshMs, setRefreshMs] = useState(2000);
    const [windowHours, setWindowHours] = useState(24);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`/api/vitals?source=auto&windowHours=${windowHours}&limit=10000`);
                if (res.ok) setSnapshot(await res.json());
            } catch { }
        };
        load();
        const timer = setInterval(load, refreshMs);
        return () => clearInterval(timer);
    }, [refreshMs, windowHours]);

    return (
        <main className="min-h-screen p-6 md:p-12 bg-white dark:bg-black text-black dark:text-white">
            <div className="max-w-7xl mx-auto space-y-12">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-neutral-100 dark:border-neutral-900 pb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">System Vitals</h1>
                        <p className="text-sm text-neutral-400 mt-1 uppercase tracking-widest font-bold">
                            {snapshot ? `Snapshot: ${formatTs(snapshot.generatedAt)}` : 'Initializing...'}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <select className="bg-transparent border border-neutral-200 dark:border-neutral-800 rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-widest outline-none" value={refreshMs} onChange={(e) => setRefreshMs(Number(e.target.value))}>
                            <option value={1000}>1s Refresh</option>
                            <option value={2000}>2s Refresh</option>
                            <option value={5000}>5s Refresh</option>
                        </select>
                        <select className="bg-transparent border border-neutral-200 dark:border-neutral-800 rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-widest outline-none" value={windowHours} onChange={(e) => setWindowHours(Number(e.target.value))}>
                            <option value={1}>1h Window</option>
                            <option value={24}>24h Window</option>
                            <option value={168}>7d Window</option>
                        </select>
                    </div>
                </header>

                {snapshot && (
                    <>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard label="API Samples" value={snapshot.totals.apiPoints} />
                            <StatCard label="Web Samples" value={snapshot.totals.webPoints} />
                            <StatCard label="Endpoints" value={snapshot.totals.uniqueApiRoutes} />
                            <StatCard label="Metrics" value={snapshot.totals.uniqueWebMetrics} />
                        </div>

                        <VitalsTable title="API Endpoints" headers={['Method', 'Path', 'Reqs', 'Err%', 'Avg', 'P95', 'Status']}>
                            {snapshot.apiSummary.map((row, i) => (
                                <tr key={i} className="border-b border-neutral-50 dark:border-neutral-950 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-950">
                                    <td className="p-4 font-bold text-xs">{row.method}</td>
                                    <td className="p-4 font-mono text-xs">{row.path}</td>
                                    <td className="p-4 text-xs">{row.requests}</td>
                                    <td className={`p-4 text-xs font-bold ${row.errorRate > 0 ? 'text-red-500' : 'text-neutral-400'}`}>{row.errorRate}%</td>
                                    <td className="p-4 text-xs">{row.avgMs}ms</td>
                                    <td className="p-4 text-xs font-bold">{row.p95Ms}ms</td>
                                    <td className="p-4 text-xs">{row.lastStatus}</td>
                                </tr>
                            ))}
                        </VitalsTable>

                        <VitalsTable title="Web Performance" headers={['Metric', 'Path', 'Samples', 'Avg', 'P95', 'Rating']}>
                            {snapshot.webSummary.map((row, i) => (
                                <tr key={i} className="border-b border-neutral-50 dark:border-neutral-950 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-950">
                                    <td className="p-4 font-bold text-xs">{row.metric}</td>
                                    <td className="p-4 font-mono text-xs truncate max-w-[200px]">{row.path}</td>
                                    <td className="p-4 text-xs">{row.samples}</td>
                                    <td className="p-4 text-xs">{Math.round(row.avg)}</td>
                                    <td className="p-4 text-xs font-bold">{Math.round(row.p95)}</td>
                                    <td className="p-4 text-xs uppercase font-bold tracking-tighter">{row.lastRating || '-'}</td>
                                </tr>
                            ))}
                        </VitalsTable>
                    </>
                )}
            </div>
        </main>
    );
}

function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-md bg-white dark:bg-black">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">{label}</p>
            <p className="text-3xl font-bold">{value.toLocaleString()}</p>
        </div>
    );
}

function VitalsTable({ title, headers, children }: { title: string; headers: string[]; children: React.ReactNode }) {
    return (
        <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-6">{title}</h2>
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-900">
                        <tr>
                            {headers.map(h => (
                                <th key={h} className="p-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>
            </div>
        </section>
    );
}
