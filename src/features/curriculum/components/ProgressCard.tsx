import { motion } from 'framer-motion';
import { springs } from '@/lib/motion/motion-config';

interface ProgressCardProps {
    progressPercentage: number;
    validCompletedCount: number;
    totalItems: number;
    showPop: boolean;
}

export function ProgressCard({ progressPercentage, validCompletedCount, totalItems, showPop }: ProgressCardProps) {
    return (
        <div className="p-5 w-full lg:w-[340px] shrink-0 bg-[var(--surface-raised)] backdrop-blur-md transform-gpu border border-[var(--border-default)] rounded-2xl transition-colors relative">
            {showPop && (
                <div className="absolute -top-2 right-6 text-green-500 font-black text-xl animate-counter-pop pointer-events-none z-50 select-none shadow-green-500/50 drop-shadow-lg">+1</div>
            )}
            <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-600 dark:text-white/70 text-sm transition-colors">Progress</span>
                <span className="text-blue-500 dark:text-blue-400 font-mono text-sm transition-colors">{progressPercentage}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden mb-2.5 transition-colors">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}% ` }}
                    transition={springs.gentle}
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
                />
            </div>
            <div className="text-[11px] text-gray-400 dark:text-white/45 text-center transition-colors">
                {validCompletedCount} / {totalItems} Techniques Mastered
            </div>
        </div>
    );
}
