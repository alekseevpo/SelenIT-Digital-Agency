'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Briefcase, FolderOpen, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function NotFound() {
    const pathname = usePathname();
    const lang = pathname?.split('/')[1] || 'en';

    const content = {
        en: {
            title: 'Page Not Found',
            subtitle: "The page you're looking for doesn't exist or has been moved.",
            goHome: 'Go Home',
            links: {
                services: 'Our Services',
                showreel: 'Portfolio',
                contact: 'Contact Us',
            },
        },
        ru: {
            title: 'Страница не найдена',
            subtitle: 'Страница, которую вы ищете, не существует или была перемещена.',
            goHome: 'На главную',
            links: {
                services: 'Наши услуги',
                showreel: 'Портфолио',
                contact: 'Связаться',
            },
        },
        es: {
            title: 'Página no encontrada',
            subtitle: 'La página que buscas no existe o ha sido movida.',
            goHome: 'Ir al inicio',
            links: {
                services: 'Nuestros servicios',
                showreel: 'Portafolio',
                contact: 'Contactar',
            },
        },
    };

    const dict = content[lang as keyof typeof content] || content.en;

    const quickLinks = [
        { href: `/${lang}`, icon: Home, label: dict.goHome },
        { href: `/${lang}/services`, icon: Briefcase, label: dict.links.services },
        { href: `/${lang}/showreel`, icon: FolderOpen, label: dict.links.showreel },
        { href: `/${lang}/contact`, icon: Mail, label: dict.links.contact },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-cream-50 dark:bg-dark-950 transition-colors duration-300 px-4">
            <div className="text-center max-w-2xl mx-auto">
                {/* Animated 404 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        type: 'spring',
                        stiffness: 100,
                    }}
                    className="relative mb-8"
                >
                    <h1 className="text-[150px] sm:text-[200px] font-bold gradient-text leading-none select-none">
                        404
                    </h1>
                    {/* Glitch effect layers */}
                    <motion.span
                        className="absolute inset-0 text-[150px] sm:text-[200px] font-bold text-orange-500/20 dark:text-primary-500/20 leading-none select-none"
                        animate={{
                            x: [0, -5, 5, -5, 0],
                            opacity: [0, 1, 0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                        }}
                    >
                        404
                    </motion.span>
                    <motion.span
                        className="absolute inset-0 text-[150px] sm:text-[200px] font-bold text-cyan-500/20 leading-none select-none"
                        animate={{
                            x: [0, 5, -5, 5, 0],
                            opacity: [0, 1, 0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            delay: 0.1,
                        }}
                    >
                        404
                    </motion.span>
                </motion.div>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4"
                >
                    {dict.title}
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-slate-600 dark:text-dark-400 mb-10 max-w-md mx-auto text-lg"
                >
                    {dict.subtitle}
                </motion.p>

                {/* Quick Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                    {quickLinks.map((link, index) => (
                        <motion.div
                            key={link.href}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href={link.href}
                                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 hover:border-orange-500 dark:hover:border-primary-500 transition-colors duration-200 group"
                            >
                                <link.icon className="w-6 h-6 text-slate-600 dark:text-dark-400 group-hover:text-orange-500 dark:group-hover:text-primary-500 transition-colors" />
                                <span className="text-sm font-medium text-slate-700 dark:text-dark-300 group-hover:text-orange-500 dark:group-hover:text-primary-500 transition-colors">
                                    {link.label}
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                    className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-orange-500/10 dark:bg-primary-500/10 blur-xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-cyan-500/10 blur-xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: 1,
                    }}
                />
            </div>
        </div>
    );
}
