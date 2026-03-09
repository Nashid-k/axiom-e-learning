'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, springs } from '@/lib/motion/motion-config';
import { getHashiraInfo } from '@/lib/motion/world-theme';
import ReviewBell from '@/components/ui/ReviewBell';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { CategoryIcon } from '@/features/curriculum/components/CategoryIcon';
import { TechIcon } from '@/components/ui/TechIcon';
import RouteGuard from '@/features/auth/components/RouteGuard';
import BentoCard from '@/components/ui/BentoCard';

export interface StructuredPathData {
    slug: string;
    category: string;
    description: string;
}

function StructuredPaths({ category, curricula }: { category: string, curricula: StructuredPathData[] }) {
    if (curricula.length === 0) return null;

    const categorySlug = decodeURIComponent(category).toLowerCase();
    const info = getHashiraInfo(categorySlug);

    return (
        <div className="mb-14">
            <motion.h2 variants={fadeInUp} className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2.5">
                <span className="w-1 h-6 bg-blue-500 rounded-full" />
                Structured paths
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {curricula.map((curr) => {
                    return (
                        <Link key={curr.slug} href={`/learn/${curr.slug}`}>
                            <motion.div
                                whileHover={{ y: -5, scale: 1.02, transition: springs.snap }}
                                whileTap={{ scale: 0.98 }}
                                className="h-full"
                            >
                                <BentoCard
                                    variant="default"
                                    size="small"
                                    className="h-full min-h-[180px] group cursor-pointer relative"
                                >
                                    <div className="flex items-center justify-between h-full relative z-10">
                                        { }
                                        <div className="flex-1 flex flex-col justify-between h-full">
                                            <div>
                                                { }
                                                <span className={`inline-block text-xs uppercase tracking-[0.15em] mb-3 ${info.color}`}>
                                                    {info.technique}
                                                </span>

                                                { }
                                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                                                    {curr.slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
                                                </h3>

                                                { }
                                                <p className="text-gray-600 dark:text-white/40 text-sm line-clamp-2">
                                                    {curr.description}
                                                </p>
                                            </div>

                                            <div className="mt-4 flex items-center gap-2 text-gray-400 dark:text-white/30 group-hover:text-gray-900 dark:group-hover:text-white/80 transition-colors">
                                                <span className="text-sm">View Path</span>
                                            </div>
                                        </div>

                                        { }
                                        <motion.div
                                            className="ml-6 w-16 h-16 flex-shrink-0 relative"
                                            whileHover={{ rotate: 12, scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 10 } }}
                                        >
                                            <TechIcon
                                                name={curr.category}
                                                className="w-full h-full drop-shadow-2xl"
                                            />
                                        </motion.div>
                                    </div>
                                </BentoCard>
                            </motion.div>
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
    const categorySlug = category?.toLowerCase() || '';
    const info = getHashiraInfo(categorySlug);

    return (
        <RouteGuard>
            <div className="min-h-screen bg-gray-50 dark:bg-[#000000] text-gray-900 dark:text-white pb-20 transition-colors duration-300">
                { }
                <div className="fixed inset-0 pointer-events-none">
                    <div className={`absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 ${info.color.replace('text-', 'bg-')}`} />
                </div>

                <main className="relative z-10 w-full max-w-[1600px] mx-auto pt-32 pb-24 px-6 md:px-12">
                    { }
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
                        <Breadcrumbs />
                    </motion.div>

                    { }
                    <motion.div initial="initial" animate="animate" variants={staggerContainer} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
                        <div className="flex items-center gap-6">
                            <motion.div variants={fadeInUp}>
                                <CategoryIcon category={categorySlug} className="w-20 h-20" />
                            </motion.div>
                            <div>
                                <motion.div variants={fadeInUp} className={`text-xs font-semibold uppercase tracking-[0.16em] mb-1.5 ${info.color}`}>
                                    {info.technique}
                                </motion.div>
                                <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white capitalize mb-2.5">
                                    {categorySlug}
                                </motion.h1>
                                <motion.p variants={fadeInUp} className="text-gray-600 dark:text-white/55 text-sm max-w-xl leading-relaxed">
                                    {info.quote}
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>

                    { }
                    <motion.div variants={fadeInUp} initial="initial" animate="animate">
                        <StructuredPaths category={categorySlug} curricula={curricula} />
                    </motion.div>
                </main>

                <ReviewBell />
            </div>
        </RouteGuard>
    );
}
