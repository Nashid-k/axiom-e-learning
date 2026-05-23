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
    const [error, setError] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [submitted, setSubmitted] = useState(false);

    const fetchQuiz = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/ai/quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, category, persona }),
            });
            if (!res.ok) {
                throw new Error(`Server error ${res.status}`);
            }
            const data = await res.json();
            setQuiz(data);
        } catch {
            setError('Failed to generate quiz. Please try again.');
        } finally {
            setLoading(false);
        }
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

    if (error) return (
        <div className="py-20 text-center space-y-4">
            <p className="text-[var(--color-accent)] text-sm font-bold">{error}</p>
            <Button variant="outline" onClick={fetchQuiz}>Retry</Button>
        </div>
    );

    if (!quiz) return (
        <div className="py-20 text-center max-w-md mx-auto relative glass-panel rounded-2xl p-8 border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-[var(--color-primary)]/10 blur-2xl rounded-full" />
            <span className="text-4xl mb-4 block">🧠</span>
            <h3 className="text-xl font-bold mb-3 text-white tracking-wide">Ready for Neural Verification?</h3>
            <p className="text-sm text-[var(--fg-secondary)] mb-6 font-medium">Verify your understanding of this topic and complete the module by passing Maya&apos;s customized quiz.</p>
            <Button onClick={fetchQuiz} className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)] shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                Generate Challenge
            </Button>
        </div>
    );

    return (
        <div className="space-y-12">
            <div aria-live="polite" className="sr-only">
                {submitted && quiz
                    ? `Quiz complete. You scored ${score} out of ${quiz.questions.length}. ${passed ? 'Passed.' : 'Not passed.'}`
                    : ''}
            </div>

            {quiz.questions.map((q, idx) => (
                <div key={idx} className="space-y-5 p-6 rounded-2xl glass-panel border-white/5 bg-white/[0.01]">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-black text-[var(--color-cyan)] tracking-wider">QUESTION 0{idx + 1}</span>
                    </div>
                    <p className="text-lg font-bold leading-relaxed text-white">{q.question}</p>
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
                                        "p-4 text-left rounded-xl border-2 transition-all duration-300 font-semibold flex items-center justify-between text-sm cursor-pointer active:scale-[0.99]",
                                        isSelected 
                                            ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white shadow-[0_0_15px_rgba(99,102,241,0.1)]" 
                                            : "border-white/5 bg-black/25 text-[var(--fg-secondary)] hover:border-white/10 hover:text-white",
                                        isCorrect && "border-[var(--color-success)]/40 bg-[var(--color-success)]/10 text-[var(--color-success)] shadow-[0_0_15px_rgba(16,185,129,0.15)]",
                                        isWrong && "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-[var(--color-accent)] shadow-[0_0_15px_rgba(236,72,153,0.15)]"
                                    )}
                                >
                                    <span>{opt}</span>
                                    {submitted && isCorrect && <span className="text-[var(--color-success)] font-black text-lg">✓</span>}
                                    {submitted && isWrong && <span className="text-[var(--color-accent)] font-black text-lg">✗</span>}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}

            {!submitted ? (
                <div className="pt-8 border-t border-white/5 flex justify-center">
                    <Button 
                        onClick={handleSubmit} 
                        disabled={Object.keys(answers).length < quiz.questions.length}
                        className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)] disabled:opacity-50"
                    >
                        Submit Neural Sync
                    </Button>
                </div>
            ) : (
                <div className={cn(
                    "p-8 rounded-2xl text-center border relative overflow-hidden shadow-2xl",
                    passed 
                        ? "border-[var(--color-success)]/20 bg-gradient-to-br from-[var(--color-success-glow)] to-transparent" 
                        : "border-[var(--color-accent)]/20 bg-gradient-to-br from-[var(--color-accent-glow)] to-transparent"
                )}>
                    {/* Glowing effect inside summary */}
                    <div className={cn(
                        "absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 blur-3xl rounded-full",
                        passed ? "bg-[var(--color-success)]/10" : "bg-[var(--color-accent)]/10"
                    )} />

                    <h3 className="text-2xl font-black mb-2 text-white tracking-wide">
                        {passed ? '🏆 Neural Sync Successful' : '⚡ Sync Cycle Incomplete'}
                    </h3>
                    <p className="font-bold opacity-80 mb-6 text-[var(--fg-secondary)] text-sm">
                        You successfully resolved {score} out of {quiz.questions.length} nodes.
                    </p>
                    <Button 
                        onClick={() => { setQuiz(null); setAnswers({}); setSubmitted(false); setError(null); }}
                        className={cn(
                            "border-0 text-white font-bold tracking-wide shadow-lg",
                            passed 
                                ? "bg-gradient-to-r from-[var(--color-success)] to-[var(--color-cyan)] shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                                : "bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                        )}
                    >
                        Initiate New Cycle
                    </Button>
                </div>
            )}
        </div>
    );
}

