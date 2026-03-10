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

    'nextjs-1': { slug: 'nextjs-1', category: 'Next.js', dataKey: 'nextjs-1', foundations: ['http-protocol-foundation', 'performance-foundation'], getData: () => NEXTJS_CURRICULUM['nextjs-1'] },
    'nextjs-2': { slug: 'nextjs-2', category: 'Next.js', dataKey: 'nextjs-2', foundations: ['http-protocol-foundation', 'performance-foundation'], getData: () => NEXTJS_CURRICULUM['nextjs-2'] },
    'nextjs-3': { slug: 'nextjs-3', category: 'Next.js', dataKey: 'nextjs-3', foundations: ['http-protocol-foundation', 'performance-foundation'], getData: () => NEXTJS_CURRICULUM['nextjs-3'] },

    'typescript-1': { slug: 'typescript-1', category: 'TypeScript', dataKey: 'typescript-1', foundations: ['type-system-foundation'], getData: () => TYPESCRIPT_CURRICULUM['typescript-1'] },
    'typescript-2': { slug: 'typescript-2', category: 'TypeScript', dataKey: 'typescript-2', foundations: ['type-system-foundation'], getData: () => TYPESCRIPT_CURRICULUM['typescript-2'] },
    'typescript-3': { slug: 'typescript-3', category: 'TypeScript', dataKey: 'typescript-3', foundations: ['type-system-foundation'], getData: () => TYPESCRIPT_CURRICULUM['typescript-3'] },

    'nodejs-1': { slug: 'nodejs-1', category: 'NodeJS', dataKey: 'nodejs-1', foundations: ['event-loop-foundation', 'http-protocol-foundation'], getData: () => NODEJS_CURRICULUM['nodejs-1'] },
    'nodejs-2': { slug: 'nodejs-2', category: 'NodeJS', dataKey: 'nodejs-2', foundations: ['event-loop-foundation', 'http-protocol-foundation'], getData: () => NODEJS_CURRICULUM['nodejs-2'] },
    'nodejs-3': { slug: 'nodejs-3', category: 'NodeJS', dataKey: 'nodejs-3', foundations: ['event-loop-foundation', 'http-protocol-foundation'], getData: () => NODEJS_CURRICULUM['nodejs-3'] },

    'mongodb-1': { slug: 'mongodb-1', category: 'MongoDB', dataKey: 'mongodb-1', foundations: ['http-protocol-foundation'], getData: () => (MONGODB_CURRICULUM as any)['mongodb-1'] },
    'mongodb-2': { slug: 'mongodb-2', category: 'MongoDB', dataKey: 'mongodb-2', foundations: ['http-protocol-foundation'], getData: () => (MONGODB_CURRICULUM as any)['mongodb-2'] },
    'mongodb-3': { slug: 'mongodb-3', category: 'MongoDB', dataKey: 'mongodb-3', foundations: ['http-protocol-foundation'], getData: () => (MONGODB_CURRICULUM as any)['mongodb-3'] },
    'mongodb-questions': { slug: 'mongodb-questions', category: 'MongoDB', dataKey: 'mongodb-questions', getData: () => (MONGODB_CURRICULUM as any)['mongodb-questions'] },

    'sql-1': { slug: 'sql-1', category: 'SQL', dataKey: 'sql-1', foundations: ['http-protocol-foundation'], getData: () => SQL_CURRICULUM['sql-1'] },
    'sql-2': { slug: 'sql-2', category: 'SQL', dataKey: 'sql-2', foundations: ['http-protocol-foundation'], getData: () => SQL_CURRICULUM['sql-2'] },
    'sql-3': { slug: 'sql-3', category: 'SQL', dataKey: 'sql-3', foundations: ['http-protocol-foundation'], getData: () => SQL_CURRICULUM['sql-3'] },
    'sql-questions': { slug: 'sql-questions', category: 'SQL', dataKey: 'sql-questions', getData: () => SQL_CURRICULUM['sql-questions'] },

    'dsa-1': { slug: 'dsa-1', category: 'DSA', dataKey: 'dsa-1', getData: () => DSA_CURRICULUM['dsa-1'] },
    'dsa-2': { slug: 'dsa-2', category: 'DSA', dataKey: 'dsa-2', getData: () => DSA_CURRICULUM['dsa-2'] },
    'dsa-3': { slug: 'dsa-3', category: 'DSA', dataKey: 'dsa-3', getData: () => DSA_CURRICULUM['dsa-3'] },
    'dsa-questions': { slug: 'dsa-questions', category: 'DSA', dataKey: 'dsa-questions', getData: () => DSA_CURRICULUM['dsa-questions'] },

    'nestjs-1': { slug: 'nestjs-1', category: 'NestJS', dataKey: 'nestjs-1', foundations: ['authentication-foundation'], getData: () => NESTJS_CURRICULUM['nestjs-1'] },
    'nestjs-2': { slug: 'nestjs-2', category: 'NestJS', dataKey: 'nestjs-2', foundations: ['authentication-foundation'], getData: () => NESTJS_CURRICULUM['nestjs-2'] },
    'nestjs-3': { slug: 'nestjs-3', category: 'NestJS', dataKey: 'nestjs-3', foundations: ['authentication-foundation'], getData: () => NESTJS_CURRICULUM['nestjs-3'] },

    'python-1': { slug: 'python-1', category: 'Python', dataKey: 'python-1', getData: () => PYTHON_CURRICULUM['python-1'] },
    'python-2': { slug: 'python-2', category: 'Python', dataKey: 'python-2', getData: () => PYTHON_CURRICULUM['python-2'] },
    'python-3': { slug: 'python-3', category: 'Python', dataKey: 'python-3', getData: () => PYTHON_CURRICULUM['python-3'] },

    'devops-1': { slug: 'devops-1', category: 'DevOps', dataKey: 'devops-1', getData: () => DEVOPS_CURRICULUM['devops-1'] },
    'devops-2': { slug: 'devops-2', category: 'DevOps', dataKey: 'devops-2', getData: () => DEVOPS_CURRICULUM['devops-2'] },
    'devops-3': { slug: 'devops-3', category: 'DevOps', dataKey: 'devops-3', getData: () => DEVOPS_CURRICULUM['devops-3'] },

    'testing-1': { slug: 'testing-1', category: 'Testing', dataKey: 'testing-1', getData: () => TESTING_CURRICULUM['testing-1'] },
    'testing-2': { slug: 'testing-2', category: 'Testing', dataKey: 'testing-2', getData: () => TESTING_CURRICULUM['testing-2'] },
    'testing-3': { slug: 'testing-3', category: 'Testing', dataKey: 'testing-3', getData: () => TESTING_CURRICULUM['testing-3'] },

    'system-design-1': { slug: 'system-design-1', category: 'System Design', dataKey: 'system-design-1', getData: () => SYSTEM_DESIGN_CURRICULUM['system-design-1'] },
    'system-design-2': { slug: 'system-design-2', category: 'System Design', dataKey: 'system-design-2', getData: () => SYSTEM_DESIGN_CURRICULUM['system-design-2'] },
    'system-design-3': { slug: 'system-design-3', category: 'System Design', dataKey: 'system-design-3', getData: () => SYSTEM_DESIGN_CURRICULUM['system-design-3'] },

    'networking-1': { slug: 'networking-1', category: 'Networking', dataKey: 'networking-1', getData: () => NETWORKING_CURRICULUM['networking-1'] },
    'networking-2': { slug: 'networking-2', category: 'Networking', dataKey: 'networking-2', getData: () => NETWORKING_CURRICULUM['networking-2'] },
    'networking-3': { slug: 'networking-3', category: 'Networking', dataKey: 'networking-3', getData: () => NETWORKING_CURRICULUM['networking-3'] },

    'os-1': { slug: 'os-1', category: 'Operating Systems', dataKey: 'os-1', getData: () => OS_CURRICULUM['os-1'] },
    'os-2': { slug: 'os-2', category: 'Operating Systems', dataKey: 'os-2', getData: () => OS_CURRICULUM['os-2'] },
    'os-3': { slug: 'os-3', category: 'Operating Systems', dataKey: 'os-3', getData: () => OS_CURRICULUM['os-3'] },

    'interview-1': { slug: 'interview-1', category: 'Interview Prep', dataKey: 'interview-1', getData: () => INTERVIEW_PREP_CURRICULUM['interview-1'] },
    'interview-2': { slug: 'interview-2', category: 'Interview Prep', dataKey: 'interview-2', getData: () => INTERVIEW_PREP_CURRICULUM['interview-2'] },
    'interview-3': { slug: 'interview-3', category: 'Interview Prep', dataKey: 'interview-3', getData: () => INTERVIEW_PREP_CURRICULUM['interview-3'] },
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
