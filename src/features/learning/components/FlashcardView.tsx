'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cn } from '@/lib/utils';

interface Flashcard {
    id: string;
    title: string;
    category: string;
    description: string;
    studyGuide: string;
}

interface FlashcardViewProps {
    flashcards: Flashcard[];
    onReview: (topicId: string, result: 'again' | 'good' | 'easy') => Promise<void>;
    onRestart?: () => void;
}

export function FlashcardView({ flashcards, onReview, onRestart }: FlashcardViewProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isReviewing, setIsReviewing] = useState(false);

    const currentCard = flashcards[currentIndex];
    const remaining = flashcards.length - currentIndex;

    const handleReview = useCallback(async (result: 'again' | 'good' | 'easy') => {
        if (!currentCard || isReviewing) return;
        setIsReviewing(true);
        await onReview(currentCard.id, result);
        setIsFlipped(false);
        setCurrentIndex(prev => prev + 1);
        setIsReviewing(false);
    }, [currentCard, isReviewing, onReview]);

    if (flashcards.length === 0) {
        return (
            <div className="py-24 text-center glass-panel max-w-md mx-auto rounded-2xl border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-[var(--color-success)]/10 blur-2xl rounded-full" />
                <div className="text-5xl mb-6 animate-bounce">🎉</div>
                <h2 className="text-2xl font-black mb-3 text-white tracking-wide">Deck Cleared</h2>
                <p className="text-[var(--fg-secondary)] text-sm max-w-xs mx-auto font-medium">No flashcards due for review. Outstanding work synchronization!</p>
            </div>
        );
    }

    if (currentIndex >= flashcards.length) {
        return (
            <div className="py-24 text-center glass-panel max-w-md mx-auto rounded-2xl border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-[var(--color-primary)]/10 blur-2xl rounded-full" />
                <div className="text-5xl mb-6">✅</div>
                <h2 className="text-2xl font-black mb-3 text-white tracking-wide font-display">Session Complete</h2>
                <p className="text-[var(--fg-secondary)] text-sm mb-8 font-medium">You completed reviewing {flashcards.length} cards.</p>
                <Button 
                    onClick={() => { setCurrentIndex(0); onRestart?.(); }}
                    className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)] shadow-[0_0_15px_rgba(99,102,241,0.35)]"
                >
                    Initiate New Cycle
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto">
            {/* Progress HUD */}
            <div className="mb-8 flex items-center justify-between">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--fg-secondary)]">MATRIX PROGRESS</div>
                <div className="flex-1 mx-4 h-1.5 bg-black/40 rounded-full overflow-hidden p-[1px]">
                    <div className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)] rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(99,102,241,0.5)]" style={{ width: `${(currentIndex / flashcards.length) * 100}%` }} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-cyan)]">{remaining} Nodes Left</div>
            </div>

            {/* 3D Flip Card Container */}
            <div 
                className="w-full aspect-[4/5] [perspective:1000px] cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div 
                    className={cn(
                        "relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]",
                        isFlipped && "[transform:rotateY(180deg)]"
                    )}
                >
                    {/* Front of Card */}
                    <div 
                        className="absolute inset-0 w-full h-full glass-panel border-white/10 bg-gradient-to-br from-[var(--surface-raised)] to-transparent rounded-2xl p-8 flex flex-col justify-between [backface-visibility:hidden] shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
                    >
                        <div className="absolute -top-12 -right-12 w-28 h-28 bg-[var(--color-primary)]/5 blur-2xl rounded-full" />
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-cyan)] mb-4">NODE ARCHIVE</div>
                            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white bg-white/5 border border-white/10 rounded-lg">{currentCard.category}</span>
                            <h2 className="text-3xl font-extrabold tracking-tight leading-tight text-white mt-6 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">{currentCard.title}</h2>
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--fg-secondary)] text-center w-full animate-pulse">TAP TO SYNAPSE</div>
                    </div>

                    {/* Back of Card */}
                    <div 
                        className="absolute inset-0 w-full h-full glass-panel border-white/10 bg-gradient-to-br from-[var(--surface-base)] to-black/30 rounded-2xl p-8 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
                    >
                        <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-[var(--color-accent)]/5 blur-2xl rounded-full" />
                        <div className="flex-1 overflow-y-auto pr-1.5 custom-scrollbar mb-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-cyan)] mb-4">SYNAPTIC DATA</h3>
                            <p className="text-sm leading-relaxed text-slate-300 font-medium whitespace-pre-wrap">
                                {currentCard.studyGuide || currentCard.description}
                            </p>
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--fg-secondary)] text-center w-full pt-4 border-t border-white/5">TAP TO CYCLE</div>
                    </div>
                </div>
            </div>

            {/* Micro-interactive Spaced Repetition HUD buttons */}
            <div className="mt-8 grid grid-cols-3 gap-3">
                <button
                    disabled={!isFlipped || isReviewing}
                    onClick={() => handleReview('again')}
                    className="h-11 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-[10px] font-black uppercase tracking-[0.2em] disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 cursor-pointer hover:bg-red-500/10 hover:border-red-500/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] active:scale-95"
                >
                    Again
                </button>
                <button
                    disabled={!isFlipped || isReviewing}
                    onClick={() => handleReview('good')}
                    className="h-11 rounded-xl border border-white/10 bg-white/5 text-white text-[10px] font-black uppercase tracking-[0.2em] disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 cursor-pointer hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.08)] active:scale-95 flex items-center justify-center"
                >
                    {isReviewing ? <LoadingSpinner size="sm" /> : 'Good'}
                </button>
                <button
                    disabled={!isFlipped || isReviewing}
                    onClick={() => handleReview('easy')}
                    className="h-11 rounded-xl border border-[var(--color-cyan)]/20 bg-[var(--color-cyan)]/5 text-[var(--color-cyan)] text-[10px] font-black uppercase tracking-[0.2em] disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 cursor-pointer hover:bg-[var(--color-cyan)]/10 hover:border-[var(--color-cyan)]/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] active:scale-95"
                >
                    Easy
                </button>
            </div>
        </div>
    );
}

