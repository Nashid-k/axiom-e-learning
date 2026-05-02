"use client";

import { useState, useCallback, useRef } from "react";
import { generateRequestId } from "@/lib/utils/request-id";

const aiCache = new Map<string, string>();
const AI_CACHE_MAX_ENTRIES = 120;
const STORAGE_PREFIX = 'axiom_ai_cache_';


interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
}

interface APIMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

function toAPIMessage(message: Message): APIMessage {
    return { role: message.role, content: message.content };
}

function createMessage(
    role: Message['role'],
    content: string,
    id: string = generateRequestId()
): Message {
    return { id, role, content };
}

function normalizeMessages(list: Message[] | undefined): Message[] {
    if (!Array.isArray(list)) return [];
    return list.map(msg => ({ ...msg, id: msg.id || generateRequestId() }));
}

function getAIFromCache(cacheKey: string): string | undefined {
    const value = aiCache.get(cacheKey);
    if (value === undefined) return undefined;

    aiCache.delete(cacheKey);
    aiCache.set(cacheKey, value);
    return value;
}

function setAIToCache(cacheKey: string, value: string) {
    if (aiCache.has(cacheKey)) {
        aiCache.delete(cacheKey);
    } else if (aiCache.size >= AI_CACHE_MAX_ENTRIES) {
        const oldestKey = aiCache.keys().next().value;
        if (oldestKey) {
            aiCache.delete(oldestKey);
        }
    }

    aiCache.set(cacheKey, value);
}

const SAFE_ERROR_MESSAGES: Record<string, string> = {
    'AI_RATE_LIMIT': 'Mentor is busy. Please wait a moment and try again.',
    'AI_QUOTA_EXCEEDED': 'Mentor service is busy today. Please try again in a few minutes.',
    'AI_SERVICE_DOWN': 'Mentor is temporarily unavailable. Please try again in a moment.',
    'AI_TIMEOUT': 'Mentor is taking too long. Please try again.',
    'INVALID_INPUT': 'Invalid request. Please check your input and try again.',
    'UNKNOWN_ERROR': 'Failed to load AI explanation. Please try again.',
    'AI_AUTH_FAILED': 'Mentor configuration issue. Please try again later.',
    'AI_MODEL_ERROR': 'Mentor is updating knowledge. Please try again.',
};

function getSafeErrorMessage(error: unknown): string {
    if (!error) return SAFE_ERROR_MESSAGES.UNKNOWN_ERROR;

    const errObj = typeof error === 'object' ? error as Record<string, unknown> : {};

    if (errObj.code && typeof errObj.code === 'string' && SAFE_ERROR_MESSAGES[errObj.code]) {
        return SAFE_ERROR_MESSAGES[errObj.code];
    }

    const message = String(errObj.message || error || '');

    if (message.includes('rate limit') || message.includes('429')) {
        return SAFE_ERROR_MESSAGES.AI_RATE_LIMIT;
    }
    if (message.includes('quota') || message.includes('exceeded')) {
        return SAFE_ERROR_MESSAGES.AI_QUOTA_EXCEEDED;
    }
    if (message.includes('timeout') || message.includes('408')) {
        return SAFE_ERROR_MESSAGES.AI_TIMEOUT;
    }
    if (message.includes('503') || message.includes('502') || message.includes('service')) {
        return SAFE_ERROR_MESSAGES.AI_SERVICE_DOWN;
    }
    if (message.includes('401') || message.includes('unauthorized') || message.includes('auth')) {
        return SAFE_ERROR_MESSAGES.AI_AUTH_FAILED;
    }
    if (message.includes('model') && (message.includes('404') || message.includes('not found'))) {
        return SAFE_ERROR_MESSAGES.AI_MODEL_ERROR;
    }

    return SAFE_ERROR_MESSAGES.UNKNOWN_ERROR;
}

export function useAIStream() {
    const [explanation, setExplanation] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [requestId, setRequestId] = useState<string>("");

    const personaCache = useRef<Record<string, string>>({});
    const chatCache = useRef<Record<string, Message[]>>({});
    const requestIdRef = useRef<string>("");
    const abortControllerRef = useRef<AbortController | null>(null);
    const messagesRef = useRef<Message[]>([]);
    const currentCacheKeyRef = useRef<string>("");

    const contextRef = useRef<{
        topic: string;
        category: string;
        description: string;
        phase?: number | string;
        persona?: 'general' | 'buddy';
        mode: 'explanation' | 'quiz';
    }>({
        topic: '', category: '', description: '', mode: 'explanation'
    });

    const buildCacheKey = (topic: string, category: string, mode: string, persona: string, phase?: number | string) =>
        `${topic}-${category}-${mode === 'quiz' ? 'quiz' : 'theory'}-${persona}-${phase || 0}`.toLowerCase().replace(/\s+/g, '-');

    const fetchAIContent = useCallback(async (
        topic: string,
        category: string,
        description: string,
        phase?: number | string,
        persona: 'general' | 'buddy' = 'general',
        forceRefresh = false,
        mode: 'explanation' | 'quiz' = 'explanation',
        existingContent?: string
    ) => {
        contextRef.current = { topic, category, description, phase, persona, mode };

        const cacheKey = buildCacheKey(topic, category, mode, persona, phase);
        const storageKey = `${STORAGE_PREFIX}${cacheKey}`;

        if (currentCacheKeyRef.current && currentCacheKeyRef.current !== cacheKey) {
            chatCache.current[currentCacheKeyRef.current] = [...messages];
        }
        currentCacheKeyRef.current = cacheKey;

        const newRequestId = generateRequestId();
        requestIdRef.current = newRequestId;
        setRequestId(newRequestId);

        if (!forceRefresh && personaCache.current[cacheKey]) {
            setExplanation(personaCache.current[cacheKey]);
            const normalized = normalizeMessages(chatCache.current[cacheKey]);
            setMessages(normalized);
            messagesRef.current = normalized;
            setLoading(false);
            return;
        }

        if (forceRefresh || existingContent) {
            if (!existingContent) {
                aiCache.delete(cacheKey);
                delete personaCache.current[cacheKey];
                delete chatCache.current[cacheKey];
                if (typeof window !== 'undefined') {
                    localStorage.removeItem(storageKey);
                }
            }
        } else {
            const cachedContent = getAIFromCache(cacheKey);
            if (cachedContent) {
                setExplanation(cachedContent);
                personaCache.current[cacheKey] = cachedContent;
                const normalized = normalizeMessages(chatCache.current[cacheKey]);
                setMessages(normalized);
                messagesRef.current = normalized;
                setLoading(false);
                return;
            }

            if (typeof window !== 'undefined') {
                const stored = localStorage.getItem(storageKey);
                if (stored) {
                    setAIToCache(cacheKey, stored);
                    personaCache.current[cacheKey] = stored;
                    setExplanation(stored);
                    const normalized = normalizeMessages(chatCache.current[cacheKey]);
                    setMessages(normalized);
                    messagesRef.current = normalized;
                    setLoading(false);
                    return;
                }
            }
        }

        const otherPersona = persona === 'general' ? 'buddy' : 'general';
        const otherCacheKey = buildCacheKey(topic, category, mode, otherPersona, phase);
        const otherContent = personaCache.current[otherCacheKey] || getAIFromCache(otherCacheKey);

        setLoading(true);
        if (!existingContent && !personaCache.current[cacheKey]) {
            setExplanation("");
        }
        const normalized = normalizeMessages(chatCache.current[cacheKey]);
        setMessages(normalized);
        messagesRef.current = normalized;
        setError(null);

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const shouldRewrite = !forceRefresh && !existingContent && otherContent && mode !== 'quiz';

            const response = await fetch('/api/ai/modal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Request-ID': newRequestId,
                },
                signal: controller.signal,
                body: JSON.stringify({
                    topic, category, description, phase, forceRefresh, mode, persona,
                    existingContent: shouldRewrite ? otherContent : existingContent,
                    messages: undefined
                }),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                const safeMessage = getSafeErrorMessage(errData || { status: response.status });
                throw new Error(safeMessage);
            }
            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullContent = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                fullContent += chunk;
            }

            setExplanation(fullContent);

            setLoading(false);
            setAIToCache(cacheKey, fullContent);
            personaCache.current[cacheKey] = fullContent;

            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem(storageKey, fullContent);
                } catch (e) {
                    console.warn('[AI Client Cache] Failed to save to localStorage:', e);
                }
            }
        } catch (err: unknown) {
            if (err instanceof Error && err.name === 'AbortError') return;
            console.error('AI Stream error:', err, { requestId: newRequestId });
            const safeMessage = getSafeErrorMessage(err);
            setError(safeMessage);
            setLoading(false);
        } finally {
            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }
        }
    }, [messages]);

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || loading) return;

        const newRequestId = generateRequestId();
        requestIdRef.current = newRequestId;
        setLoading(true);

        const userMsg = createMessage('user', text);

        setMessages(prev => {
            const updated = [...prev, userMsg];
            messagesRef.current = updated;
            return updated;
        });

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const { topic, category, description, phase } = contextRef.current;

            const response = await fetch('/api/ai/modal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Request-ID': newRequestId,
                },
                signal: controller.signal,
                body: JSON.stringify({
                    topic,
                    category,
                    description,
                    phase,
                    mode: contextRef.current.mode,
                    persona: contextRef.current.persona,
                    messages: messagesRef.current.map(toAPIMessage)
                }),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                const safeMessage = getSafeErrorMessage(errData || { status: response.status });
                throw new Error(safeMessage);
            }
            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let fullContent = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                fullContent += chunk;
            }

            const assistantMessageId = generateRequestId();
            const assistantMsg = createMessage('assistant', fullContent);
            assistantMsg.id = assistantMessageId;

            setMessages(prev => {
                const updated = [...prev, assistantMsg];
                messagesRef.current = updated;
                return updated;
            });

            setLoading(false);

            if (currentCacheKeyRef.current) {
                setMessages(prev => {
                    chatCache.current[currentCacheKeyRef.current] = prev;
                    return prev;
                });
            }
        } catch (err: unknown) {
            if (err instanceof Error && err.name === 'AbortError') return;
            console.error('AI Stream error:', err, { requestId: newRequestId });
            const safeMessage = getSafeErrorMessage(err);
            setError(safeMessage);
            setLoading(false);
        } finally {
            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }
        }
    }, [loading]);

    const resetContent = useCallback(() => {
        if (currentCacheKeyRef.current) {
            chatCache.current[currentCacheKeyRef.current] = messagesRef.current;
        }
        setExplanation("");
        setError(null);
        setMessages([]);
        messagesRef.current = [];
    }, []);

    return {
        content: explanation,
        explanation,
        loading,
        error,
        fetchAIContent,
        sendMessage,
        resetContent,
        requestId,
        messages
    };
}
