'use client';

import { useMemo } from 'react';
import { CurriculumData, RichItem } from '@/types';
import { useProgress } from '@/features/learning/hooks/useProgress';
import { getCategory } from '@/features/curriculum/curriculum-registry';
import { useModal, TopicItem } from '@/features/ai/context/ModalContext';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { CurriculumHeader } from './CurriculumHeader';
import { ProgressCard } from './ProgressCard';
import { PhaseCard } from './PhaseCard';
import SectionReveal from '@/components/ui/SectionReveal';

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
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" label="Syncing Neural Progress" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <SectionReveal>
                    <div className="mb-12">
                        <Breadcrumbs items={[
                            { label: 'Home', href: '/paths' },
                            { label: curriculumTitle, href: '#', isLast: true }
                        ]} />
                    </div>
                </SectionReveal>

                <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20 relative">
                    <SectionReveal delay={0.1} className="flex-1">
                        <CurriculumHeader
                            categorySlug={categorySlug}
                            curriculumTitle={curriculumTitle}
                            description={data.description as string}
                        />
                    </SectionReveal>
                    <SectionReveal delay={0.2}>
                        <ProgressCard
                            progressPercentage={stats.percentage}
                            validCompletedCount={stats.completed}
                            totalItems={stats.total}
                        />
                    </SectionReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.phases.map((phase, i) => (
                        <SectionReveal key={phase.phase} delay={0.2 + i * 0.05} direction="up">
                            <PhaseCard
                                phase={phase}
                                isChecked={isChecked}
                                onTopicClick={handleTopicClick}
                            />
                        </SectionReveal>
                    ))}
                </div>

                <footer className="mt-32 pt-16 border-t border-[var(--surface-border)] text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--fg-muted)]">
                        Mission Progress: {stats.percentage}% Synchronized
                    </p>
                </footer>
            </div>
        </div>
    );
}
