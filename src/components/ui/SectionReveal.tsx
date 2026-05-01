import { cn } from '@/lib/utils';

interface SectionRevealProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export default function SectionReveal({ children, className = "" }: SectionRevealProps) {
    return <div className={cn("opacity-100", className)}>{children}</div>;
}
