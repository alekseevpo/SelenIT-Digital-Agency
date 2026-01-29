'use client';

import { useEffect, useRef, useState } from 'react';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false);
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const initLenis = async () => {
            const Lenis = (await import('lenis')).default;

            const lenis = new Lenis({
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                touchMultiplier: 2,
                autoResize: true,
                prevent: (node: Element) => node.classList.contains('lenis-prevent'),
            });

            lenisRef.current = lenis;

            function raf(time: number) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);

            // Add lenis class to html
            document.documentElement.classList.add('lenis');
        };

        initLenis();

        return () => {
            if (lenisRef.current) {
                lenisRef.current.destroy();
                document.documentElement.classList.remove('lenis');
            }
        };
    }, [isClient]);

    return <>{children}</>;
}
