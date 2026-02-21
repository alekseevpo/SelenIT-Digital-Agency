import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/types/dictionary';

interface ServicesDropdownProps {
    isDesktopServicesOpen: boolean;
    isServicesOpen: boolean;
    servicesSubLinks: Array<{
        href: string;
        label: string;
        description: string;
    }>;
    onDesktopServicesEnter: () => void;
    onDesktopServicesLeave: () => void;
    onToggleServices: () => void;
    navDict: Dictionary['common']['nav'];
    isActive?: boolean;
    isMobile?: boolean;
}

export function ServicesDropdown({
    isDesktopServicesOpen,
    isServicesOpen,
    servicesSubLinks,
    onDesktopServicesEnter,
    onDesktopServicesLeave,
    onToggleServices,
    navDict,
    isActive = false,
    isMobile = false,
}: ServicesDropdownProps) {
    if (isMobile) {
        return (
            <div className="relative">
                <button
                    type="button"
                    className={`w-full flex items-center justify-between px-4 py-3 transition-all duration-300 relative border-b border-slate-200/30 dark:border-white/10 ${
                        isServicesOpen || isActive
                            ? 'text-red-600 dark:text-red-500'
                            : 'text-slate-700 dark:text-slate-200'
                    }`}
                    onClick={onToggleServices}
                >
                    <div className="flex items-center gap-3">
                        <span
                            className={`font-semibold text-base tracking-wide ${
                                isServicesOpen || isActive
                                    ? 'text-red-600 dark:text-red-500'
                                    : 'text-slate-700 dark:text-slate-200'
                            }`}
                        >
                            {navDict.services}
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
                            rotate: isServicesOpen ? 180 : 0,
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
                            {servicesSubLinks.map((sub) => (
                                <Link
                                    key={sub.href}
                                    href={sub.href}
                                    className="block px-3 py-2 text-sm font-medium text-slate-600 dark:text-dark-200 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                                >
                                    {sub.label}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div
            className="relative"
            onMouseEnter={onDesktopServicesEnter}
            onMouseLeave={onDesktopServicesLeave}
        >
            <Link
                href={`/${navDict.services}`}
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
                            {navDict.services}
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
                    {navDict.services}
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
                            {servicesSubLinks.map((subLink, index) => (
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
