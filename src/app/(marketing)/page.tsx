'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/features/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { springs, fadeInUp } from '@/lib/motion/motion-config';

import BentoCard from '@/components/ui/BentoCard';
import { Button } from '@/components/ui/Button';
import { AxiomLogo } from '@/components/ui/AxiomLogo';
import { TechIcon } from '@/components/ui/TechIcon';

import { LandingHero } from '@/features/landing/components/LandingHero';
import { AxiomWorkspacePreview } from '@/features/landing/components/AxiomWorkspacePreview';

const TECH_STACK = ['javascript', 'typescript', 'python', 'react', 'nextjs', 'nodejs', 'nestjs', 'mongodb', 'sql', 'git', 'html', 'css'];

export default function LandingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (!loading && user) {
            router.replace('/paths');
        }
    }, [user, loading, router]);

    if (user) return null;

    return (
        <div className="min-h-screen bg-[var(--color-950)] text-white font-sans overflow-x-hidden relative selection:bg-[var(--color-500)]/30">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.12] bg-repeat bg-[length:50px_50px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--color-500)/0.06,transparent_60%)]" />
            </div>

            <LandingHero />
            <section className="py-[var(--space-5)] border-y border-white/5 bg-[var(--color-950)]/50 backdrop-blur-[2px] relative z-10 overflow-hidden">
                <div className="max-w-[100vw] relative">
                    <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[var(--color-950)] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[var(--color-950)] to-transparent z-10 pointer-events-none" />
                    <div className="flex select-none">
                        <MarqueeTrack items={TECH_STACK} />
                        <MarqueeTrack items={TECH_STACK} />
                    </div>
                </div>
            </section>

            <AxiomWorkspacePreview />
            <section id="features" className="py-[var(--space-9)] md:py-[var(--space-9)] px-[var(--space-2)] md:px-[var(--space-3)] relative z-10">
                <div className="max-w-[1400px] mx-auto">
                    <div className="mb-[var(--space-5)] text-center max-w-2xl mx-auto">
                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
                            transition={shouldReduceMotion ? { duration: 0.01 } : springs.butter}
                            className="inline-flex items-center gap-[var(--space-1)] px-[var(--space-1)] py-1 rounded-[var(--radius-full)] bg-[var(--color-500)]/10 border border-[var(--color-500)]/20 text-[var(--color-300)] text-[0.625rem] font-black uppercase tracking-[0.2em] mb-[var(--space-2)] shadow-[0_0_20px_var(--color-500)/0.15]"
                        >
                            Performance Infrastructure
                        </motion.div>
                        <motion.h2
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={shouldReduceMotion ? { duration: 0.01 } : springs.butter}
                            className="text-[var(--text-heading)] md:text-[var(--text-display)] font-black tracking-[var(--tracking-tight)] text-white mb-[var(--space-2)] leading-[var(--leading-tight)]"
                        >
                            Architected for <br /> extreme scale.
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={shouldReduceMotion ? false : "hidden"}
                        whileInView={shouldReduceMotion ? undefined : "visible"}
                        viewport={{ once: true, margin: "-100px" }}
                        variants={shouldReduceMotion ? undefined : {
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-3)] auto-rows-auto md:auto-rows-[450px]"
                    >
                        <motion.div variants={shouldReduceMotion ? undefined : fadeInUp} className="md:col-span-2 row-span-1 h-full">
                            <BentoCard size="medium" variant="feature" className="flex flex-col md:flex-row items-center justify-between h-full relative overflow-hidden !bg-[var(--color-950)] !border-white/5 shadow-none hover:shadow-2xl">
                                <div className="max-w-md relative z-10 order-2 md:order-1 mt-[var(--space-2)] md:mt-0 flex-1">
                                    <div className="flex gap-[var(--space-1)] mb-[var(--space-2)]">
                                        <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--color-destruct)]/10 text-[var(--color-destruct)] flex items-center justify-center border border-[var(--color-destruct)]/15">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" /></svg>
                                        </div>
                                    </div>
                                    <h3 className="text-[var(--text-heading)] font-bold text-white mb-[var(--space-1)] tracking-[var(--tracking-tight)]">Memory-Safe Performance.</h3>
                                    <p className="text-[var(--fg-muted)] leading-[var(--leading-relaxed)]">
                                        Database hydration opt-outs and context memoization. Native .lean() queries for sub-10ms response times.
                                    </p>
                                </div>
                                <div className="order-1 md:order-2 w-full md:w-auto flex justify-center shrink-0">
                                    <div className="relative w-40 h-40 md:w-56 md:h-56">
                                        <div className="absolute inset-0 bg-[var(--color-destruct)]/20 blur-[40px] rounded-full animate-pulse" />
                                        <div className="relative z-10 w-full h-full bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[var(--radius-xl)] backdrop-blur-sm rotate-3 flex items-center justify-center">
                                            <span className="text-6xl">📚</span>
                                        </div>
                                        <div className="absolute -z-10 top-4 right-4 w-full h-full bg-white/5 rounded-[var(--radius-xl)] -rotate-6" />
                                    </div>
                                </div>
                            </BentoCard>
                        </motion.div>
                        <motion.div variants={shouldReduceMotion ? undefined : fadeInUp} className="md:col-span-1 row-span-1 h-full">
                            <BentoCard variant="stat" className="flex flex-col h-full !bg-[var(--color-950)] overflow-hidden group">
                                <div className="p-[var(--space-2)] md:p-[var(--space-3)] flex-1">
                                    <div className="mb-[var(--space-2)] w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--color-ana-blue-500)]/10 text-[var(--color-ana-blue-400)] flex items-center justify-center border border-[var(--color-ana-blue-500)]/15">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                    </div>
                                    <h3 className="text-[var(--text-body)] font-bold text-white mb-[var(--space-1)]">Tree-Shaken UI</h3>
                                    <p className="text-[var(--text-caption)] text-[var(--fg-muted)]">
                                        Pay only for what you render. Dynamic heavy-engine imports (Monaco, Prism, Markdown) defer megabytes until needed.
                                    </p>
                                </div>
                                <div className="mt-auto bg-[var(--surface-overlay)]/20 p-[var(--space-2)] border-t border-white/5 group-hover:bg-[var(--surface-overlay)]/30 transition-colors">
                                    <div className="flex gap-[6px] mb-[var(--space-1)] opacity-50">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-destruct)]/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-warning)]/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-comp-400)]/60" />
                                    </div>
                                    <div className="space-y-[var(--space-1)] font-mono text-[10px] text-[var(--fg-muted)]">
                                        <div className="flex justify-between"><span>Tests passed:</span> <span className="text-[var(--color-comp-400)]">4/4</span></div>
                                        <div className="w-full h-1 bg-[var(--border-default)] rounded-full overflow-hidden">
                                            <motion.div
                                                initial={shouldReduceMotion ? { width: "100%" } : { width: 0 }}
                                                whileInView={shouldReduceMotion ? undefined : { width: "100%" }}
                                                transition={shouldReduceMotion ? { duration: 0.01 } : { delay: 0.5, duration: 1 }}
                                                className="h-full bg-[var(--color-comp-400)]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </BentoCard>
                        </motion.div>
                        <motion.div variants={shouldReduceMotion ? undefined : fadeInUp} className="md:col-span-1 row-span-2 h-full">
                            <BentoCard size="large" variant="default" className="relative h-full flex flex-col !bg-[var(--color-950)] !border-white/5 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-500)]/8 to-transparent pointer-events-none" />
                                <div className="p-[var(--space-3)] relative z-10 flex-1 flex flex-col">
                                    <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--color-500)]/10 text-[var(--color-400)] flex items-center justify-center mb-[var(--space-2)] border border-[var(--color-500)]/15">
                                        <span className="text-2xl">✨</span>
                                    </div>
                                    <h3 className="text-[var(--text-heading)] font-bold text-white mb-[var(--space-1)]">Zero-Lag Maya AI</h3>
                                    <p className="text-[var(--fg-muted)] text-[var(--text-caption)] leading-[var(--leading-relaxed)] mb-[var(--space-2)]">
                                        Instant stream initialization with non-blocking telemetry and fire-and-forget background synchronization.
                                    </p>
                                    <div className="mt-auto space-y-[var(--space-2)]">
                                        <div className="p-[var(--space-1)] bg-white/5 rounded-[var(--radius-lg)] border border-white/5 backdrop-blur-[2px]">
                                            <div className="flex items-center gap-[var(--space-1)] mb-[var(--space-1)]">
                                                <div className="w-6 h-6 rounded-full bg-[var(--color-500)]/20 text-[var(--color-300)] flex items-center justify-center text-[10px] border border-[var(--color-500)]/30">✨</div>
                                                <span className="text-[10px] font-bold text-[var(--color-300)] uppercase tracking-wider">Maya (Tech Lead)</span>
                                            </div>
                                            <p className="text-[11px] text-[var(--fg-secondary)] leading-normal">
                                                &quot;Let&apos;s refactor this loop. It&apos;s <span className="text-[var(--color-comp-400)] font-mono">O(N²)</span> - we can memoize the expensive calculation.&quot;
                                            </p>
                                        </div>
                                        <div className="p-[var(--space-1)] bg-white/5 rounded-[var(--radius-lg)] border border-white/5 backdrop-blur-[2px] opacity-60 scale-95 origin-bottom">
                                            <div className="flex items-center gap-[var(--space-1)] mb-[var(--space-1)]">
                                                <div className="w-6 h-6 rounded-full bg-[var(--color-comp-400)]/20 text-[var(--color-comp-400)] flex items-center justify-center text-[10px] border border-[var(--color-comp-400)]/30">🌿</div>
                                                <span className="text-[10px] font-bold text-[var(--color-comp-400)] uppercase tracking-wider">Maya (Buddy)</span>
                                            </div>
                                            <p className="text-[11px] text-[var(--fg-secondary)] leading-normal">
                                                &quot;Great job! That&apos;s a super clean solution. You&apos;re crushing it! 🚀&quot;
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </BentoCard>
                        </motion.div>
                        <motion.div variants={shouldReduceMotion ? undefined : fadeInUp} className="md:col-span-2 row-span-1 h-full">
                            <BentoCard size="medium" variant="feature" className="flex flex-col md:flex-row items-center justify-between h-full !bg-[var(--color-950)] !border-white/5 relative overflow-hidden group">
                                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[var(--color-comp-400)]/5 to-transparent pointer-events-none" />
                                <div className="max-w-sm mb-[var(--space-3)] md:mb-0 relative z-10 order-2 md:order-1 flex-1">
                                    <div className="flex gap-[var(--space-1)] mb-[var(--space-2)]">
                                        <span className="px-[var(--space-1)] py-[2px] rounded-[var(--radius-sm)] bg-[var(--color-comp-400)]/10 text-[var(--color-comp-400)] text-[10px] font-bold uppercase tracking-wider border border-[var(--color-comp-400)]/15">Global Ranks</span>
                                    </div>
                                    <h3 className="text-[var(--text-body)] font-bold text-white mb-[var(--space-1)]">Next-Gen Fetching.</h3>
                                    <p className="text-[var(--fg-muted)] text-[var(--text-caption)] md:text-[var(--text-body)]">
                                        Network deflation: Lazy hydration pulls massive study guides only when requested, saving ~95% data bloat.
                                    </p>
                                </div>
                                <div className="order-1 md:order-2 w-full md:w-auto relative z-10 flex items-end justify-center gap-[var(--space-2)] shrink-0">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 border-2 border-slate-200 shadow-lg mb-[var(--space-1)] overflow-hidden">
                                            <Image src="/avatars/girl-2.png" width={40} height={40} className="w-full h-full object-cover" alt="2nd place" />
                                        </div>
                                        <div className="w-12 h-16 bg-gradient-to-t from-slate-800 to-slate-700 rounded-t-lg border border-slate-600/50 flex flex-col items-center justify-end pb-[var(--space-1)]">
                                            <span className="text-2xl font-black text-slate-500 opacity-50">2</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="absolute -top-6 text-2xl animate-bounce">👑</div>
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 border-2 border-yellow-200 shadow-[0_0_30px_var(--color-comp-400)/0.4] mb-[var(--space-1)] ring-4 ring-[var(--color-comp-400)]/20 overflow-hidden">
                                            <Image src="/avatars/boy-1.png" width={56} height={56} className="w-full h-full object-cover" alt="1st place" />
                                        </div>
                                        <div className="w-16 h-24 bg-gradient-to-t from-yellow-900/80 to-yellow-600/20 rounded-t-lg border border-yellow-500/50 flex flex-col items-center justify-end pb-[var(--space-1)] backdrop-blur-md">
                                            <span className="text-3xl font-black text-[var(--color-comp-400)]">1</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 border-2 border-orange-200 shadow-lg mb-[var(--space-1)] overflow-hidden">
                                            <Image src="/avatars/girl-3.png" width={40} height={40} className="w-full h-full object-cover" alt="3rd place" />
                                        </div>
                                        <div className="w-12 h-12 bg-gradient-to-t from-orange-900/80 to-orange-700/20 rounded-t-lg border border-orange-600/50 flex flex-col items-center justify-end pb-[var(--space-1)]">
                                            <span className="text-xl font-black text-orange-500 opacity-60">3</span>
                                        </div>
                                    </div>
                                </div>
                            </BentoCard>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            <section className="py-[var(--space-9)] px-[var(--space-2)] md:px-[var(--space-3)] relative z-10 overflow-hidden">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-[var(--space-7)]">
                        <div className="flex-1 space-y-[var(--space-3)]">
                            <motion.div
                                initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                                whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                                transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.4, ease: "easeOut" }}
                                className="inline-flex items-center gap-[var(--space-1)] px-[var(--space-1)] py-1 rounded-[var(--radius-full)] bg-[var(--color-comp-400)]/10 border border-[var(--color-comp-400)]/20 text-[var(--color-comp-400)] text-[10px] font-black uppercase tracking-[0.2em]"
                            >
                                The Simulation
                            </motion.div>
                            <h2 className="text-[var(--text-heading)] md:text-[var(--text-display)] font-black tracking-[var(--tracking-tight)] text-white leading-[var(--leading-tight)]">
                                From coding <br /> to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-comp-400)] to-[var(--color-ana-blue-500)]">Mastery.</span>
                            </h2>
                            <p className="text-[var(--fg-muted)] font-medium leading-[var(--leading-relaxed)] max-w-lg">
                                Maya doesn&apos;t just watch your code. She watches your impact. Track your architectural precision, algorithmic efficiency, and system stability in real-time.
                            </p>

                            <div className="grid grid-cols-2 gap-[var(--space-2)] pt-[var(--space-2)]">
                                {[
                                    { label: 'Payload Deflation', value: '-95%', color: 'from-[var(--color-ana-blue-500)] to-[var(--color-ana-blue-400)]' },
                                    { label: 'Hydration Speed', value: 'Instant', color: 'from-[var(--color-ana-blue-500)] to-[var(--color-ana-blue-400)]' },
                                    { label: 'Bundle Efficiency', value: 'Elite', color: 'from-[var(--color-comp-500)] to-[var(--color-comp-400)]' },
                                    { label: 'Memory Safety', value: 'Guaranteed', color: 'from-[var(--color-500)] to-[var(--color-400)]' }
                                ].map((stat, i) => (
                                    <div key={i} className="p-[var(--space-2)] rounded-[var(--radius-xl)] glass-card border border-white/5 space-y-[4px]">
                                        <div className="text-[10px] font-bold text-[var(--fg-muted)] uppercase tracking-widest">{stat.label}</div>
                                        <div className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 w-full relative">
                            <div className="relative aspect-square w-full max-w-lg mx-auto p-[var(--space-3)] glass-card rounded-[var(--radius-2xl)] border-white/10 shadow-[0_0_80px_var(--color-500)/0.08]">
                                <div className="absolute inset-0 bg-[var(--color-500)]/5 blur-2xl rounded-full animate-pulse" />
                                <div className="relative h-full w-full flex items-center justify-center">
                                    <motion.div
                                        animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
                                        transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 border-2 border-dashed border-white/5 rounded-full"
                                    />
                                    <motion.div
                                        animate={shouldReduceMotion ? { rotate: 0 } : { rotate: -360 }}
                                        transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 30, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-10 border border-[var(--border-default)] rounded-full"
                                    />
                                    <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-[var(--color-500)] to-[var(--color-ana-blue-500)] flex items-center justify-center shadow-[0_0_40px_var(--color-500)/0.35]">
                                        <span className="text-4xl">👑</span>
                                        <motion.div
                                            animate={shouldReduceMotion ? { scale: 1 } : { scale: [1, 1.15, 1] }}
                                            transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 4, repeat: Infinity }}
                                            className="absolute inset-0 rounded-full bg-white/15 blur-lg"
                                        />
                                    </div>
                                    {[0, 72, 144, 216, 288].map((deg, i) => (
                                        <motion.div key={i} style={{ rotate: deg, originY: '180px' }} className="absolute top-0 left-1/2 -translate-x-1/2">
                                            <div className="w-4 h-4 rounded-full bg-[var(--color-300)] shadow-[0_0_15px_var(--color-300)/0.5]" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-[var(--space-9)] px-[var(--space-3)] relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={shouldReduceMotion ? { duration: 0.01 } : springs.responsive}
                    >
                        <h2 className="text-[var(--text-heading)] md:text-[var(--text-display)] font-black mb-[var(--space-3)] tracking-[var(--tracking-tight)] text-white">
                            Ready to ascend?
                        </h2>
                        <p className="text-[var(--fg-muted)] mb-[var(--space-5)] max-w-2xl mx-auto font-medium leading-[var(--leading-relaxed)]">
                            Join thousands of developers mastering their craft on Axiom today.
                        </p>
                        <Link href="/login">
                            <Button size="lg" className="px-[var(--space-5)] py-[var(--space-3)] text-xl font-bold shadow-[0_0_50px_var(--color-500)/0.3] hover:scale-105 transition-transform duration-[var(--duration-base)] cursor-pointer">
                                Get Started
                            </Button>
                        </Link>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-[var(--color-500)]/10 blur-[90px] rounded-full pointer-events-none" />
            </section>
            <footer className="py-[var(--space-4)] border-t border-white/5 bg-[var(--color-950)] relative z-10 text-center md:text-left">
                <div className="max-w-7xl mx-auto px-[var(--space-3)] flex flex-col md:flex-row justify-between items-center gap-[var(--space-3)]">
                    <div className="flex items-center gap-[var(--space-1)] opacity-50 grayscale hover:grayscale-0 transition-all duration-[var(--duration-slow)]">
                        <AxiomLogo className="w-6 h-6" />
                        <span className="text-[var(--text-caption)] font-bold tracking-widest uppercase">Axiom</span>
                    </div>
                    <div className="flex gap-[var(--space-3)] text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                        <Link href="#" className="hover:text-white transition-colors duration-[var(--duration-base)]">Twitter</Link>
                        <Link href="#" className="hover:text-white transition-colors duration-[var(--duration-base)]">GitHub</Link>
                        <Link href="#" className="hover:text-white transition-colors duration-[var(--duration-base)]">Discord</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function MarqueeTrack({ items }: { items: string[] }) {
    const shouldReduceMotion = useReducedMotion();
    return (
        <div className={`flex gap-[var(--space-7)] pr-[var(--space-7)] shrink-0 ${shouldReduceMotion ? '' : 'animate-marquee'}`}>
            {items.map((tech, i) => <TechItem key={i} tech={tech} />)}
        </div>
    );
}

function TechItem({ tech }: { tech: string }) {
    return (
        <div className="flex items-center gap-[var(--space-1)] text-[var(--fg-muted)] opacity-40 hover:opacity-100 transition-opacity cursor-default group">
            <div className="w-8 h-8 md:w-10 md:h-10 grayscale group-hover:grayscale-0 transition-all duration-[var(--duration-slow)] transform group-hover:scale-110 will-change-transform">
                <TechIcon name={tech} className="w-full h-full" />
            </div>
            <span className="text-[var(--text-caption)] md:text-[var(--text-body)] font-bold uppercase tracking-widest hidden md:block">{tech}</span>
        </div>
    );
}
