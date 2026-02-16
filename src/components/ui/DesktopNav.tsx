import { motion } from 'framer-motion';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';
import { ServicesDropdown } from './ServicesDropdown';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/types/dictionary';

interface DesktopNavProps {
    lang: Locale;
    dict: Dictionary;
    isScrolled: boolean;
    pathname: string;
    navDict: any;
    servicesSubLinks: Array<{
        href: string;
        label: string;
        description: string;
    }>;
    isDesktopServicesOpen: boolean;
    handleDesktopServicesEnter: () => void;
    handleDesktopServicesLeave: () => void;
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

export function DesktopNav({
    lang,
    dict,
    isScrolled,
    pathname,
    navDict,
    servicesSubLinks,
    isDesktopServicesOpen,
    handleDesktopServicesEnter,
    handleDesktopServicesLeave,
}: DesktopNavProps) {
    const navLinks = getNavLinks(lang);

    return (
        <>
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
                                <ServicesDropdown
                                    key={link.href}
                                    isDesktopServicesOpen={isDesktopServicesOpen}
                                    isServicesOpen={false}
                                    servicesSubLinks={servicesSubLinks}
                                    onDesktopServicesEnter={handleDesktopServicesEnter}
                                    onDesktopServicesLeave={handleDesktopServicesLeave}
                                    onToggleServices={() => {}}
                                    navDict={navDict}
                                    isActive={isActive}
                                    isMobile={false}
                                />
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
                                            ? 'text-red-600 dark:text-red-500'
                                            : 'text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-600/5 dark:hover:bg-red-600/10'
                                    }
                                `}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabOutline"
                                        className="absolute inset-0 border-2 border-red-600 dark:border-red-500 rounded-full -z-10 shadow-[0_0_12px_rgba(220,38,38,0.15)]"
                                        transition={{
                                            type: 'spring',
                                            bounce: 0.25,
                                            duration: 0.5,
                                        }}
                                    />
                                )}
                                <span className={isActive ? 'opacity-100' : ''}>
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
        </>
    );
}
