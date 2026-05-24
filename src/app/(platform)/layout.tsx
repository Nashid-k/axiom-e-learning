export default function PlatformLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full px-4 sm:px-8 lg:px-12 py-8">
            {children}
        </div>
    );
}
