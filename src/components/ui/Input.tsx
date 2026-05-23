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
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 group-focus-within:text-white transition-colors duration-400"
                >
                    {label}
                </label>
            )}

            <input
                ref={ref}
                id={id}
                className={cn(
                    "w-full rounded-2xl",
                    "px-5 py-3.5 text-sm",
                    "bg-white/[0.03]",
                    "border border-white/10",
                    "text-white font-medium",
                    "placeholder:text-neutral-500",
                    "transition-all duration-400 ease-out",
                    "focus:outline-none focus:border-white focus:bg-white/[0.06] focus:ring-1 focus:ring-white",
                    "hover:border-white/15",
                    error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30",
                    className
                )}
                {...props}
            />

            {error && (
                <p className="text-xs text-red-400 font-semibold tracking-wide animate-pulse">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = "Input";


export { Input };

