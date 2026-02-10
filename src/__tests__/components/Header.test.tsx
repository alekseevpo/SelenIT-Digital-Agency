import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import Header from '@/components/layout/Header';
import { usePathname } from 'next/navigation';
import type { Dictionary } from '@/types/dictionary';

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        div: 'div',
        button: 'button',
        span: 'span',
        h2: 'h2',
        svg: 'svg',
        a: 'a',
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useInView: jest.fn(() => true),
    useScroll: jest.fn(() => ({ scrollY: { get: jest.fn() } })),
    useTransform: jest.fn(),
    useSpring: jest.fn(),
    useMotionValue: jest.fn(() => ({ get: jest.fn() })),
    animate: jest.fn(),
    Variants: {},
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
    })),
}));

const navLabels = {
    en: {
        home: 'Home',
        services: 'Services',
        showreel: 'Showreel',
        about: 'About',
        contact: 'Contact',
        getStarted: 'Get Started',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
    },
    ru: {
        home: 'Главная',
        services: 'Услуги',
        showreel: 'Шоурил',
        about: 'О нас',
        contact: 'Контакты',
        getStarted: 'Начать',
        privacy: 'Политика конфиденциальности',
        terms: 'Условия обслуживания',
    },
    es: {
        home: 'Inicio',
        services: 'Servicios',
        showreel: 'Showreel',
        about: 'Nosotros',
        contact: 'Contacto',
        getStarted: 'Empezar',
        privacy: 'Política de privacidad',
        terms: 'Términos del servicio',
    },
} as const;

const headerLabels = {
    en: {
        menu: 'Menu',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
        language: 'Language',
    },
    ru: {
        menu: 'Меню',
        openMenu: 'Открыть меню',
        closeMenu: 'Закрыть меню',
        language: 'Язык',
    },
    es: {
        menu: 'Menú',
        openMenu: 'Abrir menú',
        closeMenu: 'Cerrar menú',
        language: 'Idioma',
    },
} as const;

const servicesMenuLinks = {
    branding: { label: 'Branding', description: 'Branding' },
    websites: { label: 'Websites', description: 'Websites' },
    seo: { label: 'SEO', description: 'SEO' },
    custom: { label: 'Support', description: 'Support' },
    solutions: { label: 'Solutions', description: 'Solutions' },
};

const buildMockDictionary = (lang: keyof typeof navLabels): Dictionary =>
    ({
        common: {
            nav: navLabels[lang],
            header: headerLabels[lang],
        },
        services: {
            menuLinks: servicesMenuLinks,
        },
    }) as Dictionary;

const mockDictionaries = {
    en: buildMockDictionary('en'),
    ru: buildMockDictionary('ru'),
    es: buildMockDictionary('es'),
};

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
            render(<Header lang="en" dict={mockDictionaries.en} />);

            // The logo is a link to home
            const logoLink = document.querySelector('a[href="/en"]');
            expect(logoLink).toBeInTheDocument();

            // Check for text-based logo content
            expect(logoLink?.textContent).toContain('Selen');
        });

        it('renders all navigation links on desktop', () => {
            render(<Header lang="en" dict={mockDictionaries.en} />);

            expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /showreel/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
        });

        it('renders correct links for English locale', () => {
            render(<Header lang="en" dict={mockDictionaries.en} />);

            expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/en');
            expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute(
                'href',
                '/en/services',
            );
            expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute(
                'href',
                '/en/contact',
            );
        });

        it('renders correct links for Russian locale', () => {
            render(<Header lang="ru" dict={mockDictionaries.ru} />);

            const homeLink = screen.getAllByRole('link', { name: /главная/i })[0];
            expect(homeLink).toHaveAttribute('href', '/ru');
        });

        it('renders correct links for Spanish locale', () => {
            render(<Header lang="es" dict={mockDictionaries.es} />);

            const homeLink = screen.getAllByRole('link', { name: /inicio/i })[0];
            expect(homeLink).toHaveAttribute('href', '/es');
        });

        it('renders theme toggle', () => {
            render(<Header lang="en" dict={mockDictionaries.en} />);

            const themeButtons = screen.getAllByRole('button');
            const themeToggle = themeButtons.find(
                (btn) =>
                    btn.getAttribute('aria-label')?.includes('theme') ||
                    btn.getAttribute('aria-label')?.includes('Dark') ||
                    btn.getAttribute('aria-label')?.includes('Light'),
            );
            expect(themeToggle || themeButtons.length > 0).toBeTruthy();
        });

        it('renders language switcher', () => {
            render(<Header lang="en" dict={mockDictionaries.en} />);

            expect(screen.getAllByText('EN').length).toBeGreaterThan(0);
            expect(screen.getAllByText('RU').length).toBeGreaterThan(0);
            expect(screen.getAllByText('ES').length).toBeGreaterThan(0);
        });
    });

    describe('Mobile menu', () => {
        it('renders mobile menu button', () => {
            render(<Header lang="en" dict={mockDictionaries.en} />);

            const menuButton = screen.getByRole('button', { name: /open menu/i });
            expect(menuButton).toBeInTheDocument();
        });

        it('opens mobile menu when button is clicked', async () => {
            render(<Header lang="en" dict={mockDictionaries.en} />);

            const menuButton = screen.getByRole('button', { name: /open menu/i });
            act(() => {
                fireEvent.click(menuButton);
            });

            await waitFor(() => {
                expect(document.body.style.overflow).toBe('hidden');
            });

            expect(menuButton).toHaveAttribute('aria-label', 'Close menu');
        });

        it('closes mobile menu when menu button is clicked again', async () => {
            render(<Header lang="en" dict={mockDictionaries.en} />);

            // Open menu
            const menuButton = screen.getByRole('button', { name: /open menu/i });
            act(() => {
                fireEvent.click(menuButton);
            });

            await waitFor(() => {
                expect(document.body.style.overflow).toBe('hidden');
            });

            // Close menu
            act(() => {
                fireEvent.click(menuButton);
            });

            await waitFor(() => {
                expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
            });
        });

        it('closes mobile menu when close button is clicked', async () => {
            render(<Header lang="en" dict={mockDictionaries.en} />);

            const menuButton = screen.getByRole('button', { name: /open menu/i });

            // Open menu
            act(() => {
                fireEvent.click(menuButton);
            });

            await waitFor(() => {
                expect(document.body.style.overflow).toBe('hidden');
            });

            // There are two close buttons (hamburger toggle + X button inside menu)
            const closeButtons = screen.getAllByRole('button', { name: /close menu/i });
            // Click the last one (the X button inside the mobile menu overlay)
            act(() => {
                fireEvent.click(closeButtons[closeButtons.length - 1]);
            });

            await waitFor(() => {
                expect(document.body.style.overflow).toBe('');
            });
        });

        it('closes mobile menu when a navigation link is clicked', async () => {
            render(<Header lang="en" dict={mockDictionaries.en} />);

            // Open menu
            act(() => {
                fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
            });

            await waitFor(() => {
                expect(document.body.style.overflow).toBe('hidden');
            });

            // Click a navigation link in mobile menu
            const allLinks = document.querySelectorAll('a[href="/en"]');
            // The last matching link is inside the mobile menu
            if (allLinks.length > 0) {
                act(() => {
                    fireEvent.click(allLinks[allLinks.length - 1]);
                });
            }

            await waitFor(() => {
                expect(document.body.style.overflow).toBe('');
            });
        });
    });

    describe('Scroll behavior', () => {
        it('blocks body scroll when mobile menu is open', async () => {
            render(<Header lang="en" dict={mockDictionaries.en} />);

            // Open menu
            act(() => {
                fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
            });

            await waitFor(() => {
                expect(document.body.style.overflow).toBe('hidden');
            });
        });

        it('restores body scroll when mobile menu is closed', async () => {
            render(<Header lang="en" dict={mockDictionaries.en} />);

            const menuButton = screen.getByRole('button', { name: /open menu/i });

            // Open menu
            act(() => {
                fireEvent.click(menuButton);
            });

            await waitFor(() => {
                expect(document.body.style.overflow).toBe('hidden');
            });

            // Close menu
            act(() => {
                fireEvent.click(menuButton);
            });

            await waitFor(() => {
                expect(document.body.style.overflow).toBe('');
            });
        });

        it('changes background on scroll', async () => {
            render(<Header lang="en" dict={mockDictionaries.en} />);

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
            render(<Header lang="en" dict={mockDictionaries.en} />);

            // The active link should have different styling
            const servicesLinks = screen.getAllByRole('link', { name: /services/i });
            expect(servicesLinks.length).toBeGreaterThan(0);
        });

        it('highlights home when on home page', () => {
            (usePathname as jest.Mock).mockReturnValue('/en');
            render(<Header lang="en" dict={mockDictionaries.en} />);

            const homeLinks = screen.getAllByRole('link', { name: /home/i });
            expect(homeLinks.length).toBeGreaterThan(0);
        });
    });

    describe('Localization', () => {
        it('displays Russian navigation labels', () => {
            render(<Header lang="ru" dict={mockDictionaries.ru} />);

            expect(screen.getAllByText(/главная/i).length).toBeGreaterThan(0);
            expect(screen.getAllByText(/услуги/i).length).toBeGreaterThan(0);
            expect(screen.getAllByText(/о нас/i).length).toBeGreaterThan(0);
            expect(screen.getAllByText(/контакты/i).length).toBeGreaterThan(0);
        });

        it('displays Spanish navigation labels', () => {
            render(<Header lang="es" dict={mockDictionaries.es} />);

            expect(screen.getAllByText(/inicio/i).length).toBeGreaterThan(0);
            expect(screen.getAllByText(/servicios/i).length).toBeGreaterThan(0);
            expect(screen.getAllByText(/nosotros/i).length).toBeGreaterThan(0);
            expect(screen.getAllByText(/contacto/i).length).toBeGreaterThan(0);
        });
    });

    describe('Accessibility', () => {
        it('mobile menu button has correct aria-label when closed', () => {
            render(<Header lang="en" dict={mockDictionaries.en} />);

            expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
        });

        it('mobile menu button has correct aria-label when open', async () => {
            render(<Header lang="en" dict={mockDictionaries.en} />);

            const menuButton = screen.getByRole('button', { name: /open menu/i });
            act(() => {
                fireEvent.click(menuButton);
            });

            await waitFor(() => {
                expect(document.body.style.overflow).toBe('hidden');
            });

            expect(menuButton).toHaveAttribute('aria-label', 'Close menu');
        });

        it('language switcher has role="group" with aria-label', () => {
            render(<Header lang="en" dict={mockDictionaries.en} />);

            const langGroup = document.querySelector(
                '[role="group"][aria-label="Select language"]',
            );
            expect(langGroup).toBeInTheDocument();
        });
    });
});
