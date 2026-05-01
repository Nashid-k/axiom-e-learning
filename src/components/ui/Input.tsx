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
        <div className={cn("flex flex-col gap-1 w-full", containerClassName)}>
            {label && (
                <label
                    htmlFor={id}
                    className="text-xs font-bold uppercase tracking-wider text-neutral-500"
                >
                    {label}
                </label>
            )}

            <input
                ref={ref}
                id={id}
                className={cn(
                    "w-full rounded-md",
                    "px-3 py-2",
                    "bg-white dark:bg-black",
                    "border border-neutral-200 dark:border-neutral-800",
                    "text-black dark:text-white text-base",
                    "placeholder:text-neutral-400 dark:placeholder:text-neutral-600",
                    "transition-none",
                    "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500",
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
