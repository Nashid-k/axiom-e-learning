"use client";

import { useState, useCallback, useRef } from "react";
import { generateRequestId } from "@/lib/utils/request-id";
import { ResourceResponse } from '@/types';

const SAFE_ERROR_MESSAGES: Record<string, string> = {
    'SEARCH_RATE_LIMIT': 'Resource search is busy. Showing available resources.',
    'GOOGLE_QUOTA_EXCEEDED': 'Article search is temporarily limited. Try searching videos instead.',
    'YOUTUBE_QUOTA_EXCEEDED': 'Video search is temporarily limited. Try searching articles instead.',
    'YOUTUBE_FORBIDDEN': 'Some videos aren\'t available. Try other resources.',
    'SEARCH_SERVICE_DOWN': 'Resource search is temporarily unavailable. Please try again later.',
    'INVALID_INPUT': 'Invalid search request. Please check your input.',
    'UNKNOWN_ERROR': 'Unable to load resources. Please try again.',
};

function getSafeErrorMessage(error: unknown): string {
    if (!error) return SAFE_ERROR_MESSAGES.UNKNOWN_ERROR;

    if (isErrorWithCode(error) && SAFE_ERROR_MESSAGES[error.code]) {
        return SAFE_ERROR_MESSAGES[error.code];
    }

    let message = '';
    if (isErrorWithMessage(error)) {
        message = error.message;
    } else if (typeof error === 'string') {
        message = error;
    } else {
        message = String(error);
    }

    if (message.includes('youtube') && (message.includes('quota') || message.includes('403'))) {
        return SAFE_ERROR_MESSAGES.YOUTUBE_QUOTA_EXCEEDED;
    }
    if (message.includes('youtube') && message.includes('403')) {
        return SAFE_ERROR_MESSAGES.YOUTUBE_FORBIDDEN;
    }
    if (message.includes('google') && message.includes('quota')) {
        return SAFE_ERROR_MESSAGES.GOOGLE_QUOTA_EXCEEDED;
    }
    if (message.includes('rate limit') || message.includes('429')) {
        return SAFE_ERROR_MESSAGES.SEARCH_RATE_LIMIT;
    }
    if (message.includes('503') || message.includes('502') || message.includes('service')) {
        return SAFE_ERROR_MESSAGES.SEARCH_SERVICE_DOWN;
    }

    return SAFE_ERROR_MESSAGES.UNKNOWN_ERROR;
}

function isErrorWithCode(error: unknown): error is { code: string } {
    return typeof error === 'object' && error !== null && 'code' in error;
}

function isErrorWithMessage(error: unknown): error is { message: string } {
    return typeof error === 'object' && error !== null && 'message' in error;
}

export function useResources() {
    const [resources, setResources] = useState<ResourceResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [requestId, setRequestId] = useState<string>("");
    const requestIdRef = useRef<string>("");
    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchResources = useCallback(async (topicTitle: string, curriculum: string, phase: string) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;

        setLoading(true);
        setError(null);

        const newRequestId = generateRequestId();
        requestIdRef.current = newRequestId;
        setRequestId(newRequestId);

        try {
            const res = await fetch('/api/resources/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Request-ID': newRequestId,
                },
                body: JSON.stringify({
                    topicTitle,
                    curriculum: curriculum || '',
                    phase: phase || ''
                }),
                signal: controller.signal,
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                console.error('[useResources] API error:', {
                    status: res.status,
                    statusText: res.statusText,
                    error: errorData,
                    requestId: newRequestId
                });
                const safeMessage = getSafeErrorMessage(errorData || { status: res.status });
                throw new Error(safeMessage);
            }

            const data = await res.json().catch(() => {
                return { resources: null };
            });

            const resources = data.data?.resources || data.resources;
            if (resources) {
                setResources(resources);
            } else {
                setError('No resources found for this topic.');
            }
        } catch (err: unknown) {
            if (err instanceof DOMException && err.name === 'AbortError') return;
            const safeMessage = getSafeErrorMessage(err);
            setError(safeMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const resetResources = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        setResources(null);
        setError(null);
    }, []);

    return { resources, loading, error, fetchResources, resetResources, requestId };
}
