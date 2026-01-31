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
                className="fixed bottom-4 right-4 z-50 max-w-sm w-full sm:w-auto"
            >
                <div className="bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl rounded-2xl shadow-card-hover border border-dark-200/50 dark:border-dark-700/50 p-5">
                    <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl" role="img" aria-label="cookie">
                            🍪
                        </span>
                        <h3 className="text-lg font-semibold text-dark-900 dark:text-white">
                            {dictionary.title}
                        </h3>
                    </div>

                    <p className="text-sm text-dark-600 dark:text-dark-300 mb-4 leading-relaxed">
                        {dictionary.message}
                    </p>

                    <Link
                        href={`/${lang}/privacy`}
                        className="text-sm text-primary-600 dark:text-primary-400 hover:underline mb-4 inline-block"
                    >
                        {dictionary.learnMore}
                    </Link>

                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={() => setConsent('declined')}
                            className="flex-1 px-4 py-2.5 text-sm font-medium text-dark-700 dark:text-dark-300 hover:text-dark-900 dark:hover:text-white bg-transparent hover:bg-dark-100 dark:hover:bg-dark-800 rounded-xl transition-colors duration-200"
                        >
                            {dictionary.decline}
                        </button>
                        <button
                            onClick={() => setConsent('accepted')}
                            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 rounded-xl transition-all duration-200 shadow-glow hover:shadow-glow-lg"
                        >
                            {dictionary.accept}
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
