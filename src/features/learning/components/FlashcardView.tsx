'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { springs } from '@/lib/motion/motion-config';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface Flashcard {
    id: string;
    title: string;
    category: string;
    description: string;
    studyGuide: string;
    isDue: boolean;
    reviewCount: number;
    nextReviewDate: string | null;
}

interface FlashcardViewProps {
    flashcards: Flashcard[];
    onReview: (topicId: string, result: 'again' | 'good' | 'easy') => Promise<void>;
}

export function FlashcardView({ flashcards, onReview }: FlashcardViewProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [direction, setDirection] = useState(0);
    const [isReviewing, setIsReviewing] = useState(false);

    const currentCard = flashcards[currentIndex];
    const remaining = flashcards.length - currentIndex;

    const handleReview = useCallback(async (result: 'again' | 'good' | 'easy') => {
        if (!currentCard || isReviewing) return;
        setIsReviewing(true);

        setDirection(result === 'again' ? -1 : 1);

        await onReview(currentCard.id, result);

        setTimeout(() => {
            setIsFlipped(false);
            setCurrentIndex(prev => prev + 1);
            setIsReviewing(false);
            setDirection(0);
        }, 200);
    }, [currentCard, isReviewing, onReview]);

    const handleDragEnd = useCallback((_: unknown, info: PanInfo) => {
        const threshold = 100;
        if (info.offset.x > threshold) {
            handleReview('good');
        } else if (info.offset.x < -threshold) {
            handleReview('again');
        }
    }, [handleReview]);

    if (flashcards.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="text-2xl font-bold text-[var(--fg-primary)] mb-3">All Caught Up!</h2>
                <p className="text-[var(--fg-secondary)] max-w-md">
                    No flashcards due for review. Keep studying topics to build your deck.
                </p>
            </div>
        );
    }

    if (currentIndex >= flashcards.length) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
                <div className="text-6xl mb-6">✅</div>
                <h2 className="text-2xl font-bold text-[var(--fg-primary)] mb-3">Session Complete!</h2>
                <p className="text-[var(--fg-secondary)] max-w-md mb-6">
                    You reviewed {flashcards.length} card{flashcards.length !== 1 ? 's' : ''}. Great work!
                </p>
                <button
                    onClick={() => { setCurrentIndex(0); setIsFlipped(false); }}
                    className="px-6 py-3 bg-[var(--color-500)] text-white font-semibold rounded-full hover:bg-[var(--color-600)] transition-colors cursor-pointer"
                >
                    Review Again
                </button>
            </div>
        );
    }

    const frontContent = (
        <div className="flex flex-col items-center justify-center h-full p-6 sm:p-8 text-center">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[var(--color-500)]/10 text-[var(--color-500)] border border-[var(--color-500)]/20 mb-4">
                {currentCard.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--fg-primary)] mb-4">{currentCard.title}</h2>
            {currentCard.description && (
                <p className="text-[var(--fg-secondary)] text-sm leading-relaxed max-w-sm">{currentCard.description}</p>
            )}
            <p className="mt-6 text-[var(--fg-muted)] text-xs">Tap to reveal answer</p>
        </div>
    );

    const backContent = (
        <div className="flex flex-col h-full p-4 sm:p-6 overflow-y-auto">
            <h3 className="text-sm font-bold text-[var(--fg-primary)] mb-3 shrink-0">{currentCard.title}</h3>
            <div className="flex-1 text-sm text-[var(--fg-secondary)] leading-relaxed whitespace-pre-wrap overflow-y-auto">
                {currentCard.studyGuide
                    ? currentCard.studyGuide.slice(0, 500) + (currentCard.studyGuide.length > 500 ? '...' : '')
                    : currentCard.description || 'No study guide available. Open this topic in the curriculum to generate one.'}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="mb-6 flex items-center gap-3">
                <div className="h-2 flex-1 min-w-[200px] sm:min-w-[300px] bg-[var(--surface-raised)] rounded-full overflow-hidden border border-[var(--border-default)]">
                    <motion.div
                        className="h-full bg-gradient-to-r from-[var(--color-500)] to-[var(--color-ana-blue-500)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex) / flashcards.length) * 100}%` }}
                        transition={springs.gentle}
                    />
                </div>
                <span className="text-xs font-mono text-[var(--fg-muted)] shrink-0">{remaining} left</span>
            </div>

            <div className="relative w-full max-w-md" style={{ perspective: 1000 }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: direction * 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -300 }}
                        transition={{ duration: 0.2 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.3}
                        onDragEnd={handleDragEnd}
                        onClick={() => setIsFlipped(!isFlipped)}
                        className="w-full aspect-[3/4] sm:aspect-[4/5] cursor-pointer select-none touch-pan-y"
                    >
                        <motion.div
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full relative"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div
                                className="absolute inset-0 rounded-2xl bg-[var(--surface-raised)] border border-[var(--border-default)] shadow-[var(--shadow-lg)] overflow-hidden"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                {frontContent}
                            </div>

                            <div
                                className="absolute inset-0 rounded-2xl bg-[var(--surface-raised)] border border-[var(--border-default)] shadow-[var(--shadow-lg)] overflow-hidden"
                                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                            >
                                {backContent}
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 mt-6">
                <button
                    onClick={() => handleReview('again')}
                    disabled={isReviewing}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors disabled:opacity-50 cursor-pointer min-h-[44px]"
                >
                    Again
                </button>
                <button
                    onClick={() => handleReview('good')}
                    disabled={isReviewing}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20 transition-colors disabled:opacity-50 cursor-pointer min-h-[44px]"
                >
                    {isReviewing ? <LoadingSpinner size="sm" /> : 'Good'}
                </button>
                <button
                    onClick={() => handleReview('easy')}
                    disabled={isReviewing}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500/20 transition-colors disabled:opacity-50 cursor-pointer min-h-[44px]"
                >
                    Easy
                </button>
            </div>

            <div className="mt-4 flex items-center gap-4 text-[10px] text-[var(--fg-muted)]">
                <span>← Swipe left: Again</span>
                <span>Swipe right: Good →</span>
            </div>
        </div>
    );
}
