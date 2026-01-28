'use client';

import { usePathname, useRouter } from 'next/navigation';
import { i18n, type Locale } from '@/i18n-config';
import { Globe } from 'lucide-react';

export function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
    const pathname = usePathname();
    const router = useRouter();

    const redirectedPathname = (locale: string) => {
        if (!pathname) return '/';
        const segments = pathname.split('/');
        segments[1] = locale;
        return segments.join('/');
    };

    return (
        <div className="flex items-center gap-1">
            <div className="flex gap-1" role="group" aria-label="Select language">
                {i18n.locales.map((locale) => (
                    <button
                        key={locale}
                        onClick={() => router.push(redirectedPathname(locale))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all duration-300 ${currentLang === locale
                            ? 'bg-primary-500 text-white shadow-sm'
                            : 'text-slate-500 hover:text-slate-900 dark:text-dark-400 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-white/10'
                            }`}
                        aria-label={`Switch to ${locale === 'en' ? 'English' : locale === 'ru' ? 'Russian' : 'Spanish'}`}
                        aria-pressed={currentLang === locale}
                    >
                        {locale}
                    </button>
                ))}
            </div>
        </div>
    );
}
