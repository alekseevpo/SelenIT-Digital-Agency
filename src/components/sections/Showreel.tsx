'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Reveal } from '../ui/Reveal';

interface ShowreelProps {
    lang: string;
    dict: {
        badge: string;
        title: string;
        title1: string;
        titleGradient: string;
        subtitle: string;
        videoId?: string;
    };
}

const featuredProjects = [
    {
        id: 1,
        title: 'Luxe Fashion E-Commerce',
        category: 'E-Commerce',
        color: 'from-purple-500/20 to-pink-500/20',
    },
    {
        id: 2,
        title: 'FinTech Analytics Dashboard',
        category: 'Web Application',
        color: 'from-blue-500/20 to-cyan-500/20',
    },
];

export default function Showreel({ lang, dict }: ShowreelProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [showPlayButton, setShowPlayButton] = useState(true);

    const handlePlayClick = () => {
        setShowPlayButton(false);
        setTimeout(() => {
            const video = document.getElementById('showreel-video') as HTMLVideoElement;
            if (video) {
                video.play();
            }
        }, 100);
    };

    return (
        <section ref={sectionRef} className="section-padding overflow-hidden">
            <div className="container-custom">
                {/* Animated Showreel Title */}
                <div className="relative py-2 md:py-4 mb-0 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto text-center">
                        <Reveal width="100%" delay={0.3}>
                            <h2 className="heading-2 heading-hero mb-6 inline-block origin-center scale-y-[1.7] scale-x-[1.05] break-words max-w-full">
                                <span className="text-slate-900 dark:text-white">{dict.title}</span>
                            </h2>
                        </Reveal>
                    </div>
                </div>

                {/* Subtitle */}
                <Reveal delay={0.2}>
                    <p className="text-body text-center max-w-2xl mx-auto mb-8 md:mb-12 -mt-4 md:-mt-6">
                        {dict.subtitle}
                    </p>
                </Reveal>

                {/* Video */}
                <Reveal delay={0.3}>
                    <div className="mt-12 md:mt-16 mb-12">
                        <div className="relative rounded-2xl overflow-hidden bg-dark-950 shadow-2xl border border-slate-200 dark:border-white/10">
                            <video
                                id="showreel-video"
                                className="w-full aspect-video"
                                controls
                                playsInline
                                poster="/showreel-poster.jpg"
                                preload="metadata"
                            >
                                <source src="/showreel2025.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Play Button Overlay */}
                            {showPlayButton && (
                                <div
                                    onClick={handlePlayClick}
                                    className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer group/play bg-black/40"
                                >
                                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-600 flex items-center justify-center shadow-2xl shadow-red-600/30 group-hover/play:scale-110 group-hover/play:shadow-red-600/50 transition-all duration-300">
                                        <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
                                            <svg
                                                className="w-6 h-6 md:w-8 md:h-8 text-red-600"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="absolute bottom-1/4 text-white/80 text-sm font-medium tracking-wide opacity-0 group-hover/play:opacity-100 transition-opacity duration-300">
                                        Watch Video
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </Reveal>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredProjects.map((project, index) => (
                        <Reveal key={project.id} delay={0.1 * index}>
                            <div className="glass-card group relative overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 aspect-[16/10] flex flex-col justify-end p-6 md:p-8">
                                {/* Coming Soon Badge */}
                                <div className="absolute top-4 right-4 z-10">
                                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-100/80 dark:bg-slate-800/80 px-2 py-1 rounded-full backdrop-blur-sm">
                                        Coming Soon
                                    </span>
                                </div>
                                <div className="relative z-10">
                                    <span className="text-red-600 dark:text-red-500 text-xs font-semibold uppercase tracking-wider mb-2 block">
                                        {project.category}
                                    </span>
                                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-frantz font-black text-slate-900 dark:text-white mb-2 uppercase tracking-wide leading-none block md:inline-block origin-left scale-y-[1.2]">
                                        {project.title}
                                    </h3>
                                    <Link
                                        href={`/${lang}/showreel`}
                                        className="inline-flex items-center text-sm text-slate-700 dark:text-slate-300 font-medium hover:text-orange-500 dark:hover:text-primary-400 transition-colors group/link mt-1"
                                    >
                                        View Project
                                        <svg
                                            className="w-4 h-4 ml-1.5 transition-transform group-hover/link:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Mobile Button */}
                <div className="mt-8 text-center md:hidden">
                    <Reveal>
                        <Link
                            href={`/${lang}/showreel`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100/50 dark:bg-dark-800 text-slate-900 dark:text-white font-semibold rounded-full border border-slate-200 dark:border-dark-600 transition-all duration-300 hover:border-orange-500 dark:hover:border-primary-500 active:scale-95 backdrop-blur-sm"
                        >
                            View All Projects
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
