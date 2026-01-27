'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import type { Locale } from '@/i18n-config';

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

    // We would normally fetch the dictionary here, but since this is a Client Component 
    // and we want it to be fast, we can pass labels or just use a simpler map for nav.
    // For this implementation, I'll use a local mapping for nav terms to keep it simple and reactive.

    const navigations: Record<string, any> = {
        en: { home: 'Home', services: 'Services', showreel: 'Showreel', about: 'About', contact: 'Contact', getStarted: 'Get Started' },
        ru: { home: 'Главная', services: 'Услуги', showreel: 'Шоурил', about: 'О нас', contact: 'Контакты', getStarted: 'Начать' },
        es: { home: 'Inicio', services: 'Servicios', showreel: 'Showreel', about: 'Nosotros', contact: 'Contacto', getStarted: 'Empezar' }
    };

    const dict = navigations[lang] || navigations.en;
    const navLinks = getNavLinks(lang);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-dark-700/50 py-4 shadow-sm'
                : 'bg-transparent py-6'
                }`}
        >
            <nav className="container-custom flex items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href={`/${lang}`} className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center font-bold text-white text-xl transition-transform group-hover:scale-110">
                        S
                    </div>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                        Selen.<span className="text-primary-400">IT</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="text-slate-600 dark:text-dark-300 hover:text-primary-500 dark:hover:text-white transition-colors duration-300 font-medium link-underline"
                            >
                                {dict[link.label]}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Actions (Toggles & CTA) */}
                <div className="hidden md:flex items-center gap-6">
                    <LanguageSwitcher currentLang={lang} />
                    <ThemeToggle />
                    <Link href={`/${lang}/contact`} className="btn-primary">
                        {dict.getStarted}
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`w-6 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                            }`}
                    />
                    <span
                        className={`w-6 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''
                            }`}
                    />
                    <span
                        className={`w-6 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}
                    />
                </button>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-dark-700/50 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            >
                <ul className="flex flex-col p-6 gap-4">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="block text-slate-700 dark:text-dark-300 hover:text-primary-500 dark:hover:text-white transition-colors duration-300 font-medium text-lg py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {dict[link.label]}
                            </Link>
                        </li>
                    ))}
                    <li className="pt-4 flex flex-col gap-6">
                        <div className="flex items-center justify-between px-2">
                            <LanguageSwitcher currentLang={lang} />
                            <ThemeToggle />
                        </div>
                        <Link
                            href={`/${lang}/contact`}
                            className="btn-primary inline-block text-center w-full"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {dict.getStarted}
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
