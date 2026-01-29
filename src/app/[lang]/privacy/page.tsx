import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
    const dict = await getDictionary(lang as Locale);
    return {
        title: dict.privacy.hero.title,
        description: dict.privacy.hero.lastUpdated,
    };
}

export default async function PrivacyPage({ params: { lang } }: { params: { lang: string } }) {
    const dict = await getDictionary(lang as Locale);
    const { hero, content } = dict.privacy;

    return (
        <div className="pt-32 pb-20 bg-white dark:bg-dark-950 min-h-screen transition-colors duration-300">
            <div className="container-custom px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Hero */}
                    <div className="text-center mb-16">
                        <h1 className="heading-1 mb-6 text-slate-900 dark:text-white">
                            {hero.title}
                        </h1>
                        <p className="text-slate-500 dark:text-dark-400">
                            {hero.lastUpdated}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {content.map((section: any, index: number) => (
                            <section key={index} className="mb-12">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    {section.title}
                                </h2>
                                <p className="text-slate-600 dark:text-dark-400 leading-relaxed">
                                    {section.text}
                                </p>
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
