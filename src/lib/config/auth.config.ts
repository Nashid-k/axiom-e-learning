
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
        error: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            const isStrictlyProtected =
                nextUrl.pathname.startsWith('/paths') ||
                nextUrl.pathname.startsWith('/learn') ||
                nextUrl.pathname.startsWith('/profile') ||
                nextUrl.pathname.startsWith('/settings');

            if (isStrictlyProtected) {
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn && nextUrl.pathname === '/') {
                return Response.redirect(new URL('/paths', nextUrl));
            }

            return true;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return `${baseUrl}/paths`;
        },
    },
    providers: [], 
} satisfies NextAuthConfig;
