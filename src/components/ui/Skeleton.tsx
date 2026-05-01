import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md",
                "bg-neutral-100 dark:bg-neutral-900",
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
                "border border-neutral-200 dark:border-neutral-800",
                "rounded-md",
                "bg-white dark:bg-black",
                "p-4",
            )}
        >
            <div className="flex gap-2 mb-3">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-4" />
            <div className="grid grid-cols-2 gap-2 mb-6">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-9 flex-1" />
                <Skeleton className="h-9 flex-1" />
            </div>
        </div>
    );
}

export function TopicViewSkeleton() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12 w-full space-y-8">
            <div className="space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-2/3" />
            </div>

            <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
            </div>

            <div className="border border-neutral-200 dark:border-neutral-800 rounded-md">
                <Skeleton className="h-48 w-full rounded-none" />
            </div>

            <div className="flex justify-end pt-8">
                <Skeleton className="h-10 w-32" />
            </div>
        </div>
    );
}
