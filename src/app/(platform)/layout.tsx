export default function PlatformLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {children}
        </div>
    );
}
