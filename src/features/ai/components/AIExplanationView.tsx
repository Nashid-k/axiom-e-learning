import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AppError from '@/components/ui/AppError';
import { motion, useReducedMotion } from 'framer-motion';
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

            const payload = {
                id: `block - ${start} `,
                tabs
            };
            const replacement = `\`\`\`axiom-tabs\n${JSON.stringify(payload)}\n\`\`\``;
            newContent = newContent.slice(0, start) + replacement + newContent.slice(end);
        }
    });

    return newContent;
};

export const AIExplanationView: React.FC<AIExplanationViewProps> = React.memo(({ content, loading, error, onRegenerate, persona = 'general', category = '', compact = false }) => {
    const shouldReduceMotion = useReducedMotion();
    const unifiedCode = useMemo(() => {
        const htmlBlocks: string[] = [];
        const cssBlocks: string[] = [];
        const regex = /```(html|css)[ \t]*\n([\s\S]*?)```/g;
        let match;
        while ((match = regex.exec(content || '')) !== null) {
            if (match[1] === 'html') htmlBlocks.push(match[2].trim());
            if (match[1] === 'css') cssBlocks.push(match[2].trim());
        }
        return {
            html: htmlBlocks.join('\n'),
            css: cssBlocks.join('\n')
        };
    }, [content]);

    const processedContent = useMemo(() => processMultiLanguageContent(content || '', category), [content, category]);

    const markdownComponents = useMemo(() => ({
        h1: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className={compact ? "text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white mt-5 mb-3 tracking-tight leading-tight" : "text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mt-10 mb-5 tracking-tight leading-tight"} {...props} />,
        h2: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className={compact ? "text-lg md:text-xl font-bold text-gray-900 dark:text-white mt-5 mb-2 tracking-tight flex items-center gap-2" : "text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 tracking-tight flex items-center gap-3"} {...props} />,
        h3: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className={compact ? "text-base font-semibold text-gray-800 dark:text-gray-100 mt-4 mb-2" : "text-lg font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3"} {...props} />,
        h4: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h4 className={compact ? "text-sm font-semibold text-gray-800 dark:text-gray-200 mt-3 mb-1" : "text-base font-semibold text-gray-800 dark:text-gray-200 mt-5 mb-2"} {...props} />,
        p: ({ ...props }: React.HTMLAttributes<HTMLParagraphElement>) => <p className={compact ? "text-sm text-gray-700 dark:text-gray-300 leading-6 mb-3" : "text-[15px] md:text-base text-gray-700 dark:text-gray-300 leading-[1.8] mb-5"} {...props} />,
        li: ({ ...props }: React.LiHTMLAttributes<HTMLLIElement>) => <li className={compact ? "text-sm text-gray-700 dark:text-gray-300 mb-1.5 ml-1 leading-6" : "text-[15px] md:text-base text-gray-700 dark:text-gray-300 mb-2.5 ml-1 leading-[1.75]"} {...props} />,
        ul: ({ ...props }: React.HTMLAttributes<HTMLUListElement>) => <ul className={compact ? "pl-5 mb-4 space-y-1 list-disc marker:text-blue-400/60 dark:marker:text-blue-400/40" : "pl-5 mb-6 space-y-1 list-disc marker:text-blue-400/60 dark:marker:text-blue-400/40"} {...props} />,
        ol: ({ ...props }: React.OlHTMLAttributes<HTMLOListElement>) => <ol className={compact ? "pl-5 mb-4 list-decimal space-y-1 marker:text-blue-400/60 dark:marker:text-blue-400/40 marker:font-semibold" : "pl-5 mb-6 list-decimal space-y-1 marker:text-blue-400/60 dark:marker:text-blue-400/40 marker:font-semibold"} {...props} />,
        strong: ({ ...props }: React.HTMLAttributes<HTMLElement>) => <strong className="text-gray-900 dark:text-white font-bold" {...props} />,
        em: ({ ...props }: React.HTMLAttributes<HTMLElement>) => <em className="text-gray-600 dark:text-gray-400 italic" {...props} />,
        hr: () => <hr className={compact ? "my-4 border-none h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/10 to-transparent" : "my-8 border-none h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/10 to-transparent"} />,
        a: ({ ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-blue-600 dark:text-blue-400 underline underline-offset-2 decoration-blue-400/30 hover:decoration-blue-400 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
        blockquote: ({ ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
            <blockquote
                className={compact ? "border-l-[3px] border-blue-500/40 bg-blue-50/50 dark:bg-blue-500/5 py-2.5 px-4 text-sm text-gray-600 dark:text-gray-400 mb-4 rounded-r-xl italic leading-6" : "border-l-[3px] border-blue-500/40 bg-blue-50/50 dark:bg-blue-500/5 py-3.5 px-5 text-[15px] text-gray-600 dark:text-gray-400 mb-6 rounded-r-xl italic leading-relaxed"}
                {...props}
            />
        ),
        table: ({ ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
            <div className={compact ? "overflow-x-auto mb-4 rounded-xl border border-gray-200 dark:border-white/10" : "overflow-x-auto mb-6 rounded-xl border border-gray-200 dark:border-white/10"}>
                <table className="w-full text-sm" {...props} />
            </div>
        ),
        th: ({ ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => <th className="bg-gray-50 dark:bg-white/5 px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-white/10" {...props} />,
        td: ({ ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => <td className="px-4 py-3 text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-white/5" {...props} />,
        code: (props: CodeRendererProps) => {
            const { className, children } = props;
            const match = /language-([\w-]+)/.exec(className || '');
            const lang = (match ? match[1] : '').toLowerCase();

            if (lang === 'axiom-tabs') {
                try {
                    const payload = JSON.parse(String(children));
                    const tabs = Array.isArray(payload) ? payload : payload.tabs;
                    const key = Array.isArray(payload) ? undefined : payload.id;

                    return (
                        <div className={compact ? "my-3" : "my-6"}>
                            <CodeBlockWithTabs key={key} tabs={tabs} />
                        </div>
                    );
                } catch (e) {
                    console.error('Failed to parse multi-lang tabs:', e);
                    return <pre>{children}</pre>;
                }
            }

            const isPreviewable = ['html', 'css'].includes(lang);

            return (
                <CodeBlock
                    {...props}
                    persona={persona}
                    unifiedCode={unifiedCode}
                    isMaster={isPreviewable}
                    isSuppressed={false}
                    category={category}
                    compact={compact}
                />
            );
        }
    }), [unifiedCode, persona, category, compact]);

    if (error) {
        return (
            <div className="h-full flex items-center justify-center p-6">
                <AppError
                    error={new Error(error)}
                    reset={onRegenerate}
                />
            </div>
        );
    }
    if (loading && !content) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
                <LoadingSpinner size="lg" />
                <p className="text-sm text-gray-400 font-medium animate-pulse tracking-wide">
                    {persona === 'buddy' ? 'Maya is thinking...' : 'Generating explanation...'}
                </p>
            </div>
        );
    }

    if (!content) return null;

    return (
        <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.4, ease: "easeOut" }}
            className={compact ? "max-w-none text-gray-800 dark:text-gray-200" : "max-w-none pb-20 text-gray-800 dark:text-gray-200"}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
            >
                {processedContent}
            </ReactMarkdown>
        </motion.div>
    );
});

AIExplanationView.displayName = 'AIExplanationView';
