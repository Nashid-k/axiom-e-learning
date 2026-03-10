'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Message } from '../../types';
import { MayaMessage } from './MayaMessage';
import { AI_CONFIG } from '@/lib/config/app';

interface MayaChatWindowProps {
    isOpen: boolean;
    onClose: () => void;
    messages: Message[];
    isLoading: boolean;
    isThinking: boolean;
    thinkingStep: number;
    onSendMessage: (content: string) => void;
    onClearHistory: () => void;
    onPinMemory: (text: string) => void;
    onUnpinMemory: (text: string) => void;
    pinnedMemories: string[];
    aiMode: 'mentor' | 'reviewer' | 'interviewer' | 'architect';
    setAiMode: (mode: 'mentor' | 'reviewer' | 'interviewer' | 'architect') => void;
    memoryScope: 'session' | 'topic';
    setMemoryScope: (scope: 'session' | 'topic') => void;
    user: any;
    activeTopic: any;
    shouldReduceMotion: boolean;
    modelVersion: string;
}

export function MayaChatWindow({
    isOpen,
    onClose,
    messages,
    isLoading,
    isThinking,
    thinkingStep,
    onSendMessage,
    onClearHistory,
    onPinMemory,
    onUnpinMemory,
    pinnedMemories,
    aiMode,
    setAiMode,
    memoryScope,
    setMemoryScope,
    user,
    activeTopic,
    shouldReduceMotion,
    modelVersion
}: MayaChatWindowProps) {
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    useEffect(() => {
        if (isOpen && !shouldReduceMotion) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen, shouldReduceMotion]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isLoading) return;
        onSendMessage(inputValue);
        setInputValue('');
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 z-[90] backdrop-blur-[2px]"
                    />

                    {/* Chat Window */}
                    <motion.div
                        initial={shouldReduceMotion ? { opacity: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={shouldReduceMotion ? { opacity: 0, scale: 0.98 } : { opacity: 0, y: 20, scale: 0.98, filter: 'blur(5px)' }}
                        transition={{ type: "spring", stiffness: 400, damping: 32, mass: 1 }}
                        className="fixed z-[100] flex flex-col bg-white/90 dark:bg-[#0D0D0E]/90 border-t sm:border border-white/20 dark:border-white/10 shadow-[0_32px_128px_-20px_rgba(0,0,0,0.5)] w-full h-[94vh] sm:h-[780px] bottom-0 left-0 rounded-t-[32px] sm:w-[520px] sm:max-h-[92vh] sm:bottom-6 sm:right-6 sm:left-auto sm:rounded-[32px] overflow-hidden backdrop-blur-3xl transform-gpu translate-z-0"
                    >
                        {/* Premium Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 relative z-20">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-xl shadow-blue-500/20 text-white text-xl border border-white/20">
                                        ✨
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[var(--surface-base)] shadow-sm animate-pulse" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-black text-[var(--fg-primary)] text-lg leading-none mb-1">Maya</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.15em]">Live</span>
                                        <span className="text-[10px] text-[var(--fg-muted)] opacity-50 font-bold">•</span>
                                        <span className="text-[10px] text-[var(--fg-muted)] font-black uppercase tracking-tight">{modelVersion || AI_CONFIG.VERSION}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowClearConfirm(true)}
                                    className="p-2.5 rounded-2xl hover:bg-red-500/10 text-[var(--fg-muted)] hover:text-red-500 transition-all active:scale-95"
                                    title="Clear"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2.5 rounded-2xl hover:bg-white/10 text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-all active:scale-95"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Staggered Controls Overlay */}
                        <div className="px-5 py-3 border-b border-white/5 bg-black/5 flex flex-col gap-2.5">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--fg-muted)] mr-1">Core</span>
                                {(['session', 'topic'] as const).map(scope => (
                                    <button
                                        key={scope}
                                        onClick={() => setMemoryScope(scope)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 border ${memoryScope === scope ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30' : 'bg-transparent text-[var(--fg-muted)] border-transparent hover:bg-white/5'}`}
                                    >
                                        {scope}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--fg-muted)] mr-1">Vibe</span>
                                {(['mentor', 'reviewer', 'interviewer', 'architect'] as const).map(mode => (
                                    <button
                                        key={mode}
                                        onClick={() => setAiMode(mode)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 border ${aiMode === mode ? 'bg-blue-500/15 text-blue-600 border-blue-500/30 shadow-lg shadow-blue-500/10' : 'bg-transparent text-[var(--fg-muted)] border-transparent hover:bg-white/5'}`}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Message List */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-0 py-6 space-y-8 bg-transparent relative z-10">
                            {messages.map((m, idx) => (
                                <MayaMessage
                                    key={m.id}
                                    message={m}
                                    isLast={idx === messages.length - 1}
                                    isLoading={isLoading}
                                    onCopy={(text, id) => navigator.clipboard.writeText(text)}
                                    onPin={onPinMemory}
                                    isPinned={pinnedMemories.includes(m.content.trim().slice(0, 220))}
                                    shouldReduceMotion={shouldReduceMotion}
                                    activeCategory={activeTopic?.category || 'General'}
                                />
                            ))}
                            {isThinking && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="px-6 flex items-center gap-3"
                                >
                                    <div className="flex gap-1">
                                        {[0, 1, 2].map(i => (
                                            <motion.div
                                                key={i}
                                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                                className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest animate-pulse">
                                        {thinkingStep === 0 ? "Analyzing" : thinkingStep === 1 ? "Planning" : "Drafting"}
                                    </span>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Premium Input Bar */}
                        <div className="p-5 bg-gradient-to-t from-black/20 to-transparent backdrop-blur-3xl border-t border-white/5 relative z-20">
                            <form onSubmit={handleSubmit} className="relative group/form">
                                <div className="relative flex items-end bg-[var(--surface-raised)]/80 dark:bg-black/40 rounded-[28px] p-2 border border-white/10 focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/5 transition-all duration-500">
                                    <textarea
                                        ref={inputRef}
                                        value={inputValue}
                                        onChange={(e) => {
                                            setInputValue(e.target.value);
                                            e.target.style.height = 'auto';
                                            e.target.style.height = Math.min(e.target.scrollHeight, 180) + 'px';
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSubmit();
                                            }
                                        }}
                                        placeholder="Message Maya..."
                                        className="flex-1 bg-transparent border-0 text-sm py-3 px-4 resize-none max-h-[180px] font-medium focus:ring-0 leading-relaxed text-[var(--fg-primary)] placeholder-[var(--fg-muted)]/50"
                                        rows={1}
                                    />
                                    <div className="pr-1 pb-1">
                                        <button
                                            type="submit"
                                            disabled={!inputValue.trim() || isLoading}
                                            className="w-11 h-11 flex items-center justify-center bg-blue-600 text-white rounded-full transition-all duration-500 shadow-xl shadow-blue-600/20 disabled:opacity-0 disabled:scale-75 disabled:translate-y-4 hover:scale-105 active:scale-95"
                                        >
                                            {isLoading ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <svg className="w-5 h-5 -rotate-45 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Clear Confirm Modal */}
                        <AnimatePresence>
                            {showClearConfirm && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-[110] bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center"
                                >
                                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6 text-3xl shadow-2xl shadow-red-500/20">
                                        🗑️
                                    </div>
                                    <h4 className="font-black text-white text-xl mb-3">Wipe Memory?</h4>
                                    <p className="text-sm text-gray-300 mb-8 max-w-[240px] leading-relaxed">
                                        This will permanently clear our current session history.
                                    </p>
                                    <div className="flex flex-col gap-3 w-full">
                                        <button
                                            onClick={() => { onClearHistory(); setShowClearConfirm(false); }}
                                            className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-2xl text-sm font-black uppercase tracking-widest transition-all text-white shadow-lg active:scale-95"
                                        >
                                            Yes, clear it
                                        </button>
                                        <button
                                            onClick={() => setShowClearConfirm(false)}
                                            className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-black uppercase tracking-widest transition-all text-white active:scale-95"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
