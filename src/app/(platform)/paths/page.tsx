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
            <header className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-2 text-[var(--fg-primary)]">
                    Learning Paths
                </h1>
                <p className="text-[var(--fg-secondary)]">
                    Select a path to start your learning journey.
                </p>
            </header>

            {/* Stats Overview */}
            <BentoGrid className="mb-12">
                {[
                    { label: "Level", value: level, icon: "💎", href: undefined },
                    { label: "Neural XP", value: xp.toLocaleString(), icon: "🧠", href: "/leaderboard" },
                    { label: "Sync Streak", value: `${streak} Days`, icon: "🔥", href: "/flashcards" },
                    { label: "Due Review", value: reviewDueCount, icon: "⚡", href: "/flashcards" }
                ].map((stat) => (
                    <BentoCard key={stat.label} size="small" href={stat.href} className="flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--fg-muted)]">
                                {stat.label}
                            </span>
                            <span className="text-base">{stat.icon}</span>
                        </div>
                        <div className="text-2xl font-bold tracking-tight text-[var(--fg-primary)]">
                            {stat.value}
                        </div>
                    </BentoCard>
                ))}
            </BentoGrid>

            {/* Path Selection */}
            <BentoGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categories.map((category) => (
                    <BentoCard 
                        key={category} 
                        size="medium" 
                        href={`/paths/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="group flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start">
                            <div className="pr-4">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)] mb-2">
                                    PATH
                                </div>
                                <h3 className="text-xl font-bold tracking-tight group-hover:text-[var(--color-primary)] transition-colors">
                                    {category}
                                </h3>
                            </div>
                            <TechIcon name={category} className="w-10 h-10 grayscale group-hover:grayscale-0 transition-all" />
                        </div>

                        <div className="mt-8 flex items-center gap-2">
                            <div className="h-px flex-1 bg-[var(--surface-border)] group-hover:bg-[var(--color-primary)] opacity-50 transition-colors" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--fg-muted)] group-hover:text-[var(--color-primary)] transition-colors">
                                START →
                            </span>
                        </div>
                    </BentoCard>
                ))}
            </BentoGrid>
        </div>
    );
}
