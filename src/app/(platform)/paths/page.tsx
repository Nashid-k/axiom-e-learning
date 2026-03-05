'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

import BentoCard from '@/components/ui/BentoCard';
import { TechIcon } from '@/components/ui/TechIcon';
import { staggerContainer, fadeInUp } from '@/lib/motion/motion-config';
import { CATEGORIES } from '@/features/curriculum/curriculum-constants';
import { useGlobalProgress } from '@/lib/providers/ProgressProvider';
import { useTopics } from '@/features/learning/hooks/useTopics';
import { getTopicsDueForReview } from '@/features/learning/spaced-repetition';

import React from 'react';
import { CyclingTypewriter } from '@/components/ui/CyclingTypewriter';

const categories = CATEGORIES;

const messages = [
    "Pick a track, stay in flow, and let Axiom keep you moving from fundamentals to production-level skills.",
    "Master the fundamentals, conquer frameworks, and build software that scales.",
    "Data structures, Algorithms, System Design - your roadmap to technical excellence.",
    "Stop tutorial hell. Start building real-world projects with guided mastery."
];

function get7DayActivity(): number[] {
    if (typeof window === 'undefined') return Array(7).fill(0);
    try {
        const raw = localStorage.getItem('axiom_activity_7d');
        if (raw) {
            const data = JSON.parse(raw);
            if (Array.isArray(data) && data.length === 7) return data;
        }
    } catch { }
    return Array(7).fill(0);
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function ExplorePage() {
    const shouldReduceMotion = useReducedMotion();
    const { xp, level, streak, progress, progressToNextLevel } = useGlobalProgress();
    const { topics: userTopics } = useTopics();

    const totalMastered = useMemo(() =>
        Object.values(progress).reduce((acc, items) => acc + items.length, 0), [progress]);

    const reviewDueCount = useMemo(() =>
        getTopicsDueForReview(userTopics).length, [userTopics]);

    const activeCurricula = useMemo(() =>
        Object.keys(progress).filter(slug => progress[slug].length > 0).length, [progress]);

    const activityData = useMemo(() => get7DayActivity(), []);
    const maxActivity = Math.max(...activityData, 1);
    const statCard = "rounded-[var(--radius-xl)] border p-[var(--space-2)]";

    return (
        <div className="min-h-screen bg-[var(--surface-base)] pb-[var(--space-5)]">
            <motion.main
                initial={shouldReduceMotion ? false : "initial"}
                animate={shouldReduceMotion ? undefined : "animate"}
                variants={shouldReduceMotion ? undefined : staggerContainer}
                className="relative z-10 w-full px-[var(--space-2)] md:px-[var(--space-4)] lg:px-[var(--space-4)] pt-[var(--space-7)] pb-[var(--space-4)]"
            >
                <motion.div variants={shouldReduceMotion ? undefined : fadeInUp} className="mb-[var(--space-4)] max-w-4xl">
                    <h1 className="text-[var(--text-display)] font-black tracking-[var(--tracking-tight)] mb-[var(--space-2)]">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-500)] via-[var(--color-ana-blue-500)] to-[var(--color-comp-400)] animate-gradient-x background-animate">
                            Learning paths.
                        </span>
                    </h1>
                    <p className="text-[var(--text-heading)] text-[var(--fg-secondary)] max-w-3xl leading-[var(--leading-relaxed)] font-medium min-h-[3.5rem] md:min-h-0">
                        <CyclingTypewriter messages={messages} />
                    </p>
                </motion.div>
                <motion.div
                    variants={shouldReduceMotion ? undefined : fadeInUp}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[var(--space-1)] mb-[var(--space-4)]"
                >
                    <div className={`${statCard} bg-[var(--color-50)] dark:bg-[var(--color-950)]/40 border-[var(--color-200)] dark:border-[var(--color-900)]/30`}>
                        <div className="text-2xl font-black text-[var(--color-500)]">{level}</div>
                        <div className="text-[var(--text-caption)] font-[var(--font-weight-semibold)] uppercase tracking-wider text-[var(--color-400)] mt-[4px]">Level</div>
                        <div className="mt-[var(--space-1)] h-1 bg-[var(--color-200)] dark:bg-[var(--color-900)]/30 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressToNextLevel}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="h-full bg-[var(--color-500)] rounded-full"
                            />
                        </div>
                    </div>
                    <div className={`${statCard} bg-[var(--color-ana-blue-400)]/10 dark:bg-[var(--color-ana-blue-500)]/10 border-[var(--color-ana-blue-400)]/30`}>
                        <div className="text-2xl font-black text-[var(--color-ana-blue-500)]">{xp.toLocaleString()}</div>
                        <div className="text-[var(--text-caption)] font-[var(--font-weight-semibold)] uppercase tracking-wider text-[var(--color-ana-blue-400)] mt-[4px]">Total XP</div>
                    </div>
                    <div className={`${statCard} bg-orange-50 dark:bg-orange-950/40 border-orange-100 dark:border-orange-900/30`}>
                        <div className="text-2xl font-black text-orange-600 dark:text-orange-400 flex items-baseline gap-[6px]">
                            {streak}<span className="text-lg">🔥</span>
                        </div>
                        <div className="text-[var(--text-caption)] font-[var(--font-weight-semibold)] uppercase tracking-wider text-orange-500/70 mt-[4px]">Day Streak</div>
                    </div>
                    <div className={`${statCard} bg-[var(--color-comp-400)]/10 dark:bg-[var(--color-comp-500)]/10 border-[var(--color-comp-400)]/30`}>
                        <div className="text-2xl font-black text-[var(--color-comp-500)]">{totalMastered}</div>
                        <div className="text-[var(--text-caption)] font-[var(--font-weight-semibold)] uppercase tracking-wider text-[var(--color-comp-400)] mt-[4px]">Mastered</div>
                    </div>
                    <div className={`${statCard} bg-rose-50 dark:bg-rose-950/40 border-rose-100 dark:border-rose-900/30`}>
                        <div className="text-2xl font-black text-rose-600 dark:text-rose-400 flex items-baseline gap-[6px]">
                            {reviewDueCount}
                            {reviewDueCount > 0 && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse inline-block" />}
                        </div>
                        <div className="text-[var(--text-caption)] font-[var(--font-weight-semibold)] uppercase tracking-wider text-rose-500/70 mt-[4px]">Due Review</div>
                    </div>
                    <div className={`${statCard} bg-[var(--surface-raised)] border-[var(--border-default)]`}>
                        <div className="flex items-end gap-[3px] h-8 mb-[6px]">
                            {activityData.map((val, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${Math.max(12, (val / maxActivity) * 100)}%` }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className={`flex-1 rounded-[var(--radius-sm)] ${val > 0
                                        ? 'bg-gradient-to-t from-[var(--color-500)] to-[var(--color-300)]'
                                        : 'bg-[var(--border-default)]'
                                        }`}
                                    title={`${DAY_LABELS[i]}: ${val} items`}
                                />
                            ))}
                        </div>
                        <div className="text-[var(--text-caption)] font-[var(--font-weight-semibold)] uppercase tracking-wider text-[var(--fg-muted)] flex items-center justify-between">
                            <span>7-Day</span>
                            <span>{activeCurricula} active</span>
                        </div>
                    </div>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[var(--space-2)]">
                    {categories.map((category) => (
                        <motion.div
                            key={category}
                            variants={shouldReduceMotion ? undefined : fadeInUp}
                            className="h-full"
                            whileHover={shouldReduceMotion ? undefined : { y: -5, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                        >
                            <Link href={`/paths/${category.toLowerCase().replace(/\s+/g, '-')}`} className="block h-full group">
                                <BentoCard variant="default" size="small" className="h-full !min-h-[160px]">
                                    <div className="flex items-center justify-between h-full relative z-10">
                                        <div className="flex-1 flex flex-col justify-between h-full">
                                            <div>
                                                <p className="text-[var(--text-caption)] font-[var(--font-weight-semibold)] uppercase tracking-wider text-[var(--fg-muted)] mb-[var(--space-1)]">
                                                    Path
                                                </p>
                                                <h3 className="text-[var(--text-body)] font-[var(--font-weight-bold)] text-[var(--fg-primary)] mb-[4px]">
                                                    {category}
                                                </h3>
                                            </div>
                                            <div className="mt-[var(--space-2)] flex items-center gap-[var(--space-1)] text-[var(--color-500)] font-[var(--font-weight-medium)] group-hover:translate-x-1 transition-transform duration-[var(--duration-base)]">
                                                <span className="text-[var(--text-caption)]">Start Path</span>
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-[var(--space-2)] flex-shrink-0 text-[var(--fg-primary)] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[var(--duration-slow)]">
                                            <TechIcon name={category} className="w-16 h-16" />
                                        </div>
                                    </div>
                                </BentoCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.main>
        </div>
    );
}
