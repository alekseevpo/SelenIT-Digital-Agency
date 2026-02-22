'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Send } from 'lucide-react';

interface BriefStep {
    id: string;
    question: string;
    type: 'select' | 'multiselect' | 'text' | 'textarea' | 'budget';
    options?: string[];
    placeholder?: string;
    required?: boolean;
}

interface BriefWizardDict {
    title: string;
    subtitle: string;
    steps: {
        projectType: string;
        projectTypeOptions: string[];
        goals: string;
        goalsOptions: string[];
        audience: string;
        audiencePlaceholder: string;
        timeline: string;
        timelineOptions: string[];
        budget: string;
        budgetOptions: string[];
        features: string;
        featuresOptions: string[];
        description: string;
        descriptionPlaceholder: string;
        contact: string;
        contactPlaceholder: string;
    };
    next: string;
    back: string;
    submit: string;
    sending: string;
    stepOf: string;
    successTitle: string;
    successSubtitle: string;
    sendAnother: string;
}

interface BriefWizardProps {
    dict: BriefWizardDict;
    lang: string;
    onSubmit: (data: Record<string, string | string[]>) => Promise<void>;
}

export default function BriefWizard({ dict, lang, onSubmit }: BriefWizardProps) {
    const steps: BriefStep[] = [
        {
            id: 'projectType',
            question: dict.steps.projectType,
            type: 'select',
            options: dict.steps.projectTypeOptions,
            required: true,
        },
        {
            id: 'goals',
            question: dict.steps.goals,
            type: 'multiselect',
            options: dict.steps.goalsOptions,
            required: true,
        },
        {
            id: 'audience',
            question: dict.steps.audience,
            type: 'text',
            placeholder: dict.steps.audiencePlaceholder,
        },
        {
            id: 'timeline',
            question: dict.steps.timeline,
            type: 'select',
            options: dict.steps.timelineOptions,
            required: true,
        },
        {
            id: 'budget',
            question: dict.steps.budget,
            type: 'budget',
            options: dict.steps.budgetOptions,
            required: true,
        },
        {
            id: 'features',
            question: dict.steps.features,
            type: 'multiselect',
            options: dict.steps.featuresOptions,
        },
        {
            id: 'description',
            question: dict.steps.description,
            type: 'textarea',
            placeholder: dict.steps.descriptionPlaceholder,
        },
        {
            id: 'contact',
            question: dict.steps.contact,
            type: 'text',
            placeholder: dict.steps.contactPlaceholder,
            required: true,
        },
    ];

    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [direction, setDirection] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    const step = steps[currentStep];
    const progress = ((currentStep + 1) / steps.length) * 100;

    const handleSelect = useCallback(
        (option: string) => {
            setAnswers((prev) => ({ ...prev, [step.id]: option }));
        },
        [step.id],
    );

    const handleMultiSelect = useCallback(
        (option: string) => {
            setAnswers((prev) => {
                const current = (prev[step.id] as string[]) || [];
                const updated = current.includes(option)
                    ? current.filter((o) => o !== option)
                    : [...current, option];
                return { ...prev, [step.id]: updated };
            });
        },
        [step.id],
    );

    const handleTextChange = useCallback(
        (value: string) => {
            setAnswers((prev) => ({ ...prev, [step.id]: value }));
        },
        [step.id],
    );

    const canProceed = useCallback(() => {
        if (!step.required) return true;
        const answer = answers[step.id];
        if (!answer) return false;
        if (Array.isArray(answer)) return answer.length > 0;
        return answer.trim().length > 0;
    }, [step, answers]);

    const goNext = useCallback(() => {
        if (currentStep < steps.length - 1) {
            setDirection(1);
            setCurrentStep((s) => s + 1);
        }
    }, [currentStep, steps.length]);

    const goBack = useCallback(() => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep((s) => s - 1);
        }
    }, [currentStep]);

    const handleSubmit = useCallback(async () => {
        if (!canProceed()) return;
        setIsSubmitting(true);
        try {
            await onSubmit(answers);
            setIsSubmitted(true);
        } catch {
            // error handled by parent
        } finally {
            setIsSubmitting(false);
        }
    }, [answers, canProceed, onSubmit]);

    const handleReset = useCallback(() => {
        setAnswers({});
        setCurrentStep(0);
        setIsSubmitted(false);
        setDirection(1);
    }, []);

    const isLastStep = currentStep === steps.length - 1;
    const currentAnswer = answers[step.id];

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 80 : -80,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -80 : 80,
            opacity: 0,
        }),
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center mb-6"
                >
                    <Check className="w-8 h-8 text-green-500" />
                </motion.div>
                <h3 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-3">
                    {dict.successTitle}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
                    {dict.successSubtitle}
                </p>
                <button
                    onClick={handleReset}
                    className="text-sm text-red-600 dark:text-red-400 hover:underline font-medium"
                >
                    {dict.sendAnother}
                </button>
            </motion.div>
        );
    }

    return (
        <div ref={containerRef} className="space-y-6">
            {/* Progress bar */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-medium">
                        {currentStep + 1} {dict.stepOf} {steps.length}
                    </span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1 bg-slate-200/60 dark:bg-dark-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-red-600 dark:bg-red-500 rounded-full"
                        initial={false}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                </div>
            </div>

            {/* Question */}
            <div className="min-h-[320px] flex flex-col">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={step.id}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="flex-1"
                    >
                        <h3 className="text-xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-snug">
                            {step.question}
                            {step.required && <span className="text-red-500 ml-1">*</span>}
                        </h3>

                        {/* Select options */}
                        {step.type === 'select' && step.options && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {step.options.map((option) => {
                                    const isSelected = currentAnswer === option;
                                    return (
                                        <motion.button
                                            key={option}
                                            type="button"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleSelect(option)}
                                            className={`px-4 py-3.5 rounded-xl border text-left text-sm font-medium transition-all duration-200 ${
                                                isSelected
                                                    ? 'border-red-500 bg-red-500/5 dark:bg-red-500/10 text-red-600 dark:text-red-400 shadow-sm'
                                                    : 'border-slate-200 dark:border-dark-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-dark-600 bg-white/50 dark:bg-dark-900/40'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                                        isSelected
                                                            ? 'border-red-500 bg-red-500'
                                                            : 'border-slate-300 dark:border-dark-600'
                                                    }`}
                                                >
                                                    {isSelected && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="w-1.5 h-1.5 rounded-full bg-white"
                                                        />
                                                    )}
                                                </div>
                                                {option}
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Budget options (same as select but with price styling) */}
                        {step.type === 'budget' && step.options && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {step.options.map((option) => {
                                    const isSelected = currentAnswer === option;
                                    return (
                                        <motion.button
                                            key={option}
                                            type="button"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleSelect(option)}
                                            className={`px-4 py-3.5 rounded-xl border text-left text-sm font-medium transition-all duration-200 ${
                                                isSelected
                                                    ? 'border-red-500 bg-red-500/5 dark:bg-red-500/10 text-red-600 dark:text-red-400 shadow-sm'
                                                    : 'border-slate-200 dark:border-dark-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-dark-600 bg-white/50 dark:bg-dark-900/40'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                                        isSelected
                                                            ? 'border-red-500 bg-red-500'
                                                            : 'border-slate-300 dark:border-dark-600'
                                                    }`}
                                                >
                                                    {isSelected && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="w-1.5 h-1.5 rounded-full bg-white"
                                                        />
                                                    )}
                                                </div>
                                                <span className="font-semibold">{option}</span>
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Multi-select options */}
                        {step.type === 'multiselect' && step.options && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {step.options.map((option) => {
                                    const selected =
                                        Array.isArray(currentAnswer) &&
                                        currentAnswer.includes(option);
                                    return (
                                        <motion.button
                                            key={option}
                                            type="button"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleMultiSelect(option)}
                                            className={`px-4 py-3.5 rounded-xl border text-left text-sm font-medium transition-all duration-200 ${
                                                selected
                                                    ? 'border-red-500 bg-red-500/5 dark:bg-red-500/10 text-red-600 dark:text-red-400 shadow-sm'
                                                    : 'border-slate-200 dark:border-dark-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-dark-600 bg-white/50 dark:bg-dark-900/40'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-4 h-4 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                                        selected
                                                            ? 'border-red-500 bg-red-500'
                                                            : 'border-slate-300 dark:border-dark-600'
                                                    }`}
                                                >
                                                    {selected && (
                                                        <Check className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                                {option}
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Text input */}
                        {step.type === 'text' && (
                            <input
                                type="text"
                                value={(currentAnswer as string) || ''}
                                onChange={(e) => handleTextChange(e.target.value)}
                                placeholder={step.placeholder}
                                className="w-full px-5 py-3.5 rounded-2xl bg-white/50 dark:bg-dark-900/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:border-red-500/50 dark:focus:border-red-500/50 shadow-sm backdrop-blur-md transition-all outline-none"
                            />
                        )}

                        {/* Textarea */}
                        {step.type === 'textarea' && (
                            <textarea
                                value={(currentAnswer as string) || ''}
                                onChange={(e) => handleTextChange(e.target.value)}
                                placeholder={step.placeholder}
                                rows={5}
                                className="w-full px-5 py-4 rounded-2xl bg-white/50 dark:bg-dark-900/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:border-red-500/50 dark:focus:border-red-500/50 shadow-sm backdrop-blur-md transition-all outline-none resize-none"
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-dark-700/50">
                <button
                    type="button"
                    onClick={goBack}
                    disabled={currentStep === 0}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                        currentStep === 0
                            ? 'opacity-0 pointer-events-none'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-800'
                    }`}
                >
                    <ChevronLeft className="w-4 h-4" />
                    {dict.back}
                </button>

                {isLastStep ? (
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleSubmit}
                        disabled={!canProceed() || isSubmitting}
                        className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 dark:disabled:bg-dark-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-red-600/20 disabled:shadow-none"
                    >
                        {isSubmitting ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1,
                                        ease: 'linear',
                                    }}
                                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                />
                                {dict.sending}
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                {dict.submit}
                            </>
                        )}
                    </motion.button>
                ) : (
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={goNext}
                        disabled={!canProceed()}
                        className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 dark:disabled:bg-dark-700 disabled:text-slate-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-red-600/20 disabled:shadow-none"
                    >
                        {dict.next}
                        <ChevronRight className="w-4 h-4" />
                    </motion.button>
                )}
            </div>
        </div>
    );
}
