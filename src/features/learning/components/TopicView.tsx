'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTopics, useTopic } from '@/features/learning/hooks/useTopics';
import { getCategory } from '@/features/curriculum/curriculum-constants';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CurriculumView from '@/features/curriculum/components/CurriculumView';
import { Button } from '@/components/ui/Button';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { TopicViewSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import RouteGuard from '@/features/auth/components/RouteGuard';
import { CurriculumData } from '@/types';
import { getMarkdownComponents } from './MarkdownComponents';

interface TopicViewProps {
    id: string;
    curriculumData?: CurriculumData | null;
}

export default function TopicView({ id, curriculumData }: TopicViewProps) {
    const router = useRouter();
    const [isCompleting, setIsCompleting] = useState(false);
    const { topics, updateTopic, loading: topicsLoading } = useTopics();
    const isCurriculumPage = !!curriculumData;

    const topicListEntry = topics.find(t => t.id === id || (typeof t.title === 'string' && t.title.toLowerCase().replace(/\s+/g, '-') === id));
    const { topic: fullTopic, loading: fullTopicLoading } = useTopic(topicListEntry?.id || '');
    
    const topic = fullTopic || topicListEntry;
    const guide = topic?.studyGuide || null;
    const loading = isCurriculumPage ? false : (topicsLoading || (!!topicListEntry && fullTopicLoading && !fullTopic));

    const handleComplete = async () => {
        if (!topic || isCompleting) return;

        setIsCompleting(true);
        try {
            await updateTopic(topic.id, { studied: true });
            router.push(`/paths/${getCategory(topic.title).toLowerCase()}`);
        } finally {
            setIsCompleting(false);
        }
    };

    if (isCurriculumPage && curriculumData) return <CurriculumView data={curriculumData} />;
    
    if (loading) return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <TopicViewSkeleton />
        </div>
    );
    
    if (!topic) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center p-6">
                <EmptyState
                    title="Topic Not Found"
                    description="We couldn't locate this topic in our records."
                    action={<Button onClick={() => router.push('/paths')}>Return to Paths</Button>}
                />
            </div>
        );
    }

    return (
        <RouteGuard>
            <div className="pb-32">
                <div className="mb-8">
                    <Breadcrumbs items={[
                        { label: 'Paths', href: '/paths' },
                        { label: getCategory(topic.title), href: `/paths/${getCategory(topic.title).toLowerCase()}` },
                        { label: topic.title, href: '#', isLast: true }
                    ]} />
                </div>

                <div className="mb-12">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] mb-4">
                        LEARNING MODULE
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--fg-primary)] leading-tight mb-4">
                        {topic.title}
                    </h1>
                    {topic.description && (
                        <p className="text-lg text-[var(--fg-secondary)] max-w-2xl">
                            {topic.description}
                        </p>
                    )}
                </div>

                <div className="border border-[var(--surface-border)] rounded-md bg-[var(--surface-raised)] p-8 md:p-12 mb-12">
                    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-[var(--fg-secondary)] prose-pre:rounded-md prose-pre:border prose-pre:border-[var(--surface-border)] prose-pre:bg-[var(--surface-base)]">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={getMarkdownComponents(true)}>
                            {guide || topic.description || "Loading content..."}
                        </ReactMarkdown>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 border border-[var(--surface-border)] rounded-md bg-[var(--surface-base)]">
                    <div>
                        <h4 className="text-lg font-bold tracking-tight mb-1">Module Complete?</h4>
                        <p className="text-sm text-[var(--fg-muted)]">Mark this topic as studied to track your progress.</p>
                    </div>
                    <Button 
                        onClick={handleComplete} 
                        size="lg" 
                        className="w-full md:w-auto"
                        loading={isCompleting}
                    >
                        Mark as Complete
                    </Button>
                </div>
            </div>
        </RouteGuard>
    );
}
