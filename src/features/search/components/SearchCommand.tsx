'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Home, Trophy, BookOpen, Moon, Sun, LogOut, Sparkles } from 'lucide-react';
import { SearchResult } from '@/features/search/engine';
import { useSearchEngine } from '@/features/search/hooks/useSearchEngine';
import { useDebounce } from '@/lib/utils/useDebounce';
import { CategoryIcon } from '@/features/curriculum/components/CategoryIcon';
import { useTheme } from 'next-themes';
import { useAuth } from '@/features/auth/AuthContext';

interface SearchCommandProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchCommand({ isOpen, onClose }: SearchCommandProps) {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const { logout } = useAuth();

    const debouncedQuery = useDebounce(query, 200);
    const { results } = useSearchEngine(debouncedQuery);

    const handleSelect = useCallback((result: SearchResult) => {
        if (result.type === 'curriculum') {
            router.push(`/learn/${result.slug}`);
        } else if (result.type === 'item' && result.phase && result.itemType) {
            const typeParam = result.itemType === 'practical' ? 'Practical' : 'Theory';
            router.push(`/learn/${result.slug}?concept=${encodeURIComponent(result.title)}&phase=${encodeURIComponent(String(result.phase))}&type=${typeParam}&category=${encodeURIComponent(result.category)}`);
        } else {
            router.push(`/learn/${result.slug}`);
        }
        onClose();
        setQuery('');
    }, [router, onClose]);

    useEffect(() => {
        if (!isOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = original; };
    }, [isOpen]);

    const runCommand = useCallback((command: () => void) => {
        onClose();
        setQuery('');
        command();
    }, [onClose]);

    if (typeof document === 'undefined') return null;

    return (
        <Command.Dialog 
            open={isOpen} 
            onOpenChange={(open) => !open && onClose()}
            label="Global Command Palette"
            className="fixed inset-0 z-[1000] flex items-start justify-center pt-[15vh] px-4"
        >
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm" onClick={onClose} />
            
            <div className="relative w-full max-w-2xl bg-[var(--surface-base)] border border-[var(--surface-border)] rounded-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden">
                <Command.Input 
                    value={query}
                    onValueChange={setQuery}
                    placeholder="Type a command or search curriculum..." 
                    className="w-full text-lg px-5 py-4 border-b border-[var(--surface-border)] bg-transparent text-[var(--fg-primary)] outline-none placeholder:text-[var(--fg-muted)]"
                />
                <Command.List className="max-h-[400px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-[var(--surface-border)]">
                    <Command.Empty className="py-12 text-center text-sm font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                        No results found.
                    </Command.Empty>

                    {!query && (
                        <>
                            <Command.Group heading="Navigation" className="px-2 py-2">
                                <Command.Item 
                                    onSelect={() => runCommand(() => router.push('/paths'))}
                                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm cursor-pointer aria-selected:bg-[var(--surface-raised)] aria-selected:text-[var(--color-primary)] transition-colors"
                                >
                                    <Home className="w-4 h-4" />
                                    <span className="font-medium">Dashboard</span>
                                </Command.Item>
                                <Command.Item 
                                    onSelect={() => runCommand(() => router.push('/leaderboard'))}
                                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm cursor-pointer aria-selected:bg-[var(--surface-raised)] aria-selected:text-[var(--color-primary)] transition-colors"
                                >
                                    <Trophy className="w-4 h-4" />
                                    <span className="font-medium">Leaderboard</span>
                                </Command.Item>
                                <Command.Item 
                                    onSelect={() => runCommand(() => router.push('/flashcards'))}
                                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm cursor-pointer aria-selected:bg-[var(--surface-raised)] aria-selected:text-[var(--color-primary)] transition-colors"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    <span className="font-medium">Flashcards</span>
                                </Command.Item>
                            </Command.Group>

                            <Command.Group heading="Actions" className="px-2 py-2 border-t border-[var(--surface-border)]">
                                <Command.Item 
                                    onSelect={() => runCommand(() => setTheme(theme === 'dark' ? 'light' : 'dark'))}
                                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm cursor-pointer aria-selected:bg-[var(--surface-raised)] aria-selected:text-[var(--color-primary)] transition-colors"
                                >
                                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                    <span className="font-medium">Toggle Theme</span>
                                </Command.Item>
                                <Command.Item 
                                    onSelect={() => runCommand(() => window.dispatchEvent(new CustomEvent('axiom:open-ai')))}
                                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm cursor-pointer aria-selected:bg-[var(--color-primary-glow)] aria-selected:text-[var(--color-primary)] text-[var(--color-primary)] transition-colors"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    <span className="font-bold">Ask Maya Sensei</span>
                                </Command.Item>
                                <Command.Item 
                                    onSelect={() => runCommand(() => logout())}
                                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm cursor-pointer aria-selected:bg-red-500/10 aria-selected:text-red-500 text-red-500 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="font-medium">Sign Out</span>
                                </Command.Item>
                            </Command.Group>
                        </>
                    )}

                    {results.length > 0 && (
                        <Command.Group heading="Curriculum" className="px-2 py-2 border-t border-[var(--surface-border)]">
                            {results.map((result, idx) => (
                                <Command.Item
                                    key={`${result.slug}-${idx}`}
                                    value={`${result.title} ${result.category}`}
                                    onSelect={() => handleSelect(result)}
                                    className="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer aria-selected:bg-[var(--surface-raised)] transition-colors group"
                                >
                                    <div className="w-8 h-8 border border-[var(--surface-border)] rounded flex items-center justify-center shrink-0 bg-[var(--surface-base)] group-aria-selected:border-[var(--color-primary)]/50">
                                        <CategoryIcon category={result.category} className="w-4 h-4 grayscale opacity-50 group-aria-selected:opacity-100 group-aria-selected:grayscale-0 group-aria-selected:text-[var(--color-primary)]" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm truncate group-aria-selected:text-[var(--color-primary)] text-[var(--fg-primary)]">
                                                {result.title}
                                            </span>
                                            {result.itemType && (
                                                <span className="px-1.5 py-0.5 rounded-md bg-[var(--surface-raised)] border border-[var(--surface-border)] text-[8px] font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                                                    {result.itemType}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)] mt-0.5">
                                            {result.category} {result.phase && `· Phase ${result.phase}`}
                                        </div>
                                    </div>
                                </Command.Item>
                            ))}
                        </Command.Group>
                    )}
                </Command.List>
                
                <div className="px-4 py-3 bg-[var(--surface-raised)] border-t border-[var(--surface-border)] flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-[var(--surface-base)] border border-[var(--surface-border)] rounded shadow-sm">↑↓</kbd> Navigate</span>
                        <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-[var(--surface-base)] border border-[var(--surface-border)] rounded shadow-sm">↵</kbd> Select</span>
                    </div>
                    <div>Axiom Command</div>
                </div>
            </div>
        </Command.Dialog>
    );
}
