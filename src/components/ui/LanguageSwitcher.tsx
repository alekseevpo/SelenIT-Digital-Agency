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

    const languages: Locale[] = ['es', 'en', 'ru'];

    return (
        <div
            className="flex items-center gap-1 transition-opacity duration-300 px-1 py-0.5"
            role="group"
            aria-label="Select language"
        >
            {languages.map((locale) => {
                const isActive = currentLang === locale;
                return (
                    <motion.button
                        key={locale}
                        onClick={() => handleLanguageChange(locale)}
                        whileHover={{ y: -2 }}
                        className={`
                            relative px-2 py-1 text-xs font-bold uppercase
                            transition-all duration-300 rounded-full
                            ${isActive
                                ? 'text-red-600 dark:text-red-500'
                                : 'text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500'
                            }
                        `}
                        aria-label={`Switch to ${localeFullNames[locale]}`}
                        aria-pressed={isActive}
                    >
                        <span className="relative z-10">{localeNames[locale]}</span>
                    </motion.button>
                );
            })}
        </div>
    );
}
