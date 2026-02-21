import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, jest } from '@jest/globals';
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
global.IntersectionObserver = jest.fn().mockImplementation((callback: any) => ({
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
    ...(jest.requireActual('react') as object),
    Suspense: ({ fallback, children }: any) => {
        return (
            <div data-testid="suspense-boundary">
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

    it('applies custom className', () => {
        render(
            <LazySection className="custom-class">
                <div data-testid="test-content">Test Content</div>
            </LazySection>,
        );

        const section = screen.getByTestId('lazy-section');
        expect(section).toHaveClass('custom-class');
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
        render(<LazySection>{null}</LazySection>);

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
