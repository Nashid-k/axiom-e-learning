'use client';

import { useState } from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { Components } from 'react-markdown';

export function CopyButton({ text }: { text: string; isDark: boolean }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { }
    };

    return (
        <button
            onClick={handleCopy}
            className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-black dark:hover:text-white transition-none"
        >
            {copied ? 'Copied' : 'Copy'}
        </button>
    );
}

export function getMarkdownComponents(isDarkMode: boolean): Components {
    return {
        h1: (props) => <h1 className="text-3xl font-bold mb-8 pb-4 border-b border-neutral-100 dark:border-neutral-900" {...props} />,
        h2: (props) => <h2 className="text-xl font-bold mt-12 mb-6" {...props} />,
        h3: (props) => <h3 className="text-lg font-bold mt-8 mb-4" {...props} />,
        p: (props) => <p className="mb-6 leading-relaxed text-neutral-800 dark:text-neutral-300" {...props} />,
        ul: (props) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
        ol: (props) => <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />,
        li: (props) => <li className="pl-1" {...props} />,
        table: (props) => (
            <div className="my-8 overflow-hidden border border-neutral-200 dark:border-neutral-800 rounded-md">
                <table className="w-full text-sm text-left" {...props} />
            </div>
        ),
        thead: (props) => <thead className="bg-neutral-50 dark:bg-neutral-900 text-[10px] font-bold uppercase tracking-widest text-neutral-400" {...props} />,
        tr: (props) => <tr className="border-b border-neutral-100 dark:border-neutral-900 last:border-0" {...props} />,
        th: (props) => <th className="px-4 py-2" {...props} />,
        td: (props) => <td className="px-4 py-2" {...props} />,
        blockquote: (props) => (
            <blockquote className="border-l-4 border-neutral-200 dark:border-neutral-800 pl-4 py-1 my-8 italic text-neutral-500" {...props} />
        ),
        code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const codeContent = String(children).replace(/\n$/, '');

            if (inline) {
                return (
                    <code className="bg-neutral-100 dark:bg-neutral-900 px-1.5 py-0.5 rounded font-mono text-sm border border-neutral-200 dark:border-neutral-800" {...props}>
                        {children}
                    </code>
                );
            }

            return (
                <div className="my-8 rounded-md overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
                    <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-900 flex justify-between items-center bg-neutral-50 dark:bg-neutral-950">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{match ? match[1] : 'code'}</span>
                        <CopyButton text={codeContent} isDark={isDarkMode} />
                    </div>
                    <SyntaxHighlighter
                        style={(isDarkMode ? oneDark : oneLight) as any}
                        language={match ? match[1] : 'text'}
                        PreTag="div"
                        customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '13px' }}
                    >
                        {codeContent}
                    </SyntaxHighlighter>
                </div>
            );
        },
        pre: ({ children }) => <>{children}</>,
        strong: (props) => <strong className="font-bold text-black dark:text-white" {...props} />,
    };
}
