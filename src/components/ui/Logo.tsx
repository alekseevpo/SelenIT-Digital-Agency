'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LogoProps {
    className?: string;
    size?: number;
    showText?: boolean;
    animated?: boolean;
}

export function Logo({ className = '', size = 44, showText = true, animated = true }: LogoProps) {
    const [isHovered, setIsHovered] = useState(false);
    const controls = useAnimationControls();

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
                ease: [0.215, 0.61, 0.355, 1]
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
                type: "spring",
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
                <motion.svg
                    width={size}
                    height={size}
                    viewBox="0 0 52 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ overflow: 'visible' }}
                >
                    <defs>
                        {/* Main gradient */}
                        <linearGradient id="logoGradientMain" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6366f1">
                                <animate
                                    attributeName="stop-color"
                                    values="#6366f1;#a855f7;#6366f1"
                                    dur="4s"
                                    repeatCount="indefinite"
                                />
                            </stop>
                            <stop offset="50%" stopColor="#8b5cf6">
                                <animate
                                    attributeName="stop-color"
                                    values="#8b5cf6;#d946ef;#8b5cf6"
                                    dur="4s"
                                    repeatCount="indefinite"
                                />
                            </stop>
                            <stop offset="100%" stopColor="#d946ef">
                                <animate
                                    attributeName="stop-color"
                                    values="#d946ef;#6366f1;#d946ef"
                                    dur="4s"
                                    repeatCount="indefinite"
                                />
                            </stop>
                        </linearGradient>

                        {/* Glow filter */}
                        <filter id="logoGlow" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>

                        {/* Strong glow for hover */}
                        <filter id="logoGlowStrong" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Background glow path (blur layer) */}
                    <motion.path
                        d="M38 14C38 14 34 8 26 8C17 8 12 14 12 20C12 26 16 29 26 32C36 35 40 38 40 46C40 54 33 58 26 58C17 58 12 52 12 52"
                        stroke="url(#logoGradientMain)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        transform="translate(-2, -4) scale(0.92)"
                        opacity={0.4}
                        filter="url(#logoGlow)"
                        initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
                        animate={controls}
                    />

                    {/* Main S path */}
                    <motion.path
                        d="M38 14C38 14 34 8 26 8C17 8 12 14 12 20C12 26 16 29 26 32C36 35 40 38 40 46C40 54 33 58 26 58C17 58 12 52 12 52"
                        stroke="url(#logoGradientMain)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        transform="translate(-2, -4) scale(0.92)"
                        initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
                        animate={controls}
                    />

                    {/* Decorative dot with orbit effect */}
                    <motion.circle
                        cx="44"
                        cy="10"
                        r="4.5"
                        fill="url(#logoGradientMain)"
                        filter={isHovered ? "url(#logoGlowStrong)" : "url(#logoGlow)"}
                        variants={dotVariants}
                        initial={animated ? "hidden" : "visible"}
                        animate="visible"
                    />

                    {/* Orbiting particle 1 */}
                    {animated && (
                        <motion.circle
                            cx="44"
                            cy="10"
                            r="1.5"
                            fill="#d946ef"
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
                            fill="#6366f1"
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
                </motion.svg>
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
                                        color: '#8b5cf6',
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
                                    backgroundImage: 'linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef, #8b5cf6, #6366f1)',
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
                                        color: '#8b5cf6',
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
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 52 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{ overflow: 'visible' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <defs>
                <linearGradient id="logoGradientMark2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1">
                        <animate
                            attributeName="stop-color"
                            values="#6366f1;#a855f7;#6366f1"
                            dur="4s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop offset="50%" stopColor="#8b5cf6">
                        <animate
                            attributeName="stop-color"
                            values="#8b5cf6;#d946ef;#8b5cf6"
                            dur="4s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop offset="100%" stopColor="#d946ef">
                        <animate
                            attributeName="stop-color"
                            values="#d946ef;#6366f1;#d946ef"
                            dur="4s"
                            repeatCount="indefinite"
                        />
                    </stop>
                </linearGradient>
                <filter id="glowMark2" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Glow layer */}
            <motion.path
                d="M38 14C38 14 34 8 26 8C17 8 12 14 12 20C12 26 16 29 26 32C36 35 40 38 40 46C40 54 33 58 26 58C17 58 12 52 12 52"
                stroke="url(#logoGradientMark2)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                transform="translate(-2, -4) scale(0.92)"
                opacity={0.4}
                filter="url(#glowMark2)"
                initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
                animate={controls}
            />

            {/* Main path */}
            <motion.path
                d="M38 14C38 14 34 8 26 8C17 8 12 14 12 20C12 26 16 29 26 32C36 35 40 38 40 46C40 54 33 58 26 58C17 58 12 52 12 52"
                stroke="url(#logoGradientMark2)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                transform="translate(-2, -4) scale(0.92)"
                initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
                animate={controls}
            />

            <motion.circle
                cx="44"
                cy="10"
                r="4.5"
                fill="url(#logoGradientMark2)"
                filter="url(#glowMark2)"
                initial={animated ? { scale: 0 } : { scale: 1 }}
                animate={{ scale: 1 }}
                transition={{
                    delay: 1.0,
                    type: "spring",
                    stiffness: 500,
                    damping: 15
                }}
            />

            {/* Orbiting particles */}
            {animated && (
                <>
                    <motion.circle
                        cx="44"
                        cy="10"
                        r="1.5"
                        fill="#d946ef"
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
                    <motion.circle
                        cx="44"
                        cy="10"
                        r="1"
                        fill="#6366f1"
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
                </>
            )}
        </motion.svg>
    );
}
