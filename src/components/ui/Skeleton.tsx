import { cn } from '@/lib/utils';

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                'animate-pulse bg-slate-200 dark:bg-dark-700 rounded',
                className
            )}
        />
    );
}

interface SkeletonTextProps {
    lines?: number;
    className?: string;
}

export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
    return (
        <div className={cn('space-y-2', className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={cn(
                        'h-4',
                        i === lines - 1 ? 'w-3/4' : 'w-full'
                    )}
                />
            ))}
        </div>
    );
}

export function SkeletonCard({ className }: SkeletonProps) {
    return (
        <div className={cn('glass-card overflow-hidden', className)}>
            <Skeleton className="aspect-video" />
            <div className="p-8 space-y-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-8 w-3/4" />
                <SkeletonText lines={2} />
            </div>
        </div>
    );
}

export function SkeletonAvatar({ className }: SkeletonProps) {
    return (
        <Skeleton
            className={cn('w-12 h-12 rounded-full', className)}
        />
    );
}
