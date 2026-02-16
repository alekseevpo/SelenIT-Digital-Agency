'use client';

import YouTubeEmbed from '@/components/ui/YouTubeEmbed';
import { lazy, Suspense } from 'react';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { LazyCTA } from '@/components/ui/LazySection';

// Lazy load heavy components
const ShowreelGridLight = lazy(() => import('@/components/ShowreelGridLight'));

interface ShowreelPageClientProps {
    hero: any;
    grid: any;
    projects: any[];
    cta: any;
    lang: string;
    breadcrumbs: any[];
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
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <span className="text-red-600 dark:text-red-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {hero.badge}
                        </span>
                        <h1 className="heading-hero mb-6">
                            <span className="text-slate-900 dark:text-white">
                                {hero.title1} {hero.titleGradient}
                            </span>
                        </h1>
                        <p className="text-body transition-colors duration-300">{hero.subtitle}</p>
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
