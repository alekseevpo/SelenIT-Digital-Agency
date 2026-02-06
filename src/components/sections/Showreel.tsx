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
    en: 'Featured Projects & Showreel',
    ru: 'Избранные проекты и шоурилс',
    es: 'Proyectos destacados y Showreel',
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
        <section ref={sectionRef} className="section-padding overflow-hidden">
            <div className="container-custom">

                {/* Animated Showreel Title */}
                <div className="relative py-8 md:py-12 mb-8 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto text-center">
                        <Reveal width="100%" delay={0.3}>
                            <h2
                                className="heading-2 heading-hero mb-6"
                                style={{
                                    display: 'inline-block',
                                    transform: 'scaleY(1.7) scaleX(0.9)',
                                    transformOrigin: 'center'
                                }}
                            >
                                <span className="text-slate-900 dark:text-white">
                                    {showreelTitle[lang as keyof typeof showreelTitle] || showreelTitle.en}
                                </span>
                            </h2>
                        </Reveal>
                    </div>
                </div>

                {/* Subtitle */}
                <Reveal delay={0.2}>
                    <p className="text-body text-center max-w-2xl mx-auto mb-16 md:mb-20">
                        {lang === 'ru'
                            ? 'Узнайте, как мы помогаем брендам расти с помощью кастомных цифровых решений.'
                            : lang === 'es'
                                ? 'Descubra cómo ayudamos a las marcas a crecer con soluciones digitales personalizadas.'
                                : 'Discover how we help brands grow with custom digital solutions.'}
                    </p>
                </Reveal>

                {/* Video */}
                <Reveal delay={0.3}>
                    <div className="mt-12 md:mt-16 mb-12">
                        <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-2xl">
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
                                    className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer group/play"
                                    style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                                >


                                    {/* Play button */}
                                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-600 flex items-center justify-center shadow-2xl shadow-red-600/30 group-hover/play:scale-110 group-hover/play:shadow-red-600/50 transition-all duration-300">
                                        {/* Inner white circle */}
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
                            <div className="glass-card group relative overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 aspect-[16/10] flex flex-col justify-end p-6 md:p-8">
                                <div className="relative z-10">
                                    <span className="text-red-600 dark:text-red-500 text-xs font-semibold uppercase tracking-wider mb-2 block">
                                        {project.category}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-frantz font-black text-slate-900 dark:text-white mb-3 uppercase tracking-wide leading-none" style={{ transform: 'scaleY(1.2)' }}>
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
