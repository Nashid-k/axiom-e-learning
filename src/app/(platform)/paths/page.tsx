'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import BentoCard from '@/components/ui/BentoCard';
import { TechIcon } from '@/components/ui/TechIcon';
import { CATEGORIES } from '@/features/curriculum/curriculum-constants';
import { useGlobalProgress } from '@/lib/providers/ProgressProvider';
import { useTopics } from '@/features/learning/hooks/useTopics';
import { getTopicsDueForReview } from '@/features/learning/spaced-repetition';
import React from 'react';

const categories = CATEGORIES;

export default function ExplorePage() {
    const { xp, level, streak, progress } = useGlobalProgress();
    const { topics: userTopics } = useTopics();

    const totalMastered = useMemo(() =>
        Object.values(progress).reduce((acc, items) => acc + items.length, 0), [progress]);

    const reviewDueCount = useMemo(() =>
        getTopicsDueForReview(userTopics).length, [userTopics]);

    return (
        <div className="min-h-screen bg-white dark:bg-black p-6 md:p-12">
            <main className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Learning Paths</h1>
                    <p className="text-lg text-neutral-500 dark:text-neutral-400">
                        Choose a track to start mastering new skills.
                    </p>
                </header>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-md">
                        <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Level</div>
                        <div className="text-2xl font-bold">{level}</div>
                    </div>
                    <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-md">
                        <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">XP</div>
                        <div className="text-2xl font-bold">{xp.toLocaleString()}</div>
                    </div>
                    <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-md">
                        <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Streak</div>
                        <div className="text-2xl font-bold">{streak}d 🔥</div>
                    </div>
                    <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-md">
                        <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Due Review</div>
                        <div className="text-2xl font-bold">{reviewDueCount}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <Link key={category} href={`/paths/${category.toLowerCase().replace(/\s+/g, '-')}`} className="group">
                            <BentoCard noPadding className="p-6 h-full transition-none hover:border-neutral-400 dark:hover:border-neutral-600">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col h-full justify-between gap-4">
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Path</div>
                                            <h3 className="text-lg font-bold group-hover:text-brand-500 transition-none">{category}</h3>
                                        </div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">Start track →</div>
                                    </div>
                                    <div className="opacity-50 group-hover:opacity-100 transition-none">
                                        <TechIcon name={category} className="w-12 h-12 grayscale group-hover:grayscale-0 transition-none" />
                                    </div>
                                </div>
                            </BentoCard>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
