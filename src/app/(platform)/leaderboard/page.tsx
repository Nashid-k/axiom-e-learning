"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { springs } from '@/lib/motion/motion-config';
import { Button } from '@/components/ui/Button';
import { useSession } from 'next-auth/react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Image from 'next/image';
import { CyclingTypewriter } from '@/components/ui/CyclingTypewriter';

interface RankedUser {
    _id: string;
    name: string;
    image?: string;
    totalMastered: number;
    totalPoints: number;
    grade: string;
    rank: number;
}

const messages = [
    "See who's mastering the most topics.",
    "Climb the ranks by completing lessons.",
    "Practice problems and master new skills.",
    "Compete with the best sorcerers in Axiom."
];

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
        fetch(`/api/social/leaderboard?page=${page}&limit=13`)
            .then(res => res.json())
            .then(data => {
                if (data.users) setUsers(data.users);
                if (data.pagination) setPagination(data.pagination);
                setLoading(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch(err => { console.error(err); setLoading(false); });
    }, [page]);

    const podiumUsers = useMemo(() => page === 1 ? users.slice(0, 3) : [], [page, users]);
    const regularUsers = useMemo(() => page === 1 ? users.slice(3) : users, [page, users]);

    return (
        <div className="min-h-screen bg-[var(--surface-base)] text-[var(--fg-primary)] pt-[var(--space-7)] pb-[var(--space-5)] px-[var(--space-3)]">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-[var(--space-7)]">
                    <h1 className="text-[var(--text-heading)] sm:text-[var(--text-display)] font-black tracking-[var(--tracking-tight)] mb-[var(--space-2)]">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-500)] via-[var(--color-ana-blue-500)] to-[var(--color-comp-400)] animate-gradient-x background-animate">
                            Leaderboard.
                        </span>
                    </h1>
                    <div className="text-[var(--fg-secondary)] max-w-lg mx-auto h-[1.5em]">
                        <CyclingTypewriter messages={messages} />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-[var(--space-5)] min-h-[50vh]">
                            <LoadingSpinner size="lg" />
                            <p className="text-[var(--fg-muted)] mt-[var(--space-2)] animate-pulse">Summoning top sorcerers...</p>
                        </motion.div>
                    ) : page === 1 && users.length === 0 ? (
                        <motion.div key="empty" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                            className="p-[var(--space-5)] text-center text-[var(--fg-muted)] border border-dashed border-[var(--border-default)] rounded-[var(--radius-2xl)]">
                            <div className="text-4xl mb-[var(--space-2)]">🌪️</div>
                            No sorcerers found. Be the first to join the ranks!
                        </motion.div>
                    ) : (
                        <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                            {page === 1 && podiumUsers.length > 0 && (
                                <div className="relative pt-16 pb-8">
                                    {/* Podium Background Glow */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

                                    <div className="grid grid-cols-3 items-end gap-3 sm:gap-8 max-w-3xl mx-auto relative z-10">
                                        {/* Rank 2 - Silver */}
                                        <div className="order-1">
                                            {podiumUsers[1] && <PodiumItem user={podiumUsers[1]} rank={2} />}
                                        </div>

                                        {/* Rank 1 - Gold */}
                                        <div className="order-2 scale-110 sm:scale-125 z-20">
                                            {podiumUsers[0] && <PodiumItem user={podiumUsers[0]} rank={1} />}
                                        </div>

                                        {/* Rank 3 - Bronze */}
                                        <div className="order-3">
                                            {podiumUsers[2] && <PodiumItem user={podiumUsers[2]} rank={3} />}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {regularUsers.length > 0 && (
                                <div className="bg-white/5 dark:bg-black/20 backdrop-blur-3xl border border-black/[0.03] dark:border-white/5 rounded-[32px] overflow-hidden shadow-2xl relative">
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                                    <div className="divide-y divide-black/[0.03] dark:divide-white/5">
                                        {regularUsers.map((user, i) => (
                                            <LeaderboardRow key={user._id} user={user} index={i} realRank={user.rank} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
                {!loading && pagination.totalPages > 1 && (
                    <div className="mt-[var(--space-3)] flex justify-center gap-[var(--space-2)]">
                        <Button variant="secondary" disabled={page === 1}
                            onClick={() => { setLoading(true); setPage(p => p - 1); }}>
                            Previous
                        </Button>
                        <span className="flex items-center text-[var(--text-caption)] font-[var(--font-weight-medium)] text-[var(--fg-muted)]">
                            Page {page} of {pagination.totalPages}
                        </span>
                        <Button variant="secondary" disabled={page === pagination.totalPages}
                            onClick={() => { setLoading(true); setPage(p => p + 1); }}>
                            Next
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

function PodiumItem({ user, rank }: { user: RankedUser; rank: number }) {
    const isGold = rank === 1;
    const isSilver = rank === 2;
    const isBronze = rank === 3;

    const colors = {
        1: {
            bg: 'bg-gradient-to-b from-yellow-400/20 to-yellow-600/5',
            border: 'border-yellow-500/30',
            text: 'text-yellow-500',
            glow: 'shadow-[0_0_40px_-10px_rgba(234,179,8,0.3)]',
            podium: 'h-32 sm:h-48'
        },
        2: {
            bg: 'bg-gradient-to-b from-slate-400/20 to-slate-600/5',
            border: 'border-slate-500/30',
            text: 'text-slate-400',
            glow: 'shadow-[0_0_30px_-10px_rgba(148,163,184,0.2)]',
            podium: 'h-24 sm:h-36'
        },
        3: {
            bg: 'bg-gradient-to-b from-amber-600/20 to-amber-800/5',
            border: 'border-amber-700/30',
            text: 'text-amber-600',
            glow: 'shadow-[0_0_30px_-10px_rgba(180,83,9,0.2)]',
            podium: 'h-20 sm:h-28'
        }
    }[rank as 1 | 2 | 3];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center group cursor-pointer"
        >
            <div className="relative mb-4 sm:mb-6">
                <motion.div
                    animate={isGold ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 4, repeat: Infinity }}
                    className={`relative w-16 h-16 sm:w-28 sm:h-28 rounded-full z-10 border-4 ${colors.border} ${colors.glow} overflow-hidden bg-white/5`}
                >
                    <Image src={safeAvatar(user.image)} alt={user.name} width={120} height={120} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                </motion.div>

                <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-2 z-20 text-2xl sm:text-4xl filter drop-shadow-lg">
                    {isGold ? "👑" : isSilver ? "🥈" : "🥉"}
                </div>

                <div className={`absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 sm:px-4 py-1 rounded-full bg-white dark:bg-[#0D0D0E] border ${colors.border} shadow-lg text-[10px] sm:text-xs font-black tracking-tighter uppercase whitespace-nowrap`}>
                    Rank {rank}
                </div>
            </div>

            <div className="text-center mb-4 min-w-0 px-2">
                <h3 className="text-sm sm:text-lg font-black text-gray-900 dark:text-white truncate max-w-[120px] sm:max-w-[200px]">
                    {user.name}
                </h3>
                <p className={`text-[10px] sm:text-xs font-mono font-black ${colors.text}`}>
                    {new Intl.NumberFormat().format(user.totalPoints)} <span className="opacity-60">PTS</span>
                </p>
            </div>

            {/* Podium Base */}
            <div className={`w-full ${colors.podium} ${colors.bg} rounded-t-[24px] sm:rounded-t-[32px] border-x border-t ${colors.border} relative overflow-hidden transition-all duration-500 group-hover:brightness-125`}>
                <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                    <span className="text-6xl sm:text-8xl font-black">{rank}</span>
                </div>
            </div>
        </motion.div>
    );
}

function LeaderboardRow({ user, index, realRank }: { user: RankedUser; index: number; realRank: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + (index * 0.03) }}
            whileHover={{ x: 4, backgroundColor: 'rgba(59, 130, 246, 0.03)' }}
            className="flex items-center justify-between p-4 group cursor-pointer relative"
        >
            <div className="flex items-center gap-4">
                <span className="w-8 text-center font-mono font-black text-xs text-gray-400 group-hover:text-blue-500 transition-colors">
                    #{realRank}
                </span>

                <div className="relative">
                    <div className="w-12 h-12 rounded-[16px] bg-gray-100 dark:bg-white/[0.03] p-0.5 overflow-hidden transition-all duration-300 group-hover:rounded-full group-hover:scale-105 border border-black/[0.03] dark:border-white/[0.03]">
                        <Image src={safeAvatar(user.image)} alt={user.name} width={48} height={48} className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="flex flex-col">
                    <h4 className="font-bold text-gray-900 dark:text-white capitalize group-hover:text-blue-500 transition-colors">
                        {user.name}
                    </h4>
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 group-hover:text-gray-500 transition-colors">
                        {user.grade}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="text-right">
                    <p className="font-mono font-black text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                        {new Intl.NumberFormat().format(user.totalPoints)}
                    </p>
                    <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Axiom Points</p>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                </div>
            </div>
        </motion.div>
    );
}
