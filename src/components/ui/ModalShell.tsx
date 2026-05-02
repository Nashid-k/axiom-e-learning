"use client";

import { ReactNode, useEffect, useRef } from "react";
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

  if (!isOpen) return null;

  return (
    <div className={cn("fixed inset-0 z-50 flex px-4", alignmentClasses)}>
      <div
        className={cn(
          "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity",
          backdropClassName
        )}
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className={cn(
          "relative z-10 w-full flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200",
          "bg-[var(--surface-base)] rounded-lg border border-[var(--surface-border)] shadow-xl",
          containerClassName
        )}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function ModalContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("p-6 sm:p-8", className)}>
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
        "flex items-center justify-center w-8 h-8 rounded-md bg-[var(--surface-raised)] hover:bg-[var(--surface-border)] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors border border-transparent",
        className
      )}
      type="button"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  );
}
