import { motion } from 'framer-motion';

interface TabSwitcherProps {
    activeTab: 'message' | 'callback';
    onTabChange: (tab: 'message' | 'callback') => void;
    tabs: {
        message: string;
        callback: string;
    };
}

export function TabSwitcher({ activeTab, onTabChange, tabs }: TabSwitcherProps) {
    return (
        <div className="flex p-1 bg-slate-200/50 dark:bg-dark-950/40 backdrop-blur-sm rounded-2xl w-full max-w-md mx-auto relative border border-slate-300/30 dark:border-white/5">
            <motion.div
                layoutId="activeTabIndicator"
                className="absolute top-1 bottom-1 rounded-xl bg-white dark:bg-dark-800 shadow-md border border-slate-200/50 dark:border-white/5"
                initial={false}
                animate={{
                    x: activeTab === 'message' ? '0%' : '100%',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ width: 'calc(50% - 4px)' }}
            />
            <button
                type="button"
                onClick={() => onTabChange('message')}
                className={`relative flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 z-10 ${
                    activeTab === 'message'
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-slate-500 dark:text-dark-500 hover:text-slate-700 dark:hover:text-dark-300'
                }`}
            >
                {tabs.message}
            </button>
            <button
                type="button"
                onClick={() => onTabChange('callback')}
                className={`relative flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 z-10 ${
                    activeTab === 'callback'
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-slate-500 dark:text-dark-500 hover:text-slate-700 dark:hover:text-dark-300'
                }`}
            >
                {tabs.callback}
            </button>
        </div>
    );
}
