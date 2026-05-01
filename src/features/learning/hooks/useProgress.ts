'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { getUniqueId } from '@/lib/utils/storage';
import { useAuth } from '@/features/auth/AuthContext';
import { useGlobalProgress } from '@/lib/providers/ProgressProvider';
import { trackEvent } from '@/lib/telemetry';

interface ProgressOperation {
    id: string;
    timestamp: number;
    type: 'ADD' | 'REMOVE';
    itemId: string;
}

interface UseProgressReturn {
    checkedItems: Set<string>;
    isLoading: boolean;
    toggleItem: (itemId: string) => void;
    isChecked: (itemId: string) => boolean;
    completedCount: number;
    syncProgress: () => Promise<void>;
    pendingChanges: number;
    isSyncing: boolean;
    xp: number;
    level: number;
    nextLevelXp: number;
    progressToNextLevel: number;
}

type WindowWithIdleCallback = Window & {
    requestIdleCallback?: (callback: IdleRequestCallback) => number;
};

export function useProgress(curriculumSlug: string, totalItems: number = 0): UseProgressReturn {
    const { user } = useAuth();
    const {
        progress: globalProgress,
        updateProgress: updateGlobalProgress,
        isLoading: globalLoading,
        xp,
        level,
        nextLevelXp,
        progressToNextLevel
    } = useGlobalProgress();
    const [pendingOps, setPendingOps] = useState<ProgressOperation[]>([]);
    const [isSyncing, setIsSyncing] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const retryCountRef = useRef(0);
    const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const uniqueId = useMemo(() => user?.email || getUniqueId(), [user?.email]);

    const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const syncInProgress = useRef(false);
    const pendingOpsRef = useRef<ProgressOperation[]>([]);
    const isMountedRef = useRef(true);

    const lastToggleRef = useRef<number>(0);
    const TOGGLE_COOLDOWN_MS = 300;
    const MAX_PENDING_OPS = 50;

    useEffect(() => {
        pendingOpsRef.current = pendingOps;
    }, [pendingOps]);

    useEffect(() => {
        retryCountRef.current = retryCount;
    }, [retryCount]);


    const checkedItems = useMemo(() => {
        return new Set(globalProgress[curriculumSlug] || []);
    }, [globalProgress, curriculumSlug]);

    const checkedItemsRef = useRef(checkedItems);
    useEffect(() => {
        checkedItemsRef.current = checkedItems;
    }, [checkedItems]);

    const syncProgress = useCallback(async () => {
        if (!isMountedRef.current) return;

        const currentPendingOps = pendingOpsRef.current;
        const currentCheckedItems = Array.from(checkedItemsRef.current);

        if (syncInProgress.current || currentPendingOps.length === 0) return;
        if (!uniqueId) return;

        syncInProgress.current = true;
        setIsSyncing(true);

        try {
            const response = await fetch('/api/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uniqueId,
                    curriculumSlug,
                    checkedItems: currentCheckedItems,
                    operations: currentPendingOps,
                    totalItems,
                }),
            });

            if (response.ok) {
                trackEvent('progress_sync_succeeded', {
                    curriculumSlug,
                    ops: currentPendingOps.length,
                    checkedItems: currentCheckedItems.length
                });
                if (isMountedRef.current) {
                    setPendingOps([]);
                    setRetryCount(0);
                    retryCountRef.current = 0;
                    try {
                        localStorage.removeItem(`progress_ops_${curriculumSlug}`);
                    } catch (e) {
                        console.warn('[Progress] Failed to remove localStorage item:', e);
                    }
                    const data = await response.json().catch(() => {
                        console.error('[Progress] Failed to parse response JSON');
                        return { checkedItems: null };
                    });
                    if (data.checkedItems && isMountedRef.current) {
                        updateGlobalProgress(curriculumSlug, data.checkedItems);
                    }
                }
            } else {
                throw new Error(`Sync failed: ${response.statusText}`);
            }
        } catch {
            const currentRetryCount = retryCountRef.current;
            trackEvent('progress_sync_failed', {
                curriculumSlug,
                retryCount: currentRetryCount
            });
            if (isMountedRef.current && currentRetryCount < 5) {
                const nextRetry = currentRetryCount + 1;
                retryCountRef.current = nextRetry;
                setRetryCount(nextRetry);
                const delay = Math.pow(2, nextRetry) * 1000;
                if (retryTimeoutRef.current) {
                    clearTimeout(retryTimeoutRef.current);
                }
                retryTimeoutRef.current = setTimeout(() => {
                    if (isMountedRef.current) {
                        syncProgress();
                    }
                }, delay);
            }
        } finally {
            if (isMountedRef.current) {
                syncInProgress.current = false;
                setIsSyncing(false);
            }
        }
    }, [curriculumSlug, totalItems, uniqueId, updateGlobalProgress]);

    useEffect(() => {
        isMountedRef.current = true;
        const handleOnline = () => {
            if (pendingOpsRef.current.length > 0) syncProgress();
        };
        window.addEventListener('online', handleOnline);

        return () => {
            isMountedRef.current = false;
            window.removeEventListener('online', handleOnline);
            if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
            if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
        };
    }, [syncProgress]);

    const toggleItem = useCallback((itemId: string) => {
        const now = Date.now();
        if (now - lastToggleRef.current < TOGGLE_COOLDOWN_MS) {
            console.warn('[Progress] Toggle throttled - clicking too fast');
            return;
        }
        lastToggleRef.current = now;

        if (pendingOpsRef.current.length >= MAX_PENDING_OPS) {
            console.warn('[Progress] Too many pending operations - forcing sync');
            syncProgress();
            return;
        }

        const isCurrentlyChecked = checkedItemsRef.current.has(itemId);
        const type = isCurrentlyChecked ? 'REMOVE' : 'ADD';

        const operation: ProgressOperation = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            type,
            itemId
        };

        setPendingOps(prev => {
            const updated = [...prev, operation];
            const saveOps = () => {
                try {
                    localStorage.setItem(`progress_ops_${curriculumSlug}`, JSON.stringify(updated));
                } catch (e) {
                    console.warn('[Progress] Failed to save pending ops to localStorage:', e);
                }
            };

            const win = window as WindowWithIdleCallback;
            if (typeof window !== 'undefined' && typeof win.requestIdleCallback === 'function') {
                win.requestIdleCallback(() => saveOps());
            } else {
                setTimeout(saveOps, 0);
            }
            return updated;
        });

        const newItems = new Set(checkedItemsRef.current);
        if (type === 'ADD') newItems.add(itemId);
        else newItems.delete(itemId);

        const itemsArray = Array.from(newItems);
        updateGlobalProgress(curriculumSlug, itemsArray);

        const saveProgress = () => {
            try {
                localStorage.setItem(`progress_${curriculumSlug}`, JSON.stringify(itemsArray));
            } catch (e) {
                console.warn('[Progress] Failed to save progress to localStorage:', e);
            }
        };

        const win = window as WindowWithIdleCallback;
        if (typeof window !== 'undefined' && typeof win.requestIdleCallback === 'function') {
            win.requestIdleCallback(() => saveProgress());
        } else {
            setTimeout(saveProgress, 0);
        }

        if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
        syncTimeoutRef.current = setTimeout(() => {
            if (isMountedRef.current) {
                syncProgress();
            }
        }, 2000);
    }, [curriculumSlug, syncProgress, updateGlobalProgress]);

    return {
        checkedItems,
        isLoading: globalLoading,
        toggleItem,
        isChecked: useCallback((id: string) => checkedItems.has(id), [checkedItems]),
        completedCount: checkedItems.size,
        syncProgress,
        pendingChanges: pendingOps.length,
        isSyncing,
        xp,
        level,
        nextLevelXp,
        progressToNextLevel
    };
}
