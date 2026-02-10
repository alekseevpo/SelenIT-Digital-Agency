import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import CTA from '@/components/sections/CTA';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

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
    const baseUrl = 'https://selen.it';
    const breadcrumbs = [
        { name: dict.common.nav.home, url: `${baseUrl}/${lang}` },
        { name: dict.common.nav.services, url: `${baseUrl}/${lang}/services` },
        { name: c.badge, url: `${baseUrl}/${lang}/services/branding` },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
            <BreadcrumbJsonLd items={breadcrumbs} />
            <section className="pt-32 pb-20 relative overflow-hidden bg-transparent dark:bg-black transition-colors duration-300">
                <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="text-red-600 dark:text-red-500 font-semibold text-sm uppercase tracking-wider mb-2 block">
                        {c.badge}
                    </span>
                    <h1 className="heading-1 mb-4 text-slate-900 dark:text-white">
                        {c.title1}{' '}
                        <span className="gradient-text">{c.titleGradient}</span> {c.title2}
                    </h1>
                    <p className="text-body max-w-2xl mx-auto transition-colors duration-300">{c.subtitle}</p>
                </div>
            </section>

            {/* New Content Section */}
            <section className="section-padding">
                <div className="container-custom px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                                <p className="mb-6 text-body leading-relaxed">
                                    В мире, где средний пользователь видит до 10 000 рекламных сообщений в день, «просто логотипа» уже недостаточно. Чтобы клиент выбрал вас, а не конкурента с ценой на 5% ниже, ваш бренд должен обладать чем-то большим, чем симпатичная картинка. Он должен обладать <strong>характером, ценностями и ДНК</strong>.
                                </p>
                                <p className="mb-6 text-body leading-relaxed">
                                    В <strong>SELEN.IT</strong> мы не просто «рисуем бренды» — мы проектируем эмоциональный опыт, который заставляет аудиторию влюбляться.
                                </p>
                                
                                <h3 className="heading-3 mb-4 text-slate-900 dark:text-white">
                                    1. Фундамент: Смысл важнее формы
                                </h3>
                                <p className="mb-6 text-body leading-relaxed">
                                    Запоминающийся бренд начинается не с выбора шрифта, а с ответов на неудобные вопросы: <em>«Почему вы существуете? Какую проблему вы решаете так, как никто другой?»</em>
                                </p>
                                <ul className="list-disc list-inside mb-6 text-body space-y-2">
                                    <li><strong>Исследование:</strong> Мы анализируем рынок и конкурентов, чтобы найти «белое пятно» — ту нишу, где вы будете звучать громче всех.</li>
                                    <li><strong>Позиционирование:</strong> Мы формулируем суть бренда. Это тот самый «крючок», который зацепит вашу целевую аудиторию.</li>
                                </ul>
                                
                                <h3 className="heading-3 mb-4 text-slate-900 dark:text-white">
                                    2. Визуальная айдентика: Лицо, которое узнают из тысячи
                                </h3>
                                <p className="mb-6 text-body leading-relaxed">
                                    Визуальный стиль — это не мода, это коммуникация. Цвет, типографика и графические элементы должны работать на подсознание.
                                </p>
                                <ul className="list-disc list-inside mb-6 text-body space-y-2">
                                    <li>Мы создаем дизайн, который передает ваше сообщение за доли секунды.</li>
                                    <li><strong>Системность:</strong> Ваш бренд будет выглядеть одинаково дорого и профессионально как на иконке мобильного приложения, так и на огромном билборде.</li>
                                </ul>
                                
                                <h3 className="heading-3 mb-4 text-slate-900 dark:text-white">
                                    3. Голос бренда (Tone of Voice)
                                </h3>
                                <p className="mb-6 text-body leading-relaxed">
                                    Бренды, которые запоминаются, умеют разговаривать. Они могут быть дерзкими, заботливыми, экспертными или ироничными. Мы помогаем найти тот уникальный тон, который сделает общение с вашими клиентами личным и доверительным.
                                </p>
                                
                                <h3 className="heading-3 mb-4 text-slate-900 dark:text-white">
                                    4. Развитие: Бренд как живой организм
                                </h3>
                                <p className="mb-6 text-body leading-relaxed">
                                    Создать бренд — это только 20% успеха. Остальные 80% — это его внедрение и поддержка.
                                </p>
                                <ul className="list-disc list-inside mb-6 text-body space-y-2">
                                    <li>Мы помогаем интегрировать бренд во все точки контакта с клиентом.</li>
                                    <li>Разрабатываем стратегию продвижения, чтобы о вас не просто узнали, а начали говорить.</li>
                                </ul>
                                
                                <blockquote className="border-l-4 border-red-600 pl-6 my-8 italic text-slate-700 dark:text-slate-300">
                                    <p className="font-semibold">
                                        Брендинг — это долгосрочная инвестиция в добавочную стоимость. <strong>Сильный бренд позволяет продавать дороже, нанимать лучших сотрудников и сохранять лояльность клиентов годами.</strong>
                                    </p>
                                </blockquote>
                                
                                <h3 className="heading-3 mb-4 text-slate-900 dark:text-white">
                                    Почему стоит доверить это SELEN.IT?
                                </h3>
                                <p className="mb-6 text-body leading-relaxed">
                                    Мы объединяем аналитический подход digital-агентства с креативным видением. Мы не предлагаем шаблонных решений, потому что ваш бизнес уникален. Наша задача — сделать так, чтобы при упоминании вашей ниши у клиента в голове сразу всплывало название вашей компании.
                                </p>
                                
                                <div className="bg-cream-50 dark:bg-dark-800 rounded-2xl p-8 my-8 border border-slate-200 dark:border-dark-700">
                                    <p className="text-center text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                        Готовы заявить о себе так, чтобы вас невозможно было игнорировать?
                                    </p>
                                    <p className="text-center text-body mb-6">
                                        Хотите, я подготовлю для вас краткий бриф или план бесплатной консультации, чтобы мы могли обсудить ваш будущий бренд?
                                    </p>
                                </div>
                            </div>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-custom px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="glass-card p-10 bg-cream-50/40 dark:bg-neutral-900 border border-slate-200 dark:border-dark-700">
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
