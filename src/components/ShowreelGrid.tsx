'use client';

import { useState } from 'react';

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    client: string;
    year: string;
    tags: string[];
    color: string;
    results: string[];
}

interface ShowreelGridProps {
    projects: Project[];
    categories: string[];
    lang: string;
    dict: {
        filterAll: string;
        projectPreview: string;
        client: string;
    };
}

export default function ShowreelGrid({ projects, categories, lang, dict }: ShowreelGridProps) {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <>
            {/* Filter Tabs */}
            <section className="py-8 border-b border-gray-200 dark:border-dark-800 sticky top-20 bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl z-40 transition-colors duration-300">
                <div className="container-custom px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeCategory === category
                                    ? 'bg-primary-500 text-white shadow-lg'
                                    : 'bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-dark-300 hover:bg-slate-200 dark:hover:bg-dark-700 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                            >
                                {category === 'All' ? dict.filterAll : category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="section-padding bg-white dark:bg-dark-950 transition-colors duration-300">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="glass-card overflow-hidden group card-hover bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800"
                            >
                                {/* Image Placeholder */}
                                <div className={`aspect-video bg-gradient-to-br ${project.color} relative`}>
                                    <div className="absolute inset-0 bg-dark-900/40 group-hover:bg-dark-900/20 transition-all duration-500" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-white/80 text-sm">{dict.projectPreview}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-500 dark:text-primary-400 text-xs font-medium">
                                            {project.category}
                                        </span>
                                        <span className="text-slate-500 dark:text-dark-500 text-sm">{project.year}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-dark-400 text-sm mb-2">{dict.client}: {project.client}</p>
                                    <p className="text-slate-600 dark:text-dark-300 mb-6">{project.description}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="px-2 py-1 rounded bg-slate-200 dark:bg-dark-800 text-slate-600 dark:text-dark-300 text-xs">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Results */}
                                    <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200 dark:border-dark-700">
                                        {project.results.map((result) => (
                                            <span key={result} className="text-sm text-primary-500 font-medium">
                                                {result}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
