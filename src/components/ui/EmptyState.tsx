"use client";

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
            "flex flex-col items-center justify-center p-16 text-center bg-[var(--surface-raised)] border border-[var(--surface-border)] rounded-md relative overflow-hidden",
            className
        )}>
            <div className="absolute inset-0 bg-brand/5 -z-10" />
            
            <div className="w-24 h-24 rounded-3xl bg-brand-soft/30 border border-brand/20 flex items-center justify-center mb-10 text-4xl shadow-xl shadow-brand/10">
                {icon || "🔍"}
            </div>

            <h3 className="text-3xl font-black tracking-tighter mb-4 text-[var(--fg-primary)]">
                {title}
            </h3>

            {description && (
                <p className="text-lg text-[var(--fg-secondary)] max-w-sm mb-12 font-medium leading-relaxed opacity-80">
                    {description}
                </p>
            )}

            {action && (
                <div>
                    {action}
                </div>
            )}
        </div>
    );
}
