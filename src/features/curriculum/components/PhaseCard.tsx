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
        <div className="flex flex-col glass-panel rounded-2xl overflow-hidden group hover:shadow-[0_10px_35px_-10px_rgba(0,0,0,0.6),0_0_20px_rgba(99,102,241,0.15)] border-[var(--surface-border)] hover:border-[var(--color-primary)]/35 transition-all duration-500 min-h-[350px] max-h-[550px] shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
            <header className="p-8 pb-6 bg-gradient-to-b from-[var(--surface-border)] to-transparent border-b border-[var(--surface-border)] relative overflow-hidden">
                {/* Glow Backdrop */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-[var(--color-primary)]/10 blur-2xl rounded-full transition-opacity group-hover:bg-[var(--color-primary)]/15" />
                
                <div className="flex items-center gap-4 mb-4 relative z-10">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-cyan)] text-[var(--color-pitch-black)] text-sm font-black shadow-[0_0_12px_rgba(99,102,241,0.4)]">
                        {phase.phase}
                    </span>
                    <h2 className="text-lg font-bold tracking-tight text-[var(--fg-primary)] group-hover:text-[var(--color-cyan)] transition-colors truncate">
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
                        <h3 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[var(--fg-secondary)] mb-6 flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full shadow-[0_0_8px_var(--color-primary)] animate-pulse" />
                            CORE CONCEPTS
                        </h3>
                        <div className="relative pl-3 space-y-4">
                            {/* Main Vertical Skill Tree Branch */}
                            <div className="absolute top-6 bottom-6 left-[17px] w-0.5 bg-gradient-to-b from-[var(--color-primary)]/40 via-[var(--surface-border)] to-transparent rounded-full" />
                            
                            {phase.theory.map((rawItem, idx) => {
                                const item: RichItem = typeof rawItem === 'string'
                                    ? { title: rawItem, id: `theory-${phase.phase}-${idx}` }
                                    : { ...rawItem, id: rawItem.id || `theory-${phase.phase}-${idx}` };

                                const checked = isChecked(item.id!);

                                return (
                                    <div key={item.id} className="relative flex items-center group/branch">
                                        {/* Horizontal Tree Connector */}
                                        <div className={`absolute top-1/2 left-1 w-5 h-0.5 -translate-y-1/2 transition-colors duration-500 ${checked ? 'bg-[var(--color-primary)]/60 shadow-[0_0_5px_var(--color-primary)]' : 'bg-[var(--surface-border)] group-hover/branch:bg-[var(--color-primary)]/40'}`} />
                                        
                                        {/* Glowing Node Joint */}
                                        <div className={`absolute top-1/2 left-0.5 w-1.5 h-1.5 rounded-full -translate-y-1/2 transition-all duration-500 z-10 ${checked ? 'bg-[var(--color-cyan)] shadow-[0_0_8px_var(--color-cyan)] scale-125' : 'bg-[var(--surface-border)] group-hover/branch:bg-[var(--color-primary)]'}`} />

                                        <div className="ml-8 w-full">
                                            <TopicRow
                                                item={item}
                                                phaseTitle={phase.title}
                                                isChecked={checked}
                                                onClick={onTopicClick}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {phase.practicals && phase.practicals.length > 0 && (
                    <section>
                        <h3 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[var(--fg-secondary)] mb-6 flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full shadow-[0_0_8px_var(--color-accent)] animate-pulse" />
                            FIELD WORK
                        </h3>
                        <div className="relative pl-3 space-y-4">
                            {/* Main Vertical Skill Tree Branch */}
                            <div className="absolute top-6 bottom-6 left-[17px] w-0.5 bg-gradient-to-b from-[var(--color-accent)]/40 via-[var(--surface-border)] to-transparent rounded-full" />
                            
                            {phase.practicals.map((rawItem, idx) => {
                                const item: RichItem = typeof rawItem === 'string'
                                    ? { title: rawItem, id: `practical-${phase.phase}-${idx}` }
                                    : { ...rawItem, id: rawItem.id || `practical-${phase.phase}-${idx}` };

                                const checked = isChecked(item.id!);

                                return (
                                    <div key={item.id} className="relative flex items-center group/branch">
                                        {/* Horizontal Tree Connector */}
                                        <div className={`absolute top-1/2 left-1 w-5 h-0.5 -translate-y-1/2 transition-colors duration-500 ${checked ? 'bg-[var(--color-accent)]/60 shadow-[0_0_5px_var(--color-accent)]' : 'bg-[var(--surface-border)] group-hover/branch:bg-[var(--color-accent)]/40'}`} />
                                        
                                        {/* Glowing Node Joint */}
                                        <div className={`absolute top-1/2 left-0.5 w-1.5 h-1.5 rounded-full -translate-y-1/2 transition-all duration-500 z-10 ${checked ? 'bg-[var(--color-pink)] shadow-[0_0_8px_var(--color-pink)] scale-125' : 'bg-[var(--surface-border)] group-hover/branch:bg-[var(--color-accent)]'}`} />

                                        <div className="ml-8 w-full">
                                            <TopicRow
                                                item={item}
                                                phaseTitle={phase.title}
                                                isChecked={checked}
                                                onClick={onTopicClick}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
