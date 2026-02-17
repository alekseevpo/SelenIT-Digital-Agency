'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    client: string;
    year: string;
    videoId?: string;
    tags: string[];
    color: string;
    results: string[];
    slug?: string;
}

interface ShowreelGridProps {
    projects: Project[];
    lang: string;
    dict: {
        filterAll: string;
        projectPreview: string;
        client: string;
        viewCase?: string;
    };
}

// Легкая карточка проекта без видео
function ProjectCard({
    project,
    lang,
    dict,
}: {
    project: Project;
    lang: string;
    dict: ShowreelGridProps['dict'];
}) {
    return (
        <div className="glass-card overflow-hidden group card-hover shadow-sm">
            {/* Image Placeholder */}
            <div className="aspect-video relative bg-slate-100 dark:bg-dark-800">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-dark-700 dark:to-dark-800" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-slate-300 dark:bg-dark-600 rounded-lg mb-4 mx-auto" />
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {dict.projectPreview}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                            {project.client} • {project.year}
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {project.tags.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="text-xs px-2 py-1 bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-400 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                            {project.tags.length > 3 && (
                                <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-400 rounded-full">
                                    +{project.tags.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {project.slug && (
                    <Link
                        href={`/${lang}/case/${project.slug}`}
                        className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium group"
                    >
                        {dict.viewCase || 'View Case'}
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                )}
            </div>
        </div>
    );
}

export default function ShowreelGridOptimized({ projects, lang, dict }: ShowreelGridProps) {
    const [filter, setFilter] = useState('all');

    // Оптимизированная фильтрация
    const filteredProjects = useMemo(() => {
        if (filter === 'all') return projects;
        return projects.filter((project) => project.category === filter);
    }, [projects, filter]);

    const categories = useMemo(() => {
        const cats = ['all', ...new Set(projects.map((p) => p.category))];
        return cats;
    }, [projects]);

    return (
        <section className="py-20 bg-slate-50 dark:bg-dark-900 transition-colors duration-300">
            <div className="container-custom px-4 sm:px-6 lg:px-8">
                {/* Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                filter === category
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                        >
                            {category === 'all' ? dict.filterAll : category}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} lang={lang} dict={dict} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-600 dark:text-slate-400">
                            No projects found in this category.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
