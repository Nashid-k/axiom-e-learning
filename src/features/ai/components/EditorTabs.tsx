'use client';

import { cn } from '@/lib/utils';

interface EditorTabsProps {
    openTabs: string[];
    activeFilePath: string;
    onSelectTab: (path: string) => void;
    onCloseTab: (path: string) => void;
}

export function EditorTabs({
    openTabs,
    activeFilePath,
    onSelectTab,
    onCloseTab
}: EditorTabsProps) {
    
    const getFileName = (path: string) => {
        return path.split('/').pop() || 'untitled';
    };

    const getTabLangClass = (path: string) => {
        const ext = path.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'html': return 'text-orange-500';
            case 'css': return 'text-cyan-400';
            case 'js': return 'text-yellow-400';
            case 'ts': return 'text-blue-400';
            case 'py': return 'text-indigo-400';
            case 'sql': return 'text-pink-400';
            default: return 'text-white/45';
        }
    };

    return (
        <div className="flex w-full overflow-x-auto bg-[#030406]/70 border-b border-white/5 custom-scrollbar select-none">
            {openTabs.map((tabPath) => {
                const isActive = tabPath === activeFilePath;
                const fileName = getFileName(tabPath);
                
                return (
                    <div
                        key={tabPath}
                        onClick={() => onSelectTab(tabPath)}
                        className={cn(
                            "group flex items-center gap-2 px-4 py-2.5 border-r border-white/5 cursor-pointer text-xs font-mono transition-all duration-200 shrink-0 relative",
                            isActive 
                                ? "bg-white/[0.03] text-white border-t-2 border-t-[var(--color-primary)] font-semibold" 
                                : "text-[var(--fg-secondary)] hover:text-white hover:bg-white/[0.01]"
                        )}
                    >
                        {/* Bullet indicators styled like code type */}
                        <span className={cn("text-[9px] font-black scale-90", getTabLangClass(tabPath))}>•</span>
                        
                        <span>{fileName}</span>

                        {/* Close Action */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onCloseTab(tabPath);
                            }}
                            className="opacity-0 group-hover:opacity-100 hover:text-white p-0.5 rounded hover:bg-white/10 transition-all text-white/40 cursor-pointer ml-1.5"
                            title="Close tab"
                        >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Visual accent indicator bottom of active tabs */}
                        {isActive && (
                            <div className="absolute left-0 right-0 bottom-0 h-[1.5px] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)]" />
                        )}
                    </div>
                );
            })}

            {openTabs.length === 0 && (
                <div className="flex items-center px-4 py-2 text-[var(--fg-secondary)] italic opacity-60 text-xs">
                    No files open.
                </div>
            )}
        </div>
    );
}
