'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { TechIcon } from '@/components/ui/TechIcon';
import { CATEGORIES } from '@/features/curriculum/curriculum-constants';
import { useGlobalProgress } from '@/lib/providers/ProgressProvider';
import { useTopics } from '@/features/learning/hooks/useTopics';
import { getTopicsDueForReview } from '@/features/learning/spaced-repetition';
import BentoCard from '@/components/ui/BentoCard';
import BentoGrid from '@/components/ui/BentoGrid';

const categories = CATEGORIES;

export default function ExplorePage() {
    const { xp, level, streak } = useGlobalProgress();
    const { topics: userTopics } = useTopics();

    const reviewDueCount = useMemo(() =>
        getTopicsDueForReview(userTopics).length, [userTopics]);

    return (
        <div className="pb-20">
            <header className="mb-12 relative">
                <div className="absolute -left-10 top-0 w-2 h-14 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-cyan)] rounded-full hidden md:block" />
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-gradient-primary">
                    Learning Paths
                </h1>
                <p className="text-[var(--fg-secondary)] text-base max-w-2xl font-medium tracking-wide">
                    Choose your specialization and master high-fidelity tech stacks with our interactive AI-tutor companion.
                </p>
            </header>

            {/* Stats Overview */}
            <BentoGrid className="mb-14">
                {[
                    { label: "Level Tracker", value: `Level ${level}`, icon: "💎", href: undefined, glowClass: "glow-primary border-[var(--color-primary)]/20" },
                    { label: "Neural XP", value: xp.toLocaleString(), icon: "🧠", href: "/leaderboard", glowClass: "hover:border-[var(--color-accent)]/20 hover:shadow-[0_0_20px_rgba(236,72,153,0.1)]" },
                    { label: "Sync Streak", value: `${streak} Days`, icon: "🔥", href: "/flashcards", glowClass: "hover:border-[var(--color-cyan)]/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]" },
                    { label: "Due Review", value: reviewDueCount, icon: "⚡", href: "/flashcards", glowClass: reviewDueCount > 0 ? "glow-accent border-[var(--color-accent)]/30 text-[var(--color-accent)] animate-pulse" : "hover:border-[var(--color-success)]/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]" }
                ].map((stat) => (
                    <BentoCard key={stat.label} size="small" href={stat.href} className={`flex flex-col justify-center transition-all duration-300 ${stat.glowClass}`}>
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                                {stat.label}
                            </span>
                            <span className="text-lg filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]">{stat.icon}</span>
                        </div>
                        <div className="text-3xl font-extrabold tracking-tight text-[var(--fg-primary)] bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            {stat.value}
                        </div>
                    </BentoCard>
                ))}
            </BentoGrid>

            {/* Path Selection */}
            <BentoGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <BentoCard 
                        key={category} 
                        size="medium" 
                        href={`/paths/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="group flex flex-col justify-between overflow-hidden border-white/5 hover:border-[var(--color-primary)]/20 bg-gradient-to-br from-[var(--surface-raised)] to-transparent"
                    >
                        {/* Interactive Accent Glow Behind Icon */}
                        <div className="absolute -top-12 -right-12 w-28 h-28 bg-[var(--color-primary)] opacity-0 group-hover:opacity-[0.06] rounded-full blur-2xl transition-all duration-500 group-hover:scale-150" />

                        <div className="flex justify-between items-start z-10">
                            <div className="pr-4">
                                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-cyan)] mb-2.5">
                                    PATH MATRIX
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-[var(--color-primary)] group-hover:text-gradient-primary transition-all duration-300">
                                    {category}
                                </h3>
                            </div>
                            <div className="relative p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/10 group-hover:bg-white/10 transition-all duration-300">
                                <TechIcon name={category} className="w-10 h-10 transition-all duration-500 group-hover:scale-115 group-hover:rotate-6 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" />
                            </div>
                        </div>

                        <div className="mt-8 flex items-center gap-3 z-10">
                            <div className="h-[1px] flex-1 bg-white/5 group-hover:bg-gradient-to-r group-hover:from-[var(--color-primary)] group-hover:to-[var(--color-cyan)] transition-colors duration-500" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)] group-hover:text-[var(--color-cyan)] transition-colors duration-300">
                                ENGAGE MATRIX →
                            </span>
                        </div>
                    </BentoCard>
                ))}
            </BentoGrid>
        </div>
    );
}
