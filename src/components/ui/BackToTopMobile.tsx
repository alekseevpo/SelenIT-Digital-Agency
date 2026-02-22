'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTopMobile() {
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
                setIsVisible(window.scrollY > 200);
            }, 100); // 100ms debounce for stability
        };

        // Set initial visibility
        setIsVisible(window.scrollY > 200);

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
                    whileTap={{ scale: 0.85 }}
                    onClick={scrollToTop}
                    className="lg:hidden fixed bottom-44 right-6 z-[60] w-14 h-14 rounded-full bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-slate-800 dark:text-slate-100 flex items-center justify-center active:bg-slate-100 dark:active:bg-dark-800 transition-colors duration-200"
                    aria-label="Наверх"
                >
                    <ArrowUp
                        className="w-[24px] h-[24px] stroke-[2.5]"
                        style={{
                            width: '24px',
                            height: '24px',
                            minWidth: '24px',
                            minHeight: '24px',
                        }}
                    />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
