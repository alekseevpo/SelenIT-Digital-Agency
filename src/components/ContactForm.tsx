'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactFormProps {
    lang: string;
    dict: {
        tabs: {
            message: string;
            callback: string;
        };
        title: string;
        subtitle: string;
        fullName: string;
        email: string;
        phone: string;
        phonePlaceholder: string;
        company: string;
        companyPlaceholder: string;
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
        callbackSuccessTitle: string;
        callbackSuccessSubtitle: string;
        sendAnother: string;
        selectService: string;
        selectBudget: string;
    };
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    service?: string;
    message?: string;
    recaptcha?: string;
}

declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LdTllosAAAAAMPpiP2SBA8aXW0JRKc5Legha5Jp';

export default function ContactForm({ lang, dict }: ContactFormProps) {
    const [activeTab, setActiveTab] = useState<'message' | 'callback'>('message');
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        message: '',
        website: '', // Honeypot field
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

    // Load reCAPTCHA script
    useEffect(() => {
        if (typeof window !== 'undefined' && !document.getElementById('recaptcha-script')) {
            const script = document.createElement('script');
            script.id = 'recaptcha-script';
            script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                window.grecaptcha.ready(() => {
                    setRecaptchaLoaded(true);
                });
            };
            document.head.appendChild(script);
        } else if (typeof window !== 'undefined' && window.grecaptcha) {
            window.grecaptcha.ready(() => {
                setRecaptchaLoaded(true);
            });
        }
    }, []);

    const getRecaptchaToken = useCallback(async (): Promise<string | null> => {
        if (!recaptchaLoaded || !window.grecaptcha) {
            return null;
        }
        try {
            const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact_form' });
            return token;
        } catch (error) {
            console.error('reCAPTCHA error:', error);
            return null;
        }
    }, [recaptchaLoaded]);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formState.name.trim()) newErrors.name = lang === 'ru' ? 'Введите имя' : lang === 'es' ? 'Ingrese su nombre' : 'Name is required';

        if (activeTab === 'message') {
            if (!formState.email.trim()) {
                newErrors.email = lang === 'ru' ? 'Введите email' : lang === 'es' ? 'Ingrese su email' : 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
                newErrors.email = lang === 'ru' ? 'Некорректный email' : lang === 'es' ? 'Email inválido' : 'Invalid email format';
            }
            if (!formState.service) newErrors.service = lang === 'ru' ? 'Выберите услугу' : lang === 'es' ? 'Seleccione un servicio' : 'Please select a service';
            if (!formState.message.trim()) newErrors.message = lang === 'ru' ? 'Введите детали' : lang === 'es' ? 'Ingrese detalles' : 'Details are required';
        } else {
            if (!formState.phone.trim()) {
                newErrors.phone = lang === 'ru' ? 'Введите номер телефона' : lang === 'es' ? 'Ingrese su teléfono' : 'Phone is required';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);

        // Honeypot check: if 'website' is filled, ignore the submission (likely a bot)
        if (formState.website) {
            console.log('Spam detected');
            setIsSubmitted(true); // Pretend it was successful
            return;
        }

        if (!validate()) return;

        setIsSubmitting(true);

        try {
            // Get reCAPTCHA token
            const recaptchaToken = await getRecaptchaToken();

            // Log warning but proceed if reCAPTCHA is blocked by ad-blocker
            if (!recaptchaToken) {
                console.warn('reCAPTCHA not loaded or blocked. Proceeding with honeypot protection only.');
            }

            const messageContent = activeTab === 'message'
                ? `Type: Inquiry\nService: ${formState.service}\nBudget: ${formState.budget || 'Not specified'}\n\n${formState.message}`
                : `Type: Callback Request\nPhone: ${formState.phone}\nService Interested In: ${formState.service || 'Not specified'}\n\nNotes: ${formState.message || 'No notes provided'}`;

            // Submit to API
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formState.name,
                    email: activeTab === 'message' ? formState.email : 'callback@selen.it', // Fallback for callback
                    company: formState.company,
                    message: messageContent,
                    recaptchaToken,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setIsSubmitted(true);
            setFormState({
                name: '',
                email: '',
                phone: '',
                company: '',
                service: '',
                budget: '',
                message: '',
                website: '',
            });
        } catch (error) {
            console.error('Submit error:', error);
            setSubmitError(
                lang === 'ru' ? 'Ошибка отправки. Попробуйте позже.' :
                    lang === 'es' ? 'Error al enviar. Intente más tarde.' :
                        'Failed to send. Please try again later.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Real-time validation clear
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
        setSubmitError(null);
    };

    return (
        <div className="glass-card p-6 lg:p-10 shadow-2xl border border-white/20 dark:border-white/5 relative overflow-hidden group/card transition-all duration-500">
            {/* Subtle background glow for the card */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/5 blur-[100px] rounded-full pointer-events-none group-hover/card:bg-primary-500/10 transition-colors duration-700" />

            {isSubmitted ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                >
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                        <motion.svg
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="w-10 h-10 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </motion.svg>
                    </div>
                    <h3 className="heading-3 mb-4 text-slate-900 dark:text-white font-bold tracking-tight">
                        {activeTab === 'message' ? dict.successTitle : dict.callbackSuccessTitle}
                    </h3>
                    <p className="text-slate-600 dark:text-dark-400 mb-8 max-w-sm mx-auto leading-relaxed">
                        {activeTab === 'message' ? dict.successSubtitle : dict.callbackSuccessSubtitle}
                    </p>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="btn-secondary group/btn relative overflow-hidden"
                    >
                        <span className="relative z-10">{dict.sendAnother}</span>
                        <div className="absolute inset-0 bg-primary-500/5 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    </button>
                </motion.div>
            ) : (
                <div className="space-y-8 relative z-10">
                    {/* Tab Switcher - More refined design */}
                    <div className="flex p-1 bg-slate-200/50 dark:bg-dark-950/40 backdrop-blur-sm rounded-2xl w-full max-w-md mx-auto relative border border-slate-300/30 dark:border-white/5">
                        <motion.div
                            layoutId="activeTabIndicator"
                            className="absolute top-1 bottom-1 rounded-xl bg-white dark:bg-dark-800 shadow-md border border-slate-200/50 dark:border-white/5"
                            initial={false}
                            animate={{
                                x: activeTab === 'message' ? '0%' : '100%',
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            style={{ width: 'calc(50% - 4px)' }}
                        />
                        <button
                            type="button"
                            onClick={() => setActiveTab('message')}
                            className={`relative flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 z-10 ${activeTab === 'message'
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-slate-500 dark:text-dark-500 hover:text-slate-700 dark:hover:text-dark-300'
                                }`}
                        >
                            {dict.tabs.message}
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('callback')}
                            className={`relative flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 z-10 ${activeTab === 'callback'
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-slate-500 dark:text-dark-500 hover:text-slate-700 dark:hover:text-dark-300'
                                }`}
                        >
                            {dict.tabs.callback}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7" noValidate>
                        {/* Honeypot field - hidden from users */}
                        <div className="hidden" aria-hidden="true">
                            <input
                                type="text"
                                name="website"
                                value={formState.website}
                                onChange={handleChange}
                                tabIndex={-1}
                                autoComplete="off"
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7"
                            >
                                {/* Common: Name */}
                                <div className="group/input">
                                    <label htmlFor="name" className="block text-xs font-bold text-slate-500 dark:text-dark-500 uppercase tracking-[0.15em] mb-2.5 transition-colors group-focus-within/input:text-primary-500">
                                        {dict.fullName} <span className="text-primary-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formState.name}
                                        onChange={handleChange}
                                        className={`w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-dark-900/40 border backdrop-blur-md transition-all outline-none ring-offset-bg-primary focus:ring-4 focus:ring-primary-500/10 ${errors.name
                                            ? 'border-red-500/50 text-red-900 dark:text-red-400 bg-red-50/10'
                                            : 'border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:border-primary-500/50 dark:focus:border-primary-500/50 shadow-sm'
                                            }`}
                                        placeholder="Jane Doe"
                                    />
                                    {errors.name && <p className="mt-2 text-xs text-red-500 font-semibold flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                        {errors.name}
                                    </p>}
                                </div>

                                {/* Conditional: Email or Phone */}
                                {activeTab === 'message' ? (
                                    <div className="group/input">
                                        <label htmlFor="email" className="block text-xs font-bold text-slate-500 dark:text-dark-500 uppercase tracking-[0.15em] mb-2.5 transition-colors group-focus-within/input:text-primary-500">
                                            {dict.email} <span className="text-primary-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            className={`w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-dark-900/40 border backdrop-blur-md transition-all outline-none ring-offset-bg-primary focus:ring-4 focus:ring-primary-500/10 ${errors.email
                                                ? 'border-red-500/50 text-red-900 dark:text-red-400 bg-red-50/10'
                                                : 'border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:border-primary-500/50 dark:focus:border-primary-500/50 shadow-sm'
                                                }`}
                                            placeholder="jane@company.com"
                                        />
                                        {errors.email && <p className="mt-2 text-xs text-red-500 font-semibold flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                            {errors.email}
                                        </p>}
                                    </div>
                                ) : (
                                    <div className="group/input">
                                        <label htmlFor="phone" className="block text-xs font-bold text-slate-500 dark:text-dark-500 uppercase tracking-[0.15em] mb-2.5 transition-colors group-focus-within/input:text-primary-500">
                                            {dict.phone} <span className="text-primary-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formState.phone}
                                            onChange={handleChange}
                                            className={`w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-dark-900/40 border backdrop-blur-md transition-all outline-none ring-offset-bg-primary focus:ring-4 focus:ring-primary-500/10 ${errors.phone
                                                ? 'border-red-500/50 text-red-900 dark:text-red-400 bg-red-50/10'
                                                : 'border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:border-primary-500/50 dark:focus:border-primary-500/50 shadow-sm'
                                                }`}
                                            placeholder={dict.phonePlaceholder}
                                        />
                                        {errors.phone && <p className="mt-2 text-xs text-red-500 font-semibold flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                            {errors.phone}
                                        </p>}
                                    </div>
                                )}

                                <div className="group/input">
                                    <label htmlFor="company" className="block text-xs font-bold text-slate-500 dark:text-dark-500 uppercase tracking-[0.15em] mb-2.5 transition-colors group-focus-within/input:text-primary-500">
                                        {dict.company}
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formState.company}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-dark-900/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-dark-600 focus:border-primary-500/50 dark:focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none shadow-sm backdrop-blur-md"
                                        placeholder={dict.companyPlaceholder}
                                    />
                                </div>

                                <div className="group/input">
                                    <label htmlFor="service" className="block text-xs font-bold text-slate-500 dark:text-dark-500 uppercase tracking-[0.15em] mb-2.5 transition-colors group-focus-within/input:text-primary-500">
                                        {dict.service} {activeTab === 'message' && <span className="text-primary-500">*</span>}
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="service"
                                            name="service"
                                            value={formState.service}
                                            onChange={handleChange}
                                            className={`w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-dark-900/40 border transition-all outline-none appearance-none focus:ring-4 focus:ring-primary-500/10 cursor-pointer ${errors.service
                                                ? 'border-red-500/50 text-red-900 dark:text-red-400 bg-red-50/10'
                                                : 'border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:border-primary-500/50 dark:focus:border-primary-500/50 shadow-sm backdrop-blur-md'
                                                }`}
                                        >
                                            <option value="" className="bg-white dark:bg-dark-900">{dict.selectService}</option>
                                            {dict.serviceOptions.map((service) => (
                                                <option key={service} value={service} className="bg-white dark:bg-dark-900">
                                                    {service}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-dark-600">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.service && <p className="mt-2 text-xs text-red-500 font-semibold flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                        {errors.service}
                                    </p>}
                                </div>

                                {activeTab === 'message' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="col-span-1 md:col-span-2 group/input"
                                    >
                                        <label htmlFor="budget" className="block text-xs font-bold text-slate-500 dark:text-dark-500 uppercase tracking-[0.15em] mb-2.5 transition-colors group-focus-within/input:text-primary-500">
                                            {dict.budget}
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="budget"
                                                name="budget"
                                                value={formState.budget}
                                                onChange={handleChange}
                                                className="w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-dark-900/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white appearance-none focus:border-primary-500/50 dark:focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none shadow-sm backdrop-blur-md cursor-pointer"
                                            >
                                                <option value="" className="bg-white dark:bg-dark-900">{dict.selectBudget}</option>
                                                {dict.budgetOptions.map((budget) => (
                                                    <option key={budget} value={budget} className="bg-white dark:bg-dark-900">
                                                        {budget}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-dark-600">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                <div className="col-span-1 md:col-span-2 group/input">
                                    <label htmlFor="message" className="block text-xs font-bold text-slate-500 dark:text-dark-500 uppercase tracking-[0.15em] mb-2.5 transition-colors group-focus-within/input:text-primary-500">
                                        {activeTab === 'message' ? dict.details : (lang === 'ru' ? 'ДОПОЛНИТЕЛЬНЫЕ ПРИМЕЧАНИЯ' : 'ADDITIONAL NOTES')} {activeTab === 'message' && <span className="text-primary-500">*</span>}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={activeTab === 'message' ? 5 : 4}
                                        value={formState.message}
                                        onChange={handleChange}
                                        className={`w-full px-5 py-4 rounded-2xl bg-white dark:bg-dark-900/40 border backdrop-blur-md transition-all outline-none resize-none focus:ring-4 focus:ring-primary-500/10 ${errors.message
                                            ? 'border-red-500/50 text-red-900 dark:text-red-400 bg-red-50/10'
                                            : 'border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:border-primary-500/50 dark:focus:border-primary-500/50 shadow-sm'
                                            }`}
                                        placeholder={activeTab === 'message' ? dict.detailsPlaceholder : (lang === 'ru' ? 'Расскажите вкратце, о чем пойдет речь...' : 'Tell us briefly what the call will be about...')}
                                    />
                                    {errors.message && <p className="mt-2 text-xs text-red-500 font-semibold flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                        {errors.message}
                                    </p>}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {submitError && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="col-span-1 md:col-span-2 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 flex items-center gap-3 text-sm font-medium"
                            >
                                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {submitError}
                            </motion.div>
                        )}

                        <div className="col-span-1 md:col-span-2 pt-4">
                            <motion.button
                                whileHover={{ scale: 1.01, y: -1 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-[#f97316] to-[#22c55e] dark:from-[#6366f1] dark:to-[#d946ef] text-white font-black py-5 px-8 rounded-2xl shadow-xl shadow-primary-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-lg overflow-hidden group/btn-submit relative"
                            >
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />

                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        <span className="relative uppercase tracking-widest text-sm">{dict.sending}</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="relative uppercase tracking-widest text-sm">
                                            {activeTab === 'message' ? dict.submit : (lang === 'ru' ? 'Заказать звонок' : 'Request Callback')}
                                        </span>
                                        <motion.svg
                                            className="w-5 h-5 relative"
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </motion.svg>
                                    </>
                                )}
                            </motion.button>

                            {/* reCAPTCHA notice - Centered and clean */}
                            <div className="mt-8 flex flex-col items-center gap-1.5 opacity-60">
                                <p className="text-[9px] text-slate-500 dark:text-dark-500 text-center font-bold uppercase tracking-[0.2em]">
                                    {lang === 'ru' ? 'Защищено reCAPTCHA' : lang === 'es' ? 'Protegido por reCAPTCHA' : 'Protected by reCAPTCHA'}
                                </p>
                                <div className="flex items-center gap-2 text-[9px] text-slate-500 dark:text-dark-500 font-bold uppercase tracking-[0.2em]">
                                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors underline decoration-dotted underline-offset-4">
                                        {lang === 'ru' ? 'Конфиденциальность' : lang === 'es' ? 'Privacidad' : 'Privacy'}
                                    </a>
                                    <span className="text-[8px]">&</span>
                                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors underline decoration-dotted underline-offset-4">
                                        {lang === 'ru' ? 'Условия' : lang === 'es' ? 'Términos' : 'Terms'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
