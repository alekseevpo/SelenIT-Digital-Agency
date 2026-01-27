'use client';

import { useState } from 'react';

interface ContactFormProps {
    lang: string;
    dict: {
        title: string;
        subtitle: string;
        fullName: string;
        email: string;
        company: string;
        service: string;
        serviceOptions: string[];
        budget: string;
        budgetOptions: string[];
        details: string;
        detailsPlaceholder: string;
        submit: string;
        sending: string;
        success: string;
        successTitle: string;
        successSubtitle: string;
        sendAnother: string;
        selectService: string;
        selectBudget: string;
    };
}

export default function ContactForm({ lang, dict }: ContactFormProps) {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="glass-card p-8 lg:p-12 bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 shadow-xl transition-colors duration-300">
            {isSubmitted ? (
                <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="heading-3 mb-4 text-slate-900 dark:text-white">{dict.successTitle}</h3>
                    <p className="text-slate-600 dark:text-dark-400 mb-8">
                        {dict.successSubtitle}
                    </p>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="btn-secondary"
                    >
                        {dict.sendAnother}
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-2">
                                {dict.fullName} *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formState.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-dark-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-2">
                                {dict.email} *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formState.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-dark-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                                placeholder="john@company.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-2">
                            {dict.company}
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formState.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-dark-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                            placeholder="Your Company"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="service" className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-2">
                                {dict.service} *
                            </label>
                            <select
                                id="service"
                                name="service"
                                required
                                value={formState.service}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                            >
                                <option value="">{dict.selectService}</option>
                                {dict.serviceOptions.map((service) => (
                                    <option key={service} value={service}>
                                        {service}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="budget" className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-2">
                                {dict.budget}
                            </label>
                            <select
                                id="budget"
                                name="budget"
                                value={formState.budget}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                            >
                                <option value="">{dict.selectBudget}</option>
                                {dict.budgetOptions.map((budget) => (
                                    <option key={budget} value={budget}>
                                        {budget}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-2">
                            {dict.details} *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={6}
                            value={formState.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-dark-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                            placeholder={dict.detailsPlaceholder}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-500/20"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                {dict.sending}
                            </>
                        ) : (
                            <>
                                {dict.submit}
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}
