'use client';

import Image from 'next/image';

export const AxiomLogo = ({ className = "w-10 h-10" }: { className?: string, variant?: 'default' | 'gradient' | 'minimal' }) => {
    return (
        <div className={`relative flex items-center justify-center shrink-0 ${className} select-none`}>
            { }
            <Image
                src="/favicon.svg"
                alt="Axiom Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
            />
        </div>
    );
}
