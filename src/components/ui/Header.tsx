'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useAuth } from '@/features/auth/AuthContext';
import { AxiomLogo } from '@/components/ui/AxiomLogo';
import Magnetic from '@/components/ui/Magnetic';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import ProfileSettingsModal from '@/features/learning/components/ProfileSettingsModal';
import { useSession } from 'next-auth/react';

import { LevelBadge } from '@/features/learning/components/LevelBadge';
import { useGlobalProgress } from '@/lib/providers/ProgressProvider';
import { springs } from '@/lib/motion/motion-config';

function HeaderInner() {
    const { user, logout } = useAuth();
    const { data: session } = useSession();
    const [mounted, setMounted] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const pathname = usePathname();
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { setProfileOpen(false); setMobileMenuOpen(false); }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => { clearTimeout(timer); document.removeEventListener('keydown', handleKeyDown); };
    }, []);

    const { streak } = useGlobalProgress();

    if (pathname === '/login' || pathname === '/') return null;
    if (!user || !mounted) return null;

    const validAvatars = [
        '/avatars/boy-1.png', '/avatars/boy-2.png', '/avatars/boy-3.png', '/avatars/boy-4.png', '/avatars/boy-5.png',
        '/avatars/girl-1.png', '/avatars/girl-2.png', '/avatars/girl-3.png', '/avatars/girl-4.png', '/avatars/girl-5.png',
        '/avatars/default.png'
    ];
    const currentUser = session?.user || user;
    const img = currentUser?.image;
    const displayImage = img && validAvatars.includes(img) ? img : "/avatars/default.png";

    return (
        <>
            <motion.header
                initial={shouldReduceMotion ? { y: 0, x: '-50%' } : { y: -100, x: '-50%' }}
                animate={{ y: 0, x: '-50%' }}
                transition={shouldReduceMotion ? { duration: 0.01 } : springs.punchy}
                className={[
                    "fixed top-4 left-1/2 z-50",
                    "w-[95%] max-w-5xl",
                    "bg-[var(--surface-base)]/80 backdrop-blur-md",
                    "border border-[var(--border-default)]",
                    "rounded-full shadow-2xl shadow-blue-500/10",
                    "transition-colors duration-[var(--duration-base)]",
                ].join(' ')}
            >
                <div className="h-14 w-full px-6 flex items-center justify-between">
                    <div className="flex items-center gap-[var(--space-3)]">
                        <Link href="/paths" className="flex items-center gap-[var(--space-1)]">
                            <AxiomLogo className="w-6 h-6" />
                            <span className="text-[var(--text-body)] font-[var(--font-weight-semibold)] tracking-[var(--tracking-tight)] text-[var(--fg-primary)]">Axiom</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-[var(--space-2)]">
                            <Magnetic>
                                <Link
                                    href="/leaderboard"
                                    className="text-[var(--text-caption)] font-[var(--font-weight-medium)] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors duration-[var(--duration-base)] block py-[var(--space-1)]"
                                >
                                    Ranking
                                </Link>
                            </Magnetic>
                        </nav>
                    </div>

                    <div className="flex items-center gap-[var(--space-1)] sm:gap-[var(--space-2)]">
                        <div className="hidden sm:flex items-center gap-[var(--space-2)]">
                            <LevelBadge />
                            {streak > 0 && (
                                <div
                                    className="flex items-center gap-[6px] px-[var(--space-1)] py-[4px] bg-orange-500/10 border border-orange-500/20 rounded-[var(--radius-full)]"
                                    title="Daily Streak"
                                >
                                    <span className="text-[var(--text-caption)] font-bold text-orange-500">{streak}</span>
                                    <span className="text-orange-500 text-xs">🔥</span>
                                </div>
                            )}
                        </div>

                        <div className="hidden sm:block">
                            <Magnetic><div className="p-[4px]"><ThemeToggle /></div></Magnetic>
                        </div>

                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('axiom:open-search'))}
                            className={[
                                "hidden sm:flex items-center gap-[var(--space-1)]",
                                "px-[var(--space-2)] py-[var(--space-1)]",
                                "bg-[var(--surface-raised)] rounded-[var(--radius-md)]",
                                "text-[var(--text-caption)] text-[var(--fg-secondary)]",
                                "transition-colors duration-[var(--duration-base)]",
                                "hover:bg-[var(--surface-overlay)] cursor-pointer min-h-[44px]",
                                "border border-[var(--border-default)]",
                            ].join(' ')}
                            aria-label="Open search (Ctrl+K)"
                            type="button"
                        >
                            <span>Search</span>
                            <kbd className="px-[6px] py-[2px] text-[10px] bg-[var(--surface-base)] rounded-[var(--radius-sm)] border border-[var(--border-default)]">Ctrl K</kbd>
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="w-11 h-11 rounded-[var(--radius-full)] bg-[var(--color-500)] flex items-center justify-center text-xs font-medium text-white shadow-[var(--shadow-sm)] overflow-hidden"
                                type="button"
                                aria-haspopup="menu"
                                aria-expanded={profileOpen}
                                aria-controls="profile-menu"
                                aria-label="Open profile menu"
                            >
                                <Image src={displayImage} alt={currentUser?.name || "User"} width={44} height={44} className="w-full h-full object-cover" />
                            </button>

                            <AnimatePresence>
                                {profileOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                                        <motion.div
                                            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                                            transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.2, ease: "easeOut" }}
                                            className={[
                                                "absolute right-0 top-full mt-[var(--space-1)] w-56",
                                                "bg-[var(--surface-raised)]",
                                                "rounded-[var(--radius-xl)]",
                                                "shadow-[var(--shadow-lg)]",
                                                "border border-[var(--border-default)]",
                                                "z-50 overflow-hidden py-[4px]",
                                            ].join(' ')}
                                            id="profile-menu"
                                            role="menu"
                                        >
                                            <div className="px-[var(--space-2)] py-[var(--space-1)] border-b border-[var(--border-default)]">
                                                <p className="text-[var(--text-caption)] font-[var(--font-weight-medium)] text-[var(--fg-primary)] truncate">{currentUser?.name}</p>
                                                <p className="text-[var(--text-caption)] text-[var(--fg-muted)] truncate">{currentUser?.email}</p>
                                            </div>
                                            <button
                                                onClick={() => { setProfileOpen(false); setSettingsOpen(true); }}
                                                className={[
                                                    "w-full text-left px-[var(--space-2)] py-[var(--space-1)]",
                                                    "text-[var(--text-caption)] text-[var(--fg-primary)]",
                                                    "hover:bg-[var(--surface-overlay)] transition-colors duration-[var(--duration-fast)]",
                                                    "border-b border-[var(--border-default)] min-h-[44px]",
                                                ].join(' ')}
                                                type="button"
                                                role="menuitem"
                                            >
                                                Customize Profile
                                            </button>
                                            <button
                                                onClick={() => { setProfileOpen(false); logout(); }}
                                                className={[
                                                    "w-full text-left px-[var(--space-2)] py-[var(--space-1)]",
                                                    "text-[var(--text-caption)] text-[var(--color-destruct)]",
                                                    "hover:bg-[var(--surface-overlay)] transition-colors duration-[var(--duration-fast)]",
                                                    "min-h-[44px]",
                                                ].join(' ')}
                                                type="button"
                                                role="menuitem"
                                            >
                                                Sign out
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            className="md:hidden p-[var(--space-1)] text-[var(--fg-secondary)] min-h-[44px] min-w-[44px]"
                            onClick={() => setMobileMenuOpen(true)}
                            type="button"
                            aria-label="Open mobile menu"
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
                        transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.25, ease: "easeOut" }}
                        className={[
                            "fixed inset-0 z-[60] md:hidden flex flex-col",
                            "bg-[var(--surface-base)]",
                        ].join(' ')}
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation menu"
                    >
                        <div className="h-16 px-[var(--space-2)] flex items-center justify-between border-b border-[var(--border-default)]">
                            <div className="flex items-center gap-[var(--space-1)]">
                                <AxiomLogo className="w-6 h-6" />
                                <span className="font-bold text-[var(--text-body)]">Menu</span>
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-[var(--space-1)] bg-[var(--surface-overlay)] rounded-[var(--radius-full)] min-h-[44px] min-w-[44px]"
                                type="button"
                                aria-label="Close mobile menu"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 p-[var(--space-2)] flex flex-col gap-[var(--space-2)]">
                            <Link
                                href="/leaderboard"
                                onClick={() => setMobileMenuOpen(false)}
                                className={[
                                    "p-[var(--space-2)] bg-[var(--surface-raised)] rounded-[var(--radius-xl)]",
                                    "text-[var(--text-body)] font-[var(--font-weight-medium)]",
                                    "flex items-center justify-between",
                                    "border border-[var(--border-default)]",
                                ].join(' ')}
                            >
                                <span>Ranking</span>
                                <span>🏆</span>
                            </Link>
                            <button
                                onClick={() => { setMobileMenuOpen(false); window.dispatchEvent(new CustomEvent('axiom:open-search')); }}
                                className={[
                                    "p-[var(--space-2)] bg-[var(--surface-raised)] rounded-[var(--radius-xl)]",
                                    "text-[var(--text-body)] font-[var(--font-weight-medium)]",
                                    "flex items-center justify-between text-left",
                                    "border border-[var(--border-default)]",
                                ].join(' ')}
                                type="button"
                            >
                                <span>Search</span>
                                <span>🔍</span>
                            </button>
                            <div className={[
                                "mt-auto p-[var(--space-2)] bg-[var(--surface-raised)] rounded-[var(--radius-xl)]",
                                "flex items-center justify-between",
                                "border border-[var(--border-default)]",
                            ].join(' ')}>
                                <span className="font-[var(--font-weight-medium)]">Theme</span>
                                <ThemeToggle />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="h-20" />

            <ProfileSettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </>
    );
}

export default memo(HeaderInner);