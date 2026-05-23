'use client';

import { useEffect, useState } from 'react';
import BentoCard from '@/components/ui/BentoCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`/api/vitals?source=auto&windowHours=${windowHours}&limit=10000`);
                if (res.ok) setSnapshot(await res.json());
            } catch { } finally {
                setLoading(false);
            }
        };
        load();
        
        let timer: ReturnType<typeof setInterval> | null = setInterval(load, refreshMs);

        const handleVisibility = () => {
            if (document.hidden) {
                if (timer) {
                    clearInterval(timer);
                    timer = null;
                }
            } else {
                load();
                if (!timer) {
                    timer = setInterval(load, refreshMs);
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);
        return () => {
            if (timer) clearInterval(timer);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, [refreshMs, windowHours]);

    return (
        <main className="min-h-screen p-6 md:p-12 bg-transparent text-[var(--fg-primary)]">
            <div className="max-w-7xl mx-auto space-y-12">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8 animate-spring-up" style={{ animationDelay: '0ms' }}>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-cyan)] mb-2.5">CORE CONSOLE</div>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gradient-primary">System Vitals</h1>
                        <p className="text-xs text-[var(--fg-secondary)] mt-1 uppercase tracking-widest font-black">
                            {snapshot ? `Snapshot: ${formatTs(snapshot.generatedAt)}` : 'Initializing System Vitals...'}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <select 
                            className="bg-[var(--surface-base)] border border-white/5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider outline-none text-[var(--fg-secondary)] cursor-pointer hover:border-white/10 transition-colors" 
                            value={refreshMs} 
                            onChange={(e) => setRefreshMs(Number(e.target.value))}
                        >
                            <option value={1000} className="bg-black text-white">1s Refresh</option>
                            <option value={2000} className="bg-black text-white">2s Refresh</option>
                            <option value={5000} className="bg-black text-white">5s Refresh</option>
                        </select>
                        <select 
                            className="bg-[var(--surface-base)] border border-white/5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider outline-none text-[var(--fg-secondary)] cursor-pointer hover:border-white/10 transition-colors" 
                            value={windowHours} 
                            onChange={(e) => setWindowHours(Number(e.target.value))}
                        >
                            <option value={1} className="bg-black text-white">1h Window</option>
                            <option value={24} className="bg-black text-white">24h Window</option>
                            <option value={168} className="bg-black text-white">7d Window</option>
                        </select>
                    </div>
                </header>

                {loading && !snapshot ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <LoadingSpinner size="lg" label="Extracting System Health Metrics" />
                    </div>
                ) : snapshot && (
                    <>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard label="API Samples" value={snapshot.totals.apiPoints} icon="📡" index={1} />
                            <StatCard label="Web Samples" value={snapshot.totals.webPoints} icon="💻" index={2} />
                            <StatCard label="Endpoints" value={snapshot.totals.uniqueApiRoutes} icon="🧬" index={3} />
                            <StatCard label="Metrics" value={snapshot.totals.uniqueWebMetrics} icon="📊" index={4} />
                        </div>

                        <VitalsTable title="API Endpoints Matrix" headers={['Method', 'Path', 'Requests', 'Error Rate', 'Avg Latency', 'p95 Latency', 'Status']}>
                            {snapshot.apiSummary.map((row, i) => {
                                const isErr = row.errorRate > 0;
                                return (
                                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.015] transition-colors group">
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                                                row.method === 'GET' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' :
                                                row.method === 'POST' ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' :
                                                'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                                            }`}>
                                                {row.method}
                                            </span>
                                        </td>
                                        <td className="p-4 font-mono text-xs text-white max-w-[240px] truncate">{row.path}</td>
                                        <td className="p-4 text-xs font-semibold text-white">{row.requests}</td>
                                        <td className={`p-4 text-xs font-black ${isErr ? 'text-[var(--color-accent)]' : 'text-[var(--fg-secondary)]'}`}>
                                            {row.errorRate}%
                                        </td>
                                        <td className="p-4 text-xs font-semibold text-white">{row.avgMs}ms</td>
                                        <td className="p-4 text-xs font-black text-white">{row.p95Ms}ms</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase ${
                                                row.lastStatus >= 200 && row.lastStatus < 300 ? 'text-[var(--color-success)]' :
                                                'text-[var(--color-accent)]'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${
                                                    row.lastStatus >= 200 && row.lastStatus < 300 ? 'bg-[var(--color-success)]' : 'bg-[var(--color-accent)]'
                                                }`} />
                                                {row.lastStatus}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </VitalsTable>

                        <VitalsTable title="Web Performance Indicators" headers={['Metric Type', 'Path / Scope', 'Total Samples', 'Average', 'p95 Metric', 'Rating Status']}>
                            {snapshot.webSummary.map((row, i) => {
                                const rating = row.lastRating?.toLowerCase() || '';
                                return (
                                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.015] transition-colors">
                                        <td className="p-4 font-extrabold text-xs text-white tracking-wide">{row.metric}</td>
                                        <td className="p-4 font-mono text-xs text-[var(--fg-secondary)] truncate max-w-[240px]">{row.path}</td>
                                        <td className="p-4 text-xs font-semibold text-white">{row.samples}</td>
                                        <td className="p-4 text-xs font-semibold text-white">{Math.round(row.avg)}</td>
                                        <td className="p-4 text-xs font-black text-white">{Math.round(row.p95)}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase ${
                                                rating === 'good' ? 'text-[var(--color-success)]' :
                                                rating === 'needs-improvement' ? 'text-amber-400' :
                                                rating === 'poor' ? 'text-[var(--color-accent)]' :
                                                'text-[var(--fg-secondary)]'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${
                                                    rating === 'good' ? 'bg-[var(--color-success)]' :
                                                    rating === 'needs-improvement' ? 'bg-amber-400' :
                                                    rating === 'poor' ? 'bg-[var(--color-accent)]' :
                                                    'bg-[var(--fg-secondary)]'
                                                }`} />
                                                {row.lastRating || 'Unknown'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </VitalsTable>
                    </>
                )}
            </div>
        </main>
    );
}

function StatCard({ label, value, icon, index }: { label: string; value: number; icon: string; index: number }) {
    return (
        <BentoCard 
            size="small" 
            className="flex flex-col justify-center animate-spring-up bg-gradient-to-br from-[var(--surface-raised)] to-transparent border-white/5 opacity-0"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--fg-secondary)]">{label}</span>
                <span className="text-lg filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]">{icon}</span>
            </div>
            <div className="text-3xl font-extrabold tracking-tight text-gradient-primary">
                {value.toLocaleString()}
            </div>
        </BentoCard>
    );
}

function VitalsTable({ title, headers, children }: { title: string; headers: string[]; children: React.ReactNode }) {
    return (
        <section className="animate-spring-up opacity-0" style={{ animationDelay: '400ms' }}>
            <h2 className="text-sm font-extrabold uppercase tracking-[0.25em] text-[var(--color-cyan)] mb-6 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[var(--color-primary)] rounded-full shadow-[0_0_8px_var(--color-primary)]" />
                <span>{title}</span>
            </h2>
            <div className="glass-panel rounded-2xl overflow-hidden shadow-[0_12px_45px_rgba(0,0,0,0.5)] border-white/5 overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="bg-white/[0.02] border-b border-white/5">
                        <tr>
                            {headers.map(h => (
                                <th key={h} className="p-4 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--fg-secondary)]">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">{children}</tbody>
                </table>
            </div>
        </section>
    );
}
