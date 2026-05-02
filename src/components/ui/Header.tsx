'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, memo } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { AxiomLogo } from '@/components/ui/AxiomLogo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import ProfileSettingsModal from '@/features/learning/components/ProfileSettingsModal';
import { useSession } from 'next-auth/react';

import { LevelBadge } from '@/features/learning/components/LevelBadge';
import { useGlobalProgress } from '@/lib/providers/ProgressProvider';

function HeaderInner() {
    const { user, logout } = useAuth();
    const { data: session } = useSession();
    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { setProfileOpen(false); setMobileMenuOpen(false); }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => { document.removeEventListener('keydown', handleKeyDown); };
    }, []);

    const { streak } = useGlobalProgress();

    if (pathname === '/login' || pathname === '/') return null;
    if (!user) return null;

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
            <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 transition-none">
                <div className="h-14 max-w-7xl mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/paths" className="flex items-center gap-2">
                            <AxiomLogo className="w-5 h-5" />
                            <span className="text-base font-bold tracking-tight text-black dark:text-white">Axiom</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-4">
                            <Link
                                href="/leaderboard"
                                className="text-sm font-medium text-neutral-500 hover:text-black dark:hover:text-white transition-none"
                            >
                                Leaderboard
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-4">
                            <LevelBadge />
                            {streak > 0 && (
                                <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-md">
                                    <span className="text-xs font-bold text-orange-600 dark:text-orange-400">{streak}</span>
                                    <span className="text-xs">🔥</span>
                                </div>
                            )}
                        </div>

                        <ThemeToggle />

                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('axiom:open-search'))}
                            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-none"
                        >
                            <span>Search</span>
                            <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded">Ctrl K</kbd>
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 overflow-hidden"
                            >
                                <Image src={displayImage} alt={currentUser?.name || "User"} width={32} height={32} className="w-full h-full object-cover" />
                            </button>

                            {profileOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-md shadow-lg z-50 overflow-hidden py-1">
                                        <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-800">
                                            <p className="text-sm font-bold truncate text-black dark:text-white">{currentUser?.name}</p>
                                            <p className="text-xs text-neutral-500 truncate">{currentUser?.email}</p>
                                        </div>
                                        <button
                                            onClick={() => { setProfileOpen(false); setSettingsOpen(true); }}
                                            className="w-full text-left px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-none"
                                        >
                                            Customize Profile
                                        </button>
                                        <button
                                            onClick={() => { setProfileOpen(false); logout(); }}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-none"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        <button
                            className="md:hidden p-2 text-neutral-500"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[60] md:hidden">
                    <div className="absolute inset-0 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
                    <div className="absolute right-0 top-0 bottom-0 w-64 bg-white dark:bg-black border-l border-neutral-200 dark:border-neutral-800 flex flex-col">
                        <div className="h-14 px-4 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
                            <span className="font-bold text-sm">Menu</span>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            <div className="space-y-2">
                                <Link href="/paths" onClick={() => setMobileMenuOpen(false)} className="block p-3 text-sm font-bold bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md">Paths</Link>
                                <Link href="/leaderboard" onClick={() => setMobileMenuOpen(false)} className="block p-3 text-sm font-bold bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md">Leaderboard</Link>
                            </div>
                            <div className="space-y-2 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                                <button onClick={() => { setMobileMenuOpen(false); setSettingsOpen(true); }} className="w-full text-left p-3 text-sm font-bold text-neutral-600 dark:text-neutral-400">Settings</button>
                                <button onClick={() => { setMobileMenuOpen(false); logout(); }} className="w-full text-left p-3 text-sm font-bold text-red-600">Sign out</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="h-14" />
            <ProfileSettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </>
    );
}

export default memo(HeaderInner);
