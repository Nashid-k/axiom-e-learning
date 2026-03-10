'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ModalFooterProps {
    persona: 'general' | 'buddy';
    togglePersona: () => void;
    isSpeaking: boolean;
    handleVoiceToggle: () => void;
    navigateTopic: (dir: 'prev' | 'next') => void;
    currentIndex: number;
    totalTopics: number;
    canComplete: boolean;
    isComplete: boolean;
    completionProgress: number;
    timeSpent: number;
    minTime: number;
    onToggleComplete: () => void;
    onAskMaya: () => void;
}

export function ModalFooter({
    persona,
    togglePersona,
    isSpeaking,
    handleVoiceToggle,
    navigateTopic,
    currentIndex,
    totalTopics,
    canComplete,
    isComplete,
    completionProgress,
    timeSpent,
    minTime,
    onToggleComplete,
    onAskMaya
}: ModalFooterProps) {
    return (
        <div className="shrink-0 p-4 md:p-5 bg-white/95 dark:bg-[#151515]/95 backdrop-blur-xl border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] transform-gpu translate-z-0 transition-all duration-300">
            <div className="flex items-center justify-between md:justify-start gap-4">
                <div className="flex items-center gap-2">
                    <motion.button
                        whileHover={{ scale: 1.05, rotate: 10 }}
                        whileTap={{ scale: 0.9, rotate: -10 }}
                        onClick={togglePersona}
                        className={cn(
                            "w-11 h-11 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-xl transition-all duration-300 border relative overflow-hidden",
                            persona === 'general'
                                ? "bg-white dark:bg-white/5 border-black/5 dark:border-white/10"
                                : "bg-emerald-400 border-emerald-400 text-white"
                        )}
                        title="Switch Persona"
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={persona}
                                initial={{ scale: 0, rotate: 180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: -180 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {persona === 'general' ? '🎭' : '✨'}
                            </motion.span>
                        </AnimatePresence>
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleVoiceToggle}
                        className={cn(
                            "w-11 h-11 md:w-12 md:h-12 rounded-xl md:rounded-2xl border flex items-center justify-center text-xl md:text-2xl shadow-xl transition-all duration-300",
                            isSpeaking
                                ? "bg-red-500 border-red-400 text-white animate-pulse"
                                : "bg-white dark:bg-white/5 border-black/5 dark:border-white/10 opacity-50 hover:opacity-100"
                        )}
                        title={isSpeaking ? "Stop Voice" : "Read Aloud"}
                    >
                        {isSpeaking ? "🔇" : "🔊"}
                    </motion.button>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigateTopic('prev')}
                        disabled={currentIndex === 0}
                        className="p-2 md:p-3 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border border-black/5 dark:border-white/5 text-gray-400 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/5 transition-all disabled:opacity-20 flex items-center justify-center shrink-0"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                        onClick={() => navigateTopic('next')}
                        disabled={currentIndex === totalTopics - 1}
                        className="p-2 md:p-3 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border border-black/5 dark:border-white/5 text-gray-400 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/5 transition-all disabled:opacity-20 flex items-center justify-center shrink-0"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            <div className="flex gap-2 md:gap-3 w-full md:w-auto">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onAskMaya}
                    className={cn(
                        "flex-1 px-4 md:px-6 py-3 md:py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2",
                        persona === 'general'
                            ? "bg-blue-600 text-white shadow-blue-500/30 hover:bg-blue-700"
                            : "bg-emerald-600 text-white shadow-emerald-500/30 hover:bg-emerald-700"
                    )}
                >
                    Ask Maya
                </motion.button>
                <motion.button
                    whileHover={canComplete ? { scale: 1.02 } : {}}
                    whileTap={canComplete ? { scale: 0.98 } : {}}
                    onClick={onToggleComplete}
                    disabled={!canComplete}
                    className={cn(
                        "flex-[1.5] flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg truncate relative overflow-hidden",
                        isComplete
                            ? "bg-emerald-500 text-white shadow-emerald-500/20"
                            : canComplete
                                ? "bg-black dark:bg-white text-white dark:text-black shadow-xl"
                                : "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600 cursor-not-allowed border border-black/5 dark:border-white/5"
                    )}
                >
                    {!isComplete && !canComplete && (
                        <div
                            className="absolute inset-0 bg-blue-500/20 transition-all duration-1000"
                            style={{ width: `${completionProgress}%` }}
                        />
                    )}
                    <span className="relative z-10">
                        {isComplete ? "Mastered ✓" : canComplete ? "Complete Topic" : `Study ${Math.max(0, minTime - timeSpent)}s...`}
                    </span>
                </motion.button>
            </div>
        </div>
    );
}
