import { motion, useReducedMotion } from 'framer-motion';
import { AxiomLogo } from '@/components/ui/AxiomLogo';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CyclingTypewriter } from '@/components/ui/CyclingTypewriter';
import { cn } from '@/lib/utils';
import Magnetic from '@/components/ui/Magnetic';

const messages = [
    "Zero-latency Next.js architecture with Edge-optimized bundles.",
    "Memory-safe AI Mentor with instant initialization.",
    "No render-thrashing: Pure memoized React performance.",
    "Extreme 95% API payload deflation via lazy hydration.",
    "Deeply tree-shaken UI: Pay only for what you render.",
    "Stop tutorial hell. Start building production-ready software."
];

export function LandingHero() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="relative pt-[7rem] md:pt-[8rem] pb-[8rem] md:pb-[10rem] px-[var(--space-3)] max-w-[1400px] mx-auto text-center flex flex-col items-center z-10 overflow-hidden perspective-1000">

            <div className="absolute inset-0 pointer-events-none select-none z-0">
                <div
                    className={cn(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[560px] rounded-full blur-[70px] opacity-50",
                        "bg-[var(--color-500)]/12",
                        !shouldReduceMotion && "animate-pulse"
                    )}
                    style={{ willChange: 'opacity, transform' }}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)]" />
            </div>

            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mb-[var(--space-3)] md:mb-[var(--space-4)] relative z-10"
                whileHover={shouldReduceMotion ? {} : { rotate: [0, -5, 5, 0], scale: 1.05 }}
            >
                <div className={cn("absolute inset-0 bg-[var(--color-500)]/15 blur-xl rounded-full opacity-0", !shouldReduceMotion && "animate-[fadeIn_1s_1s_ease_forwards]")} />
                <AxiomLogo
                    className="w-24 h-24 md:w-28 md:h-28 mx-auto mb-[var(--space-3)] text-white relative z-10 drop-shadow-[0_0_12px_var(--color-500)/0.45]"
                    variant="gradient"
                />
            </motion.div>

            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0.01 } : { delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 max-w-5xl mx-auto"
            >
                <h1 className="text-5xl md:text-8xl font-black tracking-[-0.03em] text-white mb-[var(--space-2)] leading-[0.95] drop-shadow-sm">
                    Master your <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-300)] via-white to-[var(--color-400)] pb-2">
                        craft with Axiom.
                    </span>
                </h1>
            </motion.div>

            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0.01 } : { delay: 0.2, duration: 0.6 }}
                className="text-xl md:text-2xl max-w-3xl mx-auto leading-[var(--leading-relaxed)] mb-[var(--space-4)] md:mb-[var(--space-5)] tracking-[var(--tracking-tight)] relative z-10 font-[var(--font-weight-semibold)] min-h-[3.5rem] md:min-h-0"
            >
                <CyclingTypewriter
                    messages={messages}
                    className={cn(
                        "text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-300)] via-[var(--color-ana-blue-300)] to-[var(--color-comp-400)]",
                        !shouldReduceMotion && "animate-gradient-x background-animate"
                    )}
                />
            </motion.div>

            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0.01 } : { delay: 0.3, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-[var(--space-2)] w-full justify-center max-w-sm mx-auto relative z-10"
            >
                <Link href="/login" className="w-full">
                    <Magnetic>
                        <Button
                            size="lg"
                            className="w-full h-14 md:h-16 text-lg md:text-xl font-[var(--font-weight-bold)] shadow-[0_0_24px_var(--color-500)/0.25]"
                        >
                            Start Learning
                        </Button>
                    </Magnetic>
                </Link>
            </motion.div>
        </section>
    );
}