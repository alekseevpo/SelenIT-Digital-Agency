'use client';

import { useState, useCallback, lazy, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactForm } from '@/hooks/useContactForm';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { TabSwitcher } from '@/components/ui/TabSwitcher';
import { SuccessMessage } from '@/components/ui/SuccessMessage';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { RecaptchaNotice } from '@/components/ui/RecaptchaNotice';
import { useEffect } from 'react';

// Lazy load heavy components
const ContactFormFields = lazy(() => import('@/components/ContactFormFields'));
const SubmitButton = lazy(() => import('@/components/SubmitButton'));

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
    const successMessageRef = useRef<HTMLDivElement>(null);

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
            {isSubmitted ? (
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
                            >
                                <ErrorMessage message={submitError} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* reCAPTCHA notice */}
                    <RecaptchaNotice lang={lang} />
                </div>
            )}
        </div>
    );
}
