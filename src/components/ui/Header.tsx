"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/features/auth/AuthContext";
import { AxiomLogo } from "./AxiomLogo";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full",
      "bg-[var(--surface-base)] border-b border-[var(--surface-border)]"
    )}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <AxiomLogo className="w-6 h-6" />
            <span className="font-bold text-lg tracking-tight text-[var(--fg-primary)]">
              AXIOM
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {["Paths", "Leaderboard", "Flashcards"].map((item) => (
              <Link 
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-sm font-medium text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="h-4 w-[1px] bg-[var(--surface-border)] mx-1" />
          {user ? (
            <Link href="/paths" className="hidden sm:block">
              <Button size="sm" variant="secondary">Dashboard</Button>
            </Link>
          ) : (
            <Link href="/login" className="hidden sm:block">
              <Button size="sm">Sign In</Button>
            </Link>
          )}

          <button
            className="md:hidden p-2 rounded-md border border-[var(--surface-border)] hover:bg-[var(--surface-raised)] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--surface-border)] bg-[var(--surface-base)] px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {["Paths", "Leaderboard", "Flashcards"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:bg-[var(--surface-raised)] rounded-md transition-colors"
            >
              {item}
            </Link>
          ))}
          <div className="pt-2 border-t border-[var(--surface-border)] flex flex-col gap-2">
            {user ? (
              <Link href="/paths" onClick={() => setMobileOpen(false)} className="w-full">
                <Button size="sm" variant="secondary" className="w-full">Dashboard</Button>
              </Link>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)} className="w-full">
                <Button size="sm" className="w-full">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
