import { Category } from '@/types';
export type { Category };

export const CATEGORIES = [
    'Web Fundamentals',
    'HTML',
    'CSS',
    'JavaScript',
    'Git',
    'TypeScript',
    'React',
    'Next.js',
    'NodeJS',
    'NestJS',
    'Python',
    'SQL',
    'MongoDB',
    'DSA',
    'Operating Systems',
    'Networking',
    'Testing',
    'DevOps',
    'System Design',
    'Interview Prep',
] as const;

export const CATEGORY_META: Record<Category, {
    color: string;
    icon: string;
    directRoute?: string;
}> = {
    'Foundation': { color: '#64748B', icon: 'foundation' },
    'HTML': { color: '#E34F26', icon: 'html', directRoute: '/learn/html' },
    'CSS': { color: '#1572B6', icon: 'css', directRoute: '/learn/css' },
    'JavaScript': { color: '#f7df1e', icon: 'js', directRoute: '/learn/javascript' },
    'Git': { color: '#F05032', icon: 'git', directRoute: '/learn/git' },
    'Web Fundamentals': { color: '#4A90E2', icon: 'web', directRoute: '/learn/web-fundamentals' },

    'React': { color: '#61DAFB', icon: 'react' },
    'TypeScript': { color: '#3178C6', icon: 'ts', directRoute: '/learn/typescript' },
    'Next.js': { color: '#000000', icon: 'nextjs', directRoute: '/learn/nextjs' },

    'NodeJS': { color: '#339933', icon: 'node', directRoute: '/learn/nodejs' },
    'NestJS': { color: '#E0234E', icon: 'nestjs', directRoute: '/learn/nestjs' },
    'Python': { color: '#3776AB', icon: 'python', directRoute: '/learn/python' },

    'MongoDB': { color: '#47A248', icon: 'mongo', directRoute: '/learn/mongodb' },
    'SQL': { color: '#336791', icon: 'sql', directRoute: '/learn/sql' },

    'DSA': { color: '#10B981', icon: 'dsa' },
    'Networking': { color: '#6366F1', icon: 'network', directRoute: '/learn/networking' },
    'Operating Systems': { color: '#8B5CF6', icon: 'os', directRoute: '/learn/os' },

    'Testing': { color: '#22C55E', icon: 'testing', directRoute: '/learn/testing' },
    'DevOps': { color: '#F59E0B', icon: 'devops', directRoute: '/learn/devops' },
    'System Design': { color: '#EC4899', icon: 'system-design', directRoute: '/learn/system-design' },

    'Interview Prep': { color: '#888888', icon: 'interview', directRoute: '/learn/interview-prep' },
};

export const getCategory = (title: string): Category | 'Other' => {
    const t = title.toLowerCase().replace(/-/g, ' ');

    if (t.includes('html') && !t.includes('css')) return 'HTML';
    if (t.includes('css')) return 'CSS';
    if (t.includes('git') || t.includes('version control')) return 'Git';
    if (t.includes('web fundamental') || t.includes('http') || t.includes('browser')) return 'Web Fundamentals';

    if (t.includes('react')) return 'React';
    if (t.includes('next.js') || t.includes('nextjs')) return 'Next.js';
    if (t.includes('typescript') || t.includes('ts')) return 'TypeScript';

    if (t.includes('node')) return 'NodeJS';
    if (t.includes('nest') || t.includes('nestjs')) return 'NestJS';
    if (t.includes('python') || t.includes('django') || t.includes('fastapi')) return 'Python';

    if (t.includes('mongodb') || t.includes('mongo')) return 'MongoDB';
    if (t.includes('sql') && !t.includes('nosql')) return 'SQL';

    if (t.includes('dsa') || t.includes('algorithm') || t.includes('data structure')) return 'DSA';
    if (t.includes('network') && !t.includes('neural')) return 'Networking';
    if (t.includes('os') || t.includes('operating system')) return 'Operating Systems';

    if (t.includes('test') || t.includes('jest') || t.includes('cypress')) return 'Testing';
    if (t.includes('devops') || t.includes('docker') || t.includes('kubernetes') || t.includes('ci/cd')) return 'DevOps';
    if (t.includes('system design') || t.includes('architecture') || t.includes('scalability')) return 'System Design';

    if (t.includes('javascript') || t.includes('js')) return 'JavaScript';

    if (t.includes('interview')) return 'Interview Prep';

    return 'Other';
};

export const hasDirectRoute = (category: Category): string | undefined => {
    return CATEGORY_META[category]?.directRoute;
};
