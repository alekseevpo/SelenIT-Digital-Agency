import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import ShowreelPageClient from '@/components/ShowreelPageClient';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
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

const projectMetadata: Record<number, { tags: string[]; color: string }> = {
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
    },
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
        <ShowreelPageClient
            hero={hero}
            grid={grid}
            projects={projects}
            cta={cta}
            lang={lang}
            breadcrumbs={breadcrumbs}
        />
    );
}
