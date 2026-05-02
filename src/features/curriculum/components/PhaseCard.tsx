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
        <div className="h-[500px] flex flex-col bg-[var(--surface-raised)] border border-[var(--surface-border)] rounded-md overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <header className="p-8 pb-6 bg-[var(--surface-raised)]/30 border-b border-surface-border relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--color-primary)]/10 blur-2xl rounded-md" />
                <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-md bg-[var(--color-primary)] text-white text-sm font-black">
                        {phase.phase}
                    </span>
                    <h2 className="text-lg font-extrabold tracking-tight group-hover:text-[var(--color-primary)] transition-colors truncate text-[var(--fg-primary)]">
                        {phase.title}
                    </h2>
                </div>
                <p className="text-sm text-[var(--fg-secondary)] font-medium line-clamp-2 leading-relaxed opacity-80">
                    {phase.description}
                </p>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
                {phase.theory && phase.theory.length > 0 && (
                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--fg-muted)] mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-md shadow-[0_0_8px_var(--color-primary)]" />
                            CORE CONCEPTS
                        </h3>
                        <div className="space-y-3">
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
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--fg-muted)] mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_var(--color-accent)]" />
                            FIELD WORK
                        </h3>
                        <div className="space-y-3">
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
