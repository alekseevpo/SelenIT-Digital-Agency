import Link from 'next/link';
import { Reveal } from '../ui/Reveal';

interface CTAProps {
    lang: string;
    dict: {
        title1: string;
        titleGradient: string;
        subtitle: string;
        button: string;
    };
    commonDict: {
        ctaSecondary: string;
    };
}

export default function CTA({ lang, dict, commonDict }: CTAProps) {
    return (
        <section className="section-padding bg-slate-900 dark:bg-black relative overflow-hidden transition-all duration-300">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-accent-900/20 pointer-events-none" />
            <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-accent-600/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
            </div>

            <div className="container-custom relative z-10 text-center">
                <Reveal width="100%">
                    <h2 className="heading-2 text-white mb-6">
                        {dict.title1}{' '}
                        <span className="text-primary-400">{dict.titleGradient}</span>
                    </h2>
                </Reveal>
                <Reveal width="100%" delay={0.3}>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        {dict.subtitle}
                    </p>
                </Reveal>
                <Reveal width="100%" delay={0.4}>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href={`/${lang}/contact`} className="btn-primary text-lg px-8 py-4 shadow-xl shadow-primary-900/20 hover:shadow-primary-600/30 transition-shadow">
                            {dict.button}
                        </Link>
                        <Link href={`/${lang}/showreel`} className="text-slate-400 font-medium hover:text-white flex items-center gap-2 group transition-colors">
                            {commonDict.ctaSecondary}
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
