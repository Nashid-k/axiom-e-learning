'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { runCode, SupportedLanguage } from '@/features/ai/code-runner';
import { Button } from '@/components/ui/Button';

// Monaco editor type
interface MonacoEditor {
    getValue: () => string;
}

const Editor = dynamic(() => import('@monaco-editor/react'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-[#030406] flex flex-col items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[var(--fg-secondary)]"><div className="w-6 h-6 border-2 border-t-transparent border-[var(--color-primary)] animate-spin rounded-full" />Loading Dojo Console...</div>
});

type Language = 'javascript' | 'typescript' | 'python' | 'mongodb' | 'sql';

interface CodeEditorProps {
    initialCode?: string;
    language?: Language;
}

const DEFAULT_CODE: Record<Language, string> = {
    javascript: `// JavaScript\nconsole.log("Hello Axiom");\n\nfunction add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(5, 10));`,
    typescript: `// TypeScript\ninterface User {\n  name: string;\n  role: string;\n}\n\nconst user: User = { name: "Learner", role: "Developer" };\nconsole.log(user);`,
    python: `# Python\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))`,
    mongodb: `// MongoDB\ndb.users.find({ status: "active" }).limit(5);`,
    sql: `-- SQL\nSELECT * FROM users WHERE active = true LIMIT 10;`
};

export default function CodeEditor({ initialCode = '', language = 'javascript' }: CodeEditorProps) {
    const [activeLang, setActiveLang] = useState<Language>(language);
    const [code, setCode] = useState(initialCode || DEFAULT_CODE[language]);
    const [output, setOutput] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [showTerminal, setShowTerminal] = useState(true); // Default open terminal for rich visual look

    const editorRef = useRef<MonacoEditor | null>(null);

    useEffect(() => {
        setCode(initialCode || DEFAULT_CODE[activeLang]);
        setOutput(null);
    }, [activeLang, initialCode]);

    const handleRun = async () => {
        setIsRunning(true);
        setShowTerminal(true);
        setOutput('> Executing program...');
        const currentCode = editorRef.current?.getValue() || code;
        try {
            const result = await runCode(activeLang as SupportedLanguage, currentCode);
            setOutput(result.success ? result.output : `Error: ${result.error}\n${result.output || ''}`);
        } catch (err: unknown) {
            setOutput(`Execution failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="flex flex-col h-full border border-white/10 rounded-2xl overflow-hidden bg-black/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <header className="px-5 py-4.5 border-b border-white/5 bg-white/[0.01] flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                    {/* Simulated OS Buttons */}
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/10 shadow-[0_0_8px_rgba(255,95,86,0.3)]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10 shadow-[0_0_8px_rgba(255,189,46,0.3)]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/10 shadow-[0_0_8px_rgba(39,201,63,0.3)]" />
                    </div>
                    
                    <div className="h-4 w-[1px] bg-white/10" />

                    <div className="relative">
                        <select 
                            value={activeLang} 
                            onChange={(e) => setActiveLang(e.target.value as Language)}
                            className="bg-white/5 border border-white/5 hover:border-white/15 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer text-white appearance-none select-none pr-8"
                        >
                            {['javascript', 'typescript', 'python', 'mongodb', 'sql'].map(l => <option key={l} value={l} className="bg-[#030406] text-white">{l}</option>)}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-[8px]">▼</div>
                    </div>
                </div>
                
                <div className="flex gap-2">
                    <button 
                        onClick={() => setShowTerminal(!showTerminal)}
                        className={cn(
                            "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-200 cursor-pointer",
                            showTerminal 
                                ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.25)]" 
                                : "border-white/10 text-[var(--fg-secondary)] hover:text-white hover:border-white/20"
                        )}
                    >
                        Terminal
                    </button>
                    <Button 
                        onClick={handleRun} 
                        loading={isRunning} 
                        size="sm" 
                        className="h-8.5 text-[10px] uppercase tracking-widest bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-cyan)] shadow-[0_0_15px_rgba(99,102,241,0.3)] border-0"
                    >
                        Execute
                    </Button>
                </div>
            </header>

            <div className="flex-1 flex flex-col min-h-0 relative">
                <div className="flex-1 min-h-0 relative bg-black/35">
                    <Editor
                        height="100%"
                        language={activeLang === 'mongodb' ? 'javascript' : activeLang}
                        value={code}
                        theme="vs-dark"
                        onMount={(editor) => { editorRef.current = editor as MonacoEditor; }}
                        onChange={(val) => setCode(val || "")}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 13,
                            padding: { top: 20 },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            fontFamily: "var(--font-mono), monospace",
                        }}
                    />
                </div>

                {showTerminal && (
                    <div className="h-1/3 border-t border-white/5 bg-black/60 p-5 font-mono text-xs overflow-y-auto custom-scrollbar relative z-10">
                        {/* Interactive overlay grid */}
                        <div className="absolute inset-0 cyber-grid-bg opacity-[0.03] pointer-events-none" />
                        
                        <div className="flex justify-between items-center mb-3.5 relative z-10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-cyan)]">CONSOLE OUTPUT</span>
                            <button 
                                onClick={() => setOutput(null)} 
                                className="text-[10px] font-black uppercase text-[var(--fg-secondary)] hover:text-white transition-colors cursor-pointer"
                            >
                                Clear
                            </button>
                        </div>
                        
                        <div className="relative z-10">
                            {output ? (
                                <pre className="whitespace-pre-wrap text-[var(--color-cyan)] filter drop-shadow-[0_0_5px_rgba(6,182,212,0.3)] font-medium leading-relaxed">{output}</pre>
                            ) : (
                                <div className="text-[var(--fg-secondary)] italic opacity-60">Ready to execute instructions. Waiting for signal...</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

