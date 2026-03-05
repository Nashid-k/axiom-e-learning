'use client';

import { useState, useEffect, useRef } from 'react';
import Editor, { OnMount } from "@monaco-editor/react";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LiveCodePreview } from '@/components/ui/LiveCodePreview';
import { runCode, SupportedLanguage } from '@/features/ai/code-runner';

type Language = 'javascript' | 'typescript' | 'python' | 'mongodb' | 'sql';

interface CodeEditorProps {
    initialCode?: string;
    language?: Language;
    onClose?: () => void;
}

export interface MayaAnnotation {
    line: number;
    severity: 'error' | 'warning' | 'info' | 'success';
    message: string;
}

const DEFAULT_CODE: Record<Language, string> = {
    javascript: `// Write your JavaScript code here\nconst greeting = "Hello, World!";\nconsole.log(greeting);\n\nfunction calculateArea(r) {\n  return Math.PI * r * r;\n}\n\nconsole.log('Area:', calculateArea(5));`,
    typescript: `// Write your TypeScript code here\ninterface User {\n  id: number;\n  name: string;\n  role: 'admin' | 'user';\n}\n\nconst user: User = {\n  id: 1,\n  name: "Axiom Student",\n  role: 'user'\n};\n\nconsole.log(user);`,
    python: `# Write your Python code here\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nprint([fibonacci(i) for i in range(10)])`,
    mongodb: `// MongoDB Aggregation\ndb.orders.aggregate([\n  { $match: { status: "completed" } },\n  { $group: { _id: "$customerId", total: { $sum: "$amount" } } }\n])`,
    sql: `-- SQL Query\nSELECT \n    name, \n    email, \n    age\nFROM users\nWHERE status = 'active'\nORDER BY age DESC\nLIMIT 5;`
};


export default function CodeEditor({
    initialCode = '',
    language = 'javascript',
}: CodeEditorProps) {
    const [activeLang, setActiveLang] = useState<Language>(language);
    const [code, setCode] = useState(initialCode || DEFAULT_CODE[language]);
    const [output, setOutput] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [showTerminal, setShowTerminal] = useState(false);
    const [terminalLayout, setTerminalLayout] = useState<'bottom' | 'right'>('bottom');
    const [activeTab, setActiveTab] = useState<'console' | 'preview'>('console');

    const editorRef = useRef<import('monaco-editor').editor.IStandaloneCodeEditor | null>(null);

    useEffect(() => {
        if (initialCode) {
            setCode(initialCode);
        } else {
            setCode(DEFAULT_CODE[activeLang]);
        }
        setOutput(null);
    }, [activeLang, initialCode]);

    const handleEditorWillMount = (monaco: import('@monaco-editor/react').Monaco) => {
        monaco.editor.defineTheme('axiom-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '6A9955' },
                { token: 'keyword', foreground: 'C586C0' },
                { token: 'string', foreground: 'CE9178' },
            ],
            colors: {
                'editor.background': '#0A0A0A',
                'editor.foreground': '#D4D4D4',
            }
        });
    };

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
        monaco.editor.setTheme('axiom-dark');

        setTimeout(() => {
            if (editorRef.current) editorRef.current.layout();
        }, 800);
    };

    useEffect(() => {
        setTimeout(() => {
            if (editorRef.current) editorRef.current.layout();
        }, 300);
    }, [showTerminal, terminalLayout]);

    const handleRun = async () => {
        setIsRunning(true);
        setOutput(null);
        setShowTerminal(true);

        const currentCode = editorRef.current ? editorRef.current.getValue() : code;

        try {
            setActiveTab('console');
            setOutput('> Executing...');

            const result = await runCode(activeLang as SupportedLanguage, currentCode);

            if (result.success) {
                setOutput(result.output + (result.executionTime ? `\n\n⏱ ${result.executionTime}ms` : ''));
            } else {
                setOutput(`❌ Error: ${result.error}\n\n${result.output || ''}`);
            }
        } catch (err: unknown) {
            setOutput(`❌ Execution failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div id="dojo-container" className="flex flex-col h-full min-h-0 bg-white dark:bg-[#0F0F0F] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 shadow-3xl relative">

            { }
            <div className="flex items-center justify-between px-3 md:px-6 py-3 md:py-4 bg-gray-50/50 dark:bg-white/[0.03] border-b border-black/5 dark:border-white/5 shrink-0 z-20">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                        </div>
                        <span className="hidden sm:inline-block text-[10px] text-gray-500 font-black uppercase tracking-[0.25em] ml-2 font-mono">Dojo.ts</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    { }
                    <div className="hidden lg:flex items-center bg-black/20 rounded-full p-0.5 border border-white/5 mr-2">
                        <button onClick={() => setTerminalLayout('bottom')} className={cn("p-1.5 rounded-full transition-all", terminalLayout === 'bottom' ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300")}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="13" width="18" height="8" rx="1" /><rect x="3" y="3" width="18" height="10" rx="1" /></svg>
                        </button>
                        <button onClick={() => setTerminalLayout('right')} className={cn("p-1.5 rounded-full transition-all", terminalLayout === 'right' ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300")}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="13" y="3" width="8" height="18" rx="1" /><rect x="3" y="3" width="10" height="18" rx="1" /></svg>
                        </button>
                    </div>

                    <button onClick={() => setShowTerminal(!showTerminal)} className={cn("px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border", showTerminal ? "bg-[#1e1e1e] text-blue-400 border-blue-500/50" : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10")}>📟 Console</button>

                    <select value={activeLang} onChange={(e) => setActiveLang(e.target.value as Language)} className="bg-black/40 text-black dark:text-white text-[10px] font-black uppercase tracking-widest rounded-full px-4 py-1.5 border border-black/10 dark:border-white/10">
                        {['javascript', 'typescript', 'python', 'mongodb', 'sql'].map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
                    </select>

                    <button onClick={handleRun} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-lg">
                        {isRunning ? <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>}
                        <span>Execute</span>
                    </button>
                </div>
            </div>

            { }
            <div className={cn("flex-1 flex min-h-0 relative", terminalLayout === 'bottom' ? "flex-col" : "flex-row")}>
                { }
                <div className={cn("relative transition-all duration-500", terminalLayout === 'bottom' ? (showTerminal ? "flex-1 min-h-[40%]" : "flex-[2]") : (showTerminal ? "flex-1 min-w-[40%]" : "flex-1"))}>
                    <Editor
                        height="100%"
                        language={activeLang}
                        value={code}
                        theme="axiom-dark"
                        beforeMount={handleEditorWillMount}
                        onMount={handleEditorDidMount}
                        onChange={(val) => setCode(val || "")}
                        options={{
                            automaticLayout: true,
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineHeight: 28,
                            padding: { top: 32 },
                            scrollBeyondLastLine: false,
                            cursorBlinking: "smooth"
                        }}
                    />
                </div>

                { }
                <AnimatePresence>
                    {showTerminal && (
                        <motion.div
                            initial={terminalLayout === 'bottom' ? { height: 0, opacity: 0 } : { width: 0, opacity: 0 }}
                            animate={terminalLayout === 'bottom' ? { height: '300px', opacity: 1 } : { width: '50%', opacity: 1 }}
                            exit={terminalLayout === 'bottom' ? { height: 0, opacity: 0 } : { width: 0, opacity: 0 }}
                            className={cn("bg-gray-50/80 dark:bg-black/60 flex flex-col backdrop-blur-2xl relative", terminalLayout === 'bottom' ? "border-t border-white/5" : "border-l border-white/5")}
                        >
                            <div className="px-6 py-3 bg-white/5 border-b border-white/5 flex justify-between items-center shrink-0">
                                <div className="flex gap-4">
                                    <button onClick={() => setActiveTab('console')} className={cn("text-[9px] font-black uppercase tracking-widest flex items-center gap-2", activeTab === 'console' ? "text-blue-400" : "text-gray-500")}>
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" /> System Terminal
                                    </button>

                                </div>
                                <button onClick={() => setShowTerminal(false)} className="text-[9px] text-gray-600 hover:text-white font-black uppercase tracking-widest">[Hide]</button>
                            </div>

                            <div className="flex-1 relative overflow-hidden">
                                {activeTab === 'console' ? (
                                    <div className="p-6 font-mono text-[13px] text-gray-400 overflow-y-auto h-full custom-scrollbar leading-relaxed">
                                        {output ? <pre className="whitespace-pre-wrap text-blue-400/90">{output}</pre> : <div className="flex items-center justify-center h-full opacity-10 text-4xl font-black">AWAITING_</div>}
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 bg-white">
                                        <LiveCodePreview
                                            html={activeLang === 'javascript' ? '<div id="root"></div>' : '<div style="padding: 20px; font-family: sans-serif;">Previewing Styles...</div>'}
                                            css={''}
                                            js={activeLang === 'javascript' ? code : ''}
                                            className="h-full"
                                        />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
