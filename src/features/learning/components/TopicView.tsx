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
    returnPath?: string;
}

export default function TopicView({ id, curriculumData, returnPath }: TopicViewProps) {
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
            router.push(returnPath ?? `/paths/${getCategory(topic.title).toLowerCase()}`);
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
            <div className="pb-32 max-w-5xl mx-auto">
                <div className="mb-8">
                    <Breadcrumbs items={[
                        { label: 'Paths', href: '/paths' },
                        { label: getCategory(topic.title), href: `/paths/${getCategory(topic.title).toLowerCase()}` },
                        { label: topic.title, href: '#', isLast: true }
                    ]} />
                </div>

                <div className="mb-12 relative">
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-cyan)] mb-4">
                        LEARNING ENGINE MODULE
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gradient-primary leading-tight mb-5">
                        {topic.title}
                    </h1>
                    {topic.description && (
                        <p className="text-lg text-[var(--fg-secondary)] max-w-3xl leading-relaxed font-semibold opacity-90">
                            {topic.description}
                        </p>
                    )}
                </div>

                {/* Main reading content pane */}
                <div className="glass-panel rounded-2xl p-8 md:p-14 mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/5 relative overflow-hidden">
                    {/* Atmospheric grid grid backdrop */}
                    <div className="absolute inset-0 cyber-grid-bg opacity-[0.015] pointer-events-none" />
                    <div className="absolute -top-36 -right-36 w-72 h-72 bg-[var(--color-primary)]/5 blur-3xl rounded-full pointer-events-none" />
                    
                    <div className="relative z-10 prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight prose-p:text-slate-300 prose-p:leading-relaxed prose-p:font-medium prose-pre:rounded-xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-black/40">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={getMarkdownComponents(true)}>
                            {guide || topic.description || "Loading content..."}
                        </ReactMarkdown>
                    </div>
                </div>

                {/* completion panel */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 border border-white/5 rounded-2xl bg-gradient-to-r from-[var(--surface-raised)] to-transparent shadow-xl relative overflow-hidden group">
                    <div className="absolute -left-12 -bottom-12 w-28 h-28 bg-[var(--color-success)]/5 blur-2xl rounded-full pointer-events-none" />
                    
                    <div className="relative z-10">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-success)]">VERIFICATION GATE</span>
                        <h4 className="text-xl font-bold tracking-tight text-white mt-1 mb-1">Module Synchronization Ready</h4>
                        <p className="text-sm text-[var(--fg-secondary)] font-medium">Mark this node as studied to update your global neural synchronizer.</p>
                    </div>
                    <Button 
                        onClick={handleComplete} 
                        size="lg" 
                        className="w-full md:w-auto bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)] shadow-[0_0_15px_rgba(99,102,241,0.35)] relative z-10"
                        loading={isCompleting}
                    >
                        Synchronize Node
                    </Button>
                </div>
            </div>
        </RouteGuard>
    );
}

