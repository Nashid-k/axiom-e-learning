"use client";

import { RichItem } from '@/types';
import { TopicRow } from './TopicRow';

interface PhaseCardProps {
    phase: {
        phase: string | number;
        title: string;
        description?: string;
        theory?: (string | RichItem)[];
        practicals?: (string | RichItem)[];
        games?: (string | (RichItem & { url?: string }))[];
    };
    isChecked: (id: string) => boolean;
    onTopicClick: (topic: string, description: string) => void;
}

export function PhaseCard({ phase, isChecked, onTopicClick }: PhaseCardProps) {
    return (
        <div className="flex flex-col glass-panel rounded-2xl overflow-hidden group hover:shadow-[0_10px_35px_-10px_rgba(0,0,0,0.6),0_0_20px_rgba(99,102,241,0.15)] border-white/5 hover:border-[var(--color-primary)]/35 transition-all duration-500 min-h-[350px] max-h-[550px] shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
            <header className="p-8 pb-6 bg-gradient-to-b from-white/[0.02] to-transparent border-b border-white/5 relative overflow-hidden">
                {/* Glow Backdrop */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-[var(--color-primary)]/10 blur-2xl rounded-full transition-opacity group-hover:bg-[var(--color-primary)]/15" />
                
                <div className="flex items-center gap-4 mb-4 relative z-10">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-cyan)] text-white text-sm font-black shadow-[0_0_12px_rgba(99,102,241,0.4)]">
                        {phase.phase}
                    </span>
                    <h2 className="text-lg font-bold tracking-tight text-white group-hover:text-[var(--color-cyan)] transition-colors truncate">
                        {phase.title}
                    </h2>
                </div>
                <p className="text-sm text-[var(--fg-secondary)] font-medium line-clamp-2 leading-relaxed opacity-90 relative z-10">
                    {phase.description}
                </p>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                {phase.theory && phase.theory.length > 0 && (
                    <section>
                        <h3 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[var(--fg-secondary)] mb-4 flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full shadow-[0_0_8px_var(--color-primary)] animate-pulse" />
                            CORE CONCEPTS
                        </h3>
                        <div className="space-y-2.5">
                            {phase.theory.map((rawItem, idx) => {
                                const item: RichItem = typeof rawItem === 'string'
                                    ? { title: rawItem, id: `theory-${phase.phase}-${idx}` }
                                    : { ...rawItem, id: rawItem.id || `theory-${phase.phase}-${idx}` };

                                return (
                                    <TopicRow
                                        key={item.id}
                                        item={item}
                                        phaseTitle={phase.title}
                                        isChecked={isChecked(item.id!)}
                                        onClick={onTopicClick}
                                    />
                                );
                            })}
                        </div>
                    </section>
                )}

                {phase.practicals && phase.practicals.length > 0 && (
                    <section>
                        <h3 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[var(--fg-secondary)] mb-4 flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full shadow-[0_0_8px_var(--color-accent)] animate-pulse" />
                            FIELD WORK
                        </h3>
                        <div className="space-y-2.5">
                            {phase.practicals.map((rawItem, idx) => {
                                const item: RichItem = typeof rawItem === 'string'
                                    ? { title: rawItem, id: `practical-${phase.phase}-${idx}` }
                                    : { ...rawItem, id: rawItem.id || `practical-${phase.phase}-${idx}` };

                                return (
                                    <TopicRow
                                        key={item.id}
                                        item={item}
                                        phaseTitle={phase.title}
                                        isChecked={isChecked(item.id!)}
                                        onClick={onTopicClick}
                                    />
                                );
                            })}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

