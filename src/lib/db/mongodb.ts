import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

function parsePoolSize(value: string | undefined, fallback: number): number {
    const parsed = Number.parseInt(value || '', 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

interface CachedConnection {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: CachedConnection | undefined;
}

const cached: CachedConnection = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
    global.mongoose = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
    if (!MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined');
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const maxPoolSize = parsePoolSize(process.env.MONGODB_MAX_POOL_SIZE, 10);
        const minPoolSize = Math.min(parsePoolSize(process.env.MONGODB_MIN_POOL_SIZE, 1), maxPoolSize);
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,
            maxPoolSize,
            minPoolSize,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error('[MongoDB] Connection error:', e);
        throw e;
    }

    return cached.conn;
}

export default connectToDatabase;
