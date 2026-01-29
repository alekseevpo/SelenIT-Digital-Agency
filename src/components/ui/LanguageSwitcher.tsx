'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { i18n, type Locale } from '@/i18n-config';
import { motion } from 'framer-motion';

const localeNames: Record<Locale, string> = {
    en: 'EN',
    ru: 'RU',
    es: 'ES',
};

const localeFullNames: Record<Locale, string> = {
    en: 'English',
    ru: 'Русский',
    es: 'Español',
};

export function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const redirectedPathname = (locale: string) => {
        if (!pathname) return '/';
        const segments = pathname.split('/');
        segments[1] = locale;
        return segments.join('/');
    };

    const handleLanguageChange = (locale: Locale) => {
        startTransition(() => {
            router.push(redirectedPathname(locale));
        });
    };

    return (
        <div
            className={`flex items-center gap-0.5 transition-opacity duration-300 ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
            role="group"
            aria-label="Select language"
        >
            {i18n.locales.map((locale) => {
                const isActive = currentLang === locale;
                return (
                    <button
                        key={locale}
                        onClick={() => handleLanguageChange(locale)}
                        disabled={isPending}
                        className={`
                            relative px-3.5 py-2 rounded-full text-xs font-bold uppercase
                            transition-all duration-300
                            ${isActive
                                ? 'text-white'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/30 dark:hover:bg-white/10'
                            }
                            disabled:cursor-wait
                        `}
                        aria-label={`Switch to ${localeFullNames[locale]}`}
                        aria-pressed={isActive}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeLang"
                                className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full -z-10 shadow-lg shadow-primary-500/30"
                                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                            />
                        )}
                        {localeNames[locale]}
                    </button>
                );
            })}

            {/* Loading indicator */}
            {isPending && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-1 w-4 h-4 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"
                />
            )}
        </div>
    );
}
