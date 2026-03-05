
import { Redis } from '@upstash/redis';

const isRedisConfigured = !!(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
);

let redisClient: Redis | null = null;

function getRedisClient(): Redis | null {
    if (!isRedisConfigured) {
        return null;
    }

    if (!redisClient) {
        redisClient = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL!,
            token: process.env.UPSTASH_REDIS_REST_TOKEN!,
        });
    }

    return redisClient;
}

export const cache = {
    async get<T>(key: string): Promise<T | null> {
        const client = getRedisClient();
        if (!client) return null;

        try {
            const value = await client.get<T>(key);
            return value;
        } catch (error) {
            console.warn('[Redis] Cache read failed:', error);
            return null;
        }
    },

    async set<T>(key: string, value: T, ttlSeconds: number = 3600): Promise<boolean> {
        const client = getRedisClient();
        if (!client) return false;

        try {
            await client.setex(key, ttlSeconds, value);
            return true;
        } catch (error) {
            console.warn('[Redis] Cache write failed:', error);
            return false;
        }
    },

    async del(key: string): Promise<boolean> {
        const client = getRedisClient();
        if (!client) return false;

        try {
            await client.del(key);
            return true;
        } catch (error) {
            console.warn('[Redis] Cache delete failed:', error);
            return false;
        }
    },

    isAvailable(): boolean {
        return isRedisConfigured;
    },

    async getOrSet<T>(
        key: string,
        fetchFn: () => Promise<T>,
        ttlSeconds: number = 3600
    ): Promise<T> {
        const cached = await this.get<T>(key);
        if (cached !== null) {
            return cached;
        }

        const value = await fetchFn();

        this.set(key, value, ttlSeconds).catch(() => { });

        return value;
    }
};

export const cacheKeys = {
    aiModal: (topic: string, category: string, mode: string, persona: string, phase?: number) =>
        `ai:modal:${topic}:${category}:${mode}:${persona}:${phase || 0}`.toLowerCase().replace(/\s+/g, '-'),

    resources: (topicKey: string) =>
        `resources:${topicKey}`,

    userProgress: (uniqueId: string, curriculumSlug: string) =>
        `progress:${uniqueId}:${curriculumSlug}`,
};

export default cache;
