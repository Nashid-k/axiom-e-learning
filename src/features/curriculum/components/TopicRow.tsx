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
        <button
            type="button"
            className={cn(
                "w-full text-left group py-3 px-4.5 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-3.5 relative overflow-hidden border",
                isChecked
                    ? "bg-white/[0.01] border-white/5 opacity-55 hover:opacity-80"
                    : "bg-[var(--surface-raised)] border-white/5 hover:border-[var(--color-primary)]/30 hover:bg-white/[0.02] shadow-[0_2px_8px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] active:scale-[0.98]"
            )}
            onClick={() => {
                onClick(
                    item.title,
                    item.description || `Learn about ${item.title} in ${phaseTitle}`
                );
            }}
            aria-label={item.title}
            aria-pressed={isChecked}
        >
            {/* Soft inner hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className={cn(
                "w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-300 z-10",
                isChecked
                    ? "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-cyan)] border-transparent shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    : "bg-black/30 border-white/10 group-hover:border-[var(--color-cyan)]/60"
            )}>
                {isChecked && (
                    <svg 
                        width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5" className="text-white"
                    >
                        <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </div>

            <div className="flex-1 min-w-0 z-10">
                <div className={cn(
                    "text-sm font-semibold tracking-wide transition-all duration-300 truncate",
                    isChecked
                        ? "text-[var(--fg-secondary)] line-through"
                        : "text-white group-hover:text-[var(--color-cyan)]"
                )}>
                    {item.title}
                </div>
            </div>

            {/* Glowing radar ping indicator */}
            {!isChecked && (
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] group-hover:bg-[var(--color-cyan)] relative z-10 shrink-0 transition-colors duration-300">
                    <span className="absolute -inset-1 rounded-full bg-[var(--color-cyan)]/30 animate-ping opacity-0 group-hover:opacity-100" />
                </div>
            )}
        </button>
    );
});

