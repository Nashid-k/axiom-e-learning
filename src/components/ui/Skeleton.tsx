import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-[var(--radius-md)]",
                "bg-[var(--surface-overlay)]",
                "before:absolute before:inset-0",
                "before:-translate-x-full before:animate-[shimmer_2s_infinite]",
                "before:bg-gradient-to-r before:from-transparent before:via-[var(--fg-muted)]/5 before:to-transparent",
                className
            )}
            {...props}
        />
    );
}

export function ProjectCardSkeleton() {
    return (
        <div
            className={cn(
                "border border-[var(--border-default)]",
                "rounded-[var(--radius-xl)]",
                "bg-[var(--surface-raised)]",
                "p-[var(--space-3)]",
            )}
        >
            <div className="flex gap-[var(--space-1)] mb-[var(--space-2)]">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-[var(--space-2)]" />
            <div className="grid grid-cols-2 gap-[var(--space-1)] mb-[var(--space-3)]">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex gap-[var(--space-1)]">
                <Skeleton className="h-9 flex-1" />
                <Skeleton className="h-9 flex-1" />
                <Skeleton className="h-9 w-9" />
            </div>
        </div>
    );
}

export function TopicViewSkeleton() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 w-full space-y-8">
            <div className="space-y-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-3/4" />
            </div>

            <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[95%]" />
            </div>

            <div className="rounded-xl overflow-hidden border border-[var(--border-default)]">
                <Skeleton className="h-8 w-full rounded-none" />
                <Skeleton className="h-40 w-full rounded-none" />
            </div>

            <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[85%]" />
            </div>

            <div className="flex justify-end pt-8">
                <Skeleton className="h-12 w-40 rounded-[var(--radius-xl)]" />
            </div>
        </div>
    );
}
