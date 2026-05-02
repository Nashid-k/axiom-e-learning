'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { TechIcon } from '@/components/ui/TechIcon';
import { CATEGORIES } from '@/features/curriculum/curriculum-constants';
import { useGlobalProgress } from '@/lib/providers/ProgressProvider';
import { useTopics } from '@/features/learning/hooks/useTopics';
import { getTopicsDueForReview } from '@/features/learning/spaced-repetition';
import SectionReveal from '@/components/ui/SectionReveal';
import { Header } from '@/components/ui/Header';

const categories = CATEGORIES;

export default function ExplorePage() {
    const { xp, level, streak } = useGlobalProgress();
    const { topics: userTopics } = useTopics();

    const reviewDueCount = useMemo(() =>
        getTopicsDueForReview(userTopics).length, [userTopics]);

    return (
        <div className="min-h-screen relative overflow-hidden selection:bg-brand/30 pb-20">
            <Header />
            
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full -z-10" />
            
            <main className="max-w-7xl mx-auto px-6 pt-32">
                <SectionReveal>
                    <header className="mb-16">
                        <div className="inline-block px-4 py-1.5 mb-4 glass-card rounded-full text-[10px] font-black tracking-widest text-brand uppercase">
                            Neural Simulation Deck
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-gradient">
                            Learning Paths
                        </h1>
                        <p className="text-lg text-fg-secondary font-medium opacity-80">
                            Initialize a specialized neural training sequence.
                        </p>
                    </header>
                </SectionReveal>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {[
                        { label: "Level", value: level, icon: "💎" },
                        { label: "Neural XP", value: xp.toLocaleString(), icon: "🧠" },
                        { label: "Sync Streak", value: `${streak} Days`, icon: "🔥" },
                        { label: "Due Review", value: reviewDueCount, icon: "⚡" }
                    ].map((stat, i) => (
                        <SectionReveal key={stat.label} delay={0.1 + i * 0.05} direction="down">
                            <div className="glass-card p-6 rounded-3xl relative group overflow-hidden">
                                <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-fg-muted">
                                        {stat.label}
                                    </span>
                                    <span className="text-lg">{stat.icon}</span>
                                </div>
                                <div className="text-3xl font-black tracking-tighter text-fg-primary relative z-10">
                                    {stat.value}
                                </div>
                            </div>
                        </SectionReveal>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((category, i) => (
                        <SectionReveal key={category} delay={0.2 + i * 0.05} direction="up">
                            <Link href={`/paths/${category.toLowerCase().replace(/\s+/g, '-')}`} className="group block h-full">
                                <div className="glass-card p-8 rounded-[32px] h-full transition-all duration-500 hover:border-brand/50 hover:shadow-2xl hover:shadow-brand/10 group relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                                    {/* Hover Glow */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                    
                                    <div className="flex justify-between items-start relative z-10">
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand mb-2">
                                                TRAINING PATH
                                            </div>
                                            <h3 className="text-2xl font-black tracking-tighter group-hover:text-gradient transition-all duration-300">
                                                {category}
                                            </h3>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-brand/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <TechIcon name={category} className="w-14 h-14 relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" />
                                        </div>
                                    </div>

                                    <div className="mt-8 flex items-center gap-2 relative z-10">
                                        <div className="h-px flex-1 bg-surface-border group-hover:bg-brand/20 transition-colors" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-fg-muted group-hover:text-brand transition-colors">
                                            INITIALIZE SEQUENCE →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </SectionReveal>
                    ))}
                </div>
            </main>
        </div>
    );
}
