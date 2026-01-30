'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

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
        <section className="relative min-h-screen flex items-center">
            <div className="container-custom px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
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
                        <span className="text-sm text-slate-600 dark:text-dark-300">{dict.badge}</span>
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
                        className="text-body max-w-2xl mx-auto mb-10 transition-colors"
                    >
                        {dict.subtitle}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link href={`/${lang}/contact`} className="btn-primary text-lg px-8 py-4 w-[280px] text-center">
                            {dict.ctaPrimary}
                        </Link>
                        <Link href={`/${lang}/showreel`} className="btn-secondary text-lg px-8 py-4 w-[280px] flex items-center justify-center gap-2">
                            {dict.ctaSecondary}
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                            { value: '150+', label: lang === 'ru' ? 'Проектов' : lang === 'es' ? 'Proyectos' : 'Projects' },
                            { value: '50+', label: lang === 'ru' ? 'Клиентов' : lang === 'es' ? 'Clientes' : 'Clients' },
                            { value: '8+', label: lang === 'ru' ? 'Лет' : lang === 'es' ? 'Años' : 'Years' },
                            { value: '99%', label: lang === 'ru' ? 'Удовлетворенность' : lang === 'es' ? 'Satisfacción' : 'Satisfaction' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    viewport={{ once: true }}
                                    className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2"
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="text-slate-600 dark:text-dark-400 text-sm font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
                >
                    <div className="w-6 h-10 rounded-full border-2 border-slate-400 dark:border-dark-600 flex justify-center pt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 dark:bg-primary-500 animate-pulse" />
                    </div>
                </motion.div>
            </div>
        </section >
    );
}
