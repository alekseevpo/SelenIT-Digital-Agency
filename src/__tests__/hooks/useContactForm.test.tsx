import { renderHook, act } from '@testing-library/react';
import { describe, it, beforeEach, jest } from '@jest/globals';
import { useContactForm } from '@/hooks/useContactForm';

// Mock fetch for API calls
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

describe('useContactForm Hook', () => {
    const mockOnSubmit = jest.fn((data: any) => Promise.resolve(undefined)) as jest.MockedFunction<
        (data: any) => Promise<void>
    >;
    const defaultProps = {
        lang: 'en',
        activeTab: 'message' as const,
        onSubmit: mockOnSubmit,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockFetch.mockClear();
        mockOnSubmit.mockResolvedValue(undefined);
    });

    describe('Initial State', () => {
        it('should initialize with empty form state', () => {
            const { result } = renderHook(() => useContactForm(defaultProps));

            expect(result.current.formState).toEqual({
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
        });

        it('should initialize with empty errors', () => {
            const { result } = renderHook(() => useContactForm(defaultProps));

            expect(result.current.errors).toEqual({});
        });

        it('should initialize with default flags', () => {
            const { result } = renderHook(() => useContactForm(defaultProps));

            expect(result.current.isSubmitting).toBe(false);
            expect(result.current.isSubmitted).toBe(false);
            expect(result.current.submitError).toBe(null);
        });
    });

    describe('Form State Management', () => {
        it('should update form state on handleChange', () => {
            const { result } = renderHook(() => useContactForm(defaultProps));

            act(() => {
                result.current.handleChange({
                    target: { name: 'name', value: 'John Doe' },
                } as any);
            });

            expect(result.current.formState.name).toBe('John Doe');
        });

        it('should clear errors when user starts typing', async () => {
            const { result } = renderHook(() => useContactForm(defaultProps));

            // Trigger validation error by submitting empty form
            const form = document.createElement('form');
            const submitEvent = { preventDefault: jest.fn() } as any;

            await act(async () => {
                await result.current.handleSubmit(submitEvent);
            });

            expect(result.current.errors.name).toBeDefined();

            // Start typing in name field
            act(() => {
                result.current.handleChange({
                    target: { name: 'name', value: 'John' },
                } as any);
            });

            expect(result.current.errors.name).toBeUndefined();
        });

        it('should clear submit error when user types', async () => {
            const { result } = renderHook(() => useContactForm(defaultProps));

            // Simulate submit error by triggering validation failure
            const form = document.createElement('form');
            const submitEvent = { preventDefault: jest.fn() } as any;

            await act(async () => {
                await result.current.handleSubmit(submitEvent);
            });

            expect(result.current.submitError).toBeNull();
        });
    });

    describe('Form Validation', () => {
        it('should validate required fields for message tab', async () => {
            const { result } = renderHook(() => useContactForm(defaultProps));

            const form = document.createElement('form');
            const submitEvent = { preventDefault: jest.fn() } as any;

            await act(async () => {
                await result.current.handleSubmit(submitEvent);
            });

            expect(result.current.errors).toEqual({
                name: 'Name is required',
                email: 'Email is required',
                service: 'Please select a service',
                message: 'Details are required',
            });
        });

        it('should validate required fields for callback tab', async () => {
            const { result } = renderHook(() =>
                useContactForm({
                    ...defaultProps,
                    activeTab: 'callback',
                }),
            );

            const form = document.createElement('form');
            const submitEvent = { preventDefault: jest.fn() } as any;

            await act(async () => {
                await result.current.handleSubmit(submitEvent);
            });

            expect(result.current.errors).toEqual({
                name: 'Name is required',
                phone: 'Phone is required',
            });
        });

        it('should validate email format', async () => {
            const { result } = renderHook(() => useContactForm(defaultProps));

            // Set invalid email
            act(() => {
                result.current.handleChange({
                    target: { name: 'email', value: 'invalid-email' },
                } as any);
            });

            const form = document.createElement('form');
            const submitEvent = { preventDefault: jest.fn() } as any;

            await act(async () => {
                await result.current.handleSubmit(submitEvent);
            });

            expect(result.current.errors.email).toBe('Invalid email format');
        });

        it('should pass validation with valid data', async () => {
            const { result } = renderHook(() => useContactForm(defaultProps));

            // Set valid data
            act(() => {
                result.current.handleChange({
                    target: { name: 'name', value: 'John Doe' },
                } as any);
                result.current.handleChange({
                    target: { name: 'email', value: 'john@example.com' },
                } as any);
                result.current.handleChange({
                    target: { name: 'service', value: 'Web Development' },
                } as any);
                result.current.handleChange({
                    target: { name: 'message', value: 'Test message' },
                } as any);
            });

            const form = document.createElement('form');
            const submitEvent = { preventDefault: jest.fn() } as any;

            await act(async () => {
                await result.current.handleSubmit(submitEvent);
            });

            expect(result.current.errors).toEqual({});
        });

        it('should handle Russian validation messages', async () => {
            const { result } = renderHook(() =>
                useContactForm({
                    ...defaultProps,
                    lang: 'ru',
                }),
            );

            const form = document.createElement('form');
            const submitEvent = { preventDefault: jest.fn() } as any;

            await act(async () => {
                await result.current.handleSubmit(submitEvent);
            });

            expect(result.current.errors.name).toBe('Введите имя');
            expect(result.current.errors.email).toBe('Введите email');
        });

        it('should handle Spanish validation messages', async () => {
            const { result } = renderHook(() =>
                useContactForm({
                    ...defaultProps,
                    lang: 'es',
                }),
            );

            const form = document.createElement('form');
            const submitEvent = { preventDefault: jest.fn() } as any;

            await act(async () => {
                await result.current.handleSubmit(submitEvent);
            });

            expect(result.current.errors.name).toBe('Ingrese su nombre');
            expect(result.current.errors.email).toBe('Ingrese su email');
        });
    });

    describe('Form Submission', () => {
        it('should call onSubmit with valid data', async () => {
            const { result } = renderHook(() => useContactForm(defaultProps));

            // Set valid data
            act(() => {
                result.current.handleChange({
                    target: { name: 'name', value: 'John Doe' },
                } as any);
                result.current.handleChange({
                    target: { name: 'email', value: 'john@example.com' },
                } as any);
                result.current.handleChange({
                    target: { name: 'service', value: 'Web Development' },
                } as any);
                result.current.handleChange({
                    target: { name: 'message', value: 'Test message' },
                } as any);
            });

            const form = document.createElement('form');
            const submitEvent = { preventDefault: jest.fn() } as any;

            await act(async () => {
                await result.current.handleSubmit(submitEvent);
            });

            expect(mockOnSubmit).toHaveBeenCalledWith({
                name: 'John Doe',
                email: 'john@example.com',
                phone: '',
                company: '',
                service: 'Web Development',
                budget: '',
                dontKnowBudget: false,
                message: 'Test message',
                website: '',
            });
        });

        it('should set isSubmitting during submission', async () => {
            const { result } = renderHook(() => useContactForm(defaultProps));

            // Set valid data so validation passes
            act(() => {
                result.current.handleChange({ target: { name: 'name', value: 'John Doe' } } as any);
                result.current.handleChange({
                    target: { name: 'email', value: 'john@example.com' },
                } as any);
                result.current.handleChange({
                    target: { name: 'service', value: 'Web Development' },
                } as any);
                result.current.handleChange({
                    target: { name: 'message', value: 'Test message' },
                } as any);
            });

            // Mock onSubmit to take time
            mockOnSubmit.mockImplementation(
                () => new Promise((resolve) => setTimeout(resolve, 100)),
            );

            const form = document.createElement('form');
            const submitEvent = { preventDefault: jest.fn() } as any;

            act(() => {
                result.current.handleSubmit(submitEvent);
            });

            expect(result.current.isSubmitting).toBe(true);

            // Wait for submission to complete
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 150));
            });

            expect(result.current.isSubmitting).toBe(false);
        });

        it('should handle successful submission', async () => {
            const { result } = renderHook(() => useContactForm(defaultProps));

            // Set valid data
            act(() => {
                result.current.handleChange({
                    target: { name: 'name', value: 'John Doe' },
                } as any);
                result.current.handleChange({
                    target: { name: 'email', value: 'john@example.com' },
                } as any);
                result.current.handleChange({
                    target: { name: 'service', value: 'Web Development' },
                } as any);
                result.current.handleChange({
                    target: { name: 'message', value: 'Test message' },
                } as any);
            });

            const form = document.createElement('form');
            const submitEvent = { preventDefault: jest.fn() } as any;

            await act(async () => {
                await result.current.handleSubmit(submitEvent);
            });

            expect(result.current.isSubmitted).toBe(true);
            expect(result.current.submitError).toBeNull();
        });

        it('should handle submission error', async () => {
            const { result } = renderHook(() => useContactForm(defaultProps));

            // Mock onSubmit to throw error
            mockOnSubmit.mockRejectedValue(new Error('Network error') as never);

            // Set valid data
            act(() => {
                result.current.handleChange({
                    target: { name: 'name', value: 'John Doe' },
                } as any);
                result.current.handleChange({
                    target: { name: 'email', value: 'john@example.com' },
                } as any);
                result.current.handleChange({
                    target: { name: 'service', value: 'Web Development' },
                } as any);
                result.current.handleChange({
                    target: { name: 'message', value: 'Test message' },
                } as any);
            });

            const form = document.createElement('form');
            const submitEvent = { preventDefault: jest.fn() } as any;

            await act(async () => {
                await result.current.handleSubmit(submitEvent);
            });

            expect(result.current.isSubmitted).toBe(false);
            expect(result.current.submitError).toBe('Failed to send. Please try again later.');
        });

        it('should handle honeypot detection', async () => {
            const { result } = renderHook(() => useContactForm(defaultProps));

            // Set honeypot field
            act(() => {
                result.current.handleChange({
                    target: { name: 'website', value: 'spam' },
                } as any);
            });

            const form = document.createElement('form');
            const submitEvent = { preventDefault: jest.fn() } as any;

            await act(async () => {
                await result.current.handleSubmit(submitEvent);
            });

            expect(result.current.isSubmitted).toBe(true);
            expect(mockOnSubmit).not.toHaveBeenCalled();
        });
    });

    describe('Form Reset', () => {
        it('should reset form state', () => {
            const { result } = renderHook(() => useContactForm(defaultProps));

            // Set some data
            act(() => {
                result.current.handleChange({
                    target: { name: 'name', value: 'John Doe' },
                } as any);
                result.current.handleChange({
                    target: { name: 'email', value: 'john@example.com' },
                } as any);
            });

            act(() => {
                result.current.resetForm();
            });

            expect(result.current.formState).toEqual({
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
        });

        it('should clear errors on reset', async () => {
            const { result } = renderHook(() => useContactForm(defaultProps));

            // Trigger errors by submitting empty form
            const form = document.createElement('form');
            const submitEvent = { preventDefault: jest.fn() } as any;

            await act(async () => {
                await result.current.handleSubmit(submitEvent);
            });

            expect(result.current.errors.name).toBeDefined();

            act(() => {
                result.current.resetForm();
            });

            expect(result.current.errors).toEqual({});
            expect(result.current.submitError).toBeNull();
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty onSubmit gracefully', async () => {
            const { result } = renderHook(() =>
                useContactForm({
                    ...defaultProps,
                    onSubmit: undefined,
                }),
            );

            // Set valid data
            act(() => {
                result.current.handleChange({
                    target: { name: 'name', value: 'John Doe' },
                } as any);
                result.current.handleChange({
                    target: { name: 'email', value: 'john@example.com' },
                } as any);
                result.current.handleChange({
                    target: { name: 'service', value: 'Web Development' },
                } as any);
                result.current.handleChange({
                    target: { name: 'message', value: 'Test message' },
                } as any);
            });

            const form = document.createElement('form');
            const submitEvent = { preventDefault: jest.fn() } as any;

            await act(async () => {
                await result.current.handleSubmit(submitEvent);
            });

            expect(result.current.isSubmitted).toBe(true);
        });

        it('should handle multiple rapid submissions', async () => {
            const { result } = renderHook(() => useContactForm(defaultProps));

            // Set valid data
            act(() => {
                result.current.handleChange({
                    target: { name: 'name', value: 'John Doe' },
                } as any);
                result.current.handleChange({
                    target: { name: 'email', value: 'john@example.com' },
                } as any);
                result.current.handleChange({
                    target: { name: 'service', value: 'Web Development' },
                } as any);
                result.current.handleChange({
                    target: { name: 'message', value: 'Test message' },
                } as any);
            });

            const form = document.createElement('form');
            const submitEvent = { preventDefault: jest.fn() } as any;

            // Multiple rapid submissions
            await act(async () => {
                await Promise.all([
                    result.current.handleSubmit(submitEvent),
                    result.current.handleSubmit(submitEvent),
                    result.current.handleSubmit(submitEvent),
                ]);
            });

            expect(result.current.isSubmitted).toBe(true);
            expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        });
    });
});
