import NextAuth from "next-auth";
import { authConfig } from "@/lib/config/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {

    const protectedRoutes = ['/paths', '/learn', '/profile', '/settings'];
    const { pathname } = req.nextUrl;

    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

    if (isProtected && !req.auth) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
