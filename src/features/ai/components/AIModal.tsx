'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useModal } from "@/features/ai/context/ModalContext";
import { useAIStream } from "@/features/ai/hooks/useAIStream";
import { useResources } from "@/features/learning/hooks/useResources";
import { useProgress } from "@/features/learning/hooks/useProgress";
const AIExplanationView = dynamic(() => import('./AIExplanationView').then(mod => ({ default: mod.AIExplanationView })), {
    loading: () => (
        <div className="flex items-center justify-center h-40 bg-gray-100/50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <LoadingSpinner size="lg" />
        </div>
    ),
    ssr: false
});
import { ChatThread } from './ChatThread';
import { ModalShell, ModalCloseButton } from '@/components/ui/ModalShell';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getPersonaMessage } from "@/features/ai/persona-messages";

import { useTextToSpeech } from "@/features/ai/hooks/useTextToSpeech";

const ResourcesView = dynamic(() => import('./ResourcesView').then(m => ({ default: m.ResourcesView })), {
    loading: () => <div className="animate-pulse h-40 bg-gray-100 dark:bg-white/5 rounded-2xl" />,
    ssr: false,
});
const QuizView = dynamic(() => import('./QuizView').then(m => ({ default: m.QuizView })), {
    loading: () => <div className="animate-pulse h-40 bg-gray-100 dark:bg-white/5 rounded-2xl" />,
    ssr: false,
});
const CodeEditor = dynamic(() => import('./CodeEditor'), {
    loading: () => <div className="animate-pulse h-64 bg-gray-100 dark:bg-white/5 rounded-2xl" />,
    ssr: false,
});

export default function AIModal() {
    const { isOpen, topicData, closeModal, navigateTopic, allTopics, currentIndex } = useModal();
    const [activeTab, setActiveTab] = useState<'ai' | 'resources' | 'dojo' | 'quiz'>('ai');
    const [isChatActive, setIsChatActive] = useState(false);

    const [persona, setPersona] = useState<'general' | 'buddy'>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('axiom_persona');
            return (saved === 'buddy' || saved === 'general') ? saved : 'general';
        }
        return 'general';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('axiom_persona', persona);
        }
    }, [persona]);

    const [optimisticComplete, setOptimisticComplete] = useState<boolean | null>(null);

    const [timeSpent, setTimeSpent] = useState(0);
    const [quizPassed, setQuizPassed] = useState(false);
    const previousTopicIdRef = useRef<string | undefined>(topicData?.id);
    const wasOpenRef = useRef(isOpen);
    const topicId = topicData?.id;
    const initialTab = topicData?.initialTab;

    useEffect(() => {
        const topicChanged = topicId !== previousTopicIdRef.current;
        const modalOpened = isOpen && !wasOpenRef.current;
        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        if (topicId && (topicChanged || modalOpened)) {
            timeoutId = setTimeout(() => {
                setTimeSpent(0);
                setIsChatActive(false);
                setOptimisticComplete(null);
                setQuizPassed(false);
                setActiveTab(initialTab || 'ai');
            }, 0);
        }

        previousTopicIdRef.current = topicId;
        wasOpenRef.current = isOpen;

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isOpen, topicId, initialTab]);

    const MIN_TIME_SECONDS = 30;

    const handleTabChange = (tab: 'ai' | 'resources' | 'dojo' | 'quiz') => {
        setActiveTab(tab);
    };

    useEffect(() => {
        if (!isOpen || !topicData) return;

        const interval = setInterval(() => {
            setTimeSpent(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isOpen, topicData]);

    const { explanation, loading: loadingAI, error, fetchAIContent, resetContent, sendMessage, messages } = useAIStream();
    const { resources, loading: loadingResources, fetchResources, resetResources } = useResources();

    const [followUpInput, setFollowUpInput] = useState('');

    const handleSendFollowUp = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!followUpInput.trim() || loadingAI) return;

        const text = followUpInput;
        setFollowUpInput('');
        await sendMessage(text);
    };

    const { speak, cancel, isSpeaking } = useTextToSpeech();

    const handleVoiceToggle = () => {
        if (isSpeaking) {
            cancel();
        } else {
            if (explanation) {
                speak(explanation, persona);
            }
        }
    };

    useEffect(() => {
        if (!isOpen) {
            cancel();
        }
    }, [isOpen, cancel]);

    const curriculumSlug = topicData?.fileName || topicData?.curriculum || '';
    const { isChecked, toggleItem, completedCount } = useProgress(curriculumSlug, allTopics?.length || 0);

    const isComplete = optimisticComplete !== null
        ? optimisticComplete
        : (topicData?.id ? isChecked(topicData.id) : false);

    const canComplete = isComplete || quizPassed || timeSpent >= MIN_TIME_SECONDS;
    const completionProgress = Math.min(100, (timeSpent / MIN_TIME_SECONDS) * 100);

    const fetchedTopicIdRef = useRef<string | undefined>(undefined);
    useEffect(() => {
        if (isOpen && topicData && topicData.id !== fetchedTopicIdRef.current) {
            fetchedTopicIdRef.current = topicData.id;
            resetContent();
            resetResources();
            fetchAIContent(topicData.topic, topicData.category, topicData.description, topicData.phase, persona, false, 'explanation');
        }
    }, [isOpen, topicData, resetContent, resetResources, fetchAIContent, persona]);

    const prevPersonaRef = useRef(persona);
    useEffect(() => {
        if (prevPersonaRef.current !== persona && isOpen && topicData) {
            prevPersonaRef.current = persona;
            fetchAIContent(topicData.topic, topicData.category, topicData.description, topicData.phase, persona, true, 'explanation');
        }
    }, [persona, isOpen, topicData, fetchAIContent]);

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeTab !== 'ai' && contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [activeTab, topicData?.id]);

    useEffect(() => {
        if (activeTab === 'resources' && !resources && !loadingResources && topicData) {
            fetchResources(topicData.topic, topicData.curriculum || topicData.category, topicData.phase || '');
        }
    }, [activeTab, resources, loadingResources, topicData, fetchResources]);

    const handleToggleComplete = async () => {
        if (!topicData?.id) return;

        const newState = !isComplete;
        setOptimisticComplete(newState);

        if (newState) {
            import('canvas-confetti').then((module) => {
                const confetti = module.default || module;
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#22c55e', '#3b82f6', '#f59e0b']
                });
            }).catch(e => console.error('Failed to load confetti:', e));
        }

        try {
            await toggleItem(topicData.id);
        } catch (e) {
            setOptimisticComplete(!newState);
            console.error("Failed to toggle item", e);
        }
    };

    const togglePersona = () => setPersona(persona === 'general' ? 'buddy' : 'general');

    if (!isOpen || !topicData) return null;

    const getDojoLanguage = (category: string): 'javascript' | 'typescript' | 'python' | 'mongodb' | 'sql' => {
        const cat = category.toLowerCase();
        if (cat.includes('sql')) return 'sql';
        if (cat.includes('mongo')) return 'mongodb';
        if (cat.includes('python')) return 'python';
        if (cat.includes('typescript')) return 'typescript';
        if (cat.includes('next.js') || cat.includes('nestjs')) return 'typescript';
        return 'javascript';
    };

    const dojoLanguage = getDojoLanguage(topicData.category);

    return (
        <ModalShell
            isOpen={isOpen}
            onClose={closeModal}
            align="center"
            ariaLabel="AI assistant workspace"
            containerClassName="relative w-[min(1100px,95vw)] flex flex-col bg-white dark:bg-[#151515] rounded-[24px] shadow-[0_50px_100px_rgba(0,0,0,0.3)] overflow-hidden border border-black/5 dark:border-white/5"
            backdropClassName="bg-black/60 backdrop-blur-md"
        >
            <div className="flex flex-col md:flex-row h-[min(850px,90vh)]" onClick={(e) => e.stopPropagation()}>
                { }
                <div className="w-full md:w-20 bg-gray-50/50 dark:bg-black/20 border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5 flex flex-col shrink-0 transition-colors duration-500 overflow-y-auto overflow-x-hidden custom-scrollbar max-h-[25vh] md:max-h-none items-center relative z-50">
                    { }
                    <div className="p-4 md:py-8 flex flex-col items-center gap-4 shrink-0">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>
                    </div>

                    { }
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    delayChildren: 0.2,
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        className="flex-1 px-2 py-1 md:py-8 space-y-2 md:space-y-4 flex flex-col items-center"
                    >
                        <TabItem
                            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                            active={activeTab === 'ai'}
                            onClick={() => handleTabChange('ai')}
                            icon="✨"
                            label="Sacred Archive"
                            hoverLabel="Concept Guide"
                        />
                        <TabItem
                            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                            active={activeTab === 'resources'}
                            onClick={() => handleTabChange('resources')}
                            icon="📚"
                            label="Resources & Labs"
                            hoverLabel="Visual Library"
                        />
                        <TabItem
                            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                            active={activeTab === 'dojo'}
                            onClick={() => handleTabChange('dojo')}
                            icon="⚔️"
                            label="Practitioner Dojo"
                            hoverLabel="Code Studio"
                        />
                        <TabItem
                            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                            active={activeTab === 'quiz'}
                            onClick={() => handleTabChange('quiz')}
                            icon="🧠"
                            label="Test knowledge"
                            hoverLabel="Quick Quiz"
                        />
                    </motion.div>

                </div>

                { }
                <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#0A0A0A] relative overflow-hidden z-40">
                    { }
                    <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-20 pointer-events-none transform-gpu translate-z-0">
                        <div className="pointer-events-auto">
                            <div className="flex items-center gap-2 bg-gray-100/50 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 px-4 py-1.5 rounded-full shadow-sm">
                                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest">{topicData.category}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pointer-events-auto">
                            <ModalCloseButton onClose={closeModal} className="w-10 h-10 shadow-lg backdrop-blur-md bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10" />
                        </div>
                    </div>

                    <div
                        ref={contentRef}
                        className={cn(
                            "flex-1 relative custom-scrollbar",
                            activeTab === 'dojo' ? "overflow-y-auto md:overflow-hidden" : "overflow-y-auto"
                        )}>
                        <div className={cn(
                            "min-h-full flex flex-col",
                            activeTab === 'dojo' ? "pt-12 md:pt-24 px-2 pb-2 md:px-6 md:pb-6 h-full" : "p-4 md:p-16 pt-24"
                        )}>
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
                                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                                    className="flex-1 flex flex-col min-h-0"
                                >
                                    {activeTab === 'ai' ? (
                                        <div className="max-w-4xl w-full mx-auto">
                                            <motion.h2
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                className="text-4xl md:text-6xl font-black text-black dark:text-white mb-8 tracking-tighter leading-tight"
                                            >
                                                {topicData.topic}.
                                            </motion.h2>

                                            <motion.div
                                                initial={{ opacity: 0, x: -8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                className="flex gap-6 mb-12"
                                            >
                                                <div className={cn(
                                                    "w-1.5 h-auto rounded-full shrink-0 transition-colors duration-500",
                                                    persona === 'general' ? "bg-blue-500/40" : "bg-emerald-500/40"
                                                )} />
                                                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-serif italic">
                                                    {getPersonaMessage(
                                                        topicData.category,
                                                        persona,
                                                        allTopics?.length ? Math.round((completedCount / allTopics.length) * 100) : 0
                                                    )}
                                                </p>
                                            </motion.div>

                                            <AIExplanationView
                                                content={explanation}
                                                loading={loadingAI && !explanation}
                                                error={error}
                                                onRegenerate={() => fetchAIContent(topicData.topic, topicData.category, topicData.description, topicData.phase, persona, true)}
                                                persona={persona}
                                                category={topicData.category}
                                            />
                                            {loadingAI && explanation && (
                                                <div className="mt-4 flex items-center gap-3 text-sm font-bold text-gray-400 dark:text-gray-500 animate-pulse">
                                                    <div className="flex gap-1">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" />
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:150ms]" />
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:300ms]" />
                                                    </div>
                                                    <span>Maya is writing...</span>
                                                </div>
                                            )}
                                            <ChatThread
                                                messages={messages}
                                                persona={persona}
                                                category={topicData.category}
                                                isChatActive={isChatActive}
                                                setIsChatActive={setIsChatActive}
                                                followUpInput={followUpInput}
                                                setFollowUpInput={setFollowUpInput}
                                                onSendFollowUp={handleSendFollowUp}
                                                loadingAI={loadingAI}
                                            />
                                        </div>
                                    ) : activeTab === 'resources' ? (
                                        <div className="max-w-5xl w-full mx-auto">
                                            <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white mb-10 tracking-tighter">Resources & Labs.</h2>
                                            <ResourcesView resources={resources} loading={loadingResources} />
                                        </div>
                                    ) : activeTab === 'quiz' ? (
                                        <div className="max-w-3xl w-full mx-auto">
                                            <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white mb-10 tracking-tighter">Test Your Knowledge.</h2>
                                            <QuizView
                                                topic={topicData.topic}
                                                category={topicData.category}
                                                persona={persona}
                                                onComplete={(score, total, isPassed) => {
                                                    if (isPassed) {
                                                        setQuizPassed(true);
                                                        import('canvas-confetti').then((module) => {
                                                            const confetti = module.default || module;
                                                            confetti({
                                                                particleCount: 150,
                                                                spread: 100,
                                                                origin: { y: 0.6 },
                                                                colors: ['#22c55e', '#ec4899', '#8b5cf6']
                                                            });
                                                        }).catch(e => console.error('Failed to load confetti:', e));
                                                    }
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex-1 flex flex-col h-full">
                                            <CodeEditor
                                                key={`${topicData.id}-${dojoLanguage}`}
                                                language={dojoLanguage}
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    { }
                    { }
                    <div className="shrink-0 p-3 md:p-5 bg-white/80 dark:bg-black/40 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between gap-3 z-20 backdrop-blur-xl backdrop-saturate-150 transform-gpu translate-z-0">
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="flex items-center gap-2">
                                { }
                                <motion.button
                                    whileHover={{ scale: 1.05, rotate: 10 }}
                                    whileTap={{ scale: 0.9, rotate: -10 }}
                                    onClick={togglePersona}
                                    className={cn(
                                        "w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-xl transition-all duration-300 border relative overflow-hidden",
                                        persona === 'general'
                                            ? "bg-white dark:bg-white/5 border-black/5 dark:border-white/10 grayscale-0"
                                            : "bg-emerald-400 border-emerald-400 text-white grayscale-0"
                                    )}
                                    title="Switch Persona"
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={persona}
                                            initial={{ scale: 0, rotate: 180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0, rotate: -180 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            {persona === 'general' ? '🎭' : '✨'}
                                        </motion.span>
                                    </AnimatePresence>
                                </motion.button>

                                { }
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleVoiceToggle}
                                    className={cn(
                                        "w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border flex items-center justify-center text-xl md:text-2xl shadow-xl transition-all duration-300",
                                        isSpeaking
                                            ? "bg-red-500 border-red-400 text-white animate-pulse"
                                            : "bg-white dark:bg-white/5 border-black/5 dark:border-white/10 opacity-50 hover:opacity-100"
                                    )}
                                    title={isSpeaking ? "Stop Voice" : "Read Aloud"}
                                >
                                    {isSpeaking ? "🔇" : "🔊"}
                                </motion.button>
                            </div>

                            { }
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => navigateTopic('prev')}
                                    disabled={currentIndex === 0}
                                    className="p-2 md:p-3 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border border-black/5 dark:border-white/5 text-gray-400 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/5 transition-all disabled:opacity-20 flex items-center justify-center shrink-0"
                                >
                                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button
                                    onClick={() => navigateTopic('next')}
                                    disabled={!allTopics || currentIndex === allTopics.length - 1}
                                    className="p-2 md:p-3 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border border-black/5 dark:border-white/5 text-gray-400 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/5 transition-all disabled:opacity-20 flex items-center justify-center shrink-0"
                                >
                                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-2 md:gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setActiveTab('ai');
                                    setIsChatActive(true);
                                }}
                                className={cn(
                                    "flex-1 md:flex-none px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-xs md:text-sm transition-all shadow-lg",
                                    persona === 'general'
                                        ? "bg-blue-600 text-white shadow-blue-500/30 hover:bg-blue-700"
                                        : "bg-emerald-600 text-white shadow-emerald-500/30 hover:bg-emerald-700"
                                )}
                            >
                                Ask Maya
                            </motion.button>
                            <motion.button
                                whileHover={canComplete ? { scale: 1.05 } : {}}
                                whileTap={canComplete ? { scale: 0.95 } : {}}
                                onClick={canComplete ? handleToggleComplete : undefined}
                                disabled={!canComplete}
                                className={cn(
                                    "flex-[2] md:flex-none flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-2 md:py-3 rounded-full font-bold text-xs md:text-sm transition-all shadow-lg truncate relative overflow-hidden",
                                    isComplete
                                        ? "bg-emerald-500 text-white shadow-emerald-500/20"
                                        : canComplete
                                            ? "bg-black dark:bg-white text-white dark:text-black cursor-pointer"
                                            : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                                )}
                            >
                                { }
                                {!isComplete && !canComplete && (
                                    <div
                                        className="absolute inset-0 bg-blue-500/30 transition-all duration-1000"
                                        style={{ width: `${completionProgress}%` }}
                                    />
                                )}
                                <span className="relative z-10">
                                    {isComplete ? "Mastered ✓" : canComplete ? "Complete Topic" : `Study ${Math.max(0, MIN_TIME_SECONDS - timeSpent)}s...`}
                                </span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </ModalShell >
    );
}

function TabItem({ active, onClick, icon, label, hoverLabel, variants }: { active: boolean, onClick: () => void, icon: string, label: string, hoverLabel?: string, variants?: import('framer-motion').Variants }) {
    return (
        <motion.button
            layout
            variants={variants}
            onClick={onClick}
            title={hoverLabel || label}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-200 cursor-pointer group relative mx-auto",
                active
                    ? "bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 shadow-[0_4px_16px_rgba(59,130,246,0.12)] ring-1 ring-blue-500/20"
                    : "text-gray-400 dark:text-gray-600 hover:bg-white/5 hover:text-gray-300"
            )}
        >
            {active && (
                <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-2xl bg-blue-500/10 dark:bg-blue-500/15 ring-1 ring-blue-500/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                />
            )}
            <span className={cn(
                "text-xl transition-all duration-200 relative z-10",
                active ? "scale-110 drop-shadow-sm" : "grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80"
            )}>{icon}</span>
        </motion.button>
    );
}
