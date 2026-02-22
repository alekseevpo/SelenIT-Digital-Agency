import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ServicesDropdown } from './ServicesDropdown';
import { Logo } from './Logo';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/types/dictionary';

interface MobileMenuProps {
    lang: Locale;
    dict: Dictionary;
    isMobileMenuOpen: boolean;
    pathname: string;
    navDict: Dictionary['common']['nav'];
    headerDict: Dictionary['common']['header'];
    servicesSubLinks: Array<{
        href: string;
        label: string;
        description: string;
    }>;
    isServicesOpen: boolean;
    closeMenu: () => void;
    toggleServices: () => void;
}

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

export function MobileMenu({
    lang,
    dict,
    isMobileMenuOpen,
    pathname,
    navDict,
    headerDict,
    servicesSubLinks,
    isServicesOpen,
    closeMenu,
    toggleServices,
}: MobileMenuProps) {
    const navLinks = getNavLinks(lang);

    return (
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 z-[60] md:hidden"
                    data-testid="mobile-menu"
                >
                    <div
                        className="absolute inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-md"
                        onClick={closeMenu}
                        data-testid="mobile-menu-backdrop"
                    />
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute inset-0 w-full h-full bg-white/40 dark:bg-black/40 backdrop-blur-md overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative z-10 h-full flex flex-col p-5 pt-8">
                            {/* Header */}
                            <motion.div
                                className="flex justify-between items-center mb-8 mr-2"
                                variants={itemVariants}
                            >
                                <div className="flex items-end gap-4 sm:gap-6 ml-4">
                                    <h2 className="text-7xl sm:text-8xl md:text-9xl lg:text-10xl font-bold text-slate-900 dark:text-white relative leading-none pb-2">
                                        {headerDict.menu}
                                        <span className="absolute bottom-0 left-0 w-full h-[3px] sm:h-1 bg-gradient-to-r from-red-600 to-red-500"></span>
                                    </h2>
                                    <div className="relative pb-2">
                                        <Logo
                                            size={56}
                                            showText={true}
                                            hideUnderline={true}
                                            className="sm:scale-[1.1] sm:origin-left"
                                        />
                                        <span className="absolute bottom-0 left-0 w-full h-[3px] sm:h-1 bg-gradient-to-r from-red-600 to-red-500"></span>
                                    </div>
                                </div>
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
                            <nav
                                aria-label="Mobile Navigation"
                                className="flex-1 overflow-y-auto py-4 mt-8"
                            >
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
                                                    <ServicesDropdown
                                                        key={link.href}
                                                        isDesktopServicesOpen={false}
                                                        isServicesOpen={isServicesOpen}
                                                        servicesSubLinks={servicesSubLinks}
                                                        onDesktopServicesEnter={() => {}}
                                                        onDesktopServicesLeave={() => {}}
                                                        onToggleServices={toggleServices}
                                                        navDict={navDict}
                                                        isActive={isActive}
                                                        isMobile={true}
                                                        lang={lang}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </nav>

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
    );
}
