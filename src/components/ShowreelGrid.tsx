'use client';

import { useState } from 'react';
import YouTubeEmbed from './ui/YouTubeEmbed';

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

export default function ShowreelGrid({ projects, lang, dict }: Omit<ShowreelGridProps, 'categories'>) {
    return (
        <section className="section-padding bg-white dark:bg-dark-950 transition-colors duration-300">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="glass-card overflow-hidden group card-hover bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800"
                        >
                            {/* Video or Image Placeholder */}
                            <div className="aspect-video relative">
                                {project.videoId ? (
                                    <YouTubeEmbed videoId={project.videoId} title={project.title} />
                                ) : (
                                    <div className={`w-full h-full bg-gradient-to-br ${project.color} relative`}>
                                        <div className="absolute inset-0 bg-dark-900/40 group-hover:bg-dark-900/20 transition-all duration-500" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-white/80 text-sm">{dict.projectPreview}</span>
                                        </div>
                                    </div>
                                )}
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
    );
}
