"use client";

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { useSession } from 'next-auth/react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Image from 'next/image';
import { safeAvatar } from '@/lib/constants/avatars';
import { cn } from '@/lib/utils';

interface RankedUser {
    _id: string;
    name: string;
    image?: string;
    totalMastered: number;
    totalPoints: number;
    grade: string;
    rank: number;
}

export default function LeaderboardPage() {
    const { data: session } = useSession();
    const [users, setUsers] = useState<RankedUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ totalUsers: 0, totalPages: 1, currentPage: 1 });

    useEffect(() => {
        if (page === 1) setLoading(true);
        else setIsFetching(true);

        fetch(`/api/social/leaderboard?page=${page}&limit=20`)
            .then(res => res.json())
            .then(data => {
                if (data.users) setUsers(data.users);
                if (data.pagination) setPagination(data.pagination);
                setLoading(false);
                setIsFetching(false);
                window.scrollTo({ top: 0, behavior: 'auto' });
            })
            .catch(err => { 
                console.error(err); 
                setLoading(false); 
                setIsFetching(false); 
            });
    }, [page]);

    // Extract top 3 for the podium
    const topThree = useMemo(() => {
        if (page !== 1) return [];
        return users.slice(0, 3);
    }, [users, page]);

    // Remaining users below top 3
    const listUsers = useMemo(() => {
        if (page !== 1) return users;
        return users.slice(3);
    }, [users, page]);

    return (
        <div className="pb-20 relative">
            <header className="mb-14 relative">
                <div className="absolute -left-10 top-0 w-2 h-14 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-cyan)] rounded-full hidden md:block" />
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-gradient-primary">Leaderboard</h1>
                <p className="text-[var(--fg-secondary)] text-base font-medium tracking-wide">
                    The elite node synchronizers in the Axiom matrix. Compare stats, synchronize progress.
                </p>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32">
                    <LoadingSpinner size="lg" label="Decrypting Matrix Rankings..." />
                </div>
            ) : users.length === 0 ? (
                <div className="py-16 text-center glass-panel rounded-2xl border-white/5 text-[var(--fg-secondary)] font-semibold shadow-xl">
                    No ranks logged in current frame.
                </div>
            ) : (
                <div className="space-y-12">
                    {/* Podium for Top 3 (only shown on Page 1) */}
                    {page === 1 && topThree.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto pt-6 mb-12">
                            {/* 2nd Place */}
                            {topThree[1] && (
                                <div className="order-2 md:order-1 glass-panel rounded-2xl p-6 text-center border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent hover:border-slate-400/20 transition-all duration-300 shadow-xl group">
                                    <div className="text-3xl mb-3 relative flex justify-center">
                                        🥈
                                    </div>
                                    <div className="w-16 h-16 rounded-full border-2 border-slate-400/40 overflow-hidden mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                                        <Image src={safeAvatar(topThree[1].image)} alt={topThree[1].name} width={64} height={64} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="font-bold text-white text-lg truncate">{topThree[1].name}</h3>
                                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4">{topThree[1].grade}</p>
                                    <div className="inline-block px-4 py-1.5 rounded-full bg-slate-400/10 border border-slate-400/20 font-bold text-[var(--fg-primary)] text-sm">
                                        {topThree[1].totalPoints.toLocaleString()} XP
                                    </div>
                                </div>
                            )}

                            {/* 1st Place */}
                            {topThree[0] && (
                                <div className="order-1 md:order-2 glass-panel rounded-2xl p-8 text-center border-[var(--color-primary)]/20 bg-gradient-to-br from-[var(--color-primary-glow)] via-transparent to-transparent hover:border-[var(--color-primary)]/40 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(99,102,241,0.1)] group md:-translate-y-4">
                                    <div className="text-4xl mb-4 relative flex justify-center animate-bounce">
                                        👑
                                    </div>
                                    <div className="w-20 h-20 rounded-full border-4 border-[var(--color-primary)] overflow-hidden mx-auto mb-4 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                                        <Image src={safeAvatar(topThree[0].image)} alt={topThree[0].name} width={80} height={80} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="font-extrabold text-white text-xl truncate">{topThree[0].name}</h3>
                                    <p className="text-[10px] font-black uppercase tracking-wider text-gradient-primary mb-5">{topThree[0].grade}</p>
                                    <div className="inline-block px-5 py-2 rounded-full bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/30 font-black text-[var(--color-cyan)] text-sm shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                                        {topThree[0].totalPoints.toLocaleString()} XP
                                    </div>
                                </div>
                            )}

                            {/* 3rd Place */}
                            {topThree[2] && (
                                <div className="order-3 glass-panel rounded-2xl p-6 text-center border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent hover:border-amber-700/20 transition-all duration-300 shadow-xl group">
                                    <div className="text-3xl mb-3 relative flex justify-center">
                                        🥉
                                    </div>
                                    <div className="w-16 h-16 rounded-full border-2 border-amber-700/40 overflow-hidden mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                                        <Image src={safeAvatar(topThree[2].image)} alt={topThree[2].name} width={64} height={64} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="font-bold text-white text-lg truncate">{topThree[2].name}</h3>
                                    <p className="text-[10px] font-black uppercase tracking-wider text-amber-600 mb-4">{topThree[2].grade}</p>
                                    <div className="inline-block px-4 py-1.5 rounded-full bg-amber-700/10 border border-amber-700/20 font-bold text-[var(--fg-primary)] text-sm">
                                        {topThree[2].totalPoints.toLocaleString()} XP
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Standard Ranks Block */}
                    {listUsers.length > 0 && (
                        <div className={cn(
                            "glass-panel rounded-2xl overflow-hidden shadow-2xl border-white/5 transition-all duration-300 relative",
                            isFetching && "opacity-75 pointer-events-none"
                        )}>
                            {isFetching && (
                                <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 backdrop-blur-sm">
                                    <LoadingSpinner size="md" />
                                </div>
                            )}
                            <div className="overflow-x-auto custom-scrollbar">
                                <table className="w-full text-left border-collapse min-w-[500px]">
                                    <thead>
                                        <tr className="bg-white/[0.02] border-b border-white/5">
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--fg-secondary)] w-24">Rank</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--fg-secondary)]">MATRIX OPERATOR</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--fg-secondary)] text-right">SYNC ENERGY</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {listUsers.map((user) => {
                                            const isCurrentUser = session?.user?.name && user.name === session.user.name;
                                            return (
                                                <tr 
                                                    key={user._id} 
                                                    className={cn(
                                                        "hover:bg-white/[0.02] transition-colors",
                                                        isCurrentUser && "bg-[var(--color-primary)]/5 border-l-2 border-[var(--color-primary)] relative after:absolute after:inset-y-0 after:left-0 after:w-[2px] after:bg-gradient-to-b after:from-[var(--color-primary)] after:to-[var(--color-cyan)] after:shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                                                    )}
                                                >
                                                    <td className="px-8 py-4.5 font-bold text-[var(--fg-secondary)]">#{user.rank}</td>
                                                    <td className="px-8 py-4.5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-xl border border-white/10 overflow-hidden shrink-0 shadow-md">
                                                                <Image src={safeAvatar(user.image)} alt={user.name} width={40} height={40} className="w-full h-full object-cover" />
                                                            </div>
                                                            <div>
                                                                <div className={cn("font-bold text-white flex items-center gap-2", isCurrentUser && "text-[var(--color-cyan)]")}>
                                                                    {user.name} 
                                                                    {isCurrentUser && <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-wider rounded-md bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/30 text-[var(--color-cyan)]">YOU</span>}
                                                                </div>
                                                                <div className="text-[9px] font-bold uppercase tracking-wider text-[var(--fg-secondary)] mt-0.5">{user.grade}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-4.5 text-right font-black text-white text-gradient-primary">
                                                        {user.totalPoints.toLocaleString()} XP
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {!loading && pagination.totalPages > 1 && (
                <div className="mt-10 flex items-center justify-between">
                    <p className="text-xs font-black text-[var(--fg-secondary)] uppercase tracking-[0.15em]">
                        CYCLE FRAME {page} OF {pagination.totalPages}
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-xl border-white/10 text-[var(--fg-secondary)] hover:text-white" disabled={page === 1 || isFetching} onClick={() => setPage(p => p - 1)}>
                            Back Frame
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-xl border-white/10 text-[var(--fg-secondary)] hover:text-white" disabled={page === pagination.totalPages || isFetching} onClick={() => setPage(p => p + 1)}>
                            Next Frame
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

