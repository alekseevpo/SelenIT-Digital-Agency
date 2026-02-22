'use client';

import { useTheme } from 'next-themes';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from '../ui/Reveal';

interface Testimonial {
    id: number;
    content: string;
    author: string;
    role: string;
}

interface TestimonialsProps {
    lang: string;
    dict: {
        badge: string;
        title1: string;
        titleGradient: string;
        subtitle: string;
    };
    testimonials: Testimonial[];
}

export default function Testimonials({ lang, dict, testimonials }: TestimonialsProps) {
    const { resolvedTheme } = useTheme();
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'center center'],
    });
    const slideInRight = useTransform(scrollYProgress, [0, 0.6], ['50vw', '0%']);
    const fadeIn = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

    return (
        <section ref={sectionRef} className="section-padding transition-colors duration-300">
            <div className="container-custom">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <Reveal width="100%" delay={0.2}>
                        <span className="text-red-600 dark:text-red-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {dict.badge}
                        </span>
                    </Reveal>
                    <Reveal width="100%" delay={0.3}>
                        <h2 className="mb-6 inline-block origin-center break-words max-w-full heading-hero text-[3.5rem] sm:text-[4.5rem] md:text-7xl lg:text-[7rem] xl:text-8rem 2xl:text-9rem font-bold leading-[0.85] lg:leading-[0.84] tracking-wide font-frantz">
                            <span className="text-slate-900 dark:text-white">
                                {dict.title1} <br className="block sm:hidden" />
                                <motion.span
                                    className="text-red-600 dark:text-red-500"
                                    style={{
                                        x: slideInRight,
                                        opacity: fadeIn,
                                        display: 'inline-block',
                                    }}
                                >
                                    {dict.titleGradient}
                                </motion.span>
                            </span>
                        </h2>
                    </Reveal>
                    <Reveal width="100%" delay={0.4}>
                        <p className="text-body transition-colors duration-300 mx-auto">
                            {dict.subtitle}
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {testimonials.slice(0, 3).map((testimonial, index) => (
                        <Reveal
                            key={testimonial.id}
                            delay={0.1 * index}
                            width="100%"
                            className="h-full"
                        >
                            <div className="group relative h-full bg-cream-100 dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-cream-200 dark:border-dark-700 overflow-hidden flex flex-col">
                                {/* Stars */}
                                <div className="flex gap-1 mb-4 relative z-10">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="animate-fade-in"
                                            style={{
                                                animationDelay: `${0.1 * index + i * 0.05}s`,
                                                animationDuration: '0.3s',
                                                animationFillMode: 'both',
                                            }}
                                        >
                                            <Star className="w-4 h-4 text-slate-800 fill-slate-800 dark:text-white dark:fill-white drop-shadow-sm" />
                                        </div>
                                    ))}
                                </div>

                                {/* Content */}
                                <div className="relative z-10 flex-1 flex flex-col">
                                    <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed text-sm font-normal line-clamp-6 flex-1">
                                        &quot;{testimonial.content}&quot;
                                    </p>
                                </div>

                                {/* Author section */}
                                <div className="flex items-center justify-between pt-4 border-t border-cream-300/50 dark:border-dark-700/50 mt-auto relative z-10">
                                    <div className="flex-1">
                                        <div className="font-bold text-slate-900 dark:text-white text-base mb-1">
                                            {testimonial.author}
                                        </div>
                                        <div className="text-slate-600 dark:text-slate-400 text-xs font-medium">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 ml-4">
                                        {testimonial.author === 'Sarah Johnson' ? (
                                            <a
                                                href="https://tech-start.com/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300 drop-shadow-md hover:drop-shadow-lg hover:scale-105"
                                            >
                                                <Image
                                                    src="/arrow.png"
                                                    alt="Visit TechStart website"
                                                    width={24}
                                                    height={24}
                                                    className="brightness-0 contrast-100"
                                                    style={{
                                                        filter: 'brightness(0) saturate(100%) invert(16%) sepia(91%) saturate(4905%) hue-rotate(359deg) brightness(96%) contrast(119%)',
                                                    }}
                                                />
                                            </a>
                                        ) : testimonial.author === 'Michael Chen' ? (
                                            <a
                                                href="https://luxebrands.com/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300 drop-shadow-md hover:drop-shadow-lg hover:scale-105"
                                            >
                                                <Image
                                                    src="/arrow.png"
                                                    alt="Visit Luxe Brands website"
                                                    width={24}
                                                    height={24}
                                                    className="brightness-0 contrast-100"
                                                    style={{
                                                        filter: 'brightness(0) saturate(100%) invert(16%) sepia(91%) saturate(4905%) hue-rotate(359deg) brightness(96%) contrast(119%)',
                                                    }}
                                                />
                                            </a>
                                        ) : testimonial.author === 'Elena Petrova' ? (
                                            <a
                                                href="https://www.thefintechsolutions.com/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300 drop-shadow-md hover:drop-shadow-lg hover:scale-105"
                                            >
                                                <Image
                                                    src="/arrow.png"
                                                    alt="Visit FinTech Solutions website"
                                                    width={24}
                                                    height={24}
                                                    className="brightness-0 contrast-100"
                                                    style={{
                                                        filter: 'brightness(0) saturate(100%) invert(16%) sepia(91%) saturate(4905%) hue-rotate(359deg) brightness(96%) contrast(119%)',
                                                    }}
                                                />
                                            </a>
                                        ) : testimonial.author === 'Alexander Volkov' ? (
                                            <a
                                                href="https://globaltrade.kz"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300 drop-shadow-md hover:drop-shadow-lg hover:scale-105"
                                            >
                                                <Image
                                                    src="/arrow.png"
                                                    alt="Visit Global Trade website"
                                                    width={24}
                                                    height={24}
                                                    className="brightness-0 contrast-100"
                                                    style={{
                                                        filter: 'brightness(0) saturate(100%) invert(16%) sepia(91%) saturate(4905%) hue-rotate(359deg) brightness(96%) contrast(119%)',
                                                    }}
                                                />
                                            </a>
                                        ) : (
                                            <div className="inline-flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-sm group-hover:drop-shadow-md">
                                                <Image
                                                    src="/arrow.png"
                                                    alt="Arrow"
                                                    width={24}
                                                    height={24}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* More Reviews Link */}
                <div className="text-center mt-12">
                    <Link
                        href={`/${lang}/reviews`}
                        className="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium transition-colors duration-300"
                    >
                        {lang === 'ru' ? 'больше..' : lang === 'es' ? 'más..' : 'more..'}
                    </Link>
                </div>
            </div>
        </section>
    );
}
