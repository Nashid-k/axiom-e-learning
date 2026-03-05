"use client";

import { useEffect, useState } from 'react';
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
    const { data: session } = useSession();
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
    }, [page]); // Removed session?.user?.image/name — leaderboard data is independent of current user's profile (Audit 2, Flaw 29)

    const podiumUsers = page === 1 ? users.slice(0, 3) : [];
    const regularUsers = page === 1 ? users.slice(3) : users;

    return (
        <div className="min-h-screen bg-[var(--surface-base)] text-[var(--fg-primary)] pt-[var(--space-7)] pb-[var(--space-5)] px-[var(--space-3)]">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-[var(--space-7)]">
                    <h1 className="text-[var(--text-display)] font-black tracking-[var(--tracking-tight)] mb-[var(--space-2)]">
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
                        <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {page === 1 && podiumUsers.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-2)] mb-[var(--space-7)] items-end relative z-10">
                                    {podiumUsers[1] && <PodiumItem user={podiumUsers[1]} rank={2} />}
                                    {podiumUsers[0] && <PodiumItem user={podiumUsers[0]} rank={1} />}
                                    {podiumUsers[2] && <PodiumItem user={podiumUsers[2]} rank={3} />}
                                </div>
                            )}
                            {regularUsers.length > 0 && (
                                <div className={[
                                    "bg-[var(--surface-raised)]",
                                    "border border-[var(--border-default)]",
                                    "rounded-[var(--radius-xl)] overflow-hidden",
                                    "shadow-[var(--shadow-sm)]",
                                ].join(' ')}>
                                    {regularUsers.map((user, i) => (
                                        <LeaderboardRow key={user._id} user={user} index={i} realRank={user.rank} />
                                    ))}
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

    const cardColor = isGold
        ? 'bg-gradient-to-b from-yellow-50 to-[var(--surface-base)] dark:from-yellow-500/10 border-yellow-200 dark:border-yellow-500/20 md:-translate-y-8 shadow-[0_20px_50px_-10px_var(--color-comp-400)/0.3] z-10'
        : isSilver
            ? 'bg-gradient-to-b from-[var(--surface-raised)] to-[var(--surface-base)] border-[var(--border-default)] shadow-[var(--shadow-md)]'
            : 'bg-gradient-to-b from-orange-50 dark:from-orange-500/10 to-[var(--surface-base)] border-orange-200 dark:border-orange-500/20 shadow-[var(--shadow-md)]';

    const ringColor = isGold ? 'ring-yellow-100 dark:ring-yellow-900/40' : isSilver ? 'ring-[var(--color-100)] dark:ring-[var(--color-900)]/40' : 'ring-orange-100 dark:ring-orange-900/40';
    const gradAvatar = isGold ? 'from-yellow-300 to-yellow-500' : isSilver ? 'from-slate-300 to-slate-400' : 'from-orange-300 to-orange-400';
    const ptColor = isGold ? 'text-yellow-600 dark:text-yellow-400' : isSilver ? 'text-[var(--fg-secondary)]' : 'text-orange-600 dark:text-orange-400';

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: isGold ? -20 : 0, transition: springs.responsive }}
            whileHover={{ y: isGold ? -30 : -10, scale: 1.02, transition: springs.snap }}
            className={`flex flex-col items-center p-[var(--space-3)] rounded-[var(--radius-2xl)] border relative overflow-hidden group ${cardColor}`}
        >
            <div className={`absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-slow)]
                ${isGold ? 'from-[var(--color-comp-400)]/20 to-transparent animate-pulse' : ''}
                ${isSilver ? 'from-[var(--border-strong)]/20 to-transparent' : ''}
                ${isBronze ? 'from-orange-500/20 to-transparent' : ''}
            `} />

            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: rank * 1.5 }}
                className={`relative mb-[var(--space-2)] w-24 h-24 rounded-[var(--radius-full)] flex items-center justify-center text-3xl font-bold shadow-2xl ring-4 bg-gradient-to-br text-white ${gradAvatar} ${ringColor}`}
            >
                <div className="w-full h-full rounded-[var(--radius-full)] overflow-hidden border-2 border-white/20">
                    <Image src={safeAvatar(user.image)} alt={user.name} width={96} height={96} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[var(--surface-base)] p-[6px] rounded-[var(--radius-full)] shadow-[var(--shadow-md)] border border-[var(--border-default)] text-xl">
                    {isGold && "👑"}{isSilver && "🥈"}{isBronze && "🥉"}
                </div>
            </motion.div>

            <div className="mb-[var(--space-1)] bg-[var(--surface-overlay)] backdrop-blur-sm px-[var(--space-1)] py-[2px] rounded-[var(--radius-full)] text-[10px] font-bold shadow-[var(--shadow-sm)] border border-[var(--border-default)] text-[var(--fg-muted)] uppercase tracking-wider z-20 whitespace-nowrap">
                Rank {rank}
            </div>

            <h3 className="font-[var(--font-weight-bold)] text-[var(--text-body)] md:text-[var(--text-heading)] text-center mb-[4px] relative z-10 capitalize text-[var(--fg-primary)]">
                {user.name}
            </h3>
            <p className={`font-mono font-bold text-[var(--text-caption)] relative z-10 ${ptColor}`}>
                {new Intl.NumberFormat().format(user.totalPoints)} pts
            </p>
        </motion.div>
    );
}

function LeaderboardRow({ user, index, realRank }: { user: RankedUser; index: number; realRank: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + (index * 0.05) }}
            whileHover={{ y: -2, scale: 1.005, transition: springs.snap }}
            className={[
                "flex items-center justify-between",
                "p-[var(--space-2)] sm:p-[var(--space-2)]",
                "border-b border-[var(--border-default)] last:border-0",
                "transition-all cursor-pointer group relative",
                "hover:bg-[var(--surface-overlay)]",
            ].join(' ')}
        >
            <div className="flex items-center gap-[var(--space-2)] sm:gap-[var(--space-2)] relative z-10">
                <span className="w-8 text-center font-mono font-bold text-[var(--fg-muted)] text-[var(--text-caption)] opacity-50 group-hover:opacity-100 transition-opacity">
                    #{realRank}
                </span>
                <div className="w-10 h-10 rounded-[var(--radius-full)] bg-[var(--color-50)] flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden shadow-[var(--shadow-sm)]">
                    <Image src={safeAvatar(user.image)} alt={user.name} width={40} height={40} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col items-start min-w-0">
                    <h4 className={[
                        "font-[var(--font-weight-medium)] text-[var(--fg-primary)]",
                        "group-hover:text-[var(--color-500)] transition-colors",
                        "truncate w-full max-w-[200px] sm:max-w-xs capitalize",
                    ].join(' ')} title={user.name}>
                        {user.name}
                    </h4>
                    <p className="text-[var(--text-caption)] text-[var(--fg-muted)] font-[var(--font-weight-medium)]">{user.grade}</p>
                </div>
            </div>
            <div className="font-mono font-bold text-[var(--color-500)] relative z-10 group-hover:scale-105 transition-transform">
                {new Intl.NumberFormat().format(user.totalPoints)}{' '}
                <span className="text-[var(--text-caption)] text-[var(--fg-muted)] font-sans font-normal ml-[4px]">pts</span>
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-500)] opacity-0 group-hover:opacity-100 transition-opacity rounded-r-[var(--radius-sm)]" />
        </motion.div>
    );
}
