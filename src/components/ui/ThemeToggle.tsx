"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    const shouldReduceMotion = useReducedMotion()

    React.useEffect(() => { setMounted(true) }, [])

    if (!mounted) return <div className="w-11 h-11" />

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
            className={[
                "relative flex items-center justify-center w-11 h-11",
                "rounded-[var(--radius-full)]",
                "bg-[var(--surface-raised)]",
                "text-[var(--fg-secondary)]",
                "hover:bg-[var(--surface-overlay)]",
                "hover:text-[var(--fg-primary)]",
                "transition-colors duration-[var(--duration-base)]",
                "border border-[var(--border-default)]",
                "focus:outline-none",
            ].join(' ')}
            title={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`}
            type="button"
            aria-pressed={resolvedTheme === "dark"}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={resolvedTheme}
                    initial={shouldReduceMotion ? { opacity: 1 } : { y: -10, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { y: 10, opacity: 0, rotate: 45 }}
                    transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.2 }}
                >
                    {resolvedTheme === "light" ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2" /><path d="M12 20v2" />
                            <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
                            <path d="M2 12h2" /><path d="M20 12h2" />
                            <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                        </svg>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                        </svg>
                    )}
                </motion.div>
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
