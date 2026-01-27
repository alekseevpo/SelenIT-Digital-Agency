import Link from 'next/link';

interface CTAProps {
    lang: string;
}

export default function CTA({ lang }: CTAProps) {
    const content = {
        en: { title: 'Ready to Transform Your Digital Presence?', subtitle: 'Let us discuss your project and create something amazing together. Get a free consultation and project estimate.', ctaPrimary: 'Start Your Project', ctaSecondary: 'View Our Work', trusted: 'Trusted by leading companies' },
        ru: { title: 'Готовы преобразить ваше цифровое присутствие?', subtitle: 'Давайте обсудим ваш проект и создадим что-то потрясающее вместе. Получите бесплатную консультацию.', ctaPrimary: 'Начать проект', ctaSecondary: 'Наши работы', trusted: 'Нам доверяют ведущие компании' },
        es: { title: '¿Listo para transformar su presencia digital?', subtitle: 'Discutamos su proyecto y creemos algo increíble juntos. Obtenga una consulta gratuita.', ctaPrimary: 'Iniciar Proyecto', ctaSecondary: 'Ver nuestro trabajo', trusted: 'Confiado por empresas líderes' }
    }[lang as 'en' | 'ru' | 'es'] || { title: 'Ready to Transform?', subtitle: 'Let us discuss.', ctaPrimary: 'Start', ctaSecondary: 'Work', trusted: 'Trusted' };
    return (
        <section className="section-padding relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500">
                <div className="absolute inset-0 grid-pattern opacity-10" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="heading-2 text-white mb-6">
                        {content.title}
                    </h2>
                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                        {content.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href={`/${lang}/contact`}
                            className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg transition-all duration-300 hover:bg-dark-100 hover:shadow-lg hover:scale-105 active:scale-95"
                        >
                            {content.ctaPrimary}
                        </Link>
                        <Link
                            href={`/${lang}/showreel`}
                            className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white/30 transition-all duration-300 hover:bg-white/10 hover:border-white/50"
                        >
                            {content.ctaSecondary}
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-12 pt-12 border-t border-white/20">
                        <p className="text-white/60 text-sm mb-6">{content.trusted}</p>
                        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                            {['TechCorp', 'Innovate', 'StartupX', 'Enterprise', 'Growth'].map((company) => (
                                <span key={company} className="text-white text-xl font-bold">
                                    {company}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
