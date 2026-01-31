import { render, screen, waitFor, fireEvent } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/ContactForm';
import { mockContactFormDict } from '../utils/test-utils';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('ContactForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockFetch.mockReset();
    });

    describe('Rendering', () => {
        it('renders all form fields', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Company/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Service/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Budget/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Details/i)).toBeInTheDocument();
        });

        it('renders submit button', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
        });

        it('renders service options from dictionary', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            const serviceSelect = screen.getByLabelText(/Service/i);
            expect(serviceSelect).toBeInTheDocument();

            mockContactFormDict.serviceOptions.forEach(option => {
                expect(screen.getByRole('option', { name: option })).toBeInTheDocument();
            });
        });

        it('renders budget options from dictionary', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            mockContactFormDict.budgetOptions.forEach(option => {
                expect(screen.getByRole('option', { name: option })).toBeInTheDocument();
            });
        });
    });

    describe('Honeypot field', () => {
        it('honeypot field is hidden from users', () => {
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            const honeypotContainer = document.querySelector('[aria-hidden="true"]');
            expect(honeypotContainer).toBeInTheDocument();
            expect(honeypotContainer).toHaveClass('hidden');
        });

        it('blocks submission when honeypot is filled', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Fill required fields
            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
            await user.selectOptions(screen.getByLabelText(/Service/i), 'Web Development');
            await user.type(screen.getByLabelText(/Details/i), 'Test message');

            // Fill honeypot field (simulating bot)
            const honeypotInput = document.querySelector('input[name="website"]') as HTMLInputElement;
            fireEvent.change(honeypotInput, { target: { value: 'spam-url.com' } });

            // Submit
            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            // Should not call API
            expect(mockFetch).not.toHaveBeenCalled();

            // Should show success (to trick bots)
            await waitFor(() => {
                expect(screen.getByText(mockContactFormDict.successTitle)).toBeInTheDocument();
            });
        });
    });

    describe('Validation', () => {
        it('shows error when name is empty', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            await waitFor(() => {
                expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
            });
        });

        it('shows error when email is empty', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            await waitFor(() => {
                expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
            });
        });

        it('shows error for invalid email format', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'invalid-email');
            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            await waitFor(() => {
                expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
            });
        });

        it('shows error when service is not selected', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            await waitFor(() => {
                expect(screen.getByText(/Please select a service/i)).toBeInTheDocument();
            });
        });

        it('shows error when details are empty', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
            await user.selectOptions(screen.getByLabelText(/Service/i), 'Web Development');
            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            await waitFor(() => {
                expect(screen.getByText(/Details are required/i)).toBeInTheDocument();
            });
        });

        it('clears error when user starts typing', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Submit to trigger error
            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            await waitFor(() => {
                expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
            });

            // Start typing to clear error
            await user.type(screen.getByLabelText(/Full Name/i), 'J');

            await waitFor(() => {
                expect(screen.queryByText(/Name is required/i)).not.toBeInTheDocument();
            });
        });
    });

    describe('Localized validation messages', () => {
        it('shows Russian error messages when lang is ru', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="ru" dict={mockContactFormDict} />);

            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            await waitFor(() => {
                expect(screen.getByText(/Введите имя/i)).toBeInTheDocument();
            });
        });

        it('shows Spanish error messages when lang is es', async () => {
            const user = userEvent.setup();
            render(<ContactForm lang="es" dict={mockContactFormDict} />);

            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            await waitFor(() => {
                expect(screen.getByText(/Ingrese su nombre/i)).toBeInTheDocument();
            });
        });
    });

    describe('Form submission', () => {
        it('shows loading state during submission', async () => {
            const user = userEvent.setup();
            mockFetch.mockImplementation(() =>
                new Promise(resolve =>
                    setTimeout(() => resolve({ ok: true, json: () => Promise.resolve({}) }), 100)
                )
            );

            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Fill all required fields
            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
            await user.selectOptions(screen.getByLabelText(/Service/i), 'Web Development');
            await user.type(screen.getByLabelText(/Details/i), 'Test message');

            // Submit
            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            // Should show loading text
            expect(screen.getByText(/Sending.../i)).toBeInTheDocument();
        });

        it('shows success state after successful submission', async () => {
            const user = userEvent.setup();
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ success: true }),
            });

            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Fill all required fields
            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
            await user.selectOptions(screen.getByLabelText(/Service/i), 'Web Development');
            await user.type(screen.getByLabelText(/Details/i), 'Test message');

            // Submit
            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            await waitFor(() => {
                expect(screen.getByText(mockContactFormDict.successTitle)).toBeInTheDocument();
                expect(screen.getByText(mockContactFormDict.successSubtitle)).toBeInTheDocument();
            });
        });

        it('shows error message on API failure', async () => {
            const user = userEvent.setup();
            mockFetch.mockResolvedValue({
                ok: false,
                json: () => Promise.resolve({ error: 'Server error' }),
            });

            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Fill all required fields
            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
            await user.selectOptions(screen.getByLabelText(/Service/i), 'Web Development');
            await user.type(screen.getByLabelText(/Details/i), 'Test message');

            // Submit
            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            await waitFor(() => {
                expect(screen.getByText(/Failed to send/i)).toBeInTheDocument();
            });
        });

        it('sends correct payload to API', async () => {
            const user = userEvent.setup();
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ success: true }),
            });

            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Fill form
            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
            await user.type(screen.getByLabelText(/Company/i), 'Acme Inc');
            await user.selectOptions(screen.getByLabelText(/Service/i), 'Web Development');
            await user.selectOptions(screen.getByLabelText(/Budget/i), '$5k-10k');
            await user.type(screen.getByLabelText(/Details/i), 'Build a website');

            // Submit
            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            await waitFor(() => {
                expect(mockFetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                }));

                const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
                expect(callBody.name).toBe('John Doe');
                expect(callBody.email).toBe('john@example.com');
                expect(callBody.company).toBe('Acme Inc');
                expect(callBody.message).toContain('Web Development');
                expect(callBody.message).toContain('$5k-10k');
                expect(callBody.message).toContain('Build a website');
                expect(callBody.recaptchaToken).toBe('mock-recaptcha-token');
            });
        });

        it('allows sending another message after success', async () => {
            const user = userEvent.setup();
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ success: true }),
            });

            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Fill and submit
            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
            await user.selectOptions(screen.getByLabelText(/Service/i), 'Web Development');
            await user.type(screen.getByLabelText(/Details/i), 'Test message');
            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            // Wait for success
            await waitFor(() => {
                expect(screen.getByText(mockContactFormDict.successTitle)).toBeInTheDocument();
            });

            // Click send another
            await user.click(screen.getByText(mockContactFormDict.sendAnother));

            // Form should be visible again
            expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
        });
    });

    describe('reCAPTCHA integration', () => {
        it('calls grecaptcha.execute on form submission', async () => {
            const user = userEvent.setup();
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ success: true }),
            });

            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Fill all required fields
            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
            await user.selectOptions(screen.getByLabelText(/Service/i), 'Web Development');
            await user.type(screen.getByLabelText(/Details/i), 'Test message');

            // Submit
            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            await waitFor(() => {
                expect(window.grecaptcha.execute).toHaveBeenCalled();
            });
        });

        it('shows error when reCAPTCHA fails', async () => {
            const user = userEvent.setup();
            (window.grecaptcha.execute as jest.Mock).mockRejectedValueOnce(new Error('reCAPTCHA failed'));

            render(<ContactForm lang="en" dict={mockContactFormDict} />);

            // Fill all required fields
            await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
            await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
            await user.selectOptions(screen.getByLabelText(/Service/i), 'Web Development');
            await user.type(screen.getByLabelText(/Details/i), 'Test message');

            // Submit
            await user.click(screen.getByRole('button', { name: /Send Message/i }));

            await waitFor(() => {
                expect(screen.getByText(/reCAPTCHA verification failed/i)).toBeInTheDocument();
            });
        });
    });
});
