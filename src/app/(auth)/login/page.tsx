'use client';

import { useAuth } from '@/features/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { springs } from '@/lib/motion/motion-config';

import { AxiomLogo } from '@/components/ui/AxiomLogo';
import AppError from '@/components/ui/AppError';
import { TermsModal } from '@/features/landing/components/TermsModal';

export default function LoginPage() {
    const { user, googleLogin: login, loading, error, setError } = useAuth();
    const router = useRouter();
    const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (!loading && user) {
            router.replace('/paths');
        }
    }, [user, loading, router]);

    return (
        <div className="min-h-screen bg-[var(--surface-base)] text-[var(--fg-primary)] flex items-center justify-center p-[var(--space-2)] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] bg-[var(--color-500)]/8" />
            </div>

            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={shouldReduceMotion ? { duration: 0.01 } : springs.responsive}
                className={[
                    "w-full max-w-md relative z-10",
                    "bg-[var(--surface-raised)]",
                    "border border-[var(--border-default)]",
                    "rounded-[var(--radius-2xl)]",
                    "p-[var(--space-4)]",
                    "shadow-[var(--shadow-lg)]",
                ].join(' ')}
            >
                <div className="text-center mb-[var(--space-3)]">
                    <AxiomLogo className="w-20 h-20 mx-auto mb-[var(--space-2)] text-[var(--fg-primary)]" variant="gradient" />
                    <h1 className="text-[var(--text-heading)] font-[var(--font-weight-bold)] mb-[var(--space-1)] text-[var(--fg-primary)]">
                        Welcome Back
                    </h1>
                    <p className="text-[var(--fg-secondary)] text-[var(--text-body)]">
                        Sign in to continue your mastery.
                    </p>
                </div>

                <div className="flex flex-col gap-[var(--space-2)]">
                    <div className="text-center">
                        <p className="text-[var(--text-caption)] text-[var(--fg-muted)] leading-[var(--leading-relaxed)] select-none">
                            By continuing, you agree to our{" "}
                            <span
                                className="text-[var(--color-ana-blue-500)] hover:underline cursor-pointer"
                                onClick={(e) => { e.stopPropagation(); setModalType('terms'); }}
                            >
                                Terms
                            </span>
                            {" "}and{" "}
                            <span
                                className="text-[var(--color-ana-blue-500)] hover:underline cursor-pointer"
                                onClick={(e) => { e.stopPropagation(); setModalType('privacy'); }}
                            >
                                Privacy Policy
                            </span>.
                        </p>
                    </div>

                    {error ? (
                        <AppError error={{ name: 'Login Error', message: error }} reset={() => setError(null)} />
                    ) : (
                        <motion.button
                            onClick={() => login()}
                            whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -2, transition: springs.snap }}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                            className={[
                                "w-full flex items-center justify-center gap-[var(--space-1)]",
                                "px-[var(--space-2)] py-[var(--space-1)]",
                                "rounded-[var(--radius-lg)]",
                                "text-[var(--text-body)] font-[var(--font-weight-semibold)]",
                                "transition-all duration-[var(--duration-base)]",
                                "border border-[var(--border-default)]",
                                "bg-[var(--surface-overlay)] text-[var(--fg-primary)]",
                                "hover:bg-[var(--color-50)] hover:text-black hover:border-[var(--border-strong)]",
                                "cursor-pointer shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]",
                                "min-h-[44px]",
                            ].join(' ')}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </motion.button>
                    )}
                </div>

                <div className="mt-[var(--space-3)] text-center">
                    <Link
                        href="/"
                        className="text-[var(--text-caption)] text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors duration-[var(--duration-base)]"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </motion.div>

            <TermsModal isOpen={!!modalType} type={modalType || 'terms'} onClose={() => setModalType(null)} />
        </div>
    );
}
