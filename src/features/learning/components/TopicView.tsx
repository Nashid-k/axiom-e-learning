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
import SectionReveal from '@/components/ui/SectionReveal';
import { motion } from 'framer-motion';
import { Header } from '@/components/ui/Header';

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
        <div className="min-h-screen pt-32 px-6">
            <div className="max-w-4xl mx-auto">
                <TopicViewSkeleton />
            </div>
        </div>
    );
    
    if (!topic) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <EmptyState
                    title="Knowledge Void Detected"
                    description="We couldn't locate this knowledge artifact in the neural network."
                    action={<Button onClick={() => router.push('/paths')}>Return to Simulations</Button>}
                />
            </div>
        );
    }

    return (
        <RouteGuard>
            <div className="min-h-screen relative selection:bg-brand/30 pb-32">
                <Header />
                
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-brand/5 to-transparent -z-10" />

                <div className="max-w-4xl mx-auto px-6 pt-40">
                    <SectionReveal>
                        <div className="mb-12">
                            <Breadcrumbs items={[
                                { label: 'Simulations', href: '/paths' },
                                { label: getCategory(topic.title), href: `/paths/${getCategory(topic.title).toLowerCase()}` },
                                { label: topic.title, href: '#', isLast: true }
                            ]} />
                        </div>
                    </SectionReveal>

                    <SectionReveal delay={0.1}>
                        <div className="mb-16">
                            <div className="inline-block px-4 py-1.5 mb-6 glass-card rounded-full text-[10px] font-black tracking-widest text-brand uppercase">
                                Deep Immersion Terminal
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gradient leading-[1.1]">
                                {topic.title}
                            </h1>
                        </div>
                    </SectionReveal>

                    <SectionReveal delay={0.2}>
                        <div className="glass-card p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-3xl -z-10" />
                            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:font-medium prose-p:text-fg-secondary prose-strong:text-brand prose-pre:rounded-3xl prose-pre:border prose-pre:border-surface-border">
                                <ReactMarkdown remarkPlugins={[remarkGfm]} components={getMarkdownComponents(true)}>
                                    {guide || topic.description || "Initializing knowledge stream..."}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </SectionReveal>

                    <SectionReveal delay={0.3}>
                        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 p-8 glass-card rounded-[32px] border-brand/20">
                            <div>
                                <h4 className="text-lg font-bold tracking-tight mb-1">Knowledge Mastered?</h4>
                                <p className="text-sm text-fg-muted font-medium">Finalize your neural synchronization for this topic.</p>
                            </div>
                            <Button 
                                onClick={handleComplete} 
                                size="lg" 
                                className="w-full md:w-auto px-12 py-5 text-lg rounded-2xl shadow-xl shadow-brand/20"
                                isLoading={isCompleting}
                            >
                                Complete Simulation
                            </Button>
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </RouteGuard>
    );
}
