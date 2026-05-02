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
        <div className="max-w-7xl mx-auto px-6 mb-12">
            <div className="p-6 border border-[var(--surface-border)] rounded-md bg-[var(--surface-base)]">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Review Queue</h3>
                    <span className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-widest">{reviewDueTopics.length} Due</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {reviewDueTopics.map(topic => {
                        const status = getReviewStatus(topic.nextReviewDate, topic.studied);
                        return (
                            <button
                                key={topic.id}
                                onClick={() => onTopicClick(topic.title, topic.description || `Review ${topic.title}`)}
                                className="group inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md bg-[var(--surface-raised)] border border-[var(--surface-border)] text-neutral-500 hover:text-black dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-none"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                                <span className="truncate max-w-[180px]">{topic.title}</span>
                                <span className="opacity-50 ml-1">{status.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
