'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useTopicContext } from '@/lib/providers/topic-context';
import { useAuth } from '@/features/auth/AuthContext';
import { useTopics } from '@/features/learning/hooks/useTopics';
import { trackEvent } from '@/lib/telemetry';
import { collectWeaknessSignals, getWeakTopicNames } from '@/features/learning/weakness-engine';
import { SLO, isSloBreached } from '@/lib/utils/slo';
import { useReducedMotion } from 'framer-motion';

import { MayaOrb } from './MayaOrb';
import { MayaChatWindow } from './MayaChatWindow';
import { Message } from '../../types';
import { MayaOnboarding } from '../MayaOnboarding';

export default function MayaAssistant() {
    const { user } = useAuth();
    const { activeTopic } = useTopicContext();
    const { topics } = useTopics();
    const pathname = usePathname();
    const shouldReduceMotion = useReducedMotion();

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [thinkingStep, setThinkingStep] = useState(0);
    const [modelVersion, setModelVersion] = useState('');
    const [memoryScope, setMemoryScope] = useState<'session' | 'topic'>('session');
    const [aiMode, setAiMode] = useState<'mentor' | 'reviewer' | 'interviewer' | 'architect'>('mentor');
    const [pinnedMemories, setPinnedMemories] = useState<string[]>([]);
    const [showOnboarding, setShowOnboarding] = useState(false);

    const memoryKeyRef = useRef('maya_pinned_memory_global');
    const thinkingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Initial load
    useEffect(() => {
        const isVisible = pathname?.startsWith('/paths') ||
            pathname?.startsWith('/learn') ||
            pathname?.startsWith('/leaderboard');

        if (user && isVisible) {
            fetch('/api/ai/history')
                .then(res => res.json())
                .then(data => {
                    if (data.messages && Array.isArray(data.messages)) {
                        if (data.messages.length > 0) {
                            setMessages(data.messages);
                        } else {
                            setMessages([{
                                id: 'initial-greeting',
                                role: 'assistant',
                                content: `Hi ${(user.name || 'there').split(' ')[0]}! I'm Maya. Ready to build something great today? 💻✨`
                            }]);
                        }
                    }
                    if (data.version) setModelVersion(data.version);
                })
                .catch(() => { });
        }
    }, [user, pathname]);

    // Memory persistence
    useEffect(() => {
        const topicKey = activeTopic?.title?.trim().toLowerCase().replace(/\s+/g, '-') || 'global';
        const userKey = user?.email ? user.email.replace(/[^a-z0-9]/gi, '_') : 'anon';
        memoryKeyRef.current = `maya_pinned_memory_${userKey}_${topicKey}`;
        try {
            const saved = localStorage.getItem(memoryKeyRef.current);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setPinnedMemories(parsed.filter((m): m is string => typeof m === 'string').slice(0, 8));
                }
            }
        } catch { }
    }, [activeTopic?.title, user?.email]);

    useEffect(() => {
        try {
            localStorage.setItem(memoryKeyRef.current, JSON.stringify(pinnedMemories));
        } catch { }
    }, [pinnedMemories]);

    // Thinking cycle
    useEffect(() => {
        if (!isThinking) return;
        const interval = setInterval(() => {
            setThinkingStep(prev => (prev + 1) % 3);
        }, 1500);
        return () => clearInterval(interval);
    }, [isThinking]);

    const handleSendMessage = async (content: string) => {
        if (!content.trim() || isLoading) return;

        const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);
        setIsThinking(true);

        const requestStartedAt = Date.now();
        trackEvent('maya_message_sent_revamp', { aiMode, memoryScope });

        try {
            const weaknesses = getWeakTopicNames(collectWeaknessSignals(topics, activeTopic?.category), 6);
            const assistantId = crypto.randomUUID();

            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topicTitle: activeTopic?.title || 'General',
                    userMessage: content,
                    curriculum: activeTopic?.category || 'General',
                    assistantMessageId: assistantId,
                    weaknesses,
                    memoryScope,
                    pinnedMemories,
                    aiMode
                }),
            });

            if (!response.ok) throw new Error('API Error');

            const reader = response.body?.getReader();
            if (!reader) throw new Error('No stream');

            setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);
            setIsThinking(false);

            let accumulated = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = new TextDecoder().decode(value);
                accumulated += chunk;
                setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: accumulated } : m));
            }

            const latencyMs = Date.now() - requestStartedAt;
            trackEvent('maya_response_completed_revamp', { latencyMs });

        } catch (err) {
            setMessages(prev => [...prev, {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: "I hit a snag. Mind trying again? 🧊"
            }]);
        } finally {
            setIsLoading(false);
            setIsThinking(false);
        }
    };

    const clearHistory = async () => {
        try {
            await fetch('/api/ai/history', { method: 'DELETE' });
            setMessages([{
                id: crypto.randomUUID(),
                role: 'assistant',
                content: "Fresh start! What's on your mind? ✨"
            }]);
        } catch { }
    };

    const isVisible = pathname?.startsWith('/paths') ||
        pathname?.startsWith('/learn') ||
        pathname?.startsWith('/leaderboard');

    if (!user || !isVisible) return null;

    return (
        <>
            <MayaOrb
                onClick={() => setIsOpen(true)}
                isOpen={isOpen}
                shouldReduceMotion={!!shouldReduceMotion}
            />

            <MayaChatWindow
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                messages={messages}
                isLoading={isLoading}
                isThinking={isThinking}
                thinkingStep={thinkingStep}
                onSendMessage={handleSendMessage}
                onClearHistory={clearHistory}
                onPinMemory={(text) => setPinnedMemories(prev => prev.includes(text) ? prev : [...prev, text].slice(0, 8))}
                onUnpinMemory={(text) => setPinnedMemories(prev => prev.filter(t => t !== text))}
                pinnedMemories={pinnedMemories}
                aiMode={aiMode}
                setAiMode={setAiMode}
                memoryScope={memoryScope}
                setMemoryScope={setMemoryScope}
                user={user}
                activeTopic={activeTopic}
                shouldReduceMotion={!!shouldReduceMotion}
                modelVersion={modelVersion}
            />

            {showOnboarding && (
                <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xl flex items-center justify-center">
                    <div className="w-full max-w-lg bg-[var(--surface-raised)] rounded-[32px] overflow-hidden shadow-2xl">
                        <MayaOnboarding onComplete={(nickname, vibe) => {
                            setShowOnboarding(false);
                            setMessages([{
                                id: crypto.randomUUID(),
                                role: 'assistant',
                                content: `Locked in! Ready when you are, ${nickname}. 🚀`
                            }]);
                        }} />
                    </div>
                </div>
            )}
        </>
    );
}
