import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import { LazySection } from '@/components/ui/LazySection';
import '@/__tests__/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => {
            // Simulate whileInView behavior
            setTimeout(() => {
                const element = document.querySelector('[data-testid="lazy-section"]');
                if (element) {
                    element.setAttribute('data-visible', 'true');
                }
            }, 100);
            return (
                <div data-testid="lazy-section" {...props}>
                    {children}
                </div>
            );
        },
    },
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
    observe: jest.fn().mockImplementation((element) => {
        // Simulate element becoming visible
        setTimeout(() => {
            callback([{ isIntersecting: true, target: element }]);
        }, 100);
    }),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
})) as any;

// Mock Suspense
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    Suspense: ({ fallback, children }: any) => {
        // Simulate lazy loading
        setTimeout(() => {
            const element = document.querySelector('[data-testid="lazy-content"]');
            if (element) {
                element.setAttribute('data-loaded', 'true');
            }
        }, 50);
        return (
            <div>
                <div data-testid="suspense-fallback">{fallback}</div>
                <div data-testid="lazy-content">{children}</div>
            </div>
        );
    },
}));

describe('LazySection', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders children correctly', () => {
        render(
            <LazySection>
                <div data-testid="test-content">Test Content</div>
            </LazySection>,
        );

        expect(screen.getByTestId('test-content')).toBeInTheDocument();
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders custom fallback when provided', () => {
        const customFallback = <div data-testid="custom-fallback">Loading...</div>;

        render(
            <LazySection fallback={customFallback}>
                <div data-testid="test-content">Test Content</div>
            </LazySection>,
        );

        expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders default fallback when none provided', () => {
        render(
            <LazySection>
                <div data-testid="test-content">Test Content</div>
            </LazySection>,
        );

        expect(screen.getByTestId('suspense-fallback')).toBeInTheDocument();
        expect(screen.getByRole('generic')).toHaveClass('animate-pulse');
    });

    it('applies custom className', () => {
        render(
            <LazySection className="custom-class">
                <div data-testid="test-content">Test Content</div>
            </LazySection>,
        );

        const section = screen.getByTestId('lazy-section');
        expect(section).toHaveClass('custom-class');
    });

    it('passes custom threshold to viewport', () => {
        const mockObserve = jest.fn();
        (global.IntersectionObserver as jest.Mock).mockImplementation((callback) => ({
            observe: mockObserve,
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));

        render(
            <LazySection threshold={0.5}>
                <div data-testid="test-content">Test Content</div>
            </LazySection>,
        );

        expect(global.IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
            once: true,
            amount: 0.5,
            margin: '50px',
        });
    });

    it('passes custom rootMargin to viewport', () => {
        const mockObserve = jest.fn();
        (global.IntersectionObserver as jest.Mock).mockImplementation((callback) => ({
            observe: mockObserve,
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));

        render(
            <LazySection rootMargin="100px">
                <div data-testid="test-content">Test Content</div>
            </LazySection>,
        );

        expect(global.IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
            once: true,
            amount: 0.1,
            margin: '100px',
        });
    });

    it('passes custom delay to animation', () => {
        render(
            <LazySection delay={0.5}>
                <div data-testid="test-content">Test Content</div>
            </LazySection>,
        );

        const section = screen.getByTestId('lazy-section');
        expect(section).toBeInTheDocument();
    });

    it('handles empty children gracefully', () => {
        render(<LazySection />);

        expect(screen.getByTestId('lazy-section')).toBeInTheDocument();
    });

    it('handles nested lazy sections', () => {
        render(
            <LazySection>
                <div data-testid="outer-content">
                    <LazySection>
                        <div data-testid="inner-content">Inner Content</div>
                    </LazySection>
                </div>
            </LazySection>,
        );

        expect(screen.getByTestId('outer-content')).toBeInTheDocument();
        expect(screen.getByTestId('inner-content')).toBeInTheDocument();
    });

    it('handles multiple children', () => {
        render(
            <LazySection>
                <div data-testid="child1">Child 1</div>
                <div data-testid="child2">Child 2</div>
                <div data-testid="child3">Child 3</div>
            </LazySection>,
        );

        expect(screen.getByTestId('child1')).toBeInTheDocument();
        expect(screen.getByTestId('child2')).toBeInTheDocument();
        expect(screen.getByTestId('child3')).toBeInTheDocument();
    });

    it('handles complex children with components', () => {
        const TestComponent = ({ text }: { text: string }) => (
            <div data-testid="test-component">{text}</div>
        );

        render(
            <LazySection>
                <TestComponent text="Complex Content" />
            </LazySection>,
        );

        expect(screen.getByTestId('test-component')).toBeInTheDocument();
        expect(screen.getByText('Complex Content')).toBeInTheDocument();
    });

    it('simulates lazy loading behavior', async () => {
        render(
            <LazySection>
                <div data-testid="lazy-loaded-content">Lazy Loaded Content</div>
            </LazySection>,
        );

        // Initially shows fallback
        expect(screen.getByTestId('suspense-fallback')).toBeInTheDocument();

        // Wait for lazy loading
        await waitFor(() => {
            expect(screen.getByTestId('lazy-loaded-content')).toBeInTheDocument();
        });
    });

    it('handles rapid mount/unmount gracefully', () => {
        const { unmount } = render(
            <LazySection>
                <div data-testid="test-content">Test Content</div>
            </LazySection>,
        );

        expect(screen.getByTestId('test-content')).toBeInTheDocument();

        unmount();

        // Should not throw errors
        expect(screen.queryByTestId('test-content')).not.toBeInTheDocument();
    });

    it('handles props changes gracefully', () => {
        const { rerender } = render(
            <LazySection className="initial-class">
                <div data-testid="test-content">Initial Content</div>
            </LazySection>,
        );

        expect(screen.getByTestId('lazy-section')).toHaveClass('initial-class');

        rerender(
            <LazySection className="updated-class">
                <div data-testid="test-content">Updated Content</div>
            </LazySection>,
        );

        expect(screen.getByTestId('lazy-section')).toHaveClass('updated-class');
        expect(screen.getByText('Updated Content')).toBeInTheDocument();
    });

    it('handles error boundaries gracefully', () => {
        const ThrowErrorComponent = () => {
            throw new Error('Test error');
        };

        expect(() => {
            render(
                <LazySection>
                    <ThrowErrorComponent />
                </LazySection>,
            );
        }).toThrow('Test error');
    });
});
