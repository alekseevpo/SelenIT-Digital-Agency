import { motion } from 'framer-motion';
import { ReactNode, cloneElement, isValidElement } from 'react';

interface FormFieldProps {
    label: string;
    required?: boolean;
    error?: string;
    children: ReactNode;
    className?: string;
}

export function FormField({ label, required, error, children, className = '' }: FormFieldProps) {
    // Get the id from the child element
    let childId = '';
    if (isValidElement(children)) {
        const childProps = children.props as any;
        childId = childProps.id || '';
    }

    return (
        <div className={`group/input ${className}`}>
            <label
                htmlFor={childId}
                className="block text-xs font-bold text-slate-500 dark:text-dark-500 uppercase tracking-[0.15em] mb-2.5 transition-colors group-focus-within/input:text-primary-500"
            >
                {label}
                {required && <span className="text-red-500"> *</span>}
            </label>
            {children}
            {error && (
                <p className="mt-2 text-xs text-red-500 font-semibold flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

export function FormInput({ error = false, className = '', ...props }: InputProps) {
    return (
        <input
            className={`w-full px-5 py-3.5 rounded-2xl bg-white/50 dark:bg-dark-900/40 border backdrop-blur-md transition-all outline-none ${
                error
                    ? 'border-red-500/50 text-red-900 dark:text-red-400 bg-red-50/10'
                    : 'border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:border-primary-500/50 dark:focus:border-primary-500/50 shadow-sm'
            } ${className}`}
            {...props}
        />
    );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: boolean;
    children: ReactNode;
}

export function FormSelect({ error = false, className = '', children, ...props }: SelectProps) {
    return (
        <div className="relative">
            <select
                className={`w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-dark-900/60 border transition-all outline-none appearance-none cursor-pointer text-sm ${
                    error
                        ? 'border-red-500/50 text-red-900 dark:text-red-400 bg-red-50/10'
                        : 'border-slate-300 dark:border-white/20 text-slate-900 dark:text-white focus:border-primary-500/50 dark:focus:border-primary-500/50 shadow-sm backdrop-blur-md hover:border-slate-400 dark:hover:border-white/30'
                } ${className}`}
                {...props}
            >
                {children}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 dark:text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
        </div>
    );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
}

export function FormTextarea({ error = false, className = '', ...props }: TextareaProps) {
    return (
        <textarea
            className={`w-full px-5 py-4 rounded-2xl bg-white/50 dark:bg-dark-900/40 border backdrop-blur-md transition-all outline-none resize-none ${
                error
                    ? 'border-red-500/50 text-red-900 dark:text-red-400 bg-red-50/10'
                    : 'border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:border-primary-500/50 dark:focus:border-primary-500/50 shadow-sm'
            } ${className}`}
            {...props}
        />
    );
}
