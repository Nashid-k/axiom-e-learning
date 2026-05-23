'use client';

import { cn } from '@/lib/utils';

interface TabItemProps {
    active: boolean;
    onClick: () => void;
    icon: string;
    label: string;
}

function TabItem({ active, onClick, icon, label }: TabItemProps) {
    return (
        <button
            onClick={onClick}
            title={label}
            className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 cursor-pointer group relative overflow-hidden",
                active
                    ? "text-[var(--color-primary)] bg-gradient-to-br from-[var(--surface-raised)] to-black/20 border border-[var(--color-primary)]/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                    : "text-[var(--fg-secondary)] hover:text-white hover:bg-white/5 border border-transparent"
            )}
        >
            {active && (
                <span className="absolute left-0 top-3 bottom-3 w-[3px] bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-cyan)] rounded-r-full" />
            )}
            <span className={cn(
                "transition-all duration-300 ease-out z-10",
                active ? "scale-110 rotate-3 filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" : "opacity-60 group-hover:opacity-100 group-hover:scale-110"
            )}>
                {icon}
            </span>
        </button>
    );
}

interface ModalSidebarProps {
    activeTab: 'ai' | 'resources' | 'dojo' | 'quiz';
    onTabChange: (tab: 'ai' | 'resources' | 'dojo' | 'quiz') => void;
}

export function ModalSidebar({ activeTab, onTabChange }: ModalSidebarProps) {
    return (
        <div className="hidden md:flex w-16 bg-gradient-to-b from-[var(--surface-base)] to-black/50 border-r border-white/5 flex-col shrink-0 items-center py-6 gap-3">
            <TabItem
                active={activeTab === 'ai'}
                onClick={() => onTabChange('ai')}
                icon="✨"
                label="AI Guide"
            />
            <TabItem
                active={activeTab === 'resources'}
                onClick={() => onTabChange('resources')}
                icon="📚"
                label="Resources"
            />
            <TabItem
                active={activeTab === 'dojo'}
                onClick={() => onTabChange('dojo')}
                icon="⚔️"
                label="Dojo"
            />
            <TabItem
                active={activeTab === 'quiz'}
                onClick={() => onTabChange('quiz')}
                icon="🧠"
                label="Quiz"
            />
        </div>
    );
}

export function MobileTabBar({
    activeTab,
    onTabChange,
}: {
    activeTab: 'ai' | 'resources' | 'dojo' | 'quiz';
    onTabChange: (tab: 'ai' | 'resources' | 'dojo' | 'quiz') => void;
}) {
    const tabs: { id: 'ai' | 'resources' | 'dojo' | 'quiz'; icon: string; label: string }[] = [
        { id: 'ai', icon: '✨', label: 'AI' },
        { id: 'resources', icon: '📚', label: 'Docs' },
        { id: 'dojo', icon: '⚔️', label: 'Dojo' },
        { id: 'quiz', icon: '🧠', label: 'Quiz' },
    ];
    return (
        <div className="md:hidden flex border-b border-white/5 bg-[var(--surface-base)] shrink-0 z-20 p-1.5 gap-1">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={cn(
                            'flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all duration-300 border',
                            isActive
                                ? 'text-white bg-gradient-to-br from-[var(--surface-raised)] to-black/25 border-[var(--color-primary)]/20 shadow-[0_0_15px_rgba(99,102,241,0.08)]'
                                : 'text-[var(--fg-secondary)] border-transparent hover:text-white hover:bg-white/5'
                        )}
                    >
                        <span className={cn(
                            "text-base leading-none transition-transform",
                            isActive && "scale-110 filter drop-shadow-[0_0_5px_rgba(99,102,241,0.5)]"
                        )}>{tab.icon}</span>
                        <span>{tab.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

