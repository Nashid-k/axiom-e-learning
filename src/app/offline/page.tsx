'use client';

import { Button } from '@/components/ui/Button';

export default function OfflinePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center p-6 text-center text-black dark:text-white">
            <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 5.636a9 9 0 010 12.728m-3.536-3.536a4 4 0 010-5.656M6.343 18.364A9 9 0 016.343 5.636m3.536 3.536a4 4 0 010 5.656" />
                </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Offline Mode</h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mb-8 leading-relaxed">
                You are currently disconnected. Your previously loaded study guides and curriculum data are still available.
            </p>
            <Button onClick={() => window.location.reload()} variant="outline">
                Retry Connection
            </Button>
        </div>
    );
}
