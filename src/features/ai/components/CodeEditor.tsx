'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { runCode, SupportedLanguage } from '@/features/ai/code-runner';
import { Button } from '@/components/ui/Button';
import { ModalShell } from '@/components/ui/ModalShell';
import { Input } from '@/components/ui/Input';
import Image from 'next/image';

// Workspace Imports
import { FileExplorer } from './FileExplorer';
import { EditorTabs } from './EditorTabs';
import { VFSCodePreview } from './VFSCodePreview';
import { TestPanel } from './TestPanel';
import { useVFS } from '../hooks/useVFS';
import { registerCopilotProvider } from './copilot-provider';
import { useRoomSync } from '../hooks/useRoomSync';
import confetti from 'canvas-confetti';
import { useSession } from 'next-auth/react';

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
    onAIReview?: (filesText: string) => Promise<void>;
}

const DEFAULT_CODE: Record<Language, string> = {
    javascript: `// JavaScript\nconsole.log("Hello Axiom");\n\nfunction add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(5, 10));`,
    typescript: `// TypeScript\ninterface User {\n  name: string;\n  role: string;\n}\n\nconst user: User = { name: "Learner", role: "Developer" };\nconsole.log(user);`,
    python: `# Python\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))`,
    mongodb: `// MongoDB\ndb.users.find({ status: "active" }).limit(5);`,
    sql: `-- SQL\nSELECT * FROM users WHERE active = true LIMIT 10;`
};

export default function CodeEditor({ 
    initialCode = '', 
    language = 'javascript',
    onAIReview
}: CodeEditorProps) {
    const { data: session } = useSession();
    const [editorMode, setEditorMode] = useState<'snippet' | 'project'>('snippet');
    const [activeLang, setActiveLang] = useState<Language>(language);
    const [code, setCode] = useState(initialCode || DEFAULT_CODE[language]);
    const [output, setOutput] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [showTerminal, setShowTerminal] = useState(true); // Default open terminal for rich visual look
    const [showPreviewSplit, setShowPreviewSplit] = useState(true);
    const [previewColumnTab, setPreviewColumnTab] = useState<'preview' | 'tests'>('preview');

    // GitHub Publishing Modal States
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
    const [isGitHubLinked, setIsGitHubLinked] = useState(false);
    const [githubUsername, setGithubUsername] = useState('');
    const [repoName, setRepoName] = useState('axiom-learning-project');
    const [repoDesc, setRepoDesc] = useState('Workspace portfolio project completed inside the Axiom Learning OS.');
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishError, setPublishError] = useState<string | null>(null);
    const [publishedUrl, setPublishedUrl] = useState<string | null>(null);

    // Collaborative Room Sync States
    const [roomId, setRoomId] = useState<string | null>(null);
    const [isPairModalOpen, setIsPairModalOpen] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);

    const editorRef = useRef<MonacoEditor | null>(null);
    const copilotCleanupRef = useRef<(() => void) | null>(null);

    // Initialize VFS workspace hook based on language
    const {
        files,
        activeFilePath,
        openTabs,
        createFile,
        deleteFile,
        updateFileContent,
        openTab,
        closeTab,
        setActiveFilePath,
        setFiles,
        setOpenTabs
    } = useVFS('workspace_global', activeLang);

    // Dynamic Collaborative Sync Hook Integration
    const { participants, isSyncing } = useRoomSync({
        roomId,
        files,
        setFiles,
        activeFilePath,
        setActiveFilePath,
        setOpenTabs
    });

    // Check for room query parameters on mount to auto-join rooms
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const roomParam = params.get('room');
            if (roomParam) {
                setRoomId(roomParam);
                setEditorMode('project'); // Auto-switch to Project IDE workspace mode when joining a co-coding session
                setShowTerminal(true);
                setOutput(`> Connecting to Co-Coding room: ${roomParam}...`);
            }
        }
    }, [setActiveFilePath, setFiles, setOpenTabs]);

    useEffect(() => {
        if (editorMode === 'snippet') {
            setCode(initialCode || DEFAULT_CODE[activeLang]);
            setOutput(null);
        }
    }, [activeLang, initialCode, editorMode]);

    // Handle updates when active VFS file changes in project mode
    useEffect(() => {
        if (editorMode === 'project' && activeFilePath && files[activeFilePath]) {
            setCode(files[activeFilePath].content);
        }
    }, [activeFilePath, files, editorMode]);

    // Cleanup Monaco Copilot registration on component unmount
    useEffect(() => {
        return () => {
            if (copilotCleanupRef.current) {
                copilotCleanupRef.current();
            }
        };
    }, []);

    // Check GitHub status whenever the publish modal opens
    useEffect(() => {
        if (isPublishModalOpen) {
            checkGitHubLinkStatus();
        }
    }, [isPublishModalOpen]);

    const checkGitHubLinkStatus = async () => {
        try {
            const res = await fetch('/api/user/github');
            if (res.ok) {
                const data = await res.json();
                setIsGitHubLinked(data.isLinked);
                setGithubUsername(data.username || '');
            }
        } catch (e) {
            console.error('Error verifying GitHub connection:', e);
        }
    };

    // Console integration callback for compiled iframe output
    const handleConsoleMessage = (level: 'log' | 'warn' | 'error', text: string) => {
        setOutput(prev => {
            const prefix = level === 'error' ? '[ERROR] ' : level === 'warn' ? '[WARN] ' : '';
            const msg = `${prefix}${text}`;
            return prev ? `${prev}\n${msg}` : msg;
        });
    };

    const handleClearConsole = () => {
        setOutput(null);
    };

    const handleRun = async () => {
        setIsRunning(true);
        setShowTerminal(true);
        setOutput('> Executing program...');

        let currentCode = code;
        let executionLang = activeLang;

        // If in project mode, load content of the currently active file in the workspace
        if (editorMode === 'project') {
            if (activeFilePath && files[activeFilePath]) {
                currentCode = files[activeFilePath].content;
                const ext = activeFilePath.split('.').pop()?.toLowerCase();
                if (ext === 'py') executionLang = 'python';
                else if (ext === 'sql') executionLang = 'sql';
                else if (ext === 'ts') executionLang = 'typescript';
                else executionLang = 'javascript';
            } else {
                setOutput('Error: No active file selected to run.');
                setIsRunning(false);
                return;
            }
        } else {
            currentCode = editorRef.current?.getValue() || code;
        }

        try {
            const result = await runCode(executionLang as SupportedLanguage, currentCode);
            setOutput(result.success ? result.output : `Error: ${result.error}\n${result.output || ''}`);
        } catch (err: unknown) {
            setOutput(`Execution failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setIsRunning(false);
        }
    };

    // Monaco on change handler
    const handleEditorChange = (val: string | undefined) => {
        const text = val || '';
        setCode(text);
        if (editorMode === 'project' && activeFilePath) {
            updateFileContent(activeFilePath, text);
        }
    };

    // AI Review Dispatcher
    const handleAIReviewClick = async () => {
        if (!onAIReview) return;
        setIsRunning(true);
        setShowTerminal(true);
        setOutput('> Syncing workspace VFS files and transmitting to AI Sensei review node...');
        
        try {
            const formattedText = Object.entries(files)
                .map(([path, file]) => `// ====================================\n// File: ${path}\n// ====================================\n${file.content}`)
                .join('\n\n');
            await onAIReview(formattedText);
            setOutput(prev => `${prev}\n> Transmission complete. Stream launched!`);
        } catch (err: any) {
            setOutput(prev => `${prev}\nError launching review: ${err.message || err}`);
        } finally {
            setIsRunning(false);
        }
    };

    // GitHub Project Publishing Pipeline
    const handlePublishProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!repoName.trim() || isPublishing) return;

        setIsPublishing(true);
        setPublishError(null);
        setShowTerminal(true);
        setOutput('> Syncing project files. Resolving VFS branches...');

        try {
            const response = await fetch('/api/project/publish', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    repoName: repoName.trim(),
                    description: repoDesc.trim(),
                    files
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.details || data.error || 'Failed to publish project.');
            }

            setPublishedUrl(data.repoUrl);
            setOutput(prev => `${prev}\n🎉 Sync Succeeded! Portfolios deployed successfully!\nRepository URL: ${data.repoUrl}`);
            
            // Blast confetti!
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

        } catch (err: any) {
            setPublishError(err.message || 'Publishing pipeline failed.');
            setOutput(prev => `${prev}\n✗ [ERROR] Pipeline abort: ${err.message || err}`);
        } finally {
            setIsPublishing(false);
        }
    };

    // Collaborative Room creation and links resolver
    const handleLaunchRoom = async () => {
        const generatedId = `room-${Math.random().toString(36).substring(2, 9)}`;
        
        setShowTerminal(true);
        setOutput(`> Initializing Co-Coding synchronization room: ${generatedId}...`);

        try {
            // Push initial files state to start the room document on MongoDB
            const res = await fetch(`/api/room/${generatedId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    files,
                    activeFilePath
                })
            });

            if (res.ok) {
                setRoomId(generatedId);
                setOutput(prev => `${prev}\n🎉 Coding room ready! Copy link and share with your co-coding peer.`);
            } else {
                throw new Error('Failed to initialize room document.');
            }
        } catch (e: any) {
            setOutput(prev => `${prev}\nError starting room: ${e.message || e}`);
        }
    };

    const handleLeaveRoom = () => {
        if (!confirm('Leave Co-Coding room? You will disconnect from your pairing peer.')) return;
        setRoomId(null);
        
        // Remove room query parameter from browser URL without reloading
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.delete('room');
            window.history.replaceState({}, '', url.toString());
        }

        setShowTerminal(true);
        setOutput('> Disconnected from Co-Coding session. Working in local sandbox.');
        setIsPairModalOpen(false);
    };

    const getShareLink = () => {
        if (typeof window === 'undefined') return '';
        const url = new URL(window.location.href);
        url.searchParams.set('room', roomId || '');
        return url.toString();
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(getShareLink());
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
    };

    return (
        <div className="flex flex-col h-full border border-white/10 rounded-2xl overflow-hidden bg-black/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <header className="px-5 py-4.5 border-b border-white/5 bg-white/[0.01] flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                    {/* Simulated OS Buttons */}
                    <div className="flex gap-2 select-none">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/10 shadow-[0_0_8px_rgba(255,95,86,0.3)]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10 shadow-[0_0_8px_rgba(255,189,46,0.3)]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/10 shadow-[0_0_8px_rgba(39,201,63,0.3)]" />
                    </div>
                    
                    <div className="h-4 w-[1px] bg-white/10" />

                    {/* Mode Selector Toggle */}
                    <div className="flex border border-white/5 bg-black/25 rounded-lg p-0.5 select-none">
                        <button
                            onClick={() => setEditorMode('snippet')}
                            className={cn(
                                "px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer",
                                editorMode === 'snippet'
                                    ? "bg-white/10 text-white font-black"
                                    : "text-[var(--fg-secondary)] hover:text-white"
                            )}
                        >
                            Snippet
                        </button>
                        <button
                            onClick={() => setEditorMode('project')}
                            className={cn(
                                "px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer",
                                editorMode === 'project'
                                    ? "bg-white/10 text-white font-black"
                                    : "text-[var(--fg-secondary)] hover:text-white"
                            )}
                        >
                            Project IDE
                        </button>
                    </div>

                    <div className="h-4 w-[1px] bg-white/10" />

                    {editorMode === 'snippet' ? (
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
                    ) : (
                        <span className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-widest flex items-center gap-1.5 select-none">
                            <span className={cn("w-1.5 h-1.5 rounded-full", roomId ? "bg-emerald-400 animate-ping" : "bg-[var(--color-success)] animate-pulse")} />
                            {roomId ? `Pair Connected (${participants.length + 1})` : 'Axiom Workspace'}
                        </span>
                    )}
                </div>
                
                <div className="flex gap-2">
                    {editorMode === 'project' && (
                        <Button 
                            onClick={() => setIsPairModalOpen(true)}
                            size="sm"
                            className={cn(
                                "h-8.5 text-[9px] uppercase tracking-widest border cursor-pointer",
                                roomId 
                                    ? "bg-emerald-950/20 text-emerald-400 border-emerald-500/20 shadow-md animate-pulse" 
                                    : "border-white/10 hover:border-white/20 bg-white/5 text-white shadow-md"
                            )}
                        >
                            {roomId ? 'Room Active' : 'Pair'}
                        </Button>
                    )}
                    {editorMode === 'project' && (
                        <Button 
                            onClick={() => {
                                setPublishedUrl(null);
                                setPublishError(null);
                                setIsPublishModalOpen(true);
                            }}
                            disabled={isRunning}
                            size="sm"
                            className="h-8.5 text-[9px] uppercase tracking-widest border border-white/10 hover:border-white/20 bg-white/5 text-white shadow-md cursor-pointer"
                        >
                            Publish
                        </Button>
                    )}
                    {editorMode === 'project' && onAIReview && (
                        <Button 
                            onClick={handleAIReviewClick}
                            disabled={isRunning}
                            size="sm"
                            className="h-8.5 text-[9px] uppercase tracking-widest border border-[var(--color-primary)]/20 hover:border-[var(--color-primary)]/50 bg-[var(--color-primary-glow)] hover:bg-[var(--color-primary-glow)] text-[var(--color-cyan)] shadow-md cursor-pointer"
                        >
                            AI Review
                        </Button>
                    )}
                    {editorMode === 'project' && (
                        <button
                            onClick={() => setShowPreviewSplit(!showPreviewSplit)}
                            className={cn(
                                "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-200 cursor-pointer",
                                showPreviewSplit 
                                    ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)] text-white border-none shadow-[0_0_12px_rgba(10,132,255,0.3)]" 
                                    : "border-white/10 text-[var(--fg-secondary)] hover:text-white hover:border-white/20"
                            )}
                        >
                            Split Panel
                        </button>
                    )}
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
                        className="h-8.5 text-[10px] uppercase tracking-widest bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-cyan)] shadow-[0_0_15px_rgba(99,102,241,0.35)] border-0 cursor-pointer"
                    >
                        Execute
                    </Button>
                </div>
            </header>

            <div className="flex-1 flex min-h-0 relative">
                {/* Project Sidebar Explorer */}
                {editorMode === 'project' && (
                    <div className="w-[180px] shrink-0 h-full border-r border-white/5 bg-[#030406]/35">
                        <FileExplorer
                            files={files}
                            activeFilePath={activeFilePath}
                            onSelectFile={openTab}
                            onCreateFile={createFile}
                            onDeleteFile={deleteFile}
                        />
                    </div>
                )}

                {/* Main Workspace Frame */}
                <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-[#000000]/10">
                    {/* Project Editor Tab bar */}
                    {editorMode === 'project' && (
                        <EditorTabs
                            openTabs={openTabs}
                            activeFilePath={activeFilePath}
                            onSelectTab={setActiveFilePath}
                            onCloseTab={closeTab}
                        />
                    )}

                    {/* Editor Screen & Simulated Output Terminal */}
                    <div className="flex-1 flex flex-col min-h-0 relative">
                        <div className="flex-1 min-h-0 relative bg-black/35">
                            <Editor
                                height="100%"
                                language={activeLang === 'mongodb' ? 'javascript' : activeLang}
                                value={code}
                                theme="vs-dark"
                                onMount={(editor, monaco) => { 
                                    editorRef.current = editor as MonacoEditor; 
                                    if (copilotCleanupRef.current) {
                                        copilotCleanupRef.current();
                                    }
                                    copilotCleanupRef.current = registerCopilotProvider(monaco);
                                }}
                                onChange={handleEditorChange}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 13,
                                    padding: { top: 20 },
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    fontFamily: "var(--font-mono), monospace",
                                    inlineSuggest: { enabled: true }
                                }}
                            />
                        </div>

                        {showTerminal && (
                            <div className="h-1/3 border-t border-white/5 bg-black/60 p-5 font-mono text-xs overflow-y-auto custom-scrollbar relative z-10">
                                {/* Interactive overlay grid */}
                                <div className="absolute inset-0 cyber-grid-bg opacity-[0.03] pointer-events-none" />
                                
                                <div className="flex justify-between items-center mb-3.5 relative z-10">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-cyan)]">
                                        {isSyncing ? 'SYNCING MATRIX...' : 'CONSOLE OUTPUT'}
                                    </span>
                                    <button 
                                        onClick={handleClearConsole} 
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

                {/* Project live preview split screen panel */}
                {editorMode === 'project' && showPreviewSplit && (
                    <div className="w-[380px] lg:w-[460px] h-full shrink-0 border-l border-white/5 bg-black/40 flex flex-col min-h-0 relative">
                        {/* Nested Sub-Tab bar inside preview column */}
                        <div className="absolute top-0 left-0 right-0 h-10 border-b border-white/5 flex bg-[#030406]/90 z-20 select-none font-sans text-xs">
                            <button
                                onClick={() => setPreviewColumnTab('preview')}
                                className={cn(
                                    "flex-1 px-4 py-2 border-r border-white/5 font-black uppercase tracking-wider text-[9px] transition-all cursor-pointer",
                                    previewColumnTab === 'preview'
                                        ? "text-white bg-white/[0.02] border-b-2 border-b-[var(--color-cyan)]"
                                        : "text-[var(--fg-secondary)] hover:text-white"
                                )}
                            >
                                Live Preview
                            </button>
                            <button
                                onClick={() => setPreviewColumnTab('tests')}
                                className={cn(
                                    "flex-1 px-4 py-2 font-black uppercase tracking-wider text-[9px] transition-all cursor-pointer",
                                    previewColumnTab === 'tests'
                                        ? "text-white bg-white/[0.02] border-b-2 border-b-[var(--color-cyan)]"
                                        : "text-[var(--fg-secondary)] hover:text-white"
                                )}
                            >
                                Auto-Grader Tests
                            </button>
                        </div>

                        {/* Rendering Active Tab */}
                        <div className="flex-1 w-full h-full min-h-0 overflow-hidden relative">
                            {previewColumnTab === 'preview' ? (
                                <div className="absolute inset-0 p-4 pt-14">
                                    <VFSCodePreview
                                        files={files}
                                        onConsoleMessage={handleConsoleMessage}
                                        onClearConsole={handleClearConsole}
                                    />
                                </div>
                            ) : (
                                <div className="absolute inset-0 p-4 pt-14">
                                    <TestPanel
                                        files={files}
                                        language={activeFilePath ? (activeFilePath.split('.').pop() || activeLang) : activeLang}
                                        onConsoleLog={(text) => handleConsoleMessage('log', text)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* GitHub Project Publisher Modal */}
            <ModalShell isOpen={isPublishModalOpen} onClose={() => setIsPublishModalOpen(false)} containerClassName="max-w-md">
                <div className="p-8">
                    <header className="mb-6">
                        <h2 className="text-2xl font-bold mb-1 text-white">Publish Portfolio Project</h2>
                        <p className="text-xs text-[var(--fg-muted)]">Deploy your in-browser workspace VFS files to a live GitHub repository.</p>
                    </header>

                    {!isGitHubLinked ? (
                        <div className="space-y-4">
                            <div className="p-4 border border-amber-500/20 bg-amber-950/10 text-amber-400 rounded-xl text-xs font-semibold leading-relaxed">
                                ⚠️ GitHub Account Not Linked. Paste your Personal Access Token in the **Profile Settings** dashboard to sync your portfolios.
                            </div>
                            <Button 
                                onClick={() => setIsPublishModalOpen(false)}
                                className="w-full text-xs font-black uppercase tracking-wider"
                            >
                                Close
                            </Button>
                        </div>
                    ) : publishedUrl ? (
                        <div className="space-y-5 text-center">
                            <div className="py-4 flex flex-col items-center gap-3">
                                <span className="w-12 h-12 rounded-full bg-emerald-950/20 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-2xl animate-bounce">
                                    ✓
                                </span>
                                <h3 className="text-lg font-bold text-white tracking-wide">Sync Successful!</h3>
                                <p className="text-xs text-[var(--fg-secondary)] max-w-sm leading-relaxed mx-auto">
                                    Your project has been compiled and committed successfully. Check it out on your GitHub:
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Button 
                                    variant="outline" 
                                    onClick={() => setIsPublishModalOpen(false)}
                                    className="flex-1 text-[10px] font-black uppercase tracking-wider"
                                >
                                    Done
                                </Button>
                                <a 
                                    href={publishedUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 h-9 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)] shadow-md flex items-center justify-center text-[10px] font-black uppercase tracking-wider text-white select-none active:scale-95 hover:shadow-lg transition-all"
                                >
                                    Open Repo
                                </a>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handlePublishProject} className="space-y-5">
                            <div className="space-y-4">
                                <Input
                                    id="pub-repo-name"
                                    label="Repository Name"
                                    value={repoName}
                                    onChange={(e) => setRepoName(e.target.value)}
                                    placeholder="axiom-react-project..."
                                    required
                                    className="font-mono text-xs"
                                    error={publishError || undefined}
                                />
                                
                                <div className="space-y-1">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                                        Description
                                    </label>
                                    <textarea
                                        value={repoDesc}
                                        onChange={(e) => setRepoDesc(e.target.value)}
                                        placeholder="Add a custom description..."
                                        rows={3}
                                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[var(--color-primary)] px-3 py-2 rounded-xl text-xs outline-none text-white resize-none transition-all placeholder:text-white/20 font-sans"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-3 border-t border-white/5">
                                <Button 
                                    variant="outline" 
                                    type="button"
                                    onClick={() => setIsPublishModalOpen(false)}
                                    className="flex-1 text-[10px] font-black uppercase tracking-wider"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit"
                                    loading={isPublishing}
                                    className="flex-1 text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)] shadow-md"
                                >
                                    Launch
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </ModalShell>

            {/* Collaborative Pair Programming Modal */}
            <ModalShell isOpen={isPairModalOpen} onClose={() => setIsPairModalOpen(false)} containerClassName="max-w-md">
                <div className="p-8">
                    <header className="mb-6">
                        <h2 className="text-2xl font-bold mb-1 text-white">Pair Programming Dojo</h2>
                        <p className="text-xs text-[var(--fg-muted)]">Co-code on the same VFS workspace files with your learning peer in real-time.</p>
                    </header>

                    {!roomId ? (
                        <div className="space-y-5">
                            <p className="text-xs text-[var(--fg-secondary)] leading-relaxed font-semibold">
                                Launch a shared pairing session! Anyone with your secure room link can link to your workspace and edit your files concurrently.
                            </p>
                            <Button
                                onClick={handleLaunchRoom}
                                className="w-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)] shadow-md"
                            >
                                Start Pairing Session
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Copyable Share link */}
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                                    Copy shared pairing link
                                </label>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <Input
                                            id="pair-share-link"
                                            value={getShareLink()}
                                            readOnly
                                            className="font-mono text-[10px] bg-white/5 border-white/10"
                                        />
                                    </div>
                                    <Button
                                        onClick={handleCopyLink}
                                        className={cn(
                                            "h-9 text-[9px] uppercase tracking-wider px-3.5 shadow-md mt-1.5 shrink-0",
                                            copiedLink 
                                                ? "bg-emerald-600 border-none shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
                                                : "bg-white/5 border border-white/10 text-white"
                                        )}
                                    >
                                        {copiedLink ? 'Copied' : 'Copy'}
                                    </Button>
                                </div>
                            </div>

                            {/* Connected Participants Dashboard */}
                            <div className="space-y-3">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                                    Connected Co-Coders
                                </label>
                                <div className="space-y-2">
                                    {/* Local Student (Active) */}
                                    <div className="p-2 border border-white/5 rounded-lg bg-white/[0.01] flex items-center gap-2.5">
                                        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/10">
                                            <Image src={session?.user?.image || '/avatars/default.png'} alt="Avatar" fill className="object-cover" />
                                        </div>
                                        <div className="min-w-0 flex-1 flex items-center justify-between">
                                            <span className="font-semibold text-white truncate">{session?.user?.name || 'You (Active)'}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        </div>
                                    </div>

                                    {/* Remote Participants */}
                                    {participants.map((p) => (
                                        <div key={p.email} className="p-2 border border-white/5 rounded-lg bg-white/[0.01] flex items-center gap-2.5 animate-spring-up">
                                            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/10">
                                                <Image src={p.avatar} alt="Avatar" fill className="object-cover" />
                                            </div>
                                            <div className="min-w-0 flex-1 flex items-center justify-between">
                                                <span className="font-semibold text-white truncate">{p.name}</span>
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Disconnect trigger */}
                            <Button
                                onClick={handleLeaveRoom}
                                className="w-full text-xs font-black uppercase tracking-wider bg-red-950/20 border border-red-500/20 hover:border-red-500/50 text-red-400"
                            >
                                Leave Room & Disconnect
                            </Button>
                        </div>
                    )}
                </div>
            </ModalShell>
        </div>
    );
}
