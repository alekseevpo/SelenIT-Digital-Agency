'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from '../ui/Reveal';

interface ServicesProps {
    lang: string;
    dict: {
        badge: string;
        title1: string;
        titleGradient: string;
        subtitle: string;
        learnMore: string;
    };
    servicesList: Array<{
        id: string;
        title: string;
        description: string;
        features: string[];
    }>;
}

const serviceIcons: Record<string, React.ReactNode> = {
    'branding': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
    ),
    'websites': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    ),
    'seo': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    ),
    'support': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    ),
};

export default function Services({ lang, dict, servicesList }: ServicesProps) {
    const displayServices = servicesList.slice(0, 4);
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"]
    });

    const xTransform = useTransform(scrollYProgress, [0, 0.8], ["-10%", "0%"]);
    const scaleTransform = useTransform(scrollYProgress, [0, 0.8], [1.1, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section ref={sectionRef} id="services" className="section-padding relative overflow-hidden transition-colors duration-300">
            <div className="container-custom relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <Reveal width="100%" delay={0.3}>
                        <h2 className="heading-hero mb-6">
                            <span className="text-slate-900 dark:text-white">
                                {dict.title1} {dict.titleGradient}
                            </span>
                        </h2>
                    </Reveal>

                    <div className="max-w-3xl mx-auto mt-12 sm:mt-16">
                        <Reveal width="100%" delay={0.2}>
                            <p className="text-body transition-colors duration-300">
                                {dict.subtitle}
                            </p>
                        </Reveal>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayServices.map((service, index) => (
                        <Reveal key={service.id} delay={0.2 * index}>
                            <div className="glass-card p-8 card-hover group h-full flex flex-col shadow-sm">
                                {/* Icon */}
                                <div className="w-14 h-14 flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {serviceIcons[service.id]}
                                </div>

                                {/* Title */}
                                <h3 className="text-slate-900 dark:text-white font-frantz font-black mb-6 uppercase tracking-wide text-3xl md:text-4xl leading-none origin-left inline-block w-full" style={{ fontVariationSettings: "'wght' 900", transform: 'scaleX(1.15)' }}>
                                    {service.title}
                                </h3>

                                {/* Description - fixed height with line clamp */}
                                <p
                                    className="text-slate-600 dark:text-dark-400 mb-6 leading-relaxed line-clamp-3"
                                    style={{ minHeight: '4.5rem' }}
                                >
                                    {service.description}
                                </p>

                                {/* Features - pushed to bottom */}
                                <ul className="space-y-2 mt-auto">
                                    {service.features.slice(0, 3).map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-sm text-slate-500 dark:text-dark-300 group/item">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
                                            <span className="truncate">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
