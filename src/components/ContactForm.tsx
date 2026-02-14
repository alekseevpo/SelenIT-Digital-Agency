'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactForm } from '@/hooks/useContactForm';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { FormField, FormInput, FormSelect, FormTextarea } from '@/components/ui/FormFields';
import { TabSwitcher } from '@/components/ui/TabSwitcher';
import { SuccessMessage } from '@/components/ui/SuccessMessage';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { RecaptchaNotice } from '@/components/ui/RecaptchaNotice';

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

export default function ContactForm({ lang, dict }: ContactFormProps) {
    const [activeTab, setActiveTab] = useState<'message' | 'callback'>('message');
    const { recaptchaLoaded, getRecaptchaToken } = useRecaptcha();

    const handleFormSubmit = useCallback(
        async (formState: any) => {
            // Get reCAPTCHA token
            const recaptchaToken = await getRecaptchaToken();

            // Log warning but proceed if reCAPTCHA is blocked by ad-blocker
            if (!recaptchaToken) {
                console.warn(
                    'reCAPTCHA not loaded or blocked. Proceeding with honeypot protection only.',
                );
            }

            const messageContent =
                activeTab === 'message'
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
                    email: activeTab === 'message' ? formState.email : 'callback@selen.it',
                    company: formState.company,
                    message: messageContent,
                    recaptchaToken,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }
        },
        [activeTab, getRecaptchaToken],
    );

    const {
        formState,
        errors,
        isSubmitting,
        isSubmitted,
        submitError,
        handleChange,
        handleSubmit,
        resetForm,
        setIsSubmitted,
    } = useContactForm({
        lang,
        activeTab,
        onSubmit: handleFormSubmit,
    });

    const handleTabChange = (tab: 'message' | 'callback') => {
        setActiveTab(tab);
        // Clear errors when switching tabs
        if (errors.email || errors.phone) {
            resetForm();
        }
    };

    const handleSendAnother = () => {
        setIsSubmitted(false);
        resetForm();
    };

    return (
        <div className="p-6 lg:p-10 shadow-2xl relative overflow-hidden group/card transition-all duration-500">
            {/* Subtle background glow for the card */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/5 blur-[100px] rounded-full pointer-events-none group-hover/card:bg-primary-500/10 transition-colors duration-700" />

            {isSubmitted ? (
                <SuccessMessage
                    title={activeTab === 'message' ? dict.successTitle : dict.callbackSuccessTitle}
                    subtitle={
                        activeTab === 'message'
                            ? dict.successSubtitle
                            : dict.callbackSuccessSubtitle
                    }
                    onSendAnother={handleSendAnother}
                    sendAnotherText={dict.sendAnother}
                />
            ) : (
                <div className="space-y-8 relative z-10">
                    {/* Tab Switcher */}
                    <TabSwitcher
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                        tabs={dict.tabs}
                    />

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7"
                        noValidate
                    >
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
                                <FormField label={dict.fullName} required error={errors.name}>
                                    <FormInput
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formState.name}
                                        onChange={handleChange}
                                        placeholder="Jane Doe"
                                        error={!!errors.name}
                                    />
                                </FormField>

                                {/* Conditional: Email or Phone */}
                                {activeTab === 'message' ? (
                                    <FormField label={dict.email} required error={errors.email}>
                                        <FormInput
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            placeholder="jane@company.com"
                                            error={!!errors.email}
                                        />
                                    </FormField>
                                ) : (
                                    <FormField label={dict.phone} required error={errors.phone}>
                                        <FormInput
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formState.phone}
                                            onChange={handleChange}
                                            placeholder={dict.phonePlaceholder}
                                            error={!!errors.phone}
                                        />
                                    </FormField>
                                )}

                                <FormField label={dict.company}>
                                    <FormInput
                                        id="company"
                                        name="company"
                                        type="text"
                                        value={formState.company}
                                        onChange={handleChange}
                                        placeholder={dict.companyPlaceholder}
                                    />
                                </FormField>

                                <FormField
                                    label={dict.service}
                                    required={activeTab === 'message'}
                                    error={errors.service}
                                >
                                    <FormSelect
                                        id="service"
                                        name="service"
                                        value={formState.service}
                                        onChange={handleChange}
                                        error={!!errors.service}
                                    >
                                        <option value="" className="bg-white dark:bg-dark-900">
                                            {dict.selectService}
                                        </option>
                                        {dict.serviceOptions.map((service) => (
                                            <option
                                                key={service}
                                                value={service}
                                                className="bg-white dark:bg-dark-900"
                                            >
                                                {service}
                                            </option>
                                        ))}
                                    </FormSelect>
                                </FormField>

                                {activeTab === 'message' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="col-span-1 md:col-span-2"
                                    >
                                        <FormField label={dict.budget}>
                                            <FormSelect
                                                id="budget"
                                                name="budget"
                                                value={formState.budget}
                                                onChange={handleChange}
                                            >
                                                <option
                                                    value=""
                                                    className="bg-white dark:bg-dark-900"
                                                >
                                                    {dict.selectBudget}
                                                </option>
                                                {dict.budgetOptions.map((budget) => (
                                                    <option
                                                        key={budget}
                                                        value={budget}
                                                        className="bg-white dark:bg-dark-900"
                                                    >
                                                        {budget}
                                                    </option>
                                                ))}
                                            </FormSelect>
                                        </FormField>
                                    </motion.div>
                                )}

                                <FormField
                                    label={
                                        activeTab === 'message'
                                            ? dict.details
                                            : lang === 'ru'
                                              ? 'ДОПОЛНИТЕЛЬНЫЕ ПРИМЕЧАНИЯ'
                                              : 'ADDITIONAL NOTES'
                                    }
                                    required={activeTab === 'message'}
                                    error={errors.message}
                                    className="col-span-1 md:col-span-2"
                                >
                                    <FormTextarea
                                        id="message"
                                        name="message"
                                        rows={activeTab === 'message' ? 5 : 4}
                                        value={formState.message}
                                        onChange={handleChange}
                                        placeholder={
                                            activeTab === 'message'
                                                ? dict.detailsPlaceholder
                                                : lang === 'ru'
                                                  ? 'Расскажите вкратце, о чем пойдет речь...'
                                                  : 'Tell us briefly what the call will be about...'
                                        }
                                        error={!!errors.message}
                                    />
                                </FormField>
                            </motion.div>
                        </AnimatePresence>

                        {submitError && <ErrorMessage message={submitError} />}

                        <div className="col-span-1 md:col-span-2 pt-4">
                            <motion.button
                                whileHover={{ scale: 1.01, y: -1 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-800 text-white font-black py-4 px-10 rounded-full shadow-xl shadow-red-600/20 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-base overflow-hidden group/btn-submit relative mx-auto"
                            >
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />

                                {isSubmitting ? (
                                    <>
                                        <svg
                                            className="animate-spin w-6 h-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        <span className="relative uppercase tracking-widest text-sm">
                                            {dict.sending}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="relative uppercase tracking-widest text-sm">
                                            {activeTab === 'message'
                                                ? dict.submit
                                                : lang === 'ru'
                                                  ? 'Заказать звонок'
                                                  : 'Request Callback'}
                                        </span>
                                        <motion.svg
                                            className="w-5 h-5 relative"
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 1.5,
                                                ease: 'easeInOut',
                                            }}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </motion.svg>
                                    </>
                                )}
                            </motion.button>

                            <RecaptchaNotice lang={lang} />
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
