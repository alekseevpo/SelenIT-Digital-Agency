'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { LogoIcon } from '../icons';

interface LogoProps {
    className?: string;
    size?: number;
    showText?: boolean;
    animated?: boolean;
}

// Цвета для светлой темы (оранжево-зелёный)
const lightColors = {
    start: '#f97316',
    startAnim: '#f97316;#fb923c;#f97316',
    mid: '#84cc16',
    midAnim: '#84cc16;#a3e635;#84cc16',
    end: '#22c55e',
    endAnim: '#22c55e;#4ade80;#22c55e',
    particle1: '#22c55e',
    particle2: '#f97316',
    textGradient: 'linear-gradient(90deg, #f97316, #84cc16, #22c55e, #84cc16, #f97316)',
    hoverColor: '#f97316',
    hoverColor2: '#22c55e',
};

// Цвета для тёмной темы (фиолетовый)
const darkColors = {
    start: '#6366f1',
    startAnim: '#6366f1;#a855f7;#6366f1',
    mid: '#8b5cf6',
    midAnim: '#8b5cf6;#d946ef;#8b5cf6',
    end: '#d946ef',
    endAnim: '#d946ef;#6366f1;#d946ef',
    particle1: '#d946ef',
    particle2: '#6366f1',
    textGradient: 'linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef, #8b5cf6, #6366f1)',
    hoverColor: '#8b5cf6',
    hoverColor2: '#8b5cf6',
};

export function Logo({ className = '', size = 44, showText = true, animated = true }: LogoProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [mounted, setMounted] = useState(false);
    const controls = useAnimationControls();
    const { resolvedTheme } = useTheme();

    // Используем тёмные цвета по умолчанию (для SSR), затем переключаем после монтирования
    const colors = mounted ? (resolvedTheme === 'dark' ? darkColors : lightColors) : darkColors;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (animated) {
            controls.start({
                pathLength: 1,
                opacity: 1,
                transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
            });
        }
    }, [animated, controls]);

    const letterVariants = {
        hidden: { opacity: 0, y: 30, rotateX: -90 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.6,
                delay: 0.6 + i * 0.08,
                ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number]
            }
        })
    };

    const dotVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: 1.0,
                type: "spring" as const,
                stiffness: 500,
                damping: 15
            }
        }
    };

    return (
        <motion.div
            className={`flex items-center gap-3 ${className}`}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Logo Mark - S with dot, animated */}
            <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <LogoIcon
                    size={size}
                    colors={colors}
                    animated={animated}
                    isHovered={isHovered}
                    controls={controls}
                />

                {/* Orbiting particle 1 */}
                {animated && (
                    <motion.circle
                        cx="44"
                        cy="10"
                        r="1.5"
                        fill={colors.particle1}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            x: [0, 8, 0, -8, 0],
                            y: [0, -8, 0, 8, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: 1.5,
                            ease: "linear"
                        }}
                    />
                )}

                {/* Orbiting particle 2 */}
                {animated && (
                    <motion.circle
                        cx="44"
                        cy="10"
                        r="1"
                        fill={colors.particle2}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 0.8, 0.8, 0],
                            x: [0, -6, 0, 6, 0],
                            y: [0, 6, 0, -6, 0],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: 2,
                            ease: "linear"
                        }}
                    />
                )}
            </motion.div>

            {/* Logo Text */}
            {showText && (
                <div className="hidden sm:flex flex-col justify-center" style={{ perspective: '500px' }}>
                    {/* Main title row */}
                    <div className="flex items-baseline">
                        {/* "Selen" - 3D letter reveal */}
                        <div className="flex" style={{ transformStyle: 'preserve-3d' }}>
                            {'Selen'.split('').map((letter, i) => (
                                <motion.span
                                    key={i}
                                    className="text-2xl font-bold text-slate-900 dark:text-white inline-block"
                                    style={{ transformOrigin: 'bottom' }}
                                    variants={letterVariants}
                                    initial={animated ? "hidden" : "visible"}
                                    animate="visible"
                                    custom={i}
                                    whileHover={{
                                        y: -3,
                                        color: colors.hoverColor,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>

                        {/* ".IT" - special effect */}
                        <motion.div
                            className="relative"
                            initial={animated ? { opacity: 0, scale: 0, rotate: -180 } : { opacity: 1, scale: 1, rotate: 0 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{
                                duration: 0.7,
                                delay: 1.1,
                                type: "spring",
                                stiffness: 200,
                                damping: 12
                            }}
                        >
                            <motion.span
                                className="text-2xl font-bold text-transparent bg-clip-text relative z-10"
                                style={{
                                    backgroundImage: colors.textGradient,
                                    backgroundSize: '200% auto',
                                }}
                                animate={{
                                    backgroundPosition: ['0% center', '200% center'],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                .IT
                            </motion.span>
                        </motion.div>
                    </div>

                    {/* "Digital Agency" subtitle with typewriter effect */}
                    <div className="overflow-hidden -mt-0.5">
                        <motion.div
                            className="flex"
                            initial={animated ? { x: '-100%' } : { x: 0 }}
                            animate={{ x: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 1.5,
                                ease: [0.215, 0.61, 0.355, 1]
                            }}
                        >
                            {'Digital Agency'.split('').map((char, i) => (
                                <motion.span
                                    key={i}
                                    className="text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-400 dark:text-slate-500"
                                    initial={animated ? { opacity: 0 } : { opacity: 1 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: 0.1,
                                        delay: 1.6 + i * 0.03
                                    }}
                                    whileHover={{
                                        color: colors.hoverColor2,
                                        transition: { duration: 0.1 }
                                    }}
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export function LogoMark({ size = 44, className = '', animated = true }: { size?: number; className?: string; animated?: boolean }) {
    const controls = useAnimationControls();
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    // Используем тёмные цвета по умолчанию (для SSR), затем переключаем после монтирования
    const colors = mounted ? (resolvedTheme === 'dark' ? darkColors : lightColors) : darkColors;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (animated) {
            controls.start({
                pathLength: 1,
                opacity: 1,
                transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
            });
        }
    }, [animated, controls]);

    return (
        <div className={`relative ${className}`}>
            <LogoIcon
                size={size}
                colors={colors}
                animated={animated}
                controls={controls}
            />
            {/* Orbiting particles */}
            {animated && (
                <>
                    <motion.circle
                        cx="44"
                        cy="10"
                        r="1.5"
                        fill={colors.particle1}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            x: [0, 8, 0, -8, 0],
                            y: [0, -8, 0, 8, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: 1.5,
                            ease: "linear"
                        }}
                        style={{ position: 'absolute', left: 0, top: 0 }}
                    />
                    <motion.circle
                        cx="44"
                        cy="10"
                        r="1"
                        fill={colors.particle2}
                        animate={{
                            opacity: [0, 0.8, 0.8, 0],
                            x: [0, -6, 0, 6, 0],
                            y: [0, 6, 0, -6, 0],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: 2,
                            ease: "linear"
                        }}
                        style={{ position: 'absolute', left: 0, top: 0 }}
                    />
                </>
            )}
        </div>
    );
}
