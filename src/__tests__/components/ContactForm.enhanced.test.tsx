import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import ContactForm from '@/components/ContactForm';
import { mockContactFormDict } from '../utils/test-utils';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('ContactForm - Enhanced Testing', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockFetch.mockReset();
    });

    describe('Form Functionality', () => {
        it('renders form with all required fields', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Service/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Project Details/i)).toBeInTheDocument();
        });

        it('switches between message and callback tabs', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Initially on message tab
            expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
            expect(screen.queryByLabelText(/Phone/i)).not.toBeInTheDocument();

            // Switch to callback tab
            await user.click(screen.getByText('Request Callback'));

            expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
            expect(screen.queryByLabelText(/Email/i)).not.toBeInTheDocument();
        });

        it('shows validation errors for required fields', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Try to submit empty form
            // Submit form
            const form = screen.getByRole('form');
            const submitButton = form.querySelector('button[type="submit"]');
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
            await user.type(screen.getByLabelText(/Email/i), 'invalid-email');
            // Submit form
            const form = screen.getByRole('form');
            const submitButton = form.querySelector('button[type="submit"]');
            await user.click(submitButton);

            await waitFor(() => {
                expect(screen.getByText(/Invalid email format/)).toBeInTheDocument();
            });
        });

        it('allows sending another message after success', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Fill form with valid data
            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
            await user.selectOptions(screen.getByLabelText(/Service/i), 'Web Development');
            await user.type(screen.getByLabelText(/Project Details/i), 'Test message');

            // Submit form
            // Submit form
            const form = screen.getByRole('form');
            const submitButton = form.querySelector('button[type="submit"]');
            await user.click(submitButton);

            // Wait for success message
            await waitFor(() => {
                expect(screen.getByText('Thank you!')).toBeInTheDocument();
            });

            // Click send another
            await user.click(screen.getByText('Send another message'));

            // Form should be visible again
            await waitFor(() => {
                expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
            });
        });
    });

    describe('Form Fields Behavior', () => {
        it('clears errors when user starts typing', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Trigger validation error
            // Submit form
            const form = screen.getByRole('form');
            const submitButton = form.querySelector('button[type="submit"]');
            await user.click(submitButton);

            await waitFor(() => {
                expect(screen.getByText(/Name is required/)).toBeInTheDocument();
            });

            // Start typing in name field
            await user.type(screen.getByLabelText(/Full Name/i), 'John');

            // Error should be cleared
            expect(screen.queryByText(/Name is required/)).not.toBeInTheDocument();
        });

        it('handles company field (optional)', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Company field should be present but not required
            expect(screen.getByLabelText(/Company/i)).toBeInTheDocument();

            // Form should submit without company
            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
            await user.selectOptions(screen.getByLabelText(/Service/i), 'Web Development');
            await user.type(screen.getByLabelText(/Project Details/i), 'Test message');

            // Submit form
            const form = screen.getByRole('form');
            const submitButton = form.querySelector('button[type="submit"]');
            await user.click(submitButton);

            // Should not show company validation error
            expect(screen.queryByText(/Company is required/)).not.toBeInTheDocument();
        });

        it('shows budget field only for message tab', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Budget field should be visible on message tab
            expect(screen.getByLabelText(/Budget/i)).toBeInTheDocument();

            // Switch to callback tab
            await user.click(screen.getByText('Request Callback'));

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
            fireEvent.click(screen.getByText('Request Callback'));

            // Callback tab
            expect(screen.getByRole('button', { name: /Request Callback/i })).toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        it('has proper form structure', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            const form = screen.getByRole('form');
            expect(form).toBeInTheDocument();

            // Check for proper form controls
            expect(screen.getByLabelText(/Full Name/i)).toHaveAttribute('type', 'text');
            expect(screen.getByLabelText(/Email/i)).toHaveAttribute('type', 'email');
            expect(screen.getByLabelText(/Project Details/i)).toHaveAttribute('rows', '5');
        });

        it('indicates required fields', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Required fields should have asterisks
            expect(screen.getByText(/Full Name \*/)).toBeInTheDocument();
            expect(screen.getByText(/Email \*/)).toBeInTheDocument();
            expect(screen.getByText(/Service \*/)).toBeInTheDocument();
            expect(screen.getByText(/Project Details \*/)).toBeInTheDocument();

            // Optional fields should not have asterisks
            expect(screen.queryByText(/Company \*/)).not.toBeInTheDocument();
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
            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
            await user.selectOptions(screen.getByLabelText(/Service/i), 'Web Development');
            await user.type(screen.getByLabelText(/Project Details/i), 'Test message');

            // Submit form
            // Submit form
            const form = screen.getByRole('form');
            const submitButton = form.querySelector('button[type="submit"]');
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
                await user.click(screen.getByText('Request Callback'));
                await user.click(screen.getByText('Send Message'));
            }

            // Form should still be functional
            expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
        });
    });

    describe('Edge Cases', () => {
        it('handles empty dictionary gracefully', () => {
            expect(() => {
                render(<ContactForm lang="en" dict={{}} as any />);
            }).not.toThrow();
        });

        it('handles very long text input', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            const longText = 'A'.repeat(1000);
            await user.type(screen.getByLabelText(/Project Details/i), longText);

            expect(screen.getByDisplayValue(longText)).toBeInTheDocument();
        });

        it('handles special characters in input', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe Ñéßø');
            await user.type(screen.getByLabelText(/Email/i), 'john.doe@company.com');

            expect(screen.getByDisplayValue(/John Doe Ñéßø/)).toBeInTheDocument();
            expect(screen.getByDisplayValue(/john.doe@company.com/)).toBeInTheDocument();
        });
    });
});
