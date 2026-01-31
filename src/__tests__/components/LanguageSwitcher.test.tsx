import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { usePathname, useRouter } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
    })),
}));

describe('LanguageSwitcher', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (usePathname as jest.Mock).mockReturnValue('/en/about');
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
            replace: jest.fn(),
            prefetch: jest.fn(),
        });
    });

    describe('Rendering', () => {
        it('renders all language options', () => {
            render(<LanguageSwitcher currentLang="en" />);

            expect(screen.getByText('EN')).toBeInTheDocument();
            expect(screen.getByText('RU')).toBeInTheDocument();
            expect(screen.getByText('ES')).toBeInTheDocument();
        });

        it('renders as a group with correct aria-label', () => {
            render(<LanguageSwitcher currentLang="en" />);

            const group = screen.getByRole('group', { name: /select language/i });
            expect(group).toBeInTheDocument();
        });

        it('renders language buttons', () => {
            render(<LanguageSwitcher currentLang="en" />);

            const buttons = screen.getAllByRole('button');
            expect(buttons.length).toBe(3);
        });
    });

    describe('Active state', () => {
        it('marks English as active when currentLang is en', () => {
            render(<LanguageSwitcher currentLang="en" />);

            const enButton = screen.getByRole('button', { name: /switch to english/i });
            expect(enButton).toHaveAttribute('aria-pressed', 'true');
        });

        it('marks Russian as active when currentLang is ru', () => {
            render(<LanguageSwitcher currentLang="ru" />);

            const ruButton = screen.getByRole('button', { name: /switch to русский/i });
            expect(ruButton).toHaveAttribute('aria-pressed', 'true');
        });

        it('marks Spanish as active when currentLang is es', () => {
            render(<LanguageSwitcher currentLang="es" />);

            const esButton = screen.getByRole('button', { name: /switch to español/i });
            expect(esButton).toHaveAttribute('aria-pressed', 'true');
        });

        it('inactive buttons have aria-pressed false', () => {
            render(<LanguageSwitcher currentLang="en" />);

            const ruButton = screen.getByRole('button', { name: /switch to русский/i });
            const esButton = screen.getByRole('button', { name: /switch to español/i });

            expect(ruButton).toHaveAttribute('aria-pressed', 'false');
            expect(esButton).toHaveAttribute('aria-pressed', 'false');
        });
    });

    describe('Language switching', () => {
        it('navigates to Russian version when RU is clicked', async () => {
            const user = userEvent.setup();
            (usePathname as jest.Mock).mockReturnValue('/en/about');

            render(<LanguageSwitcher currentLang="en" />);

            await user.click(screen.getByRole('button', { name: /switch to русский/i }));

            await waitFor(() => {
                expect(mockPush).toHaveBeenCalledWith('/ru/about');
            });
        });

        it('navigates to Spanish version when ES is clicked', async () => {
            const user = userEvent.setup();
            (usePathname as jest.Mock).mockReturnValue('/en/services');

            render(<LanguageSwitcher currentLang="en" />);

            await user.click(screen.getByRole('button', { name: /switch to español/i }));

            await waitFor(() => {
                expect(mockPush).toHaveBeenCalledWith('/es/services');
            });
        });

        it('navigates to English version when EN is clicked from Russian', async () => {
            const user = userEvent.setup();
            (usePathname as jest.Mock).mockReturnValue('/ru/contact');

            render(<LanguageSwitcher currentLang="ru" />);

            await user.click(screen.getByRole('button', { name: /switch to english/i }));

            await waitFor(() => {
                expect(mockPush).toHaveBeenCalledWith('/en/contact');
            });
        });

        it('handles home page path correctly', async () => {
            const user = userEvent.setup();
            (usePathname as jest.Mock).mockReturnValue('/en');

            render(<LanguageSwitcher currentLang="en" />);

            await user.click(screen.getByRole('button', { name: /switch to русский/i }));

            await waitFor(() => {
                expect(mockPush).toHaveBeenCalledWith('/ru');
            });
        });

        it('handles nested paths correctly', async () => {
            const user = userEvent.setup();
            (usePathname as jest.Mock).mockReturnValue('/en/services/web-development');

            render(<LanguageSwitcher currentLang="en" />);

            await user.click(screen.getByRole('button', { name: /switch to español/i }));

            await waitFor(() => {
                expect(mockPush).toHaveBeenCalledWith('/es/services/web-development');
            });
        });
    });

    describe('Accessibility', () => {
        it('has correct aria-label for English button', () => {
            render(<LanguageSwitcher currentLang="ru" />);

            const enButton = screen.getByRole('button', { name: /switch to english/i });
            expect(enButton).toHaveAttribute('aria-label', 'Switch to English');
        });

        it('has correct aria-label for Russian button', () => {
            render(<LanguageSwitcher currentLang="en" />);

            const ruButton = screen.getByRole('button', { name: /switch to русский/i });
            expect(ruButton).toHaveAttribute('aria-label', 'Switch to Русский');
        });

        it('has correct aria-label for Spanish button', () => {
            render(<LanguageSwitcher currentLang="en" />);

            const esButton = screen.getByRole('button', { name: /switch to español/i });
            expect(esButton).toHaveAttribute('aria-label', 'Switch to Español');
        });

        it('buttons are not disabled by default', () => {
            render(<LanguageSwitcher currentLang="en" />);

            const buttons = screen.getAllByRole('button');
            buttons.forEach(button => {
                expect(button).not.toBeDisabled();
            });
        });
    });

    describe('Edge cases', () => {
        it('handles null pathname gracefully', async () => {
            (usePathname as jest.Mock).mockReturnValue(null);

            render(<LanguageSwitcher currentLang="en" />);

            const ruButton = screen.getByRole('button', { name: /switch to русский/i });
            await userEvent.click(ruButton);

            // Should fallback to '/'
            await waitFor(() => {
                expect(mockPush).toHaveBeenCalledWith('/');
            });
        });

        it('clicking active language still triggers navigation', async () => {
            const user = userEvent.setup();
            (usePathname as jest.Mock).mockReturnValue('/en/about');

            render(<LanguageSwitcher currentLang="en" />);

            await user.click(screen.getByRole('button', { name: /switch to english/i }));

            await waitFor(() => {
                expect(mockPush).toHaveBeenCalledWith('/en/about');
            });
        });
    });

    describe('Visual states', () => {
        it('has different styling for active vs inactive buttons', () => {
            render(<LanguageSwitcher currentLang="en" />);

            const enButton = screen.getByText('EN').closest('button');
            const ruButton = screen.getByText('RU').closest('button');

            // Active button should have text-white class (via gradient background)
            expect(enButton?.className).toContain('text-white');
            // Inactive buttons should have different text color classes
            expect(ruButton?.className).toContain('text-slate');
        });
    });
});
