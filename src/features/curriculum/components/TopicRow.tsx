"use client";

import { memo } from 'react';
import { RichItem } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const TopicRow = memo(function TopicRow({
    item,
    phaseTitle,
    isChecked,
    onClick,
}: {
    item: RichItem;
    phaseTitle: string;
    isChecked: boolean;
    onClick: (topic: string, desc: string, initialTab?: 'ai' | 'resources' | 'dojo' | 'quiz') => void;
}) {
    return (
        <motion.div
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "group py-4 px-5 rounded-2xl transition-all duration-300 cursor-pointer flex items-center gap-4 relative overflow-hidden",
                isChecked
                    ? "bg-surface-base/50 border-surface-border opacity-60"
                    : "glass-card hover:border-brand/40 shadow-sm hover:shadow-xl hover:shadow-brand/5"
            )}
            onClick={() => {
                onClick(
                    item.title,
                    item.description || `Learn about ${item.title} in ${phaseTitle}`
                );
            }}
        >
            <div className={cn(
                "w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all duration-300",
                isChecked
                    ? "bg-brand border-brand shadow-lg shadow-brand/20"
                    : "bg-transparent border-surface-border group-hover:border-brand/40"
            )}>
                {isChecked && (
                    <motion.svg 
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="text-white"
                    >
                        <path d="M20 6L9 17L4 12" />
                    </motion.svg>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className={cn(
                    "text-sm font-bold tracking-tight transition-all duration-300",
                    isChecked
                        ? "text-fg-muted line-through"
                        : "text-fg-primary group-hover:text-brand"
                )}>
                    {item.title}
                </div>
            </div>

            {!isChecked && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand animate-ping" />
                </div>
            )}
        </motion.div>
    );
});
