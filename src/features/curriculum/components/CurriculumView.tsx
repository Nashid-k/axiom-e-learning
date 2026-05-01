'use client';

import { useMemo } from 'react';
import { CurriculumData, RichItem } from '@/types';
import { useProgress } from '@/features/learning/hooks/useProgress';
import { getCategory } from '@/features/curriculum/curriculum-registry';
import { useModal, TopicItem } from '@/features/ai/context/ModalContext';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Skeleton } from '@/components/ui/Skeleton';
import { CurriculumHeader } from './CurriculumHeader';
import { ProgressCard } from './ProgressCard';
import { PhaseCard } from './PhaseCard';

interface CurriculumViewProps {
    data: CurriculumData;
}

export default function CurriculumView({ data }: CurriculumViewProps) {
    const categoryName = (data.category || getCategory(data.description)) as string;
    const curriculumTitle = data.title || data.description || categoryName;
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
    
    const { isChecked, isLoading } = useProgress(categorySlug);

    const allTopics = useMemo(() => {
        const topics: TopicItem[] = [];
        data.phases.forEach((phase) => {
            const processItems = (items: Array<string | RichItem> | undefined, type: 'theory' | 'practical') => {
                items?.forEach((rawItem, idx) => {
                    const item = typeof rawItem === 'string' ? { title: rawItem } : rawItem;
                    const id = item.id || `${type}-${phase.phase}-${idx}`;
                    topics.push({
                        id,
                        topic: item.title,
                        description: item.description || `Learn about ${item.title} in Phase ${phase.phase}`,
                        phase: String(phase.phase),
                        category: categoryName,
                    });
                });
            };
            processItems(phase.theory, 'theory');
            processItems(phase.practicals, 'practical');
        });
        return topics;
    }, [data.phases, categoryName]);

    const stats = useMemo(() => {
        let total = 0;
        let completed = 0;
        data.phases.forEach((phase) => {
            const count = (items?: Array<string | RichItem>) => items?.forEach((raw, idx) => {
                total++;
                const id = typeof raw === 'string' ? `item-${phase.phase}-${idx}` : raw.id || `item-${phase.phase}-${idx}`;
                if (isChecked(id)) completed++;
            });
            count(phase.theory);
            count(phase.practicals);
        });
        return {
            total,
            completed,
            percentage: total > 0 ? Math.round((completed / total) * 100) : 0
        };
    }, [data.phases, isChecked]);

    const { openAIModal } = useModal();

    const handleTopicClick = (topicName: string, description: string) => {
        const foundTopic = allTopics.find(t => t.topic === topicName);
        if (foundTopic) {
            openAIModal({
                ...foundTopic,
                category: categoryName,
                description: description,
                curriculum: curriculumTitle,
                fileName: data.fileName as string,
                allTopics: allTopics,
                currentIndex: allTopics.findIndex(t => t.topic === topicName),
                initialTab: 'ai'
            });
        }
    };

    if (isLoading) {
        return (
            <div className="p-12 max-w-7xl mx-auto">
                <div className="relative">
                    <Skeleton className="h-64 w-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <LoadingSpinner size="lg" label="Loading progress" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-none">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <Breadcrumbs items={[
                        { label: 'Home', href: '/paths' },
                        { label: curriculumTitle, href: '#', isLast: true }
                    ]} />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                    <CurriculumHeader
                        categorySlug={categorySlug}
                        curriculumTitle={curriculumTitle}
                        description={data.description as string}
                    />
                    <ProgressCard
                        progressPercentage={stats.percentage}
                        validCompletedCount={stats.completed}
                        totalItems={stats.total}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {data.phases.map((phase) => (
                        <PhaseCard
                            key={phase.phase}
                            phase={phase}
                            isChecked={isChecked}
                            onTopicClick={handleTopicClick}
                        />
                    ))}
                </div>

                <footer className="mt-24 pt-12 border-t border-neutral-100 dark:border-neutral-900 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">End of Curriculum</p>
                </footer>
            </div>
        </div>
    );
}
