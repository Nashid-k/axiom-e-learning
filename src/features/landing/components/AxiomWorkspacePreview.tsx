'use client';

import { useState, memo, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { cn } from '@/lib/utils';


type Tab = 'ai' | 'dojo' | 'resources';

const MOCK_CODE = `function optimizeDataProcess(items) {
  return items.filter(item => {
    return heavyComputation(item);
  });
}
`;

export function AxiomWorkspacePreview() {
    const [activeTab, setActiveTab] = useState<Tab>('ai');
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="py-20 md:py-32 px-4 relative z-10 overflow-hidden perspective-1000">
            <div className="max-w-[1200px] mx-auto text-center mb-16">
                <motion.h2
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.5, ease: "easeOut" }}
                    className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight"
                >
                    Your entire workflow. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                        One powerful interface.
                    </span>
                </motion.h2>
            </div>

            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30, scale: 0.98 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                animate={shouldReduceMotion ? undefined : { y: [-10, 10, -10] }}
                transition={shouldReduceMotion ? { duration: 0.01 } : {
                    opacity: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                className="max-w-[1000px] mx-auto bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/10 flex flex-col md:flex-row md:h-[700px] relative group will-change-transform"
            >
                { }
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-50 pointer-events-none" />

                { }
                <div className="w-full md:w-20 bg-[#050505] border-b md:border-b-0 md:border-r border-white/5 flex flex-row md:flex-col items-center py-4 gap-4 z-20 shrink-0 justify-center md:justify-start">
                    <NavIcon active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} icon="✨" label="Maya AI" color="blue" />
                    <NavIcon active={activeTab === 'dojo'} onClick={() => setActiveTab('dojo')} icon="⚔️" label="Dojo Editor" color="red" />
                    <NavIcon active={activeTab === 'resources'} onClick={() => setActiveTab('resources')} icon="📚" label="Resources" color="amber" />
                </div>

                { }
                <div className="flex-1 bg-[#0A0A0A] relative flex flex-col min-h-0">
                    { }
                    <div className="h-12 border-b border-white/5 flex items-center px-6 justify-between bg-[#0A0A0A] z-10">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5 opacity-50">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                            </div>
                            <span className="text-xs text-gray-500 font-mono ml-2 hidden sm:inline-block">
                                {activeTab === 'ai' ? 'axiom://maya-ai/session-01' : activeTab === 'dojo' ? 'axiom://dojo/playground.js' : 'axiom://library/react-advanced'}
                            </span>
                        </div>
                        <div className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                            Connected
                        </div>
                    </div>

                    { }
                    <div className="flex-1 p-4 md:p-6 overflow-hidden relative">
                        <AnimatePresence mode="wait">
                            {activeTab === 'ai' && <AIView key="ai" />}
                            {activeTab === 'dojo' && <DojoView key="dojo" />}
                            {activeTab === 'resources' && <ResourcesView key="resources" />}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

function NavIcon({ active, onClick, icon, label, color }: { active: boolean, onClick: () => void, icon: string, label: string, color: string }) {
    const colorClasses = {
        blue: "text-blue-400",
        red: "text-red-400",
        amber: "text-amber-400"
    };
    const borderClasses = {
        blue: "border-blue-500",
        red: "border-red-500",
        amber: "border-amber-500"
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 relative group/btn outline-none",
                active ? "bg-white/10 scale-105" : "text-gray-600 hover:text-gray-300 hover:bg-white/5"
            )}
        >
            <span className={cn("text-xl transition-colors", active ? colorClasses[color as keyof typeof colorClasses] : "")}>{icon}</span>
            {active && (
                <motion.div
                    layoutId="activeTab"
                    className={cn("absolute inset-0 border rounded-xl opacity-50", borderClasses[color as keyof typeof borderClasses])}
                    transition={{ duration: 0.3 }}
                />
            )}

            <div className="absolute left-14 bg-gray-800 text-white text-xs px-2 py-1.5 rounded-lg opacity-0 group-hover/btn:opacity-100 pointer-events-none transition-all whitespace-nowrap hidden md:block z-50 shadow-xl border border-white/5 font-medium translate-x-2 group-hover/btn:translate-x-0">
                {label}
            </div>
        </button>
    );
}

function AIView() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.3, ease: "easeOut" }}
            className="h-full flex flex-col relative"
        >
            { }
            <div className="flex-1 md:overflow-y-auto overflow-visible custom-scrollbar pr-2">
                <div className="max-w-4xl mx-auto pt-8 px-4">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">
                        Optimizing Performance.
                    </h2>

                    <div className="flex gap-6 mb-8">
                        <div className="w-1.5 h-auto rounded-full shrink-0 bg-blue-500/40" />
                        <p className="text-lg text-gray-400 leading-relaxed font-serif italic">
                            &quot;Efficiency is not just about speed, it&apos;s about respect for user resources. Let&apos;s analyze this loop.&quot;
                        </p>
                    </div>

                    <MinimalTypewriter />
                </div>
            </div >

            { }
            < div className="shrink-0 pt-4 mt-auto" >
                <div className="p-3 md:p-4 bg-gray-50/5 dark:bg-black/40 border border-white/5 rounded-2xl flex flex-wrap md:flex-nowrap items-center justify-between gap-4 backdrop-blur-md">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="flex items-center gap-2">
                            { }
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl grayscale opacity-50 cursor-not-allowed">
                                🎭
                            </div>
                            { }
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl opacity-50 cursor-not-allowed">
                                🔊
                            </div>
                        </div>

                        { }
                        <div className="flex items-center gap-1 border-l border-white/10 pl-3">
                            <div className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center text-gray-600">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </div>
                            <div className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center text-gray-600">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-colors">
                            Ask Maya
                        </button>
                        <button className="flex-[2] md:flex-none px-6 py-2 rounded-full bg-white text-black text-xs font-bold shadow-lg hover:bg-gray-200 transition-colors">
                            Complete Topic
                        </button>
                    </div>
                </div>
            </div >
        </motion.div >
    );
}

const MemoizedSyntaxHighlighter = memo(SyntaxHighlighter);

function DojoView() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.3 }}
            className="h-full flex flex-col"
        >
            { }
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/5 shrink-0 z-10 box-border">
                <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                    </div>
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.25em] ml-2 font-mono">
                        Dojo.ts
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-[#1e1e1e] text-blue-400 border border-blue-500/50 shadow-lg rounded-full text-[10px] font-black uppercase tracking-widest">
                        📟 Console
                    </div>
                    <div className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-blue-600/20 flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Execute
                    </div>
                </div>
            </div>

            <div className="flex-1 relative overflow-hidden bg-[#0A0A0A]">
                <MemoizedSyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    customStyle={{ margin: 0, padding: '1.5rem', height: '100%', background: 'transparent', fontSize: '13px', lineHeight: '1.6', fontFamily: '"Fira Code", monospace' }}
                    showLineNumbers={true}
                    lineNumberStyle={{ minWidth: '2.5em', paddingRight: '1em', color: '#666', textAlign: 'right' }}
                >
                    {MOCK_CODE}
                </MemoizedSyntaxHighlighter>

                { }
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gray-50/80 dark:bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 font-mono text-xs">
                    <div className="text-blue-400 mb-2">&gt; System Terminal</div>
                    <div className="text-green-400">&gt; Tests Passed: 3/3</div>
                    <div className="text-gray-400">&gt; Execution time: 42ms</div>
                </div>
            </div>
        </motion.div>
    );
}

function ResourcesView() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.3 }}
            className="h-full flex flex-col p-4 md:p-8"
        >
            <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-lg shadow-blue-500/5">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 15l5.19-3L10 9v6zM22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zM12 20c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 8z" /></svg>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tighter">Visual Demonstrations.</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    { title: "React useMemo Explained", channel: "Jack Herrington", duration: "12:45", views: "45K" },
                    { title: "Advanced Performance Tuning", channel: "Web Dev Simplified", duration: "18:20", views: "120K" },
                    { title: "React Profiler Deep Dive", channel: "Ben Awad", duration: "10:05", views: "32K" },
                    { title: "Memory Leaks in JS", channel: "Fireship", duration: "03:40", views: "890K" }
                ].map((video, i) => (
                    <motion.div
                        key={i}
                        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={shouldReduceMotion ? { duration: 0.01 } : { delay: i * 0.1 }}
                        className="group relative block w-full text-left rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-700 overflow-hidden shadow-2xl cursor-pointer"
                    >
                        <div className="aspect-video relative overflow-hidden bg-black/40">
                            { }
                            <div className={cn(
                                "absolute inset-0 opacity-60 transition-transform duration-1000 group-hover:scale-110",
                                i % 2 === 0 ? "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black" : "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black"
                            )} />

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                                    <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </div>
                            <span className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-xl text-[10px] font-black text-white shadow-2xl border border-white/10 tracking-widest leading-none">
                                {video.duration}
                            </span>
                        </div>
                        <div className="p-5">
                            <h4 className="font-extrabold text-lg text-white/90 line-clamp-1 group-hover:text-blue-500 transition-colors mb-2 tracking-tight">{video.title}</h4>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">{video.channel}</span>
                                <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">{video.views} views</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

const MOCK_AI_RESPONSE = `
## Optimization Analysis

The \`filter\` operation inside your loop is creating an **O(N²)** complexity because \`heavyComputation\` runs on every iteration.

### Recommended Fix

Use \`useMemo\` to cache results:

\`\`\`javascript
const memoizedResult = useMemo(() => {
  return items.map(processItem);
}, [items]);
\`\`\`

**Why this works:**
1. Reduces re-renders
2. Caches expensive calculations
3. Improves TTI (Time to Interactive)
`;

const TYPING_TEXT = "I've analyzed your code structure. The `heavyComputation` call inside the filter loop is causing a bottleneck. Here's an optimized version using `useMemo`...";

import { AIExplanationView } from '@/features/ai/components/AIExplanationView';

const MemoizedAIExplanationView = memo(AIExplanationView);

function MinimalTypewriter() {
    const [typingIndex, setTypingIndex] = useState(0);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (shouldReduceMotion) {
            const timeoutId = setTimeout(() => setTypingIndex(TYPING_TEXT.length), 0);
            return () => clearTimeout(timeoutId);
        }

        let intervalId: ReturnType<typeof setInterval> | null = null;
        const timeoutId = setTimeout(() => {
            intervalId = setInterval(() => {
                setTypingIndex(prev => {
                    if (prev < TYPING_TEXT.length) {
                        return prev + 1;
                    }
                    if (intervalId) clearInterval(intervalId);
                    return prev;
                });
            }, 40);
        }, 500);

        return () => {
            clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
        };
    }, [shouldReduceMotion]);

    const displayedContent = MOCK_AI_RESPONSE.slice(0, typingIndex * 5);

    return (
        <MemoizedAIExplanationView
            content={displayedContent}
            loading={false}
            error={null}
            onRegenerate={() => { }}
        />
    );
}
