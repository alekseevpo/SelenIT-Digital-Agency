import { motion } from 'framer-motion';

interface LogoIconProps {
    size?: number;
    colors: {
        start: string;
        startAnim: string;
        mid: string;
        midAnim: string;
        end: string;
        endAnim: string;
    };
    animated?: boolean;
    isHovered?: boolean;
    controls?: any;
}

export const LogoIcon = ({ size = 44, colors, animated, isHovered, controls }: LogoIconProps) => {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 52 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible' }}
        >
            <defs>
                <linearGradient id="logoGradientMain" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colors.start}>
                        <animate attributeName="stop-color" values={colors.startAnim} dur="4s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="50%" stopColor={colors.mid}>
                        <animate attributeName="stop-color" values={colors.midAnim} dur="4s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="100%" stopColor={colors.end}>
                        <animate attributeName="stop-color" values={colors.endAnim} dur="4s" repeatCount="indefinite" />
                    </stop>
                </linearGradient>

                <filter id="logoGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                <filter id="logoGlowStrong" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            <motion.path
                d="M38 14C38 14 34 8 26 8C17 8 12 14 12 20C12 26 16 29 26 32C36 35 40 38 40 46C40 54 33 58 26 58C17 58 12 52 12 52"
                stroke="url(#logoGradientMain)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                transform="translate(2, 0) scale(0.70)"
                opacity={0.4}
                filter="url(#logoGlow)"
                initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
                animate={controls}
            />

            <motion.path
                d="M38 14C38 14 34 8 26 8C17 8 12 14 12 20C12 26 16 29 26 32C36 35 40 38 40 46C40 54 33 58 26 58C17 58 12 52 12 52"
                stroke="url(#logoGradientMain)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                transform="translate(2, 0) scale(0.70)"
                initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
                animate={controls}
            />

            <motion.circle
                cx="44"
                cy="10"
                r="6"
                fill="url(#logoGradientMain)"
                filter={isHovered ? "url(#logoGlowStrong)" : "url(#logoGlow)"}
                initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0, type: "spring", stiffness: 500, damping: 15 }}
            />
        </motion.svg>
    );
};
