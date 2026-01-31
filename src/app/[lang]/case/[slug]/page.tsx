import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';
import { ArrowLeft, ArrowRight, Calendar, Building2, Clock, ExternalLink } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

interface CaseStudy {
    slug: string;
    title: string;
    client: string;
    industry: string;
    duration: string;
    year: string;
    heroImage: string;
    challenge: string;
    solution: string;
    results: {
        label: string;
        value: string;
        change?: string;
    }[];
    technologies: string[];
    testimonial?: {
        quote: string;
        author: string;
        role: string;
    };
    gallery: string[];
    nextCase?: string;
}

// Case studies data - in production this could come from a CMS
const caseStudies: Record<string, Record<string, CaseStudy>> = {
    en: {
        'luxe-fashion': {
            slug: 'luxe-fashion',
            title: 'Luxe Fashion E-Commerce',
            client: 'Luxe Brands Inc.',
            industry: 'Fashion & Retail',
            duration: '4 months',
            year: '2024',
            heroImage: '/images/cases/luxe-fashion-hero.jpg',
            challenge: 'Luxe Brands Inc. needed a complete overhaul of their outdated e-commerce platform. Their existing site suffered from slow load times, poor mobile experience, and a checkout process that led to high cart abandonment rates. They needed a modern, fast, and intuitive shopping experience that matched their premium brand positioning.',
            solution: 'We built a custom Next.js e-commerce platform with advanced product filtering, real-time inventory updates, and a streamlined checkout process. The new design focuses on high-quality imagery and smooth animations to create a luxurious shopping experience. We implemented server-side rendering for optimal SEO and performance.',
            results: [
                { label: 'Conversion Rate', value: '4.8%', change: '+200%' },
                { label: 'Average Order Value', value: '$285', change: '+150%' },
                { label: 'Page Load Time', value: '2.5s', change: '-60%' },
                { label: 'Mobile Traffic', value: '68%', change: '+45%' },
            ],
            technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Sanity CMS', 'Vercel'],
            testimonial: {
                quote: 'Selen.IT transformed our online presence completely. The new platform not only looks stunning but has significantly improved our sales metrics.',
                author: 'Sarah Mitchell',
                role: 'CEO, Luxe Brands Inc.',
            },
            gallery: [
                '/images/cases/luxe-fashion-1.jpg',
                '/images/cases/luxe-fashion-2.jpg',
                '/images/cases/luxe-fashion-3.jpg',
            ],
            nextCase: 'fintech-dashboard',
        },
        'fintech-dashboard': {
            slug: 'fintech-dashboard',
            title: 'FinTech Analytics Dashboard',
            client: 'FinanceHub Corp.',
            industry: 'Financial Services',
            duration: '6 months',
            year: '2024',
            heroImage: '/images/cases/fintech-hero.jpg',
            challenge: 'FinanceHub Corp. needed a powerful analytics platform that could process millions of transactions in real-time and present complex financial data in an intuitive, actionable format. Their existing tools were fragmented and lacked the sophisticated visualization capabilities their clients demanded.',
            solution: 'We developed a comprehensive SaaS dashboard with real-time data streaming, interactive charts, AI-powered insights, and customizable reporting. The platform features role-based access control, multi-tenant architecture, and seamless integration with major financial data providers.',
            results: [
                { label: 'Active Users', value: '50K+', change: '' },
                { label: 'Platform Uptime', value: '99.9%', change: '' },
                { label: 'Data Processing', value: 'Real-time', change: '' },
                { label: 'Client Retention', value: '95%', change: '+15%' },
            ],
            technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'WebSocket', 'AWS'],
            testimonial: {
                quote: 'The analytics platform Selen.IT built for us has become the cornerstone of our business. Our clients love the intuitive interface and real-time insights.',
                author: 'Michael Chen',
                role: 'CTO, FinanceHub Corp.',
            },
            gallery: [
                '/images/cases/fintech-1.jpg',
                '/images/cases/fintech-2.jpg',
                '/images/cases/fintech-3.jpg',
            ],
            nextCase: 'luxe-fashion',
        },
    },
    ru: {
        'luxe-fashion': {
            slug: 'luxe-fashion',
            title: 'Премиум Магазин Одежды',
            client: 'Luxe Brands Inc.',
            industry: 'Мода и Ритейл',
            duration: '4 месяца',
            year: '2024',
            heroImage: '/images/cases/luxe-fashion-hero.jpg',
            challenge: 'Luxe Brands Inc. нуждались в полной переработке их устаревшей e-commerce платформы. Существующий сайт страдал от медленной загрузки, плохого мобильного опыта и процесса оформления заказа, который приводил к высокому проценту брошенных корзин.',
            solution: 'Мы создали кастомную Next.js e-commerce платформу с продвинутой фильтрацией товаров, обновлением запасов в реальном времени и оптимизированным процессом оформления заказа. Новый дизайн фокусируется на высококачественных изображениях и плавных анимациях.',
            results: [
                { label: 'Конверсия', value: '4.8%', change: '+200%' },
                { label: 'Средний чек', value: '$285', change: '+150%' },
                { label: 'Время загрузки', value: '2.5с', change: '-60%' },
                { label: 'Мобильный трафик', value: '68%', change: '+45%' },
            ],
            technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Sanity CMS', 'Vercel'],
            testimonial: {
                quote: 'Selen.IT полностью преобразили наше онлайн-присутствие. Новая платформа не только выглядит потрясающе, но и значительно улучшила наши показатели продаж.',
                author: 'Сара Митчелл',
                role: 'CEO, Luxe Brands Inc.',
            },
            gallery: [
                '/images/cases/luxe-fashion-1.jpg',
                '/images/cases/luxe-fashion-2.jpg',
                '/images/cases/luxe-fashion-3.jpg',
            ],
            nextCase: 'fintech-dashboard',
        },
        'fintech-dashboard': {
            slug: 'fintech-dashboard',
            title: 'Панель Аналитики FinTech',
            client: 'FinanceHub Corp.',
            industry: 'Финансовые услуги',
            duration: '6 месяцев',
            year: '2024',
            heroImage: '/images/cases/fintech-hero.jpg',
            challenge: 'FinanceHub Corp. нуждались в мощной аналитической платформе, способной обрабатывать миллионы транзакций в реальном времени и представлять сложные финансовые данные в интуитивном, практически применимом формате.',
            solution: 'Мы разработали комплексную SaaS-панель с потоковой передачей данных в реальном времени, интерактивными графиками, AI-инсайтами и настраиваемой отчетностью. Платформа имеет ролевой контроль доступа и мультитенантную архитектуру.',
            results: [
                { label: 'Активные пользователи', value: '50K+', change: '' },
                { label: 'Аптайм платформы', value: '99.9%', change: '' },
                { label: 'Обработка данных', value: 'Реальное время', change: '' },
                { label: 'Удержание клиентов', value: '95%', change: '+15%' },
            ],
            technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'WebSocket', 'AWS'],
            testimonial: {
                quote: 'Аналитическая платформа, созданная Selen.IT, стала краеугольным камнем нашего бизнеса. Наши клиенты в восторге от интуитивного интерфейса.',
                author: 'Михаил Чен',
                role: 'CTO, FinanceHub Corp.',
            },
            gallery: [
                '/images/cases/fintech-1.jpg',
                '/images/cases/fintech-2.jpg',
                '/images/cases/fintech-3.jpg',
            ],
            nextCase: 'luxe-fashion',
        },
    },
    es: {
        'luxe-fashion': {
            slug: 'luxe-fashion',
            title: 'Tienda de Moda de Lujo',
            client: 'Luxe Brands Inc.',
            industry: 'Moda y Retail',
            duration: '4 meses',
            year: '2024',
            heroImage: '/images/cases/luxe-fashion-hero.jpg',
            challenge: 'Luxe Brands Inc. necesitaba una renovación completa de su plataforma de comercio electrónico obsoleta. Su sitio existente sufría de tiempos de carga lentos, mala experiencia móvil y un proceso de pago que llevaba a altas tasas de abandono del carrito.',
            solution: 'Construimos una plataforma de comercio electrónico Next.js personalizada con filtrado avanzado de productos, actualizaciones de inventario en tiempo real y un proceso de pago optimizado. El nuevo diseño se centra en imágenes de alta calidad y animaciones fluidas.',
            results: [
                { label: 'Tasa de Conversión', value: '4.8%', change: '+200%' },
                { label: 'Pedido Promedio', value: '$285', change: '+150%' },
                { label: 'Tiempo de Carga', value: '2.5s', change: '-60%' },
                { label: 'Tráfico Móvil', value: '68%', change: '+45%' },
            ],
            technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Sanity CMS', 'Vercel'],
            testimonial: {
                quote: 'Selen.IT transformó completamente nuestra presencia online. La nueva plataforma no solo se ve impresionante, sino que ha mejorado significativamente nuestras métricas de ventas.',
                author: 'Sarah Mitchell',
                role: 'CEO, Luxe Brands Inc.',
            },
            gallery: [
                '/images/cases/luxe-fashion-1.jpg',
                '/images/cases/luxe-fashion-2.jpg',
                '/images/cases/luxe-fashion-3.jpg',
            ],
            nextCase: 'fintech-dashboard',
        },
        'fintech-dashboard': {
            slug: 'fintech-dashboard',
            title: 'Panel de Análisis FinTech',
            client: 'FinanceHub Corp.',
            industry: 'Servicios Financieros',
            duration: '6 meses',
            year: '2024',
            heroImage: '/images/cases/fintech-hero.jpg',
            challenge: 'FinanceHub Corp. necesitaba una potente plataforma de análisis que pudiera procesar millones de transacciones en tiempo real y presentar datos financieros complejos en un formato intuitivo y accionable.',
            solution: 'Desarrollamos un dashboard SaaS completo con transmisión de datos en tiempo real, gráficos interactivos, insights impulsados por IA e informes personalizables. La plataforma cuenta con control de acceso basado en roles y arquitectura multi-tenant.',
            results: [
                { label: 'Usuarios Activos', value: '50K+', change: '' },
                { label: 'Uptime', value: '99.9%', change: '' },
                { label: 'Procesamiento', value: 'Tiempo real', change: '' },
                { label: 'Retención', value: '95%', change: '+15%' },
            ],
            technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'WebSocket', 'AWS'],
            testimonial: {
                quote: 'La plataforma de análisis que Selen.IT construyó para nosotros se ha convertido en la piedra angular de nuestro negocio. Nuestros clientes aman la interfaz intuitiva.',
                author: 'Michael Chen',
                role: 'CTO, FinanceHub Corp.',
            },
            gallery: [
                '/images/cases/fintech-1.jpg',
                '/images/cases/fintech-2.jpg',
                '/images/cases/fintech-3.jpg',
            ],
            nextCase: 'luxe-fashion',
        },
    },
};

// UI translations
const uiText = {
    en: {
        backToPortfolio: 'Back to Portfolio',
        theChallenge: 'The Challenge',
        ourSolution: 'Our Solution',
        keyResults: 'Key Results',
        technologiesUsed: 'Technologies Used',
        clientTestimonial: 'Client Testimonial',
        projectGallery: 'Project Gallery',
        readyToStart: 'Ready for Similar Results?',
        ctaText: "Let's discuss how we can help transform your business.",
        ctaButton: 'Start Your Project',
        nextCase: 'Next Case Study',
        client: 'Client',
        industry: 'Industry',
        duration: 'Duration',
        year: 'Year',
    },
    ru: {
        backToPortfolio: 'Назад к портфолио',
        theChallenge: 'Задача',
        ourSolution: 'Наше решение',
        keyResults: 'Ключевые результаты',
        technologiesUsed: 'Технологии',
        clientTestimonial: 'Отзыв клиента',
        projectGallery: 'Галерея проекта',
        readyToStart: 'Хотите такие же результаты?',
        ctaText: 'Давайте обсудим, как мы можем помочь трансформировать ваш бизнес.',
        ctaButton: 'Начать проект',
        nextCase: 'Следующий кейс',
        client: 'Клиент',
        industry: 'Индустрия',
        duration: 'Длительность',
        year: 'Год',
    },
    es: {
        backToPortfolio: 'Volver al Portafolio',
        theChallenge: 'El Desafío',
        ourSolution: 'Nuestra Solución',
        keyResults: 'Resultados Clave',
        technologiesUsed: 'Tecnologías Utilizadas',
        clientTestimonial: 'Testimonio del Cliente',
        projectGallery: 'Galería del Proyecto',
        readyToStart: '¿Listo para resultados similares?',
        ctaText: 'Hablemos sobre cómo podemos ayudar a transformar su negocio.',
        ctaButton: 'Iniciar Proyecto',
        nextCase: 'Siguiente Caso',
        client: 'Cliente',
        industry: 'Industria',
        duration: 'Duración',
        year: 'Año',
    },
};

export async function generateMetadata({
    params: { lang, slug },
}: {
    params: { lang: string; slug: string };
}): Promise<Metadata> {
    const caseStudy = caseStudies[lang]?.[slug] || caseStudies.en?.[slug];

    if (!caseStudy) {
        return {
            title: 'Case Study Not Found',
        };
    }

    return {
        title: `${caseStudy.title} | Case Study`,
        description: caseStudy.challenge.substring(0, 160),
    };
}

export async function generateStaticParams() {
    const params: { lang: string; slug: string }[] = [];

    for (const lang of ['en', 'ru', 'es']) {
        for (const slug of Object.keys(caseStudies.en || {})) {
            params.push({ lang, slug });
        }
    }

    return params;
}

export default async function CaseStudyPage({
    params: { lang, slug },
}: {
    params: { lang: string; slug: string };
}) {
    const caseStudy = caseStudies[lang]?.[slug] || caseStudies.en?.[slug];
    const ui = uiText[lang as keyof typeof uiText] || uiText.en;

    if (!caseStudy) {
        notFound();
    }

    const nextCaseStudy = caseStudy.nextCase
        ? caseStudies[lang]?.[caseStudy.nextCase] || caseStudies.en?.[caseStudy.nextCase]
        : null;

    return (
        <div className="min-h-screen bg-cream-50 dark:bg-dark-950 transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 dark:from-primary-500/5 dark:to-primary-600/5" />
                <div className="container-custom relative">
                    <Reveal>
                        <Link
                            href={`/${lang}/showreel`}
                            className="inline-flex items-center gap-2 text-slate-600 dark:text-dark-400 hover:text-orange-500 dark:hover:text-primary-500 transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {ui.backToPortfolio}
                        </Link>
                    </Reveal>

                    <Reveal>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                            {caseStudy.title}
                        </h1>
                    </Reveal>

                    {/* Metadata */}
                    <Reveal>
                        <div className="flex flex-wrap gap-6 mb-12">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-dark-400">
                                <Building2 className="w-5 h-5" />
                                <span className="text-sm font-medium">{ui.client}:</span>
                                <span>{caseStudy.client}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-dark-400">
                                <span className="text-sm font-medium">{ui.industry}:</span>
                                <span>{caseStudy.industry}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-dark-400">
                                <Clock className="w-5 h-5" />
                                <span className="text-sm font-medium">{ui.duration}:</span>
                                <span>{caseStudy.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-dark-400">
                                <Calendar className="w-5 h-5" />
                                <span className="text-sm font-medium">{ui.year}:</span>
                                <span>{caseStudy.year}</span>
                            </div>
                        </div>
                    </Reveal>

                    {/* Hero Image Placeholder */}
                    <Reveal>
                        <div className="aspect-video rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 dark:from-primary-500/20 dark:to-primary-600/20 flex items-center justify-center overflow-hidden">
                            <span className="text-slate-500 dark:text-dark-400">Hero Image</span>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Challenge & Solution */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                        <Reveal>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                                    {ui.theChallenge}
                                </h2>
                                <p className="text-slate-600 dark:text-dark-300 leading-relaxed">
                                    {caseStudy.challenge}
                                </p>
                            </div>
                        </Reveal>
                        <Reveal>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                                    {ui.ourSolution}
                                </h2>
                                <p className="text-slate-600 dark:text-dark-300 leading-relaxed">
                                    {caseStudy.solution}
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Key Results */}
            <section className="section-padding bg-white dark:bg-dark-900">
                <div className="container-custom">
                    <Reveal>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
                            {ui.keyResults}
                        </h2>
                    </Reveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {caseStudy.results.map((result, index) => (
                            <Reveal key={index}>
                                <div className="p-6 rounded-2xl bg-cream-50 dark:bg-dark-800 text-center">
                                    <div className="text-4xl font-bold gradient-text mb-2">
                                        {result.value}
                                    </div>
                                    {result.change && (
                                        <div className="text-green-500 text-sm font-medium mb-2">
                                            {result.change}
                                        </div>
                                    )}
                                    <div className="text-slate-600 dark:text-dark-400 text-sm">
                                        {result.label}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technologies */}
            <section className="section-padding">
                <div className="container-custom">
                    <Reveal>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                            {ui.technologiesUsed}
                        </h2>
                    </Reveal>
                    <Reveal>
                        <div className="flex flex-wrap gap-3">
                            {caseStudy.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 rounded-full bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-dark-300 text-sm font-medium"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Testimonial */}
            {caseStudy.testimonial && (
                <section className="section-padding bg-gradient-to-br from-orange-500/5 to-amber-500/5 dark:from-primary-500/5 dark:to-primary-600/5">
                    <div className="container-custom max-w-4xl">
                        <Reveal>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
                                {ui.clientTestimonial}
                            </h2>
                        </Reveal>
                        <Reveal>
                            <blockquote className="text-center">
                                <p className="text-xl md:text-2xl text-slate-700 dark:text-dark-200 italic mb-6">
                                    &ldquo;{caseStudy.testimonial.quote}&rdquo;
                                </p>
                                <footer>
                                    <p className="font-semibold text-slate-900 dark:text-white">
                                        {caseStudy.testimonial.author}
                                    </p>
                                    <p className="text-slate-600 dark:text-dark-400 text-sm">
                                        {caseStudy.testimonial.role}
                                    </p>
                                </footer>
                            </blockquote>
                        </Reveal>
                    </div>
                </section>
            )}

            {/* Gallery */}
            <section className="section-padding">
                <div className="container-custom">
                    <Reveal>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                            {ui.projectGallery}
                        </h2>
                    </Reveal>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {caseStudy.gallery.map((image, index) => (
                            <Reveal key={index}>
                                <div className="aspect-video rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-dark-700 dark:to-dark-800 flex items-center justify-center">
                                    <span className="text-slate-500 dark:text-dark-400 text-sm">
                                        Gallery Image {index + 1}
                                    </span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-gradient-to-br from-orange-500 to-amber-500 dark:from-primary-600 dark:to-primary-700">
                <div className="container-custom text-center">
                    <Reveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {ui.readyToStart}
                        </h2>
                    </Reveal>
                    <Reveal>
                        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                            {ui.ctaText}
                        </p>
                    </Reveal>
                    <Reveal>
                        <Link
                            href={`/${lang}/contact`}
                            className="inline-block px-8 py-4 bg-white text-orange-500 dark:text-primary-600 font-semibold rounded-full hover:bg-slate-100 transition-colors"
                        >
                            {ui.ctaButton}
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* Next Case */}
            {nextCaseStudy && (
                <section className="section-padding bg-white dark:bg-dark-900">
                    <div className="container-custom">
                        <Reveal>
                            <Link
                                href={`/${lang}/case/${nextCaseStudy.slug}`}
                                className="group flex items-center justify-between p-8 rounded-2xl bg-cream-50 dark:bg-dark-800 hover:bg-cream-100 dark:hover:bg-dark-700 transition-colors"
                            >
                                <div>
                                    <p className="text-slate-600 dark:text-dark-400 text-sm mb-2">
                                        {ui.nextCase}
                                    </p>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-primary-500 transition-colors">
                                        {nextCaseStudy.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-dark-400">
                                        {nextCaseStudy.client}
                                    </p>
                                </div>
                                <ArrowRight className="w-8 h-8 text-slate-400 group-hover:text-orange-500 dark:group-hover:text-primary-500 group-hover:translate-x-2 transition-all" />
                            </Link>
                        </Reveal>
                    </div>
                </section>
            )}
        </div>
    );
}
