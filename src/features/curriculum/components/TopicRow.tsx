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
                "py-3 px-4 rounded-md border transition-none cursor-pointer flex items-center gap-3",
                isChecked
                    ? "bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 opacity-60"
                    : "bg-white dark:bg-black border-neutral-100 dark:border-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700"
            )}
            onClick={() => {
                onClick(
                    item.title,
                    item.description || `Learn about ${item.title} in ${phaseTitle}`
                );
            }}
        >
            <div className={cn(
                "w-4 h-4 rounded-sm border flex items-center justify-center shrink-0",
                isChecked
                    ? "bg-black dark:bg-white border-black dark:border-white"
                    : "bg-transparent border-neutral-300 dark:border-neutral-700"
            )}>
                {isChecked && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="text-white dark:text-black">
                        <path d="M20 6L9 17L4 12" />
                    </svg>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className={cn(
                    "text-sm font-bold truncate",
                    isChecked
                        ? "text-neutral-500 dark:text-neutral-500 line-through"
                        : "text-black dark:text-white"
                )}>
                    {item.title}
                </div>
            </div>
        </div>
    );
});

export const VirtualizedTopic = ({ children }: { children: React.ReactNode }) => <>{children}</>;
