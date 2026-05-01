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

export const CodeBlockWithTabs: React.FC<CodeBlockWithTabsProps> = ({ tabs, className }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    
    const activeTab = tabs[activeIndex] || tabs[0];
    const canPreview = useMemo(() => tabs.some(t => ['html', 'css'].includes(t.language.toLowerCase())), [tabs]);

    if (!tabs || tabs.length === 0) return null;

    return (
        <div className={cn("border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden bg-white dark:bg-black", className)}>
            <div className="bg-neutral-50 dark:bg-neutral-950 px-2 py-2 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900">
                <div className="flex items-center gap-1">
                    {tabs.map((tab, idx) => (
                        <button
                            key={idx}
                            onClick={() => { setActiveIndex(idx); setShowPreview(false); }}
                            className={cn(
                                "px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-none",
                                idx === activeIndex && !showPreview
                                    ? "bg-black dark:bg-white text-white dark:text-black"
                                    : "text-neutral-400 hover:text-black dark:hover:text-white"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {canPreview && (
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className={cn(
                            "px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest border transition-none",
                            showPreview 
                                ? "bg-brand-500 border-brand-500 text-white" 
                                : "border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-black dark:hover:text-white"
                        )}
                    >
                        {showPreview ? 'Code' : 'Preview'}
                    </button>
                )}
            </div>

            <div className="relative">
                {showPreview ? (
                    <div className="h-[400px] bg-white">
                        <LiveCodePreview
                            html={tabs.find(t => t.language === 'html')?.code || ''}
                            css={tabs.find(t => t.language === 'css')?.code || ''}
                            js={tabs.find(t => ['js', 'javascript'].includes(t.language))?.code || ''}
                        />
                    </div>
                ) : (
                    <div className="max-h-[500px] overflow-y-auto bg-neutral-950">
                        <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={activeTab.language.toLowerCase()}
                            PreTag="div"
                            customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent', fontSize: '13px' }}
                        >
                            {activeTab.code}
                        </SyntaxHighlighter>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodeBlockWithTabs;
