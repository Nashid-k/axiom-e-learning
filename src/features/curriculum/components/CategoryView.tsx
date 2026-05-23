'use client';

import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { TechIcon } from '@/components/ui/TechIcon';
import RouteGuard from '@/features/auth/components/RouteGuard';
import BentoCard from '@/components/ui/BentoCard';

export interface StructuredPathData {
    slug: string;
    category: string;
    description: string;
}

function StructuredPaths({ curricula }: { curricula: StructuredPathData[] }) {
    if (curricula.length === 0) return null;

    return (
        <div className="mb-14">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2.5 animate-spring-up" style={{ animationDelay: '150ms' }}>
                <span className="w-1.5 h-6 bg-[var(--color-primary)] rounded-full shadow-[0_0_10px_rgba(10,132,255,0.4)]" />
                <span className="tracking-tight text-white">Structured Mastery Paths</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {curricula.map((curr, i) => {
                    const displayName = curr.slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
                    return (
                        <Link key={curr.slug} href={`/learn/${curr.slug}`} className="group h-full block">
                            <BentoCard 
                                noPadding 
                                className="h-full p-7 bg-gradient-to-br from-[var(--surface-raised)] to-transparent border-white/5 hover:border-[var(--color-primary)]/20 animate-spring-up opacity-0"
                                style={{ animationDelay: `${(i + 3) * 85}ms` }}
                            >
                                {/* Interactive Accent Glow Behind Icon */}
                                <div className="absolute top-1/2 right-0 w-32 h-32 bg-[var(--color-primary)] opacity-[0.03] group-hover:opacity-[0.12] rounded-full blur-3xl transition-all duration-700 animate-pulse-glow" />

                                {/* Large Animated Background Graphic */}
                                <div className="absolute -right-6 -bottom-6 opacity-[0.08] group-hover:opacity-[0.25] group-hover:-translate-y-3 group-hover:-translate-x-3 group-hover:scale-110 transition-all duration-700 ease-out pointer-events-none mix-blend-screen filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                    <TechIcon name={curr.category} className="w-40 h-40 animate-float-slow" />
                                </div>

                                <div className="flex flex-col h-full justify-between gap-8 z-10 relative">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-cyan)] mb-2.5 animate-fade-slide-left" style={{ animationDelay: `${(i + 3) * 85 + 100}ms` }}>ACTIVE PATH</div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-[var(--color-primary)] transition-all duration-300 mb-2 leading-tight">
                                                {displayName}
                                            </h3>
                                            <p className="text-[var(--fg-secondary)] text-sm leading-relaxed font-medium line-clamp-3">
                                                {curr.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--fg-secondary)] group-hover:text-[var(--color-cyan)] transition-colors duration-300 flex items-center gap-1.5">
                                        View Curriculum <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                                    </div>
                                </div>
                            </BentoCard>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}

interface CategoryViewProps {
    category: string;
    curricula: StructuredPathData[];
}

export default function CategoryView({ category, curricula }: CategoryViewProps) {
    const categoryName = category?.replace(/-/g, ' ') || '';

    return (
        <RouteGuard>
            <div className="min-h-screen bg-transparent p-6 md:p-12 text-white">
                <main className="max-w-7xl mx-auto">
                    <div className="mb-12 animate-spring-up" style={{ animationDelay: '0ms' }}>
                        <Breadcrumbs />
                    </div>

                    <header className="mb-16 animate-spring-up" style={{ animationDelay: '80ms' }}>
                        <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-cyan)] mb-4">
                            SPECIALIZATION VERTICAL
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 capitalize text-gradient-primary">
                            {categoryName} Mastery
                        </h1>
                        <p className="text-base text-[var(--fg-secondary)] font-medium max-w-2xl leading-relaxed">
                            Comprehensive curricula and advanced learning paths specialized for {categoryName}. 
                            Master core concepts and engineer deep architecture layouts.
                        </p>
                    </header>

                    <StructuredPaths curricula={curricula} />
                </main>
            </div>
        </RouteGuard>
    );
}
