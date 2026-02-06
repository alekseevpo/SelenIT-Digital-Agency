import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import { Reveal } from '@/components/ui/Reveal';
import CTA from '@/components/sections/CTA';

const content = {
    en: {
        badge: 'Branding',
        title1: 'Build a',
        titleGradient: 'brand',
        title2: 'people remember',
        subtitle: 'Strategy, identity and messaging that makes you stand out and converts attention into trust.',
        bullets: ['Brand strategy', 'Visual identity', 'Tone of voice', 'Brand guidelines'],
    },
    ru: {
        badge: 'Брендинг',
        title1: 'Создаём',
        titleGradient: 'бренд',
        title2: 'который запоминают',
        subtitle: 'Стратегия, айдентика и коммуникация, которые выделяют и превращают внимание в доверие.',
        bullets: ['Бренд-стратегия', 'Визуальная айдентика', 'Тон коммуникации', 'Брендбук и гайдлайны'],
    },
    es: {
        badge: 'Branding',
        title1: 'Creamos una',
        titleGradient: 'marca',
        title2: 'memorable',
        subtitle: 'Estrategia, identidad y mensajes que te diferencian y convierten la atención en confianza.',
        bullets: ['Estrategia de marca', 'Identidad visual', 'Tono de voz', 'Guías de marca'],
    },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const c = content[(lang as Locale) in content ? (lang as Locale) : 'en'];

    return {
        title: `${c.badge} | ${dict.common.nav.services}`,
        description: c.subtitle,
    };
}

interface PageProps {
    params: Promise<{ lang: string }>;
}

export default async function BrandingPage({ params }: PageProps) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const c = content[(lang as Locale) in content ? (lang as Locale) : 'en'];

    return (
        <div className="bg-transparent dark:bg-dark-950 transition-colors duration-300">
            <section className="pt-32 pb-20 relative overflow-hidden bg-transparent dark:bg-dark-950 transition-colors duration-300">
                <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <Reveal width="100%">
                        <span className="text-orange-500 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {c.badge}
                        </span>
                    </Reveal>
                    <Reveal width="100%" delay={0.35}>
                        <h1 className="heading-1 mb-6 text-slate-900 dark:text-white">
                            {c.title1}{' '}
                            <span className="gradient-text">{c.titleGradient}</span> {c.title2}
                        </h1>
                    </Reveal>
                    <Reveal width="100%" delay={0.45}>
                        <p className="text-body max-w-2xl mx-auto transition-colors duration-300">{c.subtitle}</p>
                    </Reveal>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-custom px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="glass-card p-10 bg-cream-50/40 dark:bg-dark-900 border border-slate-200 dark:border-dark-700">
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {c.bullets.map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-slate-700 dark:text-dark-300">
                                        <div className="w-5 h-5 rounded-full bg-orange-500/10 dark:bg-primary-500/10 flex items-center justify-center text-orange-500 dark:text-primary-500">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <CTA lang={lang as Locale} dict={dict.services.cta} commonDict={dict.hero} />
        </div>
    );
}
