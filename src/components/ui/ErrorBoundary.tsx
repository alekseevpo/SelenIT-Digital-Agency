'use client';

import React from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error?: Error; reset: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);

        // Здесь можно добавить отправку ошибки в сервис мониторинга
        // Например, Sentry или другой сервис
    }

    reset = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            const FallbackComponent = this.props.fallback || DefaultErrorFallback;
            return <FallbackComponent error={this.state.error} reset={this.reset} />;
        }

        return this.props.children;
    }
}

function DefaultErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
            <div className="text-center p-8 max-w-md">
                <div className="mb-6">
                    <h1 className="text-6xl font-bold text-red-600 dark:text-red-500 mb-4">500</h1>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                        Что-то пошло не так
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить страницу.
                    </p>
                </div>

                <div className="space-y-4">
                    <button onClick={reset} className="btn-primary w-full">
                        Попробовать снова
                    </button>

                    <button
                        onClick={() => (window.location.href = '/')}
                        className="btn-secondary w-full"
                    >
                        На главную
                    </button>
                </div>

                {process.env.NODE_ENV === 'development' && error && (
                    <details className="mt-6 text-left">
                        <summary className="cursor-pointer text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">
                            Технические детали (разработка)
                        </summary>
                        <pre className="mt-2 p-4 bg-slate-100 dark:bg-slate-800 rounded text-xs text-slate-700 dark:text-slate-300 overflow-auto">
                            {error.stack}
                        </pre>
                    </details>
                )}
            </div>
        </div>
    );
}

export default ErrorBoundary;
