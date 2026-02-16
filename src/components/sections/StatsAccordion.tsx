'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface StatsAccordionProps {
    stats: Array<{
        value: string;
        label: string;
    }>;
}

export default function StatsAccordion({ stats }: StatsAccordionProps) {
    const [expandedStat, setExpandedStat] = useState<string | null>(null);

    const toggleStat = (statValue: string) => {
        setExpandedStat(expandedStat === statValue ? null : statValue);
    };

    return (
        <div className="space-y-4">
            {stats.map((stat) => (
                <div key={stat.value}>
                    <button
                        onClick={() => toggleStat(stat.value)}
                        className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
                    >
                        <div className="flex items-center gap-4">
                            <div className="text-4xl font-bold text-slate-900 dark:text-white">
                                {stat.value}
                            </div>
                            <div className="text-slate-500 dark:text-dark-400">
                                {stat.label.split('\n')[0]}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {expandedStat === stat.value ? (
                                <ChevronUp className="w-5 h-5 text-red-600 dark:text-red-500" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-slate-400 dark:text-dark-400" />
                            )}
                        </div>
                    </button>

                    {expandedStat === stat.value && (
                        <div className="px-6 pb-6">
                            <div className="space-y-2">
                                {stat.label
                                    .split('\n')
                                    .slice(1)
                                    .map((line: string, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 text-sm text-slate-500 dark:text-dark-300"
                                        >
                                            {line.includes('и другие') ||
                                            line.includes('and other') ||
                                            line.includes('y otros') ||
                                            line.includes('y otros sectores') ||
                                            line.includes('и другие сферы') ||
                                            line.includes('and many more') ||
                                            line.includes('y mucho más') ? (
                                                <span className="leading-relaxed">{line}</span>
                                            ) : (
                                                <>
                                                    <span className="text-red-600 dark:text-red-500 mt-0">
                                                        •
                                                    </span>
                                                    <span className="leading-relaxed">{line}</span>
                                                </>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
