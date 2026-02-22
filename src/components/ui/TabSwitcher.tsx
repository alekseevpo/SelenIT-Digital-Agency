import { motion } from 'framer-motion';

type TabKey = 'message' | 'callback' | 'brief';

interface TabSwitcherProps {
    activeTab: TabKey;
    onTabChange: (tab: TabKey) => void;
    tabs: {
        message: string;
        callback: string;
        brief?: string;
    };
}

export function TabSwitcher({ activeTab, onTabChange, tabs }: TabSwitcherProps) {
    const tabKeys: TabKey[] = tabs.brief
        ? ['message', 'callback', 'brief']
        : ['message', 'callback'];

    const activeIndex = tabKeys.indexOf(activeTab);
    const tabCount = tabKeys.length;

    return (
        <div className="flex p-1 bg-slate-200/50 dark:bg-dark-950/40 backdrop-blur-sm rounded-2xl w-full max-w-lg mx-auto relative border border-slate-300/30 dark:border-white/5">
            <motion.div
                layoutId="activeTabIndicator"
                className="absolute top-1 bottom-1 rounded-xl bg-white dark:bg-dark-800 shadow-md border border-slate-200/50 dark:border-white/5"
                initial={false}
                animate={{
                    x: `${activeIndex * 100}%`,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ width: `calc(${100 / tabCount}% - ${(4 * 2) / tabCount}px)` }}
            />
            {tabKeys.map((key) => (
                <button
                    key={key}
                    type="button"
                    onClick={() => onTabChange(key)}
                    className={`relative flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 z-10 ${
                        activeTab === key
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-slate-500 dark:text-dark-500 hover:text-slate-700 dark:hover:text-dark-300'
                    }`}
                >
                    {tabs[key]}
                </button>
            ))}
        </div>
    );
}
