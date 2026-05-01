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
    if (loading) return <div className="min-h-screen bg-white dark:bg-black"><TopicViewSkeleton /></div>;
    
    if (!topic) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-white dark:bg-black">
                <EmptyState
                    title="Topic not found"
                    description="We couldn't locate this knowledge artifact."
                    action={<Button onClick={() => router.push('/paths')}>Return to Paths</Button>}
                />
            </div>
        );
    }

    return (
        <RouteGuard>
            <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pb-32">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="mb-12">
                        <Breadcrumbs items={[
                            { label: 'Home', href: '/paths' },
                            { label: getCategory(topic.title), href: `/paths/${getCategory(topic.title).toLowerCase()}` },
                            { label: topic.title, href: '#', isLast: true }
                        ]} />
                    </div>

                    <h1 className="text-4xl font-bold mb-12 tracking-tight">{topic.title}</h1>

                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={getMarkdownComponents(true)}>
                            {guide || topic.description || "No content available."}
                        </ReactMarkdown>
                    </div>

                    <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
                        <Button onClick={handleComplete} size="lg" isLoading={isCompleting}>Mark as Complete</Button>
                    </div>
                </div>
            </div>
        </RouteGuard>
    );
}
