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

import { ModalSidebar } from './ModalSidebar';
import { ModalTopBar } from './ModalTopBar';
import { ModalFooter } from './ModalFooter';

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
            containerClassName="relative w-[min(1100px,95vw)] flex flex-col bg-white dark:bg-[#151515] rounded-[24px] shadow-[0_50px_100px_rgba(0,0,0,0.3)] overflow-hidden border border-black/5 dark:border-white/5 transform-gpu translate-z-0"
            backdropClassName="bg-black/60 backdrop-blur-sm transform-gpu"
        >
            <div className="flex flex-col md:flex-row h-[min(850px,90vh)]" onClick={(e) => e.stopPropagation()}>
                <ModalSidebar
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />

                <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#0A0A0A] relative overflow-hidden z-40">
                    <ModalTopBar
                        category={topicData.category}
                        onClose={closeModal}
                    />

                    <div
                        ref={contentRef}
                        className={cn(
                            "flex-1 relative custom-scrollbar",
                            activeTab === 'dojo' ? "overflow-y-auto md:overflow-hidden" : "overflow-y-auto"
                        )}>
                        <div className={cn(
                            "min-h-full flex flex-col",
                            activeTab === 'dojo' ? "pt-16 md:pt-24 px-2 pb-2 md:px-6 md:pb-6 h-full" : "p-4 md:p-16 pt-20 md:pt-24 pb-32 md:pb-16"
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

                    <ModalFooter
                        persona={persona}
                        togglePersona={togglePersona}
                        isSpeaking={isSpeaking}
                        handleVoiceToggle={handleVoiceToggle}
                        navigateTopic={navigateTopic}
                        currentIndex={currentIndex}
                        totalTopics={allTopics?.length || 0}
                        canComplete={canComplete}
                        isComplete={isComplete}
                        completionProgress={completionProgress}
                        timeSpent={timeSpent}
                        minTime={MIN_TIME_SECONDS}
                        onToggleComplete={handleToggleComplete}
                        onAskMaya={() => {
                            setActiveTab('ai');
                            setIsChatActive(true);
                        }}
                    />
                </div>
            </div>
        </ModalShell >
    );
}

function MobileTabItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: string, label: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex-1 flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all duration-300",
                active ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-600"
            )}
        >
            <span className={cn("text-lg", active ? "scale-110" : "grayscale opacity-50")}>{icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
            {active && (
                <motion.div
                    layoutId="mobile-tab-dot"
                    className="w-1 h-1 rounded-full bg-blue-500 mt-0.5"
                />
            )}
        </button>
    );
}

