import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--surface-base)]">
            <div className="flex flex-col items-center gap-[var(--space-2)] animate-[breathe_3s_ease-in-out_infinite]">
                <LoadingSpinner size="lg" label="Loading…" />
            </div>
        </div>
    );
}
