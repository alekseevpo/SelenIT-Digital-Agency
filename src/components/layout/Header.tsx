'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { Logo } from '../ui/Logo';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/types/dictionary';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
    lang: Locale;
}

type NavLinkLabel = keyof Dictionary['common']['nav'];

const getNavLinks = (lang: string): { href: string; label: NavLinkLabel; icon: string }[] => [
    { href: `/${lang}`, label: 'home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: `/${lang}/services`, label: 'services', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
    { href: `/${lang}/showreel`, label: 'showreel', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { href: `/${lang}/about`, label: 'about', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { href: `/${lang}/contact`, label: 'contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
];

// Animation variants
const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.2 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2, delay: 0.1 }
    }
};

const menuVariants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: -20
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 25,
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: -10,
        transition: {
            duration: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 25
        }
    },
    exit: { opacity: 0, x: -10 }
};

const footerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { delay: 0.3, duration: 0.3 }
    }
};

export default function Header({ lang }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navigations: Record<Locale, Dictionary['common']['nav'] & { menu: string }> = {
        en: { home: 'Home', services: 'Services', showreel: 'Showreel', about: 'About', contact: 'Contact', getStarted: 'Get Started', privacy: 'Privacy', terms: 'Terms', menu: 'Menu' },
        ru: { home: 'Главная', services: 'Услуги', showreel: 'Шоурил', about: 'О нас', contact: 'Контакты', getStarted: 'Начать', privacy: 'Приватность', terms: 'Условия', menu: 'Меню' },
        es: { home: 'Inicio', services: 'Servicios', showreel: 'Showreel', about: 'Nosotros', contact: 'Contacto', getStarted: 'Empezar', privacy: 'Privacidad', terms: 'Términos', menu: 'Menú' }
    };

    const dict = navigations[lang] || navigations.en;
    const navLinks = getNavLinks(lang);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            // Save current scroll position
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
        } else {
            // Restore scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const closeMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 pointer-events-none py-4 sm:py-6 transition-all duration-300 ${isScrolled ? 'top-2' : 'top-0'}`}>
                <div className="container-custom flex items-center justify-between px-4 sm:px-6 lg:px-8 relative">
                    {/* Logo - Top Left */}
                    <div className="pointer-events-auto">
                        <Link href={`/${lang}`} className="group">
                            <Logo size={56} showText={true} />
                        </Link>
                    </div>

                    {/* Desktop Navigation Pill - Centered */}
                    <nav className="absolute left-1/2 -translate-x-1/2 hidden md:block pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className={`
                                px-1.5 py-1.5 rounded-full flex items-center gap-0.5
                                backdrop-blur-2xl
                                bg-cream-50/10 dark:bg-cream-50/5
                                border border-white/20 dark:border-white/10
                                shadow-[0_8px_32px_rgba(0,0,0,0.08)]
                                dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                                transition-all duration-500
                                ${isScrolled ? 'bg-cream-50/20 dark:bg-black/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]' : ''}
                            `}
                        >
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`
                                            px-5 py-2.5 rounded-full text-sm font-medium
                                            transition-all duration-300 relative
                                            ${isActive
                                                ? 'text-white'
                                                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-cream-50/30 dark:hover:bg-cream-50/10'
                                            }
                                        `}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-gradient-to-r from-orange-500 to-green-500 dark:from-primary-500 dark:to-accent-500 rounded-full -z-10 shadow-lg shadow-orange-500/30 dark:shadow-primary-500/30"
                                                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                            />
                                        )}
                                        {dict[link.label]}
                                    </Link>
                                );
                            })}
                        </motion.div>
                    </nav>

                    {/* Desktop Utility Controls - Top Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="hidden md:flex items-center gap-2 pointer-events-auto"
                    >
                        <div className="backdrop-blur-2xl bg-cream-50/10 dark:bg-cream-50/5 border border-white/20 dark:border-white/10 p-1.5 rounded-full flex items-center gap-1 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                            <LanguageSwitcher currentLang={lang} />
                        </div>
                        <div className="backdrop-blur-2xl bg-cream-50/10 dark:bg-cream-50/5 border border-white/20 dark:border-white/10 p-1.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                            <ThemeToggle />
                        </div>
                    </motion.div>

                    {/* Mobile Controls - Top Right */}
                    <div className="md:hidden flex items-center gap-2 pointer-events-auto">
                        <div className="backdrop-blur-2xl bg-cream-50/10 dark:bg-cream-50/5 border border-white/20 dark:border-white/10 p-1.5 rounded-full">
                            <ThemeToggle />
                        </div>
                        <motion.button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="backdrop-blur-2xl bg-cream-50/10 dark:bg-cream-50/5 border border-white/20 dark:border-white/10 w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 hover:bg-cream-50/20 dark:hover:bg-cream-50/10"
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            whileTap={{ scale: 0.9 }}
                        >
                            <div className="w-5 h-5 relative">
                                <motion.span
                                    className="absolute left-0 w-5 h-0.5 bg-slate-800 dark:bg-cream-50 rounded-full"
                                    animate={{
                                        top: isMobileMenuOpen ? '10px' : '4px',
                                        rotate: isMobileMenuOpen ? 45 : 0,
                                    }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                />
                                <motion.span
                                    className="absolute left-0 top-[10px] w-5 h-0.5 bg-slate-800 dark:bg-cream-50 rounded-full"
                                    animate={{
                                        opacity: isMobileMenuOpen ? 0 : 1,
                                        scaleX: isMobileMenuOpen ? 0 : 1,
                                    }}
                                    transition={{ duration: 0.2 }}
                                />
                                <motion.span
                                    className="absolute left-0 w-5 h-0.5 bg-slate-800 dark:bg-cream-50 rounded-full"
                                    animate={{
                                        top: isMobileMenuOpen ? '10px' : '16px',
                                        rotate: isMobileMenuOpen ? -45 : 0,
                                    }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                />
                            </div>
                        </motion.button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4 bg-black/5 dark:bg-black/20 backdrop-blur-sm md:hidden"
                        onClick={closeMenu}
                    >
                        <motion.div
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-full max-w-sm rounded-3xl p-5 relative overflow-hidden bg-cream-50/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/50 dark:border-white/10 shadow-2xl shadow-black/10 dark:shadow-black/30"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative gradient */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-orange-500/10 to-green-500/10 dark:from-primary-500/10 dark:to-accent-500/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-green-500/10 to-orange-500/10 dark:from-accent-500/10 dark:to-primary-500/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative z-10">
                                {/* Header */}
                                <motion.div
                                    className="flex justify-between items-center mb-5"
                                    variants={itemVariants}
                                >
                                    <h2 className="text-base font-bold text-slate-900 dark:text-white">{dict.menu}</h2>
                                    <motion.button
                                        onClick={closeMenu}
                                        className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-cream-50/10 rounded-full transition-colors"
                                        whileHover={{ rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <svg className="w-5 h-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </motion.button>
                                </motion.div>

                                {/* Navigation Links */}
                                <ul className="flex flex-col gap-1.5">
                                    {navLinks.map((link) => {
                                        const isActive = pathname === link.href;
                                        return (
                                            <motion.li
                                                key={link.href}
                                                variants={itemVariants}
                                            >
                                                <Link
                                                    href={link.href}
                                                    className={`
                                                        w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold
                                                        transition-all duration-200
                                                        ${isActive
                                                            ? 'bg-gradient-to-r from-orange-500 to-green-500 dark:from-primary-500 dark:to-accent-500 text-white shadow-lg shadow-orange-500/20 dark:shadow-primary-500/20'
                                                            : 'bg-cream-200/80 dark:bg-cream-50/5 hover:bg-cream-200 dark:hover:bg-cream-50/10 text-slate-700 dark:text-slate-200'
                                                        }
                                                    `}
                                                    onClick={closeMenu}
                                                >
                                                    <svg
                                                        className={`w-5 h-5 ${isActive ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'}`}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={1.5}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                                                    </svg>
                                                    {dict[link.label]}
                                                    {isActive && (
                                                        <motion.div
                                                            className="ml-auto"
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                        >
                                                            <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </motion.div>
                                                    )}
                                                </Link>
                                            </motion.li>
                                        );
                                    })}
                                </ul>

                                {/* Footer */}
                                <motion.div
                                    variants={footerVariants}
                                    className="mt-5 pt-4 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between"
                                >
                                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                        {lang === 'ru' ? 'Язык' : lang === 'es' ? 'Idioma' : 'Language'}
                                    </span>
                                    <LanguageSwitcher currentLang={lang} />
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
