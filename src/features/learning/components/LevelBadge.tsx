'use client';

import { useGlobalProgress } from '@/lib/providers/ProgressProvider';
import { cn } from '@/lib/utils';

export const LevelBadge = ({ className }: { className?: string }) => {
    const { level, xp } = useGlobalProgress();
    
    // Simple level progression logic: each level is 1000 XP
    const progressToNextLevel = (xp % 1000) / 10; 
    const xpToNext = 1000 - (xp % 1000);

    return (
        <div className={cn("relative group cursor-help", className)}>
            <div className="flex items-center gap-2 px-3 py-1 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md transition-none">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">LVL</span>
                <span className="text-sm font-bold text-black dark:text-white">{level}</span>
            </div>

            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-4 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-md shadow-none opacity-0 group-hover:opacity-100 transition-none pointer-events-none z-50">
                <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">XP Progress</span>
                        <span className="text-xs font-bold text-brand-500">{xp.toLocaleString()}</span>
                    </div>
                    
                    <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden">
                        <div
                            style={{ width: `${progressToNextLevel}%` }}
                            className="h-full bg-brand-500 transition-none"
                        />
                    </div>
                    
                    <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 text-center">
                        {xpToNext} XP to next level
                    </p>
                </div>
            </div>
        </div>
    );
};
