'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { TrustpilotWidget, TrustpilotCarousel } from '../ui/TrustpilotWidget';

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
    trustpilotId?: string;
}

// Trustpilot Business Unit ID - replace with your actual ID
const TRUSTPILOT_BUSINESS_ID = 'YOUR_BUSINESS_UNIT_ID';

export default function Testimonials({ lang, dict, testimonials, trustpilotId }: TestimonialsProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const businessId = trustpilotId || TRUSTPILOT_BUSINESS_ID;
    const isConfigured = businessId !== 'YOUR_BUSINESS_UNIT_ID';
    const locale = lang === 'ru' ? 'ru-RU' : lang === 'es' ? 'es-ES' : 'en-US';
    const theme = mounted && resolvedTheme === 'dark' ? 'dark' : 'light';

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

                    {/* Trustpilot Badge */}
                    {isConfigured && mounted && (
                        <Reveal width="100%" delay={0.5}>
                            <div className="mt-8 flex justify-center">
                                <TrustpilotWidget
                                    businessUnitId={businessId}
                                    locale={locale}
                                    theme={theme}
                                    templateId="5419b6ffb0d04a076446a9af"
                                    height="24px"
                                    width="280px"
                                />
                            </div>
                        </Reveal>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {testimonials.map((testimonial, index) => (
                        <Reveal key={testimonial.id} delay={0.1 * index} width="100%" className="h-full">
                            <div className="glass-card p-8 bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800 shadow-sm card-hover transition-colors duration-300 h-full flex flex-col rounded-2xl">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
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

                {/* Trustpilot Carousel */}
                {isConfigured && mounted && (
                    <Reveal width="100%" delay={0.5}>
                        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-dark-800">
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <TrustpilotLogo />
                                <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                                    {dict.trustpilotCta || 'See our reviews on Trustpilot'}
                                </span>
                            </div>
                            <TrustpilotCarousel
                                businessUnitId={businessId}
                                locale={locale}
                                theme={theme}
                            />
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    );
}

function TrustpilotLogo() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="#00B67A"/>
        </svg>
    );
}
