import Groq from 'groq-sdk';
import type { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions';
import { Logger } from '@/lib/api/logger';

export type ModelType = 'fast' | 'reasoning' | 'creative' | 'coding';

class LRUCache<K, V> {
    private capacity: number;
    private cache = new Map<K, V>();

    constructor(capacity: number) { this.capacity = capacity; }

    get(key: K): V | undefined {
        if (!this.cache.has(key)) return undefined;
        const value = this.cache.get(key)!;
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key: K, value: V): void {
        if (this.cache.has(key)) this.cache.delete(key);
        else if (this.cache.size >= this.capacity) {
            const lruKey = this.cache.keys().next().value!;
            this.cache.delete(lruKey);
        }
        this.cache.set(key, value);
    }
}

class AIService {
    private clientCache = new LRUCache<string, Groq>(5);
    private groqKeys: string[] = [];
    private keyIndex = -1;

    private readonly MODELS: Record<string, string> = {
        fast: 'llama-3.1-8b-instant',
        reasoning: 'llama-3.3-70b-versatile',
        creative: 'llama-3.3-70b-versatile',
        coding: 'llama-3.3-70b-versatile',
        fallback: 'llama-3.1-8b-instant',
    };

    constructor() {
        this.groqKeys = Array.from({ length: 10 }, (_, i) => process.env[`GROQ_API_KEY_${i + 1}`])
            .filter((k): k is string => !!k);
        if (this.groqKeys.length > 0) {
            this.keyIndex = Date.now() % this.groqKeys.length;
        }
    }

    private nextClient(): Groq | null {
        if (this.groqKeys.length === 0) return null;
        this.keyIndex = (this.keyIndex + 1) % this.groqKeys.length;
        const key = this.groqKeys[this.keyIndex];
        let client = this.clientCache.get(key);
        if (!client) {
            client = new Groq({ apiKey: key });
            this.clientCache.put(key, client);
        }
        return client;
    }

    public async complete(messages: ChatCompletionMessageParam[], type: ModelType = 'fast', jsonMode = false, temperature?: number): Promise<string> {
        const model = this.MODELS[type] || this.MODELS.fallback;
        const maxRetries = Math.min(10, this.groqKeys.length);

        for (let attempt = 0; attempt < maxRetries; attempt++) {
            const groq = this.nextClient();
            if (!groq) throw new Error('No AI clients available');
            try {
                const res = await groq.chat.completions.create({
                    model, messages,
                    response_format: jsonMode ? { type: 'json_object' } : undefined,
                    temperature: temperature ?? (type === 'creative' ? 0.7 : 0.1),
                });
                return res.choices[0]?.message?.content || '';
            } catch (error: unknown) {
                const status = (error as { status?: number })?.status;
                if ((status !== 429 && (!status || status < 500)) || attempt === maxRetries - 1) throw error;
                Logger.warn(`[AI] Key #${this.keyIndex} failed`, { requestId: `ai-${Date.now()}`, status });
            }
        }
        throw new Error('All Groq keys exhausted');
    }

    public async stream(messages: ChatCompletionMessageParam[], type: ModelType = 'fast', temperature?: number): Promise<ReadableStream> {
        const model = this.MODELS[type] || this.MODELS.fallback;
        const maxRetries = Math.min(10, this.groqKeys.length);

        for (let attempt = 0; attempt < maxRetries; attempt++) {
            const groq = this.nextClient();
            if (!groq) throw new Error('No AI clients available');
            try {
                const response = await groq.chat.completions.create({ model, messages, stream: true, temperature: temperature ?? (type === 'creative' ? 0.7 : 0.1) });
                return new ReadableStream({
                    async start(controller) {
                        try {
                            for await (const chunk of response) {
                                const c = chunk.choices[0]?.delta?.content || '';
                                if (c) controller.enqueue(new TextEncoder().encode(c));
                            }
                            controller.close();
                        } catch (err) { controller.error(err); }
                    }
                });
            } catch (error: unknown) {
                const status = (error as { status?: number })?.status;
                if ((status !== 429 && (!status || status < 500)) || attempt === maxRetries - 1) throw error;
                Logger.warn(`[AI] Stream key #${this.keyIndex} failed`, { requestId: `ai-stream-${Date.now()}`, status });
            }
        }
        throw new Error('All Groq keys exhausted');
    }

    public getClient(): Groq | null { return this.nextClient(); }
    public getSmartModel(type: ModelType): string { return this.MODELS[type] || this.MODELS.fallback; }
}

export const aiService = new AIService();
