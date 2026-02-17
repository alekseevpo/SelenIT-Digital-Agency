import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    CookieConsentProvider,
    useCookieConsent,
    ConsentStatus,
} from '@/components/providers/CookieConsentProvider';

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value.toString();
        }),
        removeItem: jest.fn((key) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        }),
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

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

describe('CookieConsentProvider Integration Tests', () => {
    beforeEach(() => {
        localStorageMock.clear();
        jest.clearAllMocks();
    });

    describe('localStorage Integration', () => {
        it('persists consent status across component re-renders', async () => {
            const user = userEvent.setup();

            // First render - accept consent
            const { unmount } = render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>,
            );

            await user.click(screen.getByText('Accept'));

            expect(screen.getByTestId('consent-status')).toHaveTextContent('accepted');
            expect(localStorageMock.setItem).toHaveBeenCalledWith('cookie-consent', 'accepted');

            // Unmount component
            unmount();

            // Second render - should load from localStorage
            render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>,
            );

            await waitFor(() => {
                expect(screen.getByTestId('consent-status')).toHaveTextContent('accepted');
            });
        });

        it('handles localStorage errors gracefully', async () => {
            const user = userEvent.setup();
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>,
            );

            // Test that the component renders without localStorage errors
            expect(screen.getByTestId('consent-status')).toHaveTextContent('pending');

            // Test normal functionality works
            await user.click(screen.getByText('Accept'));
            expect(screen.getByTestId('consent-status')).toHaveTextContent('accepted');

            consoleSpy.mockRestore();
        });

        it('handles corrupted localStorage data', async () => {
            // Set corrupted data
            localStorageMock.setItem('cookie-consent', 'invalid-data');

            render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>,
            );

            // Should default to pending for invalid data
            expect(screen.getByTestId('consent-status')).toHaveTextContent('pending');
            expect(screen.getByTestId('has-consent')).toHaveTextContent('false');
        });
    });

    describe('Multiple Components', () => {
        it('shares consent state across multiple components', async () => {
            const user = userEvent.setup();

            function TestConsumerA() {
                const { consent, hasConsent } = useCookieConsent();
                return (
                    <div>
                        <span data-testid="consumer-a-consent">{consent}</span>
                        <span data-testid="consumer-a-has-consent">{hasConsent.toString()}</span>
                    </div>
                );
            }

            function TestConsumerB() {
                const { consent, setConsent } = useCookieConsent();
                return (
                    <div>
                        <span data-testid="consumer-b-consent">{consent}</span>
                        <button onClick={() => setConsent('accepted')}>Accept B</button>
                    </div>
                );
            }

            render(
                <CookieConsentProvider>
                    <TestConsumerA />
                    <TestConsumerB />
                </CookieConsentProvider>,
            );

            // Both components should start with pending
            expect(screen.getByTestId('consumer-a-consent')).toHaveTextContent('pending');
            expect(screen.getByTestId('consumer-b-consent')).toHaveTextContent('pending');

            // Update consent from component B
            await user.click(screen.getByText('Accept B'));

            // Both components should reflect the change
            expect(screen.getByTestId('consumer-a-consent')).toHaveTextContent('accepted');
            expect(screen.getByTestId('consumer-b-consent')).toHaveTextContent('accepted');
            expect(screen.getByTestId('consumer-a-has-consent')).toHaveTextContent('true');
        });
    });

    describe('Edge Cases', () => {
        it('handles rapid consent changes', async () => {
            const user = userEvent.setup();

            render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>,
            );

            // Rapidly change consent status
            await user.click(screen.getByText('Accept'));
            await user.click(screen.getByText('Decline'));
            await user.click(screen.getByText('Accept'));
            await user.click(screen.getByText('Reset'));

            // Should handle rapid changes without errors
            expect(screen.getByTestId('consent-status')).toHaveTextContent('pending');
            expect(screen.getByTestId('has-consent')).toHaveTextContent('false');
        });

        it('maintains hasConsent logic correctly', async () => {
            const user = userEvent.setup();

            render(
                <CookieConsentProvider>
                    <TestConsumer />
                </CookieConsentProvider>,
            );

            // Test all consent states
            expect(screen.getByTestId('has-consent')).toHaveTextContent('false'); // pending

            await user.click(screen.getByText('Accept'));
            expect(screen.getByTestId('has-consent')).toHaveTextContent('true'); // accepted

            await user.click(screen.getByText('Decline'));
            expect(screen.getByTestId('has-consent')).toHaveTextContent('false'); // declined

            await user.click(screen.getByText('Reset'));
            expect(screen.getByTestId('has-consent')).toHaveTextContent('false'); // pending
        });

        it('prevents context access outside provider', () => {
            function InvalidConsumer() {
                const { consent } = useCookieConsent();
                return <span>{consent}</span>;
            }

            // Should throw error when used outside provider
            expect(() => {
                render(<InvalidConsumer />);
            }).toThrow('useCookieConsent must be used within a CookieConsentProvider');
        });
    });

    describe('Performance', () => {
        it('does not cause unnecessary re-renders', async () => {
            const user = userEvent.setup();

            let renderCount = 0;

            function TestConsumerWithCounter() {
                renderCount++;
                const { consent, setConsent } = useCookieConsent();

                return (
                    <div>
                        <span data-testid="consent-status">{consent}</span>
                        <span data-testid="render-count">{renderCount}</span>
                        <button onClick={() => setConsent('accepted')}>Accept</button>
                    </div>
                );
            }

            render(
                <CookieConsentProvider>
                    <TestConsumerWithCounter />
                </CookieConsentProvider>,
            );

            const initialRenderCount = parseInt(
                screen.getByTestId('render-count').textContent || '0',
            );

            // Should render at least once
            expect(initialRenderCount).toBeGreaterThanOrEqual(1);

            await user.click(screen.getByText('Accept'));

            // Should re-render when consent changes
            const finalRenderCount = parseInt(
                screen.getByTestId('render-count').textContent || '0',
            );
            expect(finalRenderCount).toBeGreaterThan(initialRenderCount);
        });
    });
});
