"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => { setMounted(true) }, [])

    if (!mounted) return (
        <div className="w-10 h-10 rounded-full border border-[var(--surface-border)] bg-[var(--surface-raised)] animate-pulse" />
    )

    const isLight = resolvedTheme === "light"

    return (
        <button
            onClick={() => setTheme(isLight ? "dark" : "light")}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--surface-border)] bg-[var(--surface-base)] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:bg-white/5 transition-all duration-500 ease-out active:scale-90 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
            title={`Switch to ${isLight ? "dark" : "light"} mode`}
            type="button"
        >
            <div className="transition-transform duration-500 ease-out transform hover:rotate-45">
                {isLight ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-in fade-in zoom-in-75 duration-300">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" /><path d="M12 20v2" />
                        <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
                        <path d="M2 12h2" /><path d="M20 12h2" />
                        <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-in fade-in zoom-in-75 duration-300">
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    </svg>
                )}
            </div>
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
