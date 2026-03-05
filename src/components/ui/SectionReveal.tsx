'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { springs } from '@/lib/motion/motion-config';

interface SectionRevealProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export default function SectionReveal({ children, delay = 0, className = "" }: SectionRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            ref={ref}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={{
                initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
                animate: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        ...(shouldReduceMotion ? { duration: 0.01 } : springs.butter),
                        delay: delay
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
