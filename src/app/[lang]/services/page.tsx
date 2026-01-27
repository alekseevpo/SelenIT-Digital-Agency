import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Our Services | Selen.IT Digital Agency',
    description: 'Comprehensive web development, UI/UX design, and digital solutions.',
};

interface ServicesPageProps {
    params: { lang: string };
}

const services = [
    {
        id: 'web-development',
        icon: (
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        title: 'Web Development',
        description: 'We build fast, secure, and scalable websites using modern technologies and best practices.',
        features: [
            'Custom website development',
            'React & Next.js applications',
            'API development & integration',
            'Database design & optimization',
            'Cloud deployment & hosting',
            'Performance optimization',
        ],
        technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    },
    {
        id: 'ui-ux-design',
        icon: (
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        ),
        title: 'UI/UX Design',
        description: 'Beautiful, intuitive interfaces that engage users and deliver exceptional experiences.',
        features: [
            'User research & analysis',
            'Information architecture',
            'Wireframing & prototyping',
            'Visual design & branding',
            'Interaction design',
            'Usability testing',
        ],
        technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Framer', 'Principle'],
    },
    {
        id: 'ecommerce',
        icon: (
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        ),
        title: 'E-Commerce Solutions',
        description: 'Powerful online stores that convert visitors into customers with seamless shopping experiences.',
        features: [
            'Custom e-commerce platforms',
            'Payment gateway integration',
            'Inventory management',
            'Order fulfillment systems',
            'Customer portal & accounts',
            'Analytics & reporting',
        ],
        technologies: ['Shopify', 'Stripe', 'PayPal', 'WooCommerce', 'Magento', 'Custom'],
    },
    {
        id: 'web-applications',
        icon: (
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        title: 'Web Applications',
        description: 'Complex, feature-rich applications that solve real business problems and scale with your growth.',
        features: [
            'SaaS platform development',
            'Dashboard & admin panels',
            'Real-time features & chat',
            'Third-party integrations',
            'Workflow automation',
            'Multi-tenant architecture',
        ],
        technologies: ['React', 'Vue.js', 'Node.js', 'GraphQL', 'Redis', 'Docker'],
    },
    {
        id: 'mobile-first',
        icon: (
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
        title: 'Mobile-First Development',
        description: 'Progressive web apps and responsive solutions that work perfectly on any device.',
        features: [
            'Progressive Web Apps (PWA)',
            'Responsive web design',
            'Cross-platform compatibility',
            'Offline functionality',
            'Push notifications',
            'App-like experience',
        ],
        technologies: ['PWA', 'React Native', 'Flutter', 'Ionic', 'Capacitor', 'Expo'],
    },
    {
        id: 'maintenance',
        icon: (
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        title: 'Support & Maintenance',
        description: 'Keep your digital products running smoothly with our comprehensive support packages.',
        features: [
            '24/7 monitoring & alerts',
            'Regular security updates',
            'Performance optimization',
            'Bug fixes & patches',
            'Content updates',
            'Technical consultation',
        ],
        technologies: ['Monitoring', 'CI/CD', 'Security', 'Backups', 'SSL', 'CDN'],
    },
];

const process = [
    {
        step: '01',
        title: 'Discovery',
        description: 'We learn about your business, goals, and target audience to create a tailored strategy.',
    },
    {
        step: '02',
        title: 'Planning',
        description: 'Detailed project roadmap, wireframes, and technical specifications are created.',
    },
    {
        step: '03',
        title: 'Design',
        description: 'We craft beautiful, intuitive interfaces that reflect your brand and engage users.',
    },
    {
        step: '04',
        title: 'Development',
        description: 'Your project comes to life with clean, efficient code and rigorous testing.',
    },
    {
        step: '05',
        title: 'Launch',
        description: 'Thorough QA testing and seamless deployment to get your project live.',
    },
    {
        step: '06',
        title: 'Support',
        description: 'Ongoing maintenance, updates, and optimization to ensure continued success.',
    },
];

const getServicesData = (lang: string) => ({
    hero: {
        badge: lang === 'ru' ? 'Наши услуги' : lang === 'es' ? 'Nuestros Servicios' : 'Our Services',
        title1: lang === 'ru' ? 'Комплексные' : lang === 'es' ? 'Soluciones' : 'Comprehensive',
        titleGradient: lang === 'ru' ? 'цифровые решения' : lang === 'es' ? 'Digitales' : 'Digital Solutions',
        subtitle: lang === 'ru' ? 'От концепции до запуска.' : 'From concept to launch, we provide end-to-end digital services.'
    },
    process: {
        badge: lang === 'ru' ? 'Наш процесс' : lang === 'es' ? 'Nuestro Proceso' : 'Our Process',
        title1: lang === 'ru' ? 'Как мы' : lang === 'es' ? 'Cómo' : 'How We',
        titleGradient: lang === 'ru' ? 'работаем' : lang === 'es' ? 'Trabajamos' : 'Work',
        subtitle: lang === 'ru' ? 'Наша проверенная методология.' : 'Our proven methodology ensures every project is delivered on time.'
    },
    cta: {
        title: lang === 'ru' ? 'Готовы начать проект?' : 'Ready to Start Your Project?',
        subtitle: lang === 'ru' ? 'Давайте обсудим ваши требования.' : 'Let us discuss your requirements.',
        button: lang === 'ru' ? 'Получить расчет' : 'Get a Free Quote'
    }
});

const getLocalizedServices = (lang: string) => [
    {
        id: 'web-development',
        title: lang === 'ru' ? 'Веб-разработка' : lang === 'es' ? 'Desarrollo Web' : 'Web Development',
        description: lang === 'ru' ? 'Мы создаем быстрые и масштабируемые сайты.' : lang === 'es' ? 'Construimos sitios rápidos y escalables.' : 'We build fast, secure, and scalable websites using modern technologies.',
        features: lang === 'ru' ? ['Сайты на заказ', 'React приложения', 'API разработка'] : ['Custom websites', 'React & Next.js', 'API development'],
        technologies: ['React', 'Next.js', 'Node.js', 'TypeScript'],
        icon: (
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
    },
    {
        id: 'ui-ux-design',
        title: lang === 'ru' ? 'UI/UX Дизайн' : lang === 'es' ? 'Diseño UI/UX' : 'UI/UX Design',
        description: lang === 'ru' ? 'Интуитивные интерфейсы для пользователей.' : 'Beautiful, intuitive interfaces that engage users.',
        features: lang === 'ru' ? ['Исследование пользователей', 'Прототипирование'] : ['User research', 'Prototyping', 'Visual design'],
        technologies: ['Figma', 'Adobe XD', 'Framer'],
        icon: (
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        ),
    },
    {
        id: 'ecommerce',
        title: lang === 'ru' ? 'E-Commerce Решения' : 'E-Commerce Solutions',
        description: lang === 'ru' ? 'Мощные онлайн-магазины.' : 'Powerful online stores that convert.',
        features: lang === 'ru' ? ['Системы оплаты', 'Управление запасами'] : ['Payment systems', 'Inventory management'],
        technologies: ['Shopify', 'Stripe', 'WooCommerce'],
        icon: (
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        ),
    },
];

const getLocalizedProcess = (lang: string) => [
    { step: '01', title: lang === 'ru' ? 'Исследование' : 'Discovery', description: lang === 'ru' ? 'Мы изучаем ваш бизнес.' : 'We learn about your business.' },
    { step: '02', title: lang === 'ru' ? 'Планирование' : 'Planning', description: lang === 'ru' ? 'Создаем дорожную карту.' : 'Detailed project roadmap.' },
    { step: '03', title: lang === 'ru' ? 'Дизайн' : 'Design', description: lang === 'ru' ? 'Создаем интерфейсы.' : 'We craft beautiful interfaces.' },
    { step: '04', title: lang === 'ru' ? 'Разработка' : 'Development', description: lang === 'ru' ? 'Пишем чистый код.' : 'Clean, efficient code.' },
];

export default function ServicesPage({ params: { lang } }: ServicesPageProps) {
    const data = getServicesData(lang);
    const servicesList = getLocalizedServices(lang);
    const processSteps = getLocalizedProcess(lang);
    return (
        <>
            <section className="pt-32 pb-20 relative overflow-hidden bg-white dark:bg-dark-950 transition-colors duration-300">
                <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {data.hero.badge}
                        </span>
                        <h1 className="heading-1 mb-6 text-slate-900 dark:text-white">
                            {data.hero.title1}{' '}
                            <span className="gradient-text">{data.hero.titleGradient}</span>
                        </h1>
                        <p className="text-body transition-colors duration-300">
                            {data.hero.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding bg-slate-50 dark:bg-dark-900 transition-colors duration-300">
                <div className="container-custom">
                    <div className="space-y-24">
                        {servicesList.map((service, index) => (
                            <div
                                key={service.id}
                                id={service.id}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Content */}
                                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-primary-400 mb-6">
                                        {service.icon}
                                    </div>
                                    <h2 className="heading-3 mb-4 text-slate-900 dark:text-white">{service.title}</h2>
                                    <p className="text-slate-600 dark:text-dark-400 mb-8">{service.description}</p>

                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                        {service.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-2 text-slate-500 dark:text-dark-300">
                                                <svg className="w-5 h-5 text-primary-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-2">
                                        {service.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 rounded-full bg-slate-200 dark:bg-dark-800 text-slate-500 dark:text-dark-300 text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className={`glass-card aspect-square flex items-center justify-center bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white">
                                        {service.icon}
                                    </div>
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
                            {data.process.badge}
                        </span>
                        <h2 className="heading-2 mb-6 text-slate-900 dark:text-white">
                            {data.process.title1}{' '}
                            <span className="gradient-text">{data.process.titleGradient}</span>
                        </h2>
                        <p className="text-body transition-colors duration-300">
                            {data.process.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {processSteps.map((item) => (
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
                        {data.cta.title}
                    </h2>
                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                        {data.cta.subtitle}
                    </p>
                    <Link
                        href={`/${lang}/contact`}
                        className="inline-block px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg transition-all duration-300 hover:bg-dark-100 hover:shadow-lg hover:scale-105"
                    >
                        {data.cta.button}
                    </Link>
                </div>
            </section>
        </>
    );
}
