"use client";

import { motion, Easing } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function FluidBackground() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === "dark";

    // Configuration for blobs
    // Using slightly different colors for light/dark modes
    const blobs = [
        {
            // Primary Blob
            color: isDark ? "bg-primary-600/50" : "bg-primary-400/50",
            initial: { x: -100, y: -100, scale: 1 },
            animate: {
                x: [-100, 100, -50, -100],
                y: [-100, 50, 100, -100],
                scale: [1, 1.2, 1, 1],
            },
            transition: { duration: 20, repeat: Infinity, ease: "linear" as "linear" }
        },
        {
            // Accent Blob
            color: isDark ? "bg-accent-600/50" : "bg-accent-400/50",
            initial: { x: 400, y: 200, scale: 1.2 },
            animate: {
                x: [400, 200, 500, 400],
                y: [200, 400, 100, 200],
                scale: [1.2, 1, 1.2, 1.2],
            },
            transition: { duration: 25, repeat: Infinity, ease: "linear" as "linear" }
        },
        {
            // Secondary Blob (Purple/Blue mix)
            color: isDark ? "bg-blue-600/50" : "bg-blue-400/50",
            initial: { x: 100, y: 500, scale: 0.8 },
            animate: {
                x: [100, 300, -100, 100],
                y: [500, 300, 600, 500],
                scale: [0.8, 1.1, 0.9, 0.8],
            },
            transition: { duration: 22, repeat: Infinity, ease: "linear" as "linear" }
        }
    ];

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
            {/* Base Background Color */}
            <div
                className="absolute inset-0 transition-colors duration-700"
                style={{ backgroundColor: 'var(--bg-primary)' }}
            />

            {/* Animated Blobs */}
            {blobs.map((blob, index) => (
                <motion.div
                    key={index}
                    className={`absolute rounded-full blur-[100px] ${blob.color}`}
                    style={{
                        width: '40vw',
                        height: '40vw',
                        top: 0,
                        left: 0,
                    }}
                    initial={blob.initial}
                    animate={blob.animate}
                    transition={blob.transition}
                />
            ))}

            {/* Noise Overlay for texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}
