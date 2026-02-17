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
        companies?: {
            name: string;
            link: string | null;
        }[];
    };
}

export default function Showreel({ lang, dict }: ShowreelProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [showPlayButton, setShowPlayButton] = useState(true);

    const featuredProjects = [
        {
            id: 1,
            title:
                lang === 'ru'
                    ? 'Luxe Fashion E-Commerce'
                    : lang === 'es'
                      ? 'Luxe Fashion E-Commerce'
                      : 'Luxe Fashion E-Commerce',
            category: lang === 'ru' ? 'E-Commerce' : lang === 'es' ? 'E-Commerce' : 'E-Commerce',
            color: 'from-purple-500/20 to-pink-500/20',
            description:
                lang === 'ru'
                    ? 'Премиальная модная площадка с расширенной фильтрацией и функцией виртуальной примерки'
                    : lang === 'es'
                      ? 'Plataforma de moda premium con filtrado avanzado y función de prueba virtual'
                      : 'Premium fashion marketplace with advanced filtering and virtual try-on features',
            features:
                lang === 'ru'
                    ? [
                          'Виртуальная примерка',
                          'AI рекомендации',
                          'Безопасные платежи',
                          'Доставка по миру',
                      ]
                    : lang === 'es'
                      ? ['Prueba Virtual', 'Recomendaciones IA', 'Pagos Seguros', 'Envío Global']
                      : [
                            'Virtual Try-On',
                            'AI Recommendations',
                            'Secure Payments',
                            'Global Shipping',
                        ],
            tech: ['Next.js', 'Stripe', 'Three.js', 'Tailwind'],
            gradient: 'from-red-600 to-red-600',
            icon: '�️',
        },
        {
            id: 2,
            title:
                lang === 'ru'
                    ? 'FinTech Analytics Dashboard'
                    : lang === 'es'
                      ? 'FinTech Analytics Dashboard'
                      : 'FinTech Analytics Dashboard',
            category:
                lang === 'ru'
                    ? 'Веб-приложение'
                    : lang === 'es'
                      ? 'Aplicación Web'
                      : 'Web Application',
            color: 'from-blue-500/20 to-cyan-500/20',
            description:
                lang === 'ru'
                    ? 'Платформа финансовой аналитики в реальном времени с предиктивными инсайтами и автоматической отчетностью'
                    : lang === 'es'
                      ? 'Plataforma de análisis financiero en tiempo real con insights predictivos e informes automatizados'
                      : 'Real-time financial analytics platform with predictive insights and automated reporting',
            features:
                lang === 'ru'
                    ? [
                          'Данные в реальном времени',
                          'Предиктивная аналитика',
                          'Кастомные отчеты',
                          'API интеграция',
                      ]
                    : lang === 'es'
                      ? [
                            'Datos en Tiempo Real',
                            'Análisis Predictivo',
                            'Informes Personalizados',
                            'Integración API',
                        ]
                      : [
                            'Real-time Data',
                            'Predictive Analytics',
                            'Custom Reports',
                            'API Integration',
                        ],
            tech: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
            gradient: 'from-red-600 to-red-600',
            icon: '�',
        },
    ];

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
                <div className="relative mb-0 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto text-center">
                        <Reveal width="100%" delay={0.3}>
                            <h2 className="mb-6 inline-block origin-center scale-y-[1.7] scale-x-[1.05] break-words max-w-full text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-wide font-frantz">
                                {(() => {
                                    const title = dict.title;
                                    const words = title.split(' ');
                                    return words.map((word, index) => {
                                        if (word.toLowerCase().includes('шоурил')) {
                                            return (
                                                <span
                                                    key={index}
                                                    className="text-red-600 dark:text-red-500"
                                                >
                                                    {word}
                                                    {index < words.length - 1 ? ' ' : ''}
                                                </span>
                                            );
                                        }
                                        return (
                                            <span
                                                key={index}
                                                className="text-slate-900 dark:text-white"
                                            >
                                                {word}
                                                {index < words.length - 1 ? ' ' : ''}
                                            </span>
                                        );
                                    });
                                })()}
                            </h2>
                        </Reveal>
                    </div>
                </div>

                {/* Subtitle */}
                <Reveal delay={0.2}>
                    <p className="text-body text-center max-w-2xl mx-auto mb-8 md:mb-12 mt-4 md:mt-6">
                        {dict.subtitle}
                    </p>
                </Reveal>

                {/* Companies List */}
                {dict.companies && dict.companies.length > 0 && (
                    <Reveal delay={0.25}>
                        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12">
                            <div className="flex flex-wrap justify-center gap-3 items-center">
                                {dict.companies.map((company, index) => (
                                    <div key={index} className="flex items-center">
                                        {company.link ? (
                                            <a
                                                href={company.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium transition-colors duration-300"
                                            >
                                                {company.name}
                                            </a>
                                        ) : (
                                            <span className="text-slate-600 dark:text-slate-400 font-medium">
                                                {company.name}
                                            </span>
                                        )}
                                        {dict.companies && index < dict.companies.length - 1 && (
                                            <span className="mx-3 text-slate-400 dark:text-slate-600">
                                                •
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                )}

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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
                    {featuredProjects.map((project, index) => (
                        <Reveal key={project.id} delay={0.1 * index}>
                            <div
                                className={`group relative overflow-hidden rounded-3xl shadow-lg bg-cream-100 dark:bg-dark-900 backdrop-blur-sm border border-white/10 dark:border-white/5 h-full flex flex-col`}
                            >
                                {/* Project Header */}
                                <div className="relative p-8 md:p-10 flex flex-col flex-grow">
                                    {/* Icon and Category */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <span className="text-red-600 dark:text-red-500 text-xs font-bold uppercase tracking-wider">
                                                {project.category}
                                            </span>
                                            <div className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                                                Premium Solution
                                            </div>
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider bg-white/90 dark:bg-slate-800/90 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                                                {lang === 'ru'
                                                    ? 'Скоро'
                                                    : lang === 'es'
                                                      ? 'Próximamente'
                                                      : 'Coming Soon'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-4xl md:text-5xl font-frantz font-black text-slate-900 dark:text-white mb-4 uppercase tracking-wide leading-tight">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6 flex-grow">
                                        {project.description}
                                    </p>

                                    {/* Key Features */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-3 font-sans">
                                            {lang === 'ru'
                                                ? 'Ключевые особенности'
                                                : lang === 'es'
                                                  ? 'Características Clave'
                                                  : 'Key Features'}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.features.map((feature, featureIndex) => (
                                                <span
                                                    key={featureIndex}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-600 dark:bg-red-500"
                                                    style={{
                                                        color: '#ffffff !important',
                                                        backgroundColor: '#dc2626 !important',
                                                    }}
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="mt-auto">
                                        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-3 font-sans">
                                            {lang === 'ru'
                                                ? 'Технологический стек'
                                                : lang === 'es'
                                                  ? 'Stack Tecnológico'
                                                  : 'Technology Stack'}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-3 py-1.5 text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white/70 dark:bg-slate-800/70 rounded-lg border border-slate-300/50 dark:border-slate-600/50 font-sans"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
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
