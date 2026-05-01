'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { mergeProgress, migrateLegacyData } from '@/lib/utils/progress-sync';
import { useQuery } from '@tanstack/react-query';

interface ProgressContextType {
    progress: Record<string, string[]>;
    isLoading: boolean;
    updateProgress: (slug: string, items: string[]) => void;
    refreshProgress: () => Promise<void>;
    xp: number;
    level: number;
    nextLevelXp: number;
    progressToNextLevel: number;
    streak: number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);
type WindowWithIdleCallback = Window & typeof globalThis & {
    requestIdleCallback?: (callback: () => void) => number;
};

export function ProgressProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [progress, setProgress] = useState<Record<string, string[]>>({});
    const [streak, setStreak] = useState(0);

    const uniqueId = useMemo(() => user?.email || null, [user?.email]);

    const { data: serverProgress, isLoading: serverLoading, refetch: refreshProgress } = useQuery({
        queryKey: ['progress', uniqueId],
        queryFn: async () => {
            if (!uniqueId) return null;
            const res = await fetch(`/api/progress/all?uniqueId=${uniqueId}`);
            if (!res.ok) throw new Error('Failed to fetch progress');
            const data = await res.json();
            if (data.progress) {
                const { migrated } = await migrateLegacyData(data.progress);
                return migrated;
            }
            return null;
        },
        enabled: !!uniqueId,
        staleTime: 60000,
    });

    useEffect(() => {
        if (serverProgress) {
            setProgress(prev => mergeProgress(prev, serverProgress));
            Object.entries(serverProgress).forEach(([slug, items]) => {
                try {
                    localStorage.setItem(`progress_${slug}`, JSON.stringify(items));
                } catch { }
            });
        }
    }, [serverProgress]);

    const [isLocalLoading, setIsLocalLoading] = useState(true);

    useEffect(() => {
        const readLocal = async () => {
            try {
                const localData: Record<string, string[]> = {};
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith('progress_') && !key.startsWith('progress_ops_')) {
                        const slug = key.replace('progress_', '');
                        const val = localStorage.getItem(key);
                        if (val) {
                            const items = JSON.parse(val);
                            if (Array.isArray(items)) localData[slug] = items;
                        }
                    }
                }

                const { migrated, hasChanges } = await migrateLegacyData(localData);
                if (Object.keys(migrated).length > 0) {
                    setProgress(prev => mergeProgress(prev, migrated));
                    if (hasChanges) {
                        Object.entries(migrated).forEach(([slug, items]) => {
                            localStorage.setItem(`progress_${slug}`, JSON.stringify(items));
                        });
                    }
                }
            } catch { } finally {
                setIsLocalLoading(false);
            }
        };

        if (typeof window !== 'undefined') {
            const win = window as WindowWithIdleCallback;
            if (win.requestIdleCallback) {
                win.requestIdleCallback(() => readLocal());
            } else {
                setTimeout(() => readLocal(), 0);
            }
        }
    }, []);

    const isLoading = serverLoading || isLocalLoading;

    useEffect(() => {
        const lastVisitDate = localStorage.getItem('axiom_last_visit');
        const currentStreak = parseInt(localStorage.getItem('axiom_streak') || '0', 10);
        const today = new Date().toDateString();

        if (lastVisitDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (lastVisitDate === yesterday.toDateString()) {
                const newStreak = currentStreak + 1;
                setStreak(newStreak);
                localStorage.setItem('axiom_streak', newStreak.toString());
            } else {
                setStreak(1);
                localStorage.setItem('axiom_streak', '1');
            }
            localStorage.setItem('axiom_last_visit', today);
        } else {
            setStreak(currentStreak);
        }
    }, []);

    const updateProgress = useCallback((slug: string, items: string[]) => {
        setProgress(prev => ({ ...prev, [slug]: items }));
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent(`progress_update_${slug}`, { detail: { items } }));
        }
    }, []);

    const xp = useMemo(() => Object.values(progress).reduce((acc, items) => acc + (items.length * 100), 0), [progress]);

    const stats = useMemo(() => {
        const currentLevel = Math.floor(xp / 1000) + 1;
        const base = (currentLevel - 1) * 1000;
        return {
            level: currentLevel,
            nextLevelXp: currentLevel * 1000,
            progressToNextLevel: ((xp - base) / 1000) * 100
        };
    }, [xp]);

    const contextValue = useMemo(() => ({
        progress,
        isLoading,
        updateProgress,
        refreshProgress: async () => { await refreshProgress(); },
        xp,
        level: stats.level,
        nextLevelXp: stats.nextLevelXp,
        progressToNextLevel: stats.progressToNextLevel,
        streak
    }), [progress, isLoading, updateProgress, refreshProgress, xp, stats, streak]);

    return (
        <ProgressContext.Provider value={contextValue}>
            {children}
        </ProgressContext.Provider>
    );
}

export const useGlobalProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) throw new Error('useGlobalProgress must be used within ProgressProvider');
    return context;
};
