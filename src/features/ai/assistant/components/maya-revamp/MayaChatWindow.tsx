'use client';

import { useRef, useEffect, useState } from 'react';
import { Message } from '../../types';
import { MayaMessage } from './MayaMessage';

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
            messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
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
            <div className="fixed inset-0 z-[90] bg-black/20 dark:bg-black/40" onClick={onClose} />
            
            <div className="fixed right-0 top-0 bottom-0 z-[100] w-full sm:w-[400px] bg-white dark:bg-black border-l border-neutral-200 dark:border-neutral-800 flex flex-col shadow-none transition-none">
                <header className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-white dark:bg-black">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold">AI</div>
                        <div>
                            <h3 className="text-sm font-bold">Maya Assistant</h3>
                            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                                {activeTopic?.title || 'General Chat'}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <button 
                            onClick={onClearHistory}
                            className="p-2 text-neutral-400 hover:text-red-500 transition-none"
                            title="Clear History"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        <button 
                            onClick={onClose}
                            className="p-2 text-neutral-400 hover:text-black dark:hover:text-white transition-none"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
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
                        <div className="text-xs font-bold uppercase tracking-widest text-brand-500 animate-pulse">
                            {thinkingStages[thinkingStep] || 'Thinking...'}
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
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
                        placeholder="Ask Maya..."
                        className="w-full min-h-[44px] max-h-32 p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md text-sm outline-none focus:border-neutral-400 dark:focus:border-neutral-600 resize-none transition-none"
                    />
                    <div className="mt-2 flex justify-between items-center">
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-tighter">Shift+Enter for newline</p>
                        <button 
                            type="submit" 
                            disabled={!inputValue.trim() || isLoading}
                            className="text-xs font-bold uppercase tracking-widest text-brand-500 disabled:text-neutral-300 dark:disabled:text-neutral-700"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
