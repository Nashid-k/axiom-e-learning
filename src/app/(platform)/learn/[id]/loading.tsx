export default function Loading() {
    return (
        <div className="min-h-screen bg-[#FBFBFD] dark:bg-[#050505] animate-enter">
            {}
            <div className="fixed top-0 left-0 right-0 h-16 bg-white/50 dark:bg-black/50 backdrop-blur-md z-50 border-b border-gray-100 dark:border-white/5" />

            <main className="pt-32 pb-24 max-w-4xl mx-auto px-6">
                {}
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
                    <div className="w-24 h-4 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                </div>

                {}
                <div className="mb-12 border-b border-gray-200 dark:border-white/10 pb-8 space-y-6">
                    <div className="flex items-center gap-4">
                        {}
                        <div className="w-16 h-16 rounded-2xl bg-gray-200 dark:bg-white/10 animate-pulse" />
                        <div className="space-y-3">
                            {}
                            <div className="w-64 md:w-96 h-10 bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse" />
                            {}
                            <div className="w-32 h-5 bg-gray-200 dark:bg-white/5 rounded-lg animate-pulse" />
                        </div>
                    </div>

                    {}
                    <div className="flex items-center gap-3">
                        <div className="w-24 h-6 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
                        <div className="w-32 h-4 bg-gray-200 dark:bg-white/5 rounded animate-pulse" />
                    </div>
                </div>

                {}
                <div className="bg-white dark:bg-[#111] rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 dark:border-white/5 min-h-[50vh] space-y-8">
                    {}
                    <div className="space-y-4">
                        <div className="w-3/4 h-4 bg-gray-100 dark:bg-white/5 rounded animate-pulse" />
                        <div className="w-full h-4 bg-gray-100 dark:bg-white/5 rounded animate-pulse" />
                        <div className="w-5/6 h-4 bg-gray-100 dark:bg-white/5 rounded animate-pulse" />
                    </div>

                    {}
                    <div className="w-48 h-8 bg-gray-100 dark:bg-white/10 rounded-lg animate-pulse mt-8" />

                    {}
                    <div className="space-y-4">
                        <div className="w-full h-4 bg-gray-100 dark:bg-white/5 rounded animate-pulse" />
                        <div className="w-11/12 h-4 bg-gray-100 dark:bg-white/5 rounded animate-pulse" />
                    </div>

                    {}
                    <div className="w-full h-48 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 animate-pulse mt-8" />
                </div>
            </main>
        </div>
    );
}
