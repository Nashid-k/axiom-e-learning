import { motion } from 'framer-motion';
import { springs } from '@/lib/motion/motion-config';
import { getReviewStatus } from '@/features/learning/spaced-repetition';

interface ReviewTopic {
    id: string;
    title: string;
    description?: string;
    nextReviewDate?: string;
    studied?: boolean;
}

interface ReviewQueueProps {
    reviewDueTopics: ReviewTopic[];
    onTopicClick: (topic: string, description: string) => void;
}

export function ReviewQueue({ reviewDueTopics, onTopicClick }: ReviewQueueProps) {
    if (reviewDueTopics.length === 0) return null;

    return (
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
                                onClick={() => onTopicClick(topic.title, topic.description || `Review ${topic.title}`)}
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
    );
}
