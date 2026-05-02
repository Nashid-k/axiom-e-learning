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
            <div className="space-y-4 mt-8 mb-14">
                {messages.map((msg, idx) => (
                    <div
                        key={msg.id ?? `${msg.role}-${idx}`}
                        className={cn(
                            "p-4 sm:p-5 rounded-md border",
                            msg.role === 'user'
                                ? "bg-[var(--surface-raised)] border-[var(--surface-border)] ml-12"
                                : "bg-[var(--surface-base)] border-[var(--surface-border)] mr-12 shadow-sm"
                        )}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                                msg.role === 'user' ? "bg-[var(--color-primary)] text-white" : "bg-[var(--surface-raised)]"
                            )}>
                                {msg.role === 'user' ? '👤' : (persona === 'general' ? '🎭' : '✨')}
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest opacity-40">
                                {msg.role === 'user' ? 'YOU' : 'MAYA'}
                            </span>
                        </div>
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
                ))}
                <div ref={chatEndRef} />
            </div>
            {!loadingAI && isChatActive && (
                <div
                    className="mt-10 sticky bottom-0 pb-5 pt-3 bg-gradient-to-t from-[var(--surface-base)] via-[var(--surface-base)] to-transparent z-10"
                >
                    <form
                        onSubmit={onSendFollowUp}
                        className="relative flex items-center bg-[var(--surface-raised)] border border-[var(--surface-border)] rounded-md px-3 py-2 transition-all shadow-sm group/input"
                    >
                        <ModalCloseButton
                            onClose={() => setIsChatActive(false)}
                            className="bg-transparent border-0 w-8 h-8 rounded-md min-h-0 text-[var(--fg-muted)] hover:text-[var(--color-destruct)] hover:bg-[var(--color-destruct)]/10 mr-1"
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
                            className="flex-1 bg-transparent border-0 axiom-input-control text-sm text-[var(--fg-primary)] placeholder-[var(--fg-muted)] px-3 py-2 resize-none max-h-32 overflow-y-auto custom-scrollbar font-medium"
                            rows={1}
                            disabled={loadingAI}
                        />
                        <button
                            type="submit"
                            disabled={!followUpInput.trim() || loadingAI}
                            className={cn(
                                "w-10 h-10 flex items-center justify-center rounded-md transition-all shadow-lg shrink-0",
                                "bg-[var(--color-primary)] text-white",
                                (!followUpInput.trim() || loadingAI) && "opacity-0 scale-75"
                            )}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
