"use client";

import { useRef, useEffect, useState } from 'react';
import { Message } from '../../types';
import { MayaMessage } from './MayaMessage';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

interface MayaActiveTopic {
    title?: string;
    category?: string;
}

interface MayaChatWindowProps {
    isOpen: boolean;
    onClose: () => void;
    messages: Message[];
    isLoading: boolean;
    isThinking: boolean;
    thinkingStep: number;
    thinkingStages: string[];
    onSendMessage: (content: string) => void;
    onClearHistory: () => void;
    onPinMemory: (text: string) => void;
    pinnedMemories: string[];
    activeTopic?: MayaActiveTopic | null;
}

export function MayaChatWindow({
    isOpen,
    onClose,
    messages,
    isLoading,
    isThinking,
    thinkingStep,
    thinkingStages,
    onSendMessage,
    onClearHistory,
    onPinMemory,
    pinnedMemories,
    activeTopic,
}: MayaChatWindowProps) {
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isLoading) return;
        onSendMessage(inputValue);
        setInputValue('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm" 
                        onClick={onClose} 
                    />
                    
                    <motion.div 
                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-4 top-4 bottom-4 z-[200] w-[95%] sm:w-[450px] glass-card rounded-[32px] flex flex-col shadow-2xl overflow-hidden"
                    >
                        <header className="p-6 pb-4 border-b border-surface-border flex justify-between items-center bg-brand-soft/20">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-2xl bg-brand flex items-center justify-center text-white text-lg font-black shadow-lg shadow-brand/30">M</div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success border-4 border-surface-raised" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black tracking-tight">Maya Assistant</h3>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand">
                                        {activeTopic?.title || 'Neural Interface'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={onClearHistory}
                                    className="p-2.5 rounded-xl text-fg-muted hover:text-accent hover:bg-accent/10 transition-all"
                                    title="Reset History"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                                <button 
                                    onClick={onClose}
                                    className="p-2.5 rounded-xl text-fg-muted hover:text-fg-primary hover:bg-fg-primary/10 transition-all"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </header>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar bg-surface-base/30">
                            {messages.map((m) => (
                                <MayaMessage
                                    key={m.id}
                                    message={m}
                                    isLast={false}
                                    isLoading={isLoading}
                                    onCopy={(t) => navigator.clipboard.writeText(t)}
                                    onPin={onPinMemory}
                                    isPinned={pinnedMemories.includes(m.content.trim().slice(0, 220))}
                                    activeCategory={activeTopic?.category || 'General'}
                                />
                            ))}
                            {isThinking && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 px-4 py-2 rounded-xl bg-brand/5 border border-brand/10 w-fit"
                                >
                                    <div className="flex gap-1">
                                        {[0, 1, 2].map((i) => (
                                            <motion.div 
                                                key={i}
                                                className="w-1 h-1 bg-brand rounded-full"
                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-brand">
                                        {thinkingStages[thinkingStep] || 'SYNCHRONIZING...'}
                                    </span>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 pt-4 border-t border-surface-border bg-surface-raised/50 backdrop-blur-xl">
                            <div className="relative">
                                <textarea
                                    ref={inputRef}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit();
                                        }
                                    }}
                                    placeholder="Neural input..."
                                    className="w-full min-h-[56px] max-h-40 p-4 pb-12 glass-card rounded-2xl text-sm font-medium outline-none border-brand/0 focus:border-brand/40 shadow-inner resize-none transition-all placeholder:text-fg-muted"
                                />
                                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-fg-muted">MAYA ONLINE</span>
                                </div>
                                <div className="absolute bottom-3 right-3 flex items-center gap-4">
                                    <span className="hidden sm:block text-[8px] font-black uppercase tracking-[0.1em] text-fg-muted opacity-50">CMD+ENTER TO SEND</span>
                                    <button 
                                        type="submit" 
                                        disabled={!inputValue.trim() || isLoading}
                                        className="p-2 rounded-xl bg-brand text-white shadow-lg shadow-brand/20 disabled:opacity-30 disabled:grayscale transition-all hover:scale-105 active:scale-95"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="rotate-45">
                                            <path d="M12 19L12 5M5 12l7-7 7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
