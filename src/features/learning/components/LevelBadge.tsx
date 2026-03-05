'use client';

import { useProgress } from '@/features/learning/hooks/useProgress';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/styles';

export const LevelBadge = ({ className }: { className?: string }) => {
    const { level, xp, progressToNextLevel } = useProgress('', 0);

    return (
        <div className={cn("flex items-center gap-[var(--space-1)]", className)}>
            <div className="relative group cursor-help">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={[
                        "flex items-center gap-[var(--space-1)]",
                        "px-[var(--space-1)] py-[4px]",
                        "bg-[var(--color-100)] dark:bg-[var(--color-900)]/30",
                        "border border-[var(--color-200)] dark:border-[var(--color-700)]/50",
                        "rounded-[var(--radius-full)]",
                        "transition-colors duration-[var(--duration-base)]",
                    ].join(' ')}
                >
                    <span className="text-[10px] font-black uppercase tracking-wider text-[var(--color-600)] dark:text-[var(--color-400)]">LVL</span>
                    <span className="text-[var(--text-caption)] font-bold text-[var(--color-700)] dark:text-[var(--color-300)]">{level}</span>
                </motion.div>

                <div className={[
                    "absolute top-full left-1/2 -translate-x-1/2 mt-[var(--space-1)] w-48",
                    "p-[var(--space-1)]",
                    "bg-[var(--surface-raised)]",
                    "rounded-[var(--radius-lg)]",
                    "shadow-[var(--shadow-xl)]",
                    "border border-[var(--border-default)]",
                    "opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-fast)]",
                    "pointer-events-none z-50",
                ].join(' ')}>
                    <div className="flex flex-col gap-[var(--space-1)]">
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] font-bold text-[var(--fg-muted)] uppercase tracking-tighter">Current XP</span>
                            <span className="text-[var(--text-caption)] font-bold text-[var(--color-500)]">{xp}</span>
                        </div>
                        <div className="h-[6px] w-full bg-[var(--surface-overlay)] rounded-[var(--radius-full)] overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressToNextLevel}%` }}
                                className="h-full bg-[var(--color-500)] rounded-[var(--radius-full)]"
                            />
                        </div>
                        <p className="text-[9px] text-[var(--fg-muted)] text-center">
                            {1000 - (xp % 1000)} XP to Next Level
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};