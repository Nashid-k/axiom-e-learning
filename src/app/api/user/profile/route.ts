import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db/mongodb";
import { User, LeaderboardEntry } from "@/lib/db/models";
import { secureErrorResponse, secureSuccessResponse, rateLimit } from "@/lib/utils/security";
import { withApiVitals } from '@/lib/monitoring/api-vitals';

async function POSTHandler(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.email) {
        return secureErrorResponse("Unauthorized", 401);
    }

    const rateLimitResponse = await rateLimit(req, 'profile_update', 'WRITE');
    if (rateLimitResponse) return rateLimitResponse;

    try {
        await connectToDatabase();
        const { name, image } = await req.json();

        if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 50) {
            return secureErrorResponse("Invalid name (2-50 characters)", 400);
        }
        const VALID_AVATARS = [
            '/avatars/boy-1.png', '/avatars/boy-2.png', '/avatars/boy-3.png', '/avatars/boy-4.png', '/avatars/boy-5.png',
            '/avatars/girl-1.png', '/avatars/girl-2.png', '/avatars/girl-3.png', '/avatars/girl-4.png', '/avatars/girl-5.png',
            '/avatars/default.png'
        ];
        const isValidAvatar = typeof image === 'string' && (
            VALID_AVATARS.includes(image) ||
            image.startsWith('https://lh3.googleusercontent.com/')
        );
        const safeImage = isValidAvatar ? image : '/avatars/default.png';

        const email = session.user.email.toLowerCase();

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: { name: name.trim(), image: safeImage } },
            { new: true }
        );

        if (!updatedUser) {
            return secureErrorResponse("User not found", 404);
        }

        await LeaderboardEntry.findOneAndUpdate(
            { uniqueId: email },
            { $set: { name: name.trim(), image: safeImage } },
            { upsert: false }
        );

        return secureSuccessResponse({
            message: "Profile updated successfully",
            user: {
                name: updatedUser.name,
                image: updatedUser.image
            }
        });
    } catch (error) {
        console.error("Profile Update API Error:", error);
        return secureErrorResponse("Failed to update profile", 500);
    }
}

export const POST = withApiVitals('/api/user/profile:POST', POSTHandler);
