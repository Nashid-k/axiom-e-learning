'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useModal } from "@/features/ai/context/ModalContext";
import { useAIStream } from "@/features/ai/hooks/useAIStream";
import { useResources } from "@/features/learning/hooks/useResources";
import { useProgress } from "@/features/learning/hooks/useProgress";
import { ChatThread } from './ChatThread';
import { ModalShell } from '@/components/ui/ModalShell';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useTextToSpeech } from "@/features/ai/hooks/useTextToSpeech";
import { ModalSidebar, MobileTabBar } from './ModalSidebar';
import { ModalTopBar } from './ModalTopBar';
import { ModalFooter } from './ModalFooter';
import { cn } from '@/lib/utils';

function detectLanguage(category: string): 'javascript' | 'typescript' | 'python' | 'mongodb' | 'sql' {
    const cat = category.toLowerCase();
    if (cat.includes('python') || cat.includes('django')) return 'python';
    if (cat.includes('sql')) return 'sql';
    if (cat.includes('typescript')) return 'typescript';
    if (cat.includes('mongodb')) return 'mongodb';
    return 'javascript';
}

const AIExplanationView = dynamic(() => import('./AIExplanationView').then(mod => ({ default: mod.AIExplanationView })), {
    loading: () => <LoadingSpinner size="lg" />,
    ssr: false
});

const ResourcesView = dynamic(() => import('./ResourcesView').then(m => ({ default: m.ResourcesView })), {
    loading: () => <div className="animate-pulse h-40 bg-[var(--surface-raised)] rounded-md" />,
    ssr: false,
});
const QuizView = dynamic(() => import('./QuizView').then(m => ({ default: m.QuizView })), {
    loading: () => <div className="animate-pulse h-40 bg-[var(--surface-raised)] rounded-md" />,
    ssr: false,
});
const CodeEditor = dynamic(() => import('./CodeEditor'), {
    loading: () => <div className="animate-pulse h-64 bg-[var(--surface-raised)] rounded-md" />,
    ssr: false,
});

export default function AIModal() {
    const { isOpen, topicData, closeModal, navigateTopic, allTopics, currentIndex } = useModal();
    const [activeTab, setActiveTab] = useState<'ai' | 'resources' | 'dojo' | 'quiz'>('ai');
    const [isChatActive, setIsChatActive] = useState(false);
    const [showDojoSplit, setShowDojoSplit] = useState(true);

    const [persona, setPersona] = useState<'general' | 'buddy'>('general');
    const [optimisticComplete, setOptimisticComplete] = useState<boolean | null>(null);
    const [timeSpent, setTimeSpent] = useState(0);
    const [quizPassed, setQuizPassed] = useState(false);
    
    const topicId = topicData?.id;
    const initialTab = topicData?.initialTab;

    // Reset states when a new topic is opened
    useEffect(() => {
        if (isOpen && topicId) {
            setTimeSpent(0);
            setIsChatActive(false);
            setOptimisticComplete(null);
            setQuizPassed(false);
            if (initialTab) {
                if (initialTab === 'dojo') {
                    setActiveTab('ai');
                    setShowDojoSplit(true);
                } else {
                    setActiveTab(initialTab);
                }
            }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, topicData?.id]);

    useEffect(() => {
        if (activeTab === 'resources' && !resources && !loadingResources && topicData) {
            fetchResources(topicData.topic, topicData.curriculum || topicData.category, topicData.phase || '');
        }
    }, [activeTab, resources, loadingResources, topicData, fetchResources]);

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

    if (!isOpen && !topicData) return null;

    // Detect if dojo tab is selected on mobile vs split on desktop
    const renderDojoOnly = activeTab === 'dojo';

    return (
        <ModalShell
            isOpen={isOpen && !!topicData}
            onClose={closeModal}
            containerClassName="w-full md:w-[min(1400px,95vw)] h-[100dvh] md:h-[90vh] bg-[var(--surface-base)] border-0 md:border border-white/10 rounded-none md:rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
            {topicData && (
                <div className="flex flex-col md:flex-row h-full" onClick={(e) => e.stopPropagation()}>
                    <ModalSidebar activeTab={renderDojoOnly ? 'ai' : activeTab} onTabChange={(tab) => {
                        if (tab === 'dojo') {
                            setActiveTab('ai');
                            setShowDojoSplit(true);
                        } else {
                            setActiveTab(tab);
                        }
                    }} />
                    <MobileTabBar activeTab={activeTab} onTabChange={setActiveTab} />

                    <div className="flex-1 flex flex-col bg-[var(--surface-base)] relative overflow-hidden">
                        <ModalTopBar category={topicData.category} onClose={closeModal} />

                        {/* Split Operations Console Area */}
                        <div className="flex-1 flex flex-col md:flex-row min-h-0 relative">
                            {/* Left Pane (AI/Resources/Quiz) */}
                            <div className={cn(
                                "flex-1 overflow-y-auto p-6 md:p-12 pt-20 md:pt-24 pb-28 md:pb-32 transition-all duration-300 custom-scrollbar",
                                renderDojoOnly && "hidden md:block" // hide on mobile if dojo fullscreen selected
                            )}>
                                <div className="max-w-3xl mx-auto w-full">
                                    {(activeTab === 'ai' || renderDojoOnly) ? (
                                        <>
                                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
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
                                                <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-cyan)] animate-pulse">
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
                                    ) : null}
                                </div>
                            </div>

                            {/* Center Split Border / Interactive Toggle */}
                            <div className="hidden md:flex flex-col items-center justify-center shrink-0 w-[1px] relative bg-white/5">
                                <button
                                    onClick={() => setShowDojoSplit(!showDojoSplit)}
                                    className="absolute p-1 bg-[var(--surface-raised)] border border-white/10 rounded-md hover:border-[var(--color-primary)] text-[10px] font-black text-[var(--fg-secondary)] hover:text-white uppercase tracking-widest cursor-pointer shadow-lg active:scale-95"
                                    title={showDojoSplit ? "Collapse Code Dojo" : "Expand Code Dojo"}
                                >
                                    {showDojoSplit ? '→' : '←'}
                                </button>
                            </div>

                            {/* Right Pane (Code Editor Dojo) */}
                            <div className={cn(
                                "transition-all duration-300 overflow-hidden shrink-0 relative bg-black/40",
                                showDojoSplit ? "w-full md:w-1/2" : "w-0 md:w-0",
                                renderDojoOnly ? "flex w-full md:w-full" : "hidden md:block" // fullscreen on mobile if selected
                            )}>
                                <div className="absolute inset-0 p-4 pt-16 md:pt-20">
                                    <CodeEditor 
                                        key={topicId} 
                                        language={detectLanguage(topicData.category)} 
                                    />
                                </div>
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
            )}
        </ModalShell>
    );
}

