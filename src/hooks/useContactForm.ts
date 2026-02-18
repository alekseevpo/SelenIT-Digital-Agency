import { useState, useCallback } from 'react';

interface FormState {
    name: string;
    email: string;
    phone: string;
    company: string;
    service: string;
    budget: string;
    dontKnowBudget: boolean;
    message: string;
    website: string; // Honeypot field
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    service?: string;
    message?: string;
    recaptcha?: string;
}

interface UseContactFormProps {
    lang: string;
    activeTab: 'message' | 'callback';
    onSubmit?: (data: FormState) => Promise<void>;
}

export function useContactForm({ lang, activeTab, onSubmit }: UseContactFormProps) {
    const [formState, setFormState] = useState<FormState>({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        dontKnowBudget: false,
        message: '',
        website: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitErrorState] = useState<string | null>(null);

    const setSubmitError = useCallback((error: string | null) => {
        setSubmitErrorState(error);
    }, []);

    const validate = useCallback((): boolean => {
        const newErrors: FormErrors = {};

        if (!formState.name.trim()) {
            newErrors.name =
                lang === 'ru'
                    ? 'Введите имя'
                    : lang === 'es'
                      ? 'Ingrese su nombre'
                      : 'Name is required';
        }

        if (activeTab === 'message') {
            if (!formState.email.trim()) {
                newErrors.email =
                    lang === 'ru'
                        ? 'Введите email'
                        : lang === 'es'
                          ? 'Ingrese su email'
                          : 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
                newErrors.email =
                    lang === 'ru'
                        ? 'Некорректный email'
                        : lang === 'es'
                          ? 'Email inválido'
                          : 'Invalid email format';
            }
            if (!formState.service) {
                newErrors.service =
                    lang === 'ru'
                        ? 'Выберите услугу'
                        : lang === 'es'
                          ? 'Seleccione un servicio'
                          : 'Please select a service';
            }
            if (!formState.message.trim()) {
                newErrors.message =
                    lang === 'ru'
                        ? 'Введите детали'
                        : lang === 'es'
                          ? 'Ingrese detalles'
                          : 'Details are required';
            }
        } else {
            if (!formState.phone.trim()) {
                newErrors.phone =
                    lang === 'ru'
                        ? 'Введите номер телефона'
                        : lang === 'es'
                          ? 'Ingrese su teléfono'
                          : 'Phone is required';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formState, activeTab, lang]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value, type, checked } = e.target as HTMLInputElement;

            setFormState((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));

            // Clear error for this field
            if (errors[name as keyof FormErrors]) {
                setErrors((prev) => ({ ...prev, [name]: undefined }));
            }
            setSubmitError(null);
        },
        [errors, setSubmitError],
    );

    const resetForm = useCallback(() => {
        setFormState({
            name: '',
            email: '',
            phone: '',
            company: '',
            service: '',
            budget: '',
            dontKnowBudget: false,
            message: '',
            website: '',
        });
        setErrors({});
        setSubmitError(null);
    }, [setSubmitError]);

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            setSubmitError(null);

            // Honeypot check
            if (formState.website) {
                console.log('Spam detected');
                setIsSubmitted(true);
                return;
            }

            if (!validate()) return;

            setIsSubmitting(true);

            try {
                await onSubmit?.(formState);
                setIsSubmitted(true);
                resetForm();
                // Scroll to top to show success message
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                console.error('Submit error:', error);
                setSubmitError(
                    lang === 'ru'
                        ? 'Ошибка отправки. Попробуйте позже.'
                        : lang === 'es'
                          ? 'Error al enviar. Intente más tarde.'
                          : 'Failed to send. Please try again later.',
                );
            } finally {
                setIsSubmitting(false);
            }
        },
        [formState, validate, onSubmit, resetForm, lang, setSubmitError],
    );

    return {
        formState,
        errors,
        isSubmitting,
        isSubmitted,
        submitError,
        handleChange,
        handleSubmit,
        resetForm,
        setIsSubmitted,
    };
}
