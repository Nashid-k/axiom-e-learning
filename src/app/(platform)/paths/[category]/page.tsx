import { Metadata } from 'next';
import CategoryView from '@/features/curriculum/components/CategoryView';
import { getCategory, getCurriculaByCategory } from '@/features/curriculum/curriculum-registry';

interface PageProps {
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);
    const categoryName = getCategory(decodedCategory);

    return {
        title: `${categoryName} Mastery Path`,
        description: `Master ${categoryName} with our AI-powered curriculum. Interactive lessons, live coding, and gamified progress tracking.`,
        openGraph: {
            title: `Master ${categoryName} | Axiom`,
            description: `Start your journey to mastery in ${categoryName}. Free, adaptive, and gamified.`,
        }
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);
    const categoryName = getCategory(decodedCategory);

    const curricula = categoryName === 'Other' ? [] : getCurriculaByCategory(categoryName).map(c => {
        const data = c.getData();
        return {
            slug: c.slug,
            category: c.category,
            description: String(data.description || '')
        };
    });

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: `${categoryName} Mastery Path`,
        description: `Comprehensive curriculum for learning ${categoryName}. Includes interactive lessons, projects, and AI-guided mentorship.`,
        provider: {
            '@type': 'Organization',
            name: 'Axiom',
            sameAs: 'https://axiom-learn.com'
        },
        offers: {
            '@type': 'Offer',
            category: 'free'
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CategoryView category={category} curricula={curricula} />
        </>
    );
}
