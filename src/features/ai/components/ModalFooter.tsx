'use client';

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
        <div className="shrink-0 p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
            <div className="flex items-center gap-2">
                <button
                    onClick={togglePersona}
                    className={cn(
                        "w-10 h-10 rounded-md border flex items-center justify-center transition-none",
                        persona === 'general' 
                            ? "bg-white dark:bg-black border-neutral-200 dark:border-neutral-800" 
                            : "bg-brand-500 border-brand-500 text-white"
                    )}
                >
                    {persona === 'general' ? '🎭' : '✨'}
                </button>
                <button
                    onClick={handleVoiceToggle}
                    className={cn(
                        "w-10 h-10 rounded-md border flex items-center justify-center transition-none",
                        isSpeaking 
                            ? "bg-red-500 border-red-500 text-white animate-pulse" 
                            : "bg-white dark:bg-black border-neutral-200 dark:border-neutral-800"
                    )}
                >
                    {isSpeaking ? '🔇' : '🔊'}
                </button>
                <div className="flex gap-1 ml-2">
                    <button
                        onClick={() => navigateTopic('prev')}
                        disabled={currentIndex === 0}
                        className="w-10 h-10 rounded-md border border-neutral-200 dark:border-neutral-800 flex items-center justify-center disabled:opacity-20"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                        onClick={() => navigateTopic('next')}
                        disabled={currentIndex === totalTopics - 1}
                        className="w-10 h-10 rounded-md border border-neutral-200 dark:border-neutral-800 flex items-center justify-center disabled:opacity-20"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
                <button
                    onClick={onAskMaya}
                    className="flex-1 sm:px-6 py-2.5 rounded-md border border-neutral-200 dark:border-neutral-800 font-bold text-xs uppercase tracking-widest hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-none"
                >
                    Chat
                </button>
                <button
                    onClick={onToggleComplete}
                    disabled={!canComplete}
                    className={cn(
                        "flex-[1.5] sm:px-10 py-2.5 rounded-md font-bold text-xs uppercase tracking-widest border transition-none relative overflow-hidden",
                        isComplete
                            ? "bg-green-500 border-green-500 text-white"
                            : canComplete
                                ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                                : "bg-neutral-50 dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 text-neutral-400"
                    )}
                >
                    {!isComplete && !canComplete && (
                        <div
                            className="absolute left-0 bottom-0 h-1 bg-brand-500 transition-none"
                            style={{ width: `${completionProgress}%` }}
                        />
                    )}
                    <span className="relative z-10">
                        {isComplete ? "Mastered" : canComplete ? "Complete" : `Study ${Math.max(0, minTime - timeSpent)}s`}
                    </span>
                </button>
            </div>
        </div>
    );
}
