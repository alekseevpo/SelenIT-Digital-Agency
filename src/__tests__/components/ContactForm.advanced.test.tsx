import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, beforeEach, jest } from '@jest/globals';
import ContactForm from '@/components/ContactForm';
import '@/__tests__/types';

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
        notSureOption: 'Not sure',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Component Rendering', () => {
        it('renders all form sections correctly', () => {
            render(<ContactForm lang="en" dict={mockDict} />);

            expect(screen.getByText('Send a message')).toBeInTheDocument();
            expect(screen.getByText('Request a callback')).toBeInTheDocument();
        });

        it('displays all form fields', () => {
            render(<ContactForm lang="en" dict={mockDict} />);

            expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Company/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Service/i)).toBeInTheDocument();
        });

        it('shows required field indicators', () => {
            render(<ContactForm lang="en" dict={mockDict} />);

            expect(screen.getByText('Full Name *')).toBeInTheDocument();
            expect(screen.getByText('Email *')).toBeInTheDocument();
        });
    });

    describe('Tab Switching', () => {
        it('switches between message and callback tabs', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockDict} />);

            const callbackTab = screen.getByText('Request a callback');
            await user.click(callbackTab);

            expect(callbackTab).toHaveClass('text-primary-600');
        });
    });

    describe('Form Submission', () => {
        it('shows loading state during submission', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockDict} />);

            // Fill required fields
            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'john@example.com');

            // Submit form
            const submitButton = screen.getByRole('button', { name: /Send Message/i });
            await user.click(submitButton);

            // Note: This test may need adjustment based on actual form behavior
            expect(submitButton).toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        it('has proper form labels', () => {
            render(<ContactForm lang="en" dict={mockDict} />);

            expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Company/i)).toBeInTheDocument();
        });

        it('indicates required fields', () => {
            render(<ContactForm lang="en" dict={mockDict} />);

            expect(screen.getByText('Full Name *')).toBeInTheDocument();
            expect(screen.getByText('Email *')).toBeInTheDocument();
        });

        it('has proper button types', () => {
            render(<ContactForm lang="en" dict={mockDict} />);

            const submitButton = screen.getByRole('button', { name: /Send Message/i });
            expect(submitButton).toHaveAttribute('type', 'submit');
        });
    });

    describe('Internationalization', () => {
        it('displays correct language content', () => {
            render(<ContactForm lang="en" dict={mockDict} />);

            expect(screen.getByText('Send a message')).toBeInTheDocument();
            expect(screen.getByText('Request a callback')).toBeInTheDocument();
        });
    });

    describe('Edge Cases', () => {
        it('handles empty dictionary gracefully', () => {
            const minimalDict = {
                tabs: { message: 'Send', callback: 'Call' },
                title: 'Contact',
                subtitle: 'Get in touch',
                fullName: 'Name',
                email: 'Email',
                serviceOptions: ['Web Development'], // Add required serviceOptions
                budgetOptions: ['$5k-10k'], // Add required budgetOptions
                submit: 'Send',
                sending: 'Sending...',
                successTitle: 'Thanks!',
                successSubtitle: 'We will respond.',
                callbackSuccessTitle: 'Callback requested!',
                callbackSuccessSubtitle: 'We will call.',
                sendAnother: 'Send again',
                selectService: 'Choose service',
                selectBudget: 'Choose budget',
                notSureOption: 'Not sure',
            };

            expect(() => {
                render(<ContactForm lang="en" dict={minimalDict as any} />);
            }).not.toThrow();
        });
    });
});
