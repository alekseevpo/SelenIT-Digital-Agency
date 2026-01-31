'use client';

import { Play } from 'lucide-react';

interface YouTubeEmbedProps {
    videoId: string;
    title?: string;
    className?: string;
}

// Временная заглушка вместо видео
export default function YouTubeEmbed({ videoId, title = 'Video coming soon', className = '' }: YouTubeEmbedProps) {
    return (
        <div className={`relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl ${className}`}>
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />

            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-green-500/10 dark:from-primary-500/10 dark:via-accent-500/10 dark:to-primary-500/10 animate-pulse" />

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                {/* Play button */}
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white/80 ml-1" fill="currentColor" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white/90 mb-2">
                    {title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-white/50">
                    Видео скоро будет доступно
                </p>
            </div>

            {/* Corner decoration */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-xs text-white/70 font-medium">Coming Soon</span>
            </div>
        </div>
    );
}
