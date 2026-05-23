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
            {/* Glowing HUD Floating Bell */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 pb-[env(safe-area-inset-bottom)] z-[45] w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-cyan)] text-white flex items-center justify-center border border-white/20 transition-all duration-300 group shadow-[0_4px_25px_rgba(99,102,241,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] cursor-pointer hover:scale-105 active:scale-95"
                title={`${dueCount} topics due for review`}
                aria-label={`${dueCount} topic${dueCount !== 1 ? 's' : ''} due for review. Click to view.`}
            >
                {/* Subtle outer pulsing ring */}
                <span className="absolute -inset-1 rounded-2xl bg-[var(--color-cyan)]/20 animate-ping opacity-75 group-hover:opacity-100" />
                
                <svg className="w-6 h-6 transition-transform group-hover:rotate-12 duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-xl bg-[var(--color-accent)] text-white text-[10px] font-black flex items-center justify-center border-2 border-[var(--color-bg)] shadow-[0_0_12px_rgba(236,72,153,0.6)] z-20">
                    {dueCount > 9 ? '9+' : dueCount}
                </span>
            </button>

            {/* Glass Review Drawer overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" onClick={() => setIsOpen(false)} />
                    
                    <div className="relative w-full max-w-md glass-panel rounded-2xl overflow-hidden flex flex-col max-h-[75vh] shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-white/10">
                        {/* Glow accent */}
                        <div className="absolute -top-12 -right-12 w-28 h-28 bg-[var(--color-cyan)]/10 blur-2xl rounded-full" />
                        
                        <header className="p-5 border-b border-white/5 flex justify-between items-center relative z-10">
                            <div>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-cyan)]">NEURAL DETECTOR</span>
                                <h2 className="text-sm font-bold uppercase tracking-widest text-white mt-0.5">Due for Review ({dueCount})</h2>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-lg border border-white/5 hover:border-white/10 hover:bg-white/5 flex items-center justify-center text-[var(--fg-secondary)] hover:text-white transition-colors cursor-pointer">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                        </header>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar relative z-10">
                            {dueTopics.map((topic) => (
                                <div key={topic.id} className="p-4 border border-white/5 bg-gradient-to-r from-[var(--surface-raised)] to-transparent rounded-xl flex items-center justify-between group hover:border-[var(--color-primary)]/30 transition-all duration-300 shadow-md">
                                    <div className="flex-1 min-w-0 mr-4">
                                        <Link
                                            href={`/learn/${topic.id}`}
                                            onClick={() => setIsOpen(false)}
                                            className="block group/link"
                                        >
                                            <h3 className="text-sm font-bold text-white truncate group-hover/link:text-[var(--color-cyan)] transition-colors">{topic.title}</h3>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-cyan)] mt-1.5 flex items-center gap-1.5 transition-colors">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] animate-pulse shadow-[0_0_8px_var(--color-cyan)]" />
                                                Study Node →
                                            </p>
                                        </Link>
                                    </div>
                                    <button
                                        onClick={() => toggleStudied(topic.id)}
                                        className="w-8.5 h-8.5 rounded-lg border border-white/5 bg-white/5 flex items-center justify-center text-[var(--fg-secondary)] hover:text-[var(--color-success)] hover:border-[var(--color-success)]/40 hover:bg-[var(--color-success)]/10 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)] transition-all duration-300 cursor-pointer"
                                        title="Mark as Reviewed"
                                        aria-label={`Mark "${topic.title}" as reviewed`}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <footer className="p-4 border-t border-white/5 bg-black/40 text-center relative z-10">
                            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[var(--fg-secondary)] animate-pulse">KEEP YOUR NEURAL STREAK ALIVE</p>
                        </footer>
                    </div>
                </div>
            )}
        </>
    );
}

