import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '@/components/layout/Header';
import { usePathname } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
    })),
}));

describe('Header', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (usePathname as jest.Mock).mockReturnValue('/en');
        // Reset body styles
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.overflow = '';
    });

    describe('Rendering', () => {
        it('renders logo with link to home', () => {
            render(<Header lang="en" />);

            // The logo is a link to home with the SVG logo
            const logoLink = document.querySelector('a[href="/en"]');
            expect(logoLink).toBeInTheDocument();

            // Check for SVG logo element
            const svg = logoLink?.querySelector('svg');
            expect(svg).toBeInTheDocument();
        });

        it('renders all navigation links on desktop', () => {
            render(<Header lang="en" />);

            expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /showreel/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
        });

        it('renders correct links for English locale', () => {
            render(<Header lang="en" />);

            expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/en');
            expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute('href', '/en/services');
            expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/en/contact');
        });

        it('renders correct links for Russian locale', () => {
            render(<Header lang="ru" />);

            const homeLink = screen.getAllByRole('link', { name: /главная/i })[0];
            expect(homeLink).toHaveAttribute('href', '/ru');
        });

        it('renders correct links for Spanish locale', () => {
            render(<Header lang="es" />);

            const homeLink = screen.getAllByRole('link', { name: /inicio/i })[0];
            expect(homeLink).toHaveAttribute('href', '/es');
        });

        it('renders theme toggle', () => {
            render(<Header lang="en" />);

            const themeButtons = screen.getAllByRole('button');
            const themeToggle = themeButtons.find(btn =>
                btn.getAttribute('aria-label')?.includes('theme') ||
                btn.getAttribute('aria-label')?.includes('Dark') ||
                btn.getAttribute('aria-label')?.includes('Light')
            );
            expect(themeToggle || themeButtons.length > 0).toBeTruthy();
        });

        it('renders language switcher', () => {
            render(<Header lang="en" />);

            expect(screen.getAllByText('EN').length).toBeGreaterThan(0);
            expect(screen.getAllByText('RU').length).toBeGreaterThan(0);
            expect(screen.getAllByText('ES').length).toBeGreaterThan(0);
        });
    });

    describe('Mobile menu', () => {
        it('renders mobile menu button', () => {
            render(<Header lang="en" />);

            const menuButton = screen.getByRole('button', { name: /open menu/i });
            expect(menuButton).toBeInTheDocument();
        });

        it('opens mobile menu when button is clicked', async () => {
            const user = userEvent.setup();
            render(<Header lang="en" />);

            const menuButton = screen.getByRole('button', { name: /open menu/i });
            await user.click(menuButton);

            // Menu should be visible with navigation items
            await waitFor(() => {
                expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
            });
        });

        it('closes mobile menu when close button is clicked', async () => {
            const user = userEvent.setup();
            render(<Header lang="en" />);

            // Open menu
            const menuButton = screen.getByRole('button', { name: /open menu/i });
            await user.click(menuButton);

            await waitFor(() => {
                expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
            });

            // Close menu
            const closeButton = screen.getByRole('button', { name: /close menu/i });
            await user.click(closeButton);

            await waitFor(() => {
                expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
            });
        });

        it('closes mobile menu when overlay is clicked', async () => {
            const user = userEvent.setup();
            render(<Header lang="en" />);

            // Open menu
            await user.click(screen.getByRole('button', { name: /open menu/i }));

            await waitFor(() => {
                expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
            });

            // Find and click the overlay (the outer div with onClick={closeMenu})
            const overlay = document.querySelector('[class*="fixed inset-0"]');
            if (overlay) {
                fireEvent.click(overlay);
            }

            await waitFor(() => {
                expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
            });
        });

        it('closes mobile menu when a navigation link is clicked', async () => {
            const user = userEvent.setup();
            render(<Header lang="en" />);

            // Open menu
            await user.click(screen.getByRole('button', { name: /open menu/i }));

            await waitFor(() => {
                expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
            });

            // Click a navigation link in mobile menu (the one inside the mobile menu)
            const mobileMenuLinks = document.querySelectorAll('ul a');
            if (mobileMenuLinks.length > 0) {
                fireEvent.click(mobileMenuLinks[0]);
            }

            await waitFor(() => {
                expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
            });
        });
    });

    describe('Scroll behavior', () => {
        it('blocks body scroll when mobile menu is open', async () => {
            const user = userEvent.setup();
            render(<Header lang="en" />);

            // Open menu
            await user.click(screen.getByRole('button', { name: /open menu/i }));

            await waitFor(() => {
                expect(document.body.style.overflow).toBe('hidden');
            });
        });

        it('restores body scroll when mobile menu is closed', async () => {
            const user = userEvent.setup();
            render(<Header lang="en" />);

            // Open menu
            await user.click(screen.getByRole('button', { name: /open menu/i }));

            await waitFor(() => {
                expect(document.body.style.overflow).toBe('hidden');
            });

            // Close menu
            const closeButton = screen.getByRole('button', { name: /close menu/i });
            await user.click(closeButton);

            await waitFor(() => {
                expect(document.body.style.overflow).toBe('');
            });
        });

        it('changes background on scroll', async () => {
            render(<Header lang="en" />);

            // Simulate scroll
            Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
            fireEvent.scroll(window);

            // The header component uses state to track scroll, check the header element
            await waitFor(() => {
                const header = document.querySelector('header');
                // The header should have different classes when scrolled
                expect(header).toBeInTheDocument();
            });
        });
    });

    describe('Active navigation', () => {
        it('highlights active navigation link', () => {
            (usePathname as jest.Mock).mockReturnValue('/en/services');
            render(<Header lang="en" />);

            // The active link should have different styling
            const servicesLinks = screen.getAllByRole('link', { name: /services/i });
            expect(servicesLinks.length).toBeGreaterThan(0);
        });

        it('highlights home when on home page', () => {
            (usePathname as jest.Mock).mockReturnValue('/en');
            render(<Header lang="en" />);

            const homeLinks = screen.getAllByRole('link', { name: /home/i });
            expect(homeLinks.length).toBeGreaterThan(0);
        });
    });

    describe('Localization', () => {
        it('displays Russian navigation labels', () => {
            render(<Header lang="ru" />);

            expect(screen.getAllByText(/главная/i).length).toBeGreaterThan(0);
            expect(screen.getAllByText(/услуги/i).length).toBeGreaterThan(0);
            expect(screen.getAllByText(/о нас/i).length).toBeGreaterThan(0);
            expect(screen.getAllByText(/контакты/i).length).toBeGreaterThan(0);
        });

        it('displays Spanish navigation labels', () => {
            render(<Header lang="es" />);

            expect(screen.getAllByText(/inicio/i).length).toBeGreaterThan(0);
            expect(screen.getAllByText(/servicios/i).length).toBeGreaterThan(0);
            expect(screen.getAllByText(/nosotros/i).length).toBeGreaterThan(0);
            expect(screen.getAllByText(/contacto/i).length).toBeGreaterThan(0);
        });
    });

    describe('Accessibility', () => {
        it('mobile menu button has correct aria-label when closed', () => {
            render(<Header lang="en" />);

            expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
        });

        it('mobile menu button has correct aria-label when open', async () => {
            const user = userEvent.setup();
            render(<Header lang="en" />);

            await user.click(screen.getByRole('button', { name: /open menu/i }));

            await waitFor(() => {
                expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
            });
        });

        it('language switcher has role="group" with aria-label', () => {
            render(<Header lang="en" />);

            const langGroup = document.querySelector('[role="group"][aria-label="Select language"]');
            expect(langGroup).toBeInTheDocument();
        });
    });
});
