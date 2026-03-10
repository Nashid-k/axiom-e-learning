'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { springs } from '@/lib/motion/motion-config';
import { useTopics, useTopic } from '@/features/learning/hooks/useTopics';
import { getCategory } from '@/features/curriculum/curriculum-constants';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import CurriculumView from '@/features/curriculum/components/CurriculumView';
import { Button } from '@/components/ui/Button';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

import RouteGuard from '@/features/auth/components/RouteGuard';
import { CurriculumData } from '@/types';

interface TopicViewProps {
    id: string;
    curriculumData?: CurriculumData | null;
}

export default function TopicView({ id, curriculumData }: TopicViewProps) {
    const router = useRouter();
    const { topics, updateTopic, loading: topicsLoading } = useTopics();

    const isCurriculumPage = !!curriculumData;

    const topicListEntry = topics.find(t =>
        t.id === id || (typeof t.title === 'string' && t.title.toLowerCase().replace(/\s+/g, '-') === id)
    );

    const { topic: fullTopic, loading: fullTopicLoading } = useTopic(topicListEntry?.id || '');

    const topic = fullTopic || topicListEntry;

    const guide = topic?.studyGuide || null;
    const loading = isCurriculumPage ? false : (topicsLoading || (!!topicListEntry && fullTopicLoading && !fullTopic));


    const handleComplete = async () => {
        if (topic) {
            await updateTopic(topic.id, { studied: true });
            router.push(`/paths/${getCategory(topic.title).toLowerCase()}`);
        }
    };

    if (isCurriculumPage && curriculumData) {
        return <CurriculumView data={curriculumData} />;
    }

    if (loading) return <div className="min-h-screen bg-white dark:bg-black" />;

    if (!topic) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Topic not found.</p>
            </div>
        );
    }

    return (
        <RouteGuard>
            <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30">
                { }
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={springs.gentle}
                    className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 w-full overflow-hidden"
                >
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, ...springs.responsive }}
                        className="mb-8"
                    >
                        <Breadcrumbs items={[
                            { label: 'Home', href: '/paths' },
                            { label: getCategory(topic.title), href: `/paths/${getCategory(topic.title).toLowerCase()}` },
                            { label: topic.title, href: '#', isLast: true }
                        ]} />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, ...springs.responsive }}
                        className="text-4xl font-bold mb-4"
                    >
                        {topic.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, ...springs.responsive }}
                        className="prose prose-lg dark:prose-invert max-w-none"
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({ className, children, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { inline?: boolean }) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return match ? (
                                        <div className="rounded-xl overflow-hidden my-6 border border-gray-200 dark:border-white/10">
                                            <div className="bg-gray-100 dark:bg-white/5 px-4 py-2 text-xs font-bold uppercase text-gray-500">{match[1]}</div>
                                            <SyntaxHighlighter
                                                style={vscDarkPlus as { [key: string]: React.CSSProperties }}
                                                language={match[1]}
                                                PreTag="div"
                                                customStyle={{ margin: 0, padding: '1.5rem', background: '#0d0d0d', overflowX: 'auto', maxWidth: '100%' } as React.CSSProperties}
                                            >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
                                        </div>
                                    ) : (
                                        <code className="bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400 font-mono text-sm" {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        >
                            {guide || topic.description || "No content available."}
                        </ReactMarkdown>
                    </motion.div>

                    <div className="mt-12 pt-12 border-t border-gray-200 dark:border-white/10 flex justify-end">
                        <Button onClick={handleComplete} size="lg">Markdown as Complete</Button>
                    </div>
                </motion.div>
            </div>
        </RouteGuard >
    );
}
