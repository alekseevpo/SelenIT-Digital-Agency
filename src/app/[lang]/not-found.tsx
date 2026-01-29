'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-950 transition-colors duration-300">
            <div className="text-center px-4">
                <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Page Not Found</h2>
                <p className="text-slate-600 dark:text-dark-400 mb-10 max-w-md mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link
                    href="/en"
                    className="btn-primary inline-block px-8 py-3"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
