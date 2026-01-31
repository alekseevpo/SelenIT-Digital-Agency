'use client';

import { Play } from 'lucide-react';

interface YouTubeEmbedProps {
    videoId: string;
    title?: string;
    className?: string;
    lang?: string;
}

const subtitles: Record<string, string> = {
    en: 'Video coming soon',
    ru: 'Видео скоро будет доступно',
    es: 'Video próximamente',
};

// Временная заглушка вместо видео
export default function YouTubeEmbed({ videoId, title = 'Video coming soon', className = '', lang = 'en' }: YouTubeEmbedProps) {
    const subtitle = subtitles[lang] || subtitles.en;

    return (
        <div className={`relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-dark-700 ${className}`}>
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950" />

            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-primary-500/5 to-accent-500/5 dark:from-primary-500/10 dark:via-accent-500/10 dark:to-primary-500/10 animate-pulse" />

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-10"
                style={{
                    backgroundImage: `linear-gradient(currentColor 1px, transparent 1px),
                                      linear-gradient(90deg, currentColor 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                {/* Play button */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-900/10 dark:bg-white/10 backdrop-blur-sm border border-slate-900/20 dark:border-white/20 flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110">
                    <Play className="w-6 h-6 md:w-8 md:h-8 text-slate-900/80 dark:text-white/80 ml-1" fill="currentColor" />
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-semibold text-slate-900/90 dark:text-white/90 mb-2">
                    {title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs md:text-sm text-slate-600 dark:text-white/50">
                    {subtitle}
                </p>
            </div>

            {/* Corner decoration */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/10 backdrop-blur-sm border border-slate-900/10 dark:border-white/20">
                <span className="text-[10px] md:text-xs text-slate-700 dark:text-white/70 font-medium tracking-wide">Coming Soon</span>
            </div>
        </div>
    );
}
