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
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-[var(--color-primary)] rounded-md" />
                Structured Paths
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {curricula.map((curr) => {
                    return (
                        <Link key={curr.slug} href={`/learn/${curr.slug}`} className="group h-full">
                            <BentoCard noPadding className="h-full p-6 transition-none hover:border-neutral-400 dark:hover:border-neutral-600">
                                <div className="flex flex-col h-full justify-between gap-6">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Path</div>
                                            <h3 className="text-lg font-bold group-hover:text-[var(--color-primary)] transition-none mb-2">
                                                {curr.slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
                                            </h3>
                                            <p className="text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2">
                                                {curr.description}
                                            </p>
                                        </div>
                                        <div className="opacity-50 group-hover:opacity-100 transition-none shrink-0">
                                            <TechIcon name={curr.category} className="w-12 h-12 grayscale group-hover:grayscale-0 transition-none" />
                                        </div>
                                    </div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-none">
                                        View Curriculum →
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
            <div className="min-h-screen bg-white dark:bg-black p-6 md:p-12">
                <main className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <Breadcrumbs />
                    </div>

                    <header className="mb-16">
                        <h1 className="text-4xl font-bold tracking-tight mb-4 capitalize">
                            {categoryName} Mastery
                        </h1>
                        <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl">
                            Comprehensive curricula and learning paths for {categoryName}. 
                            Master the core concepts and build advanced applications.
                        </p>
                    </header>

                    <StructuredPaths curricula={curricula} />
                </main>
            </div>
        </RouteGuard>
    );
}
