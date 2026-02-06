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
            className={`flex items-center gap-1 transition-opacity duration-300 ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
            role="group"
            aria-label="Select language"
        >
            {languages.map((locale) => {
                const isActive = currentLang === locale;
                return (
                    <motion.button
                        key={locale}
                        onClick={() => handleLanguageChange(locale)}
                        disabled={isPending}
                        whileHover={{ y: -2 }}
                        className={`
                            relative px-3 py-1.5 text-xs font-bold uppercase
                            transition-all duration-300 rounded-full
                            ${isActive
                                ? 'text-red-600 dark:text-red-500'
                                : 'text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500'
                            }
                            disabled:cursor-wait
                        `}
                        aria-label={`Switch to ${localeFullNames[locale]}`}
                        aria-pressed={isActive}
                    >
                        <span className="relative z-10">{localeNames[locale]}</span>
                        {isActive && (
                            <motion.div
                                layoutId="activeLangUnderline"
                                className="absolute bottom-0 left-2 right-2 h-[2px] bg-red-600 dark:bg-red-500 rounded-full"
                                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                            />
                        )}
                    </motion.button>
                );
            })}

            {/* Loading indicator */}
            {isPending && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-1 w-4 h-4 rounded-full border-2 border-red-600 border-t-transparent animate-spin"
                />
            )}
        </div>
    );
}
