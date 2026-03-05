'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/telemetry';

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
type QuizDifficulty = 'easy' | 'medium' | 'hard';

export function QuizView({ topic, category, persona = 'general', onComplete }: QuizViewProps) {
    const [state, setState] = useState<QuizState>('idle');
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<(number | null)[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [difficulty, setDifficulty] = useState<QuizDifficulty>('medium');
    const abortControllerRef = useRef<AbortController | null>(null);

    const performanceKey = `quiz_perf_${category.toLowerCase().replace(/\s+/g, '-')}_${topic.toLowerCase().replace(/\s+/g, '-')}`;

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(performanceKey);
            if (!raw) return;
            const parsed = JSON.parse(raw) as { scoreRate?: number };
            if (typeof parsed.scoreRate !== 'number') return;
            if (parsed.scoreRate >= 0.8) setDifficulty('hard');
            else if (parsed.scoreRate <= 0.45) setDifficulty('easy');
            else setDifficulty('medium');
        } catch {
        }
    }, [performanceKey]);

    const fetchQuiz = async () => {
        setState('loading');
        setError(null);
        setQuestions([]);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setScore(0);
        setAnswers([]);

        abortControllerRef.current?.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            trackEvent('quiz_started', { topic, category, difficulty });
            const response = await fetch('/api/ai/modal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({
                    topic,
                    category,
                    mode: 'quiz',
                    persona,
                    difficulty
                })
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
            if (jsonMatch) {
                jsonStr = jsonMatch[0];
            } else if (jsonStr.includes('```')) {
                jsonStr = jsonStr.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
            }

            try {
                const parsed = JSON.parse(jsonStr) as QuizQuestion[];
                if (!Array.isArray(parsed) || parsed.length === 0) {
                    throw new Error('Invalid quiz format: expected non-empty array');
                }
                setQuestions(parsed);
                setAnswers(new Array(parsed.length).fill(null));
                setState('active');
            } catch (parseError) {
                console.error('[Quiz] JSON Parse Error:', parseError, 'Raw string:', jsonStr);
                throw new Error('The AI returned a corrupted quiz format. Please try again.');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load quiz');
            setState('idle');
        }
    };

    const handleSelectAnswer = (index: number) => {
        if (showExplanation) return;
        setSelectedAnswer(index);
    };

    const handleConfirm = () => {
        if (selectedAnswer === null) return;

        const isCorrect = selectedAnswer === questions[currentIndex].correct;
        if (isCorrect) setScore(prev => prev + 1);

        const newAnswers = [...answers];
        newAnswers[currentIndex] = selectedAnswer;
        setAnswers(newAnswers);
        setShowExplanation(true);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            setState('results');
            const isPassed = score >= Math.ceil(questions.length * 0.67);
            const scoreRate = questions.length > 0 ? score / questions.length : 0;
            try {
                localStorage.setItem(performanceKey, JSON.stringify({
                    scoreRate,
                    at: Date.now()
                }));
            } catch {
            }
            trackEvent('quiz_completed', {
                topic,
                category,
                difficulty,
                score,
                total: questions.length,
                passed: isPassed
            });
            onComplete?.(score, questions.length, isPassed);
        }
    };

    const currentQuestion = questions[currentIndex];

    if (state === 'idle') {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-6">
                <div className="text-6xl mb-4">🧠</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Test Your Knowledge</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-sm">
                    Take a quick 3-question quiz on <span className="font-semibold">{topic}</span> to check your understanding.
                </p>
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">Adaptive difficulty</span>
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">{difficulty}</span>
                </div>
                {error && (
                    <div className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 max-w-sm text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <span className="text-red-500 text-sm">⚠️</span>
                            <span className="text-sm font-bold text-red-600 dark:text-red-400">Generation Failed</span>
                        </div>
                        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
                    </div>
                )}
                <button
                    onClick={fetchQuiz}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all"
                >
                    {error ? 'Retry Quiz ↻' : 'Start Quiz ✨'}
                </button>
            </div>
        );
    }

    if (state === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-6">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="text-5xl mb-4"
                >
                    🔄
                </motion.div>
                <p className="text-gray-600 dark:text-gray-400">Generating quiz...</p>
            </div>
        );
    }

    if (state === 'results') {
        const percentage = Math.round((score / questions.length) * 100);
        const emoji = percentage >= 80 ? '🎉' : percentage >= 50 ? '👍' : '📚';

        return (
            <div className="flex flex-col items-center justify-center py-12 px-6">
                <div className="text-6xl mb-4">{emoji}</div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {percentage >= 80 ? 'Excellent!' : percentage >= 50 ? 'Good Job!' : 'Keep Learning!'}
                </h3>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    {score}/{questions.length}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                    {percentage >= 80 ? 'You\'ve mastered this topic!' : percentage >= 50 ? 'Almost there, review the topics you missed.' : 'Review the material and try again!'}
                </p>
                <button
                    onClick={() => setState('idle')}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full p-4">
            { }
            <div className="flex items-center gap-2 mb-6">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {currentIndex + 1}/{questions.length}
                </span>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            { }
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1"
                >
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                        {currentQuestion.q}
                    </h3>

                    { }
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => {
                            const isSelected = selectedAnswer === index;
                            const isCorrect = index === currentQuestion.correct;
                            const showResult = showExplanation;

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleSelectAnswer(index)}
                                    disabled={showExplanation}
                                    className={cn(
                                        "w-full p-4 text-left rounded-xl border-2 transition-all",
                                        !showResult && isSelected && "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
                                        !showResult && !isSelected && "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600",
                                        showResult && isCorrect && "border-green-500 bg-green-50 dark:bg-green-900/20",
                                        showResult && isSelected && !isCorrect && "border-red-500 bg-red-50 dark:bg-red-900/20"
                                    )}
                                >
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {String.fromCharCode(65 + index)}. {option}
                                    </span>
                                    {showResult && isCorrect && (
                                        <span className="ml-2 text-green-600">✓</span>
                                    )}
                                    {showResult && isSelected && !isCorrect && (
                                        <span className="ml-2 text-red-600">✗</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    { }
                    <AnimatePresence>
                        {showExplanation && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl"
                            >
                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                    <span className="font-bold">💡 Explanation:</span> {currentQuestion.explanation}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>

            { }
            <div className="mt-6">
                {!showExplanation ? (
                    <button
                        onClick={handleConfirm}
                        disabled={selectedAnswer === null}
                        className={cn(
                            "w-full py-3 font-bold rounded-xl transition-all",
                            selectedAnswer !== null
                                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                        )}
                    >
                        Confirm Answer
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                    >
                        {currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results 🎉'}
                    </button>
                )}
            </div>
        </div>
    );
}