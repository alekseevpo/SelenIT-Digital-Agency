'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Reveal } from '../ui/Reveal';

interface ShowreelProps {
    lang: string;
    dict: {
        badge: string;
        title1: string;
        titleGradient: string;
        subtitle: string;
        videoId?: string;
        button: string;
    };
}

const showreelTitle = {
    en: 'SHOWREEL',
    ru: 'SHOWREEL',
    es: 'SHOWREEL',
};

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

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"]
    });

    const xTransform = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

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
        <section ref={sectionRef} className="section-padding transition-colors duration-300 overflow-hidden">
            <div className="container-custom">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <Reveal>
                            <span className="text-orange-500 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                                {dict.badge}
                            </span>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="heading-2 text-slate-900 dark:text-white">
                                {dict.title1}{' '}
                                <span className="gradient-text">{dict.titleGradient}</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-body mt-4 transition-colors duration-300">
                                {dict.subtitle}
                            </p>
                        </Reveal>
                    </div>
                    <Reveal delay={0.3} className="shrink-0">
                        <Link
                            href={`/${lang}/showreel`}
                            className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-slate-100/50 dark:bg-dark-800 text-slate-900 dark:text-white font-semibold rounded-full border border-slate-200 dark:border-dark-600 transition-all duration-300 hover:border-orange-500 dark:hover:border-primary-500 hover:shadow-lg hover:shadow-orange-500/10 dark:hover:shadow-primary-500/10 active:scale-95 backdrop-blur-sm"
                        >
                            {dict.button}
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </Reveal>
                </div>

                {/* Animated Showreel Title */}
                <motion.div
                    className="relative h-20 md:h-32 lg:h-44 mb-4 flex items-start justify-center -mt-4 md:-mt-6"
                    style={{ x: xTransform, opacity }}
                >
                    <h2
                        className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold text-slate-900 dark:text-white select-none"
                        style={{
                            fontFamily: "var(--font-hedvig), Georgia, 'Times New Roman', serif",
                            letterSpacing: '-0.04em'
                        }}
                    >
                        {showreelTitle[lang as keyof typeof showreelTitle] || showreelTitle.en}
                    </h2>
                </motion.div>

                {/* Video */}
                <Reveal delay={0.3}>
                    <div className="mb-12">
                        <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-2xl">
                            <video
                                id="showreel-video"
                                className="w-full aspect-video"
                                controls
                                playsInline
                                poster="/showreel-poster.jpg"
                                preload="auto"
                            >
                                <source src="/showreel2025.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Play Button Overlay */}
                            {showPlayButton && (
                                <div
                                    onClick={handlePlayClick}
                                    className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer group/play"
                                    style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                                >
                                    {/* Outer glow ring */}
                                    <div className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-orange-500/30 to-pink-500/30 blur-xl group-hover/play:scale-125 transition-transform duration-500" />

                                    {/* Play button */}
                                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-orange-500/30 group-hover/play:scale-110 group-hover/play:shadow-orange-500/50 transition-all duration-300">
                                        {/* Inner white circle */}
                                        <div className="absolute inset-1 rounded-full bg-white/95 flex items-center justify-center">
                                            <svg
                                                className="w-6 h-6 md:w-8 md:h-8 text-orange-500"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Text label */}
                                    <span className="absolute bottom-1/4 text-white/80 text-sm font-medium tracking-wide opacity-0 group-hover/play:opacity-100 transition-opacity duration-300">
                                        {lang === 'ru' ? 'Смотреть' : lang === 'es' ? 'Ver video' : 'Watch video'}
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
                            <div className="group relative overflow-hidden rounded-2xl bg-cream-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 aspect-[16/10] flex flex-col justify-end p-6 md:p-8">
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                                <div className="relative z-10">
                                    <span className="text-orange-500 dark:text-primary-400 text-xs font-semibold uppercase tracking-wider mb-2 block">
                                        {project.category}
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                        {project.title}
                                    </h3>
                                    <Link
                                        href={`/${lang}/showreel`}
                                        className="inline-flex items-center text-sm text-slate-700 dark:text-slate-300 font-medium hover:text-orange-500 dark:hover:text-primary-400 transition-colors group/link"
                                    >
                                        {lang === 'ru' ? 'Подробнее' : lang === 'es' ? 'Ver más' : 'Learn more'}
                                        <svg className="w-4 h-4 ml-1.5 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                            {dict.button}
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
