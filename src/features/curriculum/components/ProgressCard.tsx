interface ProgressCardProps {
    progressPercentage: number;
    validCompletedCount: number;
    totalItems: number;
}

export function ProgressCard({ progressPercentage, validCompletedCount, totalItems }: ProgressCardProps) {
    return (
        <div className="p-6 w-full lg:w-[320px] shrink-0 border border-neutral-200 dark:border-neutral-800 rounded-md bg-white dark:bg-black">
            <div className="flex justify-between items-baseline mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Total Progress</span>
                <span className="text-2xl font-bold">{progressPercentage}%</span>
            </div>
            <div className="h-2 bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden mb-4">
                <div
                    style={{ width: `${progressPercentage}%` }}
                    className="h-full bg-brand-500 transition-none"
                />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 text-center">
                {validCompletedCount} / {totalItems} Mastered
            </div>
        </div>
    );
}
