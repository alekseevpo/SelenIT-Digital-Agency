'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import type { Locale } from '@/i18n-config';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
    lang: Locale;
}

const getNavLinks = (lang: string) => [
    { href: `/${lang}`, label: 'home' },
    { href: `/${lang}/services`, label: 'services' },
    { href: `/${lang}/showreel`, label: 'showreel' },
    { href: `/${lang}/about`, label: 'about' },
    { href: `/${lang}/contact`, label: 'contact' },
];

export default function Header({ lang }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navigations: Record<string, any> = {
        en: { home: 'Home', services: 'Services', showreel: 'Showreel', about: 'About', contact: 'Contact', getStarted: 'Get Started', menu: 'Menu' },
        ru: { home: 'Главная', services: 'Услуги', showreel: 'Шоурил', about: 'О нас', contact: 'Контакты', getStarted: 'Начать', menu: 'Меню' },
        es: { home: 'Inicio', services: 'Servicios', showreel: 'Showreel', about: 'Nosotros', contact: 'Contacto', getStarted: 'Empezar', menu: 'Menú' }
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
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none py-4 sm:py-6">
                <div className="container-custom flex items-center justify-between px-4 sm:px-6 lg:px-8 relative">
                    {/* Logo - Top Left */}
                    <div className="pointer-events-auto">
                        <Link href={`/${lang}`} className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center font-bold text-white text-xl transition-transform group-hover:scale-110 shadow-lg shadow-primary-500/20">
                                S
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white hidden sm:block">
                                Selen.<span className="text-primary-400">IT</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Pill - Centered */}
                    <nav className="absolute left-1/2 -translate-x-1/2 hidden md:block pointer-events-auto">
                        <motion.div
                            initial={false}
                            animate={{
                                y: isScrolled ? 0 : 0,
                                scale: 1
                            }}
                            className="glass px-2 py-2 rounded-full flex items-center gap-1 shadow-lg shadow-black/5"
                        >
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative ${isActive
                                            ? 'text-white'
                                            : 'text-slate-600 dark:text-dark-300 hover:text-slate-900 dark:hover:text-white'
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-primary-500 rounded-full -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        {dict[link.label]}
                                    </Link>
                                );
                            })}
                        </motion.div>
                    </nav>

                    {/* Desktop Utility Controls - Top Right */}
                    <div className="hidden md:flex items-center gap-3 pointer-events-auto">
                        <div className="glass p-1 rounded-xl flex items-center gap-1">
                            <LanguageSwitcher currentLang={lang} />
                        </div>
                        <div className="glass p-1 rounded-xl">
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Controls - Top Right */}
                    <div className="md:hidden flex items-center gap-2 pointer-events-auto">
                        <div className="glass p-1 rounded-lg">
                            <ThemeToggle />
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="glass p-2.5 rounded-lg flex flex-col gap-1.5 transition-all active:scale-90"
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            <span className={`w-5 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`w-5 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`w-5 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/20 dark:bg-black/40 backdrop-blur-md md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="glass w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{dict.menu}</h2>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-dark-800 rounded-full transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <ul className="flex flex-col gap-3">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className={`w-full block p-5 rounded-2xl text-lg font-semibold transition-all duration-300 ${isActive
                                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                                                    : 'bg-white/50 dark:bg-dark-800/50 hover:bg-white dark:hover:bg-dark-800 text-slate-800 dark:text-dark-200'
                                                    }`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {dict[link.label]}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="mt-10 pt-8 border-t border-slate-200 dark:border-dark-700 flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-500">{lang.toUpperCase()}</span>
                                <LanguageSwitcher currentLang={lang} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
