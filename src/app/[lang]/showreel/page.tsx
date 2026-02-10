import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import ShowreelGrid from '@/components/ShowreelGrid';
import YouTubeEmbed from '@/components/ui/YouTubeEmbed';
import CTA from '@/components/sections/CTA';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    return {
        title: dict.showreel.hero.badge,
        description: dict.showreel.hero.subtitle,
    };
}

interface PageProps {
    params: Promise<{ lang: string }>;
}

const projectMetadata: Record<number, { tags: string[], color: string }> = {
    1: {
        tags: ['Next.js', 'Stripe', 'Tailwind CSS', 'PostgreSQL'],
        color: 'from-purple-500 to-pink-500',
    },
    2: {
        tags: ['React', 'D3.js', 'Node.js', 'Redis'],
        color: 'from-blue-500 to-cyan-500',
    },
    3: {
        tags: ['PWA', 'React Native', 'Firebase'],
        color: 'from-orange-500 to-red-500',
    },
    4: {
        tags: ['Shopify', 'Liquid', 'Tailwind', 'Node.js'],
        color: 'from-green-500 to-emerald-500',
    }
};

export default async function ShowreelPage({ params }: PageProps) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const { hero, grid, projects: dictProjects, cta, categories } = dict.showreel;
    const baseUrl = 'https://selen.it';
    const breadcrumbs = [
        { name: dict.common.nav.home, url: `${baseUrl}/${lang}` },
        { name: dict.common.nav.showreel, url: `${baseUrl}/${lang}/showreel` },
    ];

    const projects = dictProjects.map((p) => ({
        ...p,
        category: p.category,
        tags: projectMetadata[p.id]?.tags || [],
        color: projectMetadata[p.id]?.color || 'from-slate-500 to-slate-600',
    }));

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
                        <p className="text-body transition-colors duration-300">
                            {hero.subtitle}
                        </p>
                    </div>

                    <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl relative group bg-slate-100/50 dark:bg-dark-900">
                        <YouTubeEmbed videoId={hero.videoId} title="Selen.IT Showreel" lang={lang} />
                    </div>
                </div>
            </section>

            {/* Filterable Portfolio Grid */}
            <ShowreelGrid
                projects={projects}
                lang={lang}
                dict={grid}
            />

            <CTA
                lang={lang as Locale}
                dict={cta}
                commonDict={dict.hero}
            />
        </div>
    );
}
