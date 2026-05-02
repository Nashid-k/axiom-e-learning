'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface QuizQuestion {
    q: string;
    options: string[];
    correct: number;
    explanation: string;
}

interface QuizViewProps {
    topic: string;
    category: string;
    persona?: 'general' | 'buddy';
    onComplete?: (score: number, total: number, isPassed: boolean) => void;
}

type QuizState = 'idle' | 'loading' | 'active' | 'results';

export function QuizView({ topic, category, persona = 'general', onComplete }: QuizViewProps) {
    const [state, setState] = useState<QuizState>('idle');
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchQuiz = async () => {
        setState('loading');
        setError(null);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setScore(0);

        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const response = await fetch('/api/ai/modal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({ topic, category, mode: 'quiz', persona })
            });

            if (!response.ok) throw new Error('Failed to generate quiz');
            
            const reader = response.body?.getReader();
            if (!reader) throw new Error('No response body');

            let fullText = '';
            const decoder = new TextDecoder();
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                fullText += decoder.decode(value, { stream: true });
            }

            let jsonStr = fullText.trim();
            const jsonMatch = jsonStr.match(/\[\s*\{[\s\S]*\}\s*\]/);
            if (jsonMatch) jsonStr = jsonMatch[0];
            else jsonStr = jsonStr.replace(/```json?\n?/g, '').replace(/```/g, '').trim();

            const parsed = JSON.parse(jsonStr) as QuizQuestion[];
            setQuestions(parsed);
            setState('active');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load quiz');
            setState('idle');
        }
    };

    const handleConfirm = () => {
        if (selectedAnswer === null) return;
        if (selectedAnswer === questions[currentIndex].correct) setScore(s => s + 1);
        setShowExplanation(true);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(i => i + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            setState('results');
            const isPassed = score >= Math.ceil(questions.length * 0.67);
            onComplete?.(score, questions.length, isPassed);
        }
    };

    if (state === 'idle') {
        return (
            <div className="py-12 text-center">
                <div className="text-5xl mb-6">🧠</div>
                <h3 className="text-2xl font-bold mb-2">Quiz: {topic}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-sm mx-auto">
                    Three adaptive questions to verify your mastery of this concept.
                </p>
                {error && <p className="text-red-500 text-xs font-bold uppercase mb-4">{error}</p>}
                <Button onClick={fetchQuiz} size="lg">Start Assessment</Button>
            </div>
        );
    }

    if (state === 'loading') {
        return <div className="py-24 text-center"><LoadingSpinner size="lg" label="Generating Quiz..." /></div>;
    }

    if (state === 'results') {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="py-12 text-center">
                <div className="text-5xl mb-6">{percentage >= 67 ? '✅' : '📚'}</div>
                <h3 className="text-3xl font-bold mb-2">{percentage >= 67 ? 'Mastery Confirmed' : 'Keep Studying'}</h3>
                <div className="text-6xl font-black text-brand-500 my-6">{score}/{questions.length}</div>
                <p className="text-neutral-500 dark:text-neutral-400 mb-8">
                    {percentage >= 67 ? 'You have successfully mastered this topic.' : 'Review the concepts and try again.'}
                </p>
                <Button variant="outline" onClick={() => setState('idle')}>Retake Quiz</Button>
            </div>
        );
    }

    const current = questions[currentIndex];

    return (
        <div className="max-w-2xl mx-auto py-4">
            <div className="flex justify-between items-center mb-10">
                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Question {currentIndex + 1} of {questions.length}</div>
                <div className="h-1 flex-1 mx-4 bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 transition-none" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
                </div>
            </div>

            <h3 className="text-xl font-bold mb-8 leading-tight">{current.q}</h3>

            <div className="space-y-3 mb-10">
                {current.options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === current.correct;
                    return (
                        <button
                            key={idx}
                            disabled={showExplanation}
                            onClick={() => setSelectedAnswer(idx)}
                            className={cn(
                                "w-full p-4 text-left border rounded-md transition-none flex items-center justify-between group",
                                !showExplanation && isSelected ? "border-black dark:border-white bg-neutral-50 dark:bg-neutral-900" : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-400",
                                showExplanation && isCorrect ? "border-green-500 bg-green-50 dark:bg-green-900/10" : "",
                                showExplanation && isSelected && !isCorrect ? "border-red-500 bg-red-50 dark:bg-red-900/10" : ""
                            )}
                        >
                            <span className={cn("font-medium", (showExplanation && isCorrect) ? "text-green-600 dark:text-green-400" : (showExplanation && isSelected && !isCorrect) ? "text-red-600 dark:text-red-400" : "")}>
                                {option}
                            </span>
                            {showExplanation && isCorrect && <span className="text-green-500 font-bold">✓</span>}
                            {showExplanation && isSelected && !isCorrect && <span className="text-red-500 font-bold">✗</span>}
                        </button>
                    );
                })}
            </div>

            {showExplanation && (
                <div className="mb-10 p-5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Explanation</div>
                    <p className="text-sm leading-relaxed">{current.explanation}</p>
                </div>
            )}

            <Button
                className="w-full h-12 text-sm font-bold uppercase tracking-widest"
                disabled={selectedAnswer === null}
                onClick={showExplanation ? handleNext : handleConfirm}
            >
                {showExplanation ? (currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz') : 'Confirm Answer'}
            </Button>
        </div>
    );
}
