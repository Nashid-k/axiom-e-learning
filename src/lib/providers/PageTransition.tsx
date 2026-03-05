'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { springs } from '@/lib/motion/motion-config';

interface PageTransitionProps {
    children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();
    const shouldReduceMotion = useReducedMotion();

    return (
        <AnimatePresence mode="sync">
            <motion.div
                key={pathname}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.15, ease: 'easeOut' }}
                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                className="w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
