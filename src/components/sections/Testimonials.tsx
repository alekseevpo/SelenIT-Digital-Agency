'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { ExternalLink, Star } from 'lucide-react';

interface Testimonial {
    id: number;
    content: string;
    author: string;
    role: string;
    avatar: string;
}

interface TestimonialsProps {
    lang: string;
    dict: {
        badge: string;
        title1: string;
        titleGradient: string;
        subtitle: string;
        trustpilotCta?: string;
    };
    testimonials: Testimonial[];
}

// Trustpilot profile URL
const TRUSTPILOT_URL = 'https://www.trustpilot.com/review/selenit-digital-agency.vercel.app';

export default function Testimonials({ lang, dict, testimonials }: TestimonialsProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="section-padding transition-colors duration-300">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <Reveal width="100%">
                        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {dict.badge}
                        </span>
                    </Reveal>
                    <Reveal width="100%" delay={0.3}>
                        <h2 className="heading-2 mb-6 text-slate-900 dark:text-white">
                            {dict.title1}{' '}
                            <span className="gradient-text">{dict.titleGradient}</span>
                        </h2>
                    </Reveal>
                    <Reveal width="100%" delay={0.4}>
                        <p className="text-body transition-colors duration-300">
                            {dict.subtitle}
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {testimonials.map((testimonial, index) => (
                        <Reveal key={testimonial.id} delay={0.1 * index} width="100%" className="h-full">
                            <div className="glass-card p-8 bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800 shadow-sm card-hover transition-colors duration-300 h-full flex flex-col rounded-2xl">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-slate-600 dark:text-dark-300 italic mb-8 flex-1 leading-relaxed line-clamp-6">
                                    &quot;{testimonial.content}&quot;
                                </p>
                                <div className="flex items-center gap-4 pt-6 border-t border-slate-200 dark:border-dark-800 mt-auto">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white">{testimonial.author}</div>
                                        <div className="text-slate-500 dark:text-dark-500 text-sm">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Trustpilot CTA */}
                <Reveal width="100%" delay={0.5}>
                    <div className="mt-16 pt-12 border-t border-slate-200 dark:border-dark-800">
                        <a
                            href={TRUSTPILOT_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-dark-800 dark:to-dark-900 border border-slate-200 dark:border-dark-700 hover:border-[#00B67A]/50 dark:hover:border-[#00B67A]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#00B67A]/10"
                        >
                            {/* Trustpilot Logo */}
                            <div className="flex items-center gap-2">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#00B67A"/>
                                </svg>
                                <span className="text-xl font-bold text-[#00B67A]">Trustpilot</span>
                            </div>

                            {/* Stars */}
                            <div className="flex items-center gap-1 px-3 py-1.5 bg-[#00B67A] rounded-md">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-white fill-white" />
                                ))}
                            </div>

                            {/* CTA Text */}
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 group-hover:text-[#00B67A] transition-colors">
                                <span className="font-medium">
                                    {dict.trustpilotCta || 'See our reviews on Trustpilot'}
                                </span>
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
