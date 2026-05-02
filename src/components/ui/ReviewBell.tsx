'use client';

import { useState, useMemo } from 'react';
import { useTopics } from '@/features/learning/hooks/useTopics';
import { getTopicsDueForReview } from '@/features/learning/spaced-repetition';

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
                className="fixed bottom-6 left-6 z-[45] w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center border border-neutral-200 dark:border-neutral-800 transition-none group"
                title={`${dueCount} topics due for review`}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {dueCount > 9 ? '9+' : dueCount}
                </span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60" onClick={() => setIsOpen(false)} />
                    
                    <div className="relative w-full max-w-md bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden flex flex-col max-h-[80vh]">
                        <header className="p-4 border-b border-neutral-100 dark:border-neutral-900 flex justify-between items-center">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Due for Review ({dueCount})</h2>
                            <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-black dark:hover:text-white">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                            </button>
                        </header>

                        <div className="flex-1 overflow-y-auto p-2 space-y-1">
                            {dueTopics.map((topic) => (
                                <div key={topic.id} className="p-4 border border-neutral-50 dark:border-neutral-950 bg-neutral-50 dark:bg-neutral-900 rounded-md flex items-center justify-between group">
                                    <div className="flex-1 min-w-0 mr-4">
                                        <h3 className="text-sm font-bold truncate">{topic.title}</h3>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-500 mt-1">Review Now</p>
                                    </div>
                                    <button
                                        onClick={() => toggleStudied(topic.id)}
                                        className="w-8 h-8 rounded-md border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-brand-500 hover:border-brand-500 transition-none"
                                        title="Complete Review"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <footer className="p-4 border-t border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950 text-center">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Keep your streak alive</p>
                        </footer>
                    </div>
                </div>
            )}
        </>
    );
}
