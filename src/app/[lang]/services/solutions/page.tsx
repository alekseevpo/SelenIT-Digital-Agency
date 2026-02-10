import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import { Reveal } from '@/components/ui/Reveal';
import CTA from '@/components/sections/CTA';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: (dict as any).services?.solutions?.title ?? '',
        description: (dict as any).services?.solutions?.description ?? '',
    };
}

export default async function SolutionsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const baseUrl = 'https://selen.it';
    const solutionTitle = (dict as any).services?.solutions?.title ?? dict.common.nav.services;
    const breadcrumbs = [
        { name: dict.common.nav.home, url: `${baseUrl}/${lang}` },
        { name: dict.common.nav.services, url: `${baseUrl}/${lang}/services` },
        { name: solutionTitle, url: `${baseUrl}/${lang}/services/solutions` },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-black dark:to-neutral-900">
            <BreadcrumbJsonLd items={breadcrumbs} />
            <div className="container mx-auto px-6 py-20">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="heading-1 mb-6">
                        {(dict as any).services?.solutions?.title ?? ''}
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                        {(dict as any).services?.solutions?.description ?? ''}
                    </p>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 mb-8">
                        <h2 className="heading-2 mb-6">
                            {(dict as any).services?.solutions?.whatWeOffer ?? ''}
                        </h2>

                        <div className="space-y-6 mb-8">
                            <div className="flex items-start space-x-4">
                                <CheckCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                                <div>
                                <h3 className="text-lg font-semibold mb-2">{(dict as any).services?.solutions?.strategy ?? ''}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{(dict as any).services?.solutions?.strategyDesc ?? ''}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <CheckCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                                <div>
                                <h3 className="text-lg font-semibold mb-2">{(dict as any).services?.solutions?.development ?? ''}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{(dict as any).services?.solutions?.developmentDesc ?? ''}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <CheckCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                                <div>
                                <h3 className="text-lg font-semibold mb-2">{(dict as any).services?.solutions?.optimization ?? ''}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{(dict as any).services?.solutions?.optimizationDesc ?? ''}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <CheckCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                                <div>
                                <h3 className="text-lg font-semibold mb-2">{(dict as any).services?.solutions?.support ?? ''}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{(dict as any).services?.solutions?.supportDesc ?? ''}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Process Section */}
                    <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 mb-8">
                        <h2 className="heading-2 mb-6">
                            {(dict as any).services?.solutions?.process ?? ''}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="border-l-4 border-red-600 pl-6">
                                <h3 className="font-semibold mb-2">{(dict as any).services?.solutions?.analysis ?? ''}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{(dict as any).services?.solutions?.analysisDesc ?? ''}</p>
                            </div>

                            <div className="border-l-4 border-red-600 pl-6">
                                <h3 className="font-semibold mb-2">{(dict as any).services?.solutions?.planning ?? ''}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{(dict as any).services?.solutions?.planningDesc ?? ''}</p>
                            </div>

                            <div className="border-l-4 border-red-600 pl-6">
                                <h3 className="font-semibold mb-2">{(dict as any).services?.solutions?.implementation ?? ''}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{(dict as any).services?.solutions?.implementationDesc ?? ''}</p>
                            </div>

                            <div className="border-l-4 border-red-600 pl-6">
                                <h3 className="font-semibold mb-2">{(dict as any).services?.solutions?.monitoring ?? ''}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{(dict as any).services?.solutions?.monitoringDesc ?? ''}</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white">
                        <h2 className="heading-2 mb-4">
                            {(dict as any).services?.solutions?.readyToStart ?? ''}
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            {(dict as any).services?.solutions?.ctaDescription ?? ''}
                        </p>
                        <Link href={`/${lang}/contact`} className="inline-flex items-center px-4 py-2 bg-white text-red-600 rounded-md shadow hover:bg-slate-100">
                            {dict.common.nav.getStarted}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
