'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { springs } from '@/lib/motion/motion-config';
import { FlashcardView } from '@/features/learning/components/FlashcardView';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import RouteGuard from '@/features/auth/components/RouteGuard';

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

export default function FlashcardsPage() {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'due' | 'all'>('due');

    useEffect(() => {
        fetch('/api/flashcards')
            .then(res => res.json())
            .then(data => {
                if (data.flashcards) setFlashcards(data.flashcards);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleReview = useCallback(async (topicId: string, result: 'again' | 'good' | 'easy') => {
        await fetch('/api/flashcards', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topicId, result }),
        });
    }, []);

    const filtered = filter === 'due'
        ? flashcards.filter(c => c.isDue)
        : flashcards;

    return (
        <RouteGuard>
            <div className="min-h-screen bg-[var(--surface-base)] text-[var(--fg-primary)] pt-24 sm:pt-28 pb-12">
                <div className="max-w-2xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={springs.responsive}
                        className="text-center mb-8"
                    >
                        <h1 className="text-[var(--text-heading)] sm:text-[var(--text-display)] font-black tracking-[var(--tracking-tight)] mb-2">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-500)] to-[var(--color-ana-blue-500)]">
                                Flashcards
                            </span>
                        </h1>
                        <p className="text-[var(--fg-secondary)] text-sm">
                            Spaced repetition for long-term mastery
                        </p>
                    </motion.div>

                    <div className="flex justify-center gap-2 mb-6">
                        <button
                            onClick={() => setFilter('due')}
                            className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer min-h-[36px] ${filter === 'due'
                                    ? 'bg-[var(--color-500)] text-white'
                                    : 'bg-[var(--surface-raised)] text-[var(--fg-secondary)] border border-[var(--border-default)]'
                                }`}
                        >
                            Due Now ({flashcards.filter(c => c.isDue).length})
                        </button>
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer min-h-[36px] ${filter === 'all'
                                    ? 'bg-[var(--color-500)] text-white'
                                    : 'bg-[var(--surface-raised)] text-[var(--fg-secondary)] border border-[var(--border-default)]'
                                }`}
                        >
                            All ({flashcards.length})
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center min-h-[50vh]">
                            <LoadingSpinner size="lg" />
                            <p className="text-[var(--fg-muted)] mt-4 animate-pulse">Loading your deck...</p>
                        </div>
                    ) : (
                        <FlashcardView flashcards={filtered} onReview={handleReview} />
                    )}
                </div>
            </div>
        </RouteGuard>
    );
}
