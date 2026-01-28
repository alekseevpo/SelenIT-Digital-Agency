import Link from 'next/link';
import { Reveal } from '../ui/Reveal';
import YouTubeEmbed from '../ui/YouTubeEmbed';

interface ShowreelProps {
    lang: string;
    dict: {
        badge: string;
        title1: string;
        titleGradient: string;
        subtitle: string;
        videoId?: string;
        button: string;
    };
}

const featuredProjects = [
    {
        id: 1,
        title: 'Luxe Fashion E-Commerce',
        category: 'E-Commerce',
        color: 'from-purple-500/20 to-pink-500/20',
    },
    {
        id: 2,
        title: 'FinTech Analytics Dashboard',
        category: 'Web Application',
        color: 'from-blue-500/20 to-cyan-500/20',
    },
];

export default function Showreel({ lang, dict }: ShowreelProps) {
    return (
        <section className="section-padding transition-colors duration-300">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <Reveal width="100%">
                            <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                                {dict.badge}
                            </span>
                        </Reveal>
                        <Reveal width="100%" delay={0.3}>
                            <h2 className="heading-2 text-slate-900 dark:text-white">
                                {dict.title1}{' '}
                                <span className="gradient-text">{dict.titleGradient}</span>
                            </h2>
                        </Reveal>
                    </div>
                    <Reveal delay={0.4}>
                        <Link
                            href={`/${lang}/showreel`}
                            className="btn-secondary hidden md:flex items-center gap-2"
                        >
                            {dict.button}
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </Reveal>
                </div>

                <Reveal width="100%" delay={0.5}>
                    <div className="mb-16">
                        <YouTubeEmbed videoId={dict.videoId || "QT3L4tZ14-4"} title="Selen.IT Agency Showreel" />
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredProjects.map((project, index) => (
                        <Reveal key={project.id} delay={0.2 * index} width="100%">
                            <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 shadow-sm card-hover aspect-[16/10] flex flex-col justify-end p-8 transition-colors duration-300">
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                                <div className="relative z-10">
                                    <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider mb-2 block">{project.category}</span>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{project.title}</h3>
                                    <Link
                                        href={`/${lang}/showreel`}
                                        className="inline-flex items-center text-slate-900 dark:text-white font-semibold group/link"
                                    >
                                        {dict.button}
                                        <svg className="w-5 h-5 ml-2 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <div className="mt-10 text-center md:hidden">
                    <Reveal>
                        <Link href={`/${lang}/showreel`} className="btn-secondary inline-flex items-center gap-2">
                            {dict.button}
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
