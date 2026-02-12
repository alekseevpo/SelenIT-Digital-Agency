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
    dict: Dictionary;
}

type NavLinkLabel = keyof Dictionary['common']['nav'];

const getNavLinks = (lang: string): { href: string; label: NavLinkLabel; icon: string }[] => [
    {
        href: `/${lang}`,
        label: 'home',
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
        href: `/${lang}/services`,
        label: 'services',
        icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    },
    {
        href: `/${lang}/showreel`,
        label: 'showreel',
        icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
        href: `/${lang}/about`,
        label: 'about',
        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0 2 2 0 014 0z',
    },
    {
        href: `/${lang}/contact`,
        label: 'contact',
        icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
];

// Animation variants
const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6 },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.4, delay: 0.1 },
    },
};

const menuVariants = {
    hidden: {
        x: '100%',
        opacity: 1,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: 'spring' as const,
            stiffness: 60,
            damping: 15,
            staggerChildren: 0.12,
            delayChildren: 0.25,
        },
    },
    exit: {
        x: '100%',
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: 'easeInOut' as const,
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
            type: 'spring' as const,
            stiffness: 120,
            damping: 15,
        },
    },
    exit: { opacity: 0, x: -10 },
};

const footerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { delay: 0.3, duration: 0.3 },
    },
};

export default function Header({ lang, dict }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false);
    const pathname = usePathname();
    const navDict = dict.common.nav;
    const headerDict = dict.common.header;
    const servicesMenu = dict.services.menuLinks;
    const navLinks = getNavLinks(lang);

    const servicesSubLinks = [
        {
            href: `/${lang}/services/branding`,
            label: servicesMenu.branding.label,
            description: servicesMenu.branding.description,
        },
        {
            href: `/${lang}/services/websites`,
            label: servicesMenu.websites.label,
            description: servicesMenu.websites.description,
        },
        {
            href: `/${lang}/services/seo`,
            label: servicesMenu.seo.label,
            description: servicesMenu.seo.description,
        },
        {
            href: `/${lang}/services/custom`,
            label: servicesMenu.custom.label,
            description: servicesMenu.custom.description,
        },
        {
            href: `/${lang}/services/solutions`,
            label: servicesMenu.solutions.label,
            description: servicesMenu.solutions.description,
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
            const scrollBarWidth = Math.max(
                0,
                window.innerWidth - document.documentElement.clientWidth,
            );
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = scrollBarWidth ? `${scrollBarWidth}px` : '';
        } else {
            // Restore scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
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

    useEffect(() => {
        closeMenu();
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }, [pathname, closeMenu]);

    return (
        <>
            {/* Mobile Language Bar */}
            <div className="md:hidden fixed top-4 left-0 right-0 z-50 px-4 py-2">
                <div className="flex justify-center">
                    <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-slate-200/30 dark:border-white/20 rounded-full p-1.5">
                        <LanguageSwitcher currentLang={lang} />
                    </div>
                </div>
            </div>

            <header
                className={`fixed top-0 left-0 right-0 z-50 pointer-events-none py-1 sm:py-3 md:pt-3 transition-all duration-500`}
            >
                <div className="max-w-full flex items-center justify-between px-4 sm:px-10 lg:px-12 relative">
                    {/* Logo - Top Left */}
                    <div
                        className={`pointer-events-auto transition-all duration-500 ${isScrolled ? '-translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
                    >
                        <Link href={`/${lang}`} className="group">
                            <Logo
                                size={42}
                                showText={true}
                                className="sm:scale-[1.65] sm:origin-left"
                            />
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
                                                    ${
                                                        isActive
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
                                                            transition={{
                                                                type: 'spring',
                                                                bounce: 0.25,
                                                                duration: 0.5,
                                                            }}
                                                        />
                                                        <div className="absolute inset-[2px] bg-red-600 dark:bg-red-500 rounded-full -z-10 scale-y-0 origin-bottom group-hover/active:scale-y-100 transition-transform duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)]" />
                                                        <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover/active:opacity-100 transition-opacity duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)] z-10">
                                                            {navDict[link.label]}
                                                        </span>
                                                    </>
                                                )}
                                                <span
                                                    className={
                                                        isActive
                                                            ? 'opacity-100 group-hover/active:opacity-0 transition-opacity duration-500'
                                                            : ''
                                                    }
                                                >
                                                    {navDict[link.label]}
                                                </span>
                                                <svg
                                                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isDesktopServicesOpen ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </Link>

                                            {/* Services Dropdown */}
                                            <AnimatePresence>
                                                {isDesktopServicesOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{
                                                            duration: 0.2,
                                                            ease: 'easeOut',
                                                        }}
                                                        className="fixed top-[50px] left-0 right-0 mx-auto w-[900px] z-50"
                                                    >
                                                        <div className="grid grid-cols-5 gap-2 px-0 py-4 rounded-2xl backdrop-blur-2xl bg-cream-50/95 dark:bg-dark-900/95 border border-white/20 dark:border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.15)] -ml-[392px]">
                                                            {servicesSubLinks.map(
                                                                (subLink, index) => (
                                                                    <motion.div
                                                                        key={subLink.href}
                                                                        initial={{
                                                                            opacity: 0,
                                                                            y: 10,
                                                                        }}
                                                                        animate={{
                                                                            opacity: 1,
                                                                            y: 0,
                                                                        }}
                                                                        transition={{
                                                                            duration: 0.2,
                                                                            delay: index * 0.05,
                                                                        }}
                                                                    >
                                                                        <Link
                                                                            href={subLink.href}
                                                                            className="block p-5 rounded-xl text-center"
                                                                        >
                                                                            <h4 className="text-4xl font-frantz font-black text-red-600 dark:text-red-500 mb-2 uppercase tracking-wide">
                                                                                {subLink.label}
                                                                            </h4>
                                                                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                                                                {
                                                                                    subLink.description
                                                                                }
                                                                            </p>
                                                                        </Link>
                                                                    </motion.div>
                                                                ),
                                                            )}
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
                                            ${
                                                isActive
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
                                                    transition={{
                                                        type: 'spring',
                                                        bounce: 0.25,
                                                        duration: 0.5,
                                                    }}
                                                />
                                                <div className="absolute inset-[2px] bg-red-600 dark:bg-red-500 rounded-full -z-10 scale-y-0 origin-bottom group-hover/active:scale-y-100 transition-transform duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)]" />
                                                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover/active:opacity-100 transition-opacity duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)] z-10">
                                                    {navDict[link.label]}
                                                </span>
                                            </>
                                        )}
                                        <span
                                            className={
                                                isActive
                                                    ? 'opacity-100 group-hover/active:opacity-0 transition-opacity duration-500'
                                                    : ''
                                            }
                                        >
                                            {navDict[link.label]}
                                        </span>
                                    </Link>
                                );
                            })}
                        </motion.div>
                    </nav>

                    {/* Desktop Utility Controls - Top Right */}
                    <div
                        className={`hidden md:flex items-center gap-2 pointer-events-auto transition-all duration-500 ${isScrolled ? '-translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex items-center gap-2"
                        >
                            <div className="backdrop-blur-2xl bg-cream-50/10 dark:bg-cream-50/5 p-1.5 rounded-full flex items-center gap-1 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                                <LanguageSwitcher currentLang={lang} />
                            </div>
                            <div className="backdrop-blur-2xl bg-cream-50/10 dark:bg-cream-50/5 border border-white/20 dark:border-white/10 p-1.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                                <ThemeToggle />
                            </div>
                        </motion.div>
                    </div>

                    {/* Mobile Controls - Top Right */}
                    <div
                        className={`md:hidden flex items-center gap-2 pointer-events-auto transition-all duration-500 mt-4`}
                    >
                        <div className="backdrop-blur-2xl bg-white/20 dark:bg-black/20 border border-slate-200/30 dark:border-white/20 rounded-full p-1.5">
                            <ThemeToggle />
                        </div>
                        <motion.button
                            onClick={() => setIsMobileMenuOpen((v) => !v)}
                            className="pointer-events-auto bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-slate-200/30 dark:border-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 hover:bg-white/30 dark:hover:bg-black/30 focus:outline-none"
                            aria-label={
                                isMobileMenuOpen ? headerDict.closeMenu : headerDict.openMenu
                            }
                            whileTap={{ scale: 0.9 }}
                        >
                            <div className="w-5 h-5 relative flex flex-col justify-between">
                                <motion.div
                                    className="w-5 h-0.5 rounded-full bg-red-600"
                                    animate={{
                                        y: isMobileMenuOpen ? 8 : 0,
                                        rotate: isMobileMenuOpen ? 45 : 0,
                                    }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
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
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
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
                        className="fixed inset-0 z-[60] md:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-cream-50/70 dark:bg-dark-950/70 backdrop-blur-2xl"
                            onClick={closeMenu}
                        />
                        <motion.div
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute inset-0 w-full h-full bg-cream-50/80 dark:bg-dark-950/80 backdrop-blur-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative z-10 h-full flex flex-col p-5 pt-8">
                                {/* Header */}
                                <motion.div
                                    className="flex justify-between items-center mb-8 mr-2"
                                    variants={itemVariants}
                                >
                                    <h2 className="text-7xl sm:text-8xl md:text-9xl lg:text-10xl font-bold text-slate-900 dark:text-white ml-4 relative">
                                        {headerDict.menu}
                                        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-500 -mb-2"></span>
                                    </h2>
                                    <motion.button
                                        onClick={closeMenu}
                                        className="flex items-center gap-2 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors -mt-7"
                                        aria-label={headerDict.closeMenu}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span className="text-[11px] tracking-wide">
                                            {headerDict.closeMenu}
                                        </span>
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </motion.button>
                                </motion.div>

                                {/* Navigation List */}
                                <div className="flex-1 overflow-y-auto py-4 mt-8">
                                    <div className="flex flex-col gap-4">
                                        {navLinks.map((link) => {
                                            const isActive = pathname === link.href;
                                            const isServices = link.label === 'services';

                                            return (
                                                <div key={link.href} className="rounded-2xl">
                                                    {!isServices ? (
                                                        <Link
                                                            href={link.href}
                                                            className={`group flex items-center justify-between px-4 py-3 transition-all duration-300 relative border-b border-slate-200/30 dark:border-white/10 ${
                                                                isActive
                                                                    ? 'text-red-600 dark:text-red-500'
                                                                    : 'text-slate-700 dark:text-slate-200'
                                                            }`}
                                                            onClick={closeMenu}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <span className="font-semibold text-base tracking-wide">
                                                                    {navDict[link.label]}
                                                                </span>
                                                            </div>
                                                            <span className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-red-600 to-red-500"></span>
                                                        </Link>
                                                    ) : (
                                                        <div className="relative">
                                                            <button
                                                                type="button"
                                                                className={`w-full flex items-center justify-between px-4 py-3 transition-all duration-300 relative border-b border-slate-200/30 dark:border-white/10 ${
                                                                    isServicesOpen || isActive
                                                                        ? 'text-red-600 dark:text-red-500'
                                                                        : 'text-slate-700 dark:text-slate-200'
                                                                }`}
                                                                onClick={() =>
                                                                    setIsServicesOpen(
                                                                        !isServicesOpen,
                                                                    )
                                                                }
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <span
                                                                        className={`font-semibold text-base tracking-wide ${
                                                                            isServicesOpen ||
                                                                            isActive
                                                                                ? 'text-red-600 dark:text-red-500'
                                                                                : 'text-slate-700 dark:text-slate-200'
                                                                        }`}
                                                                    >
                                                                        {navDict[link.label]}
                                                                    </span>
                                                                </div>
                                                                <motion.img
                                                                    src="/arrow.png"
                                                                    alt="Arrow"
                                                                    className={`w-4 h-4 transition-transform duration-300 mr-0 ${
                                                                        isServicesOpen || isActive
                                                                            ? 'brightness-0 saturate-100'
                                                                            : 'brightness-0 saturate-100 dark:brightness-0 dark:invert'
                                                                    }`}
                                                                    animate={{
                                                                        rotate: isServicesOpen
                                                                            ? 180
                                                                            : 0,
                                                                    }}
                                                                />
                                                                <span className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-red-600 to-red-500"></span>
                                                            </button>

                                                            <AnimatePresence>
                                                                {isServicesOpen && (
                                                                    <motion.div
                                                                        initial={{
                                                                            opacity: 0,
                                                                            height: 0,
                                                                        }}
                                                                        animate={{
                                                                            opacity: 1,
                                                                            height: 'auto',
                                                                        }}
                                                                        exit={{
                                                                            opacity: 0,
                                                                            height: 0,
                                                                        }}
                                                                        className="px-4 pb-4 pt-3 flex flex-col gap-2"
                                                                    >
                                                                        {servicesSubLinks.map(
                                                                            (sub) => (
                                                                                <Link
                                                                                    key={sub.href}
                                                                                    href={sub.href}
                                                                                    onClick={
                                                                                        closeMenu
                                                                                    }
                                                                                    className="block px-3 py-2 text-sm font-medium text-slate-600 dark:text-dark-200 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                                                                                >
                                                                                    {sub.label}
                                                                                </Link>
                                                                            ),
                                                                        )}
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Footer */}
                                <motion.div
                                    variants={footerVariants}
                                    className="pt-4 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between"
                                >
                                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                        {headerDict.language}
                                    </span>
                                    <LanguageSwitcher currentLang={lang} />
                                </motion.div>

                                <motion.div variants={footerVariants} className="mt-2">
                                    <Link
                                        href={`/${lang}/contact`}
                                        onClick={closeMenu}
                                        className="block w-full text-center px-5 py-3.5 rounded-2xl text-sm font-semibold text-white bg-red-600 shadow-lg shadow-red-600/20"
                                    >
                                        {navDict.getStarted}
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
