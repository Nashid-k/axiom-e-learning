'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useModal } from "@/features/ai/context/ModalContext";
import { useAIStream } from "@/features/ai/hooks/useAIStream";
import { useResources } from "@/features/learning/hooks/useResources";
import { useProgress } from "@/features/learning/hooks/useProgress";
import { ChatThread } from './ChatThread';
import { ModalShell } from '@/components/ui/ModalShell';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cn } from '@/lib/utils';
import { useTextToSpeech } from "@/features/ai/hooks/useTextToSpeech";
import { ModalSidebar } from './ModalSidebar';
import { ModalTopBar } from './ModalTopBar';
import { ModalFooter } from './ModalFooter';

const AIExplanationView = dynamic(() => import('./AIExplanationView').then(mod => ({ default: mod.AIExplanationView })), {
    loading: () => <LoadingSpinner size="lg" />,
    ssr: false
});

const ResourcesView = dynamic(() => import('./ResourcesView').then(m => ({ default: m.ResourcesView })), {
    loading: () => <div className="animate-pulse h-40 bg-neutral-100 dark:bg-neutral-900 rounded-md" />,
    ssr: false,
});
const QuizView = dynamic(() => import('./QuizView').then(m => ({ default: m.QuizView })), {
    loading: () => <div className="animate-pulse h-40 bg-neutral-100 dark:bg-neutral-900 rounded-md" />,
    ssr: false,
});
const CodeEditor = dynamic(() => import('./CodeEditor'), {
    loading: () => <div className="animate-pulse h-64 bg-neutral-100 dark:bg-neutral-900 rounded-md" />,
    ssr: false,
});

export default function AIModal() {
    const { isOpen, topicData, closeModal, navigateTopic, allTopics, currentIndex } = useModal();
    const [activeTab, setActiveTab] = useState<'ai' | 'resources' | 'dojo' | 'quiz'>('ai');
    const [isChatActive, setIsChatActive] = useState(false);

    const [persona, setPersona] = useState<'general' | 'buddy'>('general');
    const [optimisticComplete, setOptimisticComplete] = useState<boolean | null>(null);
    const [timeSpent, setTimeSpent] = useState(0);
    const [quizPassed, setQuizPassed] = useState(false);
    
    const topicId = topicData?.id;
    const initialTab = topicData?.initialTab;

    useEffect(() => {
        if (isOpen && topicId) {
            setTimeSpent(0);
            setIsChatActive(false);
            setOptimisticComplete(null);
            setQuizPassed(false);
            setActiveTab(initialTab || 'ai');
        }
    }, [isOpen, topicId, initialTab]);

    const MIN_TIME_SECONDS = 30;

    useEffect(() => {
        if (!isOpen || !topicData) return;
        const interval = setInterval(() => setTimeSpent(p => p + 1), 1000);
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

    useEffect(() => {
        if (isOpen && topicData) {
            resetContent();
            resetResources();
            fetchAIContent(topicData.topic, topicData.category, topicData.description, topicData.phase, persona, false, 'explanation');
        }
    }, [isOpen, topicData?.id]);

    useEffect(() => {
        if (activeTab === 'resources' && !resources && !loadingResources && topicData) {
            fetchResources(topicData.topic, topicData.curriculum || topicData.category, topicData.phase || '');
        }
    }, [activeTab, resources, loadingResources, topicData]);

    const curriculumSlug = topicData?.fileName || topicData?.curriculum || '';
    const { isChecked, toggleItem } = useProgress(curriculumSlug, allTopics?.length || 0);

    const isComplete = optimisticComplete !== null ? optimisticComplete : (topicId ? isChecked(topicId) : false);
    const canComplete = isComplete || quizPassed || timeSpent >= MIN_TIME_SECONDS;
    const completionProgress = Math.min(100, (timeSpent / MIN_TIME_SECONDS) * 100);

    const handleToggleComplete = async () => {
        if (!topicId) return;
        const newState = !isComplete;
        setOptimisticComplete(newState);
        try { await toggleItem(topicId); } catch { setOptimisticComplete(!newState); }
    };

    if (!isOpen || !topicData) return null;

    return (
        <ModalShell
            isOpen={isOpen}
            onClose={closeModal}
            containerClassName="w-[min(1200px,95vw)] h-[90vh] bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden"
        >
            <div className="flex h-full" onClick={(e) => e.stopPropagation()}>
                <ModalSidebar activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="flex-1 flex flex-col bg-white dark:bg-black relative overflow-hidden">
                    <ModalTopBar category={topicData.category} onClose={closeModal} />

                    <div className="flex-1 overflow-y-auto p-6 md:p-12 pt-20 md:pt-24 pb-32">
                        <div className="max-w-4xl mx-auto w-full">
                            {activeTab === 'ai' ? (
                                <>
                                    <h2 className="text-3xl md:text-5xl font-black text-black dark:text-white mb-6 tracking-tight">
                                        {topicData.topic}
                                    </h2>
                                    <AIExplanationView
                                        content={explanation}
                                        loading={loadingAI && !explanation}
                                        error={error}
                                        onRegenerate={() => fetchAIContent(topicData.topic, topicData.category, topicData.description, topicData.phase, persona, true)}
                                        persona={persona}
                                        category={topicData.category}
                                    />
                                    {loadingAI && explanation && (
                                        <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 animate-pulse">
                                            <LoadingSpinner size="sm" />
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
                                </>
                            ) : activeTab === 'resources' ? (
                                <ResourcesView resources={resources} loading={loadingResources} />
                            ) : activeTab === 'quiz' ? (
                                <QuizView
                                    topic={topicData.topic}
                                    category={topicData.category}
                                    persona={persona}
                                    onComplete={(s, t, p) => p && setQuizPassed(true)}
                                />
                            ) : (
                                <CodeEditor 
                                    key={topicId} 
                                    language={topicData.category.toLowerCase().includes('sql') ? 'sql' : 'javascript'} 
                                />
                            )}
                        </div>
                    </div>

                    <ModalFooter
                        persona={persona}
                        togglePersona={() => setPersona(p => p === 'general' ? 'buddy' : 'general')}
                        isSpeaking={isSpeaking}
                        handleVoiceToggle={() => isSpeaking ? cancel() : (explanation && speak(explanation, persona))}
                        navigateTopic={navigateTopic}
                        currentIndex={currentIndex}
                        totalTopics={allTopics?.length || 0}
                        canComplete={canComplete}
                        isComplete={isComplete}
                        completionProgress={completionProgress}
                        timeSpent={timeSpent}
                        minTime={MIN_TIME_SECONDS}
                        onToggleComplete={handleToggleComplete}
                        onAskMaya={() => { setActiveTab('ai'); setIsChatActive(true); }}
                    />
                </div>
            </div>
        </ModalShell>
    );
}
