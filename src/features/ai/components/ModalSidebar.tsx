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
                "w-12 h-12 flex items-center justify-center text-xl transition-none cursor-pointer group relative",
                active
                    ? "text-[var(--color-primary)] bg-neutral-50 dark:bg-neutral-900 border-r-2 border-[var(--color-primary)]"
                    : "text-neutral-400 hover:text-black dark:hover:text-white"
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
        <div className="hidden md:flex w-14 bg-white dark:bg-black border-r border-neutral-200 dark:border-neutral-800 flex-col shrink-0 items-center py-6 gap-2">
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
