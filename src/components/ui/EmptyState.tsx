'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    className?: string;
    action?: React.ReactNode;
}

export function EmptyState({
    title,
    description,
    icon,
    className,
    action
}: EmptyStateProps) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center p-[var(--space-8)] text-center",
            className
        )}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative mb-[var(--space-4)]"
            >
                {/* Abstract animated background */}
                <div className="absolute inset-0 bg-[var(--color-500)]/10 blur-2xl rounded-full scale-150 animate-pulse" />

                <div className="relative w-20 h-20 rounded-[28px] bg-[var(--surface-raised)] border border-[var(--border-default)] flex items-center justify-center shadow-[var(--shadow-md)]">
                    {icon || (
                        <div className="relative w-10 h-10">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="absolute inset-0 border-2 border-[var(--color-400)] rounded-lg"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 90, 0],
                                        opacity: [0.2, 0.5, 0.2]
                                    }}
                                    transition={{
                                        duration: 4,
                                        delay: i * 0.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                            <div className="absolute inset-0 flex items-center justify-center text-2xl">
                                🔍
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>

            <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[var(--text-heading)] font-black text-[var(--fg-primary)] mb-[var(--space-1)]"
            >
                {title}
            </motion.h3>

            {description && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[var(--text-body)] text-[var(--fg-muted)] max-w-sm"
                >
                    {description}
                </motion.p>
            )}

            {action && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-[var(--space-4)]"
                >
                    {action}
                </motion.div>
            )}
        </div>
    );
}
