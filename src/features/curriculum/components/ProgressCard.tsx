"use client";

import { motion } from "framer-motion";

interface ProgressCardProps {
    progressPercentage: number;
    validCompletedCount: number;
    totalItems: number;
}

export function ProgressCard({ progressPercentage, validCompletedCount, totalItems }: ProgressCardProps) {
    return (
        <div className="p-8 w-full lg:w-[350px] shrink-0 glass-card rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl rounded-full" />
            
            <div className="flex justify-between items-end mb-6">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-fg-muted block mb-1">
                        NEURAL SYNC
                    </span>
                    <span className="text-4xl font-black tracking-tighter text-gradient">
                        {progressPercentage}%
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-fg-muted block mb-1">
                        OBJECTIVES
                    </span>
                    <span className="text-sm font-bold text-fg-primary">
                        {validCompletedCount} <span className="text-fg-muted">/ {totalItems}</span>
                    </span>
                </div>
            </div>

            <div className="h-3 bg-brand-soft/30 rounded-full overflow-hidden mb-4 relative">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="h-full bg-brand rounded-full shadow-[0_0_15px_var(--color-brand)]"
                />
            </div>
            
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-fg-muted text-center opacity-60">
                System Status: {progressPercentage === 100 ? 'Fully Mastered' : 'Optimizing Knowledge Path'}
            </p>
        </div>
    );
}
