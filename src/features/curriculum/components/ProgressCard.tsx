"use client";

interface ProgressCardProps {
    progressPercentage: number;
    validCompletedCount: number;
    totalItems: number;
}

export function ProgressCard({ progressPercentage, validCompletedCount, totalItems }: ProgressCardProps) {
    return (
        <div className="p-8 w-full lg:w-[350px] shrink-0 bg-[var(--surface-raised)] border border-[var(--surface-border)] rounded-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/5 blur-3xl rounded-md" />
            
            <div className="flex justify-between items-end mb-6">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--fg-muted)] block mb-1">
                        NEURAL SYNC
                    </span>
                    <span className="text-4xl font-black tracking-tighter text-[var(--color-primary)]">
                        {progressPercentage}%
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--fg-muted)] block mb-1">
                        OBJECTIVES
                    </span>
                    <span className="text-sm font-bold text-[var(--fg-primary)]">
                        {validCompletedCount} <span className="text-[var(--fg-muted)]">/ {totalItems}</span>
                    </span>
                </div>
            </div>

            <div className="h-3 bg-[var(--surface-raised)]/30 rounded-md overflow-hidden mb-4 relative">
                <div
                    style={{ width: `${progressPercentage}%` }}
                    className="h-full bg-[var(--color-primary)] rounded-md transition-[width] duration-500 ease-out"
                />
            </div>
            
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--fg-muted)] text-center opacity-60">
                System Status: {progressPercentage === 100 ? 'Fully Mastered' : 'Optimizing Knowledge Path'}
            </p>
        </div>
    );
}
