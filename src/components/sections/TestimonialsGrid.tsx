'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { motion, Variants, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { Testimonial } from '@/types/dictionary';

interface TestimonialsGridProps {
    lang: string;
    dict: {
        title: string;
        subtitle: string;
        badge: string;
        companies?: {
            name: string;
            link: string | null;
        }[];
    };
    testimonials: Testimonial[];
}

export default function TestimonialsGrid({ lang, dict, testimonials }: TestimonialsGridProps) {
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
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <span className="text-red-600 dark:text-red-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                        {dict.badge}
                    </span>
                    <h2 className="heading-hero mb-6">
                        <span className="text-slate-900 dark:text-white">
                            {(() => {
                                const title = dict.title;
                                const words = title.split(' ');
                                return words.map((word, index) => {
                                    if (
                                        word.toLowerCase().includes('reviews') ||
                                        word.toLowerCase().includes('reseñas') ||
                                        word.toLowerCase().includes('отзывы')
                                    ) {
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
                        </span>
                    </h2>
                    <p className="text-body transition-colors duration-300 mx-auto">
                        {dict.subtitle}
                    </p>
                </div>

                {/* Companies List */}
                {dict.companies && dict.companies.length > 0 && (
                    <div className="text-center max-w-4xl mx-auto mb-12">
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
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.05 * index }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <div className="relative h-full bg-cream-100 dark:bg-dark-800 rounded-xl p-4 shadow-md border border-cream-200 dark:border-dark-700 overflow-hidden flex flex-col">
                                {/* Stars */}
                                <div className="flex gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-3 h-3 text-slate-800 fill-slate-800 dark:text-white dark:fill-white"
                                        />
                                    ))}
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col">
                                    <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed text-xs font-normal line-clamp-4 flex-1">
                                        &quot;{testimonial.content}&quot;
                                    </p>
                                </div>

                                {/* Author section */}
                                <div className="flex items-center justify-between pt-3 border-t border-cream-300/50 dark:border-dark-700/50 mt-auto">
                                    <div className="flex-1">
                                        <div className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                                            {testimonial.author}
                                        </div>
                                        <div className="text-slate-600 dark:text-slate-400 text-xs font-medium">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 ml-2">
                                        {testimonial.author === 'Sarah Johnson' ? (
                                            <a
                                                href="https://tech-start.com/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300"
                                            >
                                                <Image
                                                    src="/arrow.png"
                                                    alt="Visit TechStart website"
                                                    width={16}
                                                    height={16}
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
                                                className="inline-flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300"
                                            >
                                                <Image
                                                    src="/arrow.png"
                                                    alt="Visit Luxe Brands website"
                                                    width={16}
                                                    height={16}
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
                                                className="inline-flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300"
                                            >
                                                <Image
                                                    src="/arrow.png"
                                                    alt="Visit FinTech Solutions website"
                                                    width={16}
                                                    height={16}
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
                                                className="inline-flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300"
                                            >
                                                <Image
                                                    src="/arrow.png"
                                                    alt="Visit Global Trade website"
                                                    width={16}
                                                    height={16}
                                                    className="brightness-0 contrast-100"
                                                    style={{
                                                        filter: 'brightness(0) saturate(100%) invert(16%) sepia(91%) saturate(4905%) hue-rotate(359deg) brightness(96%) contrast(119%)',
                                                    }}
                                                />
                                            </a>
                                        ) : (
                                            <div className="inline-flex items-center justify-center opacity-60">
                                                <Image
                                                    src="/arrow.png"
                                                    alt="Arrow"
                                                    width={16}
                                                    height={16}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
