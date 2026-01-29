'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade' | 'scale' | 'blur';

interface RevealProps {
    children: React.ReactNode;
    width?: 'fit-content' | '100%';
    delay?: number;
    duration?: number;
    animation?: AnimationType;
    className?: string;
    once?: boolean;
    amount?: number;
}

const animations: Record<AnimationType, Variants> = {
    'fade-up': {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    },
    'fade-down': {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
    },
    'fade-left': {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    },
    'fade-right': {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    },
    'fade': {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    'scale': {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
    'blur': {
        hidden: { opacity: 0, filter: 'blur(10px)' },
        visible: { opacity: 1, filter: 'blur(0px)' },
    },
};

export const Reveal = ({
    children,
    width = '100%',
    delay = 0,
    duration = 0.6,
    animation = 'fade-up',
    className = '',
    once = true,
    amount = 0.3,
}: RevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount });

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className={className}
            variants={animations[animation]}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    );
};

// Staggered children reveal
interface StaggerRevealProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
    animation?: AnimationType;
}

export const StaggerReveal = ({
    children,
    className = '',
    staggerDelay = 0.1,
    animation = 'fade-up',
}: StaggerRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
        >
            {children}
        </motion.div>
    );
};

// Individual stagger item
export const StaggerItem = ({
    children,
    className = '',
    animation = 'fade-up',
}: {
    children: React.ReactNode;
    className?: string;
    animation?: AnimationType;
}) => {
    return (
        <motion.div
            className={className}
            variants={animations[animation]}
            transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    );
};
