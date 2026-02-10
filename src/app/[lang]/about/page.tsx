import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    return {
        title: dict.about.hero.badge,
        description: dict.about.hero.subtitle,
    };
}

interface AboutPageProps {
    params: Promise<{ lang: string }>;
}

const valueIcons: Record<string, React.ReactNode> = {
    innovation: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    ),
    partnership: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    ),
    quality: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
    ),
    results: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
};

const teamMetadata: Record<string, { color: string; position?: string }> = {
    alexander: { color: 'from-blue-500 to-cyan-500', position: 'object-[50%_35%]' },
    maria: { color: 'from-purple-500 to-pink-500', position: 'object-top' },
    otto: { color: 'from-green-500 to-emerald-500' },
    daryna: { color: 'from-orange-500 to-amber-500' },
};

export default async function AboutPage({ params }: AboutPageProps) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const { hero, story, stats, values, team, cta } = dict.about;
    const baseUrl = 'https://selen.it';
    const breadcrumbs = [
        { name: dict.common.nav.home, url: `${baseUrl}/${lang}` },
        { name: dict.common.nav.about, url: `${baseUrl}/${lang}/about` },
    ];

    return (
        <>
            <BreadcrumbJsonLd items={breadcrumbs} />
            <section className="pt-32 pb-20 relative overflow-hidden bg-transparent dark:bg-dark-950 transition-colors duration-300">
                <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="text-red-600 dark:text-red-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {hero.badge}
                        </span>
                        <h1 className="heading-hero mb-6">
                            <span className="text-slate-900 dark:text-white">
                                {(() => {
                                    const title1 = hero.title1;
                                    const titleGradient = hero.titleGradient;
                                    return (
                                        <>
                                            <span className="text-red-600 dark:text-red-500">{title1}</span> {titleGradient}
                                        </>
                                    );
                                })()}
                            </span>
                        </h1>
                        <p className="text-body transition-colors duration-300 mb-[30px]">
                            {hero.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            <section className="section-padding bg-cream-100/50 dark:bg-dark-950 transition-colors duration-300">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-red-600 dark:text-red-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                                {story.badge}
                            </span>
                            <h2 className="heading-hero mb-6">
                                <span className="text-slate-900 dark:text-white">
                                    {story.title1} {story.titleGradient}
                                </span>
                            </h2>
                            <div className="space-y-4 text-slate-600 dark:text-dark-400 transition-colors duration-300 mt-8 -ml-8 lg:-ml-12">
                                <p>{story.p1}</p>
                                <p>{story.p2}</p>
                                <p>{story.p3}</p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((stat) => (
                                <div key={stat.label} className="glass-card p-8 text-center bg-cream-50/50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700">
                                    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
                                    <div className="text-slate-500 dark:text-dark-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-red-600 dark:text-red-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {values.badge}
                        </span>
                        <h2 className="heading-hero mb-6">
                            <span className="text-slate-900 dark:text-white">
                                {values.title1} {values.titleGradient}
                            </span>
                        </h2>
                        <p className="text-body">
                            {values.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.list.map((value) => (
                            <div key={value.id} className="glass-card p-8 card-hover">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-600/20 to-red-500/20 dark:from-red-500/20 dark:to-red-600/20 flex items-center justify-center text-red-600 dark:text-red-500 mb-6">
                                    {valueIcons[value.id]}
                                </div>
                                <h3 className="text-slate-900 dark:text-white font-frantz font-black mb-6 uppercase tracking-wide text-3xl md:text-4xl leading-none w-full font-frantz-stretch">{value.title}</h3>
                                <p className="text-slate-600 dark:text-dark-400">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pt-10 pb-20 bg-cream-100/50 dark:bg-dark-950 transition-colors duration-300">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-red-600 dark:text-red-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {team.badge}
                        </span>
                        <h2 className="heading-hero mb-12">
                            <span className="text-slate-900 dark:text-white">
                                {team.title1} {team.titleGradient.split('.IT').map((part, i, arr) => (
                                    <span key={i}>
                                        {part}
                                        {i < arr.length - 1 && <span className="text-red-600">.IT</span>}
                                    </span>
                                ))}
                            </span>
                        </h2>
                        <p className="text-body transition-colors duration-300">
                            {team.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.members.map((member) => (
                            <div key={member.id} className="glass-card p-6 text-center card-hover group bg-cream-50/50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 shadow-sm">
                                <div className={`relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 ${!member.avatar.includes('/') ? `bg-gradient-to-br ${teamMetadata[member.id]?.color || 'from-slate-500 to-slate-600'} flex items-center justify-center` : ''}`}>
                                    {member.avatar.includes('/') ? (
                                        <Image
                                            src={member.avatar}
                                            alt={member.name}
                                            fill
                                            className={`object-cover ${teamMetadata[member.id]?.position || 'object-center'}`}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <span className="text-white text-2xl font-bold">{member.avatar}</span>
                                    )}
                                </div>
                                <h3 className="text-slate-900 dark:text-white font-frantz font-black mb-4 uppercase tracking-wide text-3xl md:text-5xl leading-none w-full font-frantz-stretch">
                                    {member.name.split(' ').map((part, i) => (
                                        <span key={i} className={i === 1 ? 'text-red-600' : ''}>
                                            {part}{i === 0 ? ' ' : ''}
                                        </span>
                                    ))}
                                </h3>
                                <p className="text-red-600 dark:text-red-500 font-medium text-sm mb-4">{member.role}</p>
                                <p className="text-slate-600 dark:text-dark-400 text-sm">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="glass-card p-12 text-center bg-gradient-to-r from-red-600/10 to-slate-500/10 dark:from-red-500/10 dark:to-slate-600/10">
                        <h2 className="heading-hero mb-6">
                            <span className="text-slate-900 dark:text-white">
                                {cta.title1} {cta.titleGradient}
                            </span>
                        </h2>
                        <p className="text-body max-w-2xl mx-auto mb-10">
                            {cta.subtitle}
                        </p>
                        <Link
                            href={`/${lang}/contact`}
                            className="btn-primary text-lg px-8 py-4 group inline-flex items-center justify-center overflow-hidden relative"
                        >
                            <span className="relative z-10 transform group-hover:-translate-x-5 transition-transform duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] uppercase tracking-wider font-bold">
                                {cta.button}
                            </span>
                            <span className="absolute right-6 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]">
                                <svg className="w-7 h-7 rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path d="M10 2l11 10-11 10M21 12H3" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
