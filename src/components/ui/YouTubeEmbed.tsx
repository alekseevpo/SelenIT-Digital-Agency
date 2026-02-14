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

// Оптимизированная заглушка вместо видео
export default function YouTubeEmbed({
    videoId,
    title = 'Video coming soon',
    className = '',
    lang = 'en',
}: YouTubeEmbedProps) {
    const subtitle = subtitles[lang] || subtitles.en;

    return (
        <div
            className={`relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-dark-700 ${className}`}
        >
            {/* Упрощенный градиентный фон */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-950" />

            {/* Упрощенный оверлей */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-primary-500/5 dark:from-primary-500/10 dark:to-primary-500/10" />

            {/* Контент */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                {/* Кнопка воспроизведения */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-900/10 dark:bg-white/10 backdrop-blur-sm border border-slate-900/20 dark:border-white/20 flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110">
                    <Play
                        className="w-5 h-5 md:w-6 md:h-6 text-slate-900/80 dark:text-white/80 ml-1"
                        fill="currentColor"
                    />
                </div>

                {/* Заголовок */}
                <h3 className="text-base md:text-lg font-semibold text-slate-900/90 dark:text-white/90 mb-1">
                    {title}
                </h3>

                {/* Подзаголовок */}
                <p className="text-xs text-slate-600 dark:text-white/50">{subtitle}</p>
            </div>

            {/* Упрощенное угловое украшение */}
            <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-slate-900/5 dark:bg-white/10 backdrop-blur-sm border border-slate-900/10 dark:border-white/20">
                <span className="text-[10px] text-slate-700 dark:text-white/70 font-medium">
                    Coming Soon
                </span>
            </div>
        </div>
    );
}
