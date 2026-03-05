import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let rateLimiter: Ratelimit | null = null;

export function getRateLimiter(): Ratelimit | null {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
        return null;
    }

    if (!rateLimiter) {
        rateLimiter = new Ratelimit({
            redis: Redis.fromEnv(),
            limiter: Ratelimit.slidingWindow(10, '60 s'),
            prefix: 'axiom:ratelimit',
        });
    }

    return rateLimiter;
}
