'use client';

import YouTubeEmbed from '@/components/ui/YouTubeEmbed';
import { lazy, Suspense } from 'react';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { LazyCTA } from '@/components/ui/LazySection';

// Lazy load heavy components
const ShowreelGridLight = lazy(() => import('@/components/ShowreelGridLight'));

import type { Dictionary } from '@/types/dictionary';

interface ShowreelPageClientProps {
    hero: Dictionary['showreel']['hero'];
    grid: Dictionary['showreel']['grid'];
    projects: Dictionary['showreel']['projects'];
    cta: Dictionary['showreel']['cta'];
    lang: string;
    breadcrumbs: { name: string; url: string }[];
}

export default function ShowreelPageClient({
    hero,
    grid,
    projects,
    cta,
    lang,
    breadcrumbs,
}: ShowreelPageClientProps) {
    return (
        <div className="bg-transparent dark:bg-dark-950 transition-colors duration-300">
            <BreadcrumbJsonLd items={breadcrumbs} />
            {/* Hero Section with Video */}
            <section className="pt-32 pb-20 relative overflow-hidden bg-transparent dark:bg-dark-950 transition-colors duration-300">
                <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex items-center justify-center min-h-[300px]">
                        <div className="text-center max-w-4xl">
                            <span className="text-red-600 dark:text-red-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                                {hero.badge}
                            </span>
                            <h1 className="heading-hero mb-6">
                                <span className="text-slate-900 dark:text-white">
                                    {hero.title1}{' '}
                                    <span
                                        className="text-red-600 dark:text-red-500"
                                        style={{ color: '#dc2626 !important' }}
                                    >
                                        {hero.titleGradient}
                                    </span>
                                </span>
                            </h1>
                            <p className="text-body transition-colors duration-300">
                                {hero.subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl relative group bg-slate-100/50 dark:bg-dark-900">
                        <YouTubeEmbed
                            videoId={hero.videoId}
                            title="Selen.IT Showreel"
                            lang={lang}
                        />
                    </div>
                </div>
            </section>

            {/* Center Text Section */}
            <section className="py-16 bg-white dark:bg-dark-950 transition-colors duration-300">
                <div className="container-custom px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center min-h-[120px]">
                        <div className="text-center max-w-4xl mx-auto">
                            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-center mb-8">
                                {lang === 'es'
                                    ? 'Página en construcción, pero pronto aquí verás nuestros pedidos completados.'
                                    : lang === 'ru'
                                      ? 'Страница в разработке, но скоро здесь вы увидите наши выполненые заказы.'
                                      : 'Page under development, but soon you will see our completed orders here.'}
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {(() => {
                                    const tags =
                                        lang === 'es'
                                            ? [
                                                  'logotipos',
                                                  'sitios web',
                                                  'aplicaciones',
                                                  'estrategias',
                                                  'diseño',
                                                  'animaciones',
                                                  'analítica',
                                              ]
                                            : lang === 'ru'
                                              ? [
                                                    'логотипы',
                                                    'веб-сайты',
                                                    'приложения',
                                                    'стратегии',
                                                    'дизайн',
                                                    'анимации',
                                                    'аналитика',
                                                ]
                                              : [
                                                    'logos',
                                                    'websites',
                                                    'applications',
                                                    'strategies',
                                                    'design',
                                                    'animations',
                                                    'analytics',
                                                ];
                                    return tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-red-600 dark:bg-red-500"
                                            style={{ color: 'white !important' }}
                                        >
                                            {tag}
                                        </span>
                                    ));
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filterable Portfolio Grid */}
            <Suspense
                fallback={
                    <div className="py-20 bg-slate-50 dark:bg-dark-900">
                        <div className="container-custom px-4 sm:px-6 lg:px-8">
                            <div className="h-64 animate-pulse bg-slate-200 dark:bg-dark-800 rounded-2xl" />
                        </div>
                    </div>
                }
            >
                <ShowreelGridLight projects={projects} lang={lang} dict={grid} />
            </Suspense>

            <Suspense
                fallback={
                    <div className="py-20 bg-white dark:bg-dark-950">
                        <div className="container-custom px-4 sm:px-6 lg:px-8">
                            <div className="h-32 animate-pulse bg-slate-200 dark:bg-dark-800 rounded-2xl" />
                        </div>
                    </div>
                }
            >
                <LazyCTA lang={lang} dict={cta} commonDict={hero} />
            </Suspense>
        </div>
    );
}
