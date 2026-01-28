import type { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import YouTubeEmbed from '@/components/ui/YouTubeEmbed';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
    const dict = await getDictionary(lang as Locale);
    return {
        title: dict.services.hero.badge,
        description: dict.services.hero.subtitle,
    };
}

interface ServicesPageProps {
    params: { lang: string };
}

const serviceIcons: Record<string, React.ReactNode> = {
    'web-development': (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    ),
    'ui-ux-design': (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
    ),
    'ecommerce': (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
    ),
    'web-applications': (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    'mobile-first': (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
    ),
    'maintenance': (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    ),
};

const serviceTechnologies: Record<string, string[]> = {
    'web-development': ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    'ui-ux-design': ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Framer', 'Principle'],
    'ecommerce': ['Shopify', 'Stripe', 'PayPal', 'WooCommerce', 'Magento', 'Custom'],
    'web-applications': ['React', 'Vue.js', 'Node.js', 'GraphQL', 'Redis', 'Docker'],
    'mobile-first': ['PWA', 'React Native', 'Flutter', 'Ionic', 'Capacitor', 'Expo'],
    'maintenance': ['Monitoring', 'CI/CD', 'Security', 'Backups', 'SSL', 'CDN'],
};

export default async function ServicesPage({ params: { lang } }: ServicesPageProps) {
    const dict = await getDictionary(lang as Locale);
    const { hero, list: servicesList, process, cta } = dict.services;

    return (
        <>
            <section className="pt-32 pb-20 relative overflow-hidden bg-white dark:bg-dark-950 transition-colors duration-300">
                <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {hero.badge}
                        </span>
                        <h1 className="heading-1 mb-6 text-slate-900 dark:text-white">
                            {hero.title1}{' '}
                            <span className="gradient-text">{hero.titleGradient}</span>
                        </h1>
                        <p className="text-body transition-colors duration-300">
                            {hero.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding bg-slate-50 dark:bg-dark-900 transition-colors duration-300">
                <div className="container-custom">
                    <div className="space-y-24">
                        {servicesList.map((service: any, index: number) => (
                            <div
                                key={service.id}
                                id={service.id}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Content */}
                                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-primary-400 mb-6">
                                        {serviceIcons[service.id]}
                                    </div>
                                    <h2 className="heading-3 mb-4 text-slate-900 dark:text-white">{service.title}</h2>
                                    <p className="text-slate-600 dark:text-dark-400 mb-8">{service.description}</p>

                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                        {service.features.map((feature: string) => (
                                            <li key={feature} className="flex items-center gap-2 text-slate-500 dark:text-dark-300">
                                                <svg className="w-5 h-5 text-primary-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-2">
                                        {(serviceTechnologies[service.id] || []).map((tech: string) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 rounded-full bg-slate-200 dark:bg-dark-800 text-slate-500 dark:text-dark-300 text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className={`aspect-video w-full rounded-2xl overflow-hidden shadow-2xl ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <YouTubeEmbed videoId={service.videoId || "QT3L4tZ14-4"} title={service.title} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding bg-white dark:bg-dark-950 transition-colors duration-300">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {process.badge}
                        </span>
                        <h2 className="heading-2 mb-6 text-slate-900 dark:text-white">
                            {process.title1}{' '}
                            <span className="gradient-text">{process.titleGradient}</span>
                        </h2>
                        <p className="text-body transition-colors duration-300">
                            {process.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {process.steps.map((item: any) => (
                            <div key={item.step} className="glass-card p-8 relative group card-hover bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800 shadow-sm">
                                <span className="text-6xl font-bold text-slate-200 dark:text-dark-800 absolute top-4 right-4 group-hover:text-primary-100 dark:group-hover:text-primary-900 transition-colors">
                                    {item.step}
                                </span>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 dark:text-dark-400 relative z-10">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-10" />
                <div className="container-custom text-center relative z-10">
                    <h2 className="heading-2 text-white mb-6">
                        {cta.title}
                    </h2>
                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                        {cta.subtitle}
                    </p>
                    <Link
                        href={`/${lang}/contact`}
                        className="inline-block px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg transition-all duration-300 hover:bg-dark-100 hover:shadow-lg hover:scale-105"
                    >
                        {cta.button}
                    </Link>
                </div>
            </section>
        </>
    );
}
