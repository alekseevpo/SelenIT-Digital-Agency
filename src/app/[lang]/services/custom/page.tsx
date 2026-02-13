import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import { Reveal } from '@/components/ui/Reveal';
import CTA from '@/components/sections/CTA';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

const content = {
    en: {
        badge: 'Custom Setup',
        title1: 'A',
        titleGradient: 'custom',
        title2: 'setup tailored to you',
        subtitle:
            'A flexible engagement for teams that need design, development and optimization without rigid packages.',
        bullets: ['Audit & roadmap', 'Dedicated iterations', 'Priority support', 'Flexible scope'],
    },
    ru: {
        badge: 'Индивидуальная настройка',
        title1: 'Формат',
        titleGradient: 'для вас',
        title2: '',
        subtitle:
            'Гибкая работа для команд, которым нужны дизайн, разработка и оптимизация без ограничений по шаблону.',
        bullets: [
            'Аудит и план работ',
            'Регулярные итерации',
            'Приоритетная поддержка',
            'Гибкий скоуп',
        ],
    },
    es: {
        badge: 'A medida',
        title1: 'Un formato',
        titleGradient: 'a medida',
        title2: 'para tu equipo',
        subtitle:
            'Un servicio flexible para diseño, desarrollo y optimización sin paquetes rígidos.',
        bullets: [
            'Auditoría y roadmap',
            'Iteraciones dedicadas',
            'Soporte prioritario',
            'Alcance flexible',
        ],
    },
} as const;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
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

export default async function CustomSetupPage({ params }: PageProps) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const c = content[(lang as Locale) in content ? (lang as Locale) : 'en'];
    const baseUrl = 'https://selen.it';
    const breadcrumbs = [
        { name: dict.common.nav.home, url: `${baseUrl}/${lang}` },
        { name: dict.common.nav.services, url: `${baseUrl}/${lang}/services` },
        { name: c.badge, url: `${baseUrl}/${lang}/services/custom` },
    ];

    return (
        <div className="bg-transparent dark:bg-black transition-colors duration-300">
            <BreadcrumbJsonLd items={breadcrumbs} />
            <section className="pt-32 pb-20 relative overflow-hidden bg-transparent dark:bg-black transition-colors duration-300">
                <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <Reveal width="100%">
                        <span className="text-orange-500 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {c.badge}
                        </span>
                    </Reveal>
                    <Reveal width="100%" delay={0.35}>
                        <h1 className="heading-1 mb-6 text-slate-900 dark:text-white">
                            {c.title1} <span className="gradient-text">{c.titleGradient}</span>{' '}
                            {c.title2}
                        </h1>
                    </Reveal>
                    <Reveal width="100%" delay={0.45}>
                        <p className="text-body max-w-2xl mx-auto transition-colors duration-300">
                            {c.subtitle}
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-custom px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="glass-card p-10 bg-cream-50/40 dark:bg-neutral-900 border border-slate-200 dark:border-dark-700">
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {c.bullets.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-3 text-slate-700 dark:text-dark-300"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-orange-500/10 dark:bg-primary-500/10 flex items-center justify-center text-orange-500 dark:text-primary-500">
                                            <svg
                                                className="w-3 h-3"
                                                fill="none"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Roadmap Section */}
            <section className="section-padding bg-cream-50/30 dark:bg-neutral-900/50 transition-colors duration-300">
                <div className="container-custom px-4 sm:px-6 lg:px-8">
                    <Reveal width="100%">
                        <div className="text-center mb-16">
                            <h2 className="heading-2 mb-6 text-slate-900 dark:text-white">
                                {lang === 'ru'
                                    ? 'Ваш роадмап'
                                    : lang === 'es'
                                      ? 'Tu Roadmap'
                                      : 'Your Roadmap'}
                            </h2>
                            <p className="text-body max-w-2xl mx-auto">
                                {lang === 'ru'
                                    ? 'Пошаговый план от аудита до запуска с прозрачными результатами на каждом этапе'
                                    : lang === 'es'
                                      ? 'Plan paso a paso desde auditoría hasta lanzamiento con resultados transparentes en cada etapa'
                                      : 'Step-by-step plan from audit to launch with transparent results at every stage'}
                            </p>
                        </div>
                    </Reveal>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-orange-500 to-primary-500"></div>

                            {/* Roadmap Steps */}
                            <div className="space-y-12">
                                {/* Step 1 */}
                                <Reveal delay={0.1}>
                                    <div className="relative flex items-center md:items-start">
                                        <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 md:mx-auto md:mb-8">
                                            1
                                        </div>
                                        <div className="ml-6 md:ml-0 md:grid md:grid-cols-2 md:gap-8 md:items-center">
                                            <div className="md:text-right md:pr-8">
                                                <h3 className="heading-3 mb-2 text-slate-900 dark:text-white">
                                                    {lang === 'ru'
                                                        ? 'Аудит и анализ'
                                                        : lang === 'es'
                                                          ? 'Auditoría y análisis'
                                                          : 'Audit & Analysis'}
                                                </h3>
                                                <p className="text-body text-sm">
                                                    {lang === 'ru'
                                                        ? 'Глубокий анализ текущего состояния, выявление проблем и возможностей'
                                                        : lang === 'es'
                                                          ? 'Análisis profundo del estado actual, identificación de problemas y oportunidades'
                                                          : 'Deep analysis of current state, identifying problems and opportunities'}
                                                </p>
                                            </div>
                                            <div className="hidden md:block">
                                                <div className="glass-card p-6 bg-white/60 dark:bg-neutral-800/60 border border-slate-200 dark:border-dark-700">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                                                            <svg
                                                                className="w-4 h-4 text-orange-500"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <span className="text-sm font-medium text-slate-700 dark:text-dark-300">
                                                            {lang === 'ru'
                                                                ? 'Результат'
                                                                : lang === 'es'
                                                                  ? 'Resultado'
                                                                  : 'Result'}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-600 dark:text-dark-400">
                                                        {lang === 'ru'
                                                            ? 'Детальный отчет с приоритетами и рекомендациями'
                                                            : lang === 'es'
                                                              ? 'Reporte detallado con prioridades y recomendaciones'
                                                              : 'Detailed report with priorities and recommendations'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>

                                {/* Step 2 */}
                                <Reveal delay={0.2}>
                                    <div className="relative flex items-center md:items-start">
                                        <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 md:mx-auto md:mb-8">
                                            2
                                        </div>
                                        <div className="ml-6 md:ml-0 md:grid md:grid-cols-2 md:gap-8 md:items-center">
                                            <div className="md:order-2 md:text-left md:pl-8">
                                                <h3 className="heading-3 mb-2 text-slate-900 dark:text-white">
                                                    {lang === 'ru'
                                                        ? 'Стратегия и планирование'
                                                        : lang === 'es'
                                                          ? 'Estrategia y planificación'
                                                          : 'Strategy & Planning'}
                                                </h3>
                                                <p className="text-body text-sm">
                                                    {lang === 'ru'
                                                        ? 'Разработка дорожной карты и выбор технологий под ваши задачи'
                                                        : lang === 'es'
                                                          ? 'Desarrollo de roadmap y selección de tecnologías para tus objetivos'
                                                          : 'Roadmap development and technology selection for your goals'}
                                                </p>
                                            </div>
                                            <div className="md:order-1 hidden md:block">
                                                <div className="glass-card p-6 bg-white/60 dark:bg-neutral-800/60 border border-slate-200 dark:border-dark-700">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                                                            <svg
                                                                className="w-4 h-4 text-orange-500"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <span className="text-sm font-medium text-slate-700 dark:text-dark-300">
                                                            {lang === 'ru'
                                                                ? 'Результат'
                                                                : lang === 'es'
                                                                  ? 'Resultado'
                                                                  : 'Result'}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-600 dark:text-dark-400">
                                                        {lang === 'ru'
                                                            ? 'План проекта с сроками и бюджетом'
                                                            : lang === 'es'
                                                              ? 'Plan de proyecto con plazos y presupuesto'
                                                              : 'Project plan with timeline and budget'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>

                                {/* Step 3 */}
                                <Reveal delay={0.3}>
                                    <div className="relative flex items-center md:items-start">
                                        <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 md:mx-auto md:mb-8">
                                            3
                                        </div>
                                        <div className="ml-6 md:ml-0 md:grid md:grid-cols-2 md:gap-8 md:items-center">
                                            <div className="md:text-right md:pr-8">
                                                <h3 className="heading-3 mb-2 text-slate-900 dark:text-white">
                                                    {lang === 'ru'
                                                        ? 'Разработка и итерации'
                                                        : lang === 'es'
                                                          ? 'Desarrollo e iteraciones'
                                                          : 'Development & Iterations'}
                                                </h3>
                                                <p className="text-body text-sm">
                                                    {lang === 'ru'
                                                        ? 'Пошаговая реализация с регулярными демонстрациями и обратной связью'
                                                        : lang === 'es'
                                                          ? 'Implementación paso a paso con demostraciones regulares y feedback'
                                                          : 'Step-by-step implementation with regular demos and feedback'}
                                                </p>
                                            </div>
                                            <div className="hidden md:block">
                                                <div className="glass-card p-6 bg-white/60 dark:bg-neutral-800/60 border border-slate-200 dark:border-dark-700">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                                                            <svg
                                                                className="w-4 h-4 text-orange-500"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <span className="text-sm font-medium text-slate-700 dark:text-dark-300">
                                                            {lang === 'ru'
                                                                ? 'Результат'
                                                                : lang === 'es'
                                                                  ? 'Resultado'
                                                                  : 'Result'}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-600 dark:text-dark-400">
                                                        {lang === 'ru'
                                                            ? 'Рабочий прототип и MVP функционал'
                                                            : lang === 'es'
                                                              ? 'Prototipo funcional y MVP'
                                                              : 'Working prototype and MVP functionality'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>

                                {/* Step 4 */}
                                <Reveal delay={0.4}>
                                    <div className="relative flex items-center md:items-start">
                                        <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 md:mx-auto md:mb-8">
                                            4
                                        </div>
                                        <div className="ml-6 md:ml-0 md:grid md:grid-cols-2 md:gap-8 md:items-center">
                                            <div className="md:order-2 md:text-left md:pl-8">
                                                <h3 className="heading-3 mb-2 text-slate-900 dark:text-white">
                                                    {lang === 'ru'
                                                        ? 'Запуск и поддержка'
                                                        : lang === 'es'
                                                          ? 'Lanzamiento y soporte'
                                                          : 'Launch & Support'}
                                                </h3>
                                                <p className="text-body text-sm">
                                                    {lang === 'ru'
                                                        ? 'Продуктивный запуск и дальнейшая техническая поддержка'
                                                        : lang === 'es'
                                                          ? 'Lanzamiento productivo y soporte técnico continuo'
                                                          : 'Production launch and ongoing technical support'}
                                                </p>
                                            </div>
                                            <div className="md:order-1 hidden md:block">
                                                <div className="glass-card p-6 bg-white/60 dark:bg-neutral-800/60 border border-slate-200 dark:border-dark-700">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                                                            <svg
                                                                className="w-4 h-4 text-orange-500"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M5 13l4 4L19 7"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <span className="text-sm font-medium text-slate-700 dark:text-dark-300">
                                                            {lang === 'ru'
                                                                ? 'Результат'
                                                                : lang === 'es'
                                                                  ? 'Resultado'
                                                                  : 'Result'}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-600 dark:text-dark-400">
                                                        {lang === 'ru'
                                                            ? 'Готовый продукт и план развития'
                                                            : lang === 'es'
                                                              ? 'Producto listo y plan de desarrollo'
                                                              : 'Ready product and development plan'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CTA lang={lang as Locale} dict={dict.services.cta} commonDict={dict.hero} />
        </div>
    );
}
