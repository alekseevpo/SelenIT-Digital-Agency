interface ServicesProps {
    lang: string;
}

const getServicesData = (lang: string) => [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        title: lang === 'ru' ? 'Веб-разработка' : lang === 'es' ? 'Desarrollo Web' : 'Web Development',
        description: lang === 'ru' ? 'Индивидуальные веб-сайты и приложения на React, Next.js и Node.js.' : lang === 'es' ? 'Sitios web personalizados construidos con tecnologías de vanguardia.' : 'Custom websites and web applications built with cutting-edge technologies like React, Next.js, and Node.js.',
        features: lang === 'ru' ? ['Адаптивный дизайн', 'Оптимизация', 'SEO'] : lang === 'es' ? ['Diseño Responsivo', 'Optimizado', 'SEO'] : ['Responsive Design', 'Performance Optimized', 'SEO Ready'],
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        ),
        title: lang === 'ru' ? 'UI/UX Дизайн' : lang === 'es' ? 'Diseño UI/UX' : 'UI/UX Design',
        description: lang === 'ru' ? 'Красивые и интуитивно понятные интерфейсы для вовлечения пользователей.' : lang === 'es' ? 'Interfaces hermosas e intuitivas diseñadas para atraer usuarios.' : 'Beautiful, intuitive interfaces designed to engage users and drive conversions through exceptional user experiences.',
        features: lang === 'ru' ? ['Исследование', 'Вайрфреймы', 'Прототипы'] : lang === 'es' ? ['Investigación', 'Wireframing', 'Prototipos'] : ['User Research', 'Wireframing', 'Prototyping'],
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        ),
        title: lang === 'ru' ? 'E-Commerce' : lang === 'es' ? 'E-Commerce' : 'E-Commerce',
        description: lang === 'ru' ? 'Мощные интернет-магазины с удобным оформлением заказа.' : lang === 'es' ? 'Tiendas en línea potentes con experiencias de pago fluidas.' : 'Powerful online stores with seamless checkout experiences, inventory management, and payment integrations.',
        features: lang === 'ru' ? ['Платежи', 'Инвентарь', 'Аналитика'] : lang === 'es' ? ['Pagos Seguros', 'Inventario', 'Analítica'] : ['Secure Payments', 'Inventory System', 'Analytics'],
    },
];

export default function Services({ lang }: ServicesProps) {
    const services = getServicesData(lang);
    const content = {
        en: { badge: 'Our Services', title1: 'Everything You Need to', titleGradient: 'Succeed Online', subtitle: 'From concept to launch and beyond, we provide comprehensive digital solutions tailored to your business needs.' },
        ru: { badge: 'Наши Услуги', title1: 'Все, что нужно для', titleGradient: 'успеха онлайн', subtitle: 'От концепции до запуска и далее — мы предлагаем комплексные цифровые решения.' },
        es: { badge: 'Nuestros Servicios', title1: 'Todo lo que necesitas para', titleGradient: 'Triunfar Online', subtitle: 'Desde el concepto hasta el lanzamiento y más allá, ofrecemos soluciones integrales.' }
    }[lang as 'en' | 'ru' | 'es'] || { badge: 'Our Services', title1: 'Everything You Need to', titleGradient: 'Succeed Online', subtitle: 'From concept to launch and beyond.' };
    return (
        <section className="section-padding bg-white dark:bg-dark-950 relative overflow-hidden transition-colors duration-300">
            {/* Background Pattern */}
            <div className="absolute inset-0 grid-pattern opacity-50" />

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                        {content.badge}
                    </span>
                    <h2 className="heading-2 mb-6 text-slate-900 dark:text-white">
                        {content.title1}{' '}
                        <span className="gradient-text">{content.titleGradient}</span>
                    </h2>
                    <p className="text-body transition-colors duration-300">
                        {content.subtitle}
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={service.title}
                            className="glass-card p-8 card-hover group"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-primary-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-white mb-4">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-dark-400 mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-2">
                                {service.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-500 dark:text-dark-300">
                                        <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
