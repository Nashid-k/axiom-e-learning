'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

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
}

export function FlashcardView({ flashcards, onReview }: FlashcardViewProps) {
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
            <div className="py-24 text-center">
                <div className="text-4xl mb-6">🎉</div>
                <h2 className="text-xl font-bold mb-2 text-[var(--fg-primary)]">Deck Cleared</h2>
                <p className="text-[var(--fg-secondary)] text-sm">No flashcards due for review. Keep studying!</p>
            </div>
        );
    }

    if (currentIndex >= flashcards.length) {
        return (
            <div className="py-24 text-center">
                <div className="text-4xl mb-6">✅</div>
                <h2 className="text-xl font-bold mb-2 text-[var(--fg-primary)]">Session Complete</h2>
                <p className="text-[var(--fg-secondary)] text-sm mb-8">You reviewed {flashcards.length} cards.</p>
                <Button variant="outline" onClick={() => setCurrentIndex(0)}>Start Over</Button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)]">Progress</div>
                <div className="flex-1 mx-4 h-1 bg-[var(--surface-border)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-primary)] transition-all duration-300" style={{ width: `${(currentIndex / flashcards.length) * 100}%` }} />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)]">{remaining} Left</div>
            </div>

            <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full aspect-[4/5] bg-[var(--surface-raised)] border border-[var(--surface-border)] rounded-md p-8 text-left transition-colors flex flex-col justify-between hover:border-[var(--color-primary)]"
            >
                {!isFlipped ? (
                    <>
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] mb-4">{currentCard.category}</div>
                            <h2 className="text-2xl font-bold tracking-tight leading-tight text-[var(--fg-primary)]">{currentCard.title}</h2>
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)] text-center w-full">Tap to flip</div>
                    </>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)] mb-4">Explanation</h3>
                            <p className="text-sm leading-relaxed text-[var(--fg-secondary)] whitespace-pre-wrap">
                                {currentCard.studyGuide || currentCard.description}
                            </p>
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)] text-center w-full pt-4">Tap to go back</div>
                    </>
                )}
            </button>

            <div className="mt-8 grid grid-cols-3 gap-3">
                <button
                    disabled={!isFlipped || isReviewing}
                    onClick={() => handleReview('again')}
                    className="h-10 rounded-md border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase tracking-widest disabled:opacity-30 transition-colors hover:bg-red-100 dark:hover:bg-red-900/20"
                >
                    Again
                </button>
                <button
                    disabled={!isFlipped || isReviewing}
                    onClick={() => handleReview('good')}
                    className="h-10 rounded-md border border-[var(--surface-border)] bg-[var(--surface-raised)] text-[var(--fg-primary)] text-[10px] font-bold uppercase tracking-widest disabled:opacity-30 transition-colors hover:bg-[var(--surface-border)]"
                >
                    {isReviewing ? <LoadingSpinner size="sm" /> : 'Good'}
                </button>
                <button
                    disabled={!isFlipped || isReviewing}
                    onClick={() => handleReview('easy')}
                    className="h-10 rounded-md border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-widest disabled:opacity-30 transition-colors hover:bg-[var(--color-primary)]/10"
                >
                    Easy
                </button>
            </div>
        </div>
    );
}
