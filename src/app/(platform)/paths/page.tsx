'use client';

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
            <header className="mb-12 relative animate-spring-up" style={{ animationDelay: '0ms' }}>
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
                ].map((stat, i) => (
                    <BentoCard 
                        key={stat.label} 
                        size="small" 
                        href={stat.href} 
                        className={`flex flex-col justify-center animate-spring-up opacity-0 ${stat.glowClass}`}
                        style={{ animationDelay: `${(i + 1) * 80}ms` }}
                    >
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((category, i) => (
                    <BentoCard 
                        key={category} 
                        size="auto" 
                        href={`/paths/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="group flex flex-col justify-between overflow-hidden border-white/5 hover:border-[var(--color-primary)]/20 bg-gradient-to-br from-[var(--surface-raised)] to-transparent animate-spring-up opacity-0"
                        style={{ animationDelay: `${(i + 5) * 80}ms` }}
                    >
                        {/* Interactive Accent Glow Behind Icon */}
                        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-[var(--color-primary)] opacity-[0.03] group-hover:opacity-[0.12] rounded-full blur-3xl transition-all duration-700 animate-pulse-glow" />

                        {/* Large Animated Background Graphic */}
                        <div className="absolute -right-8 -bottom-10 opacity-[0.08] group-hover:opacity-[0.25] group-hover:-translate-y-4 group-hover:-translate-x-4 group-hover:scale-110 transition-all duration-700 ease-out pointer-events-none mix-blend-screen filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            <TechIcon name={category} className="w-52 h-52 animate-float-slow" />
                        </div>

                        <div className="flex justify-between items-start z-10 relative">
                            <div className="pr-4">
                                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-cyan)] mb-2.5 animate-fade-slide-left" style={{ animationDelay: `${(i + 5) * 80 + 100}ms` }}>
                                    PATH MATRIX
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-[var(--fg-primary)] group-hover:text-[var(--color-primary)] transition-all duration-300">
                                    {category}
                                </h3>
                            </div>
                        </div>

                        <div className="mt-16 flex items-center gap-3 z-10 relative">
                            <div className="h-[1px] flex-1 bg-white/5 group-hover:bg-gradient-to-r group-hover:from-[var(--color-primary)] group-hover:to-[var(--color-cyan)] transition-all duration-500" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)] group-hover:text-[var(--color-cyan)] transition-colors duration-300 flex items-center gap-1.5">
                                ENGAGE MATRIX <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                            </span>
                        </div>
                    </BentoCard>
                ))}
            </div>
        </div>
    );
}
