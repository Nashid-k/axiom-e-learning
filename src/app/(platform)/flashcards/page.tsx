'use client';

import { useState, useEffect, useCallback } from 'react';
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
            <div className="pb-12">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-2 text-[var(--fg-primary)]">
                        Flashcards
                    </h1>
                    <p className="text-[var(--fg-secondary)]">
                        Spaced repetition for long-term mastery
                    </p>
                </header>

                <div className="flex justify-center gap-2 mb-8">
                    <button
                        onClick={() => setFilter('due')}
                        className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors min-h-[36px] ${filter === 'due'
                                ? 'bg-[var(--color-primary)] text-white'
                                : 'bg-[var(--surface-raised)] text-[var(--fg-secondary)] border border-[var(--surface-border)] hover:bg-[var(--surface-border)]'
                            }`}
                    >
                        Due ({flashcards.filter(c => c.isDue).length})
                    </button>
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors min-h-[36px] ${filter === 'all'
                                ? 'bg-[var(--color-primary)] text-white'
                                : 'bg-[var(--surface-raised)] text-[var(--fg-secondary)] border border-[var(--surface-border)] hover:bg-[var(--surface-border)]'
                            }`}
                    >
                        All ({flashcards.length})
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <LoadingSpinner size="lg" label="Loading deck..." />
                    </div>
                ) : (
                    <FlashcardView flashcards={filtered} onReview={handleReview} />
                )}
            </div>
        </RouteGuard>
    );
}
