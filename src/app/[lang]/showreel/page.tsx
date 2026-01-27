import type { Metadata } from 'next';
import Link from 'next/link';
import ShowreelGrid from '@/components/ShowreelGrid';

export const metadata: Metadata = {
    title: 'Showreel | Selen.IT Digital Agency',
    description: 'Explore our showreel of successful web development projects.',
};

const getProjects = (lang: string) => [
    {
        id: 1,
        title: lang === 'ru' ? 'Премиум Магазин Одежды' : lang === 'es' ? 'Tienda de Moda de Lujo' : 'Luxe Fashion E-Commerce',
        category: lang === 'ru' ? 'E-Commerce' : 'E-Commerce',
        description: lang === 'ru'
            ? 'Современный онлайн-магазин с продвинутой фильтрацией и бесшовной оплатой.'
            : 'A premium online fashion store with advanced filtering and seamless checkout experience.',
        client: 'Luxe Brands Inc.',
        year: '2024',
        tags: ['Next.js', 'Stripe', 'Tailwind CSS', 'PostgreSQL'],
        color: 'from-purple-500 to-pink-500',
        results: ['+200% conversion', '+150% order value', '2.5s load'],
    },
    {
        id: 2,
        title: lang === 'ru' ? 'Панель Аналитики FinTech' : 'FinTech Analytics Dashboard',
        category: 'Web Application',
        description: lang === 'ru'
            ? 'Платформа финансовой аналитики в реальном времени с интерактивными графиками.'
            : 'Real-time financial analytics platform with interactive charts and AI insights.',
        client: 'FinanceHub Corp.',
        year: '2024',
        tags: ['React', 'D3.js', 'Node.js', 'Redis'],
        color: 'from-blue-500 to-cyan-500',
        results: ['50K+ users', '99.9% uptime', 'Real-time data'],
    },
];

const categories = ['All', 'Web Development', 'E-Commerce', 'Web Application', 'UI/UX Design'];

interface PageProps {
    params: { lang: string };
}

export default function ShowreelPage({ params: { lang } }: PageProps) {
    const projects = getProjects(lang);

    const content = {
        en: {
            hero: { badge: 'Our Showreel', title1: 'Work That', titleGradient: 'Speaks for Itself', subtitle: 'Explore our collection of successful projects.' },
            grid: { filterAll: 'All', projectPreview: 'Project Preview', client: 'Client' },
            cta: { title1: 'Ready to Join Our', titleGradient: 'Showreel?', subtitle: 'Your project could be our next success story.', button: 'Start Your Project' }
        },
        ru: {
            hero: { badge: 'Наши работы', title1: 'Работы, которые', titleGradient: 'говорят сами за себя', subtitle: 'Изучите нашу коллекцию успешных проектов.' },
            grid: { filterAll: 'Все', projectPreview: 'Предпросмотр проекта', client: 'Клиент' },
            cta: { title1: 'Хотите попасть в наше', titleGradient: 'портфолио?', subtitle: 'Ваш проект может стать нашей следующей историей успеха.', button: 'Начать проект' }
        },
        es: {
            hero: { badge: 'Nuestro Portafolio', title1: 'Trabajo que', titleGradient: 'habla por sí mismo', subtitle: 'Explore nuestra colección de proyectos exitosos.' },
            grid: { filterAll: 'Todos', projectPreview: 'Vista previa', client: 'Cliente' },
            cta: { title1: '¿Listo para unirte a nuestro', titleGradient: 'portafolio?', subtitle: 'Su proyecto podría ser nuestra próxima historia de éxito.', button: 'Iniciar Proyecto' }
        }
    }[lang as 'en' | 'ru' | 'es'] || {
        hero: { badge: 'Our Showreel', title1: 'Work That', titleGradient: 'Speaks for Itself', subtitle: 'Explore projects.' },
        grid: { filterAll: 'All', projectPreview: 'Preview', client: 'Client' },
        cta: { title1: 'Ready?', titleGradient: 'Showreel?', subtitle: 'Let us create.', button: 'Start' }
    };

    return (
        <div className="bg-white dark:bg-dark-950 min-h-screen transition-colors duration-300">
            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden bg-white dark:bg-dark-950 transition-colors duration-300">
                <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {content.hero.badge}
                        </span>
                        <h1 className="heading-1 mb-6 text-slate-900 dark:text-white">
                            {content.hero.title1}{' '}
                            <span className="gradient-text">{content.hero.titleGradient}</span>
                        </h1>
                        <p className="text-body transition-colors duration-300">
                            {content.hero.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            <ShowreelGrid
                projects={projects}
                categories={categories}
                lang={lang}
                dict={content.grid}
            />

            {/* CTA Section */}
            <section className="section-padding bg-slate-50 dark:bg-dark-900 transition-colors duration-300">
                <div className="container-custom">
                    <div className="glass-card p-12 text-center bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 shadow-xl">
                        <h2 className="heading-2 mb-6 text-slate-900 dark:text-white">
                            {content.cta.title1}{' '}
                            <span className="gradient-text">{content.cta.titleGradient}</span>
                        </h2>
                        <p className="text-body max-w-2xl mx-auto mb-10 transition-colors duration-300">
                            {content.cta.subtitle}
                        </p>
                        <Link href={`/${lang}/contact`} className="btn-primary text-lg px-8 py-4">
                            {content.cta.button}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
