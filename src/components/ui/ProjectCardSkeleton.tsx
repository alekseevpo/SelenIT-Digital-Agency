import { Skeleton, SkeletonText } from './Skeleton';

export default function ProjectCardSkeleton() {
    return (
        <div className="glass-card overflow-hidden bg-cream-100 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
            {/* Video placeholder */}
            <Skeleton className="aspect-video" />

            {/* Content */}
            <div className="p-8 space-y-4">
                {/* Category and year */}
                <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-4 w-12" />
                </div>

                {/* Title */}
                <Skeleton className="h-8 w-3/4" />

                {/* Client */}
                <Skeleton className="h-4 w-1/2" />

                {/* Description */}
                <SkeletonText lines={2} />

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16 rounded" />
                    <Skeleton className="h-6 w-20 rounded" />
                    <Skeleton className="h-6 w-14 rounded" />
                </div>

                {/* Results */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200 dark:border-dark-700">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-5 w-20" />
                </div>
            </div>
        </div>
    );
}
