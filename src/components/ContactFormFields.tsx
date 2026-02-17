'use client';

import { FormField, FormInput, FormSelect, FormTextarea } from '@/components/ui/FormFields';

interface ContactFormFieldsProps {
    activeTab: 'message' | 'callback';
    dict: any;
    formState: any;
    errors: any;
    handleChange: (e: any) => void;
}

export default function ContactFormFields({
    activeTab,
    dict,
    formState,
    errors,
    handleChange,
}: ContactFormFieldsProps) {
    return (
        <>
            {/* Hidden honeypot field */}
            <div aria-hidden="true" className="hidden">
                <input
                    autoComplete="off"
                    name="website"
                    tabIndex={-1}
                    type="text"
                    value=""
                    readOnly
                />
            </div>

            {/* Common fields */}
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
                <FormField label={dict.fullName} required error={errors.name}>
                    <FormInput
                        id="name"
                        name="name"
                        placeholder="Jane Doe"
                        value={formState.name}
                        onChange={handleChange}
                        error={!!errors.name}
                    />
                </FormField>

                <FormField label={dict.email} required error={errors.email}>
                    <FormInput
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jane@company.com"
                        value={formState.email}
                        onChange={handleChange}
                        error={!!errors.email}
                    />
                </FormField>

                <FormField label={dict.company} error={errors.company}>
                    <FormInput
                        id="company"
                        name="company"
                        placeholder={dict.companyPlaceholder}
                        value={formState.company}
                        onChange={handleChange}
                        error={!!errors.company}
                    />
                </FormField>

                <FormField label={dict.service} required error={errors.service}>
                    <FormSelect
                        id="service"
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        error={!!errors.service}
                    >
                        <option value="">{dict.selectService}</option>
                        {dict.serviceOptions.map((service: string) => (
                            <option key={service} value={service}>
                                {service}
                            </option>
                        ))}
                    </FormSelect>
                </FormField>
            </div>

            {/* Tab-specific fields */}
            {activeTab === 'message' && (
                <div className="space-y-7">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-7 items-center">
                        <FormField
                            label={dict.budget}
                            error={errors.budget}
                            className="lg:col-span-2"
                        >
                            <FormSelect
                                id="budget"
                                name="budget"
                                value={formState.budget}
                                onChange={handleChange}
                                error={!!errors.budget}
                            >
                                <option value="">{dict.selectBudget}</option>
                                {dict.budgetOptions.map((budget: string) => (
                                    <option key={budget} value={budget}>
                                        {budget}
                                    </option>
                                ))}
                            </FormSelect>
                        </FormField>
                        <div className="flex justify-end lg:justify-start lg:mt-5">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        name="dontKnowBudget"
                                        checked={formState.dontKnowBudget || false}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-600 peer-checked:border-red-600 dark:peer-checked:border-red-500 peer-checked:bg-red-600 dark:peer-checked:bg-red-500 transition-all duration-200 flex items-center justify-center">
                                        <svg
                                            className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors whitespace-nowrap select-none">
                                    {dict.notSureOption}
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'callback' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
                    <FormField label={dict.phone} error={errors.phone}>
                        <FormInput
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder={dict.phonePlaceholder}
                            value={formState.phone}
                            onChange={handleChange}
                            error={!!errors.phone}
                        />
                    </FormField>
                    <div /> {/* Empty spacer for grid alignment */}
                </div>
            )}

            {/* Message field */}
            <div className="col-span-1 md:col-span-2">
                <FormField
                    label={activeTab === 'message' ? dict.details : dict.message}
                    error={errors.message}
                >
                    <FormTextarea
                        id="message"
                        name="message"
                        placeholder={
                            activeTab === 'message'
                                ? dict.detailsPlaceholder
                                : 'Any additional notes or requirements...'
                        }
                        value={formState.message}
                        onChange={handleChange}
                        error={!!errors.message}
                        rows={4}
                    />
                </FormField>
            </div>
        </>
    );
}
