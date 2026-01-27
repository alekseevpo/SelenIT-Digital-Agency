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
        <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-dark-400" />
            <div className="flex gap-2">
                {i18n.locales.map((locale) => (
                    <button
                        key={locale}
                        onClick={() => router.push(redirectedPathname(locale))}
                        className={`text-xs font-bold uppercase transition-colors ${currentLang === locale
                            ? 'text-primary-500'
                            : 'text-slate-500 hover:text-slate-900 dark:text-dark-400 dark:hover:text-white'
                            }`}
                    >
                        {locale}
                    </button>
                ))}
            </div>
        </div>
    );
}
