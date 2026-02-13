'use client';

import { useTheme } from 'next-themes';
import { useRef } from 'react';
import { Reveal } from '../ui/Reveal';
import { Star, Quote } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

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
                    <Reveal width="100%" delay={0.3}>
                        <h2 className="heading-hero mb-6">
                            <span className="text-slate-900 dark:text-white">
                                {dict.title1}{' '}
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
                    {testimonials.map((testimonial, index) => (
                        <Reveal
                            key={testimonial.id}
                            delay={0.1 * index}
                            width="100%"
                            className="h-full"
                        >
                            <div className="group relative h-full bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200 dark:from-dark-800 dark:via-dark-900 dark:to-black rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-cream-200 dark:border-dark-700 overflow-hidden flex flex-col">
                                {/* Background decoration */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-orange-500/5 dark:from-red-500/5 dark:to-orange-500/2 rounded-full blur-3xl"></div>

                                {/* Quote icon */}
                                <div className="absolute top-6 right-6 text-red-500 dark:text-red-400">
                                    <Quote className="w-8 h-8" />
                                </div>

                                {/* Stars */}
                                <div className="flex gap-1 mb-6 relative z-10">
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
                                            <Star className="w-5 h-5 text-slate-800 fill-slate-800 dark:text-white dark:fill-white drop-shadow-sm" />
                                        </div>
                                    ))}
                                </div>

                                {/* Content */}
                                <div className="relative z-10 flex-1 flex flex-col">
                                    <p className="text-slate-700 dark:text-slate-300 italic mb-8 leading-relaxed text-lg font-medium line-clamp-6 flex-1">
                                        &quot;{testimonial.content}&quot;
                                    </p>
                                </div>

                                {/* Author section */}
                                <div className="flex items-center justify-between pt-6 border-t border-cream-300/50 dark:border-dark-700/50 mt-auto relative z-10">
                                    <div className="flex-1">
                                        <div className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                            {testimonial.author}
                                        </div>
                                        <div className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 ml-4">
                                        {testimonial.author === 'Sarah Johnson' ||
                                        testimonial.author === 'Сара Джонсон' ? (
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
                                        ) : testimonial.author === 'Michael Chen' ||
                                          testimonial.author === 'Михаил Чен' ? (
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

                                {/* Hover effect overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 dark:from-red-500/10 dark:to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
