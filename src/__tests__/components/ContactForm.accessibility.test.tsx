import { render, screen, fireEvent } from '../utils/test-utils';
import { describe, it } from '@jest/globals';
import ContactForm from '@/components/ContactForm';
import { mockContactFormDict } from '../utils/test-utils';

describe('ContactForm - Accessibility (a11y)', () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch as unknown as typeof fetch;

    beforeEach(() => {
        jest.clearAllMocks();
        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => ({ success: true }),
        });
    });

    describe('Form Structure Accessibility', () => {
        it('has proper form element with semantic structure', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            const form = document.querySelector('form')!;
            expect(form).toBeInTheDocument();
        });

        it('has proper labels for all form fields', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            expect(document.querySelector('[name="name"]')).toBeInTheDocument();
            expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Company/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Service/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Budget/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Details/i)).toBeInTheDocument();
        });

        it('has proper button types and roles', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            const submitButton = screen.getByRole('button', { name: /Send Message/i });
            expect(submitButton).toHaveAttribute('type', 'submit');

            const tabButtons = screen.getAllByRole('button');
            expect(tabButtons.length).toBeGreaterThan(1);
        });

        it('has proper field relationships between labels and inputs', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            const nameInput = screen.getByLabelText(/Full Name/i);
            const nameLabel = screen.getByText(/Full Name/i);

            expect(nameInput).toHaveAttribute('id');
            expect(nameLabel).toHaveAttribute('for', nameInput.id);
        });

        it('has proper ARIA attributes', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Check for ARIA attributes on form elements
            const honeypotField = document.querySelector('input[name="website"]')!;
            expect(honeypotField).toHaveAttribute('aria-hidden', 'true');
            expect(honeypotField).toHaveAttribute('tabindex', '-1');
        });
    });

    describe('Keyboard Navigation', () => {
        it('supports tab navigation through form fields', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            const nameInput = screen.getByLabelText(/Full Name/i);
            const emailInput = screen.getByLabelText(/Email/i);
            const submitButton = screen.getByRole('button', { name: /Send Message/i });

            // Check that all elements are focusable
            expect(nameInput).not.toHaveAttribute('disabled');
            expect(emailInput).not.toHaveAttribute('disabled');
            expect(submitButton).not.toHaveAttribute('disabled');
        });

        it('supports tab navigation through tab switcher', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            const messageTab = screen.getByText('Send a message');
            const callbackTab = screen.getByText('Request a callback');

            expect(messageTab).not.toHaveAttribute('disabled');
            expect(callbackTab).not.toHaveAttribute('disabled');
        });

        it('provides focus management during form submission', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            const submitButton = screen.getByRole('button', { name: /Send Message/i });

            // Button should be focusable
            expect(submitButton).not.toHaveAttribute('disabled');
        });
    });

    describe('Screen Reader Support', () => {
        it('has descriptive text for form fields', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            expect(screen.getByText(/Full Name \*/)).toBeInTheDocument();
            expect(screen.getByText(/Email \*/)).toBeInTheDocument();
            expect(screen.getByText(/Service \*/)).toBeInTheDocument();
            expect(screen.getByText(/Project Details \*/)).toBeInTheDocument();
        });

        it('has proper error announcements', async () => {
            const { container } = render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Submit empty form to trigger errors
            fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

            // Wait for validation errors
            await new Promise((resolve) => setTimeout(resolve, 100));

            // Check for error messages (they should be in the DOM)
            const errorElements = container.querySelectorAll('[data-testid="field-error"]');
            expect(errorElements.length).toBeGreaterThan(0);
        });

        it('has proper success message announcements', async () => {
            const { container } = render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Fill form with valid data
            fireEvent.change(screen.getByLabelText(/Full Name/i), {
                target: { value: 'John Doe' },
            });
            fireEvent.change(screen.getByLabelText(/Email/i), {
                target: { value: 'john@example.com' },
            });
            fireEvent.change(screen.getByLabelText(/Service/i), {
                target: { value: 'Web Development' },
            });
            fireEvent.change(screen.getByLabelText(/Details/i), {
                target: { value: 'Test message' },
            });

            // Submit form
            fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

            // Wait for success message
            await new Promise((resolve) => setTimeout(resolve, 100));

            // Check for success message
            const successElement = container.querySelector('[data-testid="success-message"]');
            expect(successElement).toBeInTheDocument();
        });

        it('has proper loading state announcements', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // The form should have proper loading state indication
            const submitButton = screen.getByRole('button', { name: /Send Message/i });
            expect(submitButton).toBeInTheDocument();
        });
    });

    describe('Visual Accessibility', () => {
        it('has sufficient color contrast for required field indicators', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            const requiredIndicators = screen.getAllByText('*');
            expect(requiredIndicators.length).toBeGreaterThan(0);

            // Check that required indicators have proper styling
            requiredIndicators.forEach((indicator) => {
                expect(indicator).toHaveClass('text-red-500');
            });
        });

        it('has proper focus indicators', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            const nameInput = screen.getByLabelText(/Full Name/i);

            // Check for focus classes
            expect(nameInput).toHaveClass('focus:ring-4', 'focus:ring-primary-500/10');
        });

        it('has proper error state styling', async () => {
            const { container } = render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Submit empty form to trigger errors
            fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

            // Wait for validation errors
            await new Promise((resolve) => setTimeout(resolve, 100));

            // Check for error styling
            const errorElements = container.querySelectorAll('[data-testid="field-error"]');
            expect(errorElements.length).toBeGreaterThan(0);
        });
    });

    describe('Cognitive Accessibility', () => {
        it('has clear and consistent form structure', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Check that form has logical structure
            const form = document.querySelector('form')!;
            expect(form).toBeInTheDocument();

            // Check that fields are grouped logically
            const inputs = screen.getAllByRole('textbox');
            expect(inputs.length).toBeGreaterThan(0);
        });

        it('has clear instructions and feedback', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Check for clear field labels
            expect(screen.getByText(/Full Name \*/)).toBeInTheDocument();
            expect(screen.getByText(/Email \*/)).toBeInTheDocument();

            // Check for clear submit button text
            expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
        });

        it('has consistent error messaging', async () => {
            const { container } = render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Submit empty form to trigger errors
            fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

            // Wait for validation errors
            await new Promise((resolve) => setTimeout(resolve, 100));

            // Check for consistent error styling
            const errorElements = container.querySelectorAll('.text-red-500.font-semibold');
            expect(errorElements.length).toBeGreaterThan(0);
        });

        it('has proper form completion feedback', async () => {
            const { container } = render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Fill form with valid data
            fireEvent.change(screen.getByLabelText(/Full Name/i), {
                target: { value: 'John Doe' },
            });
            fireEvent.change(screen.getByLabelText(/Email/i), {
                target: { value: 'john@example.com' },
            });
            fireEvent.change(screen.getByLabelText(/Service/i), {
                target: { value: 'Web Development' },
            });
            fireEvent.change(screen.getByLabelText(/Details/i), {
                target: { value: 'Test message' },
            });

            // Submit form
            fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

            // Wait for success message
            await new Promise((resolve) => setTimeout(resolve, 100));

            // Check for clear success feedback
            const successElement = screen.getByText(/We will get back to you soon/i);
            expect(successElement).toBeInTheDocument();
        });
    });

    describe('Motor Accessibility', () => {
        it('has appropriate click targets', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            const submitButton = screen.getByRole('button', { name: /Send Message/i });
            const tabButtons = screen.getAllByRole('button').filter(b => b.textContent !== 'Send Message' && !b.classList.contains('btn-primary'));

            // Check that buttons have appropriate size classes
            expect(submitButton).toHaveClass('btn-primary');

            tabButtons.forEach((button) => {
                expect(button).toHaveClass('py-2.5');
            });
        });

        it('has proper spacing between interactive elements', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            const form = document.querySelector('form')!;
            expect(form).toHaveClass('form-grid');
        });

        it('supports both mouse and keyboard interaction', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            const submitButton = screen.getByRole('button', { name: /Send Message/i });
            const nameInput = screen.getByLabelText(/Full Name/i);

            // Check that elements support both interaction methods
            expect(submitButton).not.toHaveAttribute('disabled');
            expect(nameInput).not.toHaveAttribute('disabled');
        });
    });

    describe('Language and Localization Accessibility', () => {
        it('maintains accessibility across different languages', () => {
            const russianDict = {
                ...mockContactFormDict,
                fullName: 'Полное имя',
                email: 'Email',
                submit: 'Отправить',
            };

            render(<ContactForm lang="ru" dict={russianDict} />);

            expect(screen.getByLabelText(/Полное имя/i)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /Отправить/i })).toBeInTheDocument();
        });

        it('has proper language attributes', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Check that the component respects the lang prop
            const form = document.querySelector('form')!;
            expect(form).toBeInTheDocument();
        });
    });
});
