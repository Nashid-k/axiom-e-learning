'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTopics } from '@/features/learning/hooks/useTopics';
import { getTopicsDueForReview } from '@/features/learning/spaced-repetition';
import { cn } from '@/lib/utils';

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
                className="fixed bottom-6 right-6 pb-[env(safe-area-inset-bottom)] z-[45] w-12 h-12 rounded-md bg-[var(--fg-primary)] text-[var(--surface-base)] flex items-center justify-center border border-[var(--surface-border)] transition-colors duration-150 group"
                title={`${dueCount} topics due for review`}
                aria-label={`${dueCount} topic${dueCount !== 1 ? 's' : ''} due for review. Click to view.`}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-md bg-[var(--color-primary)] text-white text-[10px] font-bold flex items-center justify-center">
                    {dueCount > 9 ? '9+' : dueCount}
                </span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60" onClick={() => setIsOpen(false)} />
                    
                    <div className="relative w-full max-w-md bg-[var(--surface-base)] border border-[var(--surface-border)] rounded-md overflow-hidden flex flex-col max-h-[80vh]">
                        <header className="p-4 border-b border-[var(--surface-border)] flex justify-between items-center">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--fg-muted)]">Due for Review ({dueCount})</h2>
                            <button onClick={() => setIsOpen(false)} className="text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors cursor-pointer">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                            </button>
                        </header>

                        <div className="flex-1 overflow-y-auto p-2 space-y-1">
                            {dueTopics.map((topic) => (
                                <div key={topic.id} className="p-4 border border-[var(--surface-border)] bg-[var(--surface-raised)] rounded-md flex items-center justify-between group">
                                    <div className="flex-1 min-w-0 mr-4">
                                        <Link
                                            href={`/learn/${topic.id}`}
                                            onClick={() => setIsOpen(false)}
                                            className="block group/link"
                                        >
                                            <h3 className="text-sm font-bold truncate group-hover/link:text-[var(--color-primary)] transition-colors">{topic.title}</h3>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] mt-1 flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
                                                Study Now →
                                            </p>
                                        </Link>
                                    </div>
                                    <button
                                        onClick={() => toggleStudied(topic.id)}
                                        className="w-8 h-8 rounded-md border border-[var(--surface-border)] flex items-center justify-center text-[var(--fg-muted)] hover:text-[var(--color-success)] hover:border-[var(--color-success)] transition-colors duration-150"
                                        title="Mark as Reviewed"
                                        aria-label={`Mark "${topic.title}" as reviewed`}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <footer className="p-4 border-t border-[var(--surface-border)] bg-[var(--surface-raised)] text-center">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)]">Keep your streak alive</p>
                        </footer>
                    </div>
                </div>
            )}
        </>
    );
}
