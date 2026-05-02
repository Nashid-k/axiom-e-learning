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
        <div className="h-[450px] flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-md bg-white dark:bg-black overflow-hidden transition-none">
            <header className="p-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold">
                        {phase.phase}
                    </span>
                    <h2 className="text-base font-bold truncate">{phase.title}</h2>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">{phase.description}</p>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {phase.theory && phase.theory.length > 0 && (
                    <section>
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                            Theory
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
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                            Practical
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
