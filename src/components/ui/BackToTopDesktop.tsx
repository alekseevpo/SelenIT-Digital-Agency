'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTopDesktop() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const toggleVisibility = () => {
            // Clear existing timeout
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            // Simple debounce with single threshold
            scrollTimeoutRef.current = setTimeout(() => {
                setIsVisible(window.scrollY > 300);
            }, 100); // 100ms debounce for stability
        };

        // Set initial visibility
        setIsVisible(window.scrollY > 300);

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [isMounted]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isMounted && isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 40, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.8 }}
                    transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                    }}
                    whileHover="hover"
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="hidden lg:flex fixed bottom-36 right-12 z-50 w-14 h-14 rounded-full bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.2)] dark:hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)] text-slate-800 dark:text-slate-100 transition-shadow duration-300 items-center justify-center group overflow-hidden"
                    aria-label="Наверх"
                >
                    {/* Subtle gradient background that appears on hover */}
                    <motion.div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-transparent dark:from-red-500/20 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300 transform-gpu" />

                    <motion.div
                        variants={{
                            hover: { y: -3 },
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        className="relative z-10"
                    >
                        <ArrowUp className="w-6 h-6 stroke-[2.5] group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors duration-300" />
                    </motion.div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
