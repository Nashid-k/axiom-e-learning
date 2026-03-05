'use client';

import { useState } from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { Components } from 'react-markdown';

export function CopyButton({ text, isDark }: { text: string; isDark: boolean }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${copied
                ? 'bg-green-500/20 text-green-400'
                : isDark
                    ? 'hover:bg-white/10 text-gray-300'
                    : 'hover:bg-gray-200 text-gray-600'
                }`}
        >
            {copied ? (
                <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                </>
            ) : (
                <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                </>
            )}
        </button>
    );
}

export function getMarkdownComponents(isDarkMode: boolean): Components {
    return {
        h1({ children }) {
            return <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-10 leading-tight border-b pb-6 border-gray-100 dark:border-white/10">{children}</h1>;
        },
        h2({ children }) {
            return (
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mt-20 mb-8 pb-4 border-b-2 border-gray-100 dark:border-white/10 flex items-center gap-3">
                    {children}
                </h2>
            );
        },
        h3({ children }) {
            return <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-12 mb-6">{children}</h3>;
        },
        p({ children }) {
            return <p className="mb-8 leading-8 text-gray-700 dark:text-gray-300">{children}</p>;
        },
        ul({ children }) {
            return <ul className="list-disc pl-6 space-y-3 mb-8 text-gray-700 dark:text-gray-300">{children}</ul>;
        },
        ol({ children }) {
            return <ol className="list-decimal pl-6 space-y-3 mb-8 text-gray-700 dark:text-gray-300">{children}</ol>;
        },
        li({ children }) {
            return <li className="pl-2 marker:text-gray-400 dark:marker:text-gray-600">{children}</li>;
        },
        table({ children }) {
            return (
                <div className="my-12 overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 shadow-sm bg-white dark:bg-[#111]">
                    <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                        {children}
                    </table>
                </div>
            );
        },
        thead({ children }) {
            return <thead className="text-xs uppercase bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400">{children}</thead>;
        },
        tr({ children }) {
            return <tr className="border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">{children}</tr>;
        },
        th({ children }) {
            return <th className="px-6 py-4 font-bold tracking-wider">{children}</th>;
        },
        td({ children }) {
            return <td className="px-6 py-4 align-top">{children}</td>;
        },
        blockquote({ children }) {
            return (
                <blockquote className="border-l-4 border-black dark:border-white py-2 pl-6 my-12 bg-gray-50 dark:bg-white/5 rounded-r-lg italic text-gray-700 dark:text-gray-300">
                    {children}
                </blockquote>
            );
        },
        code({ inline, className, children, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { inline?: boolean }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeContent = String(children).replace(/\n$/, '');

            const isMultiLine = codeContent.includes('\n');
            const isShort = codeContent.length < 80;
            const isInlineCode = inline || (!match && !isMultiLine && isShort);

            if (isInlineCode) {
                return (
                    <code className="bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded font-mono text-sm font-semibold border border-gray-200 dark:border-white/5" {...props}>
                        {children}
                    </code>
                );
            }

            const isTreeStructure = /[├└│─┌┐┘┬┴┼]/.test(codeContent) ||
                codeContent.includes('├──') ||
                codeContent.includes('└──') ||
                codeContent.includes('|--') ||
                codeContent.includes('`--') ||
                /^[\s]*(src|app|components|lib|public|node_modules)\/$/m.test(codeContent);

            if (isTreeStructure || !match) {
                return (
                    <div className={`my-8 rounded-xl overflow-hidden border ${isDarkMode ? 'border-emerald-500/30 bg-[#0a1a0a]' : 'border-emerald-300 bg-emerald-50'}`}>
                        <div className={`px-4 py-2.5 text-xs font-semibold border-b flex items-center justify-between ${isDarkMode ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border-emerald-300'}`}>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                                <span>{isTreeStructure ? 'Project Structure' : 'Code'}</span>
                            </div>
                            <CopyButton text={codeContent} isDark={isDarkMode} />
                        </div>
                        <div
                            className={`p-5 overflow-x-auto ${isDarkMode ? 'text-emerald-100' : 'text-emerald-900'}`}
                            style={{
                                fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace",
                                fontSize: '13px',
                                lineHeight: '1.6',
                                whiteSpace: 'pre',
                                tabSize: 2
                            }}
                        >
                            {codeContent}
                        </div>
                    </div>
                );
            }

            return (
                <div className={`my-8 rounded-xl overflow-hidden border shadow-sm ${isDarkMode ? 'border-white/10 bg-[#0d0d0d]' : 'border-gray-200 bg-white'}`}>
                    <div className={`px-4 py-2.5 text-xs font-mono border-b flex justify-between items-center ${isDarkMode ? 'bg-[#1a1a1a] text-gray-400 border-white/10' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                        <span className="font-semibold uppercase tracking-wide">{match[1]}</span>
                        <CopyButton text={codeContent} isDark={isDarkMode} />
                    </div>
                    <SyntaxHighlighter
                        style={(isDarkMode ? oneDark : oneLight) as { [key: string]: React.CSSProperties }}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{ margin: 0, padding: '1.25rem', background: 'transparent', fontSize: '13px' } as React.CSSProperties}
                    >
                        {codeContent}
                    </SyntaxHighlighter>
                </div>
            );
        },
        pre({ children }) {
            return <>{children}</>;
        },
        strong({ children }) {
            return <strong className="font-bold text-black dark:text-white bg-yellow-50 dark:bg-yellow-900/10 px-0.5 rounded">{children}</strong>;
        }
    };
}
