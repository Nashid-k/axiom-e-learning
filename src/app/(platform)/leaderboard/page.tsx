"use client";

import { useState, useEffect } from 'react';
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

    return (
        <div className="pb-12">
            <header className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-2 text-[var(--fg-primary)]">Leaderboard</h1>
                <p className="text-[var(--fg-secondary)]">
                    Top learners in the Axiom community.
                </p>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24">
                    <LoadingSpinner size="lg" label="Loading ranks..." />
                </div>
            ) : users.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-[var(--surface-border)] rounded-md text-[var(--fg-muted)]">
                    No rankings found yet.
                </div>
            ) : (
                <div className={cn(
                    "border border-[var(--surface-border)] rounded-md overflow-x-auto bg-[var(--surface-base)] relative",
                    isFetching && "opacity-70 pointer-events-none"
                )}>
                    {isFetching && (
                        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/20 dark:bg-black/20">
                            <LoadingSpinner size="md" />
                        </div>
                    )}
                    <table className="w-full text-left border-collapse min-w-[480px]">
                        <thead>
                            <tr className="bg-[var(--surface-raised)] border-b border-[var(--surface-border)]">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)] w-20">Rank</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)]">User</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)] text-right">Points</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--surface-border)]">
                            {users.map((user) => {
                                const isCurrentUser = session?.user?.name && user.name === session.user.name;
                                return (
                                    <tr 
                                        key={user._id} 
                                        className={cn(
                                            "hover:bg-[var(--surface-raised)] transition-colors",
                                            isCurrentUser && "bg-[var(--color-primary)]/5 border-l-2 border-[var(--color-primary)]"
                                        )}
                                    >
                                        <td className="px-6 py-4 font-bold text-[var(--fg-muted)]">#{user.rank}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full border border-[var(--surface-border)] overflow-hidden shrink-0">
                                                    <Image src={safeAvatar(user.image)} alt={user.name} width={40} height={40} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className={cn("font-bold text-[var(--fg-primary)]", isCurrentUser && "text-[var(--color-primary)]")}>{user.name} {isCurrentUser && " (You)"}</div>
                                                    <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)]">{user.grade}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-[var(--color-primary)]">
                                            {user.totalPoints.toLocaleString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && pagination.totalPages > 1 && (
                <div className="mt-8 flex items-center justify-between">
                    <p className="text-xs font-bold text-[var(--fg-muted)] uppercase tracking-widest">
                        Page {page} of {pagination.totalPages}
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled={page === 1 || isFetching} onClick={() => setPage(p => p - 1)}>
                            Previous
                        </Button>
                        <Button variant="outline" size="sm" disabled={page === pagination.totalPages || isFetching} onClick={() => setPage(p => p + 1)}>
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
