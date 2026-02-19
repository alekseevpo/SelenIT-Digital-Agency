import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
    motion: {
        button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock next-themes to control theme behavior
const mockSetTheme = jest.fn();
const mockUseTheme = jest.fn();

jest.mock('next-themes', () => ({
    useTheme: () => mockUseTheme(),
    ThemeProvider: ({ children }: any) => <>{children}</>,
}));

describe('ThemeToggle', () => {
    beforeEach(() => {
        // Clear any existing theme classes
        document.documentElement.className = '';
        // Mock setTimeout for transition class removal
        jest.useFakeTimers();
        mockSetTheme.mockClear();

        // Default mock implementation
        mockUseTheme.mockReturnValue({
            theme: 'light',
            setTheme: mockSetTheme,
            resolvedTheme: 'light',
        });
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('renders theme toggle button', () => {
        render(<ThemeToggle />);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    });

    it('shows moon icon in light mode', () => {
        render(<ThemeToggle />);

        // Should show moon icon in light mode (to switch to dark)
        const moonIcon = screen.getByRole('button').querySelector('svg path[d*="21 12.79"]');
        expect(moonIcon).toBeInTheDocument();
    });

    it('shows sun icon in dark mode', () => {
        // Mock dark theme
        mockUseTheme.mockReturnValue({
            theme: 'dark',
            setTheme: mockSetTheme,
            resolvedTheme: 'dark',
        });

        render(<ThemeToggle />);

        // Should show sun icon in dark mode (to switch to light)
        const sunIcon = screen.getByRole('button').querySelector('svg circle');
        expect(sunIcon).toBeInTheDocument();
    });

    it('calls setTheme when clicked', () => {
        render(<ThemeToggle />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Should call setTheme with opposite theme
        expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });

    it('adds transitioning class during theme change', () => {
        render(<ThemeToggle />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Should add transitioning class
        expect(document.documentElement).toHaveClass('transitioning');

        // Fast-forward timers
        jest.advanceTimersByTime(500);

        // Should remove transitioning class after timeout
        expect(document.documentElement).not.toHaveClass('transitioning');
    });

    it('has correct accessibility attributes', () => {
        render(<ThemeToggle />);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    });

    it('updates aria-label when theme changes to dark', async () => {
        // Mock theme change to dark
        mockUseTheme.mockReturnValue({
            theme: 'dark',
            setTheme: mockSetTheme,
            resolvedTheme: 'dark',
        });

        render(<ThemeToggle />);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
    });

    it('handles multiple theme switches', () => {
        const { rerender } = render(<ThemeToggle />);

        const button = screen.getByRole('button');

        // First click: light -> dark
        fireEvent.click(button);
        expect(mockSetTheme).toHaveBeenCalledWith('dark');

        // Reset mock and simulate dark theme state
        mockSetTheme.mockClear();
        mockUseTheme.mockReturnValue({
            theme: 'dark',
            setTheme: mockSetTheme,
            resolvedTheme: 'dark',
        });

        // Rerender with new theme state
        rerender(<ThemeToggle />);

        // Second click: dark -> light
        fireEvent.click(button);
        expect(mockSetTheme).toHaveBeenCalledWith('light');
    });

    it('has correct styling classes', () => {
        render(<ThemeToggle />);

        const button = screen.getByRole('button');
        expect(button).toHaveClass(
            'w-10',
            'h-10',
            'rounded-full',
            'flex',
            'items-center',
            'justify-center',
        );
    });

    it('renders placeholder before mounting', () => {
        // Mock useState to return false for mounted initially
        const mockReact = React;
        const originalUseState = mockReact.useState;

        mockReact.useState = jest.fn().mockImplementation((initial) => {
            if (typeof initial === 'boolean') {
                return [false, jest.fn()]; // mounted = false
            }
            return originalUseState(initial);
        });

        render(<ThemeToggle />);

        // Should render placeholder div
        const placeholder = document.querySelector('.w-10.h-10');
        expect(placeholder).toBeInTheDocument();
    });
});
