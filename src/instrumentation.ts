export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        try {
            const { connectToDatabase } = await import('./lib/db/mongodb');
            await connectToDatabase();
        } catch (e) {
            // Silently fail or use a specialized server-side logger if available
            // Avoid console noise during DB init if it's handled elsewhere
        }
    }
}
