'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeChange = () => {
        // Add transitioning class for smooth animation
        document.documentElement.classList.add('transitioning');

        // Change theme
        setTheme(theme === 'dark' ? 'light' : 'dark');

        // Remove class after transition
        setTimeout(() => {
            document.documentElement.classList.remove('transitioning');
        }, 500);
    };

    if (!mounted) {
        return <div className="w-10 h-10" />;
    }

    const isDark = theme === 'dark';

    return (
        <motion.button
            onClick={handleThemeChange}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-amber-500/10 dark:hover:bg-amber-400/10 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                    <motion.div
                        key="sun"
                        initial={{ scale: 0, opacity: 0, rotate: -90 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            rotate: isHovered ? 180 : 0
                        }}
                        exit={{ scale: 0, opacity: 0, rotate: 90 }}
                        transition={{
                            scale: { duration: 0.3, ease: "easeOut" },
                            opacity: { duration: 0.3 },
                            rotate: { duration: 0.5, ease: "easeInOut" }
                        }}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <circle cx="12" cy="12" r="4" />
                            <line x1="12" y1="2" x2="12" y2="4" strokeLinecap="round" />
                            <line x1="12" y1="20" x2="12" y2="22" strokeLinecap="round" />
                            <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" strokeLinecap="round" />
                            <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" strokeLinecap="round" />
                            <line x1="2" y1="12" x2="4" y2="12" strokeLinecap="round" />
                            <line x1="20" y1="12" x2="22" y2="12" strokeLinecap="round" />
                            <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" strokeLinecap="round" />
                            <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" strokeLinecap="round" />
                        </svg>
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ scale: 0, opacity: 0, rotate: 90 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            rotate: isHovered ? -20 : 0
                        }}
                        exit={{ scale: 0, opacity: 0, rotate: -90 }}
                        transition={{
                            scale: { duration: 0.3, ease: "easeOut" },
                            opacity: { duration: 0.3 },
                            rotate: { duration: 0.3, ease: "easeInOut" }
                        }}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
