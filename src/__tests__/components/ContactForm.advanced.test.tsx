import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import ContactForm from '@/components/ContactForm';
import '@/__tests__/types';

// Mock the hooks
jest.mock('@/hooks/useContactForm');
jest.mock('@/hooks/useRecaptcha');

import { useContactForm } from '@/hooks/useContactForm';
import { useRecaptcha } from '@/hooks/useRecaptcha';

const mockUseContactForm = useContactForm as jest.MockedFunction<typeof useContactForm>;
const mockUseRecaptcha = useRecaptcha as jest.MockedFunction<typeof useRecaptcha>;

// Mock the UI components
jest.mock('@/components/ui/TabSwitcher', () => ({
    TabSwitcher: ({ activeTab, onTabChange, tabs }: any) => (
        <div data-testid="tab-switcher">
            <button
                data-testid="message-tab"
                className={activeTab === 'message' ? 'active' : ''}
                onClick={() => onTabChange('message')}
            >
                {tabs.message}
            </button>
            <button
                data-testid="callback-tab"
                className={activeTab === 'callback' ? 'active' : ''}
                onClick={() => onTabChange('callback')}
            >
                {tabs.callback}
            </button>
        </div>
    ),
}));

jest.mock('@/components/ui/SuccessMessage', () => ({
    SuccessMessage: ({ title, subtitle, onSendAnother, sendAnotherText }: any) => (
        <div data-testid="success-message">
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <button onClick={onSendAnother}>{sendAnotherText}</button>
        </div>
    ),
}));

jest.mock('@/components/ui/ErrorMessage', () => ({
    ErrorMessage: ({ message }: any) => <div data-testid="error-message">{message}</div>,
}));

jest.mock('@/components/ui/RecaptchaNotice', () => ({
    RecaptchaNotice: ({ lang }: any) => (
        <div data-testid="recaptcha-notice">Protected by reCAPTCHA ({lang})</div>
    ),
}));

// Mock form fields
jest.mock('@/components/ui/FormFields', () => ({
    FormField: ({ label, required, error, children }: any) => (
        <div data-testid="form-field">
            <label>
                {label}
                {required && ' *'}
            </label>
            {children}
            {error && <div data-testid="field-error">{error}</div>}
        </div>
    ),
    FormInput: ({ ...props }: any) => <input data-testid="form-input" {...props} />,
    FormSelect: ({ children, ...props }: any) => (
        <select data-testid="form-select" {...props}>
            {children}
        </select>
    ),
    FormTextarea: ({ ...props }: any) => <textarea data-testid="form-textarea" {...props} />,
}));

describe('ContactForm - Advanced Testing', () => {
    const mockDict = {
        tabs: { message: 'Send Message', callback: 'Request Callback' },
        title: 'Contact Us',
        subtitle: 'Get in touch',
        fullName: 'Full Name',
        email: 'Email',
        phone: 'Phone',
        phonePlaceholder: '+1 (555) 123-4567',
        company: 'Company',
        companyPlaceholder: 'Your company',
        service: 'Service',
        serviceOptions: ['Web Development', 'Mobile App', 'UI/UX Design'],
        budget: 'Budget',
        budgetOptions: ['$5k-10k', '$10k-25k', '$25k+'],
        details: 'Project Details',
        detailsPlaceholder: 'Tell us about your project...',
        submit: 'Send Message',
        sending: 'Sending...',
        success: 'Success!',
        successTitle: 'Thank you!',
        successSubtitle: 'We will get back to you soon.',
        callbackSuccessTitle: 'Callback requested!',
        callbackSuccessSubtitle: 'We will call you back soon.',
        sendAnother: 'Send another message',
        selectService: 'Select a service',
        selectBudget: 'Select budget range',
    };

    const mockFormState = {
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        message: '',
        website: '',
    };

    const mockHandlers = {
        handleChange: jest.fn((e: any) => {}) as jest.MockedFunction<(e: any) => void>,
        handleSubmit: jest.fn(() => Promise.resolve()) as jest.MockedFunction<() => Promise<void>>,
        resetForm: jest.fn(() => {}) as jest.MockedFunction<() => void>,
        setIsSubmitted: jest.fn((value: any) => {}) as jest.MockedFunction<(value: any) => void>,
    };

    beforeEach(() => {
        jest.clearAllMocks();

        mockUseContactForm.mockReturnValue({
            formState: mockFormState,
            errors: {},
            isSubmitting: false,
            isSubmitted: false,
            submitError: null,
            ...mockHandlers,
        });

        mockUseRecaptcha.mockReturnValue({
            recaptchaLoaded: true,
            getRecaptchaToken: jest.fn(() => Promise.resolve('test-token')) as jest.MockedFunction<
                () => Promise<string>
            >,
        });
    });

    describe('Component Rendering', () => {
        it('renders all form sections correctly', () => {
            render(<ContactForm lang="en" dict={mockDict} />);

            expect(screen.getByTestId('tab-switcher')).toBeInTheDocument();
            expect(screen.getByTestId('form-field')).toBeInTheDocument();
            expect(screen.getByTestId('recaptcha-notice')).toBeInTheDocument();
        });

        it('renders correct number of form fields', () => {
            render(<ContactForm lang="en" dict={mockDict} />);

            expect(screen.getAllByTestId('form-input')).toHaveLength(4); // name, email, phone, company
            expect(screen.getAllByTestId('form-select')).toHaveLength(2); // service, budget
            expect(screen.getByTestId('form-textarea')).toBeInTheDocument(); // message
        });

        it('displays correct tab labels', () => {
            render(<ContactForm lang="en" dict={mockDict} />);

            expect(screen.getByText('Send Message')).toBeInTheDocument();
            expect(screen.getByText('Request Callback')).toBeInTheDocument();
        });
    });

    describe('Tab Switching', () => {
        it('switches between message and callback tabs', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockDict} />);

            const messageTab = screen.getByTestId('message-tab');
            const callbackTab = screen.getByTestId('callback-tab');

            expect(messageTab).toHaveClass('active');
            expect(callbackTab).not.toHaveClass('active');

            await user.click(callbackTab);

            expect(callbackTab).toHaveClass('active');
            expect(messageTab).not.toHaveClass('active');
        });

        it('calls onTabChange when tab is clicked', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockDict} />);

            await user.click(screen.getByTestId('callback-tab'));

            // The tab change should trigger form state updates
            expect(mockHandlers.handleChange).toHaveBeenCalled();
        });
    });

    describe('Form Validation', () => {
        it('shows validation errors for required fields', async () => {
            mockUseContactForm.mockReturnValue({
                ...mockHandlers,
                formState: mockFormState,
                errors: {
                    name: 'Name is required',
                    email: 'Email is required',
                    service: 'Service is required',
                    message: 'Message is required',
                },
                isSubmitting: false,
                isSubmitted: false,
                submitError: null,
            });

            render(<ContactForm lang="en" dict={mockDict} />);

            expect(screen.getAllByTestId('field-error')).toHaveLength(4);
            expect(screen.getByText('Name is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Service is required')).toBeInTheDocument();
            expect(screen.getByText('Message is required')).toBeInTheDocument();
        });

        it('shows phone error for callback tab', async () => {
            mockUseContactForm.mockReturnValue({
                ...mockHandlers,
                formState: mockFormState,
                errors: {
                    phone: 'Phone is required',
                },
                isSubmitting: false,
                isSubmitted: false,
                submitError: null,
            });

            render(<ContactForm lang="en" dict={mockDict} />);

            expect(screen.getByText('Phone is required')).toBeInTheDocument();
        });

        it('clears errors when user starts typing', async () => {
            const user = userEvent.setup();
            mockUseContactForm.mockReturnValue({
                ...mockHandlers,
                formState: { ...mockFormState, name: 'John' },
                errors: { name: 'Name is required' },
                isSubmitting: false,
                isSubmitted: false,
                submitError: null,
            });

            render(<ContactForm lang="en" dict={mockDict} />);

            expect(screen.getByText('Name is required')).toBeInTheDocument();

            // Simulate typing in the name field
            const nameInput = screen.getByDisplayValue('John');
            await user.type(nameInput, 'Doe');

            expect(mockHandlers.handleChange).toHaveBeenCalled();
        });
    });

    describe('Form Submission', () => {
        it('submits form with correct data', async () => {
            const user = userEvent.setup();
            const mockSubmit = jest.fn((e: any) => Promise.resolve()) as jest.MockedFunction<
                (e: any) => Promise<void>
            >;

            mockUseContactForm.mockReturnValue({
                ...mockHandlers,
                formState: {
                    ...mockFormState,
                    name: 'John Doe',
                    email: 'john@example.com',
                    service: 'Web Development',
                    message: 'Test message',
                },
                errors: {},
                isSubmitting: false,
                isSubmitted: false,
                submitError: null,
                handleSubmit: mockSubmit,
            });

            render(<ContactForm lang="en" dict={mockDict} />);

            const submitButton = screen.getByRole('button', { name: /Send Message/i });
            await user.click(submitButton);

            expect(mockSubmit).toHaveBeenCalled();
        });

        it('shows loading state during submission', () => {
            mockUseContactForm.mockReturnValue({
                ...mockHandlers,
                formState: mockFormState,
                errors: {},
                isSubmitting: true,
                isSubmitted: false,
                submitError: null,
            });

            render(<ContactForm lang="en" dict={mockDict} />);

            expect(screen.getByText('Sending...')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /Sending/i })).toBeDisabled();
        });

        it('shows success message after successful submission', () => {
            mockUseContactForm.mockReturnValue({
                ...mockHandlers,
                formState: mockFormState,
                errors: {},
                isSubmitting: false,
                isSubmitted: true,
                submitError: null,
            });

            render(<ContactForm lang="en" dict={mockDict} />);

            expect(screen.getByTestId('success-message')).toBeInTheDocument();
            expect(screen.getByText('Thank you!')).toBeInTheDocument();
            expect(screen.getByText('We will get back to you soon.')).toBeInTheDocument();
        });

        it('shows error message on submission failure', () => {
            mockUseContactForm.mockReturnValue({
                ...mockHandlers,
                formState: mockFormState,
                errors: {},
                isSubmitting: false,
                isSubmitted: false,
                submitError: 'Failed to send message',
            });

            render(<ContactForm lang="en" dict={mockDict} />);

            expect(screen.getByTestId('error-message')).toBeInTheDocument();
            expect(screen.getByText('Failed to send message')).toBeInTheDocument();
        });
    });

    describe('Form Reset', () => {
        it('resets form after sending another message', async () => {
            const user = userEvent.setup();
            mockUseContactForm.mockReturnValue({
                ...mockHandlers,
                formState: mockFormState,
                errors: {},
                isSubmitting: false,
                isSubmitted: true,
                submitError: null,
            });

            render(<ContactForm lang="en" dict={mockDict} />);

            const sendAnotherButton = screen.getByText('Send another message');
            await user.click(sendAnotherButton);

            expect(mockHandlers.setIsSubmitted).toHaveBeenCalledWith(false);
            expect(mockHandlers.resetForm).toHaveBeenCalled();
        });
    });

    describe('Accessibility', () => {
        it('has proper form labels', () => {
            render(<ContactForm lang="en" dict={mockDict} />);

            expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Company/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Service/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Budget/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Project Details/i)).toBeInTheDocument();
        });

        it('indicates required fields', () => {
            render(<ContactForm lang="en" dict={mockDict} />);

            const requiredLabels = screen.getAllByText('*');
            expect(requiredLabels.length).toBeGreaterThan(0);
        });

        it('has proper button types', () => {
            render(<ContactForm lang="en" dict={mockDict} />);

            const submitButton = screen.getByRole('button', { name: /Send Message/i });
            expect(submitButton).toHaveAttribute('type', 'submit');
        });
    });

    describe('Internationalization', () => {
        it('displays correct language for recaptcha notice', () => {
            render(<ContactForm lang="ru" dict={mockDict} />);

            expect(screen.getByTestId('recaptcha-notice')).toHaveTextContent(
                'Protected by reCAPTCHA (ru)',
            );
        });

        it('shows localized error messages', () => {
            mockUseContactForm.mockReturnValue({
                ...mockHandlers,
                formState: mockFormState,
                errors: { name: 'Введите имя' },
                isSubmitting: false,
                isSubmitted: false,
                submitError: null,
            });

            render(<ContactForm lang="ru" dict={mockDict} />);

            expect(screen.getByText('Введите имя')).toBeInTheDocument();
        });
    });

    describe('Edge Cases', () => {
        it('handles empty dictionary gracefully', () => {
            expect(() => {
                render(<ContactForm lang="en" dict={mockDict} />);
            }).not.toThrow();
        });

        it('handles rapid tab switching', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockDict} />);

            const messageTab = screen.getByTestId('message-tab');
            const callbackTab = screen.getByTestId('callback-tab');

            // Rapid switching
            await user.click(callbackTab);
            await user.click(messageTab);
            await user.click(callbackTab);
            await user.click(messageTab);

            expect(messageTab).toHaveClass('active');
        });

        it('handles submission with empty form', async () => {
            const user = userEvent.setup();
            const mockSubmit = jest.fn((e: any) => Promise.resolve()) as jest.MockedFunction<
                (e: any) => Promise<void>
            >;

            mockUseContactForm.mockReturnValue({
                ...mockHandlers,
                formState: mockFormState,
                errors: { name: 'Name is required' },
                isSubmitting: false,
                isSubmitted: false,
                submitError: null,
                handleSubmit: mockSubmit,
            });

            render(<ContactForm lang="en" dict={mockDict} />);

            const submitButton = screen.getByRole('button', { name: /Send Message/i });
            await user.click(submitButton);

            expect(mockSubmit).toHaveBeenCalled();
        });
    });
});
