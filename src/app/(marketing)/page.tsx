'use client';

import Link from 'next/link';
import { useAuth } from '@/features/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AxiomLogo } from '@/components/ui/AxiomLogo';
import BentoCard from '@/components/ui/BentoCard';
import BentoGrid from '@/components/ui/BentoGrid';
import { cn } from '@/lib/utils';

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
        <div className="bg-[var(--color-bg)] text-white min-h-screen relative overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="absolute top-24 left-1/4 w-96 h-96 bg-[var(--color-primary)]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-96 right-1/4 w-96 h-96 bg-[var(--color-accent)]/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 cyber-grid-bg opacity-[0.02] pointer-events-none" />

            <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 text-center relative z-10">
                <div className="inline-block px-4 py-1.5 mb-8 border border-white/10 rounded-full text-[10px] font-black tracking-[0.25em] text-[var(--color-cyan)] uppercase bg-white/5 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                    EDUCATION RECONSTRUCTED
                </div>
                
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.05] font-display">
                    Master engineering <br />
                    <span className="text-gradient-primary">with absolute precision.</span>
                </h1>
                
                <p className="text-lg md:text-xl text-[var(--fg-secondary)] mb-12 max-w-3xl mx-auto leading-relaxed font-semibold opacity-95">
                    Structured curricula, Spaced Repetition engine, and context-aware AI mentorship 
                    engineered for the next generation of sovereign developers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
                    <Link href="/login">
                        <Button size="lg" className="px-8 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)] shadow-[0_0_25px_rgba(99,102,241,0.4)] border-0">
                            Initiate Synchronization
                        </Button>
                    </Link>
                    <Link href="#features">
                        <Button variant="outline" size="lg" className="px-8 border-white/10 text-white hover:bg-white/5">
                            Explore Console
                        </Button>
                    </Link>
                </div>

                {/* Product preview */}
                <div className="mt-16 border border-white/10 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] bg-gradient-to-b from-[var(--surface-raised)] to-black/40 text-left transition-all duration-500 hover:border-[var(--color-primary)]/30 max-w-4xl mx-auto group">
                    <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5 bg-white/[0.01]">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/10" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/10" />
                        <div className="flex-1 text-center text-[9px] font-black uppercase tracking-[0.2em] text-[var(--fg-secondary)]">
                            axiom-learn.com/control-matrix
                        </div>
                    </div>
                    <div className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
                        {/* Soft ambient back light */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {[
                            { name: 'React Architecture', progress: '72%', xp: '3,400 XP', color: 'from-[#6366f1] to-[#06b6d4]' },
                            { name: 'TypeScript Core', progress: '48%', xp: '1,850 XP', color: 'from-[#ec4899] to-[#8b5cf6]' },
                            { name: 'Systems Dojo', progress: '22%', xp: '800 XP', color: 'from-[#10b981] to-[#06b6d4]' }
                        ].map((path) => (
                            <div key={path.name} className="p-5 border border-white/5 rounded-xl bg-black/40 transition-all duration-300 hover:translate-y-[-4px] hover:border-white/10 hover:shadow-lg relative z-10">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-cyan)]">ACTIVE NODE</span>
                                    <span className="text-[9px] font-bold text-[var(--fg-secondary)]">{path.xp}</span>
                                </div>
                                <div className="font-bold text-white text-base mb-4">{path.name}</div>
                                <div className="h-1.5 bg-black/40 rounded-full overflow-hidden p-[1px]">
                                    <div 
                                        className={`h-full bg-gradient-to-r ${path.color} rounded-full transition-all duration-1000 ease-out`} 
                                        style={{ width: path.progress }} 
                                    />
                                </div>
                                <div className="flex justify-between items-center mt-2.5 text-[9px] font-black uppercase tracking-wider text-[var(--fg-secondary)]">
                                    <span>Sync Progress</span>
                                    <span className="text-white">{path.progress}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Social proof strip */}
            <div className="py-12 border-t border-b border-white/5 my-12 text-center max-w-4xl mx-auto px-6 relative z-10">
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[var(--fg-secondary)] mb-4 animate-pulse">
                    TRUSTED BY ENGINEERS WORLDWIDE
                </p>
                <div className="flex flex-wrap items-center justify-center gap-10 text-[var(--fg-secondary)] text-sm font-semibold tracking-wide">
                    <span className="flex items-center gap-2">🚀 1,000+ Learners</span>
                    <span className="flex items-center gap-2">📚 15+ Core Specializations</span>
                    <span className="flex items-center gap-2">🤖 AI-powered Console Dojo</span>
                </div>
            </div>

            <section id="features" className="max-w-7xl mx-auto px-6 py-24 relative z-10">
                <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Autonomous Path Matrix",
                            desc: "Adaptive educational graphs that react dynamically to your quiz resolutions, spaced reviews, and custom workspace logs.",
                            icon: "⚡",
                            color: "glow-primary border-[var(--color-primary)]/10"
                        },
                        {
                            title: "Interactive AI Guide",
                            desc: "Contextual dual-pane tutoring showing side-by-side explanations, real-time audio voice guidance, and custom quiz cycles.",
                            icon: "🧠",
                            color: "hover:border-[var(--color-accent)]/20 hover:shadow-[0_0_20px_rgba(236,72,153,0.1)]"
                        },
                        {
                            title: "Monaco Console Dojo",
                            desc: "Integrated code editor with interactive playground inputs, direct node evaluations, and instant feedback indicators.",
                            icon: "🏆",
                            color: "hover:border-[var(--color-cyan)]/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                        }
                    ].map((feature, i) => (
                        <BentoCard key={i} size="medium" className={cn("flex flex-col justify-center border-white/5 bg-gradient-to-br from-[var(--surface-raised)] to-transparent rounded-2xl", feature.color)}>
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-6 shadow-md">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 tracking-tight text-white font-display">
                                {feature.title}
                            </h3>
                            <p className="text-[var(--fg-secondary)] leading-relaxed text-sm font-medium">
                                {feature.desc}
                            </p>
                        </BentoCard>
                    ))}
                </BentoGrid>
            </section>

            <footer className="py-16 px-6 border-t border-white/5 bg-black/50 relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                            <AxiomLogo className="w-5 h-5" />
                        </div>
                        <span className="font-extrabold text-xl tracking-tight text-white font-display">AXIOM</span>
                    </div>
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-[var(--fg-secondary)]">
                        © 2026 Axiom Reconstruct
                    </div>
                    <div className="flex gap-8 text-xs font-black uppercase tracking-[0.15em] text-[var(--fg-secondary)]">
                        <Link href="https://github.com/Nashid-k" className="hover:text-[var(--color-cyan)] transition-colors">GitHub</Link>
                        <Link href="#" className="hover:text-[var(--color-cyan)] transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-[var(--color-cyan)] transition-colors">Terms</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

