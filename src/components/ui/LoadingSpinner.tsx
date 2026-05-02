"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  label?: string;
  variant?: "classic" | "minimal" | "bars";
} & HTMLAttributes<HTMLDivElement>;

const sizeMap = {
  sm: 16,
  md: 32,
  lg: 48,
};

export function LoadingSpinner({
  size = "md",
  label,
  variant = "bars",
  className = "",
  ...rest
}: LoadingSpinnerProps) {
  const pixelSize = sizeMap[size];

  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-4", className)}
      role="status"
      aria-live="polite"
      aria-label={label || "Loading"}
      {...rest}
    >
      <div className="relative flex items-center justify-center" style={{ width: pixelSize, height: pixelSize }}>
        {variant === "bars" && (
          <div className="flex gap-1 items-center justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-fg-primary rounded-full"
                initial={{ height: pixelSize * 0.4 }}
                animate={{ height: [pixelSize * 0.4, pixelSize * 0.8, pixelSize * 0.4] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        {variant === "classic" && (
          <motion.div
            className={cn(
              "rounded-full border-2 border-border-default border-t-fg-primary"
            )}
            style={{ width: pixelSize, height: pixelSize }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>

      {label && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-bold uppercase tracking-widest text-fg-muted"
        >
          {label}
        </motion.p>
      )}
    </div>
  );
}

export default LoadingSpinner;
