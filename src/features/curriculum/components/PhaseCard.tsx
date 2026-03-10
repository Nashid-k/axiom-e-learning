import { motion } from 'framer-motion';
import { RichItem } from '@/types';
import { fadeInUp } from '@/lib/motion/motion-config';
import { TopicRow, VirtualizedTopic } from './TopicRow';

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
        <motion.div variants={fadeInUp} className="h-full">
            <div
                className="h-auto min-h-[300px] sm:h-[380px] md:h-[420px] flex flex-col relative group hover:border-[var(--border-strong)] transition-all duration-300 bg-[var(--surface-raised)] backdrop-blur-md transform-gpu border border-[var(--border-default)] rounded-2xl overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-80 transition-opacity pointer-events-none" />
                <div className="relative z-10 p-3.5 pb-3 border-b border-[var(--border-default)] bg-[var(--surface-subtle)]/60 dark:bg-black/40 shrink-0 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-white/10 text-xs font-semibold border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white transition-colors">
                                    {phase.phase}
                                </span>
                                <h2 className="text-[15px] font-semibold line-clamp-1 text-gray-900 dark:text-white transition-colors">{phase.title}</h2>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-white/55 line-clamp-2 leading-relaxed transition-colors">{phase.description}</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 pt-3 space-y-4">
                    {phase.theory && phase.theory.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="sticky top-0 z-10 bg-[var(--surface-raised)]/90 py-1.5 -mx-1 px-1.5 text-[11px] font-semibold text-[var(--fg-muted)] flex items-center gap-2 uppercase tracking-wider mb-2 rounded-md transition-colors backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                Theory
                            </h3>
                            <div className="space-y-2">
                                {phase.theory.map((rawItem, idx) => {
                                    const item: RichItem = typeof rawItem === 'string'
                                        ? { title: rawItem, id: `theory-${phase.phase}-${idx}` }
                                        : { ...rawItem, id: rawItem.id || `theory-${phase.phase}-${idx}` };

                                    return (
                                        <VirtualizedTopic key={item.id} id={item.id!}>
                                            <TopicRow
                                                item={item}
                                                phaseTitle={phase.title}
                                                isChecked={isChecked(item.id!)}
                                                onClick={onTopicClick}
                                                colorClass="group-hover/item:text-blue-300"
                                            />
                                        </VirtualizedTopic>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {phase.practicals && phase.practicals.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="sticky top-0 z-10 bg-white/90 dark:bg-black/85 py-1.5 -mx-1 px-1.5 text-[11px] font-semibold text-gray-500 dark:text-white/70 flex items-center gap-2 uppercase tracking-wider mb-2 rounded-md border-t border-gray-100 dark:border-white/5 mt-5 pt-3 transition-colors backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                                Practical
                            </h3>
                            <div className="space-y-2">
                                {phase.practicals.map((rawItem, idx) => {
                                    const item: RichItem = typeof rawItem === 'string'
                                        ? { title: rawItem, id: `practical-${phase.phase}-${idx}` }
                                        : { ...rawItem, id: rawItem.id || `practical-${phase.phase}-${idx}` };

                                    return (
                                        <VirtualizedTopic key={item.id} id={item.id!}>
                                            <TopicRow
                                                item={item}
                                                phaseTitle={phase.title}
                                                isChecked={isChecked(item.id!)}
                                                onClick={onTopicClick}
                                                colorClass="group-hover/item:text-orange-300"
                                            />
                                        </VirtualizedTopic>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {phase.games && phase.games.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="sticky top-0 z-10 bg-white/90 dark:bg-black/85 py-1.5 -mx-1 px-1.5 text-[11px] font-semibold text-gray-500 dark:text-white/70 flex items-center gap-2 uppercase tracking-wider mb-2 rounded-md border-t border-gray-100 dark:border-white/5 mt-5 pt-3 transition-colors backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                                Gamified Learning
                            </h3>
                            <div className="space-y-2">
                                {phase.games.map((rawItem, idx) => {
                                    const item: RichItem = typeof rawItem === 'string'
                                        ? { title: rawItem, id: `game-${phase.phase}-${idx}` }
                                        : { ...rawItem, id: `game-${phase.phase}-${idx}` };

                                    return (
                                        <a
                                            key={item.id}
                                            href={(rawItem as any).url || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block py-3 px-3.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 hover:border-blue-300 dark:hover:border-blue-500/40 transition-all group/game cursor-pointer"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <h4 className="text-[13px] font-bold text-blue-900 dark:text-blue-100 group-hover/game:text-blue-700 dark:group-hover/game:text-white transition-colors mb-1">
                                                        {item.title}
                                                        <span className="ml-2 inline-block text-[9px] px-1.5 py-0.5 rounded bg-blue-200 dark:bg-blue-500/20 text-blue-700 dark:text-blue-200 font-bold uppercase tracking-wider">
                                                            GAME
                                                        </span>
                                                    </h4>
                                                    <p className="text-[11px] text-gray-600 dark:text-white/60 line-clamp-2 leading-relaxed">
                                                        {item.description || "Interactive coding challenge"}
                                                    </p>
                                                </div>
                                                <svg className="w-4 h-4 text-blue-400 dark:text-blue-500 shrink-0 mt-0.5 group-hover/game:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
