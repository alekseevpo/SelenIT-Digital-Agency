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
        <section className="section-padding bg-cream-100 dark:bg-black relative overflow-hidden transition-all duration-300">


            <div className="container-custom relative z-10 text-center">
                <div className="max-w-4xl mx-auto">
                    <Reveal width="100%" delay={0.3}>
                        <h2 className="heading-2 heading-hero mb-6">
                            <span className="text-slate-900 dark:text-white">
                                {dict.title1} {dict.titleGradient}
                            </span>
                        </h2>
                    </Reveal>
                </div>
                <Reveal width="100%" delay={0.4}>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        {dict.subtitle}
                    </p>
                </Reveal>
                <Reveal width="100%" delay={0.4}>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href={`/${lang}/contact`} className="btn-primary text-lg px-8 py-4 shadow-xl shadow-primary-900/20 hover:shadow-primary-600/30 transition-shadow">
                            {dict.button}
                        </Link>
                        <Link href={`/${lang}/showreel`} className="text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-white flex items-center gap-2 group transition-colors">
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
