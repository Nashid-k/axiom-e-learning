import { Category, CurriculumData, CurriculumEntry } from '@/types';
export type { Category };
export * from './curriculum-constants';

type JsonCurriculumMap = Record<string, CurriculumData>;

export const getCategory = (cat: string): Category => {
    const mapping: Record<string, Category> = {
        'foundation': 'Foundation',
        'html': 'HTML',
        'css': 'CSS',
        'javascript': 'JavaScript',
        'git': 'Git',
        'web-fundamentals': 'Web Fundamentals',
        'react': 'React',
        'typescript': 'TypeScript',
        'nextjs': 'Next.js',
        'nodejs': 'NodeJS',
        'nestjs': 'NestJS',
        'python': 'Python',
        'mongodb': 'MongoDB',
        'sql': 'SQL',
        'dsa': 'DSA',
        'networking': 'Networking',
        'os': 'Operating Systems',
        'testing': 'Testing',
        'devops': 'DevOps',
        'system-design': 'System Design',
        'interview-prep': 'Interview Prep',
    };
    const normalized = cat.toLowerCase().replace(/\s+/g, '-');
    return mapping[normalized] || 'Other' as Category;
};

export const CURRICULUM_REGISTRY: Record<string, CurriculumEntry> = {
    'event-loop-foundation': { 
        slug: 'event-loop-foundation', 
        category: 'Foundation', 
        dataKey: 'event-loop-foundation', 
        getData: () => import('@/data/foundations/event-loop').then(m => m.EVENT_LOOP_FOUNDATION['event-loop-foundation']) 
    },
    'type-system-foundation': { 
        slug: 'type-system-foundation', 
        category: 'Foundation', 
        dataKey: 'type-system-foundation', 
        getData: () => import('@/data/foundations/type-system').then(m => m.TYPE_SYSTEM_FOUNDATION['type-system-foundation']) 
    },
    'authentication-foundation': { 
        slug: 'authentication-foundation', 
        category: 'Foundation', 
        dataKey: 'authentication-foundation', 
        getData: () => import('@/data/foundations/authentication').then(m => m.AUTHENTICATION_FOUNDATION['authentication-foundation']) 
    },
    'http-protocol-foundation': { 
        slug: 'http-protocol-foundation', 
        category: 'Foundation', 
        dataKey: 'http-protocol-foundation', 
        getData: () => import('@/data/foundations/http-protocol').then(m => m.HTTP_PROTOCOL_FOUNDATION['http-protocol-foundation']) 
    },
    'performance-foundation': { 
        slug: 'performance-foundation', 
        category: 'Foundation', 
        dataKey: 'performance-foundation', 
        getData: () => import('@/data/foundations/performance').then(m => m.PERFORMANCE_FOUNDATION['performance-foundation']) 
    },

    'react-1': { 
        slug: 'react-1', 
        category: 'React', 
        dataKey: 'react-1', 
        foundations: ['event-loop-foundation', 'performance-foundation'], 
        getData: () => import('@/data/react-curriculum').then(m => m.REACT_CURRICULUM['react-1']) 
    },
    'react-2': { 
        slug: 'react-2', 
        category: 'React', 
        dataKey: 'react-2', 
        foundations: ['event-loop-foundation', 'performance-foundation'], 
        getData: () => import('@/data/react-curriculum').then(m => m.REACT_CURRICULUM['react-2']) 
    },
    'react-3': { 
        slug: 'react-3', 
        category: 'React', 
        dataKey: 'react-3', 
        foundations: ['event-loop-foundation', 'performance-foundation'], 
        getData: () => import('@/data/react-curriculum').then(m => m.REACT_CURRICULUM['react-3']) 
    },
    'react-questions': { 
        slug: 'react-questions', 
        category: 'React', 
        dataKey: 'react-questions', 
        getData: () => import('@/data/react-curriculum').then(m => m.REACT_CURRICULUM['react-questions']) 
    },

    'nextjs': { 
        slug: 'nextjs', 
        category: 'Next.js', 
        dataKey: 'nextjs', 
        foundations: ['http-protocol-foundation', 'performance-foundation'], 
        getData: () => import('@/data/framework-curriculum').then(m => m.NEXTJS_CURRICULUM['nextjs']) 
    },
    'typescript': { 
        slug: 'typescript', 
        category: 'TypeScript', 
        dataKey: 'typescript', 
        foundations: ['type-system-foundation'], 
        getData: () => import('@/data/ts-curriculum').then(m => m.TYPESCRIPT_CURRICULUM['typescript']) 
    },
    'nodejs': { 
        slug: 'nodejs', 
        category: 'NodeJS', 
        dataKey: 'nodejs', 
        foundations: ['event-loop-foundation', 'http-protocol-foundation'], 
        getData: () => import('@/data/nodejs-curriculum').then(m => m.NODEJS_CURRICULUM['nodejs']) 
    },

    'mongodb': { 
        slug: 'mongodb', 
        category: 'MongoDB', 
        dataKey: 'mongodb', 
        foundations: ['http-protocol-foundation'], 
        getData: () => import('@/data/mongodb.json').then(m => (m.default as JsonCurriculumMap)['mongodb']) 
    },
    'mongodb-questions': { 
        slug: 'mongodb-questions', 
        category: 'MongoDB', 
        dataKey: 'mongodb-questions', 
        getData: () => import('@/data/mongodb.json').then(m => (m.default as JsonCurriculumMap)['mongodb-questions']) 
    },

    'sql': { 
        slug: 'sql', 
        category: 'SQL', 
        dataKey: 'sql', 
        foundations: ['http-protocol-foundation'], 
        getData: () => import('@/data/sql-curriculum').then(m => m.SQL_CURRICULUM['sql']) 
    },
    'sql-questions': { 
        slug: 'sql-questions', 
        category: 'SQL', 
        dataKey: 'sql-questions', 
        getData: () => import('@/data/sql-curriculum').then(m => m.SQL_CURRICULUM['sql-questions']) 
    },

    'dsa-1': { 
        slug: 'dsa-1', 
        category: 'DSA', 
        dataKey: 'dsa-1', 
        getData: () => import('@/data/dsa-curriculum').then(m => m.DSA_CURRICULUM['dsa-1']) 
    },
    'dsa-2': { 
        slug: 'dsa-2', 
        category: 'DSA', 
        dataKey: 'dsa-2', 
        getData: () => import('@/data/dsa-curriculum').then(m => m.DSA_CURRICULUM['dsa-2']) 
    },
    'dsa-3': { 
        slug: 'dsa-3', 
        category: 'DSA', 
        dataKey: 'dsa-3', 
        getData: () => import('@/data/dsa-curriculum').then(m => m.DSA_CURRICULUM['dsa-3']) 
    },
    'dsa-questions': { 
        slug: 'dsa-questions', 
        category: 'DSA', 
        dataKey: 'dsa-questions', 
        getData: () => import('@/data/dsa-curriculum').then(m => m.DSA_CURRICULUM['dsa-questions']) 
    },

    'nestjs': { 
        slug: 'nestjs', 
        category: 'NestJS', 
        dataKey: 'nestjs', 
        foundations: ['authentication-foundation'], 
        getData: () => import('@/data/framework-curriculum').then(m => m.NESTJS_CURRICULUM['nestjs']) 
    },
    'python': { 
        slug: 'python', 
        category: 'Python', 
        dataKey: 'python', 
        getData: () => import('@/data/framework-curriculum').then(m => m.PYTHON_CURRICULUM['python']) 
    },

    'devops': { 
        slug: 'devops', 
        category: 'DevOps', 
        dataKey: 'devops', 
        getData: () => import('@/data/professional-skills-curriculum').then(m => m.DEVOPS_CURRICULUM['devops']) 
    },
    'devops-questions': { 
        slug: 'devops-questions', 
        category: 'DevOps', 
        dataKey: 'devops-questions', 
        getData: () => import('@/data/professional-skills-curriculum').then(m => m.DEVOPS_CURRICULUM['devops-questions']) 
    },

    'testing': { 
        slug: 'testing', 
        category: 'Testing', 
        dataKey: 'testing', 
        getData: () => import('@/data/professional-skills-curriculum').then(m => m.TESTING_CURRICULUM['testing']) 
    },
    'testing-questions': { 
        slug: 'testing-questions', 
        category: 'Testing', 
        dataKey: 'testing-questions', 
        getData: () => import('@/data/professional-skills-curriculum').then(m => m.TESTING_CURRICULUM['testing-questions']) 
    },

    'system-design': { 
        slug: 'system-design', 
        category: 'System Design', 
        dataKey: 'system-design', 
        getData: () => import('@/data/professional-skills-curriculum').then(m => m.SYSTEM_DESIGN_CURRICULUM['system-design']) 
    },
    'system-design-questions': { 
        slug: 'system-design-questions', 
        category: 'System Design', 
        dataKey: 'system-design-questions', 
        getData: () => import('@/data/professional-skills-curriculum').then(m => m.SYSTEM_DESIGN_CURRICULUM['system-design-questions']) 
    },

    'networking': { 
        slug: 'networking', 
        category: 'Networking', 
        dataKey: 'networking', 
        getData: () => import('@/data/professional-skills-curriculum').then(m => m.NETWORKING_CURRICULUM['networking']) 
    },
    'networking-questions': { 
        slug: 'networking-questions', 
        category: 'Networking', 
        dataKey: 'networking-questions', 
        getData: () => import('@/data/professional-skills-curriculum').then(m => m.NETWORKING_CURRICULUM['networking-questions']) 
    },

    'os': { 
        slug: 'os', 
        category: 'Operating Systems', 
        dataKey: 'os', 
        getData: () => import('@/data/professional-skills-curriculum').then(m => m.OS_CURRICULUM['os']) 
    },
    'os-questions': { 
        slug: 'os-questions', 
        category: 'Operating Systems', 
        dataKey: 'os-questions', 
        getData: () => import('@/data/professional-skills-curriculum').then(m => m.OS_CURRICULUM['os-questions']) 
    },

    'interview-prep': { 
        slug: 'interview-prep', 
        category: 'Interview Prep', 
        dataKey: 'interview-prep', 
        getData: () => import('@/data/interview-prep-curriculum').then(m => m.INTERVIEW_PREP_CURRICULUM['interview-prep']) 
    },
    'interview-questions': { 
        slug: 'interview-questions', 
        category: 'Interview Prep', 
        dataKey: 'interview-questions', 
        getData: () => import('@/data/interview-prep-curriculum').then(m => m.INTERVIEW_PREP_CURRICULUM['interview-questions']) 
    },

    'javascript': { 
        slug: 'javascript', 
        category: 'JavaScript', 
        dataKey: 'javascript', 
        foundations: ['event-loop-foundation', 'performance-foundation'], 
        getData: () => import('@/data/javascript.json').then(m => (m.default as JsonCurriculumMap)['javascript']) 
    },
    'html': { 
        slug: 'html', 
        category: 'HTML', 
        dataKey: 'html', 
        getData: () => import('@/data/html-curriculum').then(m => m.HTML_CURRICULUM['html']) 
    },
    'css': { 
        slug: 'css', 
        category: 'CSS', 
        dataKey: 'css', 
        getData: () => import('@/data/css-curriculum').then(m => m.CSS_CURRICULUM['css']) 
    },
    'git': { 
        slug: 'git', 
        category: 'Git', 
        dataKey: 'git', 
        getData: () => import('@/data/git-curriculum').then(m => m.GIT_CURRICULUM['git']) 
    },
    'web-fundamentals': { 
        slug: 'web-fundamentals', 
        category: 'Web Fundamentals', 
        dataKey: 'web-fundamentals', 
        foundations: ['http-protocol-foundation'], 
        getData: () => import('@/data/web-fundamentals-curriculum').then(m => m.WEB_FUNDAMENTALS_CURRICULUM['web-fundamentals']) 
    },
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

export async function buildCurriculumContextForCategory(
    category: string | undefined,
    maxChars: number = 4000
): Promise<string> {
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
            const data = await entry.getData();
            const topics = data.phases.flatMap((phase) => [
                ...(phase.theory || []).map((item) => (typeof item === 'string' ? item : item.title || '')),
                ...(phase.practicals || []).map((item) => (typeof item === 'string' ? item : item.title || ''))
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
