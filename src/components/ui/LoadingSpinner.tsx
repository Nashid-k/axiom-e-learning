"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  label?: string;
} & HTMLAttributes<HTMLDivElement>;

const sizeMap = {
  sm: { outer: 24, inner: 12 },
  md: { outer: 48, inner: 28 },
  lg: { outer: 72, inner: 44 },
};

export function LoadingSpinner({
  size = "md",
  label,
  className = "",
  ...rest
}: LoadingSpinnerProps) {
  const dimensions = sizeMap[size];

  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-4", className)}
      role="status"
      aria-live="polite"
      aria-label={label || "Loading"}
      {...rest}
    >
      <div 
        className="relative flex items-center justify-center"
        style={{ width: dimensions.outer, height: dimensions.outer }}
      >
        {/* Outer Orbit - Indigo/Cyan Glowing */}
        <div 
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--color-primary)] border-b-[var(--color-cyan)] animate-spin opacity-80 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
          style={{ width: dimensions.outer, height: dimensions.outer }}
        />

        {/* Inner Orbit - Pink Counter-Rotating */}
        <div 
          className="absolute rounded-full border-2 border-transparent border-l-[var(--color-accent)] border-r-[var(--color-accent)] animate-spin opacity-90 shadow-[0_0_10px_rgba(236,72,153,0.3)]"
          style={{ 
            width: dimensions.inner, 
            height: dimensions.inner,
            animationDirection: "reverse",
            animationDuration: "0.8s"
          }}
        />

        {/* Center Core Particle */}
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_#ffffff]" />
      </div>

      {label && (
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--fg-secondary)] text-gradient-primary animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
}

export default LoadingSpinner;

