'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { LiveCodePreview } from './LiveCodePreview';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';


interface CodeTab {
    language: string;
    label: string;
    code: string;
}

interface CodeBlockWithTabsProps {
    tabs: CodeTab[];
    className?: string;
}

const LANGUAGE_CONFIG: Record<string, { label: string; color: string }> = {
    javascript: { label: 'JS', color: 'bg-yellow-500' },
    js: { label: 'JS', color: 'bg-yellow-500' },
    typescript: { label: 'TS', color: 'bg-blue-500' },
    ts: { label: 'TS', color: 'bg-blue-500' },
    python: { label: 'Python', color: 'bg-green-500' },
    py: { label: 'Python', color: 'bg-green-500' },
    dart: { label: 'Dart', color: 'bg-cyan-500' },
    c: { label: 'C', color: 'bg-gray-500' },
    cpp: { label: 'C++', color: 'bg-pink-500' },
    java: { label: 'Java', color: 'bg-red-500' },
    go: { label: 'Go', color: 'bg-sky-500' },
    rust: { label: 'Rust', color: 'bg-orange-500' },
};

const CodeBlockWithTabs: React.FC<CodeBlockWithTabsProps> = ({ tabs, className }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const safeActiveIndex = activeIndex < tabs.length ? activeIndex : 0;
    const activeTab = useMemo(() => tabs[safeActiveIndex], [tabs, safeActiveIndex]);

    const canPreview = useMemo(() => {
        return tabs.some(t => ['html', 'css'].includes(t.language.toLowerCase()));
    }, [tabs]);

    const cssTab = tabs.find(t => t.language.toLowerCase() === 'css');
    const jsTab = tabs.find(t => ['js', 'javascript', 'typescript', 'ts'].includes(t.language.toLowerCase()));

    const config = LANGUAGE_CONFIG[activeTab?.language?.toLowerCase()] || { label: activeTab?.language || 'Code', color: 'bg-gray-500' };

    if (!tabs || tabs.length === 0) {
        return null;
    }

    const htmlTab = tabs.find(t => t.language.toLowerCase() === 'html');

    const BASE_HTML = `
    <div class="p-4 font-sans">
        <h2 class="text-xl font-bold mb-2">CSS Preview</h2>
        <div class="p-4 bg-gray-100 rounded-lg border border-gray-200">
            <h3 class="font-bold text-lg mb-2">Card Title</h3>
            <p class="mb-4">This is a sample paragraph to demonstrate typography and spacing.</p>
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Action Button</button>
        </div>
        <div class="mt-4 flex gap-2">
            <div class="w-10 h-10 bg-red-400 rounded-full"></div>
            <div class="w-10 h-10 bg-green-400 rounded-full"></div>
            <div class="w-10 h-10 bg-blue-400 rounded-full"></div>
        </div>
    </div>`;

    if (tabs.length === 1 && !canPreview) {
        return (
            <div className={cn("rounded-xl overflow-hidden border border-black/10 dark:border-white/10", className)}>
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-black/5 dark:border-white/5">
                    <div className={cn("w-2 h-2 rounded-full", config.color)} />
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {config.label}
                    </span>
                </div>
                <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={activeTab.language.toLowerCase()}
                    PreTag="div"
                    customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '0.875rem', lineHeight: '1.5' }}
                    codeTagProps={{ style: { fontFamily: 'inherit' } }}
                >
                    {activeTab.code}
                </SyntaxHighlighter>
            </div>
        );
    }

    return (
        <div className={cn("rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-sm bg-white dark:bg-[#1e1e1e]", className)}>
            { }
            <div className="bg-gray-50 dark:bg-white/5 px-2 py-2 flex items-center justify-between border-b border-black/5 dark:border-white/5">
                { }
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                    {tabs.map((tab, index) => {
                        const tabConfig = LANGUAGE_CONFIG[tab.language?.toLowerCase()] || { label: tab.language, color: 'bg-gray-500' };
                        const isActive = index === safeActiveIndex;

                        return (
                            <button
                                key={`${tab.language}-${index}`}
                                onClick={() => { setActiveIndex(index); }}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0",
                                    isActive && !showPreview
                                        ? "bg-white dark:bg-white/10 text-black dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                                        : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-white/5"
                                )}
                            >
                                <div className={cn("w-2 h-2 rounded-full", tabConfig.color)} />
                                {tabConfig.label}
                            </button>
                        );
                    })}
                </div>

                { }
                {canPreview && (
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className={cn(
                            "ml-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 shrink-0",
                            showPreview
                                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                : "bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/20"
                        )}
                    >
                        {showPreview ? (
                            <>
                                <span>Code</span>
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                            </>
                        ) : (
                            <>
                                <span>Preview</span>
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </>
                        )}
                    </button>
                )}
            </div>

            { }
            {showPreview && canPreview ? (
                <div className="relative w-full h-[500px] min-h-[400px] resize-y overflow-auto border-t border-black/5 dark:border-white/5 animate-in fade-in duration-300">
                    <LiveCodePreview
                        html={htmlTab?.code || BASE_HTML}
                        css={cssTab?.code || ''}
                        js={jsTab?.code || ''}
                    />
                </div>
            ) : (
                <div className="bg-gray-50 dark:bg-[#0c0c0c] max-h-[500px] overflow-y-auto custom-scrollbar">
                    <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={activeTab?.language?.toLowerCase() || 'text'}
                        PreTag="div"
                        customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent', fontSize: '13px', lineHeight: '1.7' }}
                    >
                        {activeTab?.code || ''}
                    </SyntaxHighlighter>
                </div>
            )}
        </div>
    );
}

export function parseMultiLanguageBlocks(content: string): CodeTab[][] {
    const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/g;
    const blocks: { language: string; code: string; index: number }[] = [];

    let match;
    while ((match = codeBlockRegex.exec(content)) !== null) {
        blocks.push({
            language: match[1],
            code: match[2].trim(),
            index: match.index,
        });
    }

    const groups: CodeTab[][] = [];
    let currentGroup: CodeTab[] = [];
    let lastEnd = 0;

    blocks.forEach((block, i) => {
        const gapFromPrevious = block.index - lastEnd;

        if (i === 0 || gapFromPrevious < 200) {
            currentGroup.push({
                language: block.language,
                label: LANGUAGE_CONFIG[block.language.toLowerCase()]?.label || block.language,
                code: block.code,
            });
        } else {
            if (currentGroup.length > 0) {
                groups.push(currentGroup);
            }
            currentGroup = [{
                language: block.language,
                label: LANGUAGE_CONFIG[block.language.toLowerCase()]?.label || block.language,
                code: block.code,
            }];
        }

        lastEnd = block.index + block.code.length;
    });

    if (currentGroup.length > 0) {
        groups.push(currentGroup);
    }

    return groups;
}

export default CodeBlockWithTabs;
