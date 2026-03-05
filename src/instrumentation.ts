export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        try {
            const { connectToDatabase } = await import('./lib/db/mongodb');
            await connectToDatabase();
            console.log('[Server] ✅ DB pre-connected');
        } catch (e) {
            console.error('[Server] ❌ DB init failed:', e);
        }
    }
}
