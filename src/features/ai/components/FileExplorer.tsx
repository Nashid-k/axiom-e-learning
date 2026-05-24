'use client';

import { useState } from 'react';
import { VFS } from '../types/vfs-types';
import { cn } from '@/lib/utils';

interface FileExplorerProps {
    files: VFS;
    activeFilePath: string;
    onSelectFile: (path: string) => void;
    onCreateFile: (path: string, content?: string) => void;
    onDeleteFile: (path: string) => void;
}

export function FileExplorer({
    files,
    activeFilePath,
    onSelectFile,
    onCreateFile,
    onDeleteFile
}: FileExplorerProps) {
    const [isCreating, setIsCreating] = useState(false);
    const [newFileName, setNewFileName] = useState('');

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = newFileName.trim();
        if (!trimmed) return;
        
        // Ensure path starts with slash
        const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
        onCreateFile(path, '');
        setNewFileName('');
        setIsCreating(false);
    };

    const getFileIcon = (fileName: string) => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'html':
                return <span className="text-orange-500 font-bold text-[10px]">HTML</span>;
            case 'css':
                return <span className="text-cyan-400 font-bold text-[10px]">CSS</span>;
            case 'js':
                return <span className="text-yellow-400 font-bold text-[10px]">JS</span>;
            case 'ts':
                return <span className="text-blue-400 font-bold text-[10px]">TS</span>;
            case 'py':
                return <span className="text-indigo-400 font-bold text-[10px]">PY</span>;
            case 'sql':
                return <span className="text-pink-400 font-bold text-[10px]">SQL</span>;
            default:
                return <span className="text-slate-400 font-bold text-[10px]">FILE</span>;
        }
    };

    return (
        <div className="w-full flex flex-col h-full bg-[#030406]/40 border-r border-white/5 select-none font-sans text-xs">
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--fg-secondary)]">Workspace</span>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className="p-1.5 rounded-lg border border-white/5 hover:border-white/20 bg-white/5 text-white flex items-center justify-center hover:scale-105 active:scale-95 cursor-pointer"
                    title="New File..."
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            {/* VFS File List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-0.5 custom-scrollbar">
                {isCreating && (
                    <form onSubmit={handleCreateSubmit} className="p-2 border border-[var(--color-primary)]/30 rounded-lg bg-black/40 mb-2">
                        <input
                            type="text"
                            placeholder="filename.html..."
                            value={newFileName}
                            onChange={(e) => setNewFileName(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 px-2.5 py-1.5 rounded text-xs outline-none text-white font-mono placeholder:text-white/20"
                            autoFocus
                            onBlur={() => {
                                setTimeout(() => {
                                    if (!newFileName.trim()) setIsCreating(false);
                                }, 200);
                            }}
                        />
                        <div className="flex gap-1.5 mt-2 justify-end">
                            <button
                                type="button"
                                onClick={() => setIsCreating(false)}
                                className="px-2 py-1 rounded bg-white/5 text-white/50 text-[10px] uppercase font-bold hover:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-2 py-1 rounded bg-[var(--color-primary)] text-white text-[10px] uppercase font-bold hover:shadow-[0_0_8px_rgba(10,132,255,0.4)]"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                )}

                {Object.values(files).map((file) => {
                    const isActive = file.path === activeFilePath;
                    return (
                        <div
                            key={file.path}
                            onClick={() => onSelectFile(file.path)}
                            className={cn(
                                "group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-200",
                                isActive 
                                    ? "bg-white/10 text-white font-semibold" 
                                    : "text-[var(--fg-secondary)] hover:text-white hover:bg-white/5"
                            )}
                        >
                            <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-7 h-5 flex items-center justify-center rounded bg-white/5 border border-white/5 scale-90 group-hover:bg-white/10">
                                    {getFileIcon(file.name)}
                                </div>
                                <span className="font-mono text-xs truncate">{file.name}</span>
                            </div>

                            {/* Actions (Delete) */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm(`Delete ${file.name}? This action is irreversible.`)) {
                                        onDeleteFile(file.path);
                                    }
                                }}
                                className="opacity-0 group-hover:opacity-100 hover:text-[var(--color-accent)] p-1 transition-all rounded hover:bg-white/5 text-[var(--fg-secondary)] cursor-pointer"
                                title="Delete file"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    );
                })}

                {Object.keys(files).length === 0 && (
                    <div className="text-center py-8 text-[var(--fg-secondary)] italic opacity-60">
                        No files in workspace.<br/>Click + to create one.
                    </div>
                )}
            </div>
        </div>
    );
}
