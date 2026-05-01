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
  ariaLabelledBy,
}: ModalShellProps) {
  const alignmentClasses = align === "center"
    ? "items-center justify-center top-0 bottom-0"
    : "items-start justify-center pt-[10vh]";

  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    previousActiveRef.current = document.activeElement as HTMLElement | null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusDialog = () => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const firstFocusable = dialog.querySelector<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      (firstFocusable ?? dialog).focus();
    };
    focusDialog();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusable.length) { e.preventDefault(); dialog.focus(); return; }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveRef.current?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={cn("fixed inset-0 z-[var(--z-modal)] flex px-4", alignmentClasses)}>
          <motion.div
            className={cn(
              "absolute inset-0",
              "bg-black/20 dark:bg-black/40",
              backdropClassName
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
            className={cn(
              "relative z-[1] w-full flex flex-col overflow-hidden",
              "bg-white dark:bg-black",
              "border border-neutral-200 dark:border-neutral-800",
              "rounded-lg",
              "shadow-none",
              containerClassName
            )}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
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
    <div className={cn("p-6", className)}>
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
        "flex items-center justify-center w-8 h-8 rounded-md",
        "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        "text-neutral-500 hover:text-black dark:hover:text-white",
        "border border-neutral-200 dark:border-neutral-800",
        "transition-none",
        className
      )}
      type="button"
      aria-label="Close"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  );
}

export function ModalDestructiveButton({ onClick, children, className, disabled }: { onClick: () => void; children: ReactNode; className?: string; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center gap-2",
        "px-4 py-2",
        "rounded-md",
        "bg-red-50 dark:bg-red-900/10",
        "border border-red-200 dark:border-red-800",
        "text-red-600 dark:text-red-400",
        "text-sm font-bold",
        "transition-none",
        "disabled:opacity-40",
        className
      )}
      type="button"
    >
      {children}
    </button>
  );
}
