'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TabItemProps {
    active: boolean;
    onClick: () => void;
    icon: string;
    label: string;
    hoverLabel?: string;
}

function TabItem({ active, onClick, icon, label, hoverLabel }: TabItemProps) {
    return (
        <motion.button
            layout
            onClick={onClick}
            title={hoverLabel || label}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-200 cursor-pointer group relative mx-auto",
                active
                    ? "bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 shadow-[0_4px_16px_rgba(59,130,246,0.12)] ring-1 ring-blue-500/20"
                    : "text-gray-400 dark:text-gray-600 hover:bg-white/5 hover:text-gray-300"
            )}
        >
            {active && (
                <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-2xl bg-blue-500/10 dark:bg-blue-500/15 ring-1 ring-blue-500/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                />
            )}
            <span className={cn(
                "text-xl transition-all duration-200 relative z-10",
                active ? "scale-110 drop-shadow-sm" : "grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80"
            )}>{icon}</span>
        </motion.button>
    );
}

interface ModalSidebarProps {
    activeTab: 'ai' | 'resources' | 'dojo' | 'quiz';
    onTabChange: (tab: 'ai' | 'resources' | 'dojo' | 'quiz') => void;
}

export function ModalSidebar({ activeTab, onTabChange }: ModalSidebarProps) {
    return (
        <div className="hidden md:flex w-20 bg-gray-50/50 dark:bg-black/20 border-r border-black/5 dark:border-white/5 flex-col shrink-0 transition-colors duration-500 items-center relative z-50">
            <div className="py-8 flex flex-col items-center gap-4 shrink-0">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
            </div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            delayChildren: 0.2,
                            staggerChildren: 0.1
                        }
                    }
                }}
                className="flex-1 py-8 space-y-4 flex flex-col items-center w-full"
            >
                <TabItem
                    active={activeTab === 'ai'}
                    onClick={() => onTabChange('ai')}
                    icon="✨"
                    label="Sacred Archive"
                    hoverLabel="Concept Guide"
                />
                <TabItem
                    active={activeTab === 'resources'}
                    onClick={() => onTabChange('resources')}
                    icon="📚"
                    label="Resources & Labs"
                    hoverLabel="Visual Library"
                />
                <TabItem
                    active={activeTab === 'dojo'}
                    onClick={() => onTabChange('dojo')}
                    icon="⚔️"
                    label="Practitioner Dojo"
                    hoverLabel="Code Studio"
                />
                <TabItem
                    active={activeTab === 'quiz'}
                    onClick={() => onTabChange('quiz')}
                    icon="🧠"
                    label="Test knowledge"
                    hoverLabel="Quick Quiz"
                />
            </motion.div>
        </div>
    );
}
