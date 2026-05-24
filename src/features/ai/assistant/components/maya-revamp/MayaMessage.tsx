"use client";

import { Message } from '../../types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { cn } from '@/lib/utils';

const AIExplanationView = dynamic(() => import('../../../components/AIExplanationView').then(mod => ({ default: mod.AIExplanationView })), {
    loading: () => <LoadingSpinner size="sm" />,
    ssr: false
});

interface MayaMessageProps {
    message: Message;
    isLast: boolean;
    isLoading: boolean;
    onCopy: (text: string) => void;
    onPin: (text: string) => void;
    isPinned: boolean;
    activeCategory: string;
}

function MayaMessageComponent({
    message,
    isLast,
    isLoading,
    onCopy,
    onPin,
    isPinned,
    activeCategory
}: MayaMessageProps) {
    const isUser = message.role === 'user';

    return (
        <div className={cn("flex flex-col gap-2.5 w-full select-text animate-spring-up", isUser ? 'items-end' : 'items-start')}>
            {/* Holographic context headers */}
            {!isUser && (
                <span className="font-mono text-[7px] font-black tracking-widest text-[var(--fg-secondary)] uppercase px-1">
                    🧠 COGNITIVE EXPLAINER NODE
                </span>
            )}
            
            {/* High-End Speech Bubble */}
            <div className={cn(
                "max-w-[85%] p-4.5 rounded-[18px] text-sm leading-relaxed font-medium shadow-md transition-all duration-300",
                isUser
                    ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)]/85 text-white border border-white/[0.08] rounded-tr-none shadow-[0_6px_25px_-8px_rgba(10,132,255,0.35)]"
                    : "bg-white/[0.015] border border-white/[0.05] text-[var(--fg-primary)] rounded-tl-none hover:border-white/[0.08]"
            )}>
                {isUser ? (
                    <p className="whitespace-pre-wrap tracking-wide font-sans">{message.content}</p>
                ) : (
                    <div className="max-w-none prose dark:prose-invert prose-p:leading-relaxed prose-pre:bg-white/[0.02] prose-pre:border prose-pre:border-white/[0.04]">
                        {isLast && isLoading ? (
                            <div className="flex items-center gap-3 py-1">
                                <LoadingSpinner size="sm" />
                                <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[var(--fg-secondary)]">GENERATING RESPONSE...</span>
                            </div>
                        ) : (
                            <AIExplanationView
                                content={message.content}
                                loading={false}
                                error={null}
                                onRegenerate={() => { }}
                                category={activeCategory}
                                compact
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Premium action sub-tags with micro-dividers */}
            <div className={cn("flex items-center gap-3.5 px-2 select-none", isUser ? 'flex-row-reverse' : '')}>
                <button
                    onClick={() => onCopy(message.content)}
                    className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--fg-secondary)] hover:text-white transition-all cursor-pointer"
                >
                    DUPLICATE
                </button>
                <div className="w-[1.5px] h-[7px] bg-white/[0.06]" />
                <button
                    onClick={() => onPin(message.content)}
                    className={cn(
                        "text-[8px] font-black uppercase tracking-[0.2em] transition-all cursor-pointer flex items-center gap-1",
                        isPinned 
                            ? "text-[var(--color-cyan)] filter drop-shadow-[0_0_2px_rgba(100,210,255,0.4)]" 
                            : "text-[var(--fg-secondary)] hover:text-white"
                    )}
                >
                    {isPinned ? '● SYNCHRONIZED' : 'PIN TO CORE'}
                </button>
            </div>
        </div>
    );
}

export const MayaMessage = memo(MayaMessageComponent);
