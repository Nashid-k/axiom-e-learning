'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AIExplanationView } from './AIExplanationView';
import { ModalCloseButton } from '@/components/ui/ModalShell';

interface ChatMessage {
    id?: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
}

interface ChatThreadProps {
    messages: ChatMessage[];
    persona: 'general' | 'buddy';
    category: string;
    isChatActive: boolean;
    setIsChatActive: (active: boolean) => void;
    followUpInput: string;
    setFollowUpInput: (input: string) => void;
    onSendFollowUp: (e?: React.FormEvent) => void;
    loadingAI: boolean;
}

export function ChatThread({
    messages,
    persona,
    category,
    isChatActive,
    setIsChatActive,
    followUpInput,
    setFollowUpInput,
    onSendFollowUp,
    loadingAI,
}: ChatThreadProps) {
    const chatEndRef = useRef<HTMLDivElement>(null);
    const chatInputRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.length]);
    useEffect(() => {
        if (isChatActive) {
            const timeoutId = setTimeout(() => chatInputRef.current?.focus(), 100);
            return () => clearTimeout(timeoutId);
        }
    }, [isChatActive]);

    return (
        <>
            <div className="space-y-6 mt-8 mb-14">
                {messages.map((msg, idx) => {
                    const isUser = msg.role === 'user';
                    return (
                        <div
                            key={msg.id ?? `${msg.role}-${idx}`}
                            className={cn(
                                "p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden",
                                isUser
                                    ? "bg-gradient-to-br from-[var(--surface-raised)] to-transparent border-white/5 hover:border-[var(--color-primary)]/20 ml-12 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                                    : "glass-panel border-white/5 mr-12 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                            )}
                        >
                            {/* Inner ambient glow for Maya's bubble */}
                            {!isUser && (
                                <div className="absolute -left-16 -top-16 w-32 h-32 bg-[var(--color-cyan)]/5 blur-2xl rounded-full pointer-events-none" />
                            )}

                            <div className="flex items-center gap-3 mb-4 relative z-10">
                                <div className={cn(
                                    "w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg transition-transform hover:scale-110",
                                    isUser 
                                        ? "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-cyan)] text-white shadow-[0_0_10px_rgba(99,102,241,0.3)]" 
                                        : "bg-white/5 border border-white/10"
                                )}>
                                    {isUser ? '👤' : (persona === 'general' ? '🎭' : '✨')}
                                </div>
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-[0.2em]",
                                    isUser ? "text-[var(--color-cyan)]" : "text-gradient-primary"
                                )}>
                                    {isUser ? 'YOU' : 'MAYA ARCHIVE'}
                                </span>
                            </div>
                            <div className="relative z-10">
                                <AIExplanationView
                                    content={msg.content}
                                    loading={false}
                                    error={null}
                                    onRegenerate={() => { }}
                                    persona={persona}
                                    category={category}
                                    compact
                                />
                            </div>
                        </div>
                    );
                })}
                <div ref={chatEndRef} />
            </div>
            {!loadingAI && isChatActive && (
                <div
                    className="mt-10 sticky bottom-0 pb-5 pt-3 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)] to-transparent z-10"
                >
                    <form
                        onSubmit={onSendFollowUp}
                        className="relative flex items-center bg-gradient-to-r from-[var(--surface-raised)] to-transparent border border-white/5 hover:border-[var(--color-primary)]/30 rounded-xl px-4 py-2.5 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] group/input"
                    >
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--color-primary)]/5 to-transparent opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
                        
                        <ModalCloseButton
                            onClose={() => setIsChatActive(false)}
                            className="bg-transparent border-0 w-8 h-8 rounded-lg min-h-0 text-[var(--fg-secondary)] hover:text-red-400 hover:bg-red-500/10 mr-1 z-10 transition-colors"
                        />
                        <textarea
                            ref={chatInputRef}
                            value={followUpInput}
                            onChange={(e) => {
                                setFollowUpInput(e.target.value);
                                e.target.style.height = 'auto';
                                e.target.style.height = e.target.scrollHeight + 'px';
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    onSendFollowUp();
                                }
                            }}
                            placeholder="Ask Maya a follow-up..."
                            className="flex-1 bg-transparent border-0 axiom-input-control text-sm text-white placeholder-[var(--fg-muted)] px-3 py-2.5 resize-none max-h-32 overflow-y-auto custom-scrollbar font-medium focus:outline-none z-10"
                            rows={1}
                            disabled={loadingAI}
                        />
                        <button
                            type="submit"
                            disabled={!followUpInput.trim() || loadingAI}
                            className={cn(
                                "w-10 h-10 flex items-center justify-center rounded-xl transition-all shadow-lg shrink-0 z-10 cursor-pointer",
                                "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-cyan)] text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:brightness-110 active:scale-95",
                                (!followUpInput.trim() || loadingAI) && "opacity-0 scale-75 pointer-events-none"
                            )}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

