"use client";

import { ReactNode, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from '@/lib/utils';

interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  align?: "center" | "top";
  containerClassName?: string;
  backdropClassName?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

export function ModalShell({
  isOpen,
  onClose,
  children,
  align = "center",
  containerClassName,
  backdropClassName,
  ariaLabel,
}: ModalShellProps) {
  const alignmentClasses = align === "center"
    ? "items-center justify-center top-0 bottom-0"
    : "items-start justify-center pt-[10vh]";

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={cn("fixed inset-0 z-[var(--z-modal)] flex px-4", alignmentClasses)}>
          <motion.div
            className={cn(
              "absolute inset-0 bg-black/60 backdrop-blur-md",
              backdropClassName
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "relative z-[1] w-full flex flex-col overflow-hidden",
              "glass-card rounded-[32px] border-surface-border shadow-2xl",
              containerClassName
            )}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function ModalContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("p-8 sm:p-12", className)}>
      {children}
    </div>
  );
}

export const ModalItem = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);

export function ModalCloseButton({ onClose, className }: { onClose: () => void; className?: string }) {
  return (
    <button
      onClick={onClose}
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-xl bg-surface-base/50 hover:bg-fg-primary hover:text-white transition-all duration-300 border border-surface-border",
        className
      )}
      type="button"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  );
}
