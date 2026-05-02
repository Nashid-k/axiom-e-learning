'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const CodeBlock = dynamic(() => import('@/features/ai/components/CodeBlock').then(mod => mod.CodeBlock), {
    loading: () => <LoadingSpinner size="sm" />,
    ssr: false
});

// Define proper interfaces for Markdown props
interface MarkdownProps {
    children?: React.ReactNode;
    [key: string]: unknown;
}

interface CodeProps extends MarkdownProps {
    inline?: boolean;
    className?: string;
}

export const getMarkdownComponents = (compact: boolean = false) => ({
    h1: ({ children, ...props }: MarkdownProps) => (
        <h1 className="text-3xl font-black tracking-tighter mt-12 mb-6" {...props}>{children}</h1>
    ),
    h2: ({ children, ...props }: MarkdownProps) => (
        <h2 className="text-2xl font-black tracking-tighter mt-10 mb-5" {...props}>{children}</h2>
    ),
    h3: ({ children, ...props }: MarkdownProps) => (
        <h3 className="text-xl font-bold tracking-tight mt-8 mb-4" {...props}>{children}</h3>
    ),
    p: ({ children, ...props }: MarkdownProps) => (
        <p className="text-base leading-relaxed mb-6 opacity-90" {...props}>{children}</p>
    ),
    ul: ({ children, ...props }: MarkdownProps) => (
        <ul className="list-disc pl-6 mb-6 space-y-2" {...props}>{children}</ul>
    ),
    ol: ({ children, ...props }: MarkdownProps) => (
        <ol className="list-decimal pl-6 mb-6 space-y-2" {...props}>{children}</ol>
    ),
    li: ({ children, ...props }: MarkdownProps) => (
        <li className="leading-relaxed" {...props}>{children}</li>
    ),
    blockquote: ({ children, ...props }: MarkdownProps) => (
        <blockquote className="border-l-4 border-brand/30 pl-6 py-2 my-8 italic bg-brand/5 rounded-r-2xl" {...props}>
            {children}
        </blockquote>
    ),
    code: ({ inline, className, children, ...props }: CodeProps) => {
        if (inline) {
            return (
                <code className="px-1.5 py-0.5 rounded-md bg-brand-soft/30 text-brand font-bold text-[0.9em]" {...props}>
                    {children}
                </code>
            );
        }

        return (
            <div className="my-8 rounded-3xl overflow-hidden border border-surface-border shadow-2xl">
                <CodeBlock
                    className={className}
                    isMaster={false}
                    isSuppressed={false}
                    category=""
                    compact={compact}
                    {...props}
                >
                    {children}
                </CodeBlock>
            </div>
        );
    }
});
