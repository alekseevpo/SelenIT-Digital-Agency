import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, it, beforeEach, jest } from '@jest/globals';
import ContactForm from '@/components/ContactForm';
import { mockContactFormDict } from '../utils/test-utils';

// Mock fetch globally
const mockFetch = jest.fn() as any;
global.fetch = mockFetch;

describe('ContactForm - Enhanced Testing', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockFetch.mockReset();
    });

    describe('Form Functionality', () => {
        it('renders form with all required fields', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            expect(document.querySelector('[name="name"]')!).toBeInTheDocument();
            expect(document.querySelector('[name="email"]')!).toBeInTheDocument();
            expect(document.querySelector('select[name="service"]')!).toBeInTheDocument();
            expect(document.querySelector('[name="message"]')!).toBeInTheDocument();
        });

        it('switches between message and callback tabs', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Initially on message tab
            expect(document.querySelector('[name="email"]')!).toBeInTheDocument();
            expect(screen.queryByLabelText(/Phone/i)).not.toBeInTheDocument();

            // Switch to callback tab
            await user.click(screen.getByText('Request a callback'));

            expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
            expect(screen.queryByLabelText(/Email/i)).not.toBeInTheDocument();
        });

        it('shows validation errors for required fields', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Try to submit empty form
            // Submit form
            const form = document.querySelector('form')!;
            const submitButton = form.querySelector('button[type="submit"]')!;
            if (!submitButton) throw new Error('Submit button not found');
            await user.click(submitButton);

            // Should show validation errors
            await waitFor(() => {
                expect(screen.getByText(/Name is required/)).toBeInTheDocument();
                expect(screen.getByText(/Email is required/)).toBeInTheDocument();
            });
        });

        it('validates email format', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Enter invalid email
            await user.type(document.querySelector('[name="email"]')!, 'invalid-email');
            // Submit form
            const form = document.querySelector('form')!;
            const submitButton = form.querySelector('button[type="submit"]')!;
            if (!submitButton) throw new Error('Submit button not found');
            await user.click(submitButton);

            await waitFor(() => {
                expect(screen.getByText(/Invalid email format/)).toBeInTheDocument();
            });
        });

        it('allows sending another message after success', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Fill form with valid data
            await user.type(document.querySelector('[name="name"]')!, 'John Doe');
            await user.type(document.querySelector('[name="email"]')!, 'john@example.com');
            await user.selectOptions(
                document.querySelector('select[name="service"]')!,
                'Web Development',
            );
            await user.type(document.querySelector('[name="message"]')!, 'Test message');

            // Submit form
            // Submit form
            const form = document.querySelector('form')!;
            const submitButton = form.querySelector('button[type="submit"]')!;
            if (!submitButton) throw new Error('Submit button not found');
            await user.click(submitButton);

            // Wait for success message
            await waitFor(() => {
                expect(screen.getByText('Thank you!')).toBeInTheDocument();
            });

            // Click send another
            await user.click(screen.getByText('Send another message'));

            // Form should be visible again
            await waitFor(() => {
                expect(document.querySelector('[name="name"]')!).toBeInTheDocument();
            });
        });
    });

    describe('Form Fields Behavior', () => {
        it('clears errors when user starts typing', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Trigger validation error
            // Submit form
            const form = document.querySelector('form')!;
            const submitButton = form.querySelector('button[type="submit"]')!;
            if (!submitButton) throw new Error('Submit button not found');
            await user.click(submitButton);

            await waitFor(() => {
                expect(screen.getByText(/Name is required/)).toBeInTheDocument();
            });

            // Start typing in name field
            await user.type(document.querySelector('[name="name"]')!, 'John');

            // Error should be cleared
            expect(screen.queryByText(/Name is required/)).not.toBeInTheDocument();
        });

        it('handles company field (optional)', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Company field should be present but not required
            expect(document.querySelector('[name="company"]')!).toBeInTheDocument();

            // Form should submit without company
            await user.type(document.querySelector('[name="name"]')!, 'John Doe');
            await user.type(document.querySelector('[name="email"]')!, 'john@example.com');
            await user.selectOptions(
                document.querySelector('select[name="service"]')!,
                'Web Development',
            );
            await user.type(document.querySelector('[name="message"]')!, 'Test message');

            // Submit form
            const form = document.querySelector('form')!;
            const submitButton = form.querySelector('button[type="submit"]')!;
            if (!submitButton) throw new Error('Submit button not found');
            await user.click(submitButton);

            // Should not show company validation error
            expect(screen.queryByText(/Company is required/)).not.toBeInTheDocument();
        });

        it('shows budget field only for message tab', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Budget field should be visible on message tab
            expect(document.querySelector('select[name="budget"]')!).toBeInTheDocument();

            // Switch to callback tab
            await user.click(screen.getByText('Request a callback'));

            // Budget field should not be visible on callback tab
            expect(screen.queryByLabelText(/Budget/i)).not.toBeInTheDocument();
        });
    });

    describe('Internationalization', () => {
        it('shows localized validation messages', async () => {
            const user = userEvent.setup();
            const russianDict = {
                ...mockContactFormDict,
                fullName: 'Полное имя',
                email: 'Email',
                service: 'Услуга',
                details: 'Детали',
                submit: 'Отправить',
            };

            render(<ContactForm lang="ru" dict={russianDict} />);

            await user.click(screen.getByRole('button', { name: /Отправить/i }));

            await waitFor(() => {
                expect(screen.getByText(/Введите имя/)).toBeInTheDocument();
            });
        });

        it('changes submit button text based on tab', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Message tab
            expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();

            // Switch to callback tab
            fireEvent.click(screen.getByText('Request a callback'));

            // Callback tab
            expect(screen.getByRole('button', { name: /Request a callback/i })).toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        it('has proper form structure', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            const form = document.querySelector('form')!;
            expect(form).toBeInTheDocument();

            // Check for proper form controls
            expect(document.querySelector('[name="name"]')!.getAttribute('type') || 'text').toBe(
                'text',
            );
            expect(document.querySelector('[name="email"]')!).toHaveAttribute('type', 'email');
            expect(document.querySelector('[name="message"]')!).toHaveAttribute('rows', '5');
        });

        it('indicates required fields', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Required fields should have asterisks
            expect(screen.getByText('Full Name')).toBeInTheDocument();
            expect(screen.getAllByText('*').length).toBeGreaterThan(0);
            expect(screen.getByText('Email')).toBeInTheDocument();
            expect(screen.getByText('Service')).toBeInTheDocument();
            expect(screen.getByText('Details')).toBeInTheDocument();

            // Optional fields should not have asterisks
            // Company is optional
        });

        it('has proper button types', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            expect(screen.getByRole('button', { name: /Send Message/i })).toHaveAttribute(
                'type',
                'submit',
            );
        });
    });

    describe('Error Handling', () => {
        it('handles form submission errors gracefully', async () => {
            const user = userEvent.setup();

            // Mock fetch to simulate server error
            const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
            mockFetch.mockRejectedValue(new Error('Network error'));
            global.fetch = mockFetch;

            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Fill form with valid data
            await user.type(document.querySelector('[name="name"]')!, 'John Doe');
            await user.type(document.querySelector('[name="email"]')!, 'john@example.com');
            await user.selectOptions(
                document.querySelector('select[name="service"]')!,
                'Web Development',
            );
            await user.type(document.querySelector('[name="message"]')!, 'Test message');

            // Submit form
            // Submit form
            const form = document.querySelector('form')!;
            const submitButton = form.querySelector('button[type="submit"]')!;
            if (!submitButton) throw new Error('Submit button not found');
            await user.click(submitButton);

            // Should show error message
            await waitFor(() => {
                expect(screen.getByText(/Failed to send/)).toBeInTheDocument();
            });
        });
    });

    describe('Performance', () => {
        it('renders quickly with large dictionaries', () => {
            const largeDict = {
                ...mockContactFormDict,
                serviceOptions: Array.from({ length: 100 }, (_, i) => `Service ${i + 1}`),
                budgetOptions: Array.from(
                    { length: 50 },
                    (_, i) => `$${i * 1000}-${(i + 1) * 1000}`,
                ),
            };

            const startTime = performance.now();
            render(<ContactForm lang="en" dict={largeDict} />);
            const endTime = performance.now();

            // Should render within reasonable time
            expect(endTime - startTime).toBeLessThan(1000);
        });

        it('handles rapid tab switching without errors', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Rapid tab switching
            for (let i = 0; i < 10; i++) {
                await user.click(screen.getByText('Request a callback'));
                await user.click(screen.getByText('Send a message'));
            }

            // Form should still be functional
            expect(document.querySelector('[name="name"]')!).toBeInTheDocument();
        });
    });

    describe('Edge Cases', () => {
        it('handles empty dictionary gracefully', () => {
            expect(() => {
                render(<ContactForm lang="en" dict={{} as any} />);
            }).not.toThrow();
        });

        it('handles very long text input', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            const longText = 'A'.repeat(1000);
            await user.type(document.querySelector('[name="message"]')!, longText);

            expect(screen.getByDisplayValue(longText)).toBeInTheDocument();
        });

        it('handles special characters in input', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            await user.type(document.querySelector('[name="name"]')!, 'John Doe Ñéßø');
            await user.type(document.querySelector('[name="email"]')!, 'john.doe@company.com');

            expect(screen.getByDisplayValue(/John Doe Ñéßø/)).toBeInTheDocument();
            expect(screen.getByDisplayValue(/john.doe@company.com/)).toBeInTheDocument();
        });
    });
});
