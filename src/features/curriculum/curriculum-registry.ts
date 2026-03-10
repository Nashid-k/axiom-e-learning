import { CurriculumEntry, RichItem } from '@/types';
import { Category } from '@/types';
export type { Category };

import { EVENT_LOOP_FOUNDATION } from '@/data/foundations/event-loop';
import { TYPE_SYSTEM_FOUNDATION } from '@/data/foundations/type-system';
import { AUTHENTICATION_FOUNDATION } from '@/data/foundations/authentication';
import { HTTP_PROTOCOL_FOUNDATION } from '@/data/foundations/http-protocol';
import { PERFORMANCE_FOUNDATION } from '@/data/foundations/performance';

import { REACT_CURRICULUM } from '@/data/react-curriculum';
import { REACT_PROJECTS } from '@/data/react-projects';
import { DSA_CURRICULUM } from '@/data/dsa-curriculum';
import MONGODB_CURRICULUM from '@/data/mongodb.json';
import { SQL_CURRICULUM } from '@/data/sql-curriculum';
import JS_CURRICULUM from '@/data/javascript.json';
import { NODEJS_CURRICULUM } from '@/data/nodejs-curriculum';
import { TYPESCRIPT_CURRICULUM } from '@/data/ts-curriculum';

import { HTML_CURRICULUM } from '@/data/html-curriculum';
import { CSS_CURRICULUM } from '@/data/css-curriculum';
import { GIT_CURRICULUM } from '@/data/git-curriculum';
import { WEB_FUNDAMENTALS_CURRICULUM } from '@/data/web-fundamentals-curriculum';
import { DEVOPS_CURRICULUM, TESTING_CURRICULUM, SYSTEM_DESIGN_CURRICULUM, NETWORKING_CURRICULUM, OS_CURRICULUM } from '@/data/professional-skills-curriculum';
import { NEXTJS_CURRICULUM, NESTJS_CURRICULUM, PYTHON_CURRICULUM } from '@/data/framework-curriculum';
import { INTERVIEW_PREP_CURRICULUM } from '@/data/interview-prep-curriculum';

export * from './curriculum-constants';

export const CURRICULUM_REGISTRY: Record<string, CurriculumEntry> = {
    'event-loop-foundation': { slug: 'event-loop-foundation', category: 'Foundation', dataKey: 'event-loop-foundation', getData: () => EVENT_LOOP_FOUNDATION['event-loop-foundation'] },
    'type-system-foundation': { slug: 'type-system-foundation', category: 'Foundation', dataKey: 'type-system-foundation', getData: () => TYPE_SYSTEM_FOUNDATION['type-system-foundation'] },
    'authentication-foundation': { slug: 'authentication-foundation', category: 'Foundation', dataKey: 'authentication-foundation', getData: () => AUTHENTICATION_FOUNDATION['authentication-foundation'] },
    'http-protocol-foundation': { slug: 'http-protocol-foundation', category: 'Foundation', dataKey: 'http-protocol-foundation', getData: () => HTTP_PROTOCOL_FOUNDATION['http-protocol-foundation'] },
    'performance-foundation': { slug: 'performance-foundation', category: 'Foundation', dataKey: 'performance-foundation', getData: () => PERFORMANCE_FOUNDATION['performance-foundation'] },

    'react-1': { slug: 'react-1', category: 'React', dataKey: 'react-1', foundations: ['event-loop-foundation', 'performance-foundation'], getData: () => REACT_CURRICULUM['react-1'] },
    'react-2': { slug: 'react-2', category: 'React', dataKey: 'react-2', foundations: ['event-loop-foundation', 'performance-foundation'], getData: () => REACT_CURRICULUM['react-2'] },
    'react-3': { slug: 'react-3', category: 'React', dataKey: 'react-3', foundations: ['event-loop-foundation', 'performance-foundation'], getData: () => REACT_CURRICULUM['react-3'] },
    'react-questions': { slug: 'react-questions', category: 'React', dataKey: 'react-questions', getData: () => REACT_CURRICULUM['react-questions'] },

    'nextjs': { slug: 'nextjs', category: 'Next.js', dataKey: 'nextjs', foundations: ['http-protocol-foundation', 'performance-foundation'], getData: () => NEXTJS_CURRICULUM['nextjs'] },
    'typescript': { slug: 'typescript', category: 'TypeScript', dataKey: 'typescript', foundations: ['type-system-foundation'], getData: () => TYPESCRIPT_CURRICULUM['typescript'] },
    'nodejs': { slug: 'nodejs', category: 'NodeJS', dataKey: 'nodejs', foundations: ['event-loop-foundation', 'http-protocol-foundation'], getData: () => NODEJS_CURRICULUM['nodejs'] },

    'mongodb': { slug: 'mongodb', category: 'MongoDB', dataKey: 'mongodb', foundations: ['http-protocol-foundation'], getData: () => (MONGODB_CURRICULUM as any)['mongodb'] },
    'mongodb-questions': { slug: 'mongodb-questions', category: 'MongoDB', dataKey: 'mongodb-questions', getData: () => (MONGODB_CURRICULUM as any)['mongodb-questions'] },

    'sql': { slug: 'sql', category: 'SQL', dataKey: 'sql', foundations: ['http-protocol-foundation'], getData: () => SQL_CURRICULUM['sql'] },
    'sql-questions': { slug: 'sql-questions', category: 'SQL', dataKey: 'sql-questions', getData: () => SQL_CURRICULUM['sql-questions'] },

    'dsa-1': { slug: 'dsa-1', category: 'DSA', dataKey: 'dsa-1', getData: () => DSA_CURRICULUM['dsa-1'] },
    'dsa-2': { slug: 'dsa-2', category: 'DSA', dataKey: 'dsa-2', getData: () => DSA_CURRICULUM['dsa-2'] },
    'dsa-3': { slug: 'dsa-3', category: 'DSA', dataKey: 'dsa-3', getData: () => DSA_CURRICULUM['dsa-3'] },
    'dsa-questions': { slug: 'dsa-questions', category: 'DSA', dataKey: 'dsa-questions', getData: () => DSA_CURRICULUM['dsa-questions'] },

    'nestjs': { slug: 'nestjs', category: 'NestJS', dataKey: 'nestjs', foundations: ['authentication-foundation'], getData: () => NESTJS_CURRICULUM['nestjs'] },
    'python': { slug: 'python', category: 'Python', dataKey: 'python', getData: () => PYTHON_CURRICULUM['python'] },

    'devops': { slug: 'devops', category: 'DevOps', dataKey: 'devops', getData: () => DEVOPS_CURRICULUM['devops'] },
    'devops-questions': { slug: 'devops-questions', category: 'DevOps', dataKey: 'devops-questions', getData: () => DEVOPS_CURRICULUM['devops-questions'] },

    'testing': { slug: 'testing', category: 'Testing', dataKey: 'testing', getData: () => TESTING_CURRICULUM['testing'] },
    'testing-questions': { slug: 'testing-questions', category: 'Testing', dataKey: 'testing-questions', getData: () => TESTING_CURRICULUM['testing-questions'] },

    'system-design': { slug: 'system-design', category: 'System Design', dataKey: 'system-design', getData: () => SYSTEM_DESIGN_CURRICULUM['system-design'] },
    'system-design-questions': { slug: 'system-design-questions', category: 'System Design', dataKey: 'system-design-questions', getData: () => SYSTEM_DESIGN_CURRICULUM['system-design-questions'] },

    'networking': { slug: 'networking', category: 'Networking', dataKey: 'networking', getData: () => NETWORKING_CURRICULUM['networking'] },
    'networking-questions': { slug: 'networking-questions', category: 'Networking', dataKey: 'networking-questions', getData: () => NETWORKING_CURRICULUM['networking-questions'] },

    'os': { slug: 'os', category: 'Operating Systems', dataKey: 'os', getData: () => OS_CURRICULUM['os'] },
    'os-questions': { slug: 'os-questions', category: 'Operating Systems', dataKey: 'os-questions', getData: () => OS_CURRICULUM['os-questions'] },

    'interview-prep': { slug: 'interview-prep', category: 'Interview Prep', dataKey: 'interview-prep', getData: () => INTERVIEW_PREP_CURRICULUM['interview-prep'] },
    'interview-questions': { slug: 'interview-questions', category: 'Interview Prep', dataKey: 'interview-questions', getData: () => INTERVIEW_PREP_CURRICULUM['interview-questions'] },

    'javascript': { slug: 'javascript', category: 'JavaScript', dataKey: 'javascript', foundations: ['event-loop-foundation', 'performance-foundation'], getData: () => (JS_CURRICULUM as any)['javascript'] },
    'html': { slug: 'html', category: 'HTML', dataKey: 'html', getData: () => HTML_CURRICULUM['html'] },
    'css': { slug: 'css', category: 'CSS', dataKey: 'css', getData: () => CSS_CURRICULUM['css'] },
    'git': { slug: 'git', category: 'Git', dataKey: 'git', getData: () => GIT_CURRICULUM['git'] },
    'web-fundamentals': { slug: 'web-fundamentals', category: 'Web Fundamentals', dataKey: 'web-fundamentals', foundations: ['http-protocol-foundation'], getData: () => WEB_FUNDAMENTALS_CURRICULUM['web-fundamentals'] },
};

export const isCurriculum = (title: string): boolean => {
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    return slug in CURRICULUM_REGISTRY;
};

export const getCurriculumSlug = (title: string): string => {
    return title.toLowerCase().replace(/\s+/g, '-');
};

export const getCurriculumEntry = (slug: string): CurriculumEntry | undefined => {
    return CURRICULUM_REGISTRY[slug];
};

export const getCurriculaByCategory = (category: Category): CurriculumEntry[] => {
    return Object.values(CURRICULUM_REGISTRY).filter(entry => entry.category === category);
};


export const getCategoryCurriculaSlugs = (category: Category): string[] => {
    return Object.values(CURRICULUM_REGISTRY)
        .filter(entry => entry.category === category)
        .map(entry => entry.slug);
};

export function buildCurriculumContextForCategory(
    category: string | undefined,
    maxChars: number = 4000
): string {
    if (!category || typeof category !== 'string') {
        return 'No specific curriculum context. General programming mentorship.';
    }
    const entries = getCurriculaByCategory(category as Category);
    if (entries.length === 0) {
        return `No curriculum found for "${category}". General programming mentorship.`;
    }
    let total = 0;
    const parts: string[] = [];
    for (const entry of entries) {
        if (total >= maxChars) break;
        try {
            const data = entry.getData();
            const topics = data.phases.flatMap((p: { theory?: unknown[]; practicals?: unknown[] }) => [
                ...(p.theory || []).map((t: unknown) => (typeof t === 'string' ? t : (t as { title?: string })?.title ?? '')),
                ...(p.practicals || []).map((t: unknown) => (typeof t === 'string' ? t : (t as { title?: string })?.title ?? ''))
            ]).filter(Boolean).join(', ');
            const remaining = maxChars - total;
            const truncatedTopics = topics.length > remaining - 120
                ? topics.substring(0, Math.max(0, remaining - 120)) + '...'
                : topics;
            const block = `### [${entry.category}] ${entry.slug}\nTopics: ${truncatedTopics}`;
            if (total + block.length > maxChars) break;
            parts.push(block);
            total += block.length;
        } catch {
        }
    }
    return parts.length > 0 ? parts.join('\n\n') : 'No specific curriculum context. General programming mentorship.';
}
