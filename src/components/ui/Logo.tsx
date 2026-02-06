'use client';

import { motion } from 'framer-motion';

interface LogoProps {
    className?: string;
    size?: number;
    showText?: boolean;
    animated?: boolean;
}

export function Logo({ className = '', size = 32, showText = true, animated = true }: LogoProps) {
    return (
        <motion.div
            className={`flex items-center gap-0.5 relative ${className}`}
            initial={animated ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            whileHover="hover"
            transition={{ duration: 0.8 }}
            style={{ fontSize: `${size}px` }}
        >
            <span
                className="font-frantz font-black text-slate-900 dark:text-white tracking-tight leading-none inline-block pointer-events-none"
                style={{ fontVariationSettings: "'wght' 900" }}
            >
                Selen
            </span>
            <span
                className="font-frantz font-black text-red-600 tracking-tight leading-none inline-block pointer-events-none"
                style={{ fontVariationSettings: "'wght' 900" }}
            >
                .IT
            </span>
            <motion.div
                className="absolute -bottom-1 left-0 h-[2.5px] bg-red-600 rounded-full"
                initial={{ width: 0 }}
                variants={{
                    hover: { width: '100%' }
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            />
        </motion.div>
    );
}

export function LogoMark({ size = 32, className = '', animated = true }: { size?: number; className?: string; animated?: boolean }) {
    return (
        <motion.div
            className={`flex items-center relative ${className}`}
            initial={animated ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            whileHover="hover"
            transition={{ duration: 0.8 }}
            style={{ fontSize: `${size}px` }}
        >
            <span
                className="font-frantz font-black text-slate-900 dark:text-white tracking-tight leading-none inline-block pointer-events-none"
                style={{ fontVariationSettings: "'wght' 900" }}
            >
                S
            </span>
            <span
                className="font-frantz font-black text-red-600 tracking-tight leading-none inline-block pointer-events-none"
                style={{ fontVariationSettings: "'wght' 900" }}
            >
                .IT
            </span>
            <motion.div
                className="absolute -bottom-1 left-0 h-[2.5px] bg-red-600 rounded-full"
                initial={{ width: 0 }}
                variants={{
                    hover: { width: '100%' }
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            />
        </motion.div>
    );
}
