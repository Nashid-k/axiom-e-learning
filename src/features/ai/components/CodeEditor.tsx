'use client';

import { useState, useEffect, useRef } from 'react';
import type { OnMount } from "@monaco-editor/react";
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { runCode, SupportedLanguage } from '@/features/ai/code-runner';
import { Button } from '@/components/ui/Button';

const Editor = dynamic(() => import('@monaco-editor/react'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-neutral-400">Loading Editor...</div>
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
    const [showTerminal, setShowTerminal] = useState(false);

    const editorRef = useRef<any>(null);

    useEffect(() => {
        setCode(initialCode || DEFAULT_CODE[activeLang]);
        setOutput(null);
    }, [activeLang, initialCode]);

    const handleRun = async () => {
        setIsRunning(true);
        setShowTerminal(true);
        setOutput('> Executing...');
        const currentCode = editorRef.current?.getValue() || code;
        try {
            const result = await runCode(activeLang as SupportedLanguage, currentCode);
            setOutput(result.success ? result.output : `Error: ${result.error}\n${result.output || ''}`);
        } catch (err: any) {
            setOutput(`Execution failed: ${err.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="flex flex-col h-full border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden bg-white dark:bg-black">
            <header className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-900 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full border border-neutral-200 dark:border-neutral-800" />
                        <div className="w-2.5 h-2.5 rounded-full border border-neutral-200 dark:border-neutral-800" />
                        <div className="w-2.5 h-2.5 rounded-full border border-neutral-200 dark:border-neutral-800" />
                    </div>
                    <select 
                        value={activeLang} 
                        onChange={(e) => setActiveLang(e.target.value as Language)}
                        className="bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none cursor-pointer"
                    >
                        {['javascript', 'typescript', 'python', 'mongodb', 'sql'].map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setShowTerminal(!showTerminal)}
                        className={cn(
                            "px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest border transition-none",
                            showTerminal ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white" : "border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-black dark:hover:text-white"
                        )}
                    >
                        Terminal
                    </button>
                    <Button onClick={handleRun} isLoading={isRunning} size="sm" className="h-8 text-[10px] uppercase tracking-widest">
                        Run
                    </Button>
                </div>
            </header>

            <div className="flex-1 flex flex-col min-h-0 relative">
                <div className="flex-1 min-h-0">
                    <Editor
                        height="100%"
                        language={activeLang === 'mongodb' ? 'javascript' : activeLang}
                        value={code}
                        theme="vs-dark"
                        onMount={(editor) => { editorRef.current = editor; }}
                        onChange={(val) => setCode(val || "")}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 13,
                            padding: { top: 20 },
                            scrollBeyondLastLine: false,
                            automaticLayout: true
                        }}
                    />
                </div>

                {showTerminal && (
                    <div className="h-1/3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4 font-mono text-xs overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Output</span>
                            <button onClick={() => setOutput(null)} className="text-[10px] font-bold uppercase text-neutral-400 hover:text-black dark:hover:text-white">Clear</button>
                        </div>
                        {output ? (
                            <pre className="whitespace-pre-wrap text-black dark:text-neutral-300">{output}</pre>
                        ) : (
                            <div className="text-neutral-300 dark:text-neutral-700 italic">No output yet.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
