import Link from 'next/link';
import type { Dictionary } from '@/types/dictionary';
import { Reveal } from '../ui/Reveal';
import Image from 'next/image';
import { Download } from 'lucide-react';

interface CTAProps {
    lang: string;
    dict: {
        title1: string;
        titleGradient: string;
        subtitle: string;
        button: string;
    };
    commonDict?: Partial<Dictionary['hero']>;
}

export default function CTA({ lang, dict, commonDict }: CTAProps) {
    return (
        <section className="section-padding bg-cream-100 dark:bg-black relative overflow-hidden transition-all duration-300">
            <div className="container-custom relative z-10 text-center">
                <div className="max-w-4xl mx-auto">
                    <Reveal width="100%" delay={0.3}>
                        <h2 className="mb-6 inline-block origin-center scale-y-[1.7] scale-x-[1.05] break-words max-w-full heading-hero text-[3.5rem] sm:text-[4.5rem] md:text-7xl lg:text-[7rem] xl:text-8rem 2xl:text-9rem font-bold leading-[0.85] lg:leading-[0.84] tracking-wide font-frantz">
                            <span className="text-slate-900 dark:text-white">
                                {dict.title1} {dict.titleGradient}
                            </span>
                        </h2>
                    </Reveal>
                </div>
                <Reveal width="100%" delay={0.4}>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed mt-4">
                        {(() => {
                            const text = dict.subtitle;
                            // Check for different languages
                            const redPhrases = [
                                'цифровое присутствие',
                                'digital presence',
                                'presencia digital',
                            ];

                            for (const phrase of redPhrases) {
                                const parts = text.split(phrase);
                                if (parts.length === 2) {
                                    return (
                                        <>
                                            {parts[0]}
                                            <span className="text-red-600 dark:text-red-500 font-medium">
                                                {phrase}
                                            </span>
                                            {parts[1]}
                                        </>
                                    );
                                }
                            }

                            return text;
                        })()}
                    </p>
                </Reveal>
                <Reveal width="100%" delay={0.4}>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link
                            href={`/${lang}/contact`}
                            className="btn-primary text-lg sm:text-base px-6 sm:px-8 py-3 sm:py-3 transform hover:scale-105 transition-all w-full sm:w-auto"
                        >
                            {dict.button}
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
