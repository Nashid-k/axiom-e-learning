"use client";

import { ReactNode, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
const SPRING_ENTER = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
  mass: 0.8,
};

const SPRING_EXIT = {
  type: "spring" as const,
  stiffness: 400,
  damping: 40,
  mass: 0.6,
};

const BACKDROP_EASE = [0.25, 0.46, 0.45, 0.94] as const;

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

  const shouldReduceMotion = useReducedMotion();
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
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className={cn("fixed inset-0 z-[var(--z-modal)] flex px-[var(--space-2)]", alignmentClasses)}>
          <motion.div
            className={cn(
              "absolute inset-0",
              "bg-[var(--color-950)]/60 dark:bg-[var(--color-950)]/75",
              "backdrop-blur-xl",
              backdropClassName
            )}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0.01 }
                : { duration: 0.3, ease: BACKDROP_EASE }
            }
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={dialogRef}
            initial={shouldReduceMotion
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.82, y: 32 }
            }
            animate={shouldReduceMotion
              ? undefined
              : { opacity: 1, scale: 1, y: 0 }
            }
            exit={shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.94, y: 12, transition: { ...SPRING_EXIT, stiffness: 600, damping: 45 } }
            }
            transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_ENTER}
            className={cn(
              "relative z-[1] w-full flex flex-col overflow-hidden",
              "bg-[var(--surface-base)]",
              "border border-[var(--border-default)]",
              "rounded-[var(--radius-2xl)]",
              [
                "shadow-[",
                "  0_0_0_1px_hsl(258_50%_60%/0.07),",
                "  0_8px_24px_hsl(258_50%_10%/0.18),",
                "  0_32px_80px_hsl(258_50%_10%/0.32)",
                "]"
              ].join(''),
              "will-change-transform",
              containerClassName
            )}
            style={{
              boxShadow: [
                "0 0 0 1px hsl(258 50% 60% / 0.08)",
                "0 8px 24px hsl(258 50% 10% / 0.18)",
                "0 32px 80px hsl(258 50% 10% / 0.32)",
              ].join(', '),
              WebkitBackfaceVisibility: 'hidden',
              transform: 'translate3d(0,0,0)',
            }}
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
const STAGGER_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.06,
    },
  },
};

const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring" as const, stiffness: 400, damping: 28, mass: 0.7 },
  },
};

interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

export function ModalContent({ children, className }: ModalContentProps) {
  return (
    <motion.div
      variants={STAGGER_CONTAINER}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const ModalItem = motion.div;
export { STAGGER_ITEM as modalItemVariants };
interface ModalCloseButtonProps {
  onClose: () => void;
  className?: string;
}

export function ModalCloseButton({ onClose, className }: ModalCloseButtonProps) {
  return (
    <motion.button
      onClick={onClose}
      whileHover={{ scale: 1.12, rotate: 90 }}
      whileTap={{ scale: 0.85 }}
      transition={{ type: "spring", stiffness: 600, damping: 25 }}
      className={cn(
        "flex-shrink-0 w-11 h-11 rounded-[var(--radius-full)]",
        "bg-[var(--surface-overlay)] hover:bg-[var(--surface-raised)]",
        "flex items-center justify-center",
        "text-[var(--fg-secondary)] flex-shrink-0",
        "border border-[var(--border-default)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-500)]",
        "cursor-pointer",
        className
      )}
      type="button"
      aria-label="Close"
      style={{ originX: 0.5, originY: 0.5 }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </motion.button>
  );
}
interface ModalDestructiveButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export function ModalDestructiveButton({ onClick, children, className, disabled }: ModalDestructiveButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 0 0 3px hsl(4 90% 55% / 0.18), 0 4px 20px hsl(4 90% 55% / 0.35)",
      }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 500, damping: 22 }}
      className={cn(
        "flex items-center justify-center gap-2",
        "px-[var(--space-2)] py-[var(--space-1)]",
        "rounded-[var(--radius-lg)]",
        "bg-[var(--color-destruct)]/8 dark:bg-[var(--color-destruct)]/10",
        "border border-[var(--color-destruct)]/25",
        "text-[var(--color-destruct)]",
        "text-[var(--text-caption)] font-[var(--font-weight-semibold)]",
        "transition-colors duration-[var(--duration-fast)]",
        "disabled:opacity-40 disabled:pointer-events-none",
        "cursor-pointer",
        className
      )}
      type="button"
    >
      {children}
    </motion.button>
  );
}
