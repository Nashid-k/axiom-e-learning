'use client';

import { useRef, useMemo, useEffect, memo, useCallback, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CurriculumData, RichItem } from '@/types';

import { springs, staggerContainer, fadeInUp } from '@/lib/motion/motion-config';

import { useProgress } from '@/features/learning/hooks/useProgress';
import { getCategory } from '@/features/curriculum/curriculum-registry';
import { CategoryIcon } from '@/features/curriculum/components/CategoryIcon';
import { getHashiraInfo } from '@/lib/motion/world-theme';
import { useModal, TopicItem } from '@/features/ai/context/ModalContext';
import { useMirror } from '@/features/learning/hooks/useMirror';
import { useConfetti } from '@/features/learning/hooks/useConfetti';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { ArcadeSection } from './ArcadeSection';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';
import ReviewBell from '@/components/ui/ReviewBell';
import { useTopics } from '@/features/learning/hooks/useTopics';
import { getTopicsDueForReview, getReviewStatus } from '@/features/learning/spaced-repetition';
import { buildWeeklyMissions, collectWeaknessSignals } from '@/features/learning/weakness-engine';

interface CurriculumViewProps {
    data: CurriculumData;
}

export default function CurriculumView({ data }: CurriculumViewProps) {
    const categoryName = (data.category || getCategory(data.description)) as string;
    const curriculumTitle = data.title || data.description || categoryName;
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
    const info = getHashiraInfo(categorySlug);
    const router = useRouter();

    const totalItems = data.phases.reduce((acc, phase) =>
        acc + (phase.theory?.length || 0) + (phase.practicals?.length || 0),
        0);

    const { isChecked, isLoading } = useProgress(data.fileName, totalItems);

    const validCompletedCount = useMemo(() => {
        let count = 0;
        data.phases.forEach(phase => {
            phase.theory?.forEach((rawItem, idx) => {
                const item = typeof rawItem === 'string' ? { title: rawItem } : rawItem;
                const id = item.id || `theory-${phase.phase}-${idx}`;
                if (isChecked(id)) count++;
            });
            phase.practicals?.forEach((rawItem, idx) => {
                const item = typeof rawItem === 'string' ? { title: rawItem } : rawItem;
                const id = item.id || `practical-${phase.phase}-${idx}`;
                if (isChecked(id)) count++;
            });
        });
        return count;
    }, [data.phases, isChecked]);

    const progressPercentage = totalItems > 0 ? Math.min(100, Math.round((validCompletedCount / totalItems) * 100)) : 0;

    const [showPop, setShowPop] = useState(false);
    const prevCountRef = useRef(validCompletedCount);

    useEffect(() => {
        if (validCompletedCount > prevCountRef.current) {
            setShowPop(true);
            const timer = setTimeout(() => setShowPop(false), 2000);
            return () => clearTimeout(timer);
        }
        prevCountRef.current = validCompletedCount;
    }, [validCompletedCount]);

    const { mirrorPhases } = useMirror(data.fileName, data.phases);

    const { fireConfetti, fireMiniBurst } = useConfetti();
    const celebratedPhases = useRef<Set<number>>(new Set());
    const isInitialized = useRef(false);

    const { topics: userTopics } = useTopics();
    const reviewDueTopics = useMemo(() => {
        const dueTopics = getTopicsDueForReview(userTopics);
        return dueTopics.filter(t =>
            t.category?.toLowerCase() === categoryName.toLowerCase()
        ).slice(0, 5);
    }, [userTopics, categoryName]);

    const weeklyMissions = useMemo(() => {
        const signals = collectWeaknessSignals(userTopics, categoryName);
        return buildWeeklyMissions(signals, 3);
    }, [userTopics, categoryName]);

    const phaseProgress = useMemo(() => {
        return data.phases.map((phase) => {
            const total = (phase.theory?.length || 0) + (phase.practicals?.length || 0);
            let completed = 0;
            phase.theory?.forEach((rawItem, idx) => {
                const id = (typeof rawItem === 'string' ? null : rawItem.id) || `theory-${phase.phase}-${idx}`;
                if (isChecked(id)) completed++;
            });
            phase.practicals?.forEach((rawItem, idx) => {
                const id = (typeof rawItem === 'string' ? null : rawItem.id) || `practical-${phase.phase}-${idx}`;
                if (isChecked(id)) completed++;
            });
            return { phase: Number(phase.phase), percentage: total > 0 ? (completed / total) * 100 : 0 };
        });
    }, [data.phases, isChecked]);

    useEffect(() => {
        if (isLoading) return;

        if (!isInitialized.current) {
            phaseProgress.forEach(p => {
                if (p.percentage === 100) {
                    celebratedPhases.current.add(p.phase);
                }
            });
            if (progressPercentage === 100) {
                celebratedPhases.current.add(999);
            }
            isInitialized.current = true;
            return;
        }

        phaseProgress.forEach(p => {
            if (p.percentage === 100 && !celebratedPhases.current.has(p.phase)) {
                celebratedPhases.current.add(p.phase);
                fireMiniBurst();
            }
        });
    }, [phaseProgress, isLoading, fireMiniBurst, progressPercentage]);

    useEffect(() => {
        if (progressPercentage === 100 && !isLoading && !celebratedPhases.current.has(999)) {
            celebratedPhases.current.add(999);
            fireConfetti();
        }
    }, [progressPercentage, isLoading, fireConfetti]);

    const allTopics: TopicItem[] = useMemo(() => {
        const topics: TopicItem[] = [];
        data.phases.forEach((phase) => {
            phase.theory?.forEach((rawItem, idx) => {
                const item = typeof rawItem === 'string' ? { title: rawItem } : rawItem;
                topics.push({
                    id: item.id || `theory-${phase.phase}-${idx}`,
                    topic: item.title,
                    description: item.description || `Learn about ${item.title} in Phase ${phase.phase}`,
                    phase: String(phase.phase), category: categoryName,
                });
            });
            phase.practicals?.forEach((rawItem, idx) => {
                const item = typeof rawItem === 'string' ? { title: rawItem } : rawItem;
                topics.push({
                    id: item.id || `practical-${phase.phase}-${idx}`,
                    topic: item.title,
                    description: (item.description || `Practice ${item.title} in Phase ${phase.phase}`) + ' [PRACTICAL_MODE]',
                    phase: String(phase.phase), category: categoryName,
                });
            });
        });
        return topics;
    }, [data.phases, categoryName]);

    const { openAIModal } = useModal();

    const handleTopicClick = useCallback((topicName: string, description: string, initialTab?: 'ai' | 'resources' | 'dojo' | 'quiz') => {
        const foundTopic = allTopics.find(t => t.topic === topicName);
        const currentIndex = allTopics.findIndex(t => t.topic === topicName);

        if (foundTopic) {
            openAIModal({
                ...foundTopic,
                category: categoryName,
                description: description,
                curriculum: curriculumTitle,
                fileName: data.fileName as string,
                allTopics: allTopics,
                currentIndex: currentIndex >= 0 ? currentIndex : 0,
                initialTab: initialTab
            });
        }
    }, [allTopics, categoryName, curriculumTitle, data.fileName, openAIModal]);

    const searchParams = useSearchParams();
    useEffect(() => {
        const concept = searchParams.get('concept');
        const type = searchParams.get('type');
        const phase = searchParams.get('phase');

        if (concept && !isLoading) {
            const foundTopic = allTopics.find(t =>
                t.topic === concept &&
                (!phase || t.phase === phase) &&
                (!type || (type === 'Practical' ? t.topic.includes('[PRACTICAL_MODE]') || (t.id && t.id.startsWith('practical')) : !t.topic.includes('[PRACTICAL_MODE]')))
            );

            if (foundTopic) {
                handleTopicClick(
                    foundTopic.topic,
                    foundTopic.description,
                    type === 'Practical' ? 'dojo' : 'ai'
                );

                const newParams = new URLSearchParams(searchParams.toString());
                newParams.delete('concept');
                newParams.delete('type');
                newParams.delete('phase');
                newParams.delete('category');

                const query = newParams.toString();
                router.replace(`${window.location.pathname}${query ? '?' + query : ''}`, { scroll: false });
            }
        }
    }, [searchParams, allTopics, isLoading, handleTopicClick, router]);


    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col pt-24 px-3 sm:px-6 md:px-12 lg:px-20 max-w-[95vw] mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 lg:items-end justify-between">
                    <div className="flex items-start gap-6 w-full">
                        <Skeleton className="w-20 h-20 rounded-2xl shrink-0" />
                        <div className="space-y-4 flex-1">
                            <Skeleton className="h-10 w-2/3 md:w-64" />
                            <Skeleton className="h-4 w-full md:w-96" />
                            <Skeleton className="h-8 w-48 rounded-full" />
                        </div>
                    </div>
                    <Skeleton className="w-full lg:w-[340px] h-32 rounded-2xl" />
                </div>

                <div className="mt-12">
                    <Skeleton className="w-full h-48 rounded-2xl mb-12" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="h-[330px] p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4 overflow-hidden">
                            <div className="flex items-start gap-3">
                                <Skeleton className="w-8 h-8 rounded-full" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-2/3" />
                                    <Skeleton className="h-3 w-full" />
                                </div>
                            </div>
                            <div className="space-y-3 pt-4">
                                <Skeleton className="h-3 w-1/4" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white transition-colors duration-300">

            <div className="pt-16 sm:pt-24 pb-12 px-3 sm:px-6 md:px-12 lg:px-20 max-w-[95vw] 2xl:max-w-[1920px] mx-auto">
                <div className="mb-7">
                    <Breadcrumbs items={[
                        { label: 'Home', href: '/paths' },
                        { label: curriculumTitle, href: '#', isLast: true }
                    ]} />
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:items-end justify-between">

                    <div className="flex items-start gap-6">
                        <CategoryIcon category={categorySlug} className="w-16 h-16 shrink-0" />
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-3">{curriculumTitle}</h1>
                            <p className="text-gray-600 dark:text-white/60 max-w-2xl text-base md:text-lg leading-relaxed transition-colors">{data.description as string || ""}</p>


                            <div className={`mt-5 inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-gray-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] ${info.color} transition-colors`}>
                                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] opacity-80">{info.grade}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-white/20" />
                                <span className="text-xs opacity-70 italic">&quot;{info.quote}&quot;</span>
                                <span className="text-[11px] opacity-50 ml-1">— {info.character}</span>
                            </div>
                        </div>
                    </div>


                    <div className="p-5 w-full lg:w-[340px] shrink-0 bg-white/90 dark:bg-black/60 backdrop-blur-md transform-gpu border border-gray-200 dark:border-white/10 rounded-2xl transition-colors relative">
                        {showPop && (
                            <div className="absolute -top-2 right-6 text-green-500 font-black text-xl animate-counter-pop pointer-events-none z-50 select-none shadow-green-500/50 drop-shadow-lg">+1</div>
                        )}
                        <div className="flex justify-between text-sm mb-4">
                            <span className="text-gray-600 dark:text-white/70 text-sm transition-colors">Progress</span>
                            <span className="text-blue-500 dark:text-blue-400 font-mono text-sm transition-colors">{progressPercentage}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden mb-2.5 transition-colors">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}% ` }}
                                transition={springs.gentle}
                                className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
                            />
                        </div>
                        <div className="text-[11px] text-gray-400 dark:text-white/45 text-center transition-colors">
                            {validCompletedCount} / {totalItems} Techniques Mastered
                        </div>
                    </div>
                </div>
            </div>


            <ArcadeSection data={data} />


            {reviewDueTopics.length > 0 && (
                <div className="px-4 md:px-12 lg:px-20 max-w-[95vw] 2xl:max-w-[1920px] mx-auto mb-6">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={springs.gentle}
                        className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/20 border border-orange-200/60 dark:border-orange-800/30 rounded-2xl"
                    >
                        <div className="flex items-center gap-2.5 mb-3">
                            <div className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-orange-600 dark:text-orange-400">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-bold text-orange-900 dark:text-orange-300">
                                Review Queue
                                <span className="ml-1.5 text-xs font-normal text-orange-600/80 dark:text-orange-400/70">
                                    {reviewDueTopics.length} topic{reviewDueTopics.length > 1 ? 's' : ''} due
                                </span>
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {reviewDueTopics.map(topic => {
                                const status = getReviewStatus(topic.nextReviewDate, topic.studied);
                                return (
                                    <button
                                        key={topic.id}
                                        onClick={() => handleTopicClick(topic.title, topic.description || `Review ${topic.title}`)}
                                        className="group inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full bg-white/80 dark:bg-white/10 border border-orange-200/50 dark:border-orange-800/30 text-orange-800 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:border-orange-300 dark:hover:border-orange-700/50 transition-all cursor-pointer"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                        <span className="truncate max-w-[180px]">{topic.title}</span>
                                        <span className="text-[10px] opacity-60">{status.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            )}

            {weeklyMissions.length > 0 && (
                <div className="px-4 md:px-12 lg:px-20 max-w-[95vw] 2xl:max-w-[1920px] mx-auto mb-8">
                    <div className="p-4 rounded-2xl border border-emerald-200/70 dark:border-emerald-500/25 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/10">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-300">Weekly Focus Missions</h3>
                            <span className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80">Auto-generated from weak signals</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                            {weeklyMissions.map(mission => (
                                <button
                                    key={mission.id}
                                    type="button"
                                    onClick={() => handleTopicClick(
                                        mission.topic,
                                        `${mission.reason}. ${mission.action}`
                                    )}
                                    className="text-left px-3 py-2 rounded-xl border border-emerald-200/70 dark:border-emerald-500/25 bg-white/70 dark:bg-white/[0.03] hover:bg-white dark:hover:bg-white/[0.06] transition-colors"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${mission.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'}`}>
                                            {mission.priority}
                                        </span>
                                        <span className="text-[11px] font-semibold text-emerald-900 dark:text-emerald-300 truncate">{mission.title}</span>
                                    </div>
                                    <p className="text-[11px] text-gray-700 dark:text-gray-300 line-clamp-2">{mission.reason}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <main className="px-4 md:px-12 lg:px-20 pb-18 max-w-[95vw] 2xl:max-w-[1920px] mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
                >
                    { }
                    {mirrorPhases.map((phase: NonNullable<CurriculumData['phases']>[number]) => (
                        <motion.div key={phase.phase} variants={fadeInUp} className="h-full">
                            <div
                                className="h-auto min-h-[300px] sm:h-[380px] md:h-[420px] flex flex-col relative group hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 bg-white/90 dark:bg-black/60 backdrop-blur-md transform-gpu border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden"
                            >
                                { }
                                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-80 transition-opacity pointer-events-none" />
                                { }
                                <div className="relative z-10 p-3.5 pb-3 border-b border-gray-100 dark:border-white/5 bg-white/60 dark:bg-black/40 shrink-0 transition-colors">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-white/10 text-xs font-semibold border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white transition-colors">
                                                    {phase.phase}
                                                </span>
                                                <h2 className="text-[15px] font-semibold line-clamp-1 text-gray-900 dark:text-white transition-colors">{phase.title}</h2>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-white/55 line-clamp-2 leading-relaxed transition-colors">{phase.description}</p>
                                        </div>
                                    </div>
                                </div>

                                { }
                                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 pt-3 space-y-4">
                                    { }
                                    {phase.theory && phase.theory.length > 0 && (
                                        <div className="space-y-3">
                                            <h3 className="sticky top-0 z-10 bg-white/90 dark:bg-black/85 py-1.5 -mx-1 px-1.5 text-[11px] font-semibold text-gray-500 dark:text-white/70 flex items-center gap-2 uppercase tracking-wider mb-2 rounded-md transition-colors backdrop-blur-sm">
                                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                                Theory
                                            </h3>
                                            <div className="space-y-2">
                                                { }
                                                {phase.theory.map((rawItem: string | RichItem, idx: number) => {
                                                    const item: RichItem = typeof rawItem === 'string'
                                                        ? { title: rawItem, id: `theory-${phase.phase}-${idx}` }
                                                        : { ...rawItem, id: rawItem.id || `theory-${phase.phase}-${idx}` };

                                                    return (
                                                        <VirtualizedTopic key={item.id}>
                                                            <TopicRow
                                                                item={item}
                                                                phaseTitle={phase.title}
                                                                isChecked={isChecked(item.id!)}
                                                                onClick={(topic, desc) => handleTopicClick(topic, desc)}
                                                                colorClass="group-hover/item:text-blue-300"
                                                            />
                                                        </VirtualizedTopic>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    { }
                                    {phase.practicals && phase.practicals.length > 0 && (
                                        <div className="space-y-3">
                                            <h3 className="sticky top-0 z-10 bg-white/90 dark:bg-black/85 py-1.5 -mx-1 px-1.5 text-[11px] font-semibold text-gray-500 dark:text-white/70 flex items-center gap-2 uppercase tracking-wider mb-2 rounded-md border-t border-gray-100 dark:border-white/5 mt-5 pt-3 transition-colors backdrop-blur-sm">
                                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                                                Practical
                                            </h3>
                                            <div className="space-y-2">
                                                { }
                                                {phase.practicals.map((rawItem: string | RichItem, idx: number) => {
                                                    const item: RichItem = typeof rawItem === 'string'
                                                        ? { title: rawItem, id: `practical-${phase.phase}-${idx}` }
                                                        : { ...rawItem, id: rawItem.id || `practical-${phase.phase}-${idx}` };

                                                    return (
                                                        <VirtualizedTopic key={item.id}>
                                                            <TopicRow
                                                                item={item}
                                                                phaseTitle={phase.title}
                                                                isChecked={isChecked(item.id!)}
                                                                onClick={(topic, desc) => handleTopicClick(topic, desc)}
                                                                colorClass="group-hover/item:text-orange-300"
                                                            />
                                                        </VirtualizedTopic>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    { }
                                    {phase.games && phase.games.length > 0 && (
                                        <div className="space-y-3">
                                            <h3 className="sticky top-0 z-10 bg-white/90 dark:bg-black/85 py-1.5 -mx-1 px-1.5 text-[11px] font-semibold text-gray-500 dark:text-white/70 flex items-center gap-2 uppercase tracking-wider mb-2 rounded-md border-t border-gray-100 dark:border-white/5 mt-5 pt-3 transition-colors backdrop-blur-sm">
                                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                                                Gamified Learning
                                            </h3>
                                            <div className="space-y-2">
                                                { }
                                                {phase.games.map((rawItem: string | (RichItem & { url?: string }), idx: number) => {
                                                    const item: RichItem = typeof rawItem === 'string'
                                                        ? { title: rawItem, id: `game-${phase.phase}-${idx}` }
                                                        : { ...rawItem, id: `game-${phase.phase}-${idx}` };

                                                    return (
                                                        <a
                                                            key={item.id}
                                                            href={item.url || '#'}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block py-3 px-3.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 hover:border-blue-300 dark:hover:border-blue-500/40 transition-all group/game cursor-pointer"
                                                        >
                                                            <div className="flex items-start justify-between gap-3">
                                                                <div>
                                                                    <h4 className="text-[13px] font-bold text-blue-900 dark:text-blue-100 group-hover/game:text-blue-700 dark:group-hover/game:text-white transition-colors mb-1">
                                                                        {item.title}
                                                                        <span className="ml-2 inline-block text-[9px] px-1.5 py-0.5 rounded bg-blue-200 dark:bg-blue-500/20 text-blue-700 dark:text-blue-200 font-bold uppercase tracking-wider">
                                                                            GAME
                                                                        </span>
                                                                    </h4>
                                                                    <p className="text-[11px] text-gray-600 dark:text-white/60 line-clamp-2 leading-relaxed">
                                                                        {item.description || "Interactive coding challenge"}
                                                                    </p>
                                                                </div>
                                                                <svg className="w-4 h-4 text-blue-400 dark:text-blue-500 shrink-0 mt-0.5 group-hover/game:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                </svg>
                                                            </div>
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                { }
                <div className="mt-24 pt-8 border-t border-gray-200 dark:border-white/10 text-center text-gray-400 dark:text-white/35 text-xs transition-colors">
                    <p>End of curriculum: {data.title as string || ""}</p>
                </div>
            </main>

            <ReviewBell />
        </div >
    );
}

const TopicRow = memo(function TopicRow({
    item,
    phaseTitle,
    isChecked,
    onClick,
    colorClass
}: {
    item: RichItem;
    phaseTitle: string;
    isChecked: boolean;
    onClick: (topic: string, desc: string, initialTab?: 'ai' | 'resources' | 'dojo' | 'quiz') => void;
    colorClass: string;
}) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, x: 4, transition: springs.snap }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "py-2.5 px-3 rounded-xl transition-all group/item cursor-pointer flex items-center gap-3",
                isChecked
                    ? "bg-green-500/5 dark:bg-green-500/10 border border-green-500/20 shadow-sm"
                    : "hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent"
            )}
            onClick={() => {
                onClick(
                    item.title,
                    item.description || `Learn about ${item.title} in ${phaseTitle}`
                );
            }}
        >
            { }
            <div className={cn(
                "w-2 h-2 rounded-full shrink-0 transition-all duration-500",
                isChecked
                    ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-check-pop"
                    : "bg-gray-300 dark:bg-white/20"
            )} />

            <div className="flex-1 min-w-0">
                <div className={cn(
                    "text-sm font-medium transition-colors line-clamp-2",
                    isChecked
                        ? "text-green-700 dark:text-green-400/80 line-through"
                        : `text-gray-900 dark:text-white/90 ${colorClass}`
                )}>
                    {item.title}
                </div>
            </div>

            { }
            {isChecked && (
                <div className="flex items-center gap-1.5 bg-green-500/20 dark:bg-green-500/20 px-2 py-0.5 rounded-full border border-green-500/30">
                    <span className="text-[9px] font-black text-green-600 dark:text-green-400 uppercase tracking-tighter">Mastered</span>
                </div>
            )}
        </motion.div>
    );
});

const VirtualizedTopic = memo(function VirtualizedTopic({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '100px', threshold: 0 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className="min-h-[44px]">
            {isVisible ? children : <div className="h-[44px] animate-pulse bg-gray-100/50 dark:bg-white/5 rounded-xl border border-transparent" />}
        </div>
    );
});
