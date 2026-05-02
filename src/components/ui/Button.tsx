"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
} & HTMLMotionProps<"button">;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, ...props }, ref) => {
    const variants = {
      primary: "bg-brand text-white shadow-lg shadow-brand/20 hover:shadow-brand/40",
      secondary: "bg-brand-soft text-brand hover:bg-brand/20",
      outline: "border-2 border-brand/20 text-brand hover:border-brand/40 bg-transparent",
      ghost: "text-fg-secondary hover:text-brand hover:bg-brand/10",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200",
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
        <span className="relative z-10">{children as React.ReactNode}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";
