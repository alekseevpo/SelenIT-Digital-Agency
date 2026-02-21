'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Reveal } from '../ui/Reveal';
import {
    ReactIcon,
    NextJsIcon,
    TypeScriptIcon,
    TailwindIcon,
    NodeJsIcon,
    MongoDbIcon,
    DockerIcon,
    AwsIcon,
    GitIcon,
    VercelIcon,
} from '../icons';

interface TechnologiesProps {
    dict: {
        badge: string;
        title: string;
        titleGradient: string;
        subtitle: string;
    };
}

const technologies = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Next.js', color: '#000000' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Python', color: '#3776AB' },
    { name: 'GraphQL', color: '#E10098' },
    { name: 'Tailwind CSS', color: '#06B6D4' },
    { name: 'Node.js', color: '#339933' },
    { name: 'PostgreSQL', color: '#4169E1' },
    { name: 'MongoDB', color: '#47A248' },
    { name: 'Docker', color: '#2496ED' },
    { name: 'AWS', color: '#FF9900' },
    { name: 'Figma', color: '#F24E1E' },
    { name: 'Git', color: '#F05032' },
    { name: 'Vercel', color: '#000000' },
];

const TechIcon = ({ name, color }: { name: string; color: string }) => {
    const iconProps = {
        className: 'w-10 h-10 md:w-12 md:h-12',
        fill: color,
    };

    const icons: Record<string, JSX.Element> = {
        React: <ReactIcon {...iconProps} />,
        'Next.js': (
            <NextJsIcon
                {...iconProps}
                className="w-10 h-10 md:w-12 md:h-12 dark:fill-white fill-slate-900"
            />
        ),
        TypeScript: <TypeScriptIcon {...iconProps} />,
        Python: (
            <Image
                src="/images/python-logo.png"
                alt="Python"
                width={56}
                height={56}
                className="w-12 h-12 md:w-14 md:h-14 object-contain"
            />
        ),
        GraphQL: (
            <Image
                src="/images/graphql.png"
                alt="GraphQL"
                width={56}
                height={56}
                className="w-12 h-12 md:w-14 md:h-14 object-contain"
            />
        ),
        'Tailwind CSS': <TailwindIcon {...iconProps} />,
        'Node.js': <NodeJsIcon {...iconProps} />,
        PostgreSQL: (
            <Image
                src="/images/postgresql-logo.png"
                alt="PostgreSQL"
                width={48}
                height={48}
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
        ),
        MongoDB: <MongoDbIcon {...iconProps} />,
        Docker: <DockerIcon {...iconProps} />,
        AWS: <AwsIcon {...iconProps} />,
        Figma: (
            <Image
                src="/images/figma-logo-transparent.png"
                alt="Figma"
                width={56}
                height={56}
                className="w-12 h-12 md:w-14 md:h-14 object-contain"
            />
        ),
        Git: <GitIcon {...iconProps} />,
        Vercel: (
            <VercelIcon
                {...iconProps}
                className="w-10 h-10 md:w-12 md:h-12 dark:fill-white fill-slate-900"
            />
        ),
    };

    return (
        icons[name] || (
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500" />
        )
    );
};

export default function Technologies({ dict }: TechnologiesProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'center center'],
    });
    const slideInRight = useTransform(scrollYProgress, [0, 0.6], ['50vw', '0%']);
    const fadeIn = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-24 overflow-x-clip overflow-y-visible transition-colors duration-300"
        >
            <div className="container-custom mb-10 md:mb-14 px-4">
                <div className="text-center max-w-4xl mx-auto">
                    <Reveal width="100%" delay={0.3}>
                        <h2 className="mb-6 inline-block origin-center scale-y-[1.7] scale-x-[1.05] break-words max-w-full heading-hero text-[3.5rem] sm:text-[4.5rem] md:text-7xl lg:text-[7rem] xl:text-8rem 2xl:text-9rem font-bold leading-[0.85] lg:leading-[0.84] tracking-wide font-frantz">
                            <span className="text-slate-900 dark:text-white">
                                {dict.title} <br className="lg:hidden" />{' '}
                                <motion.span
                                    className="text-red-600 dark:text-red-500"
                                    style={{
                                        x: slideInRight,
                                        opacity: fadeIn,
                                        display: 'inline-block',
                                    }}
                                >
                                    {dict.titleGradient}
                                </motion.span>
                            </span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-body transition-colors duration-300 mx-auto">
                            {dict.subtitle}
                        </p>
                    </Reveal>
                </div>
            </div>

            {/* Tech row - scroll right */}
            <div className="relative py-4">
                <div className="tech-scroll-container">
                    <div className="tech-scroll tech-scroll-right">
                        {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                            <div key={`row2-${tech.name}-${index}`} className="tech-card group">
                                <div className="tech-card-inner">
                                    <TechIcon name={tech.name} color={tech.color} />
                                </div>
                                <span className="tech-card-label">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
