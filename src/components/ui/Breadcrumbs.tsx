'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

const ATTRIBUTE_MAP: Record<string, string> = {
    'paths': 'Paths', 'learn': 'Learn', 'leaderboard': 'Leaderboard',
    'web-development': 'Web Development', 'data-science': 'Data Science',
    'mobile-development': 'Mobile Development', 'programming': 'Programming',
    'react': 'React', 'javascript': 'JavaScript', 'python': 'Python',
    'nextjs': 'Next.js', 'typescript': 'TypeScript', 'mongodb': 'MongoDB',
    'sql': 'SQL', 'dsa': 'DSA'
};

export interface BreadcrumbItem {
    label: string;
    href: string;
    isLast?: boolean;
}

export default function Breadcrumbs({ className, items }: { className?: string; items?: BreadcrumbItem[] }) {
    const pathname = usePathname();
    const segments = pathname?.split('/').filter(s => s && s !== 'paths') || [];

    let breadcrumbItems = items || segments.map((segment, index) => ({
        label: ATTRIBUTE_MAP[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        href: `/${segments.slice(0, index + 1).join('/')}`,
        isLast: index === segments.length - 1
    }));

    if (!items && breadcrumbItems.length > 0) {
        breadcrumbItems = [{ label: 'Home', href: '/' }, ...breadcrumbItems];
    }

    if (breadcrumbItems.length === 0) return null;

    return (
        <nav
            aria-label="Breadcrumb"
            className={[
                "flex items-center",
                "text-[var(--text-caption)] text-[var(--fg-muted)]",
                className
            ].join(' ')}
        >
            {breadcrumbItems.map((item, index) => (
                <Fragment key={item.href}>
                    {index > 0 && (
                        <svg
                            className="w-4 h-4 mx-[var(--space-1)] text-[var(--border-strong)]"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    )}
                    {item.isLast ? (
                        <span className="font-[var(--font-weight-medium)] text-[var(--fg-primary)] truncate max-w-[200px]">
                            {item.label}
                        </span>
                    ) : (
                        <Link
                            href={item.href}
                            className="hover:text-[var(--fg-primary)] transition-colors duration-[var(--duration-fast)] cursor-pointer"
                        >
                            {item.label}
                        </Link>
                    )}
                </Fragment>
            ))}
        </nav>
    );
}
