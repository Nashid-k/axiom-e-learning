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
        setMounted(true);
    }, []);

    const debouncedQuery = useDebounce(query, 300);
    const { results } = useSearchEngine(debouncedQuery);

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
        if (isOpen) {
            trackEvent('search_opened');
            const timeoutId = setTimeout(() => inputRef.current?.focus(), 150);
            return () => clearTimeout(timeoutId);
        }
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
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-start justify-center pt-6 sm:pt-[10vh] px-4" role="dialog" aria-modal="true" aria-label="Axiom Cosmos Search">
                    {/* Immersive Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/40 dark:bg-[#050505]/70 backdrop-blur-[8px] cursor-pointer"
                        onClick={onClose}
                    />

                    {/* Cosmos Search Container */}
                    <motion.div
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 40, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20, filter: 'blur(5px)' }}
                        transition={{ type: "spring", stiffness: 400, damping: 32, mass: 1 }}
                        className="
                            relative w-full max-w-3xl
                            bg-white/95 dark:bg-[#0D0D0E]/95 backdrop-blur-[16px]
                            rounded-[28px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)] 
                            border border-white/20 dark:border-white/10
                            overflow-hidden transform-gpu translate-z-0
                        "
                    >
                        {/* Search Input Bar */}
                        <div className="relative z-10 flex items-center gap-3 sm:gap-5 px-5 sm:px-8 py-5 sm:py-7 border-b border-black/5 dark:border-white/5">
                            <div className="flex-shrink-0">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shadow-lg shadow-blue-500/20"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-500 sm:w-6 sm:h-6">
                                        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="3" />
                                        <path d="M20 20L16 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                </motion.div>
                            </div>
                            <Input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setSelectedIndex(0);
                                }}
                                placeholder="Navigate the Axiom Cosmos..."
                                className="bg-transparent border-none focus-ring shadow-none focus-within:ring-0 text-lg sm:text-xl font-medium placeholder-[var(--fg-muted)]/40 h-auto p-0"
                                containerClassName="flex-1"
                            />
                            <div className="hidden sm:flex items-center gap-3">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-white/10">
                                    <kbd className="text-[10px] font-black font-mono opacity-60">ESC</kbd>
                                    <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Abort</span>
                                </div>
                            </div>
                        </div>

                        {/* Category Cosmos Rails */}
                        {categories.length > 0 && (
                            <div className="relative z-10 px-5 sm:px-8 py-4 sm:py-5 bg-black/[0.02] dark:bg-white/[0.02] flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide border-b border-black/5 dark:border-white/5">
                                <button
                                    onClick={() => { setSelectedCategory(null); setSelectedIndex(0); }}
                                    className={cn(
                                        "px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] uppercase font-black tracking-[0.2em] transition-all duration-300 border flex-shrink-0",
                                        !selectedCategory
                                            ? "bg-blue-600 text-white border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                                            : "bg-white/5 dark:bg-white/5 text-[var(--fg-muted)] border-transparent hover:border-white/20"
                                    )}
                                >
                                    COSMOS
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => { setSelectedCategory(cat); setSelectedIndex(0); }}
                                        className={cn(
                                            "px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] uppercase font-black tracking-[0.2em] transition-all duration-300 border flex-shrink-0",
                                            selectedCategory === cat
                                                ? "bg-blue-600 text-white border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                                                : "bg-white/5 dark:bg-white/5 text-[var(--fg-muted)] border-transparent hover:border-white/20"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Results Hub */}
                        <div className="relative z-10 max-h-[50vh] sm:max-h-[60vh] min-h-[250px] sm:min-h-[300px] overflow-y-auto p-3 sm:p-4 scrollbar-hide space-y-2">
                            {filteredResults.length === 0 ? (
                                <div className="py-12 sm:py-20">
                                    <EmptyState
                                        title="Orbit Empty"
                                        description={`No signals found for "${query}" in this sector.`}
                                    />
                                </div>
                            ) : (
                                <div role="listbox" aria-label="Signals Hub">
                                    {filteredResults.map((result, idx) => {
                                        const isHero = idx === 0 && !query;
                                        const isSelected = idx === clampedSelectedIndex;

                                        return (
                                            <motion.button
                                                key={`${result.slug}-${idx}`}
                                                role="option"
                                                aria-selected={isSelected}
                                                onClick={() => handleSelect(result)}
                                                className={cn(
                                                    "w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-4 sm:gap-6 text-left rounded-[20px] transition-all duration-500 group relative mb-2",
                                                    isSelected
                                                        ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/40 ring-2 ring-white/20'
                                                        : 'hover:bg-white/5 dark:hover:bg-white/[0.04] text-[var(--fg-primary)]'
                                                )}
                                            >
                                                {/* Pulsing Selection Glow */}
                                                {isSelected && (
                                                    <motion.div
                                                        layoutId="search-glow"
                                                        className="absolute inset-0 rounded-[20px] bg-blue-400/20 blur-xl pointer-events-none"
                                                        initial={false}
                                                    />
                                                )}

                                                <div className={cn(
                                                    "relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-[14px] flex items-center justify-center transition-all duration-700",
                                                    isSelected ? 'bg-white/20 scale-110 rotate-3' : 'bg-[var(--surface-raised)] border border-white/10 dark:bg-white/5'
                                                )}>
                                                    <CategoryIcon category={result.category} className="w-6 h-6 sm:w-8 sm:h-8" />
                                                    {isSelected && (
                                                        <motion.div
                                                            animate={{ scale: [1, 1.4, 1], opacity: [0, 0.5, 0] }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                            className="absolute inset-0 rounded-[14px] bg-white opacity-0"
                                                        />
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0 z-10">
                                                    <div className="flex items-center gap-3 mb-1.5">
                                                        <span className={cn(
                                                            "font-black text-base sm:text-lg truncate tracking-tight",
                                                            isSelected ? 'text-white' : 'text-[var(--fg-primary)]'
                                                        )}>
                                                            {result.title}
                                                        </span>
                                                        {result.itemType && (
                                                            <span className={cn(
                                                                "px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest",
                                                                isSelected
                                                                    ? "bg-white/20 text-white"
                                                                    : result.itemType === 'practical'
                                                                        ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/20"
                                                                        : "bg-blue-500/15 text-blue-500 border border-blue-500/20"
                                                            )}>
                                                                {result.itemType}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className={cn(
                                                        "text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2",
                                                        isSelected ? 'text-blue-100/70' : 'text-[var(--fg-muted)]'
                                                    )}>
                                                        <span>{result.category}</span>
                                                        {result.phase && (
                                                            <>
                                                                <span className="opacity-30">•</span>
                                                                <span className="opacity-80">Sector {result.phase}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                {isSelected && (
                                                    <div className="flex items-center gap-3 sm:gap-4 pr-1 z-10">
                                                        <div className="hidden sm:flex flex-col items-end gap-1">
                                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Execute</span>
                                                            <div className="px-2 py-1 rounded-lg bg-white/20 border border-white/20 text-[9px] font-mono">ENTER</div>
                                                        </div>
                                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center">
                                                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5-5 5" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Navigation Footer */}
                        {results.length > 0 && (
                            <div className="px-5 sm:px-8 py-4 sm:py-5 bg-[var(--surface-subtle)]/50 backdrop-blur-md border-t border-white/5 flex items-center justify-between z-20 relative">
                                <div className="flex gap-4 sm:gap-6">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--fg-muted)]">
                                        <div className="flex gap-1">
                                            <kbd className="px-1.5 py-0.5 sm:py-1 bg-white/10 rounded-lg border border-white/10">↑</kbd>
                                            <kbd className="px-1.5 py-0.5 sm:py-1 bg-white/10 rounded-lg border border-white/10">↓</kbd>
                                        </div>
                                        <span className="hidden xs:inline">Orbit</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--fg-muted)]">
                                        <kbd className="px-2 py-0.5 sm:py-1 bg-white/10 rounded-lg border border-white/10">↵</kbd>
                                        <span className="hidden xs:inline">Jump</span>
                                    </div>
                                </div>
                                <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/60 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                    Axiom Cosmos Engine
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
