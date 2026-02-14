import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import ContactForm from '@/components/ContactForm';
import '@/__tests__/types';

describe('ContactForm - Working Tests', () => {
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

    it('renders without crashing', () => {
        expect(() => {
            render(<ContactForm lang="en" dict={mockDict} />);
        }).not.toThrow();
    });

    it('displays form elements', () => {
        render(<ContactForm lang="en" dict={mockDict} />);

        // Проверяем основные поля формы
        expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Company/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Service/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Budget/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Details/i)).toBeInTheDocument();
    });
});
