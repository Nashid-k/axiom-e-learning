'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    containerClassName,
    label,
    error,
    id,
    ...props
}, ref) => {
    return (
        <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
            {label && (
                <label
                    htmlFor={id}
                    className="text-xs font-medium uppercase tracking-wide text-[var(--fg-secondary)]"
                >
                    {label}
                </label>
            )}

            <input
                ref={ref}
                id={id}
                className={cn(
                    "w-full rounded-md",
                    "px-3 py-2 text-sm",
                    "bg-[var(--surface-base)]",
                    "border border-[var(--surface-border)]",
                    "text-[var(--fg-primary)]",
                    "placeholder:text-[var(--fg-muted)]",
                    "transition-all duration-150 ease-out",
                    "focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]",
                    error && "border-red-500 focus:ring-red-500 focus:border-red-500",
                    className
                )}
                {...props}
            />

            {error && (
                <p className="text-xs text-red-500 font-medium">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = "Input";

export { Input };
