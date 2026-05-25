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

    const handleInjectMemory = (memoryText: string) => {
        setInputValue(prev => {
            const trimmed = prev.trim();
            if (!trimmed) return `Referencing: "${memoryText}" - `;
            return `${prev}\n\nReferencing Core Memory: "${memoryText}"`;
        });
        inputRef.current?.focus();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Dark glass backdrop overlay */}
            <div 
                className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in" 
                onClick={onClose} 
            />
            
            {/* Cinematic Side HUD Panel */}
            <div 
                className={cn(
                    "fixed right-0 top-0 bottom-0 z-[200] w-full sm:w-[420px]",
                    "glass-panel border-l border-white/[0.06] bg-black/75 backdrop-blur-3xl",
                    "flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.9)] animate-in slide-in-from-right duration-300"
                )}
            >
                {/* Cyber Scanline Grid Overlay */}
                <div className="absolute inset-0 cyber-grid-bg opacity-[0.02] pointer-events-none" />
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)]/20 to-transparent top-0 animate-[cyber-scan_6s_ease-in-out_infinite] pointer-events-none blur-sm" />

                {/* Floating HUD Header */}
                <header className="px-6 py-4.5 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01] relative z-10 select-none">
                    <div className="flex items-center gap-3.5">
                        {/* Interactive Holographic Avatar */}
                        <div className="relative w-9 h-9 rounded-xl border border-white/10 bg-black/40 flex items-center justify-center overflow-hidden group">
                            <div className="absolute inset-0.5 rounded-lg border border-dashed border-[var(--color-cyan)]/30 animate-[spin_10s_linear_infinite]" />
                            <div className="w-2 h-2 rounded-full bg-[var(--color-cyan)] shadow-[0_0_8px_var(--color-cyan)] animate-pulse" />
                        </div>
                        
                        <div>
                            <div className="flex items-center gap-1.5">
                                <h3 className="text-sm font-black tracking-widest uppercase text-white font-display">MAYA SENSEI</h3>
                                <span className="font-mono text-[7px] bg-white/[0.04] text-[var(--fg-secondary)] px-1 py-0.5 rounded border border-white/[0.08]">[ LLAMA-3.3-70B ]</span>
                            </div>
                            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-primary)] filter drop-shadow-[0_0_4px_rgba(10,132,255,0.3)] mt-0.5">
                                {activeTopic?.title || 'System Core'}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex gap-1.5">
                        <button 
                            onClick={onClearHistory}
                            className="p-2 rounded-xl text-[var(--fg-secondary)] hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer border border-transparent hover:border-red-500/10"
                            title="Purge Memory Logs"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        <button 
                            onClick={onClose}
                            className="p-2 rounded-xl text-[var(--fg-secondary)] hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer border border-transparent hover:border-white/[0.08]"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Core Pinned Memories Dashboard - Click to Inject */}
                {pinnedMemories.length > 0 && (
                    <div className="px-6 py-2.5 border-b border-white/[0.04] bg-white/[0.005] select-none z-10 flex flex-col gap-1.5">
                        <span className="text-[7.5px] font-black tracking-widest text-[var(--fg-secondary)] uppercase">CORE MEMORY SYNAPSE (CLICK TO INJECT)</span>
                        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1 text-[9px] font-bold">
                            {pinnedMemories.map((m, idx) => {
                                const display = m.length > 30 ? `${m.slice(0, 30)}...` : m;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleInjectMemory(m)}
                                        className="shrink-0 px-2.5 py-1 rounded-lg border border-white/[0.05] hover:border-[var(--color-cyan)]/30 bg-white/[0.01] text-[var(--fg-secondary)] hover:text-white transition-all cursor-pointer select-none"
                                    >
                                        🧠 {display}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Chat Scroll Panel */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-transparent to-black/10 custom-scrollbar relative z-10">
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
                        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] w-fit shadow-md animate-pulse">
                            <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                                <div className="absolute inset-0 border-[1.5px] border-t-[var(--color-primary)] border-b-[var(--color-cyan)] rounded-full animate-spin" />
                            </div>
                            <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-primary)] filter drop-shadow-[0_0_3px_rgba(10,132,255,0.4)]">
                                {thinkingStages[thinkingStep] || 'PROBING COGNITIVE CHANNELS...'}
                            </span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Glass Keyboard Input Tray */}
                <form onSubmit={handleSubmit} className="p-5 border-t border-white/[0.05] bg-white/[0.01] relative z-10">
                    <div className="relative rounded-2xl border border-white/[0.05] bg-black/40 focus-within:border-[var(--color-primary)]/40 focus-within:shadow-[0_0_25px_rgba(10,132,255,0.15)] transition-all duration-300 overflow-hidden">
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
                            placeholder="Ask Maya Sensei a query..."
                            className="w-full min-h-[50px] max-h-36 p-4 pb-10 bg-transparent text-sm outline-none resize-none placeholder:text-white/20 text-white leading-relaxed font-medium"
                        />
                        
                        <div className="absolute bottom-3 left-4 flex items-center gap-2 select-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse shadow-[0_0_8px_var(--color-success)]" />
                            <span className="font-mono text-[8px] font-black tracking-widest text-[var(--fg-secondary)]">ONLINE</span>
                        </div>
                        
                        <div className="absolute bottom-2.5 right-3.5">
                            <button 
                                type="submit" 
                                disabled={!inputValue.trim() || isLoading}
                                className={cn(
                                    "p-1.5 rounded-xl text-white transition-all cursor-pointer border border-transparent shadow-md",
                                    inputValue.trim() && !isLoading
                                        ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)] shadow-[0_0_12px_rgba(10,132,255,0.3)] hover:scale-105"
                                        : "bg-white/[0.02] text-white/20 border-white/[0.04] opacity-35 cursor-not-allowed"
                                )}
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
