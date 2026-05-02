"use client";

import { memo } from 'react';
import { RichItem } from '@/types';
import { cn } from '@/lib/utils';

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
        <div
            className={cn(
                "group py-4 px-5 rounded-md transition-all duration-300 cursor-pointer flex items-center gap-4 relative overflow-hidden",
                isChecked
                    ? "bg-surface-base/50 border-surface-border opacity-60"
                    : "bg-[var(--surface-raised)] border border-[var(--surface-border)] rounded-md hover:border-[var(--color-primary)]"
            )}
            onClick={() => {
                onClick(
                    item.title,
                    item.description || `Learn about ${item.title} in ${phaseTitle}`
                );
            }}
        >
            <div className={cn(
                "w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-300",
                isChecked
                    ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
                    : "bg-transparent border-surface-border group-hover:border-[var(--color-primary)]"
            )}>
                {isChecked && (
                    <svg 
                        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="text-white"
                    >
                        <path d="M20 6L9 17L4 12" />
                    </svg>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className={cn(
                    "text-sm font-bold tracking-tight transition-all duration-300",
                    isChecked
                        ? "text-[var(--fg-muted)] line-through"
                        : "text-[var(--fg-primary)] group-hover:text-[var(--color-primary)]"
                )}>
                    {item.title}
                </div>
            </div>

            {!isChecked && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-ping" />
                </div>
            )}
        </div>
    );
});
