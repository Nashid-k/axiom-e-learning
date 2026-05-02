import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AppError from '@/components/ui/AppError';
import CodeBlockWithTabs from '@/components/ui/CodeBlockWithTabs';
import { CodeBlock } from './CodeBlock';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface AIExplanationViewProps {
    content: string | null;
    loading: boolean;
    error: string | null;
    onRegenerate: () => void;
    persona?: 'general' | 'buddy';
    category?: string;
    compact?: boolean;
}

type CodeRendererProps = React.HTMLAttributes<HTMLElement> & {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
};

const processMultiLanguageContent = (content: string, category: string = ''): string => {
    const codeBlockRegex = /```(\w+)[\t]*\n([\s\S]*?)```/g;
    const blocks: { language: string; code: string; index: number; length: number }[] = [];

    let match;
    while ((match = codeBlockRegex.exec(content)) !== null) {
        blocks.push({
            language: match[1],
            code: match[2].trim(),
            index: match.index,
            length: match[0].length
        });
    }

    if (blocks.length === 0) return content;

    const groups: number[][] = [];
    let currentGroup: number[] = [0];

    for (let i = 1; i < blocks.length; i++) {
        const prevBlock = blocks[i - 1];
        const currBlock = blocks[i];
        const prevEnd = prevBlock.index + prevBlock.length;
        const gap = currBlock.index - prevEnd;
        const gapText = content.slice(prevEnd, currBlock.index);

        const isHtmlCategory = category.toLowerCase().includes('html');
        if (isHtmlCategory) {
            groups.push(currentGroup);
            currentGroup = [i];
            continue;
        }

        const allowedLanguages = ['html', 'css'];
        const isAllowed = allowedLanguages.includes(prevBlock.language.toLowerCase()) &&
            allowedLanguages.includes(currBlock.language.toLowerCase());

        if (isAllowed && gap < 500 && !gapText.includes('\n\n\n')) {
            currentGroup.push(i);
        } else {
            groups.push(currentGroup);
            currentGroup = [i];
        }
    }
    groups.push(currentGroup);

    let newContent = content;
    [...groups].reverse().forEach(groupIndices => {
        if (groupIndices.length >= 1) {
            const firstBlock = blocks[groupIndices[0]];
            const lastBlock = blocks[groupIndices[groupIndices.length - 1]];
            const start = firstBlock.index;
            const end = lastBlock.index + lastBlock.length;

            const tabs = groupIndices.map(i => {
                const lang = blocks[i].language.toLowerCase();
                const label = lang === 'html' ? 'index.html' : lang === 'css' ? 'styles.css' : blocks[i].language;
                return {
                    language: blocks[i].language,
                    label,
                    code: blocks[i].code
                };
            });

            const payload = { id: `block-${start}`, tabs };
            const replacement = `\`\`\`axiom-tabs\n${JSON.stringify(payload)}\n\`\`\``;
            newContent = newContent.slice(0, start) + replacement + newContent.slice(end);
        }
    });

    return newContent;
};

export const AIExplanationView: React.FC<AIExplanationViewProps> = React.memo(({ content, loading, error, onRegenerate, persona = 'general', category = '', compact = false }) => {
    const unifiedCode = useMemo(() => {
        const htmlBlocks: string[] = [];
        const cssBlocks: string[] = [];
        const regex = /```(html|css)[ \t]*\n([\s\S]*?)```/g;
        let match;
        while ((match = regex.exec(content || '')) !== null) {
            if (match[1] === 'html') htmlBlocks.push(match[2].trim());
            if (match[1] === 'css') cssBlocks.push(match[2].trim());
        }
        return { html: htmlBlocks.join('\n'), css: cssBlocks.join('\n') };
    }, [content]);

    const processedContent = useMemo(() => processMultiLanguageContent(content || '', category), [content, category]);

    const markdownComponents = useMemo(() => ({
        h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-2xl font-bold mt-8 mb-4 text-[var(--fg-primary)]" {...props} />,
        h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-xl font-bold mt-6 mb-3 text-[var(--fg-primary)]" {...props} />,
        h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-lg font-bold mt-4 mb-2 text-[var(--fg-primary)]" {...props} />,
        p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="text-base leading-relaxed mb-4" {...props} />,
        li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li className="mb-2" {...props} />,
        ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc pl-6 mb-4" {...props} />,
        ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => <ol className="list-decimal pl-6 mb-4" {...props} />,
        strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="font-bold text-[var(--fg-primary)]" {...props} />,
        hr: () => <hr className="my-8 border-[var(--surface-border)]" />,
        a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-[var(--color-primary)] underline hover:no-underline" target="_blank" rel="noopener noreferrer" {...props} />,
        blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
            <blockquote className="border-l-4 border-[var(--surface-border)] pl-4 py-1 my-4 italic text-[var(--fg-muted)]" {...props} />
        ),
        table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
            <div className="overflow-x-auto my-6 border border-[var(--surface-border)] rounded-md">
                <table className="w-full text-sm" {...props} />
            </div>
        ),
        th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => <th className="bg-[var(--surface-raised)] px-4 py-2 border-b border-[var(--surface-border)] font-bold" {...props} />,
        td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => <td className="px-4 py-2 border-b border-[var(--surface-border)]" {...props} />,
        code: (props: CodeRendererProps) => {
            const { className, children } = props;
            const match = /language-([\w-]+)/.exec(className || '');
            const lang = (match ? match[1] : '').toLowerCase();

            if (lang === 'axiom-tabs') {
                try {
                    const payload = JSON.parse(String(children));
                    const tabs = Array.isArray(payload) ? payload : payload.tabs;
                    return <div className="my-6"><CodeBlockWithTabs tabs={tabs} /></div>;
                } catch {
                    return <pre className="p-4 bg-[var(--surface-raised)] rounded-md overflow-x-auto">{children}</pre>;
                }
            }

            return (
                <CodeBlock
                    {...props}
                    persona={persona}
                    unifiedCode={unifiedCode}
                    isMaster={['html', 'css'].includes(lang)}
                    isSuppressed={false}
                    category={category}
                    compact={compact}
                />
            );
        }
    }), [unifiedCode, persona, category, compact]);

    if (error) {
        return (
            <div className="p-6">
                <AppError error={new Error(error)} reset={onRegenerate} />
            </div>
        );
    }
    if (loading && !content) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
                <LoadingSpinner size="md" />
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--fg-muted)]">Thinking...</p>
            </div>
        );
    }

    if (!content) return null;

    return (
        <div className="max-w-none text-[var(--fg-secondary)]">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {processedContent}
            </ReactMarkdown>
        </div>
    );
});

AIExplanationView.displayName = 'AIExplanationView';
