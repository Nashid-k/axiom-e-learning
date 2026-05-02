"use client";

import Link from "next/link";
import { useAuth } from "@/features/auth/AuthContext";
import { AxiomLogo } from "./AxiomLogo";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const { user } = useAuth();

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
            <Link href="/paths">
              <Button size="sm" variant="secondary">Dashboard</Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
