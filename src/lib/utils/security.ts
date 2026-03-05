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

interface FieldSchema {
    type: 'string' | 'number' | 'boolean' | 'array' | 'object';
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: RegExp;
    enum?: readonly string[];
    sanitize?: boolean;
    arrayItemType?: 'string' | 'number';
}

type Schema = Record<string, FieldSchema>;

interface ValidationResult<T> { valid: boolean; data?: T; error?: string; }

function validateField(value: unknown, schema: FieldSchema, name: string): ValidationResult<unknown> {
    if (value === undefined || value === null || value === '') {
        return schema.required ? { valid: false, error: `${name} is required` } : { valid: true };
    }

    switch (schema.type) {
        case 'string': {
            if (typeof value !== 'string') return { valid: false, error: `${name} must be a string` };
            if (schema.minLength && value.length < schema.minLength) return { valid: false, error: `${name} too short` };
            if (schema.maxLength && value.length > schema.maxLength) return { valid: false, error: `${name} too long` };
            if (schema.pattern && !schema.pattern.test(value)) return { valid: false, error: `${name} invalid format` };
            if (schema.enum && !schema.enum.includes(value)) return { valid: false, error: `${name} must be one of: ${schema.enum.join(', ')}` };
            return { valid: true, data: schema.sanitize ? sanitizeString(value) : value };
        }
        case 'number': {
            const num = typeof value === 'number' ? value : parseFloat(value as string);
            if (isNaN(num)) return { valid: false, error: `${name} must be a number` };
            if (schema.min !== undefined && num < schema.min) return { valid: false, error: `${name} below minimum` };
            if (schema.max !== undefined && num > schema.max) return { valid: false, error: `${name} above maximum` };
            return { valid: true, data: num };
        }
        case 'boolean':
            return typeof value === 'boolean' ? { valid: true, data: value } : { valid: false, error: `${name} must be boolean` };
        case 'array': {
            if (!Array.isArray(value)) return { valid: false, error: `${name} must be an array` };
            if (schema.maxLength && value.length > schema.maxLength) return { valid: false, error: `${name} too many items` };
            if (schema.arrayItemType && !value.every(item => typeof item === schema.arrayItemType)) return { valid: false, error: `${name} items invalid type` };
            return { valid: true, data: value };
        }
        case 'object':
            return typeof value === 'object' && !Array.isArray(value) ? { valid: true, data: value } : { valid: false, error: `${name} must be object` };
        default:
            return { valid: false, error: `Unknown type for ${name}` };
    }
}

export function validateBody<T extends Record<string, unknown>>(body: unknown, schema: Schema, rejectUnexpected = true): ValidationResult<T> {
    if (!body || typeof body !== 'object' || Array.isArray(body)) return { valid: false, error: 'Request body must be a JSON object' };
    const bodyObj = body as Record<string, unknown>;
    const validated: Record<string, unknown> = {};

    if (rejectUnexpected) {
        const allowed = new Set(Object.keys(schema));
        const unexpected = Object.keys(bodyObj).filter(k => !allowed.has(k));
        if (unexpected.length > 0) return { valid: false, error: `Unexpected fields: ${unexpected.join(', ')}` };
    }

    for (const [name, fieldSchema] of Object.entries(schema)) {
        const result = validateField(bodyObj[name], fieldSchema, name);
        if (!result.valid) return { valid: false, error: result.error };
        if (result.data !== undefined) validated[name] = result.data;
    }
    return { valid: true, data: validated as T };
}

export function secureErrorResponse(message: string, status = 400): NextResponse {
    return NextResponse.json({ error: message }, { status });
}

export function secureSuccessResponse(data: unknown, status = 200): NextResponse {
    return NextResponse.json(data, { status });
}


export const COMMON_SCHEMAS = {
    uniqueId: { type: 'string' as const, required: true, minLength: 1, maxLength: 255 },
    curriculumSlug: { type: 'string' as const, required: true, minLength: 1, maxLength: 100, pattern: /^[a-z0-9-]+$/i, sanitize: true },
    itemId: { type: 'string' as const, required: true, minLength: 1, maxLength: 500, sanitize: true },
    topicTitle: { type: 'string' as const, required: true, minLength: 1, maxLength: 500, sanitize: true },
    description: { type: 'string' as const, required: false, maxLength: 2000, sanitize: true },
    noteContent: { type: 'string' as const, required: false, maxLength: 10000, sanitize: true },
    mode: { type: 'string' as const, required: false, enum: ['theory', 'practical', 'project', 'quiz'] as const },
    checkedItems: { type: 'array' as const, required: false, maxLength: 1000, arrayItemType: 'string' as const },
    totalItems: { type: 'number' as const, required: false, min: 0, max: 10000 },
};
