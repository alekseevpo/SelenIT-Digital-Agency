'use client';

interface YouTubeEmbedProps {
    videoId: string;
    title?: string;
    className?: string;
}

export default function YouTubeEmbed({ videoId, title = 'YouTube video player', className = '' }: YouTubeEmbedProps) {
    return (
        <div className={`relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl ${className}`}>
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; compute-pressure"
                allowFullScreen
                frameBorder="0"
            />
        </div>
    );
}
