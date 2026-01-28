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
        <section className="section-padding bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 relative overflow-hidden transition-all duration-300">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
            </div>

            <div className="container-custom relative z-10 text-center">
                <Reveal width="100%">
                    <h2 className="heading-1 text-white mb-6">
                        {dict.title1}{' '}
                        <span className="text-white/80">{dict.titleGradient}</span>
                    </h2>
                </Reveal>
                <Reveal width="100%" delay={0.3}>
                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                        {dict.subtitle}
                    </p>
                </Reveal>
                <Reveal width="100%" delay={0.4}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href={`/${lang}/contact`} className="btn-primary text-lg px-8 py-4 bg-white text-primary-600 hover:bg-slate-100 hover:text-primary-700 hover:scale-105 transition-transform shadow-xl">
                            {dict.button}
                        </Link>
                        <Link href={`/${lang}/showreel`} className="text-white font-semibold hover:underline flex items-center gap-2 group">
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
