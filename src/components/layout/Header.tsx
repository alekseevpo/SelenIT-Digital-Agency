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
    { href: `/${lang}/about`, label: 'about', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0 2 2 0 014 0z' },
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
        x: '-100%',
        opacity: 0.6,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: 'spring' as const,
            stiffness: 380,
            damping: 38,
            staggerChildren: 0.04,
            delayChildren: 0.08,
        },
    },
    exit: {
        x: '-100%',
        opacity: 0.6,
        transition: {
            duration: 0.22,
        },
    },
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
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false);
    const pathname = usePathname();

    const navigations: Record<Locale, Dictionary['common']['nav'] & { menu: string }> = {
        en: { home: 'Home', services: 'Services', showreel: 'Showreel', about: 'About', contact: 'Contact', getStarted: 'Get Started', privacy: 'Privacy', terms: 'Terms', menu: 'Menu' },
        ru: { home: 'Главная', services: 'Услуги', showreel: 'Шоурилс', about: 'О нас', contact: 'Контакты', getStarted: 'Начать', privacy: 'Приватность', terms: 'Условия', menu: 'Меню' },
        es: { home: 'Inicio', services: 'Servicios', showreel: 'Showreel', about: 'Nosotros', contact: 'Contacto', getStarted: 'Empezar', privacy: 'Privacidad', terms: 'Términos', menu: 'Menú' }
    };

    const dict = navigations[lang] || navigations.en;
    const navLinks = getNavLinks(lang);

    const servicesSubLinks = [
        {
            href: `/${lang}/services/branding`,
            label: lang === 'ru' ? 'Брендинг' : lang === 'es' ? 'Branding' : 'Branding',
            description: lang === 'ru' ? 'Логотипы, фирменный стиль и позиционирование' : lang === 'es' ? 'Logos, identidad visual y posicionamiento' : 'Logos, visual identity and positioning',
        },
        {
            href: `/${lang}/services/websites`,
            label: lang === 'ru' ? 'Веб-сайты' : lang === 'es' ? 'Sitios Web' : 'Websites',
            description: lang === 'ru' ? 'Современные сайты и интерфейсы' : lang === 'es' ? 'Sitios web e interfaces modernas' : 'Modern websites and interfaces',
        },
        {
            href: `/${lang}/services/seo`,
            label: 'SEO',
            description: lang === 'ru' ? 'Поисковая оптимизация и продвижение' : lang === 'es' ? 'Optimización y posicionamiento web' : 'Search optimization and promotion',
        },
        {
            href: `/${lang}/services/custom`,
            label: lang === 'ru' ? 'Поддержка' : lang === 'es' ? 'Soporte' : 'Support',
            description: lang === 'ru' ? 'Техподдержка и развитие проектов' : lang === 'es' ? 'Soporte técnico y desarrollo' : 'Technical support and development',
        },
        {
            href: `/${lang}/services/solutions`,
            label: lang === 'ru' ? 'Комплексные решения' : lang === 'es' ? 'Soluciones Digitales Integrales' : 'Integrated Digital Solutions',
            description: lang === 'ru' ? 'Полный цикл цифровых решений' : lang === 'es' ? 'Ciclo completo de soluciones digitales' : 'Full-cycle digital solutions',
        },
    ];

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

    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isMobileMenuOpen]);

    const closeMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
    }, []);

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 pointer-events-none py-1 sm:py-3 transition-all duration-500`}>
                <div className="max-w-full flex items-center justify-between px-4 sm:px-10 lg:px-12 relative">
                    {/* Logo - Top Left */}
                    <div className={`pointer-events-auto transition-all duration-500 ${isScrolled ? '-translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
                        <Link href={`/${lang}`} className="group">
                            <Logo size={42} showText={true} className="sm:scale-[1.65] sm:origin-left" />
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
                                const isServices = link.label === 'services';

                                if (isServices) {
                                    return (
                                        <div
                                            key={link.href}
                                            className="relative"
                                            onMouseEnter={() => setIsDesktopServicesOpen(true)}
                                            onMouseLeave={() => setIsDesktopServicesOpen(false)}
                                        >
                                            <Link
                                                href={link.href}
                                                className={`
                                                    px-5 py-2.5 rounded-full text-sm font-medium
                                                    transition-colors duration-500 relative focus:outline-none flex items-center gap-1
                                                    ${isActive
                                                        ? 'text-red-600 dark:text-red-500 group/active overflow-hidden'
                                                        : 'text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-600/5 dark:hover:bg-red-600/10'
                                                    }
                                                `}
                                            >
                                                {isActive && (
                                                    <>
                                                        <motion.div
                                                            layoutId="activeTabOutline"
                                                            className="absolute inset-0 border-2 border-red-600 dark:border-red-500 rounded-full -z-10 shadow-[0_0_12px_rgba(220,38,38,0.15)]"
                                                            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                                        />
                                                        <div className="absolute inset-[2px] bg-red-600 dark:bg-red-500 rounded-full -z-10 scale-y-0 origin-bottom group-hover/active:scale-y-100 transition-transform duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)]" />
                                                        <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover/active:opacity-100 transition-opacity duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)] z-10">
                                                            {dict[link.label]}
                                                        </span>
                                                    </>
                                                )}
                                                <span className={isActive ? "opacity-100 group-hover/active:opacity-0 transition-opacity duration-500" : ""}>
                                                    {dict[link.label]}
                                                </span>
                                                <svg
                                                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isDesktopServicesOpen ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </Link>

                                            {/* Services Dropdown */}
                                            <AnimatePresence>
                                                {isDesktopServicesOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                                        className="fixed top-[50px] left-0 right-0 mx-auto w-[900px] z-50"
                                                    >
                                                        <div className="grid grid-cols-5 gap-2 px-0 py-4 rounded-2xl backdrop-blur-2xl bg-cream-50/95 dark:bg-dark-900/95 border border-white/20 dark:border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.15)] -ml-[392px]">
                                                            {servicesSubLinks.map((subLink, index) => (
                                                                <motion.div
                                                                    key={subLink.href}
                                                                    initial={{ opacity: 0, y: 10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                                                >
                                                                    <Link
                                                                        href={subLink.href}
                                                                        className="block p-5 rounded-xl text-center"
                                                                    >
                                                                        <h4 className="text-4xl font-frantz font-black text-red-600 dark:text-red-500 mb-2 uppercase tracking-wide">
                                                                            {subLink.label}
                                                                        </h4>
                                                                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                                                            {subLink.description}
                                                                        </p>
                                                                    </Link>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                }

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`
                                            px-5 py-2.5 rounded-full text-sm font-medium
                                            transition-colors duration-500 relative focus:outline-none
                                            ${isActive
                                                ? 'text-red-600 dark:text-red-500 group/active overflow-hidden'
                                                : 'text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-600/5 dark:hover:bg-red-600/10'
                                            }
                                        `}
                                    >
                                        {isActive && (
                                            <>
                                                <motion.div
                                                    layoutId="activeTabOutline"
                                                    className="absolute inset-0 border-2 border-red-600 dark:border-red-500 rounded-full -z-10 shadow-[0_0_12px_rgba(220,38,38,0.15)]"
                                                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                                />
                                                <div className="absolute inset-[2px] bg-red-600 dark:bg-red-500 rounded-full -z-10 scale-y-0 origin-bottom group-hover/active:scale-y-100 transition-transform duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)]" />
                                                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover/active:opacity-100 transition-opacity duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)] z-10">
                                                    {dict[link.label]}
                                                </span>
                                            </>
                                        )}
                                        <span className={isActive ? "opacity-100 group-hover/active:opacity-0 transition-opacity duration-500" : ""}>
                                            {dict[link.label]}
                                        </span>
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
                        className={`hidden md:flex items-center gap-2 pointer-events-auto transition-all duration-500 ${isScrolled ? '-translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
                    >
                        <div className="backdrop-blur-2xl bg-cream-50/10 dark:bg-cream-50/5 p-1.5 rounded-full flex items-center gap-1 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                            <LanguageSwitcher currentLang={lang} />
                        </div>
                        <div className="backdrop-blur-2xl bg-cream-50/10 dark:bg-cream-50/5 border border-white/20 dark:border-white/10 p-1.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                            <ThemeToggle />
                        </div>
                    </motion.div>

                    {/* Mobile Controls - Top Right */}
                    <div className={`md:hidden flex items-center gap-2 pointer-events-auto transition-all duration-500 ${isScrolled ? '-translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
                        <div className="backdrop-blur-2xl bg-cream-50/10 dark:bg-cream-50/5 border border-white/20 dark:border-white/10 p-1.5 rounded-full">
                            <ThemeToggle />
                        </div>
                        <motion.button
                            onClick={() => setIsMobileMenuOpen((v) => !v)}
                            className="pointer-events-auto backdrop-blur-2xl bg-cream-50/10 dark:bg-cream-50/5 border border-white/20 dark:border-white/10 w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 hover:bg-cream-50/20 dark:hover:bg-cream-50/10 focus:outline-none"
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            whileTap={{ scale: 0.9 }}
                        >
                            <div className="w-5 h-5 relative flex flex-col justify-between">
                                <motion.div
                                    className="w-5 h-0.5 rounded-full bg-red-600"
                                    animate={{
                                        y: isMobileMenuOpen ? 8 : 0,
                                        rotate: isMobileMenuOpen ? 45 : 0,
                                    }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                />
                                <motion.div
                                    className="w-5 h-0.5 rounded-full bg-red-600"
                                    animate={{
                                        opacity: isMobileMenuOpen ? 0 : 1,
                                        scaleX: isMobileMenuOpen ? 0 : 1,
                                    }}
                                    transition={{ duration: 0.2 }}
                                />
                                <motion.div
                                    className="w-5 h-0.5 rounded-full bg-red-600"
                                    animate={{
                                        y: isMobileMenuOpen ? -8 : 0,
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
                        className="fixed inset-0 z-[60] flex items-stretch justify-start bg-black/10 dark:bg-black/40 backdrop-blur-sm md:hidden"
                        onClick={closeMenu}
                    >
                        <motion.div
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="h-full w-[86vw] max-w-sm p-5 relative overflow-hidden bg-cream-50/98 dark:bg-slate-900/98 backdrop-blur-md border-r border-slate-200/60 dark:border-white/10 shadow-2xl shadow-black/10 dark:shadow-black/30"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative gradient */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-orange-500/10 to-green-500/10 dark:from-primary-500/10 dark:to-accent-500/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-green-500/10 to-orange-500/10 dark:from-accent-500/10 dark:to-primary-500/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative z-10 h-full flex flex-col">
                                {/* Header */}
                                <motion.div
                                    className="flex justify-between items-center mb-5"
                                    variants={itemVariants}
                                >
                                    <h2 className="text-base font-bold text-slate-900 dark:text-white">{dict.menu}</h2>
                                    <motion.button
                                        onClick={closeMenu}
                                        className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-cream-50/10 rounded-full transition-colors"
                                        aria-label="Close menu"
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
                                <ul className="flex flex-col gap-1.5 flex-1 overflow-auto pr-1">
                                    {navLinks.map((link) => {
                                        const isActive = pathname === link.href;
                                        const isServices = link.label === 'services';
                                        return (
                                            <motion.li
                                                key={link.href}
                                                variants={itemVariants}
                                            >
                                                <div>
                                                    <div
                                                        className={`
                                                            w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold
                                                            transition-all duration-200
                                                            ${isActive
                                                                ? 'border-2 border-red-600 dark:border-red-500 text-red-600 dark:text-red-500 bg-red-600/5 shadow-sm'
                                                                : 'bg-cream-200/80 dark:bg-cream-50/5 hover:bg-cream-200 dark:hover:bg-cream-50/10 text-slate-700 dark:text-slate-200 border-2 border-transparent'
                                                            }
                                                        `}
                                                    >
                                                        <Link
                                                            href={link.href}
                                                            className="flex items-center gap-3 flex-1 min-w-0"
                                                            onClick={closeMenu}
                                                        >
                                                            <svg
                                                                className={`w-5 h-5 ${isActive ? 'text-red-600 dark:text-red-500' : 'text-slate-400 dark:text-slate-500'}`}
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={1.5}
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                                                            </svg>
                                                            <span className="truncate">{dict[link.label]}</span>
                                                        </Link>

                                                        {isServices ? (
                                                            <button
                                                                type="button"
                                                                className={`ml-1 w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'hover:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}
                                                                aria-label="Toggle services"
                                                                aria-expanded={isServicesOpen}
                                                                onClick={() => setIsServicesOpen((v) => !v)}
                                                            >
                                                                <motion.svg
                                                                    className={`w-4 h-4 ${isActive ? 'text-red-600 dark:text-red-500' : 'text-slate-500 dark:text-slate-400'}`}
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    strokeWidth={2}
                                                                    animate={{ rotate: isServicesOpen ? 180 : 0 }}
                                                                    transition={{ duration: 0.2 }}
                                                                >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                                </motion.svg>
                                                            </button>
                                                        ) : isActive ? (
                                                            <motion.div
                                                                className="ml-auto"
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                            >
                                                                <svg className="w-4 h-4 text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </motion.div>
                                                        ) : null}
                                                    </div>

                                                    {isServices && (
                                                        <AnimatePresence initial={false}>
                                                            {isServicesOpen && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.2 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="mt-2 pl-4">
                                                                        <div className="rounded-2xl bg-cream-200/60 dark:bg-cream-50/5 border border-slate-200/40 dark:border-white/10 p-2">
                                                                            {servicesSubLinks.map((sub) => {
                                                                                const isSubActive = pathname === sub.href;
                                                                                return (
                                                                                    <Link
                                                                                        key={sub.href}
                                                                                        href={sub.href}
                                                                                        onClick={closeMenu}
                                                                                        className={
                                                                                            `block px-3 py-2 rounded-xl text-sm font-semibold transition-colors ` +
                                                                                            (isSubActive
                                                                                                ? 'bg-red-600/10 text-red-600'
                                                                                                : 'text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10')
                                                                                        }
                                                                                    >
                                                                                        {sub.label}
                                                                                    </Link>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    )}
                                                </div>
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

                                <motion.div
                                    variants={footerVariants}
                                    className="mt-4"
                                >
                                    <Link
                                        href={`/${lang}/contact`}
                                        onClick={closeMenu}
                                        className="block w-full text-center px-5 py-3.5 rounded-2xl text-sm font-semibold text-white bg-red-600 shadow-lg shadow-red-600/20"
                                    >
                                        {dict.getStarted}
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
