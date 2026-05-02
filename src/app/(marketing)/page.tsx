'use client';

import Link from 'next/link';
import { useAuth } from '@/features/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AxiomLogo } from '@/components/ui/AxiomLogo';
import BentoCard from '@/components/ui/BentoCard';
import BentoGrid from '@/components/ui/BentoGrid';

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
        <div className="bg-[var(--surface-base)] text-[var(--fg-primary)] min-h-screen">
            <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 text-center">
                <div className="inline-block px-3 py-1 mb-8 border border-[var(--surface-border)] rounded-full text-[10px] font-bold tracking-widest text-[var(--color-primary)] uppercase bg-[var(--surface-raised)]">
                    Education Refined
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                    Master engineering <br />
                    <span className="text-[var(--color-primary)]">with precision.</span>
                </h1>
                
                <p className="text-lg md:text-xl text-[var(--fg-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
                    Personalized curricula, real-world projects, and AI mentorship 
                    built for the next generation of software engineers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/login">
                        <Button size="lg" className="px-8">
                            Start Learning
                        </Button>
                    </Link>
                    <Link href="#features">
                        <Button variant="outline" size="lg" className="px-8">
                            Explore Features
                        </Button>
                    </Link>
                </div>
            </main>

            <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-[var(--surface-border)]">
                <BentoGrid className="grid-cols-1 md:grid-cols-3">
                    {[
                        {
                            title: "Autonomous Paths",
                            desc: "Adaptive learning algorithms that evolve with your progress and weaknesses.",
                            icon: "⚡"
                        },
                        {
                            title: "AI Mentor",
                            desc: "Context-aware AI that doesn't just give answers, but teaches you how to think.",
                            icon: "🧠"
                        },
                        {
                            title: "Proof of Mastery",
                            desc: "Build real projects and verify your skills with deep concept tracking.",
                            icon: "🏆"
                        }
                    ].map((feature, i) => (
                        <BentoCard key={i} size="medium" className="flex flex-col justify-center">
                            <div className="text-3xl mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 tracking-tight">
                                {feature.title}
                            </h3>
                            <p className="text-[var(--fg-secondary)] leading-relaxed text-sm">
                                {feature.desc}
                            </p>
                        </BentoCard>
                    ))}
                </BentoGrid>
            </section>

            <footer className="py-12 px-6 border-t border-[var(--surface-border)] bg-[var(--surface-raised)]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <AxiomLogo className="w-5 h-5" />
                        <span className="font-bold text-lg tracking-tight">AXIOM</span>
                    </div>
                    <div className="text-xs font-medium text-[var(--fg-muted)] uppercase tracking-wider">
                        © 2026 Axiom Learning
                    </div>
                    <div className="flex gap-6 text-xs font-bold uppercase tracking-wider text-[var(--fg-secondary)]">
                        <Link href="https://github.com/Nashid-k" className="hover:text-[var(--color-primary)] transition-colors">GitHub</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
