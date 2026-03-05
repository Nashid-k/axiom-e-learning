"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: {
        id?: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    } | null;
    loading: boolean;
    logout: () => Promise<void>;
    googleLogin: () => Promise<void>;
    error: string | null;
    setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => { },
    googleLogin: async () => { },
    error: null,
    setError: () => { },
});

function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const loading = status === "loading";

    const user = session?.user ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
    } : null;

    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key === 'axiom-logout-sync') {
                window.location.href = '/';
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const googleLogin = async () => {
        setError(null);
        try {
            const params = new URLSearchParams(window.location.search);
            const callbackUrl = params.get('callbackUrl') || "/paths";

            const result = await signIn("google", { callbackUrl, redirect: false });
            if (result?.error) {
                setError(result.error === "Signin" ? "Login cancelled or failed." : result.error);
            } else if (result?.url) {
                router.push(result.url);
            }
        } catch (err: unknown) {
            console.error("Google Login Error:", err);
            setError("A spiritual disturbance blocked your login.");
        }
    };

    const logout = async () => {
        try {
            localStorage.setItem('axiom-logout-sync', Date.now().toString());
            await signOut({ callbackUrl: "/" });
        } catch (err) {
            console.error("Logout Error:", err);
            setError("Failed to break the connection.");
        }
    };

    const contextValue = React.useMemo(() => ({
        user,
        loading,
        logout,
        googleLogin,
        error,
        setError
    }), [
        user?.id, user?.name, user?.email, user?.image,
        loading,
        error
    ]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <AuthContextProvider>{children}</AuthContextProvider>
        </SessionProvider>
    );
};

export const useAuth = () => useContext(AuthContext);
