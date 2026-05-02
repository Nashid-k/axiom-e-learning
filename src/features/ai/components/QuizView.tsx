import React, { useState, useMemo } from 'react';
import { Quiz } from '@/features/ai/assistant/types';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cn } from '@/lib/utils';

interface QuizViewProps {
    topic: string;
    category: string;
    persona: 'general' | 'buddy';
    onComplete: (score: number, total: number, passed: boolean) => void;
}

export function QuizView({ topic, category, persona, onComplete }: QuizViewProps) {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [submitted, setSubmitted] = useState(false);

    const fetchQuiz = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/ai/quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, category, persona }),
            });
            if (res.ok) setQuiz(await res.json());
        } catch { } finally { setLoading(false); }
    };

    const score = useMemo(() => {
        if (!quiz) return 0;
        return quiz.questions.reduce((acc, q, idx) => {
            return acc + (answers[idx] === q.correctAnswer ? 1 : 0);
        }, 0);
    }, [quiz, answers]);

    const passed = useMemo(() => {
        if (!quiz) return false;
        return score >= Math.ceil(quiz.questions.length * 0.7);
    }, [quiz, score]);

    const handleSubmit = () => {
        setSubmitted(true);
        if (quiz) onComplete(score, quiz.questions.length, passed);
    };

    if (loading) return <div className="py-20 flex justify-center"><LoadingSpinner size="lg" label="Generating Neural Challenge" /></div>;

    if (!quiz) return (
        <div className="py-20 text-center">
            <h3 className="text-xl font-bold mb-6">Ready to verify your knowledge?</h3>
            <Button onClick={fetchQuiz}>Generate Quiz</Button>
        </div>
    );

    return (
        <div className="space-y-12">
            {quiz.questions.map((q, idx) => (
                <div key={idx} className="space-y-6">
                    <p className="text-lg font-bold leading-tight">{idx + 1}. {q.question}</p>
                    <div className="grid grid-cols-1 gap-3">
                        {q.options.map((opt, oIdx) => {
                            const isSelected = answers[idx] === oIdx;
                            const isCorrect = submitted && oIdx === q.correctAnswer;
                            const isWrong = submitted && isSelected && oIdx !== q.correctAnswer;

                            return (
                                <button
                                    key={oIdx}
                                    disabled={submitted}
                                    onClick={() => setAnswers(prev => ({ ...prev, [idx]: oIdx }))}
                                    className={cn(
                                        "p-4 text-left rounded-md border-2 transition-all font-medium",
                                        isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5" : "border-surface-border hover:border-[var(--color-primary)]/40",
                                        isCorrect && "border-success bg-success/5 text-success",
                                        isWrong && "border-accent bg-accent/5 text-accent"
                                    )}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}

            {!submitted ? (
                <div className="pt-8 border-t border-surface-border flex justify-center">
                    <Button onClick={handleSubmit} disabled={Object.keys(answers).length < quiz.questions.length}>
                        Submit Neural Sync
                    </Button>
                </div>
            ) : (
                <div className={cn(
                    "p-8 rounded-md text-center border-2",
                    passed ? "border-success bg-success/5" : "border-accent bg-accent/5"
                )}>
                    <h3 className="text-2xl font-black mb-2">{passed ? 'Mastery Verified' : 'Synchronization Failed'}</h3>
                    <p className="font-bold opacity-80 mb-6">You scored {score} out of {quiz.questions.length}</p>
                    <Button onClick={() => { setQuiz(null); setAnswers({}); setSubmitted(false); }}>
                        Try New Challenge
                    </Button>
                </div>
            )}
        </div>
    );
}
