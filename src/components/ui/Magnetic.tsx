'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Magnetic({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const shouldReduceMotion = useReducedMotion();

    const handleMouse = (e: React.MouseEvent) => {
        if (shouldReduceMotion) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.div
            style={{ position: "relative" }}
            ref={ref}
            onMouseMove={shouldReduceMotion ? undefined : handleMouse}
            onMouseLeave={shouldReduceMotion ? undefined : reset}
            animate={shouldReduceMotion ? { x: 0, y: 0 } : { x, y }}
            transition={shouldReduceMotion ? { duration: 0.01 } : { type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
}
