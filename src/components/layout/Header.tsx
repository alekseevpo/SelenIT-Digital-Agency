'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { Logo } from '../ui/Logo';
import { DesktopNav } from '../ui/DesktopNav';
import { MobileMenu } from '../ui/MobileMenu';
import { useNavigationLogic } from '@/hooks/useNavigationLogic';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/types/dictionary';

interface HeaderProps {
    lang: Locale;
    dict: Dictionary;
}

export default function Header({ lang, dict }: HeaderProps) {
    const {
        isScrolled,
        isMobileMenuOpen,
        isServicesOpen,
        isDesktopServicesOpen,
        pathname,
        navDict,
        headerDict,
        servicesSubLinks,
        closeMenu,
        toggleMobileMenu,
        toggleServices,
        handleDesktopServicesEnter,
        handleDesktopServicesLeave,
    } = useNavigationLogic({ lang, dict });

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

                    {/* Desktop Navigation */}
                    <DesktopNav
                        lang={lang}
                        dict={dict}
                        isScrolled={isScrolled}
                        pathname={pathname}
                        navDict={navDict}
                        servicesSubLinks={servicesSubLinks}
                        isDesktopServicesOpen={isDesktopServicesOpen}
                        handleDesktopServicesEnter={handleDesktopServicesEnter}
                        handleDesktopServicesLeave={handleDesktopServicesLeave}
                    />

                    {/* Mobile Controls - Top Right */}
                    <div
                        className={`md:hidden flex items-center gap-2 pointer-events-auto transition-all duration-500 mt-4`}
                    >
                        <div className="backdrop-blur-2xl bg-white/20 dark:bg-black/20 border border-slate-200/30 dark:border-white/20 rounded-full p-1.5">
                            <ThemeToggle />
                        </div>
                        <motion.button
                            onClick={toggleMobileMenu}
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
            <MobileMenu
                lang={lang}
                dict={dict}
                isMobileMenuOpen={isMobileMenuOpen}
                pathname={pathname}
                navDict={navDict}
                headerDict={headerDict}
                servicesSubLinks={servicesSubLinks}
                isServicesOpen={isServicesOpen}
                closeMenu={closeMenu}
                toggleServices={toggleServices}
            />
        </>
    );
}
