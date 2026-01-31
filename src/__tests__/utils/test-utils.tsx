import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CookieConsentProvider } from '@/components/providers/CookieConsentProvider';

// Test wrapper with providers
function AllTheProviders({ children }: { children: React.ReactNode }) {
    return (
        <CookieConsentProvider>
            {children}
        </CookieConsentProvider>
    );
}

// Custom render function
function customRender(
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) {
    return render(ui, { wrapper: AllTheProviders, ...options });
}

// Setup user-event with custom render
function setup(jsx: ReactElement) {
    return {
        user: userEvent.setup(),
        ...customRender(jsx),
    };
}

// Mock dictionary for ContactForm
export const mockContactFormDict = {
    title: 'Contact Us',
    subtitle: 'Get in touch',
    fullName: 'Full Name',
    email: 'Email',
    company: 'Company',
    companyPlaceholder: 'Your company name',
    service: 'Service',
    serviceOptions: ['Web Development', 'Mobile App', 'SEO'],
    budget: 'Budget',
    budgetOptions: ['$1k-5k', '$5k-10k', '$10k+'],
    details: 'Details',
    detailsPlaceholder: 'Tell us about your project',
    submit: 'Send Message',
    sending: 'Sending...',
    success: 'Message sent!',
    successTitle: 'Thank you!',
    successSubtitle: 'We will get back to you soon.',
    sendAnother: 'Send another message',
    selectService: 'Select a service',
    selectBudget: 'Select a budget',
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render, setup };
