"use client";

import Link from "next/link";
import { useAuth } from "@/features/auth/AuthContext";
import { AxiomLogo } from "./AxiomLogo";
import { Button } from "./Button";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { user } = useAuth();

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-nav w-[95%] max-w-7xl"
    >
      <nav className="glass-card px-6 py-3 rounded-2xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <AxiomLogo className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-extrabold text-xl tracking-tighter text-gradient">
            AXIOM
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {["Paths", "Leaderboard", "Flashcards"].map((item) => (
            <Link 
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-sm font-semibold text-fg-secondary hover:text-brand transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <Link href="/paths">
              <Button size="sm">Dashboard</Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button size="sm" variant="outline">Sign In</Button>
            </Link>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
