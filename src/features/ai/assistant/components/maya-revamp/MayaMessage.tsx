"use client";

import { Message } from '../../types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { motion } from 'framer-motion';

const AIExplanationView = dynamic(() => import('../../../components/AIExplanationView').then(mod => ({ default: mod.AIExplanationView })), {
    loading: () => <LoadingSpinner size="sm" variant="bars" />,
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
        <motion.div 
            initial={{ opacity: 0, x: isUser ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex flex-col gap-3 ${isUser ? 'items-end' : 'items-start'}`}
        >
            <div className={`
                max-w-[90%] p-5 rounded-[24px] text-sm leading-relaxed font-medium shadow-sm
                ${isUser
                    ? 'bg-brand text-white rounded-br-none shadow-xl shadow-brand/20'
                    : 'glass-card border-surface-border rounded-bl-none'
                }
            `}>
                {isUser ? (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                ) : (
                    <div className="max-w-none prose dark:prose-invert prose-p:leading-relaxed prose-pre:bg-surface-base/50">
                        {isLast && isLoading ? (
                            <div className="flex items-center gap-4">
                                <LoadingSpinner size="sm" variant="bars" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-fg-muted">GENERATING RESPONSE...</span>
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

            <div className={`flex items-center gap-4 px-2 ${isUser ? 'flex-row-reverse' : ''}`}>
                <button
                    onClick={() => onCopy(message.content)}
                    className="text-[9px] font-black uppercase tracking-[0.2em] text-fg-muted hover:text-brand transition-colors"
                >
                    DUPLICATE
                </button>
                <div className="w-1 h-1 rounded-full bg-surface-border" />
                <button
                    onClick={() => onPin(message.content)}
                    className={`text-[9px] font-black uppercase tracking-[0.2em] transition-all ${isPinned ? 'text-brand drop-shadow-[0_0_8px_var(--color-brand)]' : 'text-fg-muted hover:text-brand'}`}
                >
                    {isPinned ? 'SYNCHRONIZED' : 'PIN TO CORE'}
                </button>
            </div>
        </motion.div>
    );
}

export const MayaMessage = memo(MayaMessageComponent);
