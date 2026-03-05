'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { SearchResult } from '@/features/search/engine';
import { useSearchEngine } from '@/features/search/hooks/useSearchEngine';
import { useDebounce } from '@/lib/utils/useDebounce';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Skeleton } from '@/components/ui/Skeleton';
import { CategoryIcon } from '@/features/curriculum/components/CategoryIcon';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/telemetry';



interface SearchCommandProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchCommand({ isOpen, onClose }: SearchCommandProps) {
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    const MOTION_MICRO = shouldReduceMotion ? 0.01 : 0.2;

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);


    const debouncedQuery = useDebounce(query, 300);
    const { results } = useSearchEngine(debouncedQuery);
    const isIndexBuilding = false;

    const filteredResults = useMemo(() => {
        if (!selectedCategory) return results;
        return results.filter(r => r.category === selectedCategory);
    }, [results, selectedCategory]);

    const clampedSelectedIndex = Math.min(selectedIndex, Math.max(filteredResults.length - 1, 0));

    const categories = useMemo(() => {
        const cats = new Set(results.map(r => r.category));
        return Array.from(cats);
    }, [results]);


    const handleSelect = useCallback((result: SearchResult) => {
        trackEvent('search_result_opened', {
            type: result.type,
            category: result.category,
            hasPhase: !!result.phase
        });
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
                if (filteredResults.length === 0) break;
                setSelectedIndex(i => Math.min(i + 1, filteredResults.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (filteredResults.length === 0) break;
                setSelectedIndex(i => Math.max(i - 1, 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredResults[clampedSelectedIndex]) {
                    handleSelect(filteredResults[clampedSelectedIndex]);
                }
                break;
            case 'Escape':
                e.preventDefault();
                onClose();
                break;
        }
    }, [isOpen, filteredResults, clampedSelectedIndex, onClose, handleSelect]);


    useEffect(() => {
        document.addEventListener('keydown', handleKeyboardNav);
        return () => document.removeEventListener('keydown', handleKeyboardNav);
    }, [handleKeyboardNav]);


    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout> | null = null;
        if (isOpen) {
            trackEvent('search_opened');
            timeoutId = setTimeout(() => inputRef.current?.focus(), 50);
        }
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);




    if (!mounted) return null;

    return createPortal(
        <AnimatePresence mode="wait">
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-6 sm:pt-[12vh] px-4" role="dialog" aria-modal="true" aria-label="Search command dialog">

                    { }
                    <motion.div
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: MOTION_MICRO }}
                        className="absolute inset-0 bg-gray-900/40 backdrop-blur-md cursor-pointer"
                        onClick={onClose}
                    />

                    { }
                    <motion.div
                        initial={shouldReduceMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -20 }}
                        transition={shouldReduceMotion ? { duration: 0.01 } : { type: "spring", stiffness: 350, damping: 30 }}
                        className="
                            relative w-full max-w-2xl xl:max-w-3xl
                            bg-white/80 dark:bg-[#121212]/90 backdrop-blur-xl 
                            rounded-3xl shadow-2xl shadow-black/20 dark:shadow-black/50 
                            border border-gray-200 dark:border-white/10 
                            overflow-hidden
                        "
                    >
                        { }
                        <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-gray-100 dark:border-white/5 focus-within:border-emerald-400/60 dark:focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/15 transition-all duration-200">
                            <div className="text-gray-400 dark:text-white/40">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.35-4.35" />
                                </svg>
                            </div>
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setSelectedIndex(0);
                                }}
                                placeholder="What do you want to master?"
                                aria-label="Search curriculum"
                                role="combobox"
                                aria-expanded={isOpen}
                                aria-controls="search-results-listbox"
                                aria-autocomplete="list"
                                className="flex-1 bg-transparent text-lg sm:text-xl font-medium text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 axiom-input-control"
                            />
                            <div className="hidden sm:flex items-center gap-2">
                                <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-[10px] uppercase font-bold text-gray-400 dark:text-white/30 tracking-wider font-mono">
                                    AXIOM-OS v3.0
                                </span>
                            </div>
                        </div>

                        {categories.length > 0 && (
                            <div className="px-5 sm:px-6 py-3 border-b border-gray-100 dark:border-white/5 flex gap-2 overflow-x-auto scrollbar-hide">
                                <button
                                    onClick={() => {
                                        setSelectedCategory(null);
                                        setSelectedIndex(0);
                                    }}
                                    className={cn(
                                        "px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all",
                                        !selectedCategory
                                            ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
                                            : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
                                    )}
                                    type="button"
                                >
                                    All Results
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            setSelectedIndex(0);
                                        }}
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all",
                                            selectedCategory === cat
                                                ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
                                                : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
                                        )}
                                        type="button"
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}

                        { }
                        <div className="max-h-[50vh] overflow-y-auto p-2 scrollbar-hide">
                            {isIndexBuilding ? (
                                <div className="p-4 space-y-4">
                                    <Skeleton className="h-12 w-full rounded-xl" />
                                    <Skeleton className="h-12 w-full rounded-xl" />
                                    <Skeleton className="h-12 w-full rounded-xl" />
                                </div>
                            ) : filteredResults.length === 0 ? (
                                <div className="py-16 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-3xl">
                                        🤔
                                    </div>
                                    <div className="text-gray-500 dark:text-white/40">
                                        No matches found for <span className="font-bold text-gray-900 dark:text-white">&quot;{query}&quot;</span>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    id="search-results-listbox"
                                    role="listbox"
                                    aria-label="Search results"
                                    className="space-y-1"
                                >
                                    {filteredResults.map((result, idx) => (
                                        <motion.button
                                            key={`${result.slug}-${idx}`}
                                            role="option"
                                            aria-selected={idx === clampedSelectedIndex}
                                            onClick={() => handleSelect(result)}
                                            className={cn(
                                                "w-full px-4 py-3 flex items-center gap-4 text-left rounded-2xl transition-all duration-200 group cursor-pointer min-h-[48px]",
                                                idx === clampedSelectedIndex
                                                    ? 'bg-blue-500 text-white shadow-xl shadow-blue-500/30 -translate-y-0.5'
                                                    : 'hover:bg-gray-100/70 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200'
                                            )}
                                        >
                                            <div className={cn(
                                                "p-2.5 rounded-xl transition-colors",
                                                idx === clampedSelectedIndex ? 'bg-white/20' : 'bg-gray-100 dark:bg-white/5'
                                            )}>
                                                <CategoryIcon category={result.category} className="w-6 h-6" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className={cn(
                                                        "font-bold text-base truncate",
                                                        idx === clampedSelectedIndex ? 'text-white' : 'text-gray-900 dark:text-white'
                                                    )}>
                                                        {result.title}
                                                    </div>
                                                    {result.itemType && (
                                                        <span className={cn(
                                                            "px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter",
                                                            idx === clampedSelectedIndex
                                                                ? "bg-white/20 text-white"
                                                                : result.itemType === 'practical'
                                                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                                                    : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                                                        )}>
                                                            {result.itemType}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className={cn(
                                                    "text-xs truncate flex items-center gap-1.5",
                                                    idx === clampedSelectedIndex ? 'text-blue-100/80' : 'text-gray-500 dark:text-gray-400'
                                                )}>
                                                    <span>{result.category}</span>
                                                    {result.phase && (
                                                        <>
                                                            <span className="opacity-30">•</span>
                                                            <span className="font-medium">Phase {result.phase}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {idx === clampedSelectedIndex ? (
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">OPEN</span>
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white">
                                                        <path d="M5 12h14m-7-7 7 7-7 7" />
                                                    </svg>
                                                </div>
                                            ) : (
                                                <kbd className="hidden sm:flex items-center justify-center p-1.5 min-w-[24px] rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-[10px] font-mono text-gray-400">
                                                    ↵
                                                </kbd>
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            )}
                        </div>

                        { }
                        {results.length > 0 && (
                            <div className="px-6 py-3 bg-gray-50/50 dark:bg-white/5 border-t border-gray-100/50 dark:border-white/5 flex items-center justify-between text-xs text-gray-400 font-medium">
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-1">
                                        <kbd className="font-sans px-1.5 py-0.5 bg-white dark:bg-white/10 rounded shadow-sm border border-gray-200 dark:border-white/5">↑</kbd>
                                        <kbd className="font-sans px-1.5 py-0.5 bg-white dark:bg-white/10 rounded shadow-sm border border-gray-200 dark:border-white/5">↓</kbd>
                                        to navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="font-sans px-1.5 py-0.5 bg-white dark:bg-white/10 rounded shadow-sm border border-gray-200 dark:border-white/5">↵</kbd>
                                        to select
                                    </span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}