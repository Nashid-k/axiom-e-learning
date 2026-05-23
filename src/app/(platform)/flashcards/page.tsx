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

    const loadFlashcards = useCallback(() => {
        setLoading(true);
        fetch('/api/flashcards')
            .then(res => res.json())
            .then(data => {
                if (data.flashcards) setFlashcards(data.flashcards);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    useEffect(() => {
        loadFlashcards();
    }, [loadFlashcards]);

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
            <div className="pb-12 text-white">
                <header className="text-center mb-12 animate-spring-up" style={{ animationDelay: '0ms' }}>
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-cyan)] mb-3">SYNAPTIC REPETITION</div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3 text-gradient-primary">
                        Flashcards
                    </h1>
                    <p className="text-sm font-semibold text-[var(--fg-secondary)] max-w-md mx-auto">
                        High-fidelity spaced repetition cycles engineered for long-term cognitive engineering mastery.
                    </p>
                </header>

                <div className="flex justify-center mb-10 animate-spring-up" style={{ animationDelay: '80ms' }}>
                    <div className="inline-flex items-center p-1 bg-white/[0.02] border border-white/5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                        <button
                            onClick={() => setFilter('due')}
                            className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-400 ease-out active:scale-95 cursor-pointer min-h-[38px] ${filter === 'due'
                                    ? 'bg-white text-black font-extrabold shadow-[0_2px_8px_rgba(255,255,255,0.2)]'
                                    : 'text-[var(--fg-secondary)] hover:text-white'
                                }`}
                        >
                            Due Nodes ({flashcards.filter(c => c.isDue).length})
                        </button>
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-400 ease-out active:scale-95 cursor-pointer min-h-[38px] ${filter === 'all'
                                    ? 'bg-white text-black font-extrabold shadow-[0_2px_8px_rgba(255,255,255,0.2)]'
                                    : 'text-[var(--fg-secondary)] hover:text-white'
                                }`}
                        >
                            All Nodes ({flashcards.length})
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <LoadingSpinner size="lg" label="Loading deck..." />
                    </div>
                ) : (
                    <FlashcardView flashcards={filtered} onReview={handleReview} onRestart={loadFlashcards} />
                )}
            </div>
        </RouteGuard>
    );
}
