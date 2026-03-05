import React from 'react';
import { motion } from 'framer-motion';
import { getHashiraInfo } from '@/lib/motion/world-theme';
import { TechIcon } from '@/components/ui/TechIcon';

interface CategoryIconProps {
    category: string;
    className?: string;
}

export const CategoryIcon = ({ category, className = "w-12 h-12" }: CategoryIconProps) => {
    const c = category.toLowerCase();

    const getShadowClass = () => {
        const info = getHashiraInfo(c);
        if (info.color.includes('cyan')) return 'group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]';
        if (info.color.includes('red')) return 'group-hover:drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]';
        if (info.color.includes('yellow')) return 'group-hover:drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]';
        if (info.color.includes('emerald') || info.color.includes('green')) return 'group-hover:drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]';
        if (info.color.includes('teal')) return 'group-hover:drop-shadow-[0_0_15px_rgba(45,212,191,0.8)]';
        if (info.color.includes('blue') || info.color.includes('fuchsia')) return 'group-hover:drop-shadow-[0_0_15px_rgba(192,132,252,0.8)]';
        if (info.color.includes('stone') || info.color.includes('gray')) return 'group-hover:drop-shadow-[0_0_15px_rgba(168,162,158,0.8)]';
        if (info.color.includes('blue') || info.color.includes('sky')) return 'group-hover:drop-shadow-[0_0_15px_rgba(96,165,250,0.8)]';
        if (info.color.includes('pink') || info.color.includes('rose')) return 'group-hover:drop-shadow-[0_0_15px_rgba(251,113,133,0.8)]';
        if (info.color.includes('orange')) return 'group-hover:drop-shadow-[0_0_15px_rgba(251,146,60,0.8)]';

        return 'group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]';
    };

    return (
        <motion.div
            whileHover={{ scale: 1.2, transition: { type: "spring", stiffness: 300, damping: 15 } }}
            className={`relative group ${className} flex items-center justify-center`}
        >
            {}
            <div className={`absolute inset-0 rounded-full bg-current opacity-0 blur-xl scale-50 group-hover:opacity-40 group-hover:scale-150 transition-all duration-500 pointer-events-none ${getHashiraInfo(c).color}`} />

            {}
            <div className={`relative z-10 w-full h-full transition-all duration-300 transform group-hover:scale-110 ${getShadowClass()} ${getHashiraInfo(c).color}`}>
                <TechIcon name={c} className="w-full h-full" />
            </div>
        </motion.div>
    );
};
