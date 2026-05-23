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
        <div className={cn("flex flex-col gap-1.5 w-full group", containerClassName)}>
            {label && (
                <label
                    htmlFor={id}
                    className="text-xs font-semibold uppercase tracking-wider text-[var(--fg-secondary)] transition-colors group-focus-within:text-[var(--color-cyan)]"
                >
                    {label}
                </label>
            )}

            <div className="relative w-full rounded-lg overflow-hidden p-[1px] bg-gradient-to-b from-transparent to-transparent group-focus-within:from-[var(--color-primary)] group-focus-within:to-[var(--color-cyan)] transition-all duration-300">
                <input
                    ref={ref}
                    id={id}
                    className={cn(
                        "w-full rounded-[7px]",
                        "px-4 py-2.5 text-sm",
                        "bg-[var(--surface-raised)]",
                        "border border-[var(--surface-border)]",
                        "text-[var(--fg-primary)] font-medium",
                        "placeholder:text-[var(--fg-muted)]",
                        "transition-all duration-300 ease-out",
                        "focus:outline-none focus:bg-[var(--surface-base)]",
                        "group-focus-within:border-transparent",
                        "hover:border-white/10",
                        error && "border-red-500/50 focus:border-red-500/50",
                        className
                    )}
                    {...props}
                />
            </div>

            {error && (
                <p className="text-xs text-red-400 font-medium tracking-wide animate-pulse">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = "Input";

export { Input };

