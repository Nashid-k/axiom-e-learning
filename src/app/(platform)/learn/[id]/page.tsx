import { Metadata } from 'next';
import TopicView from '@/features/learning/components/TopicView';
import { CURRICULUM_REGISTRY } from '@/features/curriculum/curriculum-registry';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;

    const curriculumEntry = CURRICULUM_REGISTRY[id];
    if (curriculumEntry) {
        const data = curriculumEntry.getData();
        const displayTitle = data.title || data.description || id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        return {
            title: displayTitle,
            description: data.description,
            openGraph: {
                title: displayTitle,
                description: data.description || `Study ${displayTitle} on Axiom.`,
            }
        };
    }

    return {
        title: `Topic: ${id}`,
        description: 'Deep dive into this technical topic on Axiom.',
    };
}

export default async function TopicPage({ params }: PageProps) {
    const { id } = await params;

    let title = `Topic: ${id}`;
    let description = 'Deep dive into this technical topic on Axiom.';

    const curriculumEntry = CURRICULUM_REGISTRY[id];
    if (curriculumEntry) {
        const data = curriculumEntry.getData();
        title = data.title || data.description || title;
        description = data.description || description;
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: title,
        description: description,
        educationalLevel: 'Beginner to Advanced',
        author: {
            '@type': 'Organization',
            name: 'Axiom'
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <TopicView id={id} curriculumData={curriculumEntry?.getData() || null} />
        </>
    );
}
