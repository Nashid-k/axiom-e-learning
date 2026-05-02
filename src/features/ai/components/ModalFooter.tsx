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
        <div className="shrink-0 p-4 border-t border-[var(--surface-border)] bg-[var(--surface-base)] flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
            <div className="flex items-center gap-2">
                <button
                    onClick={togglePersona}
                    className={cn(
                        "w-10 h-10 rounded-md border flex items-center justify-center transition-none",
                        persona === 'general' 
                            ? "bg-[var(--surface-base)] border-[var(--surface-border)]" 
                            : "bg-[var(--color-primary)] border-[var(--color-primary)] text-white"
                    )}
                >
                    {persona === 'general' ? '🎭' : '✨'}
                </button>
                <button
                    onClick={handleVoiceToggle}
                    className={cn(
                        "w-10 h-10 rounded-md border flex items-center justify-center transition-none",
                        isSpeaking 
                            ? "bg-[var(--color-destruct)] border-[var(--color-destruct)] text-white animate-pulse" 
                            : "bg-[var(--surface-base)] border-[var(--surface-border)]"
                    )}
                >
                    {isSpeaking ? '🔇' : '🔊'}
                </button>
                <div className="flex gap-1 ml-2">
                    <button
                        onClick={() => navigateTopic('prev')}
                        disabled={currentIndex === 0}
                        className="w-10 h-10 rounded-md border border-[var(--surface-border)] flex items-center justify-center disabled:opacity-20"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                        onClick={() => navigateTopic('next')}
                        disabled={currentIndex === totalTopics - 1}
                        className="w-10 h-10 rounded-md border border-[var(--surface-border)] flex items-center justify-center disabled:opacity-20"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
                <button
                    onClick={onAskMaya}
                    className="flex-1 sm:px-6 py-2.5 rounded-md border border-[var(--surface-border)] font-bold text-xs uppercase tracking-widest hover:bg-[var(--surface-raised)] transition-none text-[var(--fg-primary)]"
                >
                    Chat
                </button>
                <button
                    onClick={onToggleComplete}
                    disabled={!canComplete}
                    className={cn(
                        "flex-[1.5] sm:px-10 py-2.5 rounded-md font-bold text-xs uppercase tracking-widest border transition-none relative overflow-hidden",
                        isComplete
                            ? "bg-[var(--color-success)] border-[var(--color-success)] text-white"
                            : canComplete
                                ? "bg-[var(--fg-primary)] text-[var(--surface-base)] border-[var(--fg-primary)]"
                                : "bg-[var(--surface-raised)] border-[var(--surface-border)] text-[var(--fg-muted)]"
                    )}
                >
                    {!isComplete && !canComplete && (
                        <div
                            className="absolute left-0 bottom-0 h-1 bg-[var(--color-primary)] transition-none"
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
