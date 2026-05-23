"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  label?: string;
} & HTMLAttributes<HTMLDivElement>;

const sizeMap = {
  sm: { outer: 32, inner: 16, core: 6, stroke: 1.5 },
  md: { outer: 64, inner: 32, core: 12, stroke: 2 },
  lg: { outer: 96, inner: 48, core: 18, stroke: 3 },
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
      className={cn("flex flex-col items-center justify-center gap-5 select-none", className)}
      role="status"
      aria-live="polite"
      aria-label={label || "Loading"}
      {...rest}
    >
      <div 
        className="relative flex items-center justify-center"
        style={{ width: dimensions.outer, height: dimensions.outer }}
      >
        {/* Soft background radial bloom pulsing */}
        <div 
          className="absolute rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-cyan)] opacity-20 blur-xl animate-pulse-glow"
          style={{ width: dimensions.outer * 1.2, height: dimensions.outer * 1.2 }}
        />

        {/* Outer Ring - Dynamic flowing gradient stream with stroke animation */}
        <svg 
          className="absolute inset-0 animate-spin" 
          width={dimensions.outer} 
          height={dimensions.outer} 
          viewBox="0 0 100 100"
          style={{ animationDuration: "1.6s", animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
        >
          <defs>
            <linearGradient id="spinner-grad-outer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="1" />
              <stop offset="50%" stopColor="var(--color-cyan)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle 
            cx="50" 
            cy="50" 
            r="42" 
            stroke="url(#spinner-grad-outer)" 
            strokeWidth={dimensions.stroke * 2} 
            fill="none" 
            strokeLinecap="round"
            strokeDasharray="200 60"
          />
        </svg>

        {/* Middle Ring - Counter-rotating speed ring */}
        <svg 
          className="absolute inset-0 animate-spin" 
          width={dimensions.outer} 
          height={dimensions.outer} 
          viewBox="0 0 100 100"
          style={{ 
            animationDuration: "1s", 
            animationDirection: "reverse",
            animationTimingFunction: "linear"
          }}
        >
          <defs>
            <linearGradient id="spinner-grad-middle" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.9" />
              <stop offset="70%" stopColor="var(--color-primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle 
            cx="50" 
            cy="50" 
            r="30" 
            stroke="url(#spinner-grad-middle)" 
            strokeWidth={dimensions.stroke * 1.5} 
            fill="none" 
            strokeLinecap="round"
            strokeDasharray="120 40"
          />
        </svg>

        {/* Core Quantum Sphere - Glare glassmorphic pulse */}
        <div 
          className="absolute rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-cyan)] shadow-[0_0_20px_rgba(99,102,241,0.6)] flex items-center justify-center border border-white/20 animate-pulse-glow"
          style={{ 
            width: dimensions.inner, 
            height: dimensions.inner,
          }}
        >
          <div className="absolute inset-0.5 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
            {/* Pulsing White Photon Core */}
            <div 
              className="rounded-full bg-white shadow-[0_0_12px_#ffffff] animate-ping opacity-75"
              style={{ width: dimensions.core, height: dimensions.core }}
            />
            <div 
              className="absolute rounded-full bg-white shadow-[0_0_8px_#ffffff]"
              style={{ width: dimensions.core, height: dimensions.core }}
            />
          </div>
        </div>
      </div>

      {label && (
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-center text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-white to-[var(--color-cyan)] animate-pulse shadow-sm">
          {label}
        </p>
      )}
    </div>
  );
}

export default LoadingSpinner;
