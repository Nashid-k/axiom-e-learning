'use client';

import Link from 'next/link';
import { useAuth } from '@/features/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AxiomLogo } from '@/components/ui/AxiomLogo';

export default function LandingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.replace('/paths');
        }
    }, [user, loading, router]);

    if (user) return null;

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans selection:bg-brand-500/30">
            <header className="h-16 border-b border-neutral-100 dark:border-neutral-900 flex items-center px-6">
                <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <AxiomLogo className="w-6 h-6" />
                        <span className="font-bold text-lg">Axiom</span>
                    </div>
                    <Link href="/login">
                        <Button variant="outline" size="sm">Sign in</Button>
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pt-24 pb-32 text-center">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                    Master software engineering with AI.
                </h1>
                <p className="text-xl text-neutral-500 dark:text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Personalized curricula, real-world projects, and intelligent mentorship. 
                    Everything you need to go from zero to mastery.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/login">
                        <Button size="lg" className="px-8 py-4 text-lg">Get Started</Button>
                    </Link>
                    <Link href="#features">
                        <Button variant="outline" size="lg" className="px-8 py-4 text-lg">Learn More</Button>
                    </Link>
                </div>
            </main>

            <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-neutral-100 dark:border-neutral-900">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Autonomous Curriculum</h3>
                        <p className="text-neutral-500 dark:text-neutral-400">15+ deep paths covering the full modern stack, from DSA to DevOps.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">AI Mentorship</h3>
                        <p className="text-neutral-500 dark:text-neutral-400">Context-aware assistant that understands your code and your struggle points.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Deep Progress</h3>
                        <p className="text-neutral-500 dark:text-neutral-400">Granular tracking of every concept you master, with a global leaderboard.</p>
                    </div>
                </div>
            </section>

            <footer className="border-t border-neutral-100 dark:border-neutral-900 py-12 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-sm text-neutral-500">© 2026 Axiom</div>
                    <div className="flex gap-6 text-sm font-bold uppercase tracking-widest text-neutral-500">
                        <Link href="https://github.com/Nashid-k" className="hover:text-black dark:hover:text-white">GitHub</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
