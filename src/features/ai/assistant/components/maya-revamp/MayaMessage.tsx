'use client';

import { Message } from '../../types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import dynamic from 'next/dynamic';
import { memo } from 'react';

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
        <div className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
            <div className={`
                max-w-[90%] p-4 rounded-md text-sm leading-relaxed
                ${isUser
                    ? 'bg-black dark:bg-white text-white dark:text-black font-bold'
                    : 'bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-black dark:text-white'
                }
            `}>
                {isUser ? (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                ) : (
                    <div className="max-w-none">
                        {isLast && isLoading ? (
                            <div className="flex items-center gap-2">
                                <LoadingSpinner size="sm" />
                                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Maya is writing...</span>
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

            <div className="flex items-center gap-3">
                <button
                    onClick={() => onCopy(message.content)}
                    className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-black dark:hover:text-white transition-none"
                >
                    Copy
                </button>
                <button
                    onClick={() => onPin(message.content)}
                    className={`text-[10px] font-bold uppercase tracking-widest transition-none ${isPinned ? 'text-brand-500' : 'text-neutral-400 hover:text-black dark:hover:text-white'}`}
                >
                    {isPinned ? 'Pinned' : 'Pin'}
                </button>
            </div>
        </div>
    );
}

export const MayaMessage = memo(MayaMessageComponent);
