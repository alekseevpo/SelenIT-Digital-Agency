import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

interface PageProps {
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    return {
        title: dict.terms.hero.title,
    };
}

export default async function TermsPage({ params }: PageProps) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const { hero, content } = dict.terms;
    const baseUrl = 'https://selen.it';
    const breadcrumbs = [
        { name: dict.common.nav.home, url: `${baseUrl}/${lang}` },
        { name: dict.common.nav.terms, url: `${baseUrl}/${lang}/terms` },
    ];

    return (
        <div className="bg-transparent dark:bg-dark-950 min-h-screen py-24">
            <BreadcrumbJsonLd items={breadcrumbs} />
            <div className="container-custom px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="heading-2 mb-4 text-slate-900 dark:text-white">{hero.title}</h1>
                    <p className="text-slate-500 dark:text-dark-400 mb-12">{hero.lastUpdated}</p>

                    <div className="space-y-12">
                        {content.map((section, index) => (
                            <div key={index}>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                    {section.title}
                                </h2>
                                <p className="text-slate-600 dark:text-dark-400 leading-relaxed whitespace-pre-line">
                                    {section.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
