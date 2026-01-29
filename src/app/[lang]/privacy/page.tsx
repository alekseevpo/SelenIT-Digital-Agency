import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';

interface PageProps {
    params: { lang: string };
}

export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
    const dict = await getDictionary(lang as Locale);
    return {
        title: dict.privacy.hero.title,
    };
}

export default async function PrivacyPage({ params: { lang } }: PageProps) {
    const dict = await getDictionary(lang as Locale);
    const { hero, content } = dict.privacy;

    return (
        <div className="bg-white dark:bg-dark-950 min-h-screen py-24">
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
