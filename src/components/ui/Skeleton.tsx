import { cn } from "@/lib/utils";
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "animate-pulse",
                "rounded-[var(--radius-md)]",
                "bg-[var(--color-100)] dark:bg-[var(--surface-overlay)]",
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
