'use strict';
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/AuthContext';

const PROTECTED_PATTERNS = [
    /^\/paths/,    
    /^\/learn/,    
    /^\/profile/,
    /^\/settings/
];

export default function RouteGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (loading) return;

        const isProtected = PROTECTED_PATTERNS.some(pattern => pattern.test(pathname));

        if (isProtected && !user) {
            const loginUrl = new URL('/login', window.location.href);
            loginUrl.searchParams.set('callbackUrl', pathname);
            router.replace(loginUrl.toString());
        }
    }, [user, loading, pathname, router]);

    const isProtected = PROTECTED_PATTERNS.some(pattern => pattern.test(pathname));
    if (loading && isProtected) {
        return null; 
    }

    return <>{children}</>;
}
