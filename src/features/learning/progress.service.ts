import { UserProgress, User, LeaderboardEntry } from '@/lib/db/models';
import { connectToDatabase } from '@/lib/db/mongodb';

export interface ProgressOperation {
    id: string;
    timestamp: number;
    type: 'ADD' | 'REMOVE';
    itemId: string;
}

export class ProgressService {
    static async getProgress(uniqueId: string, curriculumSlug?: string) {
        await connectToDatabase();

        if (curriculumSlug) {
            const progress = await UserProgress.findOne({ uniqueId, curriculumSlug }).lean();
            return {
                progress: progress as unknown as { checkedItems: string[] } | null,
                checkedItems: (progress as unknown as { checkedItems: string[] } | null)?.checkedItems || []
            };
        } else {
            const allProgress = await UserProgress.find({ uniqueId }).lean();
            const progressMap = (allProgress as unknown as { curriculumSlug: string, checkedItems: string[] }[]).reduce((acc: Record<string, string[]>, cur: { curriculumSlug: string, checkedItems: string[] }) => {
                acc[cur.curriculumSlug] = cur.checkedItems;
                return acc;
            }, {});
            return { progress: allProgress as unknown as { checkedItems: string[] }[], progressMap };
        }
    }

    static async syncProgress(
        uniqueId: string,
        curriculumSlug: string,
        data: {
            checkedItems?: string[];
            totalItems?: number;
            operations?: ProgressOperation[];
        }
    ) {
        await connectToDatabase();

        const existing = await UserProgress.findOne({ uniqueId, curriculumSlug });
        let finalCheckedItems: string[];

        if (data.operations && data.operations.length > 0) {
            const serverSet = new Set<string>(existing?.checkedItems || []);

            data.operations.forEach((op) => {
                if (op.type === 'ADD') {
                    serverSet.add(op.itemId);
                } else if (op.type === 'REMOVE') {
                    serverSet.delete(op.itemId);
                }
            });

            finalCheckedItems = Array.from(serverSet);
        } else {
            const potentialSet = new Set(data.checkedItems || []);
            const previousCount = existing?.checkedItems?.length || 0;
            const newCount = potentialSet.size;
            const delta = newCount - previousCount;

            if (delta > 100) {
                finalCheckedItems = existing?.checkedItems || [];
            } else {
                finalCheckedItems = Array.from(potentialSet);
            }
        }

        const completedCount = finalCheckedItems.length;

        const progress = await UserProgress.findOneAndUpdate(
            { uniqueId, curriculumSlug },
            {
                $set: {
                    checkedItems: finalCheckedItems,
                    totalItems: data.totalItems || 0,
                    completedCount,
                    lastUpdated: new Date(),
                }
            },
            { upsert: true, new: true }
        );

        this.syncLeaderboardBackground(uniqueId).catch(err => {
            console.error("[ProgressService] Background sync failed:", err);
        });

        return {
            progress,
            checkedItems: finalCheckedItems
        };
    }

    private static getWeight(slug: string): number {
        const s = slug.toLowerCase();
        if (s.includes('html') || s.includes('css') || s.includes('git') || s.includes('web-fundamentals')) return 1;
        if (s.includes('dsa') || s.includes('system-design') || s.includes('operating-systems') || s.includes('os')) return 5;
        return 3;
    }

    private static async syncLeaderboardBackground(uniqueId: string) {
        try {
            const stats = await UserProgress.aggregate([
                { $match: { uniqueId } },
                {
                    $project: {
                        completedCount: { $ifNull: ["$completedCount", 0] },
                        curriculumSlug: 1
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalMastered: { $sum: "$completedCount" },
                        items: { $push: { slug: "$curriculumSlug", count: "$completedCount" } }
                    }
                }
            ]);

            const totalMastered = stats[0]?.totalMastered || 0;
            const items = stats[0]?.items || [];

            const totalPoints = items.reduce((sum: number, item: { slug: string; count: number }) => {
                const weight = this.getWeight(item.slug);
                return sum + ((item.count || 0) * weight);
            }, 0);

            const user = await User.findOne({ email: uniqueId }).lean();

            if (user) {
                const u = user as unknown as { name?: string; email: string; image?: string };
                const displayName = u.name || u.email.split('@')[0];
                const image = u.image;

                await LeaderboardEntry.findOneAndUpdate(
                    { uniqueId },
                    {
                        $set: {
                            name: displayName,
                            image,
                            totalMastered,
                            totalPoints,
                            isGuest: false,
                            lastUpdated: new Date()
                        }
                    },
                    { upsert: true }
                );

                await User.updateOne(
                    { email: uniqueId },
                    { $set: { totalMastered, totalPoints, lastLogin: new Date() } }
                );
            }
        } catch (err) {
            console.error("[ProgressService] Failed to sync leaderboard:", err);
            throw err;
        }
    }

    static async deleteProgress(uniqueId: string, curriculumSlug: string) {
        await connectToDatabase();
        const result = await UserProgress.deleteOne({ uniqueId, curriculumSlug });

        try {
            await this.syncLeaderboardBackground(uniqueId);
        } catch (err) {
            console.error("[ProgressService] Background sync after delete failed:", err);
        }

        return result;
    }
}



