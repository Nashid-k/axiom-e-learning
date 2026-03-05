'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const SearchCommand = dynamic(() => import('@/features/search/components/SearchCommand'), { ssr: false });

const OPEN_EVENT = 'axiom:open-search';
const CLOSE_EVENT = 'axiom:close-search';

export default function GlobalSearch() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
        };

        const open = () => setIsOpen(true);
        const close = () => setIsOpen(false);

        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener(OPEN_EVENT, open as EventListener);
        window.addEventListener(CLOSE_EVENT, close as EventListener);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener(OPEN_EVENT, open as EventListener);
            window.removeEventListener(CLOSE_EVENT, close as EventListener);
        };
    }, []);

    return <SearchCommand isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
