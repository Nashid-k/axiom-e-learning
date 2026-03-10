'use client';

import { useRef, useMemo, useEffect, useCallback, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CurriculumData } from '@/types';

import { staggerContainer } from '@/lib/motion/motion-config';

import { useProgress } from '@/features/learning/hooks/useProgress';
import { getCategory } from '@/features/curriculum/curriculum-registry';
import { getHashiraInfo } from '@/lib/motion/world-theme';
import { useModal, TopicItem } from '@/features/ai/context/ModalContext';
import { useMirror } from '@/features/learning/hooks/useMirror';
import { useConfetti } from '@/features/learning/hooks/useConfetti';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { ArcadeSection } from './ArcadeSection';
import { Skeleton } from '@/components/ui/Skeleton';
import ReviewBell from '@/components/ui/ReviewBell';
import { useTopics } from '@/features/learning/hooks/useTopics';
import { getTopicsDueForReview } from '@/features/learning/spaced-repetition';
import { buildWeeklyMissions, collectWeaknessSignals } from '@/features/learning/weakness-engine';

// Extracted Sub-components
import { CurriculumHeader } from './CurriculumHeader';
import { ProgressCard } from './ProgressCard';
import { ReviewQueue } from './ReviewQueue';
import { WeeklyMissions } from './WeeklyMissions';
import { PhaseCard } from './PhaseCard';

interface CurriculumViewProps {
    data: CurriculumData;
}

export default function CurriculumView({ data }: CurriculumViewProps) {
    const categoryName = (data.category || getCategory(data.description)) as string;
    const curriculumTitle = data.title || data.description || categoryName;
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
    const info = getHashiraInfo(categorySlug);
    const router = useRouter();
    const isInitialized = useRef(false);
    const celebratedPhases = useRef<Set<number>>(new Set());
    const { fireConfetti, fireMiniBurst } = useConfetti();
    const { isChecked, isLoading, toggleItem } = useProgress(categorySlug);
    const { topics: reviewTopics, loading: reviewLoading } = useTopics();
    const { mirrorPhases } = useMirror(categorySlug, data.phases);

    const showPop = false;

    const reviewDueTopics = useMemo(() =>
        reviewLoading ? [] : getTopicsDueForReview(reviewTopics),
        [reviewTopics, reviewLoading]
    );

    const weeklyMissions = useMemo(() => {
        const signals = collectWeaknessSignals(reviewTopics, categoryName);
        return buildWeeklyMissions(signals);
    }, [reviewTopics, categoryName]);

    const { stats, allTopics } = useMemo(() => {
        let total = 0;
        let completed = 0;
        const phaseStats: { phase: number; percentage: number }[] = [];
        const topics: TopicItem[] = [];

        data.phases.forEach((phase) => {
            let pTotal = 0;
            let pCompleted = 0;

            const processItems = (items: (string | any)[] | undefined, type: 'theory' | 'practical') => {
                items?.forEach((rawItem, idx) => {
                    total++;
                    pTotal++;
                    const item = typeof rawItem === 'string' ? { title: rawItem } : rawItem;
                    const id = item.id || `${type}-${phase.phase}-${idx}`;

                    const checked = isChecked(id);
                    if (checked) {
                        completed++;
                        pCompleted++;
                    }

                    topics.push({
                        id,
                        topic: item.title,
                        description: item.description || `Learn about ${item.title} in Phase ${phase.phase}${type === 'practical' ? ' [PRACTICAL_MODE]' : ''}`,
                        phase: String(phase.phase),
                        category: categoryName,
                    });
                });
            };

            processItems(phase.theory, 'theory');
            processItems(phase.practicals, 'practical');

            phaseStats.push({
                phase: Number(phase.phase),
                percentage: pTotal > 0 ? (pCompleted / pTotal) * 100 : 0
            });
        });

        return {
            stats: {
                total,
                completed,
                percentage: total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0,
                phaseProgress: phaseStats
            },
            allTopics: topics
        };
    }, [data.phases, isChecked, categoryName]);

    const totalItems = stats.total;
    const validCompletedCount = stats.completed;
    const progressPercentage = stats.percentage;
    const phaseProgress = stats.phaseProgress;

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
            <div className="min-h-screen bg-[var(--surface-base)] text-[var(--fg-primary)] flex flex-col pt-24 px-3 sm:px-6 md:px-12 lg:px-20 max-w-[95vw] mx-auto transition-colors duration-300">
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
        <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-[var(--fg-primary)] transition-colors duration-300">

            <div className="pt-16 sm:pt-24 pb-12 px-3 sm:px-6 md:px-12 lg:px-20 max-w-[95vw] 2xl:max-w-[1920px] mx-auto">
                <div className="mb-7">
                    <Breadcrumbs items={[
                        { label: 'Home', href: '/paths' },
                        { label: curriculumTitle, href: '#', isLast: true }
                    ]} />
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:items-end justify-between">
                    <CurriculumHeader
                        categorySlug={categorySlug}
                        curriculumTitle={curriculumTitle}
                        description={data.description as string}
                        info={info}
                    />

                    <ProgressCard
                        progressPercentage={progressPercentage}
                        validCompletedCount={validCompletedCount}
                        totalItems={totalItems}
                        showPop={showPop}
                    />
                </div>
            </div>

            <ArcadeSection data={data} />

            <ReviewQueue
                reviewDueTopics={reviewDueTopics}
                onTopicClick={handleTopicClick}
            />

            <WeeklyMissions
                weeklyMissions={weeklyMissions}
                onTopicClick={handleTopicClick}
            />

            <main className="px-4 md:px-12 lg:px-20 pb-18 max-w-[95vw] 2xl:max-w-[1920px] mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
                >
                    {mirrorPhases.map((phase) => (
                        <PhaseCard
                            key={phase.phase}
                            phase={phase}
                            isChecked={isChecked}
                            onTopicClick={handleTopicClick}
                        />
                    ))}
                </motion.div>

                <div className="mt-24 pt-8 border-t border-gray-200 dark:border-white/10 text-center text-gray-400 dark:text-white/35 text-xs transition-colors">
                    <p>End of curriculum: {data.title as string || ""}</p>
                </div>
            </main>

            <ReviewBell />
        </div >
    );
}
