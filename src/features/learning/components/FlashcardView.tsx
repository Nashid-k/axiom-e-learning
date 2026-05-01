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
                <div className="text-5xl mb-6">🎉</div>
                <h2 className="text-2xl font-bold mb-2">Deck Cleared</h2>
                <p className="text-neutral-500 dark:text-neutral-400">No flashcards due for review. Keep studying!</p>
            </div>
        );
    }

    if (currentIndex >= flashcards.length) {
        return (
            <div className="py-24 text-center">
                <div className="text-5xl mb-6">✅</div>
                <h2 className="text-2xl font-bold mb-2">Session Complete</h2>
                <p className="text-neutral-500 dark:text-neutral-400 mb-8">You reviewed {flashcards.length} cards.</p>
                <Button variant="outline" onClick={() => setCurrentIndex(0)}>Start Over</Button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto py-12 px-4">
            <div className="mb-8 flex items-center justify-between">
                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Progress</div>
                <div className="flex-1 mx-4 h-1 bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 transition-none" style={{ width: `${(currentIndex / flashcards.length) * 100}%` }} />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{remaining} Left</div>
            </div>

            <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full aspect-[4/5] bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-md p-8 text-left transition-none flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-600"
            >
                {!isFlipped ? (
                    <>
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-brand-500 mb-4">{currentCard.category}</div>
                            <h2 className="text-2xl font-bold leading-tight">{currentCard.title}</h2>
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-center w-full">Tap to flip</div>
                    </>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">Explanation</h3>
                            <p className="text-sm leading-relaxed text-black dark:text-neutral-200 whitespace-pre-wrap">
                                {currentCard.studyGuide || currentCard.description}
                            </p>
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-center w-full pt-4">Tap to go back</div>
                    </>
                )}
            </button>

            <div className="mt-8 grid grid-cols-3 gap-3">
                <button
                    disabled={!isFlipped || isReviewing}
                    onClick={() => handleReview('again')}
                    className="h-12 rounded-md border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase tracking-widest disabled:opacity-30 transition-none"
                >
                    Again
                </button>
                <button
                    disabled={!isFlipped || isReviewing}
                    onClick={() => handleReview('good')}
                    className="h-12 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-black dark:text-white text-[10px] font-bold uppercase tracking-widest disabled:opacity-30 transition-none"
                >
                    {isReviewing ? <LoadingSpinner size="sm" /> : 'Good'}
                </button>
                <button
                    disabled={!isFlipped || isReviewing}
                    onClick={() => handleReview('easy')}
                    className="h-12 rounded-md border border-brand-200 dark:border-brand-900/30 bg-brand-50 dark:bg-brand-900/10 text-brand-600 dark:text-brand-400 text-[10px] font-bold uppercase tracking-widest disabled:opacity-30 transition-none"
                >
                    Easy
                </button>
            </div>
        </div>
    );
}
