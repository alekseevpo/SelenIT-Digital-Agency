import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CookieConsentProvider, useCookieConsent, ConsentStatus } from '@/components/providers/CookieConsentProvider';

// Test component to access context
function TestConsumer() {
    const { consent, setConsent, hasConsent } = useCookieConsent();

    return (
        <div>
            <span data-testid="consent-status">{consent}</span>
            <span data-testid="has-consent">{hasConsent.toString()}</span>
            <button onClick={() => setConsent('accepted')}>Accept</button>
            <button onClick={() => setConsent('declined')}>Decline</button>
            <button onClick={() => setConsent('pending')}>Reset</button>
        </div>
    );
}

describe('CookieConsentProvider', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    describe('Initial state', () => {
        it('starts with pending status when no localStorage value', () => {
            render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>
            );

            expect(screen.getByTestId('consent-status')).toHaveTextContent('pending');
        });

        it('hasConsent is false when status is pending', () => {
            render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>
            );

            expect(screen.getByTestId('has-consent')).toHaveTextContent('false');
        });

        it('loads accepted consent from localStorage', async () => {
            localStorage.setItem('cookie-consent', 'accepted');

            render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>
            );

            await waitFor(() => {
                expect(screen.getByTestId('consent-status')).toHaveTextContent('accepted');
            });
        });

        it('loads declined consent from localStorage', async () => {
            localStorage.setItem('cookie-consent', 'declined');

            render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>
            );

            await waitFor(() => {
                expect(screen.getByTestId('consent-status')).toHaveTextContent('declined');
            });
        });

        it('ignores invalid localStorage values', async () => {
            localStorage.setItem('cookie-consent', 'invalid-value');

            render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>
            );

            // Should remain pending since value is invalid
            await waitFor(() => {
                expect(screen.getByTestId('consent-status')).toHaveTextContent('pending');
            });
        });
    });

    describe('setConsent', () => {
        it('updates consent to accepted', async () => {
            const user = userEvent.setup();
            render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>
            );

            await user.click(screen.getByText('Accept'));

            expect(screen.getByTestId('consent-status')).toHaveTextContent('accepted');
        });

        it('updates consent to declined', async () => {
            const user = userEvent.setup();
            render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>
            );

            await user.click(screen.getByText('Decline'));

            expect(screen.getByTestId('consent-status')).toHaveTextContent('declined');
        });

        it('saves accepted consent to localStorage', async () => {
            const user = userEvent.setup();
            render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>
            );

            await user.click(screen.getByText('Accept'));

            expect(localStorage.setItem).toHaveBeenCalledWith('cookie-consent', 'accepted');
        });

        it('saves declined consent to localStorage', async () => {
            const user = userEvent.setup();
            render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>
            );

            await user.click(screen.getByText('Decline'));

            expect(localStorage.setItem).toHaveBeenCalledWith('cookie-consent', 'declined');
        });
    });

    describe('hasConsent', () => {
        it('returns true when consent is accepted', async () => {
            const user = userEvent.setup();
            render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>
            );

            await user.click(screen.getByText('Accept'));

            expect(screen.getByTestId('has-consent')).toHaveTextContent('true');
        });

        it('returns false when consent is declined', async () => {
            const user = userEvent.setup();
            render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>
            );

            await user.click(screen.getByText('Decline'));

            expect(screen.getByTestId('has-consent')).toHaveTextContent('false');
        });

        it('returns false when consent is pending', () => {
            render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>
            );

            expect(screen.getByTestId('has-consent')).toHaveTextContent('false');
        });
    });

    describe('Error handling', () => {
        it('throws error when useCookieConsent is used outside provider', () => {
            // Suppress console.error for this test
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

            expect(() => {
                render(<TestConsumer />);
            }).toThrow('useCookieConsent must be used within a CookieConsentProvider');

            consoleSpy.mockRestore();
        });
    });

    describe('SSR Hydration', () => {
        it('handles hydration correctly', async () => {
            localStorage.setItem('cookie-consent', 'accepted');

            const { rerender } = render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>
            );

            // After hydration, should show stored value
            await waitFor(() => {
                expect(screen.getByTestId('consent-status')).toHaveTextContent('accepted');
            });
        });
    });

    describe('Provider wrapper', () => {
        it('renders children correctly', () => {
            render(
                <CookieConsentProvider>
                    <div data-testid="child">Child content</div>
                </CookieConsentProvider>
            );

            expect(screen.getByTestId('child')).toBeInTheDocument();
            expect(screen.getByTestId('child')).toHaveTextContent('Child content');
        });

        it('provides context to nested children', () => {
            function DeepChild() {
                const { consent } = useCookieConsent();
                return <span data-testid="deep-child">{consent}</span>;
            }

            render(
                <CookieConsentProvider>
                    <div>
                        <div>
                            <DeepChild />
                        </div>
                    </div>
                </CookieConsentProvider>
            );

            expect(screen.getByTestId('deep-child')).toHaveTextContent('pending');
        });
    });
});
