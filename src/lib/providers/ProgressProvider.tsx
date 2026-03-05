'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { mergeProgress, migrateLegacyData } from '@/lib/utils/progress-sync';

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

export function ProgressProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [progress, setProgress] = useState<Record<string, string[]>>({});
    const [isLoading, setIsLoading] = useState(true);

    const uniqueId = useMemo(() => user?.email || null, [user?.email]);

    const refreshProgress = useCallback(async () => {
        if (!uniqueId) {
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch(`/api/progress/all?uniqueId=${uniqueId}`);
            if (res.ok) {
                const data = await res.json().catch(() => ({ progress: null }));
                if (data.progress) {
                    const { migrated } = migrateLegacyData(data.progress);

                    setProgress(prev => mergeProgress(prev, migrated));

                    Object.entries(migrated).forEach(([slug, items]) => {
                        try {
                            localStorage.setItem(`progress_${slug}`, JSON.stringify(items));
                        } catch {
                        }
                    });
                }
            }
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, [uniqueId]);

    useEffect(() => {
        const readLocal = () => {
            try {
                const localData: Record<string, string[]> = {};
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith('progress_') && !key.startsWith('progress_ops_')) {
                        const slug = key.replace('progress_', '');
                        const val = localStorage.getItem(key);
                        if (val) {
                            const items = JSON.parse(val);
                            if (Array.isArray(items)) {
                                localData[slug] = items;
                            }
                        }
                    }
                }

                const { migrated, hasChanges } = migrateLegacyData(localData);

                if (Object.keys(migrated).length > 0) {
                    setProgress(prev => mergeProgress(prev, migrated));
                    setIsLoading(false);

                    if (hasChanges) {
                        Object.entries(migrated).forEach(([slug, items]) => {
                            localStorage.setItem(`progress_${slug}`, JSON.stringify(items));
                        });
                    }
                }
            } catch { }
        };

        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(readLocal);
        } else {
            setTimeout(readLocal, 0);
        }

        refreshProgress();
    }, [uniqueId, refreshProgress]);
    const updateProgress = useCallback((slug: string, items: string[]) => {
        setProgress(prev => ({
            ...prev,
            [slug]: items
        }));

        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent(`progress_update_${slug}`, {
                detail: { items }
            }));
        }
    }, []);

    const [streak, setStreak] = useState(0);

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

    const xp = useMemo(() => {
        return Object.values(progress).reduce((acc, items) => acc + (items.length * 100), 0);
    }, [progress]);

    const level = useMemo(() => Math.floor(xp / 1000) + 1, [xp]);
    const nextLevelXp = useMemo(() => level * 1000, [level]);
    const progressToNextLevel = useMemo(() => {
        const currentLevelBase = (level - 1) * 1000;
        return ((xp - currentLevelBase) / 1000) * 100;
    }, [xp, level]);

    return (
        <ProgressContext.Provider value={{ progress, isLoading, updateProgress, refreshProgress, xp, level, nextLevelXp, progressToNextLevel, streak }}>
            {children}
        </ProgressContext.Provider>
    );
}

export const useGlobalProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) throw new Error('useGlobalProgress must be used within ProgressProvider');
    return context;
};
