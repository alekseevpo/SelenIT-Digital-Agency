'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { motion, Variants, useInView, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface HeroProps {
    dict: {
        badge: string;
        title1: string;
        titleGradient: string;
        title2: string;
        subtitle: string;
        ctaPrimary: string;
        ctaSecondary: string;
        ctaNote: string;
        stats: {
            projects: string;
            clients: string;
            years: string;
            satisfaction: string;
        };
    };
    lang: string;
}

// Counter sub-component for animated statistics
function Counter({
    value,
    suffix,
    duration = 2,
}: {
    value: number;
    suffix: string;
    duration?: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView && ref.current) {
            const controls = animate(0, value, {
                duration: duration,
                ease: 'easeOut',
                onUpdate: (latest) => {
                    if (ref.current) {
                        ref.current.textContent = Math.floor(latest) + suffix;
                    }
                },
            });
            return () => controls.stop();
        }
    }, [isInView, value, duration, suffix]);

    return (
        <span ref={ref} className="tabular-nums">
            0{suffix}
        </span>
    );
}

export default function Hero({ dict, lang }: HeroProps) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            <div className="w-full px-4 sm:px-10 lg:px-12 pt-16 sm:pt-20 pb-24 relative z-10 overflow-x-hidden">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-7xl mx-auto text-left lg:-translate-y-8"
                >
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
                        <div className="lg:col-span-6 lg:mt-16">
                            {/* Main Heading */}
                            <motion.h1
                                variants={itemVariants}
                                className="text-[4rem] sm:text-8xl lg:text-[7.5rem] xl:text-8.5xl 2xl:text-9.5xl mb-12 mt-28 lg:mb-0 lg:mt-8 text-slate-900 dark:text-white leading-[0.85] lg:leading-[0.84] text-center lg:text-left ml-0 sm:-ml-8 lg:-ml-12"
                            >
                                {dict.title1}
                                <br />
                                {(() => {
                                    const text = dict.titleGradient;
                                    const highlightWords = ['Experiences', 'Experiencias', 'опыт'];
                                    return text.split(' ').map((word, i, arr) => {
                                        const cleanWord = word.replace(/[.,]/g, '');
                                        const isHighlight = highlightWords.some(
                                            (hw) => cleanWord.toLowerCase() === hw.toLowerCase(),
                                        );
                                        return (
                                            <span
                                                key={i}
                                                className={isHighlight ? 'text-red-600' : ''}
                                            >
                                                {word}
                                                {i < arr.length - 1 ? ' ' : ''}
                                            </span>
                                        );
                                    });
                                })()}
                                <br />
                                {dict.title2.split(' ').slice(0, -1).join(' ')}
                                <br />
                                {dict.title2.split(' ').slice(-1)}
                            </motion.h1>

                            {/* CTA Button - Desktop Only */}
                            <div className="hidden lg:block mt-16">
                                <motion.div
                                    variants={itemVariants}
                                    className="flex flex-col items-center"
                                >
                                    <Link
                                        href={`/${lang}/contact`}
                                        className="btn-primary text-lg px-7 py-2 text-center transform hover:scale-105 transition-all"
                                    >
                                        {dict.ctaPrimary}
                                    </Link>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                        {dict.ctaNote || 'Это бесплатно'}
                                    </p>
                                </motion.div>
                            </div>
                        </div>

                        <div className="lg:col-span-6 lg:mt-16">
                            {/* Mobile Image */}
                            <div className="lg:hidden mb-8 flex justify-center">
                                <Image
                                    src="/conversation_two.png"
                                    alt="Conversation illustration"
                                    width={400}
                                    height={300}
                                    className="max-w-[80%] h-auto rounded-lg dark:invert"
                                    priority
                                    sizes="(max-width: 1024px) 80vw, 0"
                                />
                            </div>

                            {/* Subheading */}
                            <motion.div
                                variants={itemVariants}
                                className="text-body text-sm lg:text-sm mb-44 lg:mb-4 leading-tight transition-colors opacity-90 whitespace-pre-line ml-4 lg:border-l lg:border-slate-300 dark:lg:border-slate-700 lg:pl-6 mt-0 lg:mt-8"
                            >
                                {(() => {
                                    const text = dict.subtitle;
                                    const boldWords = [
                                        'design',
                                        'terrible!',
                                        'reality',
                                        'дизайн',
                                        'ужасным!',
                                        'реальность',
                                        'diseño',
                                        'terrible!',
                                        'realidad',
                                    ];

                                    const lines = text.split('\n');
                                    const firstLine = lines[0] || '';
                                    const remainingLines = lines.slice(1).join('\n');

                                    return (
                                        <>
                                            {/* First line as separate heading */}
                                            <motion.h2
                                                variants={itemVariants}
                                                className="mb-6 text-slate-900 dark:text-white tracking-wide mt-0 text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight font-frantz"
                                            >
                                                {firstLine.split(' ').map((word, wordIndex) => {
                                                    const cleanWord = word
                                                        .replace(/[¡!.,?]/g, '')
                                                        .toLowerCase();
                                                    const isBold = boldWords.some(
                                                        (bw) =>
                                                            bw
                                                                .replace(/[¡!.,?]/g, '')
                                                                .toLowerCase() === cleanWord,
                                                    );
                                                    const isRedWord =
                                                        cleanWord === 'ужасным' ||
                                                        cleanWord === 'terrible';
                                                    return (
                                                        <span key={wordIndex}>
                                                            {isBold ? (
                                                                <strong
                                                                    className={`font-bold ${isRedWord ? 'text-red-600 dark:text-red-500' : ''}`}
                                                                >
                                                                    {word}
                                                                </strong>
                                                            ) : (
                                                                word
                                                            )}{' '}
                                                        </span>
                                                    );
                                                })}
                                            </motion.h2>

                                            {/* Remaining lines as paragraph */}
                                            <motion.div
                                                variants={itemVariants}
                                                className="text-body text-base lg:text-sm mb-12 lg:mb-4 leading-relaxed transition-colors opacity-90 whitespace-pre-line"
                                            >
                                                {remainingLines
                                                    .split('\n')
                                                    .map((line, lineIndex, linesArr) => (
                                                        <span
                                                            key={lineIndex}
                                                            className="block mb-2 last:mb-0"
                                                        >
                                                            {line
                                                                .split(' ')
                                                                .map(
                                                                    (word, wordIndex, wordsArr) => {
                                                                        const cleanWord = word
                                                                            .replace(/[¡!.,?]/g, '')
                                                                            .toLowerCase();
                                                                        const isBold =
                                                                            boldWords.some(
                                                                                (bw) =>
                                                                                    bw
                                                                                        .replace(
                                                                                            /[¡!.,?]/g,
                                                                                            '',
                                                                                        )
                                                                                        .toLowerCase() ===
                                                                                    cleanWord,
                                                                            );

                                                                        const isLastLine =
                                                                            lineIndex ===
                                                                            linesArr.length - 1;
                                                                        const isLastWord =
                                                                            wordIndex ===
                                                                            wordsArr.length - 1;
                                                                        const showHeart =
                                                                            isLastLine &&
                                                                            isLastWord &&
                                                                            word.endsWith('.');
                                                                        const displayWord =
                                                                            showHeart
                                                                                ? word.slice(0, -1)
                                                                                : word;

                                                                        return (
                                                                            <span
                                                                                key={wordIndex}
                                                                                className="inline-flex items-center align-baseline flex-wrap"
                                                                            >
                                                                                {isBold ? (
                                                                                    <strong className="font-bold text-slate-900 dark:text-white/100 text-lg lg:text-xl">
                                                                                        {
                                                                                            displayWord
                                                                                        }
                                                                                    </strong>
                                                                                ) : (
                                                                                    displayWord
                                                                                )}
                                                                                {showHeart && (
                                                                                    <motion.div
                                                                                        variants={
                                                                                            undefined
                                                                                        }
                                                                                        initial={{
                                                                                            scale: 1,
                                                                                        }}
                                                                                        animate={{
                                                                                            scale: [
                                                                                                1,
                                                                                                1.25,
                                                                                                1,
                                                                                                1.25,
                                                                                                1,
                                                                                                1,
                                                                                            ],
                                                                                        }}
                                                                                        transition={{
                                                                                            repeat: Infinity,
                                                                                            duration: 2,
                                                                                            ease: 'easeInOut',
                                                                                            times: [
                                                                                                0,
                                                                                                0.15,
                                                                                                0.3,
                                                                                                0.45,
                                                                                                0.6,
                                                                                                1,
                                                                                            ],
                                                                                        }}
                                                                                        className="inline-block ml-1 align-middle"
                                                                                    >
                                                                                        <Heart className="w-4 h-4 text-red-600 fill-red-600" />
                                                                                    </motion.div>
                                                                                )}
                                                                                <span className="whitespace-pre">
                                                                                    {' '}
                                                                                </span>
                                                                            </span>
                                                                        );
                                                                    },
                                                                )}
                                                        </span>
                                                    ))}
                                            </motion.div>
                                        </>
                                    );
                                })()}
                            </motion.div>

                            {/* Desktop Image */}
                            <div className="hidden lg:block mb-4 flex justify-center mt-0">
                                <Image
                                    src="/terrible_design.png"
                                    alt="Terrible design illustration"
                                    width={280}
                                    height={224}
                                    className="max-w-[60%] h-auto rounded-lg dark:invert"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons - Mobile Only */}
                    <div className="lg:hidden w-full flex flex-col items-center mt-4 sm:mt-6 md:mt-8 mb-12 sm:mb-16">
                        <motion.div variants={itemVariants} className="flex flex-col items-center">
                            <Link
                                href={`/${lang}/contact`}
                                className="btn-primary text-lg sm:text-base px-8 sm:px-6 py-3 sm:py-3 mx-auto w-full sm:w-[280px] md:w-[320px] text-center transform hover:scale-105 transition-all"
                            >
                                {dict.ctaPrimary}
                            </Link>
                            <p className="text-xs sm:text-xs text-slate-500 dark:text-slate-400 mt-2 text-center px-4">
                                {dict.ctaNote || 'Это бесплатно'}
                            </p>
                        </motion.div>
                    </div>

                    {/* Stats */}
                    <motion.div
                        variants={itemVariants as any}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-20 sm:mt-24 md:mt-32 pt-8 sm:pt-12 border-t border-slate-300 dark:border-slate-700"
                    >
                        {[
                            { target: 150, suffix: '+', label: dict.stats.projects },
                            { target: 50, suffix: '+', label: dict.stats.clients },
                            { target: 8, suffix: '+', label: dict.stats.years },
                            { target: 99, suffix: '%', label: dict.stats.satisfaction },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center group/stat">
                                <div className="text-2xl sm:text-3xl md:text-4xl heading-secondary-stretch font-light text-slate-900 dark:text-white mb-2 transition-colors duration-300">
                                    <Counter value={stat.target} suffix={stat.suffix} />
                                </div>
                                <div className="text-xs sm:text-xs md:text-xs text-slate-500 dark:text-dark-500 font-medium uppercase tracking-widest px-2">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
