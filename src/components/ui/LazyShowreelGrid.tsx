import { createLazyComponent } from '@/components/ui/LazySection';

export const LazyShowreelGrid = createLazyComponent(
    () => import('@/components/ShowreelGridOptimized'),
    <div className="h-96 bg-slate-200/50 dark:bg-dark-800/50 rounded-2xl animate-pulse"></div>,
);
