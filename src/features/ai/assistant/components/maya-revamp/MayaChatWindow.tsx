"use client";

import { useRef, useEffect, useState } from 'react';
import { Message } from '../../types';
import { MayaMessage } from './MayaMessage';
import { cn } from '@/lib/utils';

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

    if (!isOpen) return null;

    return (
        <>
            <div 
                className="fixed inset-0 z-[150] bg-black/20 transition-opacity" 
                onClick={onClose} 
            />
            
            <div 
                className={cn(
                    "fixed right-0 top-0 bottom-0 z-[200] w-full sm:w-[400px]",
                    "bg-[var(--surface-base)] border-l border-[var(--surface-border)]",
                    "flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
                )}
            >
                <header className="px-6 py-4 border-b border-[var(--surface-border)] flex justify-between items-center bg-[var(--surface-raised)]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-[var(--color-primary)] flex items-center justify-center text-white text-xs font-bold">M</div>
                        <div>
                            <h3 className="text-sm font-bold tracking-tight text-[var(--fg-primary)]">Assistant</h3>
                            <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-primary)]">
                                {activeTopic?.title || 'General'}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <button 
                            onClick={onClearHistory}
                            className="p-2 rounded-md text-[var(--fg-muted)] hover:text-red-500 hover:bg-red-500/5 transition-colors"
                            title="Reset History"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        <button 
                            onClick={onClose}
                            className="p-2 rounded-md text-[var(--fg-muted)] hover:text-[var(--fg-primary)] hover:bg-[var(--surface-border)] transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[var(--surface-base)]">
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
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--surface-raised)] border border-[var(--surface-border)] w-fit">
                            <div className="flex gap-1">
                                <div className="w-1 h-1 bg-[var(--color-primary)] rounded-full animate-pulse" />
                                <div className="w-1 h-1 bg-[var(--color-primary)] rounded-full animate-pulse delay-75" />
                                <div className="w-1 h-1 bg-[var(--color-primary)] rounded-full animate-pulse delay-150" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                                {thinkingStages[thinkingStep] || 'THINKING...'}
                            </span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--surface-border)] bg-[var(--surface-raised)]">
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
                            placeholder="Type a message..."
                            className="w-full min-h-[44px] max-h-32 p-3 pb-8 bg-[var(--surface-base)] border border-[var(--surface-border)] rounded-md text-sm outline-none focus:border-[var(--color-primary)] transition-colors resize-none placeholder:text-[var(--fg-muted)] text-[var(--fg-primary)]"
                        />
                        <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span className="text-[9px] font-bold text-[var(--fg-muted)]">ONLINE</span>
                        </div>
                        <div className="absolute bottom-2 right-2">
                            <button 
                                type="submit" 
                                disabled={!inputValue.trim() || isLoading}
                                className="p-1.5 rounded-md bg-[var(--color-primary)] text-white disabled:opacity-30 transition-all hover:opacity-90"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
