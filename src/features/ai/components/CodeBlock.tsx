import React, { useState } from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import dynamic from 'next/dynamic';
const LiveCodePreview = dynamic(() => import('@/components/ui/LiveCodePreview').then(mod => mod.LiveCodePreview), {
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center bg-gray-50/50 dark:bg-white/[0.02] animate-pulse rounded-xl border border-dashed border-gray-200 dark:border-white/10 text-xs font-bold text-gray-400 uppercase tracking-widest">Warping to Preview...</div>
});
import { cn } from '@/lib/utils';

export const CSS_PLAYGROUND = `
<div class="preview-wrapper p-3 bg-light">
    <!-- Navigation Lab (Flexbox) -->
    <nav class="navbar-lab d-flex justify-content-between align-items-center p-3 mb-4 bg-dark text-white rounded shadow-sm">
        <div class="brand fw-black">AXIOM.LAB</div>
        <div class="nav-links d-flex gap-3">
            <span class="nav-item">Flex</span>
            <span class="nav-item">Grid</span>
            <span class="nav-item">Block</span>
        </div>
    </nav>

    <!-- Flexbox & Alignment Lab -->
    <div class="lab-section mb-4">
        <h3 class="h6 fw-bold text-uppercase tracking-wider text-muted mb-2">Flexbox Alignment Lab (.flex-lab)</h3>
        <div class="flex-lab d-flex bg-white border rounded p-4 shadow-sm" style="min-height: 150px;">
            <div class="lab-box p-3 bg-primary text-white rounded shadow-sm">BOX 1</div>
            <div class="lab-box p-3 bg-success text-white rounded shadow-sm">BOX 2</div>
            <div class="lab-box p-3 bg-info text-white rounded shadow-sm">BOX 3</div>
        </div>
        <p class="small text-muted mt-2">Target <code class=".flex-lab { ... }</code> to test <b>justify-content</b>, <b>align-items</b>, and <b>flex-direction</b>.</p>
    </div>

    <!-- Spacing & Block Lab -->
    <div class="lab-section mb-4">
        <h3 class="h6 fw-bold text-uppercase tracking-wider text-muted mb-2">Spacing & Box Model Lab (.block-lab)</h3>
        <div class="block-lab bg-white border rounded p-4 shadow-sm">
            <div class="inner-box p-4 bg-warning text-dark fw-bold rounded border shadow-inner">
                SPACING TARGET
            </div>
        </div>
        <p class="small text-muted mt-2">Target <code class=".inner-box { ... }</code> to test <b>padding</b>, <b>margin</b>, and <b>border</b>.</p>
    </div>
    
    <!-- Grid Lab -->
    <div class="lab-section">
        <h3 class="h6 fw-bold text-uppercase tracking-wider text-muted mb-2">Grid Architecture Lab (.grid-lab)</h3>
        <div class="grid-lab d-grid gap-3 bg-white border rounded p-4 shadow-sm" style="grid-template-columns: repeat(3, 1fr);">
            <div class="grid-item p-4 bg-secondary text-white rounded text-center">A</div>
            <div class="grid-item p-4 bg-secondary text-white rounded text-center">B</div>
            <div class="grid-item p-4 bg-secondary text-white rounded text-center">C</div>
            <div class="grid-item p-4 bg-secondary text-white rounded text-center">D</div>
            <div class="grid-item p-4 bg-secondary text-white rounded text-center">E</div>
            <div class="grid-item p-4 bg-secondary text-white rounded text-center">F</div>
        </div>
        <p class="small text-muted mt-2">Target <code class=".grid-lab { ... }</code> for <b>grid-template-columns</b> and <b>gap</b>.</p>
    </div>
</div>
`;

interface CodeBlockProps {
    className?: string;
    children?: React.ReactNode;
    persona?: 'general' | 'buddy';
    unifiedCode?: { html: string; css: string };
    isMaster?: boolean;
    isSuppressed?: boolean;
    category?: string;
    compact?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
    className,
    children,
    persona = 'general',
    unifiedCode = { html: '', css: '' },
    isMaster = false,
    isSuppressed = false,
    category = '',
    compact = false,
    ...props
}) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = (match ? match[1] : '').toLowerCase();
    const [activeTab, setActiveTab] = useState(language === 'css' ? 'css' : 'html');
    const [showPreview, setShowPreview] = useState(false);
    const [copied, setCopied] = useState(false);
    const codeContent = String(children ?? '').replace(/\n$/, '');

    const handleCopy = async () => {
        const textToCopy = isMaster ? (activeTab === 'html' ? unifiedCode.html : unifiedCode.css) : codeContent;
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const LANG_COLORS: Record<string, string> = {
        javascript: '#f7df1e', typescript: '#3178c6', python: '#3776ab', html: '#e34f26',
        css: '#1572b6', jsx: '#61dafb', tsx: '#3178c6', json: '#292929', bash: '#4eaa25',
        sql: '#e38c00', rust: '#dea584', go: '#00add8', java: '#ed8b00', cpp: '#00599c',
    };

    const isHtmlCategory = category.toLowerCase().includes('html');

    if (isSuppressed) return null;

    if (!match) {
        return (
            <code className="bg-gray-100/80 dark:bg-white/[0.08] px-1.5 py-0.5 rounded-md text-blue-600 dark:text-blue-300 font-mono text-[13px] border border-gray-200/60 dark:border-white/[0.06] break-words" {...props}>
                {children}
            </code>
        );
    }

    const isPreviewable = ['html', 'css'].includes(language);
    const hasBoth = unifiedCode.html && unifiedCode.css;

    return (
        <div className={cn("rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl bg-[#1e1e1e] ring-1 ring-white/5", compact ? "my-3" : "my-6")}>
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="flex gap-1.5 mr-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
                    </div>

                    {isMaster && hasBoth ? (
                        <div className="flex gap-1 p-0.5 bg-black/20 rounded-lg">
                            <button
                                onClick={() => { setActiveTab('html'); setShowPreview(false); }}
                                className={cn(
                                    "px-3 py-1 rounded-md text-[10px] font-black tracking-widest uppercase transition-all",
                                    activeTab === 'html' ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/60"
                                )}
                            >
                                index.html
                            </button>
                            <button
                                onClick={() => { setActiveTab('css'); setShowPreview(false); }}
                                className={cn(
                                    "px-3 py-1 rounded-md text-[10px] font-black tracking-widest uppercase transition-all",
                                    activeTab === 'css' ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/60"
                                )}
                            >
                                style.css
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: LANG_COLORS[language] || '#888' }} />
                            <span className="text-[10px] text-white/50 font-bold uppercase tracking-[0.15em]">{language}</span>
                        </div>
                    )}
                </div>

                {isPreviewable && (
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className={cn(
                            "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all",
                            showPreview
                                ? (persona === 'general' ? "bg-blue-600 border-blue-500 text-white" : "bg-emerald-600 border-emerald-500 text-white")
                                : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                        )}
                    >
                        {showPreview ? "View Code" : "Run Preview"}
                    </button>
                )}
            </div>

            {showPreview ? (
                <div className="p-0 bg-white h-[600px] min-h-[400px] resize-y overflow-auto transition-all animate-in fade-in zoom-in-95 duration-300">
                    <LiveCodePreview
                        html={language === 'html' ? codeContent : (unifiedCode.html || CSS_PLAYGROUND)}
                        css={isHtmlCategory ? '' : (language === 'css' ? (unifiedCode.css || codeContent) : (unifiedCode.css || ''))}
                        className="h-full rounded-none"
                    />
                </div>
            ) : (
                <div className="relative group">
                    <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={isMaster ? (activeTab === 'html' ? 'html' : 'css') : language}
                        PreTag="div"
                        customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent', fontSize: '13px', lineHeight: '1.7', minHeight: '100px' }}
                        {...props}
                    >
                        {isMaster
                            ? (activeTab === 'html' ? unifiedCode.html : unifiedCode.css)
                            : codeContent
                        }
                    </SyntaxHighlighter>

                    <button
                        onClick={handleCopy}
                        className="absolute top-3 right-3 p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white/30 hover:text-white/60 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                        title="Copy code"
                    >
                        {copied ? (
                            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};
