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
                "w-12 h-12 flex items-center justify-center text-xl transition-colors duration-150 cursor-pointer group relative",
                active
                    ? "text-[var(--color-primary)] bg-[var(--surface-raised)] border-r-2 border-[var(--color-primary)]"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg-primary)]"
            )}
        >
            <span className={active ? "scale-110" : "grayscale opacity-50"}>{icon}</span>
        </button>
    );
}

interface ModalSidebarProps {
    activeTab: 'ai' | 'resources' | 'dojo' | 'quiz';
    onTabChange: (tab: 'ai' | 'resources' | 'dojo' | 'quiz') => void;
}

export function ModalSidebar({ activeTab, onTabChange }: ModalSidebarProps) {
    return (
        <div className="hidden md:flex w-14 bg-[var(--surface-base)] border-r border-[var(--surface-border)] flex-col shrink-0 items-center py-6 gap-2">
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
        <div className="md:hidden flex border-b border-[var(--surface-border)] bg-[var(--surface-base)] shrink-0 z-20">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={cn(
                        'flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[9px] font-bold uppercase tracking-widest transition-colors duration-150 border-b-2',
                        activeTab === tab.id
                            ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                            : 'text-[var(--fg-muted)] border-transparent hover:text-[var(--fg-primary)]'
                    )}
                >
                    <span className="text-base leading-none">{tab.icon}</span>
                    <span>{tab.label}</span>
                </button>
            ))}
        </div>
    );
}
