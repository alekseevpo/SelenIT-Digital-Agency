'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

interface DesktopThemeToggleProps {
    className?: string;
    iconSize?: 'small' | 'medium' | 'large';
    buttonSize?: 'small' | 'medium' | 'large';
    showHoverEffect?: boolean;
}

export function DesktopThemeToggle({
    className = '',
    iconSize = 'medium',
    buttonSize = 'medium',
    showHoverEffect = true,
}: DesktopThemeToggleProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeChange = () => {
        document.documentElement.classList.add('transitioning');
        setTheme(theme === 'dark' ? 'light' : 'dark');
        setTimeout(() => {
            document.documentElement.classList.remove('transitioning');
        }, 500);
    };

    if (!mounted) {
        const sizeClasses = {
            small: 'w-8 h-8',
            medium: 'w-10 h-10',
            large: 'w-12 h-12',
        };
        return <div className={sizeClasses[buttonSize]} />;
    }

    const isDark = theme === 'dark';

    // Size configurations
    const buttonClasses = {
        small: 'w-8 h-8',
        medium: 'w-10 h-10',
        large: 'w-12 h-12',
    };

    const iconClasses = {
        small: 'w-3 h-3',
        medium: 'w-5 h-5',
        large: 'w-7 h-7',
    };

    return (
        <motion.button
            onClick={handleThemeChange}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`${buttonClasses[buttonSize]} rounded-full flex items-center justify-center text-slate-600 dark:text-white transition-colors duration-300 ${className}`}
            whileTap={showHoverEffect ? { scale: 0.95 } : undefined}
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
                            rotate: isHovered && showHoverEffect ? 180 : 0,
                        }}
                        exit={{ scale: 0, opacity: 0, rotate: 90 }}
                        transition={{
                            scale: { duration: 0.3, ease: 'easeOut' },
                            opacity: { duration: 0.3 },
                            rotate: { duration: 0.5, ease: 'easeInOut' },
                        }}
                    >
                        <svg
                            className={iconClasses[iconSize]}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <circle cx="12" cy="12" r="4" />
                            <line x1="12" y1="2" x2="12" y2="4" strokeLinecap="round" />
                            <line x1="12" y1="20" x2="12" y2="22" strokeLinecap="round" />
                            <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" strokeLinecap="round" />
                            <line
                                x1="17.66"
                                y1="17.66"
                                x2="19.07"
                                y2="19.07"
                                strokeLinecap="round"
                            />
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
                            rotate: isHovered && showHoverEffect ? -20 : 0,
                        }}
                        exit={{ scale: 0, opacity: 0, rotate: -90 }}
                        transition={{
                            scale: { duration: 0.3, ease: 'easeOut' },
                            opacity: { duration: 0.3 },
                            rotate: { duration: 0.3, ease: 'easeInOut' },
                        }}
                    >
                        <svg
                            className={iconClasses[iconSize]}
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
