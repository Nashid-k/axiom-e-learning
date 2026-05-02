'use client';

import { useAuth } from '@/features/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AxiomLogo } from '@/components/ui/AxiomLogo';
import { Button } from '@/components/ui/Button';
import AppError from '@/components/ui/AppError';
import { TermsModal } from '@/features/landing/components/TermsModal';

export default function LoginPage() {
    const { user, googleLogin: login, loading, error, setError } = useAuth();
    const router = useRouter();
    const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);
    const [isSigningIn, setIsSigningIn] = useState(false);

    useEffect(() => {
        if (!loading && user) {
            router.replace('/paths');
        }
    }, [user, loading, router]);

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center p-6">
            <div className="w-full max-w-sm border border-neutral-200 dark:border-neutral-800 rounded-md p-10">
                <div className="text-center mb-10">
                    <AxiomLogo className="w-12 h-12 mx-auto mb-6" />
                    <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-neutral-500 dark:text-neutral-400">Sign in to continue your journey.</p>
                </div>

                <div className="space-y-6">
                    {error ? (
                        <AppError error={{ name: 'Login Error', message: error }} reset={() => setError(null)} />
                    ) : (
                        <Button 
                            onClick={async () => {
                                setIsSigningIn(true);
                                await login();
                                setIsSigningIn(false);
                            }}
                            variant="outline"
                            isLoading={isSigningIn}
                            className="w-full flex items-center justify-center gap-3 py-6"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </Button>
                    )}

                    <p className="text-xs text-center text-neutral-400 dark:text-neutral-500 leading-relaxed">
                        By continuing, you agree to our{" "}
                        <button className="text-neutral-600 dark:text-neutral-300 hover:underline" onClick={() => setModalType('terms')}>Terms</button>
                        {" "}and{" "}
                        <button className="text-neutral-600 dark:text-neutral-300 hover:underline" onClick={() => setModalType('privacy')}>Privacy Policy</button>.
                    </p>
                </div>

                <div className="mt-10 text-center">
                    <Link href="/" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-black dark:hover:text-white">
                        ← Back to Home
                    </Link>
                </div>
            </div>

            <TermsModal isOpen={!!modalType} type={modalType || 'terms'} onClose={() => setModalType(null)} />
        </div>
    );
}
