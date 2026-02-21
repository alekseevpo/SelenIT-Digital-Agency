'use client';

import { Suspense, lazy, ComponentType, ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface LazySectionProps {
    children: ReactNode;
    fallback?: ReactNode;
    className?: string;
    threshold?: number;
    rootMargin?: string;
    delay?: number;
}

// Animation variants for lazy loading
const lazyVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

export function LazySection({
    children,
    fallback,
    className = '',
    threshold = 0.1,
    rootMargin = '50px',
    delay = 0,
}: LazySectionProps) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: threshold, margin: rootMargin }}
            variants={lazyVariants}
            transition={{ delay }}
            data-testid="lazy-section"
        >
            <Suspense
                fallback={
                    fallback || (
                        <div className="animate-pulse">
                            <div className="h-32 bg-slate-200/50 dark:bg-dark-800/50 rounded-2xl"></div>
                        </div>
                    )
                }
            >
                {children}
            </Suspense>
        </motion.div>
    );
}

// HOC for creating lazy loaded components
export function createLazyComponent<P extends object>(
    importFunc: () => Promise<{ default: ComponentType<P> }>,
    fallback?: ReactNode,
) {
    const LazyComponent = lazy(importFunc);

    return function LazyWrapper(props: P) {
        return (
            <LazySection fallback={fallback}>
                <LazyComponent {...(props as any)} />
            </LazySection>
        );
    };
}

// Specific lazy components for our sections
export const LazyServices = createLazyComponent(
    () => import('@/components/sections/Services'),
    <div className="h-96 bg-slate-200/50 dark:bg-dark-800/50 rounded-2xl animate-pulse"></div>,
);

export const LazyShowreel = createLazyComponent(
    () => import('@/components/sections/Showreel'),
    <div className="h-96 bg-slate-200/50 dark:bg-dark-800/50 rounded-2xl animate-pulse"></div>,
);

export const LazyTechnologies = createLazyComponent(
    () => import('@/components/sections/Technologies'),
    <div className="h-64 bg-slate-200/50 dark:bg-dark-800/50 rounded-2xl animate-pulse"></div>,
);

export const LazyTestimonials = createLazyComponent(
    () => import('@/components/sections/Testimonials'),
    <div className="h-96 bg-slate-200/50 dark:bg-dark-800/50 rounded-2xl animate-pulse"></div>,
);

export const LazyCTA = createLazyComponent(
    () => import('@/components/sections/CTA'),
    <div className="h-64 bg-slate-200/50 dark:bg-dark-800/50 rounded-2xl animate-pulse"></div>,
);
