import { MetadataRoute } from 'next';
import { CURRICULUM_REGISTRY, CATEGORIES } from '@/features/curriculum/curriculum-registry';

const BASE_URL = 'https://axiom-learn.com'; 

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/login',
        '/paths',
        '/leaderboard',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
    }));

    const categoryRoutes = CATEGORIES.map((category) => ({
        url: `${BASE_URL}/paths/${encodeURIComponent(category.toLowerCase())}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const topicRoutes = Object.values(CURRICULUM_REGISTRY).map((entry) => ({
        url: `${BASE_URL}/learn/${entry.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...routes, ...categoryRoutes, ...topicRoutes];
}
