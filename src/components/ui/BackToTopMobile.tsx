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
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToTop}
                    className="lg:hidden fixed bottom-36 right-6 z-50 w-11 h-11 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm hover:bg-white dark:hover:bg-black/90 text-slate-700 dark:text-slate-300 shadow-lg transition-all duration-200 flex items-center justify-center border border-slate-200 dark:border-slate-700"
                    aria-label="Наверх"
                >
                    <ArrowUp
                        className="w-5 h-5"
                        style={{
                            width: '20px',
                            height: '20px',
                            minWidth: '20px',
                            minHeight: '20px',
                        }}
                    />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
