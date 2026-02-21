import { render, screen } from '@testing-library/react';
import { describe, it } from '@jest/globals';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import '@/__tests__/types';

describe('ErrorMessage Component', () => {
    const defaultMessage = 'An error occurred';

    it('renders error message correctly', () => {
        render(<ErrorMessage message={defaultMessage} />);

        expect(screen.getByText(defaultMessage)).toBeInTheDocument();
    });

    it('renders error icon', () => {
        render(<ErrorMessage message={defaultMessage} />);

        const svg = document.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveAttribute('fill', 'currentColor');
        expect(svg).toHaveAttribute('viewBox', '0 0 20 20');
    });

    it('has correct CSS classes', () => {
        render(<ErrorMessage message={defaultMessage} />);

        const container = screen.getByText(defaultMessage).closest('div');
        expect(container).toHaveClass('col-span-1', 'md:col-span-2', 'p-4', 'rounded-2xl');
    });

    it('renders different error messages', () => {
        const customMessage = 'Failed to send message';
        render(<ErrorMessage message={customMessage} />);

        expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it('renders with long error messages', () => {
        const longMessage =
            'This is a very long error message that should wrap properly and still be readable';
        render(<ErrorMessage message={longMessage} />);

        expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('has correct styling for error state', () => {
        render(<ErrorMessage message={defaultMessage} />);

        const container = screen.getByText(defaultMessage).closest('div');
        expect(container).toHaveClass('bg-red-500/10', 'border-red-500/20', 'text-red-600');
    });

    it('renders icon with correct path', () => {
        render(<ErrorMessage message={defaultMessage} />);

        const path = document.querySelector('svg path');
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute('fill-rule', 'evenodd');
        expect(path).toHaveAttribute('clip-rule', 'evenodd');
    });

    it('displays error with icon and text', () => {
        render(<ErrorMessage message={defaultMessage} />);

        const container = screen.getByText(defaultMessage).closest('div');
        const icon = container?.querySelector('svg');
        const text = container?.querySelector('p');

        expect(icon).toBeInTheDocument();
        expect(text).toBeInTheDocument();
        expect(text).toHaveTextContent(defaultMessage);
    });
});
