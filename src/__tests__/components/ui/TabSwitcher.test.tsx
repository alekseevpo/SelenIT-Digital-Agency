import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import { TabSwitcher } from '@/components/ui/TabSwitcher';
import '@/__tests__/types';

describe('TabSwitcher Component', () => {
    const mockTabs = {
        message: 'Send Message',
        callback: 'Request Callback',
    };

    it('renders both tabs', () => {
        render(<TabSwitcher activeTab="message" onTabChange={jest.fn()} tabs={mockTabs} />);

        expect(screen.getByText('Send Message')).toBeInTheDocument();
        expect(screen.getByText('Request Callback')).toBeInTheDocument();
    });

    it('highlights active tab', () => {
        render(<TabSwitcher activeTab="message" onTabChange={jest.fn()} tabs={mockTabs} />);

        const messageTab = screen.getByText('Send Message');
        const callbackTab = screen.getByText('Request Callback');

        expect(messageTab.closest('button')).toHaveClass('text-primary-600');
        expect(callbackTab.closest('button')).not.toHaveClass('text-primary-600');
    });

    it('calls onTabChange when tab is clicked', () => {
        const mockOnTabChange = jest.fn();
        render(<TabSwitcher activeTab="message" onTabChange={mockOnTabChange} tabs={mockTabs} />);

        fireEvent.click(screen.getByText('Request Callback'));
        expect(mockOnTabChange).toHaveBeenCalledWith('callback');
    });

    it('switches active tab correctly', () => {
        const { rerender } = render(
            <TabSwitcher activeTab="message" onTabChange={jest.fn()} tabs={mockTabs} />,
        );

        expect(screen.getByText('Send Message').closest('button')).toHaveClass('text-primary-600');

        rerender(<TabSwitcher activeTab="callback" onTabChange={jest.fn()} tabs={mockTabs} />);

        expect(screen.getByText('Request Callback').closest('button')).toHaveClass(
            'text-primary-600',
        );
        expect(screen.getByText('Send Message').closest('button')).not.toHaveClass(
            'text-primary-600',
        );
    });
});
