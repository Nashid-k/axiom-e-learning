import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db/mongodb-client";
import { connectToDatabase } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models";
import { authConfig } from "@/lib/config/auth.config";
import { Logger } from "@/lib/api/logger";

let adapter: ReturnType<typeof MongoDBAdapter>;
try {
    adapter = MongoDBAdapter(clientPromise);
} catch (e) {
    Logger.error("[Auth] CRITICAL: MongoDB adapter init failed. Authentication will fail.", { requestId: 'auth-init' }, e as Error);
    throw new Error("Failed to initialize MongoDB adapter for authentication.");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    debug: false,
    adapter,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: "openid email profile",
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
            profile: async (_profile) => {
                return {
                    id: _profile.sub,
                    name: _profile.name,
                    email: _profile.email,
                    image: _profile.picture,
                };
            }
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    callbacks: {
        ...authConfig.callbacks,
        async signIn() {
            return true;
        },
        async jwt({ token, user, account, trigger, session }) {
            if (trigger === 'update' && session) {
                if (session.user?.name) token.name = session.user.name;
                if (session.user?.image) token.picture = session.user.image;
            }

            if (user) {
                token.id = user.id;
            }
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
            }
            if (account?.provider === "google" && user?.email) {
                try {
                    await connectToDatabase();
                    const now = new Date();
                    const lowerEmail = user.email.toLowerCase();

                    const existingUser = await User.findOneAndUpdate(
                        { email: lowerEmail },
                        {
                            $set: {
                                lastLogin: now,
                                name: user.name || "User",
                                authProvider: account.provider,
                            },
                            $setOnInsert: {
                                image: user.image?.includes('googleusercontent.com') ? user.image : "/avatars/default.png",
                                termsAccepted: true,
                                termsAcceptedAt: now,
                            }
                        },
                        { upsert: true, new: true, runValidators: true }
                    );

                    const validAvatars = [
                        '/avatars/boy-1.png', '/avatars/boy-2.png', '/avatars/boy-3.png', '/avatars/boy-4.png', '/avatars/boy-5.png',
                        '/avatars/girl-1.png', '/avatars/girl-2.png', '/avatars/girl-3.png', '/avatars/girl-4.png', '/avatars/girl-5.png',
                        '/avatars/default.png'
                    ];
                    const currentImage = existingUser?.image;
                    const isValidAvatar = currentImage && validAvatars.includes(currentImage);
                    const isGoogleAvatar = currentImage?.includes('googleusercontent.com');

                    if (!isValidAvatar && !isGoogleAvatar && currentImage) {
                        await User.updateOne(
                            { email: lowerEmail },
                            { $set: { image: "/avatars/default.png" } }
                        );
                    }

                } catch (dbError: unknown) {
                    Logger.error("[Auth] CRITICAL DATABASE ERROR DURING SYNC", {
                        requestId: 'auth-sync',
                        email: user.email,
                    }, dbError as Error);
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.id) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    trustHost: true,
});
