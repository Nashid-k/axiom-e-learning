'use client';

import { motion } from 'framer-motion';
import { Message } from '../../types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import dynamic from 'next/dynamic';
import { memo } from 'react';

const AIExplanationView = dynamic(() => import('../../../components/AIExplanationView').then(mod => ({ default: mod.AIExplanationView })), {
    loading: () => (
        <div className="flex items-center justify-center p-8 bg-gray-50/50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <LoadingSpinner size="md" />
        </div>
    ),
    ssr: false
});

interface MayaMessageProps {
    message: Message;
    isLast: boolean;
    isLoading: boolean;
    onCopy: (text: string, id: string) => void;
    onEdit?: (message: Message) => void;
    onPin: (text: string) => void;
    isPinned: boolean;
    shouldReduceMotion: boolean;
    activeCategory: string;
}

function MayaMessageComponent({
    message,
    isLast,
    isLoading,
    onCopy,
    onEdit,
    onPin,
    isPinned,
    shouldReduceMotion,
    activeCategory
}: MayaMessageProps) {
    const isUser = message.role === 'user';

    return (
        <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex gap-2 sm:gap-3 px-3 sm:px-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} ${!shouldReduceMotion ? 'message-entry' : ''}`}
        >
            <div className={`flex flex-col gap-1 sm:gap-1.5 max-w-[92%] sm:max-w-[88%] ${isUser ? 'items-end' : 'items-start'}`}>
                <div className={`
                    relative rounded-[18px] sm:rounded-[20px] px-4 sm:px-5 py-2.5 sm:py-3.5 text-sm leading-relaxed break-words 
                    transition-all duration-500
                    ${isUser
                        ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-xl shadow-blue-500/10 font-bold rounded-tr-none'
                        : 'bg-[var(--surface-raised)] dark:bg-[var(--surface-overlay)] border border-[var(--border-default)] dark:border-white/[0.08] text-[var(--fg-primary)] shadow-sm rounded-tl-none sm:backdrop-blur-md'
                    }
                `}>
                    {isUser ? (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                    ) : (
                        <div className="max-w-none">
                            {isLast && isLoading ? (
                                <div className="flex items-center gap-3 py-1">
                                    <div className="relative w-4 h-4">
                                        <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full" />
                                        <div className="absolute inset-0 border-2 border-transparent border-t-blue-500 rounded-full animate-spin" />
                                    </div>
                                    <span className="text-sm text-[var(--fg-muted)] animate-pulse font-medium">
                                        Maya is crafting...
                                    </span>
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

                {/* Message Actions */}
                <div className={`flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isUser ? 'flex-row-reverse' : ''}`}>
                    <button
                        onClick={() => onCopy(message.content, message.id)}
                        className="p-1.5 rounded-full hover:bg-[var(--surface-overlay)] text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors"
                        title="Copy"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2" />
                        </svg>
                    </button>
                    {isUser && onEdit && (
                        <button
                            onClick={() => onEdit(message)}
                            className="p-1.5 rounded-full hover:bg-[var(--surface-overlay)] text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors"
                            title="Edit"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                    )}
                    <button
                        onClick={() => onPin(message.content)}
                        className={`p-1.5 rounded-full hover:bg-[var(--surface-overlay)] transition-colors ${isPinned ? 'text-emerald-500' : 'text-[var(--fg-muted)]'}`}
                        title="Pin to memory"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export const MayaMessage = memo(MayaMessageComponent);
