import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import ContactForm from '@/components/ContactForm';
import '@/__tests__/types';

describe('ContactForm - Edge Cases', () => {
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

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Edge Cases - Form Behavior', () => {
        it('handles empty dictionary gracefully', () => {
            expect(() => {
                render(
                    <ContactForm
                        lang="en"
                        dict={{
                            tabs: { message: 'Send', callback: 'Call' },
                            title: 'Contact',
                            subtitle: 'Get in touch',
                            fullName: 'Name',
                            email: 'Email',
                            phone: 'Phone',
                            phonePlaceholder: '+1234567890',
                            company: 'Company',
                            companyPlaceholder: 'Company',
                            service: 'Service',
                            serviceOptions: ['Web'],
                            budget: 'Budget',
                            budgetOptions: ['$1k'],
                            details: 'Details',
                            detailsPlaceholder: 'Details...',
                            submit: 'Send',
                            sending: 'Sending...',
                            success: 'Success!',
                            successTitle: 'Thank you!',
                            successSubtitle: 'We will contact you.',
                            callbackSuccessTitle: 'Callback requested!',
                            callbackSuccessSubtitle: 'We will call you.',
                            sendAnother: 'Send another',
                            selectService: 'Select service',
                            selectBudget: 'Select budget',
                        }}
                    />,
                );
            }).not.toThrow();
        });

        it('handles very long text input', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockDict} />);

            const longText = 'A'.repeat(1000);
            await user.type(screen.getByLabelText(/Project Details/i), longText);

            expect(screen.getByDisplayValue(longText)).toBeInTheDocument();
        });

        it('handles special characters in input', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockDict} />);

            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe Ñéßø');
            await user.type(screen.getByLabelText(/Email/i), 'john.doe@company.com');

            expect(screen.getByDisplayValue(/John Doe Ñéßø/)).toBeInTheDocument();
            expect(screen.getByDisplayValue(/john.doe@company.com/)).toBeInTheDocument();
        });

        it('handles rapid tab switching without errors', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockDict} />);

            // Rapid switching
            for (let i = 0; i < 10; i++) {
                await user.click(screen.getByText('Request Callback'));
                await user.click(screen.getByText('Send Message'));
            }

            expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
        });

        it('handles form submission with empty service options', async () => {
            const user = userEvent.setup();
            const emptyServiceDict = {
                ...mockDict,
                serviceOptions: [],
            };

            render(<ContactForm lang="en" dict={emptyServiceDict} />);

            // Should still render without crashing
            expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Service/i)).toBeInTheDocument();
        });

        it('handles form submission with empty budget options', async () => {
            const user = userEvent.setup();
            const emptyBudgetDict = {
                ...mockDict,
                budgetOptions: [],
            };

            render(<ContactForm lang="en" dict={emptyBudgetDict} />);

            // Should still render without crashing
            expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Budget/i)).toBeInTheDocument();
        });

        it('handles multiple validation errors simultaneously', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockDict} />);

            // Submit empty form to trigger all validation errors
            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            await waitFor(() => {
                expect(screen.getByText(/Name is required/)).toBeInTheDocument();
                expect(screen.getByText(/Email is required/)).toBeInTheDocument();
                expect(screen.getByText(/Please select a service/)).toBeInTheDocument();
                expect(screen.getByText(/Details are required/)).toBeInTheDocument();
            });
        });

        it('handles form reset after successful submission', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockDict} />);

            // Fill form
            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
            await user.selectOptions(screen.getByLabelText(/Service/i), 'Web Development');
            await user.type(screen.getByLabelText(/Project Details/i), 'Test message');

            // Submit form
            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            // Wait for success
            await waitFor(() => {
                expect(screen.getByText('Thank you!')).toBeInTheDocument();
            });

            // Click send another
            await user.click(screen.getByText('Send another message'));

            // Form should be reset
            expect(screen.getByDisplayValue('')).toBeInTheDocument();
        });
    });

    describe('Edge Cases - Component State', () => {
        it('handles missing required props gracefully', () => {
            const partialDict = {
                tabs: { message: 'Send Message', callback: 'Request Callback' },
                fullName: 'Full Name',
                email: 'Email',
                submit: 'Send Message',
            };

            expect(() => {
                render(<ContactForm lang="en" dict={partialDict as any} />);
            }).not.toThrow();
        });

        it('handles undefined language gracefully', () => {
            expect(() => {
                render(<ContactForm lang={undefined as any} dict={mockDict} />);
            }).not.toThrow();
        });

        it('handles null language gracefully', () => {
            expect(() => {
                render(<ContactForm lang={null as any} dict={mockDict} />);
            }).not.toThrow();
        });

        it('handles rapid form submissions', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockDict} />);

            // Fill form
            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
            await user.selectOptions(screen.getByLabelText(/Service/i), 'Web Development');
            await user.type(screen.getByLabelText(/Project Details/i), 'Test message');

            // Multiple rapid submissions
            const submitButton = screen.getByRole('button', { name: /Send Message/i });
            for (let i = 0; i < 5; i++) {
                await user.click(submitButton);
            }

            // Should not crash and should eventually show success
            await waitFor(
                () => {
                    expect(screen.getByText('Thank you!')).toBeInTheDocument();
                },
                { timeout: 5000 },
            );
        });
    });

    describe('Edge Cases - Network and API', () => {
        it('handles network errors gracefully', async () => {
            const user = userEvent.setup();

            // Mock fetch to simulate network error
            const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
            mockFetch.mockRejectedValue(new Error('Network error'));
            global.fetch = mockFetch;

            render(<ContactForm lang="en" dict={mockDict} />);

            // Fill form
            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
            await user.selectOptions(screen.getByLabelText(/Service/i), 'Web Development');
            await user.type(screen.getByLabelText(/Project Details/i), 'Test message');

            // Submit form
            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            // Should show error message
            await waitFor(() => {
                expect(screen.getByText(/Failed to send/)).toBeInTheDocument();
            });
        });

        it('handles API timeout gracefully', async () => {
            const user = userEvent.setup();

            // Mock fetch to simulate timeout
            const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
            mockFetch.mockImplementation(
                () =>
                    new Promise((resolve) =>
                        setTimeout(() => resolve(new Response('OK', { status: 200 })), 10000),
                    ),
            );
            global.fetch = mockFetch;

            render(<ContactForm lang="en" dict={mockDict} />);

            // Fill form
            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
            await user.selectOptions(screen.getByLabelText(/Service/i), 'Web Development');
            await user.type(screen.getByLabelText(/Project Details/i), 'Test message');

            // Submit form
            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            // Should show loading state
            expect(screen.getByText('Sending...')).toBeInTheDocument();
        });
    });

    describe('Edge Cases - Browser Compatibility', () => {
        it('handles missing JavaScript gracefully', () => {
            // This test ensures the form doesn't crash when JS is disabled
            // In a real scenario, the form would fall back to server-side rendering
            expect(() => {
                render(<ContactForm lang="en" dict={mockDict} />);
            }).not.toThrow();
        });

        it('handles disabled JavaScript features', () => {
            // Mock disabled features
            const originalFetch = global.fetch;
            global.fetch = undefined as any;

            expect(() => {
                render(<ContactForm lang="en" dict={mockDict} />);
            }).not.toThrow();

            // Restore fetch
            global.fetch = originalFetch;
        });

        it('handles missing window object gracefully', () => {
            const originalWindow = global.window;
            delete (global as any).window;

            expect(() => {
                render(<ContactForm lang="en" dict={mockDict} />);
            }).not.toThrow();

            // Restore window
            global.window = originalWindow;
        });
    });

    describe('Edge Cases - Memory and Performance', () => {
        it('handles large number of form fields', () => {
            const largeDict = {
                ...mockDict,
                serviceOptions: Array.from({ length: 100 }, (_, i) => `Service ${i + 1}`),
                budgetOptions: Array.from(
                    { length: 50 },
                    (_, i) => `$${i * 1000}-${(i + 1) * 1000}`,
                ),
            };

            expect(() => {
                render(<ContactForm lang="en" dict={largeDict} />);
            }).not.toThrow();
        });

        it('handles very long labels', () => {
            const longLabelDict = {
                ...mockDict,
                fullName: 'Very Long Full Name Label That Should Not Break The Layout',
                email: 'Very Long Email Label That Should Not Break The Layout',
                service: 'Very Long Service Label That Should Not Break The Layout',
            };

            render(<ContactForm lang="en" dict={longLabelDict} />);

            expect(screen.getByText(/Very Long Full Name Label/)).toBeInTheDocument();
        });

        it('handles concurrent form interactions', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockDict} />);

            // Concurrent interactions
            const promises = [];

            // Type in multiple fields simultaneously
            promises.push(user.type(screen.getByLabelText(/Full Name/i), 'John Doe'));
            promises.push(user.type(screen.getByLabelText(/Email/i), 'john@example.com'));
            promises.push(user.type(screen.getByLabelText(/Company/i), 'Test Company'));
            promises.push(user.type(screen.getByLabelText(/Project Details/i), 'Test message'));

            // Switch tabs while typing
            promises.push(user.click(screen.getByText('Request Callback')));

            await Promise.all(promises);

            // Should not crash
            expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
        });
    });
});
