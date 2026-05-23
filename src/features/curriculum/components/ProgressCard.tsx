"use client";

interface ProgressCardProps {
    progressPercentage: number;
    validCompletedCount: number;
    totalItems: number;
}

export function ProgressCard({ progressPercentage, validCompletedCount, totalItems }: ProgressCardProps) {
    return (
        <div className="p-8 w-full lg:w-[360px] shrink-0 glass-panel rounded-2xl relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-white/10 hover:border-[var(--color-primary)]/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[var(--color-primary)]/5 blur-3xl rounded-full" />
            
            <div className="flex justify-between items-end mb-6 relative z-10">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-cyan)] block mb-1">
                        NEURAL SYNC
                    </span>
                    <span className="text-4xl font-extrabold tracking-tight text-gradient-primary">
                        {progressPercentage}%
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--fg-secondary)] block mb-1">
                        OBJECTIVES
                    </span>
                    <span className="text-sm font-bold text-white">
                        {validCompletedCount} <span className="text-[var(--fg-secondary)]">/ {totalItems}</span>
                    </span>
                </div>
            </div>

            <div className="h-2.5 bg-black/40 rounded-full overflow-hidden mb-5 relative z-10 p-[1px]">
                <div
                    style={{ width: `${progressPercentage}%` }}
                    className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)] rounded-full transition-[width] duration-700 ease-out shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                />
            </div>
            
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--fg-secondary)] text-center opacity-70 animate-pulse relative z-10">
                STATUS: {progressPercentage === 100 ? 'FULLY MASTERED' : 'SYNCHRONIZING KNOWLEDGE PATH'}
            </p>
        </div>
    );
}

