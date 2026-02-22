'use client';

import { useState, useCallback, lazy, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactForm, type FormState } from '@/hooks/useContactForm';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import type { Dictionary } from '@/types/dictionary';
import { TabSwitcher } from '@/components/ui/TabSwitcher';
import { SuccessMessage } from '@/components/ui/SuccessMessage';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { RecaptchaNotice } from '@/components/ui/RecaptchaNotice';
import { useEffect } from 'react';

// Lazy load heavy components
const ContactFormFields = lazy(() => import('@/components/ContactFormFields'));
const SubmitButton = lazy(() => import('@/components/SubmitButton'));
const BriefWizard = lazy(() => import('@/components/BriefWizard'));

interface ContactFormProps {
    lang: string;
    dict: Dictionary['contact']['form'];
}

export default function ContactForm({ lang, dict }: ContactFormProps) {
    const [activeTab, setActiveTab] = useState<'message' | 'callback' | 'brief'>('message');
    const { recaptchaLoaded, getRecaptchaToken } = useRecaptcha();
    const successMessageRef = useRef<HTMLDivElement>(null);

    const handleFormSubmit = useCallback(
        async (formState: FormState) => {
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

    const handleBriefSubmit = useCallback(
        async (answers: Record<string, string | string[]>) => {
            const recaptchaToken = await getRecaptchaToken();

            // Format brief answers into readable message
            const lines = Object.entries(answers)
                .map(([key, value]) => {
                    const formattedValue = Array.isArray(value) ? value.join(', ') : value;
                    return `${key}: ${formattedValue}`;
                })
                .join('\n');

            const messageContent = `Type: Interactive Brief\n\n${lines}`;
            const contactInfo = (answers.contact as string) || '';
            const emailMatch = contactInfo.match(/[\w.-]+@[\w.-]+\.\w+/);
            const email = emailMatch ? emailMatch[0] : 'brief@selen.it';

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: contactInfo.split(/[,@]/).at(0)?.trim() || 'Brief Submission',
                    email,
                    company: '',
                    message: messageContent,
                    recaptchaToken,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to send brief');
            }
        },
        [getRecaptchaToken],
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
        activeTab: activeTab === 'brief' ? 'message' : activeTab,
        onSubmit: handleFormSubmit,
    });

    const handleTabChange = (tab: 'message' | 'callback' | 'brief') => {
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

    // Focus on success message when form is submitted
    useEffect(() => {
        if (isSubmitted && successMessageRef.current) {
            successMessageRef.current.focus();
            // Scroll to success message if it's not in view (only in browser)
            if (typeof window !== 'undefined' && successMessageRef.current.scrollIntoView) {
                successMessageRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }
    }, [isSubmitted]);

    return (
        <div className="contact-form p-4 sm:p-6 lg:p-10 shadow-2xl relative overflow-hidden group/card transition-all duration-500 overflow-x-hidden">
            {isSubmitted && activeTab !== 'brief' ? (
                <div ref={successMessageRef} tabIndex={-1}>
                    <SuccessMessage
                        title={
                            activeTab === 'message' ? dict.successTitle : dict.callbackSuccessTitle
                        }
                        subtitle={
                            activeTab === 'message'
                                ? dict.successSubtitle
                                : dict.callbackSuccessSubtitle
                        }
                        onSendAnother={handleSendAnother}
                        sendAnotherText={dict.sendAnother}
                    />
                </div>
            ) : (
                <div className="space-y-8 relative z-10">
                    {/* Tab Switcher */}
                    <TabSwitcher
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                        tabs={dict.tabs}
                    />

                    <AnimatePresence mode="wait">
                        {activeTab === 'brief' ? (
                            <motion.div
                                key="brief"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                            >
                                <Suspense
                                    fallback={
                                        <div className="h-96 animate-pulse bg-slate-100 dark:bg-dark-800 rounded-2xl" />
                                    }
                                >
                                    {dict.brief && (
                                        <BriefWizard
                                            dict={dict.brief}
                                            lang={lang}
                                            onSubmit={handleBriefSubmit}
                                        />
                                    )}
                                </Suspense>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                            >
                                <form
                                    onSubmit={handleSubmit}
                                    className="form-grid grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-6"
                                    noValidate
                                    aria-live="polite"
                                >
                                    {/* Lazy loaded form fields */}
                                    <Suspense
                                        fallback={
                                            <div className="col-span-2 h-64 animate-pulse bg-slate-100 dark:bg-dark-800 rounded-2xl" />
                                        }
                                    >
                                        <ContactFormFields
                                            activeTab={activeTab}
                                            dict={dict}
                                            formState={formState}
                                            errors={errors}
                                            handleChange={handleChange}
                                        />
                                    </Suspense>

                                    {/* Lazy loaded submit button */}
                                    <Suspense
                                        fallback={
                                            <div className="col-span-2 h-12 animate-pulse bg-slate-100 dark:bg-dark-800 rounded-2xl" />
                                        }
                                    >
                                        <SubmitButton
                                            isSubmitting={isSubmitting}
                                            activeTab={activeTab}
                                            dict={dict}
                                        />
                                    </Suspense>
                                </form>

                                {/* Error display */}
                                <AnimatePresence>
                                    {submitError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-6"
                                        >
                                            <ErrorMessage message={submitError} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* reCAPTCHA notice */}
                                <div className="mt-6">
                                    <RecaptchaNotice lang={lang} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
