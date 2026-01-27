import Link from 'next/link';

interface HeroProps {
    dict: {
        badge: string;
        title1: string;
        titleGradient: string;
        title2: string;
        subtitle: string;
        ctaPrimary: string;
        ctaSecondary: string;
    };
    lang: string;
}

export default function Hero({ dict, lang }: HeroProps) {
    return (
        <section className="relative min-h-screen flex items-center animated-bg grid-pattern">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
            </div>

            <div className="container-custom px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/50 dark:bg-dark-800/50 border border-gray-200 dark:border-dark-700/50 backdrop-blur-sm mb-8 animate-fade-in shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm text-slate-600 dark:text-dark-300">{dict.badge}</span>
                    </div>

                    {/* Heading */}
                    <h1 className="heading-1 mb-6 animate-fade-in-up text-slate-900 dark:text-white">
                        {dict.title1}{' '}
                        <span className="gradient-text">{dict.titleGradient}</span>{' '}
                        {dict.title2}
                    </h1>

                    {/* Subheading */}
                    <p className="text-body max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        {dict.subtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <Link href={`/${lang}/contact`} className="btn-primary text-lg px-8 py-4">
                            {dict.ctaPrimary}
                        </Link>
                        <Link href={`/${lang}/showreel`} className="btn-secondary text-lg px-8 py-4 flex items-center gap-2">
                            {dict.ctaSecondary}
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 pt-12 border-t border-dark-800 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        {[
                            { value: '150+', label: lang === 'ru' ? 'Проектов' : lang === 'es' ? 'Proyectos' : 'Projects' },
                            { value: '50+', label: lang === 'ru' ? 'Клиентов' : lang === 'es' ? 'Clientes' : 'Clients' },
                            { value: '8+', label: lang === 'ru' ? 'Лет' : lang === 'es' ? 'Años' : 'Years' },
                            { value: '99%', label: lang === 'ru' ? 'Удовлетворенность' : lang === 'es' ? 'Satisfacción' : 'Satisfaction' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
                                <div className="text-slate-600 dark:text-dark-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 rounded-full border-2 border-dark-600 flex justify-center pt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    );
}
