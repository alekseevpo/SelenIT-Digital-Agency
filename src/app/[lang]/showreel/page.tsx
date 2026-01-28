import type { Metadata } from 'next';
import Link from 'next/link';
import ShowreelGrid from '@/components/ShowreelGrid';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import YouTubeEmbed from '@/components/ui/YouTubeEmbed';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
    const dict = await getDictionary(lang as Locale);
    return {
        title: dict.showreel.hero.badge,
        description: dict.showreel.hero.subtitle,
    };
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
};

interface PageProps {
    params: { lang: string };
}

export default async function ShowreelPage({ params: { lang } }: PageProps) {
    const dict = await getDictionary(lang as Locale);
    const { hero, grid, cta, projects: dictProjects, categories } = dict.showreel;

    const projects = dictProjects.map((p: any) => ({
        ...p,
        tags: projectMetadata[p.id]?.tags || [],
        color: projectMetadata[p.id]?.color || 'from-slate-500 to-slate-600',
    }));

    return (
        <div className="bg-white dark:bg-dark-950 min-h-screen transition-colors duration-300">
            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden bg-white dark:bg-dark-950 transition-colors duration-300">
                <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {hero.badge}
                        </span>
                        <h1 className="heading-1 mb-6 text-slate-900 dark:text-white">
                            {hero.title1}{' '}
                            <span className="gradient-text">{hero.titleGradient}</span>
                        </h1>
                        <p className="text-body transition-colors duration-300 max-w-2xl mx-auto">
                            {hero.subtitle}
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <YouTubeEmbed videoId={hero.videoId || "QT3L4tZ14-4"} title="Selen.IT Showreel" />
                    </div>
                </div>
            </section>

            <ShowreelGrid
                projects={projects}
                categories={categories}
                lang={lang}
                dict={grid}
            />

            {/* CTA Section */}
            <section className="section-padding bg-slate-50 dark:bg-dark-900 transition-colors duration-300">
                <div className="container-custom">
                    <div className="glass-card p-12 text-center bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 shadow-xl">
                        <h2 className="heading-2 mb-6 text-slate-900 dark:text-white">
                            {cta.title1}{' '}
                            <span className="gradient-text">{cta.titleGradient}</span>
                        </h2>
                        <p className="text-body max-w-2xl mx-auto mb-10 transition-colors duration-300">
                            {cta.subtitle}
                        </p>
                        <Link href={`/${lang}/contact`} className="btn-primary text-lg px-8 py-4">
                            {cta.button}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
