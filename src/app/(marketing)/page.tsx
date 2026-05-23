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
                
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
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

                {/* Product preview */}
                <div className="mt-16 border border-[var(--surface-border)] rounded-lg overflow-hidden shadow-2xl bg-[var(--surface-raised)] text-left transition-all duration-300 hover:border-[var(--color-primary)]/40">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--surface-border)] bg-[var(--surface-base)]/50">
                        <div className="w-3 h-3 rounded-full bg-red-400/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                        <div className="w-3 h-3 rounded-full bg-green-400/60" />
                        <div className="flex-1 text-center text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                            axiom-learn.com/paths
                        </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { name: 'React', progress: '72%', xp: '3,400 XP' },
                            { name: 'TypeScript', progress: '41%', xp: '1,850 XP' },
                            { name: 'System Design', progress: '18%', xp: '800 XP' }
                        ].map((path) => (
                            <div key={path.name} className="p-4 border border-[var(--surface-border)] rounded-md bg-[var(--surface-base)] transition-all duration-300 hover:translate-y-[-2px] hover:border-[var(--color-primary)]/30">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-primary)]">PATH</span>
                                    <span className="text-[9px] font-bold text-[var(--fg-muted)]">{path.xp}</span>
                                </div>
                                <div className="font-extrabold text-[var(--fg-primary)] text-base mb-3">{path.name}</div>
                                <div className="h-1.5 bg-[var(--surface-raised)] rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-1000 ease-out" 
                                        style={{ width: path.progress }} 
                                    />
                                </div>
                                <div className="flex justify-between items-center mt-2 text-[9px] font-bold text-[var(--fg-muted)]">
                                    <span>Sync Progress</span>
                                    <span className="text-[var(--fg-primary)]">{path.progress}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Social proof strip */}
            <div className="py-12 border-t border-b border-[var(--surface-border)] my-12 text-center max-w-4xl mx-auto px-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)] mb-4">
                    Trusted by developers worldwide
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 text-[var(--fg-secondary)] text-sm font-medium">
                    <span className="flex items-center gap-1.5">🚀 1,000+ Learners</span>
                    <span className="flex items-center gap-1.5">📚 15+ Learning Paths</span>
                    <span className="flex items-center gap-1.5">🤖 AI-powered Mentorship</span>
                </div>
            </div>

            <section id="features" className="max-w-7xl mx-auto px-6 py-24">
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
                            <div className="w-10 h-10 rounded-md bg-[var(--color-primary)]/10 flex items-center justify-center text-xl mb-4 text-[var(--color-primary)]">
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
                        <Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Terms</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
