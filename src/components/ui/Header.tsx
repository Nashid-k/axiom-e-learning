"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/features/auth/AuthContext";
import { AxiomLogo } from "./AxiomLogo";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import { ExperienceSelector } from "./ExperienceSelector";
import { cn } from "@/lib/utils";

export function Header() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Flashcards", href: "/flashcards" },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      "bg-[var(--surface-base)] backdrop-blur-xl border-b border-[var(--surface-border)] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
    )}>
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={user ? "/paths" : "/"} className="flex items-center gap-2.5 group">
            <div className="relative p-1.5 rounded-lg bg-[var(--surface-raised)] border border-[var(--surface-border)] group-hover:border-[var(--color-primary)]/50 transition-colors">
              <AxiomLogo className="w-6 h-6 transition-transform duration-500 group-hover:rotate-12" />
              <div className="absolute inset-0 rounded-lg bg-[var(--color-primary)] opacity-0 group-hover:opacity-10 blur-md transition-opacity" />
            </div>
            <span className="font-black text-xl tracking-tight text-[var(--fg-primary)] bg-gradient-to-r from-[var(--fg-primary)] to-[var(--fg-secondary)] bg-clip-text text-transparent group-hover:from-[var(--fg-primary)] group-hover:to-[var(--color-cyan)] transition-all">
              AXIOM
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const isActive = pathname?.startsWith(item.href);
              return (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 rounded-lg",
                    isActive 
                      ? "text-[var(--fg-primary)]" 
                      : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:bg-[var(--surface-border)]"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)] rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ExperienceSelector />
          <ThemeToggle />
          <div className="hidden sm:block h-5 w-[1px] bg-[var(--surface-border)]" />
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/paths">
                <Button size="sm" variant="secondary" className="hover:border-[var(--color-primary)]/30">
                  Dashboard
                </Button>
              </Link>
              <Button size="sm" variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/30" onClick={() => logout()}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Link href="/login" className="hidden sm:block">
              <Button size="sm">Sign In</Button>
            </Link>
          )}

          <button
            className="md:hidden p-2 rounded-lg border border-[var(--surface-border)] hover:bg-[var(--surface-raised)] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-all cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--surface-border)] bg-[var(--surface-base)] backdrop-blur-xl px-6 py-6 space-y-3 animate-in slide-in-from-top-4 duration-300 shadow-2xl">
          {navigationItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-3 text-sm font-semibold tracking-wide rounded-xl transition-all",
                  isActive
                    ? "bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-cyan)]/10 text-[var(--fg-primary)] border border-[var(--color-primary)]/20 shadow-[0_0_15px_rgba(99,102,241,0.05)]"
                    : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:bg-[var(--surface-border)] border border-transparent"
                )}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-[var(--surface-border)] flex flex-col gap-3">
            {user ? (
              <>
                <Link href="/paths" onClick={() => setMobileOpen(false)} className="w-full">
                  <Button size="sm" variant="secondary" className="w-full justify-center">
                    Dashboard
                  </Button>
                </Link>
                <Button size="sm" variant="outline" className="w-full justify-center border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/30" onClick={() => { setMobileOpen(false); logout(); }}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)} className="w-full">
                <Button size="sm" className="w-full justify-center">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

