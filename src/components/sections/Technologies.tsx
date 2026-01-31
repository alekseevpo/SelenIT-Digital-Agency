'use client';

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
    VercelIcon
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
        className: "w-10 h-10 md:w-12 md:h-12",
        fill: color
    };

    const icons: Record<string, JSX.Element> = {
        'React': <ReactIcon {...iconProps} />,
        'Next.js': <NextJsIcon {...iconProps} className="w-10 h-10 md:w-12 md:h-12 dark:fill-white fill-slate-900" />,
        'TypeScript': <TypeScriptIcon {...iconProps} />,
        'Python': (
            <Image
                src="/images/python-logo.png"
                alt="Python"
                width={56}
                height={56}
                className="w-12 h-12 md:w-14 md:h-14 object-contain"
            />
        ),
        'GraphQL': (
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
        'PostgreSQL': (
            <Image
                src="/images/postgresql-logo.png"
                alt="PostgreSQL"
                width={48}
                height={48}
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
        ),
        'MongoDB': <MongoDbIcon {...iconProps} />,
        'Docker': <DockerIcon {...iconProps} />,
        'AWS': <AwsIcon {...iconProps} />,
        'Figma': (
            <Image
                src="/images/figma-logo-transparent.png"
                alt="Figma"
                width={56}
                height={56}
                className="w-12 h-12 md:w-14 md:h-14 object-contain"
            />
        ),
        'Git': <GitIcon {...iconProps} />,
        'Vercel': <VercelIcon {...iconProps} className="w-10 h-10 md:w-12 md:h-12 dark:fill-white fill-slate-900" />,
    };

    return icons[name] || <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500" />;
};

export default function Technologies({ dict }: TechnologiesProps) {
    return (
        <section className="py-16 md:py-24 overflow-x-clip overflow-y-visible bg-cream-100/50 dark:bg-dark-900/30 transition-colors duration-300">
            <div className="container-custom mb-10 md:mb-14 px-4">
                <div className="text-center max-w-3xl mx-auto">
                    <Reveal>
                        <span className="text-orange-500 dark:text-primary-500 font-semibold text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4 block">
                            {dict.badge}
                        </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h2 className="heading-2 mb-4 md:mb-6 text-slate-900 dark:text-white">
                            {dict.title}{' '}
                            <span className="gradient-text">{dict.titleGradient}</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-body transition-colors duration-300">
                            {dict.subtitle}
                        </p>
                    </Reveal>
                </div>
            </div>

            {/* Tech row - scroll right */}
            <div className="relative py-4">
                {/* Gradient masks */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-cream-100/90 dark:from-dark-900/90 via-cream-100/50 dark:via-dark-900/50 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-cream-100/90 dark:from-dark-900/90 via-cream-100/50 dark:via-dark-900/50 to-transparent z-10 pointer-events-none" />

                <div className="tech-scroll-container">
                    <div className="tech-scroll tech-scroll-right">
                        {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                            <div
                                key={`row2-${tech.name}-${index}`}
                                className="tech-card group"
                            >
                                <div className="tech-card-inner">
                                    <TechIcon name={tech.name} color={tech.color} />
                                </div>
                                <span className="tech-card-label">
                                    {tech.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
