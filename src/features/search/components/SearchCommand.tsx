'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { SearchResult } from '@/features/search/engine';
import { useSearchEngine } from '@/features/search/hooks/useSearchEngine';
import { useDebounce } from '@/lib/utils/useDebounce';
import { CategoryIcon } from '@/features/curriculum/components/CategoryIcon';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';

interface SearchCommandProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchCommand({ isOpen, onClose }: SearchCommandProps) {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const debouncedQuery = useDebounce(query, 200);
    const { results, hasNextPage, fetchNextPage, isFetchingNextPage } = useSearchEngine(debouncedQuery);

    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) fetchNextPage();
        }, { threshold: 0.1 });
        if (observerTarget.current) observer.observe(observerTarget.current);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
    }, [router, onClose]);

    const handleKeyboardNav = useCallback((e: KeyboardEvent) => {
        if (!isOpen) return;
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(i => Math.min(i + 1, results.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(i => Math.max(i - 1, 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (results[selectedIndex]) handleSelect(results[selectedIndex]);
                break;
            case 'Escape':
                e.preventDefault();
                onClose();
                break;
        }
    }, [isOpen, results, selectedIndex, handleSelect, onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyboardNav);
        return () => document.removeEventListener('keydown', handleKeyboardNav);
    }, [handleKeyboardNav]);

    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 50);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = original; };
    }, [isOpen]);

    if (typeof document === 'undefined' || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-10 sm:pt-[15vh] px-4">
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60" onClick={onClose} />
            
            <div className="relative w-full max-w-2xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-md shadow-2xl flex flex-col overflow-hidden">
                <div className="flex items-center px-6 py-4 border-b border-neutral-100 dark:border-neutral-900 gap-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-neutral-400">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21L16.65 16.65" />
                    </svg>
                    <Input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                        placeholder="Search for tracks or topics..."
                        className="border-none p-0 focus:ring-0 text-lg placeholder:text-neutral-300 dark:placeholder:text-neutral-700"
                        containerClassName="flex-1"
                    />
                    <kbd className="hidden sm:block px-2 py-1 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded text-[10px] font-bold text-neutral-400">ESC</kbd>
                </div>

                <div className="max-h-[50vh] overflow-y-auto p-2">
                    {results.length === 0 ? (
                        <div className="py-12 text-center text-sm font-bold uppercase tracking-widest text-neutral-400">
                            No results found
                        </div>
                    ) : (
                        <div role="listbox">
                            {results.map((result, idx) => {
                                const isSelected = idx === selectedIndex;
                                return (
                                    <button
                                        key={`${result.slug}-${idx}`}
                                        onClick={() => handleSelect(result)}
                                        className={cn(
                                            "w-full px-4 py-3 flex items-center gap-4 text-left rounded-sm transition-none group",
                                            isSelected ? 'bg-neutral-100 dark:bg-neutral-900' : 'hover:bg-neutral-50 dark:hover:bg-neutral-950'
                                        )}
                                    >
                                        <div className="w-10 h-10 border border-neutral-100 dark:border-neutral-900 rounded flex items-center justify-center shrink-0">
                                            <CategoryIcon category={result.category} className="w-5 h-5 grayscale opacity-50 group-hover:opacity-100" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className={cn("font-bold truncate", isSelected ? 'text-brand-500' : 'text-black dark:text-white')}>
                                                    {result.title}
                                                </span>
                                                {result.itemType && (
                                                    <span className="px-1.5 py-0.5 rounded-sm bg-neutral-100 dark:bg-neutral-800 text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                                                        {result.itemType}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                                                {result.category} {result.phase && `· Phase ${result.phase}`}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                            <div ref={observerTarget} className="h-2 w-full" />
                        </div>
                    )}
                </div>

                {results.length > 0 && (
                    <div className="px-6 py-3 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                            <span className="flex items-center gap-1"><kbd className="px-1 bg-white dark:bg-black border rounded">↑↓</kbd> Navigate</span>
                            <span className="flex items-center gap-1"><kbd className="px-1 bg-white dark:bg-black border rounded">↵</kbd> Select</span>
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                            Axiom Search
                        </div>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}
