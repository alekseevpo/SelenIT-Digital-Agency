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
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <Reveal>
                            <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                                {dict.badge}
                            </span>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="heading-2 text-slate-900 dark:text-white">
                                {dict.title1}{' '}
                                <span className="gradient-text">{dict.titleGradient}</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-body mt-4 transition-colors duration-300">
                                {dict.subtitle}
                            </p>
                        </Reveal>
                    </div>
                    <Reveal delay={0.3} className="shrink-0">
                        <Link
                            href={`/${lang}/showreel`}
                            className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-dark-800 text-slate-900 dark:text-white font-semibold rounded-full border border-slate-200 dark:border-dark-600 transition-all duration-300 hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/10 active:scale-95"
                        >
                            {dict.button}
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </Reveal>
                </div>

                {/* Video */}
                <Reveal delay={0.3}>
                    <div className="mb-12">
                        <YouTubeEmbed videoId={dict.videoId || "QT3L4tZ14-4"} title="Selen.IT Agency Showreel" />
                    </div>
                </Reveal>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredProjects.map((project, index) => (
                        <Reveal key={project.id} delay={0.1 * index}>
                            <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 aspect-[16/10] flex flex-col justify-end p-6 md:p-8">
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                                <div className="relative z-10">
                                    <span className="text-primary-400 text-xs font-semibold uppercase tracking-wider mb-2 block">
                                        {project.category}
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                        {project.title}
                                    </h3>
                                    <Link
                                        href={`/${lang}/showreel`}
                                        className="inline-flex items-center text-sm text-slate-700 dark:text-slate-300 font-medium hover:text-primary-500 dark:hover:text-primary-400 transition-colors group/link"
                                    >
                                        Подробнее
                                        <svg className="w-4 h-4 ml-1.5 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Mobile Button */}
                <div className="mt-8 text-center md:hidden">
                    <Reveal>
                        <Link
                            href={`/${lang}/showreel`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-dark-800 text-slate-900 dark:text-white font-semibold rounded-full border border-slate-200 dark:border-dark-600 transition-all duration-300 hover:border-primary-500 active:scale-95"
                        >
                            {dict.button}
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
