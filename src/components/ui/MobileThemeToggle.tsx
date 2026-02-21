'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

interface MobileThemeToggleProps {
    className?: string;
    iconSize?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
    buttonSize?: 'small' | 'medium' | 'large' | 'xlarge';
}

export function MobileThemeToggle({
    className = '',
    iconSize = 'large',
    buttonSize = 'large',
}: MobileThemeToggleProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

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
            xlarge: 'w-12 h-12',
        };
        return <div className={sizeClasses[buttonSize]} />;
    }

    const isDark = theme === 'dark';

    // Size configurations
    const buttonClasses = {
        small: 'w-8 h-8',
        medium: 'w-10 h-10',
        large: 'w-12 h-12',
        xlarge: 'w-12 h-12',
    };

    const iconClasses = {
        small: 'w-4 h-4',
        medium: 'w-6 h-6',
        large: 'w-8 h-8',
        xlarge: 'w-10 h-10',
        xxlarge: 'w-12 h-12',
    };

    return (
        <div
            className={`backdrop-blur-2xl bg-cream-50/10 dark:bg-cream-50/5 border border-white/20 dark:border-white/10 p-0 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.06)] relative z-50 ${className}`}
        >
            <motion.button
                onClick={handleThemeChange}
                className={`${buttonClasses[buttonSize]} rounded-full flex items-center justify-center text-slate-600 dark:text-white transition-colors duration-300`}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
                {isDark ? (
                    // Sun icon for dark mode - exact copy from desktop
                    <svg
                        className={iconClasses[iconSize]}
                        style={{
                            width: '20px',
                            height: '20px',
                            minWidth: '20px',
                            minHeight: '20px',
                        }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
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
                ) : (
                    // Moon icon for light mode - exact copy from desktop
                    <svg
                        className={iconClasses[iconSize]}
                        style={{
                            width: '20px',
                            height: '20px',
                            minWidth: '20px',
                            minHeight: '20px',
                        }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </motion.button>
        </div>
    );
}
