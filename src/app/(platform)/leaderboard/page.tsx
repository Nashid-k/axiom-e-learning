"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useSession } from 'next-auth/react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Image from 'next/image';

interface RankedUser {
    _id: string;
    name: string;
    image?: string;
    totalMastered: number;
    totalPoints: number;
    grade: string;
    rank: number;
}

const VALID_AVATARS = [
    '/avatars/boy-1.png', '/avatars/boy-2.png', '/avatars/boy-3.png', '/avatars/boy-4.png', '/avatars/boy-5.png',
    '/avatars/girl-1.png', '/avatars/girl-2.png', '/avatars/girl-3.png', '/avatars/girl-4.png', '/avatars/girl-5.png',
    '/avatars/default.png'
];

function safeAvatar(img?: string) {
    return img && VALID_AVATARS.includes(img) ? img : "/avatars/default.png";
}

export default function LeaderboardPage() {
    useSession();
    const [users, setUsers] = useState<RankedUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ totalUsers: 0, totalPages: 1, currentPage: 1 });

    useEffect(() => {
        fetch(`/api/social/leaderboard?page=${page}&limit=20`)
            .then(res => res.json())
            .then(data => {
                if (data.users) setUsers(data.users);
                if (data.pagination) setPagination(data.pagination);
                setLoading(false);
                window.scrollTo({ top: 0, behavior: 'auto' });
            })
            .catch(err => { console.error(err); setLoading(false); });
    }, [page]);

    return (
        <div className="min-h-screen bg-white dark:bg-black p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Leaderboard</h1>
                    <p className="text-lg text-neutral-500 dark:text-neutral-400">
                        Top learners in the Axiom community.
                    </p>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <LoadingSpinner size="lg" label="Loading ranks..." />
                    </div>
                ) : users.length === 0 ? (
                    <div className="p-12 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-md text-neutral-500">
                        No rankings found yet.
                    </div>
                ) : (
                    <div className="border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 w-20">Rank</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">User</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-right">Points</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-950 transition-none">
                                        <td className="px-6 py-4 font-bold text-neutral-400">#{user.rank}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full border border-neutral-100 dark:border-neutral-900 overflow-hidden shrink-0">
                                                    <Image src={safeAvatar(user.image)} alt={user.name} width={40} height={40} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-black dark:text-white">{user.name}</div>
                                                    <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{user.grade}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-brand-500">
                                            {user.totalPoints.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && pagination.totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-between">
                        <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
                            Page {page} of {pagination.totalPages}
                        </p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => { setLoading(true); setPage(p => p - 1); }}>
                                Previous
                            </Button>
                            <Button variant="outline" size="sm" disabled={page === pagination.totalPages} onClick={() => { setLoading(true); setPage(p => p + 1); }}>
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
