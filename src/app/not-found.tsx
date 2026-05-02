'use client';

import Link from 'next/link';
import { AxiomLogo } from '@/components/ui/AxiomLogo';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center bg-white dark:bg-black text-black dark:text-white">
            <AxiomLogo className="w-16 h-16 mx-auto mb-8" />
            
            <h1 className="text-6xl font-bold tracking-tight mb-2">
                404
            </h1>

            <h2 className="text-xl font-bold mb-4 uppercase tracking-widest text-neutral-400">
                Path Not Found
            </h2>

            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-10 leading-relaxed">
                The coordinates you followed lead to a void in the curriculum. 
                The path may have ascended, or it was never paved.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/paths">
                    <Button>Return to Paths</Button>
                </Link>
                <Link href="/">
                    <Button variant="outline">Back to Home</Button>
                </Link>
            </div>
        </div>
    );
}
