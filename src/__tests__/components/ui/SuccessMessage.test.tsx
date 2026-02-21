import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it } from '@jest/globals';
import { SuccessMessage } from '@/components/ui/SuccessMessage';
import '@/__tests__/types';

describe('SuccessMessage Component', () => {
    const defaultProps = {
        title: 'Thank you!',
        subtitle: 'We will get back to you soon.',
        onSendAnother: jest.fn(),
        sendAnotherText: 'Send another message',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders success message correctly', () => {
        render(<SuccessMessage {...defaultProps} />);

        expect(screen.getByText('Thank you!')).toBeInTheDocument();
        expect(screen.getByText('We will get back to you soon.')).toBeInTheDocument();
        expect(screen.getByText('Send another message')).toBeInTheDocument();
    });

    it('renders success icon', () => {
        render(<SuccessMessage {...defaultProps} />);

        const svg = document.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveAttribute('fill', 'none');
        expect(svg).toHaveAttribute('stroke', 'currentColor');
    });

    it('calls onSendAnother when button is clicked', () => {
        render(<SuccessMessage {...defaultProps} />);

        fireEvent.click(screen.getByText('Send another message'));
        expect(defaultProps.onSendAnother).toHaveBeenCalledTimes(1);
    });

    it('renders with different props', () => {
        const customProps = {
            title: 'Success!',
            subtitle: 'Your message has been sent.',
            onSendAnother: jest.fn(),
            sendAnotherText: 'Send new message',
        };

        render(<SuccessMessage {...customProps} />);

        expect(screen.getByText('Success!')).toBeInTheDocument();
        expect(screen.getByText('Your message has been sent.')).toBeInTheDocument();
        expect(screen.getByText('Send new message')).toBeInTheDocument();
    });

    it('has correct button attributes', () => {
        render(<SuccessMessage {...defaultProps} />);

        const button = screen.getByRole('button', { name: 'Send another message' });
        expect(button).toHaveAttribute('type', 'button');
    });

    it('has correct CSS classes', () => {
        render(<SuccessMessage {...defaultProps} />);

        const container = screen.getByText('Thank you!').closest('div');
        expect(container).toHaveClass('text-center', 'py-10');

        const button = screen.getByRole('button', { name: 'Send another message' });
        expect(button).toHaveClass('btn-primary', 'group/btn', 'relative', 'overflow-hidden');
    });

    it('renders with callback success message', () => {
        const callbackProps = {
            title: 'Callback requested!',
            subtitle: 'We will call you back soon.',
            onSendAnother: jest.fn(),
            sendAnotherText: 'Request another callback',
        };

        render(<SuccessMessage {...callbackProps} />);

        expect(screen.getByText('Callback requested!')).toBeInTheDocument();
        expect(screen.getByText('We will call you back soon.')).toBeInTheDocument();
        expect(screen.getByText('Request another callback')).toBeInTheDocument();
    });
});
