'use client';

import Link from 'next/link';
import { motion, Variants, useInView, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface HeroProps {
    dict: {
        badge: string;
        title1: string;
        titleGradient: string;
        title2: string;
        subtitle: string;
        ctaPrimary: string;
        ctaSecondary: string;
    };
    lang: string;
}

// Counter sub-component for animated statistics
function Counter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView && ref.current) {
            const controls = animate(0, value, {
                duration: duration,
                ease: "easeOut",
                onUpdate: (latest) => {
                    if (ref.current) {
                        ref.current.textContent = Math.floor(latest) + suffix;
                    }
                }
            });
            return () => controls.stop();
        }
    }, [isInView, value, duration, suffix]);

    return (
        <span ref={ref} className="tabular-nums">
            0{suffix}
        </span>
    );
}

export default function Hero({ dict, lang }: HeroProps) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden hidden md:block">
                <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-primary-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-secondary-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="container-custom px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Badge */}
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-slate-200 dark:border-dark-700/50 backdrop-blur-sm mb-8 shadow-sm"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm text-slate-600 dark:text-dark-300 font-medium">{dict.badge}</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        variants={itemVariants}
                        className="heading-1 mb-6 text-slate-900 dark:text-white"
                    >
                        {dict.title1}{' '}
                        <span className="gradient-text">{dict.titleGradient}</span>{' '}
                        {dict.title2}
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        variants={itemVariants}
                        className="text-body max-w-2xl mx-auto mb-10 transition-colors opacity-80"
                    >
                        {dict.subtitle}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link href={`/${lang}/contact`} className="btn-primary text-lg px-8 py-4 w-full sm:w-[280px] text-center shadow-lg shadow-primary-500/20">
                            {dict.ctaPrimary}
                        </Link>
                        <Link href={`/${lang}/showreel`} className="btn-secondary text-lg px-8 py-4 w-full sm:w-[280px] flex items-center justify-center gap-2 group">
                            {dict.ctaSecondary}
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        variants={itemVariants as any}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 pt-12 border-t border-slate-200 dark:border-dark-800"
                    >
                        {[
                            { target: 150, suffix: '+', label: lang === 'ru' ? 'Проектов' : lang === 'es' ? 'Proyectos' : 'Projects' },
                            { target: 50, suffix: '+', label: lang === 'ru' ? 'Клиентов' : lang === 'es' ? 'Clientes' : 'Clients' },
                            { target: 8, suffix: '+', label: lang === 'ru' ? 'Лет' : lang === 'es' ? 'Años' : 'Years' },
                            { target: 99, suffix: '%', label: lang === 'ru' ? 'Удовлетворенность' : lang === 'es' ? 'Satisfacción' : 'Satisfaction' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center group/stat">
                                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 group-hover/stat:text-primary-500 transition-colors duration-300">
                                    <Counter value={stat.target} suffix={stat.suffix} />
                                </div>
                                <div className="text-slate-500 dark:text-dark-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator Removed */}
            </div>
        </section >
    );
}
