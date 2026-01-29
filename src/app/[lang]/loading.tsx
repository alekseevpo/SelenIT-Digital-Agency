export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 dark:bg-dark-950/80 backdrop-blur-sm transition-colors duration-300">
            <div className="flex flex-col items-center gap-4">
                {/* Animated Logo Spinner */}
                <div className="relative w-16 h-16">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-dark-700" />
                    {/* Spinning gradient ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 border-r-accent-500 animate-spin" />
                    {/* Center dot */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 animate-pulse" />
                    </div>
                </div>
                {/* Loading text */}
                <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-slate-500 dark:text-dark-400">Loading</span>
                    <span className="flex gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 h-1 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 h-1 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                </div>
            </div>
        </div>
    );
}
