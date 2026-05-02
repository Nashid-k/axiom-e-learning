'use client';

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
            "flex flex-col items-center justify-center p-12 text-center border border-neutral-200 dark:border-neutral-800 rounded-md bg-white dark:bg-black",
            className
        )}>
            <div className="w-16 h-16 rounded-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center mb-6 text-2xl">
                {icon || "🔍"}
            </div>

            <h3 className="text-xl font-bold mb-2">
                {title}
            </h3>

            {description && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mb-8 leading-relaxed">
                    {description}
                </p>
            )}

            {action && (
                <div className="mt-2">
                    {action}
                </div>
            )}
        </div>
    );
}
