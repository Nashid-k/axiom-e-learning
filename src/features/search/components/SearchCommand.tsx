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
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';



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
                        initial={shouldReduceMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.98, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 20 }}
                        transition={shouldReduceMotion ? { duration: 0.01 } : { type: "spring", stiffness: 400, damping: 40, mass: 0.8 }}
                        className="
                            relative w-full max-w-3xl
                            bg-white/80 dark:bg-[#0D0D0E]/80 backdrop-blur-3xl 
                            rounded-[36px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] 
                            border border-black/[0.03] dark:border-white/10 
                            overflow-hidden transform-gpu translate-z-0
                        "
                    >
                        { }
                        <div className="flex items-center gap-4 px-6 py-5 border-b border-black/[0.03] dark:border-white/5 bg-white/5 focus-within:bg-transparent transition-all duration-500">
                            <Input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setSelectedIndex(0);
                                }}
                                placeholder="Search the Axiom universe..."
                                className="bg-transparent border-none focus-ring shadow-none focus-within:ring-0"
                                containerClassName="flex-1"
                            />
                            <div className="hidden sm:flex items-center gap-2">
                                <span className="px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/[0.03] dark:border-white/5 text-[9px] uppercase font-black text-gray-500 dark:text-gray-400 tracking-[0.2em] font-mono">
                                    Axiom Command
                                </span>
                            </div>
                        </div>

                        {categories.length > 0 && (
                            <div className="px-6 py-4 bg-black/[0.02] dark:bg-white/[0.02] flex gap-3 overflow-x-auto scrollbar-hide border-b border-black/[0.03] dark:border-white/5">
                                <button
                                    onClick={() => {
                                        setSelectedCategory(null);
                                        setSelectedIndex(0);
                                    }}
                                    className={cn(
                                        "px-4 py-2 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all duration-300",
                                        !selectedCategory
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                            : "bg-white/50 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-white/10"
                                    )}
                                    type="button"
                                >
                                    Universe
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            setSelectedIndex(0);
                                        }}
                                        className={cn(
                                            "px-4 py-2 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all duration-300",
                                            selectedCategory === cat
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                                : "bg-white/50 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-white/10"
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
                                <EmptyState
                                    title="No matches found"
                                    description={`We couldn't find any results for "${query}" in the universe.`}
                                />
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
                                                "w-full px-5 py-4 flex items-center gap-5 text-left rounded-[24px] transition-all duration-300 group cursor-pointer",
                                                idx === clampedSelectedIndex
                                                    ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/30'
                                                    : 'hover:bg-black/[0.03] dark:hover:bg-white/5 text-gray-700 dark:text-gray-200'
                                            )}
                                        >
                                            <div className={cn(
                                                "p-3 rounded-[16px] transition-all duration-500",
                                                idx === clampedSelectedIndex ? 'bg-white/20 scale-110' : 'bg-white shadow-sm dark:bg-white/5 border border-black/[0.03] dark:border-white/5'
                                            )}>
                                                <CategoryIcon category={result.category} className="w-7 h-7" />
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
                                                    "text-[10px] font-black uppercase tracking-[0.15em]",
                                                    idx === clampedSelectedIndex ? 'text-blue-100/60' : 'text-gray-400 dark:text-gray-500'
                                                )}>
                                                    <span>{result.category}</span>
                                                    {result.phase && (
                                                        <>
                                                            <span className="mx-2 opacity-30">•</span>
                                                            <span className="opacity-80">Phase {result.phase}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {idx === clampedSelectedIndex ? (
                                                <div className="flex items-center gap-2 pr-2">
                                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">ENTER</span>
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5-5 5M6 7l5 5-5 5" /></svg>
                                                </div>
                                            ) : (
                                                <div className="pr-2 opacity-0 group-hover:opacity-40 transition-opacity">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                                </div>
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