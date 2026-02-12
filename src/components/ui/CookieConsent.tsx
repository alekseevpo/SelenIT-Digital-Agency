'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCookieConsent } from '@/components/providers/CookieConsentProvider';

interface CookieConsentProps {
    lang: string;
    dictionary: {
        title: string;
        message: string;
        accept: string;
        decline: string;
        learnMore: string;
    };
}

export function CookieConsent({ lang, dictionary }: CookieConsentProps) {
    const { consent, setConsent } = useCookieConsent();

    if (consent !== 'pending') {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="fixed bottom-4 left-1/2 -translate-x-1/2 translate-y-0 z-50 max-w-xs w-full !important"
            >
                <div className="bg-white/60 dark:bg-dark-900/60 backdrop-blur-md rounded-xl shadow-card-hover border border-dark-200/30 dark:border-dark-700/30 p-3">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl" role="img" aria-label="cookie">
                            🍪
                        </span>
                        <h3 className="text-xl font-frantz font-normal text-dark-900 dark:text-white tracking-widest pt-1">
                            {dictionary.title}
                        </h3>
                    </div>

                    <p className="text-xs text-dark-600 dark:text-dark-300 mb-3 leading-relaxed">
                        {dictionary.message}
                    </p>

                    <Link
                        href={`/${lang}/privacy`}
                        className="text-xs text-primary-600 dark:text-primary-400 hover:underline mb-3 inline-block"
                    >
                        {dictionary.learnMore}
                    </Link>

                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={() => setConsent('declined')}
                            className="flex-1 px-3 py-1.5 text-xs font-medium text-dark-700 dark:text-dark-300 hover:text-dark-900 dark:hover:text-white bg-transparent hover:bg-dark-100 dark:hover:bg-dark-800 rounded-full transition-colors duration-200"
                        >
                            {dictionary.decline}
                        </button>
                        <button
                            onClick={() => setConsent('accepted')}
                            className="flex-1 px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-full transition-all duration-200 shadow-glow hover:shadow-glow-lg"
                        >
                            {dictionary.accept}
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
