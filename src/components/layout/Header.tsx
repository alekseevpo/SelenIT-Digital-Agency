'use client';

import { useState, useEffect } from 'react';
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

const getNavLinks = (lang: string): { href: string; label: NavLinkLabel }[] => [
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
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

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
                                bg-white/10 dark:bg-white/5
                                border border-white/20 dark:border-white/10
                                shadow-[0_8px_32px_rgba(0,0,0,0.08)]
                                dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                                transition-all duration-500
                                ${isScrolled ? 'bg-white/20 dark:bg-black/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]' : ''}
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
                                                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/30 dark:hover:bg-white/10'
                                            }
                                        `}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full -z-10 shadow-lg shadow-primary-500/30"
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
                        <div className="backdrop-blur-2xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 p-1.5 rounded-full flex items-center gap-1 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                            <LanguageSwitcher currentLang={lang} />
                        </div>
                        <div className="backdrop-blur-2xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 p-1.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                            <ThemeToggle />
                        </div>
                    </motion.div>

                    {/* Mobile Controls - Top Right */}
                    <div className="md:hidden flex items-center gap-2 pointer-events-auto">
                        <div className="backdrop-blur-2xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 p-1.5 rounded-full">
                            <ThemeToggle />
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="backdrop-blur-2xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 p-3 rounded-full flex flex-col gap-1.5 transition-all active:scale-90 hover:bg-white/20 dark:hover:bg-white/10"
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            <span className={`w-5 h-0.5 bg-slate-800 dark:bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`w-5 h-0.5 bg-slate-800 dark:bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`w-5 h-0.5 bg-slate-800 dark:bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
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
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/10 dark:bg-black/30 backdrop-blur-xl md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", bounce: 0.2 }}
                            className="w-full max-w-sm rounded-[2rem] p-6 relative overflow-hidden backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/30 dark:border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_70px_rgba(0,0,0,0.4)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative gradient */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full blur-3xl" />
                            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">{dict.menu}</h2>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <ul className="flex flex-col gap-2">
                                    {navLinks.map((link, index) => {
                                        const isActive = pathname === link.href;
                                        return (
                                            <motion.li
                                                key={link.href}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    className={`
                                                        w-full block px-5 py-4 rounded-2xl text-base font-semibold
                                                        transition-all duration-300
                                                        ${isActive
                                                            ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                                                            : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200'
                                                        }
                                                    `}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {dict[link.label]}
                                                </Link>
                                            </motion.li>
                                        );
                                    })}
                                </ul>

                                <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{lang}</span>
                                    <LanguageSwitcher currentLang={lang} />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
