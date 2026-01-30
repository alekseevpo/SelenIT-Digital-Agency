import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import { Reveal } from '@/components/ui/Reveal';
import CTA from '@/components/sections/CTA';

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
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    ),
    'ui-ux-design': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
    ),
    'ecommerce': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
    ),
    'web-applications': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
    ),
    'mobile-first': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
    ),
    'maintenance': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
};

export default async function ServicesPage({ params: { lang } }: ServicesPageProps) {
    const dict = await getDictionary(lang as Locale);
    const { hero, list: servicesList, process, cta } = dict.services;

    return (
        <div className="bg-cream-50 dark:bg-dark-950 transition-colors duration-300">
            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden bg-cream-50 dark:bg-dark-950 transition-colors duration-300">
                <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <Reveal width="100%">
                        <span className="text-orange-500 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {hero.badge}
                        </span>
                    </Reveal>
                    <Reveal width="100%" delay={0.35}>
                        <h1 className="heading-1 mb-6 text-slate-900 dark:text-white">
                            {hero.title1}{' '}
                            <span className="gradient-text">{hero.titleGradient}</span>
                        </h1>
                    </Reveal>
                    <Reveal width="100%" delay={0.45}>
                        <p className="text-body max-w-2xl mx-auto transition-colors duration-300">
                            {hero.subtitle}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Services Detailed List */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 gap-12 sm:gap-24">
                        {servicesList.map((service, index) => (
                            <Reveal key={service.id} delay={0.2 * index} width="100%">
                                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                    <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-green-500/20 dark:from-primary-500/20 dark:to-accent-500/20 flex items-center justify-center text-orange-500 dark:text-primary-500 mb-8">
                                            {serviceIcons[service.id]}
                                        </div>
                                        <h3 className="heading-3 mb-6 text-slate-900 dark:text-white">{service.title}</h3>
                                        <p className="text-lg text-slate-600 dark:text-dark-400 mb-8 transition-colors duration-300">
                                            {service.description}
                                        </p>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {service.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-3 text-slate-700 dark:text-dark-300">
                                                    <div className="w-5 h-5 rounded-full bg-orange-500/10 dark:bg-primary-500/10 flex items-center justify-center text-orange-500 dark:text-primary-500">
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className={`relative aspect-video rounded-3xl overflow-hidden bg-slate-100 dark:bg-dark-900 shadow-2xl ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-slate-400 font-medium">Project Preview Placeholder</div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="section-padding bg-cream-100 dark:bg-dark-900 transition-colors duration-300">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Reveal width="100%">
                            <span className="text-orange-500 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                                {process.badge}
                            </span>
                        </Reveal>
                        <Reveal width="100%" delay={0.35}>
                            <h2 className="heading-2 mb-6 text-slate-900 dark:text-white">
                                {process.title1}{' '}
                                <span className="gradient-text">{process.titleGradient}</span>
                            </h2>
                        </Reveal>
                        <Reveal width="100%" delay={0.45}>
                            <p className="text-body transition-colors duration-300">
                                {process.subtitle}
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {process.steps.map((item) => (
                            <Reveal key={item.step} delay={0.1 * parseInt(item.step)}>
                                <div className="glass-card p-10 bg-cream-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 h-full relative group hover:shadow-lg transition-all">
                                    <div className="text-7xl font-bold text-slate-900/5 dark:text-white/5 absolute top-6 right-8 group-hover:text-orange-500/10 dark:group-hover:text-primary-500/10 transition-colors">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">{item.title}</h3>
                                    <p className="text-slate-600 dark:text-dark-400 relative z-10 transition-colors duration-300">
                                        {item.description}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <CTA
                lang={lang as Locale}
                dict={cta}
                commonDict={dict.hero}
            />
        </div>
    );
}
