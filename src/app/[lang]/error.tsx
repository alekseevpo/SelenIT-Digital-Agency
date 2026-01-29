'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-950 transition-colors duration-300">
            <div className="text-center px-4">
                <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-6 text-red-600">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Something went wrong!</h2>
                <p className="text-slate-600 dark:text-dark-400 mb-10 max-w-md mx-auto">
                    We apologize for the inconvenience. An unexpected error has occurred.
                </p>
                <button
                    onClick={() => reset()}
                    className="btn-primary px-8 py-3"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
