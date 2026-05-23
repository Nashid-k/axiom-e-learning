import React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, ...props }, ref) => {
    const variants = {
      primary: "bg-white text-black font-semibold shadow-[0_4px_12px_rgba(255,255,255,0.15)] hover:bg-[#e8e8ed] active:scale-[0.98]",
      secondary: "bg-white/10 text-white hover:bg-white/15 border border-white/5 active:scale-[0.98]",
      outline: "border border-white/15 text-white hover:bg-white/5 active:scale-[0.98]",
      ghost: "text-neutral-400 hover:text-white hover:bg-white/5 active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs rounded-full",
      md: "px-6 py-2.5 text-sm rounded-full",
      lg: "px-8 py-3.5 text-base rounded-full font-bold tracking-tight",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-semibold select-none cursor-pointer overflow-hidden transition-all duration-400 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
          variants[variant],
          sizes[size],
          loading && "opacity-80 pointer-events-none",
          className
        )}
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        <span className="relative z-10 flex items-center gap-1.5">{children as React.ReactNode}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

