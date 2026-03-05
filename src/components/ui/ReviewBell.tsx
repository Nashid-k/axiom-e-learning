'use client';

import { useState, useMemo } from 'react';
import { useTopics } from '@/features/learning/hooks/useTopics';
import { getTopicsDueForReview, getReviewStatus } from '@/features/learning/spaced-repetition';

export default function ReviewBell() {
    const [isOpen, setIsOpen] = useState(false);
    const { topics, toggleStudied } = useTopics();

    const dueTopics = useMemo(() => getTopicsDueForReview(topics), [topics]);
    const dueCount = dueTopics.length;

    if (dueCount === 0) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={[
                    "fixed bottom-[var(--space-2)] right-[var(--space-2)] z-50",
                    "w-14 h-14 rounded-[var(--radius-full)]",
                    "bg-[var(--color-ana-blue-500)]",
                    "text-white shadow-[var(--shadow-lg)]",
                    "hover:bg-[var(--color-ana-blue-400)]",
                    "transition-all duration-[var(--duration-base)]",
                    "hover:scale-110 flex items-center justify-center group cursor-pointer",
                ].join(' ')}
                title={`${dueCount} topics due for review`}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:animate-bounce">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className={[
                    "absolute -top-1 -right-1 w-6 h-6",
                    "rounded-[var(--radius-full)]",
                    "bg-[var(--color-destruct)] text-white",
                    "text-[var(--text-caption)] font-bold",
                    "flex items-center justify-center shadow-[var(--shadow-sm)]",
                ].join(' ')}>
                    {dueCount > 9 ? '9+' : dueCount}
                </span>
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-[var(--space-2)]">
                    <div
                        className="absolute inset-0 bg-[var(--color-900)]/50 backdrop-blur-sm cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className={[
                        "relative w-full max-w-lg max-h-[80vh]",
                        "bg-[var(--surface-base)]",
                        "rounded-[var(--radius-2xl)]",
                        "shadow-[var(--shadow-xl)]",
                        "border border-[var(--border-default)]",
                        "overflow-hidden",
                    ].join(' ')}>
                        <div className="flex items-center justify-between px-[var(--space-3)] py-[var(--space-2)] border-b border-[var(--border-default)]">
                            <div className="flex items-center gap-[var(--space-1)]">
                                <div className="p-[var(--space-1)] rounded-[var(--radius-md)] bg-[var(--color-ana-blue-500)]/10 text-[var(--color-ana-blue-500)]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                    </svg>
                                </div>
                                <h2 className="text-[var(--text-body)] font-[var(--font-weight-bold)] text-[var(--fg-primary)]">
                                    Due for Review
                                    <span className="ml-[var(--space-1)] text-[var(--text-caption)] font-normal text-[var(--fg-muted)]">
                                        ({dueCount})
                                    </span>
                                </h2>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-[var(--space-1)] text-[var(--fg-muted)] hover:text-[var(--fg-primary)] hover:bg-[var(--surface-overlay)] rounded-[var(--radius-full)] transition-colors duration-[var(--duration-fast)] cursor-pointer"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="overflow-y-auto max-h-[60vh] p-[var(--space-2)] flex flex-col gap-[var(--space-1)]">
                            {dueTopics.map((topic) => {
                                const reviewStatus = getReviewStatus(topic.nextReviewDate, topic.studied);
                                return (
                                    <div
                                        key={topic.id}
                                        className={[
                                            "p-[var(--space-2)]",
                                            "bg-[var(--surface-raised)]",
                                            "rounded-[var(--radius-lg)]",
                                            "border border-[var(--border-default)]",
                                            "hover:border-[var(--color-ana-blue-400)]",
                                            "transition-colors duration-[var(--duration-fast)]",
                                        ].join(' ')}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-[var(--font-weight-bold)] text-[var(--fg-primary)] truncate">
                                                    {topic.title}
                                                </h3>
                                                <p className="text-[var(--text-caption)] text-[var(--color-ana-blue-500)] font-[var(--font-weight-medium)] mt-[4px]">
                                                    {reviewStatus.label}
                                                </p>
                                                {topic.description && (
                                                    <p className="text-[var(--text-caption)] text-[var(--fg-muted)] mt-[var(--space-1)] line-clamp-2">
                                                        {topic.description}
                                                    </p>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => toggleStudied(topic.id)}
                                                className={[
                                                    "ml-[var(--space-2)] p-[var(--space-1)]",
                                                    "rounded-[var(--radius-full)]",
                                                    "bg-[var(--color-ana-blue-500)]/10 text-[var(--color-ana-blue-500)]",
                                                    "hover:bg-[var(--color-comp-400)]/10 hover:text-[var(--color-comp-500)]",
                                                    "transition-colors duration-[var(--duration-base)] flex-shrink-0 cursor-pointer",
                                                ].join(' ')}
                                                title="Mark as reviewed"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                    <path d="M20 6L9 17l-5-5" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="px-[var(--space-3)] py-[var(--space-2)] bg-[var(--surface-raised)] border-t border-[var(--border-default)] text-center">
                            <p className="text-[var(--text-caption)] text-[var(--fg-muted)]">
                                Click ✓ to mark reviewed and schedule next review
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
