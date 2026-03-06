'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useTopicContext } from '@/lib/providers/topic-context';
import { useAuth } from '@/features/auth/AuthContext';
import { AI_CONFIG } from '@/lib/config/app';
import { MayaOnboarding } from './MayaOnboarding';
import dynamic from 'next/dynamic';

const AIExplanationView = dynamic(() => import('../../components/AIExplanationView').then(mod => ({ default: mod.AIExplanationView })), {
    loading: () => (
        <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <LoadingSpinner size="md" />
        </div>
    ),
    ssr: false
});
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { trackEvent } from '@/lib/telemetry';
import { useTopics } from '@/features/learning/hooks/useTopics';
import { collectWeaknessSignals, getWeakTopicNames } from '@/features/learning/weakness-engine';
import { SLO, isSloBreached } from '@/lib/utils/slo';

export interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export default function GlobalAssistant() {
    const { user } = useAuth();
    const { activeTopic } = useTopicContext();
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState('');
    const pathname = usePathname();
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage] = useState('');

    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [modelVersion, setModelVersion] = useState('');

    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState('');
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const [showOnboarding, setShowOnboarding] = useState(false);
    const [thinkingStep, setThinkingStep] = useState(0);
    const [memoryScope, setMemoryScope] = useState<'session' | 'topic'>('session');
    const [aiMode, setAiMode] = useState<'mentor' | 'reviewer' | 'interviewer' | 'architect'>('mentor');
    const [pinnedMemories, setPinnedMemories] = useState<string[]>([]);
    const [lastFailedInput, setLastFailedInput] = useState<string | null>(null);
    const shouldReduceMotion = useReducedMotion();
    const MOTION_MICRO = shouldReduceMotion ? 0.01 : 0.2;
    const MOTION_SWAP = shouldReduceMotion ? 0.01 : 0.2;
    const thinkingShowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const thinkingHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const thinkingVisibleSinceRef = useRef<number>(0);
    const thinkingIsVisibleRef = useRef(false);
    const memoryKeyRef = useRef('maya_pinned_memory_global');
    const { topics } = useTopics();

    const executeAction = useCallback((actionType: string) => {
        if (actionType === 'CONFETTI') {
            import('canvas-confetti').then(module => {
                const confetti = module.default;
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            });
        }
    }, []);

    useEffect(() => {
        if (messages.length === 0) return;

        const lastMsg = messages[messages.length - 1];
        if (lastMsg.role === 'assistant' && !isLoading) {
            const actionRegex = /\[AXIOM_ACTION:([A-Z_]+)\|([^\]]+)\]/g;
            let match;
            let newContent = lastMsg.content;
            let actionFound = false;

            while ((match = actionRegex.exec(lastMsg.content)) !== null) {
                actionFound = true;
                const [fullMatch, type] = match;
                executeAction(type);
                newContent = newContent.replace(fullMatch, '');
            }

            if (actionFound) {
                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                        ...updated[updated.length - 1],
                        content: newContent.trim()
                    };
                    return updated;
                });
            }
        }
    }, [messages, isLoading, executeAction]);

    useEffect(() => {
        return () => {
            if (thinkingShowTimerRef.current) clearTimeout(thinkingShowTimerRef.current);
            if (thinkingHideTimerRef.current) clearTimeout(thinkingHideTimerRef.current);
        };
    }, []);

    useEffect(() => {
        if (!isThinking) {
            setThinkingStep(0);
            return;
        }
        const interval = setInterval(() => {
            setThinkingStep(prev => (prev + 1) % 3);
        }, shouldReduceMotion ? 2400 : 1400);
        return () => clearInterval(interval);
    }, [isThinking, shouldReduceMotion]);

    const startThinkingIndicator = useCallback(() => {
        if (thinkingShowTimerRef.current) clearTimeout(thinkingShowTimerRef.current);
        if (thinkingHideTimerRef.current) clearTimeout(thinkingHideTimerRef.current);
        thinkingIsVisibleRef.current = false;

        if (shouldReduceMotion) {
            thinkingIsVisibleRef.current = true;
            thinkingVisibleSinceRef.current = Date.now();
            setIsThinking(true);
            return;
        }

        thinkingShowTimerRef.current = setTimeout(() => {
            thinkingIsVisibleRef.current = true;
            thinkingVisibleSinceRef.current = Date.now();
            setIsThinking(true);
        }, 220);
    }, [shouldReduceMotion]);

    const stopThinkingIndicator = useCallback(() => {
        if (thinkingShowTimerRef.current) {
            clearTimeout(thinkingShowTimerRef.current);
            thinkingShowTimerRef.current = null;
        }

        if (!thinkingIsVisibleRef.current) {
            setIsThinking(false);
            return Promise.resolve();
        }

        const minimumVisibleMs = shouldReduceMotion ? 0 : 520;
        const elapsed = Date.now() - thinkingVisibleSinceRef.current;
        const remaining = Math.max(0, minimumVisibleMs - elapsed);

        return new Promise<void>((resolve) => {
            thinkingHideTimerRef.current = setTimeout(() => {
                thinkingIsVisibleRef.current = false;
                setIsThinking(false);
                resolve();
            }, remaining);
        });
    }, [shouldReduceMotion]);

    const handleOnboardingComplete = (nickname: string, vibe: string) => {
        setShowOnboarding(false);
        let content = '';
        if (vibe === 'professional') {
            content = `Preferences saved. I will maintain a professional standard. How can I assist you, ${nickname}?`;
        } else if (vibe === 'active') {
            content = `LET'S GOOO! 🚀 Profile locked in ${nickname}! What are we smashing today?!`;
        } else {
            content = `Nice to meet you, ${nickname}! I'll keep things ${vibe}. Ready to code? ✨`;
        }

        setMessages(() => [{
            id: crypto.randomUUID(),
            role: 'assistant',
            content
        }]);
    };

    const startEditing = (m: Message) => {
        setEditingMessageId(m.id);
        setEditContent(m.content);
    };

    const submitEdit = async (index: number, newContent: string) => {
        if (!newContent.trim()) return;
        setEditingMessageId(null);

        const truncatedMessages = messages.slice(0, index);
        setMessages(truncatedMessages);

        try {
            await fetch('/api/ai/history', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messageIndex: index })
            });

            await handleSendMessageInternal(newContent);
        } catch {
        }
    };

    const isVisible = pathname?.startsWith('/paths') ||
        pathname?.startsWith('/learn') ||
        pathname?.startsWith('/leaderboard');

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
                    return;
                }
            }
        } catch {
        }
        setPinnedMemories([]);
    }, [activeTopic?.title, user?.email]);

    useEffect(() => {
        try {
            localStorage.setItem(memoryKeyRef.current, JSON.stringify(pinnedMemories.slice(0, 8)));
        } catch {
        }
    }, [pinnedMemories]);

    useEffect(() => {
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
                                content: `Hi ${(user.name || 'there').split(' ')[0]}! It's Maya. What are we hacking on today? 💻✨`
                            }]);
                        }
                    }
                    if (data.version) setModelVersion(data.version);
                })
                .catch(() => { });
        }
    }, [user, isVisible]);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }, [shouldReduceMotion]);

    const messagesRef = useRef<Message[]>([]);
    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            setShowPopup(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        scrollToBottom();
    }, [messages, isOpen, scrollToBottom]);

    useEffect(() => {
        if (!isOpen || isLoading) return;

        const timeoutId = setTimeout(() => inputRef.current?.focus(), 100);
        return () => clearTimeout(timeoutId);
    }, [isOpen, isLoading]);

    const handlePopupClick = () => {
        setIsOpen(true);
        setShowPopup(false);
    };

    const pinMemory = (text: string) => {
        const normalized = text.trim().replace(/\s+/g, ' ').slice(0, 220);
        if (!normalized) return;
        setPinnedMemories(prev => {
            if (prev.includes(normalized)) return prev;
            return [normalized, ...prev].slice(0, 8);
        });
    };

    const unpinMemory = (text: string) => {
        setPinnedMemories(prev => prev.filter(item => item !== text));
    };

    const postChatWithRetry = async (payload: Record<string, unknown>) => {
        const attempt = async () => fetch('/api/ai/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        let response = await attempt();
        if (!response.ok && response.status >= 500) {
            await new Promise(resolve => setTimeout(resolve, 500));
            response = await attempt();
        }
        return response;
    };

    const handleSendMessageInternal = async (overrideContent: string) => {
        if (!overrideContent.trim() || isLoading) return;

        const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: overrideContent };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue('');
        setIsLoading(true);
        setLastFailedInput(null);
        startThinkingIndicator();
        const requestStartedAt = Date.now();
        trackEvent('maya_message_sent', {
            hasActiveTopic: !!activeTopic?.title,
            memoryScope,
            pinnedCount: pinnedMemories.length,
            aiMode
        });

        try {
            const weaknessSignals = collectWeaknessSignals(topics, activeTopic?.category);
            const weaknesses = getWeakTopicNames(weaknessSignals, 6);

            const assistantId = crypto.randomUUID();

            const response = await postChatWithRetry({
                topicTitle: activeTopic?.title || 'General',
                userMessage: overrideContent,
                curriculum: activeTopic?.category || 'General',
                phase: activeTopic?.suggestedPhase,
                userMessageId: userMsg.id,
                assistantMessageId: assistantId,
                weaknesses,
                memoryScope,
                pinnedMemories,
                aiMode
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `API Error: ${response.status}`);
            }

            const reader = response.body?.getReader();
            if (!reader) throw new Error('No stream');

            setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

            let accumulatedContent = '';
            let lastUpdateTime = 0;
            let firstChunkHandled = false;

            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    if (value) {
                        if (!firstChunkHandled) {
                            firstChunkHandled = true;
                            await stopThinkingIndicator();
                        }
                        const chunk = new TextDecoder().decode(value);
                        accumulatedContent += chunk;

                        const now = Date.now();
                        if (now - lastUpdateTime > 30) {
                            setMessages((prev) => prev.map(m =>
                                m.id === assistantId ? { ...m, content: accumulatedContent } : m
                            ));
                            lastUpdateTime = now;
                        }
                    }
                }
                setMessages((prev) => prev.map(m =>
                    m.id === assistantId ? { ...m, content: accumulatedContent } : m
                ));
                const latencyMs = Date.now() - requestStartedAt;
                trackEvent('maya_response_completed', {
                    latencyMs,
                    chars: accumulatedContent.length,
                    sloTargetMs: SLO.mayaFirstResponseMs,
                    sloBreached: isSloBreached('mayaFirstResponseMs', latencyMs)
                });
            } catch {
                setMessages((prev) => prev.map(m =>
                    m.id === assistantId
                        ? { ...m, content: accumulatedContent + '\n\n[Connection drop. One sec...]' }
                        : m
                ));
            } finally {
                reader.releaseLock();
            }

        } catch (err: unknown) {
            const errMessage = err instanceof Error ? err.message : 'Unknown error';
            setLastFailedInput(overrideContent);
            trackEvent('maya_response_failed', {
                latencyMs: Date.now() - requestStartedAt,
                reason: errMessage.slice(0, 120)
            });
            setMessages((prev) => [...prev, {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: `*Sigh* Brain freeze. (${errMessage})`
            }]);
        } finally {
            await stopThinkingIndicator();
            setIsLoading(false);
        }
    };

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        handleSendMessageInternal(inputValue);
    };

    const clearChat = async () => {
        try {
            await fetch('/api/ai/history', { method: 'DELETE' });
            setMessages([{
                id: crypto.randomUUID(),
                role: 'assistant',
                content: "Memory wiped. Who are you again? Just kidding. Ready for a fresh start! ✨"
            }]);
        } catch {
        }
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (!user || !isVisible) return null;

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-4">
                        <AnimatePresence>
                            {showPopup && (
                                <motion.div
                                    initial={shouldReduceMotion ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 10, scale: 0.9 }}
                                    transition={{ duration: MOTION_MICRO }}
                                    onClick={() => handlePopupClick()}
                                    className="bg-white dark:bg-[#1C1C1E] px-4 py-2 rounded-xl shadow-xl border border-gray-100 dark:border-white/10 relative cursor-pointer hover:scale-105 transition-transform"
                                >
                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                        {popupMessage}
                                    </p>
                                    <div className="absolute top-1/2 -right-1 w-2 h-2 bg-white dark:bg-[#1C1C1E] transform rotate-45 -translate-y-1/2 border-r border-t border-gray-100 dark:border-white/10"></div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setShowPopup(false); }}
                                        className="absolute -top-1 -left-1 bg-gray-200 dark:bg-white/20 rounded-full p-0.5 hover:scale-110 transition-transform cursor-pointer"
                                        type="button"
                                        aria-label="Close Maya popup"
                                    >
                                        <svg className="w-2 h-2 text-gray-500 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            onClick={() => {
                                fetch('/api/user/preferences')
                                    .then(res => res.json())
                                    .then(data => {
                                        if (data.preferences && !data.preferences.introSeen) {
                                            setShowOnboarding(true);
                                            setIsOpen(true);
                                        } else {
                                            setIsOpen(true);
                                        }
                                    })
                                    .catch(() => setIsOpen(true));
                            }}
                            className="group relative flex items-center justify-center cursor-pointer"
                            initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                            type="button"
                            aria-label="Open Maya assistant"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl group-hover:bg-blue-500/40 transition-colors"
                            />
                            <div className="relative w-16 h-16 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex items-center justify-center overflow-hidden group-hover:border-white/40 transition-colors">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-50" />
                                <div className="relative z-10 flex items-center justify-center">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 dark:text-blue-400 drop-shadow-lg">
                                        <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="12" r="3" fill="currentColor" className="animate-pulse" />
                                    </svg>
                                </div>
                                <motion.div
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                                />
                            </div>
                        </motion.button>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/20 z-50 backdrop-blur-[1px]"
                        />

                        <motion.div
                            initial={shouldReduceMotion ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
                            transition={shouldReduceMotion ? { duration: 0.01 } : { type: "spring", stiffness: 350, damping: 30 }}
                            className="fixed z-[60] flex flex-col bg-white dark:bg-[#1C1C1E] border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden w-full h-[85vh] bottom-0 left-0 rounded-t-2xl sm:w-[600px] sm:h-[700px] sm:max-h-[85vh] sm:bottom-6 sm:right-6 sm:left-auto sm:rounded-2xl"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-md sticky top-0 z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white text-sm font-bold border border-white/10">
                                        <span className="scale-110">✨</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">Maya</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
                                            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
                                                {modelVersion || AI_CONFIG.VERSION}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={() => setShowClearConfirm(true)} title="Clear Memory" className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-gray-400 hover:text-red-400 transition-colors cursor-pointer" type="button" aria-label="Clear Maya memory">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                    <button
                                        onClick={() => setShowOnboarding(true)}
                                        title="Adjust Vibe"
                                        className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer"
                                        type="button"
                                        aria-label="Open Maya vibe settings"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                    </button>
                                    <div className="w-px h-6 bg-black/5 dark:bg-white/5 mx-1" />
                                    <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer" type="button" aria-label="Close Maya assistant">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            </div>

                            <div className="px-4 py-2 border-b border-black/5 dark:border-white/5 bg-white/60 dark:bg-[#1C1C1E]/60">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Memory</span>
                                    <button
                                        type="button"
                                        onClick={() => setMemoryScope('session')}
                                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${memoryScope === 'session' ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-transparent'}`}
                                    >
                                        Session
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setMemoryScope('topic')}
                                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${memoryScope === 'topic' ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-transparent'}`}
                                    >
                                        Topic
                                    </button>
                                    {pinnedMemories.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setPinnedMemories([])}
                                            className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-semibold bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-500/20"
                                        >
                                            Forget pinned
                                        </button>
                                    )}
                                </div>
                                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mr-1">Mode</span>
                                    {(['mentor', 'reviewer', 'interviewer', 'architect'] as const).map(mode => (
                                        <button
                                            key={mode}
                                            type="button"
                                            onClick={() => setAiMode(mode)}
                                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize transition-colors ${aiMode === mode ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-transparent'}`}
                                        >
                                            {mode}
                                        </button>
                                    ))}
                                </div>
                                {pinnedMemories.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                        {pinnedMemories.map(memory => (
                                            <div key={memory} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-500/20">
                                                <span className="text-[10px] text-emerald-800 dark:text-emerald-300 line-clamp-1">{memory}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => unpinMemory(memory)}
                                                    className="text-emerald-600/70 dark:text-emerald-300/70 hover:text-emerald-700 dark:hover:text-emerald-200"
                                                    aria-label="Remove pinned memory"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <AnimatePresence>
                                {showClearConfirm && (
                                    <motion.div
                                        initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                                        className="absolute inset-0 z-30 bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center rounded-xl"
                                    >
                                        <div className="w-12 h-12 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mb-4 text-2xl">
                                            🗑️
                                        </div>
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Clear History?</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-[200px]">
                                            This will wipe my memory of our current session.
                                        </p>
                                        <div className="flex gap-3 w-full">
                                            <button
                                                onClick={() => setShowClearConfirm(false)}
                                                className="flex-1 py-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg text-sm font-medium transition-colors text-gray-700 dark:text-gray-300"
                                                type="button"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => { clearChat(); setShowClearConfirm(false); }}
                                                className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors text-white"
                                                type="button"
                                            >
                                                Yes, clear it
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence mode="wait">
                                {showOnboarding ? (
                                    <motion.div
                                        key="onboarding"
                                        initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                                        transition={{ duration: MOTION_SWAP }}
                                        className="flex-1 bg-[#F9F9FB] dark:bg-[#111111] overflow-hidden"
                                    >
                                        <MayaOnboarding onComplete={handleOnboardingComplete} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="chat"
                                        initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                                        transition={{ duration: MOTION_SWAP }}
                                        className="flex-1 flex flex-col h-full bg-[#F9F9FB] dark:bg-[#111111] overflow-hidden"
                                    >
                                        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#F9F9FB] dark:bg-[#111111] custom-scrollbar">
                                            {messages.map((m: Message, idx: number) => {
                                                const isUser = m.role === 'user';
                                                const isEditing = editingMessageId === m.id;

                                                return (
                                                    <motion.div
                                                        key={m.id}
                                                        layout
                                                        initial={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                                                        transition={{ duration: MOTION_MICRO }}
                                                        className={`flex gap-3 group ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                                                    >
                                                        <div className={`flex flex-col gap-0 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                                                            <div className={`relative rounded-2xl px-4 py-3 text-sm leading-relaxed break-words overflow-hidden ${isUser
                                                                ? 'bg-black dark:bg-white text-white dark:text-black shadow-xl font-medium'
                                                                : 'bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 text-gray-900 dark:text-gray-100'
                                                                }`}>

                                                                {isEditing ? (
                                                                    <div className="flex flex-col gap-2 min-w-[200px]">
                                                                        <textarea
                                                                            value={editContent}
                                                                            onChange={(e) => setEditContent(e.target.value)}
                                                                            className="w-full bg-white/10 text-white rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-white/30 resize-none"
                                                                            rows={Math.max(2, Math.ceil(editContent.length / 30))}
                                                                            autoFocus
                                                                        />
                                                                        <div className="flex justify-end gap-2">
                                                                            <button
                                                                                onClick={() => setEditingMessageId(null)}
                                                                                className="px-2 py-1 text-xs text-blue-100 hover:text-white"
                                                                                type="button"
                                                                            >
                                                                                Cancel
                                                                            </button>
                                                                            <button
                                                                                onClick={() => submitEdit(idx, editContent)}
                                                                                className="px-2 py-1 text-xs bg-white text-blue-600 rounded font-medium shadow-sm"
                                                                                type="button"
                                                                            >
                                                                                Save & Chat
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    isUser ? (
                                                                        <p className="whitespace-pre-wrap">{m.content}</p>
                                                                    ) : (
                                                                        <div className="max-w-none break-words">
                                                                            {!isUser && idx === messages.length - 1 && isLoading ? (
                                                                                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                                                                                    <LoadingSpinner size="sm" />
                                                                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium animate-pulse">
                                                                                        Generating response...
                                                                                    </span>
                                                                                </div>
                                                                            ) : (
                                                                                <AIExplanationView
                                                                                    content={m.content}
                                                                                    loading={false}
                                                                                    error={null}
                                                                                    onRegenerate={() => { }}
                                                                                    category={activeTopic?.category || 'General'}
                                                                                    compact
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>

                                                            {!isEditing && (
                                                                <div className={`flex items-center gap-1 transition-opacity opacity-0 group-hover:opacity-100 ${isUser ? 'flex-row-reverse' : ''}`}>
                                                                    <button
                                                                        onClick={() => copyToClipboard(m.content, m.id)}
                                                                        className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                                                        title="Copy message"
                                                                        type="button"
                                                                    >
                                                                        {copiedId === m.id ? (
                                                                            <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                                        ) : (
                                                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                                                        )}
                                                                    </button>

                                                                    {isUser && (
                                                                        <button
                                                                            onClick={() => startEditing(m)}
                                                                            className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                                                            title="Edit message"
                                                                            type="button"
                                                                        >
                                                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                                        </button>
                                                                    )}

                                                                    <button
                                                                        onClick={() => pinnedMemories.includes(m.content.trim().replace(/\s+/g, ' ').slice(0, 220)) ? unpinMemory(m.content.trim().replace(/\s+/g, ' ').slice(0, 220)) : pinMemory(m.content)}
                                                                        className="p-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                                                                        title="Pin to memory"
                                                                        type="button"
                                                                    >
                                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 14M9 7l8 8m-6 6v-6m0 0l-4 4m4-4l4 4" /></svg>
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}

                                            {isThinking && (
                                                <motion.div
                                                    initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                                                    transition={{ duration: MOTION_MICRO }}
                                                    className="flex justify-start px-4"
                                                >
                                                    <div className="inline-flex items-center gap-2.5 rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] px-3 py-2 shadow-sm">
                                                        <motion.span
                                                            animate={shouldReduceMotion ? { opacity: 1 } : { rotate: [0, -10, 10, 0] }}
                                                            transition={shouldReduceMotion ? { duration: 0.01 } : { repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                                                            className="text-xs"
                                                        >
                                                            ✨
                                                        </motion.span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                                            {thinkingStep === 0 && 'Analyzing context'}
                                                            {thinkingStep === 1 && 'Planning response'}
                                                            {thinkingStep === 2 && 'Drafting answer'}
                                                        </span>
                                                        <div className="flex gap-1">
                                                            <motion.div
                                                                animate={shouldReduceMotion ? { opacity: 1 } : { y: [0, -2, 0], opacity: [0.4, 1, 0.4] }}
                                                                transition={shouldReduceMotion ? { duration: 0.01 } : { repeat: Infinity, duration: 0.9 }}
                                                                className="w-1.5 h-1.5 bg-emerald-500/80 rounded-full"
                                                            />
                                                            <motion.div
                                                                animate={shouldReduceMotion ? { opacity: 1 } : { y: [0, -2, 0], opacity: [0.4, 1, 0.4] }}
                                                                transition={shouldReduceMotion ? { duration: 0.01 } : { repeat: Infinity, duration: 0.9, delay: 0.15 }}
                                                                className="w-1.5 h-1.5 bg-emerald-500/80 rounded-full"
                                                            />
                                                            <motion.div
                                                                animate={shouldReduceMotion ? { opacity: 1 } : { y: [0, -2, 0], opacity: [0.4, 1, 0.4] }}
                                                                transition={shouldReduceMotion ? { duration: 0.01 } : { repeat: Infinity, duration: 0.9, delay: 0.3 }}
                                                                className="w-1.5 h-1.5 bg-emerald-500/80 rounded-full"
                                                            />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                            <div ref={messagesEndRef} />
                                        </div>

                                        <div className="p-3 sm:p-4 bg-white/50 dark:bg-[#1C1C1E]/50 backdrop-blur-md border-t border-black/5 dark:border-white/5 shrink-0">
                                            {lastFailedInput && !isLoading && (
                                                <div className="mb-2 flex items-center justify-between rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200/70 dark:border-amber-500/20 px-3 py-2">
                                                    <span className="text-[11px] text-amber-700 dark:text-amber-300">Last send failed. Retry with one tap.</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSendMessageInternal(lastFailedInput)}
                                                        className="px-2.5 py-1 text-[11px] rounded-full bg-amber-600 text-white font-semibold"
                                                    >
                                                        Retry
                                                    </button>
                                                </div>
                                            )}
                                            <form onSubmit={handleSendMessage} className="relative">
                                                <div className="relative flex items-center bg-white dark:bg-black axiom-input-shell rounded-2xl px-2 py-2 focus-within:shadow-xl transition-all duration-300">
                                                    <textarea
                                                        ref={(el) => {
                                                            if (el) {
                                                                inputRef.current = el;
                                                                el.style.height = 'auto';
                                                                el.style.height = el.scrollHeight + 'px';
                                                            }
                                                        }}
                                                        value={inputValue}
                                                        onChange={(e) => {
                                                            setInputValue(e.target.value);
                                                            e.target.style.height = 'auto';
                                                            e.target.style.height = e.target.scrollHeight + 'px';
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                                e.preventDefault();
                                                                handleSendMessage(e);
                                                            }
                                                        }}
                                                        placeholder={showOnboarding ? "Finish setup first..." : "Type a message..."}
                                                        className="flex-1 bg-transparent border-0 axiom-input-control text-sm text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2 resize-none max-h-32 overflow-y-auto custom-scrollbar font-medium"
                                                        rows={1}
                                                        disabled={isLoading || showOnboarding}
                                                    />
                                                    <div className="flex items-center gap-2 self-end mb-1 mr-1">
                                                        <button
                                                            type="submit"
                                                            disabled={!inputValue.trim() || isLoading}
                                                            className="w-10 h-10 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black rounded-xl disabled:opacity-0 disabled:scale-75 transition-all shadow-lg"
                                                        >
                                                            <svg className="w-5 h-5 translate-x-[0.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" /></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
