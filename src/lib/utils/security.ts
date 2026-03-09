import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX_ENTRIES = 10_000;
const hasRedisRateLimitConfig = Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

let redisRateLimitClient: Redis | null = null;

function getRedisRateLimitClient(): Redis | null {
    if (!hasRedisRateLimitConfig) {
        return null;
    }

    if (!redisRateLimitClient) {
        redisRateLimitClient = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL!,
            token: process.env.UPSTASH_REDIS_REST_TOKEN!,
        });
    }

    return redisRateLimitClient;
}

if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        const now = Date.now();
        for (const [key, entry] of rateLimitStore) {
            if (now > entry.resetTime) {
                rateLimitStore.delete(key);
            }
        }
    }, 60_000);
}

export const RATE_LIMITS = {
    AI: { windowMs: 60_000, maxRequests: 50, message: 'Too many AI requests. Please wait a minute.' },
    READ: { windowMs: 60_000, maxRequests: 300, message: 'Too many requests. Please slow down.' },
    WRITE: { windowMs: 60_000, maxRequests: 30, message: 'Too many write requests. Please slow down.' },
} as const;

type RateLimitType = keyof typeof RATE_LIMITS;

function getClientIP(req: NextRequest): string {
    return req.headers.get('x-forwarded-for')?.split(',')[0].trim()
        ?? req.headers.get('x-real-ip')?.trim()
        ?? 'unknown';
}

function checkRateLimitInMemory(key: string, limitType: RateLimitType = 'READ'): NextResponse | null {
    const now = Date.now();
    const config = RATE_LIMITS[limitType];
    const entry = rateLimitStore.get(key);

    if (!entry || now > entry.resetTime) {
        if (rateLimitStore.size >= RATE_LIMIT_MAX_ENTRIES) {
            const firstKey = rateLimitStore.keys().next().value;
            if (firstKey) rateLimitStore.delete(firstKey);
        }
        rateLimitStore.set(key, { count: 1, resetTime: now + config.windowMs });
        return null;
    }

    if (entry.count >= config.maxRequests) {
        const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
        return NextResponse.json(
            { error: 'Too Many Requests', message: config.message, retryAfter },
            { status: 429, headers: { 'Retry-After': retryAfter.toString() } }
        );
    }

    entry.count++;
    return null;
}

async function checkRateLimitRedis(key: string, limitType: RateLimitType = 'READ'): Promise<NextResponse | null> {
    const client = getRedisRateLimitClient();
    if (!client) return checkRateLimitInMemory(key, limitType);

    const now = Date.now();
    const config = RATE_LIMITS[limitType];
    const windowId = Math.floor(now / config.windowMs);
    const redisKey = `ratelimit:${limitType}:${key}:${windowId}`;

    try {
        const currentCount = Number(await client.incr(redisKey));
        if (currentCount === 1) {
            await client.expire(redisKey, Math.ceil(config.windowMs / 1000));
        }

        if (currentCount > config.maxRequests) {
            const windowEnd = (windowId + 1) * config.windowMs;
            const retryAfter = Math.max(1, Math.ceil((windowEnd - now) / 1000));

            return NextResponse.json(
                { error: 'Too Many Requests', message: config.message, retryAfter },
                { status: 429, headers: { 'Retry-After': retryAfter.toString() } }
            );
        }

        return null;
    } catch (error) {
        console.warn('[RateLimit] Redis check failed, falling back to in-memory limiter:', error);
        return checkRateLimitInMemory(key, limitType);
    }
}

export async function rateLimit(
    req: NextRequest,
    endpoint: string,
    limitType: RateLimitType = 'READ',
    uniqueId?: string
): Promise<NextResponse | null> {
    const ip = getClientIP(req);
    const ipLimit = await checkRateLimitRedis(`ip:${ip}:${endpoint}`, limitType);
    if (ipLimit) return ipLimit;

    if (uniqueId) {
        const userLimit = await checkRateLimitRedis(`user:${uniqueId}:${endpoint}`, limitType);
        if (userLimit) return userLimit;
    }
    return null;
}

export function sanitizeString(input: string): string {
    if (typeof input !== 'string') return '';
    return input
        .normalize('NFKC')
        .replace(/[\u202E\u202D\u200E\u200F\u200B-\u200D\uFEFF]/g, '')
        .replace(/<[^>]*>/g, '')
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 50000);
}

export function secureSuccessResponse(data: any, status: number = 200): NextResponse {
    return NextResponse.json(data, { status });
}

export function secureErrorResponse(error: string, status: number = 400): NextResponse {
    return NextResponse.json({ error }, { status });
}
