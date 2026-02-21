import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import { Reveal } from '@/components/ui/Reveal';
import CTA from '@/components/sections/CTA';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

const content = {
    en: {
        badge: 'Websites',
        title1: 'Websites that',
        titleGradient: 'convert',
        title2: 'and feel premium',
        subtitle: 'Fast, accessible and beautifully crafted websites built to perform and scale.',
        bullets: [
            'Next.js performance',
            'UI/UX & animations',
            'API integrations',
            'SEO-ready structure',
        ],
    },
    ru: {
        badge: 'Сайты',
        title1: 'Сайты, которые',
        titleGradient: 'продают',
        title2: 'и выглядят дорого',
        subtitle:
            'Быстрые, доступные и продуманные сайты, которые работают на результат и легко масштабируются.',
        bullets: [
            'Производительность Next.js',
            'UI/UX и анимации',
            'API интеграции',
            'SEO-ready структура',
        ],
    },
    es: {
        badge: 'Websites',
        title1: 'Websites que',
        titleGradient: 'convierten',
        title2: 'y se sienten premium',
        subtitle: 'Websites rápidos, accesibles y con un diseño impecable, listos para crecer.',
        bullets: [
            'Rendimiento con Next.js',
            'UI/UX y animaciones',
            'Integraciones de API',
            'Estructura lista para SEO',
        ],
    },
} as const;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const c = content[(lang as Locale) in content ? (lang as Locale) : 'en'];

    return {
        title: `${c.badge} | ${dict.common.nav.services}`,
        description: c.subtitle,
    };
}

interface PageProps {
    params: Promise<{ lang: string }>;
}

export default async function WebsitesPage({ params }: PageProps) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const c = content[(lang as Locale) in content ? (lang as Locale) : 'en'];
    const baseUrl = 'https://selen.it';
    const breadcrumbs = [
        { name: dict.common.nav.home, url: `${baseUrl}/${lang}` },
        { name: dict.common.nav.services, url: `${baseUrl}/${lang}/services` },
        { name: c.badge, url: `${baseUrl}/${lang}/services/websites` },
    ];

    return (
        <div className="bg-transparent dark:bg-black transition-colors duration-300">
            <BreadcrumbJsonLd items={breadcrumbs} />
            <section className="pt-32 pb-20 relative overflow-hidden bg-transparent dark:bg-black transition-colors duration-300">
                <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <Reveal width="100%">
                        <span className="text-red-600 dark:text-red-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {c.badge}
                        </span>
                    </Reveal>
                    <Reveal width="100%" delay={0.35}>
                        <h1
                            className="heading-1 mb-6 text-slate-900 dark:text-white"
                            style={{ letterSpacing: '0.02em' }}
                        >
                            {c.title1} <span className="gradient-text">{c.titleGradient}</span>{' '}
                            <span className="text-red-600 dark:text-red-500">{c.title2}</span>
                        </h1>
                    </Reveal>
                    <Reveal width="100%" delay={0.45}>
                        <p className="text-body max-w-2xl mx-auto transition-colors duration-300">
                            {c.subtitle}
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-custom px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="glass-card p-10 bg-cream-50/40 dark:bg-neutral-900 border border-slate-200 dark:border-dark-700">
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {c.bullets.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-3 text-slate-700 dark:text-dark-300"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-red-600/10 dark:bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-500">
                                            <svg
                                                className="w-3 h-3"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <CTA lang={lang as Locale} dict={dict.services.cta} commonDict={dict.hero} />
        </div>
    );
}
