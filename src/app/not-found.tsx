'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AxiomLogo } from '@/components/ui/AxiomLogo';
import { Button } from '@/components/ui/Button';
import { springs } from '@/lib/motion/motion-config';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-[var(--space-2)]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-500)]/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={springs.responsive}
                className="relative z-10 text-center max-w-lg"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ ...springs.responsive, delay: 0.2 }}
                    className="mb-[var(--space-3)]"
                >
                    <AxiomLogo className="w-20 h-20 mx-auto text-[var(--fg-primary)]" variant="gradient" />
                </motion.div>

                <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-[var(--fg-primary)] mb-[var(--space-1)]">
                    404
                </h1>

                <h2 className="text-[var(--text-heading)] font-[var(--font-weight-semibold)] text-[var(--fg-primary)] mb-[var(--space-2)] tracking-tight">
                    Path not found.
                </h2>

                <p className="text-[var(--fg-secondary)] text-[var(--text-body)] mb-[var(--space-5)] leading-[var(--leading-relaxed)]">
                    The coordinates you followed lead to a void in the curriculum.
                    It may have ascended, or the path was never paved.
                </p>

                <div className="flex flex-col sm:flex-row gap-[var(--space-2)] justify-center">
                    <Link href="/paths">
                        <Button size="lg" className="w-full sm:w-auto">
                            Return to Flow
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                            Back to Landing
                        </Button>
                    </Link>
                </div>
            </motion.div>
            <div
                className="fixed inset-0 pointer-events-none z-[-1] opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, var(--border-default) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}
            />
        </div>
    );
}
