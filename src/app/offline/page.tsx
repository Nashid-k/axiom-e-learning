'use client';

export default function OfflinePage() {
    return (
        <div className="min-h-screen bg-[var(--surface-base)] flex flex-col items-center justify-center px-6 text-center">
            <div className="mb-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
                    <svg className="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 010 12.728m-3.536-3.536a4 4 0 010-5.656M6.343 18.364A9 9 0 016.343 5.636m3.536 3.536a4 4 0 010 5.656" />
                    </svg>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--fg-primary)] mb-3">
                    You&apos;re Offline
                </h1>
                <p className="text-[var(--fg-secondary)] max-w-md mx-auto mb-2">
                    No worries — your previously visited study guides and progress are still available.
                </p>
                <p className="text-[var(--fg-muted)] text-sm">
                    Reconnect to the internet to access AI features, leaderboards, and new content.
                </p>
            </div>
            <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-[var(--color-500)] text-white font-semibold rounded-full hover:bg-[var(--color-600)] transition-colors shadow-lg shadow-blue-500/25 cursor-pointer"
            >
                Try Again
            </button>
        </div>
    );
}
