'use client';

import Link from 'next/link';
import { useAuth } from '@/features/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { AxiomLogo } from '@/components/ui/AxiomLogo';
import SectionReveal from '@/components/ui/SectionReveal';
import { motion } from 'framer-motion';

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
        <div className="min-h-screen relative overflow-hidden selection:bg-brand/30">
            <Header />

            {/* Background Orbs */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand/20 blur-[120px] rounded-full -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full -z-10" />

            <main className="max-w-6xl mx-auto px-6 pt-44 pb-32 text-center relative z-10">
                <SectionReveal>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-block px-4 py-1.5 mb-6 glass-card rounded-full text-xs font-bold tracking-widest text-brand uppercase"
                    >
                        The Future of Engineering Education
                    </motion.div>
                </SectionReveal>

                <SectionReveal delay={0.1}>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                        Master your craft <br />
                        <span className="text-gradient">with intelligence.</span>
                    </h1>
                </SectionReveal>
                
                <SectionReveal delay={0.2}>
                    <p className="text-xl text-fg-secondary mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                        Personalized curricula, real-world projects, and AI mentorship 
                        built for the next generation of software engineers.
                    </p>
                </SectionReveal>

                <SectionReveal delay={0.3}>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/login">
                            <Button size="lg" className="px-10 py-5 text-lg rounded-2xl">
                                Start Learning
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button variant="outline" size="lg" className="px-10 py-5 text-lg rounded-2xl">
                                Explore Paths
                            </Button>
                        </Link>
                    </div>
                </SectionReveal>
            </main>

            <section id="features" className="max-w-7xl mx-auto px-6 py-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Autonomous Path",
                            desc: "Adaptive learning algorithms that evolve with your progress and weaknesses.",
                            icon: "⚡"
                        },
                        {
                            title: "AI Neural Mentor",
                            desc: "Context-aware AI that doesn't just give answers, but teaches you how to think.",
                            icon: "🧠"
                        },
                        {
                            title: "Proof of Mastery",
                            desc: "Build real projects and verify your skills with deep concept tracking.",
                            icon: "🏆"
                        }
                    ].map((feature, i) => (
                        <SectionReveal key={i} delay={0.2 + i * 0.1}>
                            <div className="glass-card p-10 rounded-3xl glow-hover transition-all duration-500 group">
                                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-extrabold mb-4 tracking-tight group-hover:text-brand transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-fg-secondary leading-relaxed font-medium">
                                    {feature.desc}
                                </p>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </section>

            <footer className="py-20 px-6 border-t border-surface-border">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <AxiomLogo className="w-6 h-6" />
                        <span className="font-black text-xl tracking-tighter">AXIOM</span>
                    </div>
                    <div className="text-sm font-bold text-fg-muted uppercase tracking-widest">
                        © 2026 Designed for Excellence
                    </div>
                    <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-fg-secondary">
                        <Link href="https://github.com/Nashid-k" className="hover:text-brand transition-colors">GitHub</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
