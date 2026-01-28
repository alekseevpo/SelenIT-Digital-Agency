import { Reveal } from '../ui/Reveal';

interface ServicesProps {
    lang: string;
    dict: {
        badge: string;
        title1: string;
        titleGradient: string;
        subtitle: string;
        learnMore: string;
    };
    servicesList: Array<{
        id: string;
        title: string;
        description: string;
        features: string[];
    }>;
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
};

export default function Services({ lang, dict, servicesList }: ServicesProps) {
    const displayServices = servicesList.slice(0, 3);

    return (
        <section className="section-padding relative overflow-hidden transition-colors duration-300">
            {/* Background Pattern */}
            <div className="absolute inset-0 grid-pattern opacity-50" />

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <Reveal width="100%">
                        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {dict.badge}
                        </span>
                    </Reveal>
                    <Reveal width="100%" delay={0.35}>
                        <h2 className="heading-2 mb-6 text-slate-900 dark:text-white">
                            {dict.title1}{' '}
                            <span className="gradient-text">{dict.titleGradient}</span>
                        </h2>
                    </Reveal>
                    <Reveal width="100%" delay={0.45}>
                        <p className="text-body transition-colors duration-300">
                            {dict.subtitle}
                        </p>
                    </Reveal>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayServices.map((service, index) => (
                        <Reveal key={service.id} delay={0.2 * index}>
                            <div className="glass-card p-8 card-hover group h-full bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800 shadow-sm">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-primary-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {serviceIcons[service.id]}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-slate-600 dark:text-dark-400 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-2">
                                    {service.features.slice(0, 3).map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-sm text-slate-500 dark:text-dark-300">
                                            <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
