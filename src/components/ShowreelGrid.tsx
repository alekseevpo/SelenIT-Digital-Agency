'use client';

import { useState } from 'react';
import Link from 'next/link';
import YouTubeEmbed from './ui/YouTubeEmbed';
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
    categories: string[];
    lang: string;
    dict: {
        filterAll: string;
        projectPreview: string;
        client: string;
        viewCase?: string;
    };
}

export default function ShowreelGrid({
    projects,
    lang,
    dict,
}: Omit<ShowreelGridProps, 'categories'>) {
    return (
        <section className="section-padding bg-transparent dark:bg-dark-950 transition-colors duration-300">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="glass-card overflow-hidden group card-hover shadow-sm"
                        >
                            {/* Video or Image Placeholder */}
                            <div className="aspect-video relative">
                                {project.videoId ? (
                                    <YouTubeEmbed
                                        videoId={project.videoId}
                                        title={project.title}
                                        lang={lang}
                                    />
                                ) : (
                                    <div
                                        className={`w-full h-full bg-gradient-to-br ${project.color} relative`}
                                    >
                                        <div className="absolute inset-0 bg-dark-900/40 group-hover:bg-dark-900/20 transition-all duration-500" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-white/80 text-sm">
                                                {dict.projectPreview}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 rounded-full bg-red-600/20 dark:bg-red-500/20 text-red-600 dark:text-red-500 text-xs font-medium">
                                        {project.category}
                                    </span>
                                    <span className="text-slate-500 dark:text-dark-500 text-sm">
                                        {project.year}
                                    </span>
                                </div>

                                <h3
                                    className="text-3xl md:text-4xl font-frantz font-black text-slate-900 dark:text-white mb-2 uppercase tracking-wide leading-none group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors"
                                    style={{ transform: 'scaleY(1.2)' }}
                                >
                                    {project.title}
                                </h3>
                                <p className="text-slate-500 dark:text-dark-400 text-sm mb-2">
                                    {dict.client}: {project.client}
                                </p>
                                <p className="text-slate-600 dark:text-dark-300 mb-6">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 rounded bg-slate-200 dark:bg-dark-800 text-slate-600 dark:text-dark-300 text-xs"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Results */}
                                <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200 dark:border-dark-700">
                                    {project.results.map((result) => (
                                        <span
                                            key={result}
                                            className="text-sm text-red-600 dark:text-red-500 font-medium"
                                        >
                                            {result}
                                        </span>
                                    ))}
                                </div>

                                {/* View Case Study Link */}
                                {project.slug && (
                                    <Link
                                        href={`/${lang}/case/${project.slug}`}
                                        className="inline-flex items-center gap-2 mt-6 text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium transition-colors group"
                                    >
                                        {dict.viewCase || 'View Case Study'}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
