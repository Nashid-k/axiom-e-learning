import { Variants, useReducedMotion } from 'framer-motion';

export const springs = {
    gentle: { type: 'spring' as const, stiffness: 150, damping: 16 },
    smooth: { type: 'spring' as const, stiffness: 200, damping: 20 },

    butter: { type: 'spring' as const, stiffness: 250, damping: 24, mass: 0.6 },
    punchy: { type: 'spring' as const, stiffness: 350, damping: 20, mass: 0.5 },
    responsive: { type: 'spring' as const, stiffness: 450, damping: 30, mass: 0.8 },
    bounce: { type: 'spring' as const, stiffness: 300, damping: 15 },
    snap: { type: 'spring' as const, stiffness: 500, damping: 30 },
    elastic: { type: 'spring' as const, stiffness: 250, damping: 12, mass: 0.5 },
} as const;

export const transitions = {
    fast: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    smooth: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
    slow: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    slowest: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
} as const;

export const staggerContainer: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.035,
            delayChildren: 0,
        }
    }
};

export const fadeInUp: Variants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.95
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: springs.butter
    }
};

export const fadeInLeft: Variants = {
    initial: { opacity: 0, x: -30 },
    animate: {
        opacity: 1,
        x: 0,
        transition: springs.smooth
    }
};

export const fadeInRight: Variants = {
    initial: { opacity: 0, x: 30 },
    animate: {
        opacity: 1,
        x: 0,
        transition: springs.smooth
    }
};

export const scaleIn: Variants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: springs.butter
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: transitions.fast
    }
};

export const hoverScale = {
    scale: 1.02,
    transition: springs.snap
};

export const hoverLift = {
    y: -4,
    scale: 1.01,
    transition: springs.elastic
};

export const tapScale = {
    scale: 0.98,
    transition: springs.snap
};

export const pageTransition: Variants = {
    initial: {
        opacity: 0,
        y: 16,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            ...springs.butter,
        },
    },
    exit: {
        opacity: 0,
        y: -8,
        transition: transitions.fast,
    },
};

export const sectionReveal: Variants = {
    initial: {
        opacity: 0,
        y: 24,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            ...springs.butter,
        },
    },
};

export const modalBackdrop: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: transitions.smooth,
    },
    exit: {
        opacity: 0,
        transition: transitions.fast,
    },
};

export const modalContent: Variants = {
    initial: {
        opacity: 0,
        scale: 0.96,
        y: 8,
    },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            ...springs.butter,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.98,
        y: 4,
        transition: transitions.fast,
    },
};

export const buttonVariants: Variants = {
    initial: { opacity: 1, scale: 1 },
    hover: {
        scale: 1.02,
        y: -1,
        transition: springs.snap,
    },
    tap: {
        scale: 0.97,
        y: 0,
        transition: springs.snap,
    },
    disabled: {
        opacity: 0.6,
        scale: 1,
    },
};

export const gpuAccelerated = {
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden' as const,
};

export const useMotionPreferences = () => {
    const shouldReduceMotion = useReducedMotion();
    return {
        ...springs,
        transition: shouldReduceMotion ? { duration: 0.01 } : springs.butter,
    };
};
