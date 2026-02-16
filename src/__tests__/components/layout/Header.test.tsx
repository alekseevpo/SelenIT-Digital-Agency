import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import Header from '@/components/layout/Header';
import '@/__tests__/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        header: ({ children }: any) => <header>{children}</header>,
        nav: ({ children }: any) => <nav>{children}</nav>,
        div: ({ children }: any) => <div>{children}</div>,
    },
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
    usePathname: () => '/en',
}));

// Mock useNavigationLogic
const mockUseNavigationLogic = jest.fn();
jest.mock('@/hooks/useNavigationLogic', () => ({
    useNavigationLogic: mockUseNavigationLogic,
}));

// Mock ThemeToggle
jest.mock('@/components/ui/ThemeToggle', () => ({
    ThemeToggle: () => <button data-testid="theme-toggle">Theme</button>,
}));

// Mock LanguageSwitcher
jest.mock('@/components/ui/LanguageSwitcher', () => ({
    LanguageSwitcher: () => <button data-testid="language-switcher">Language</button>,
}));

// Mock Logo
jest.mock('@/components/ui/Logo', () => ({
    Logo: () => <div data-testid="logo">Logo</div>,
}));

const mockNavDict = {
    home: 'Home',
    services: 'Services',
    showreel: 'Showreel',
    about: 'About',
    contact: 'Contact',
    getStarted: 'Get Started',
};

const mockHeaderDict = {
    menu: 'Menu',
    closeMenu: 'Close',
    openMenu: 'Open',
    language: 'Language',
};

const mockDict = {
    common: {
        nav: mockNavDict,
        header: mockHeaderDict,
    },
    services: {
        menuLinks: [
            { title: 'Web Development', href: '/services/web-development' },
            { title: 'Mobile Apps', href: '/services/mobile-apps' },
            { title: 'UI/UX Design', href: '/services/ui-ux-design' },
        ],
        menu: {
            branding: {
                label: 'Branding',
                description: 'Branding services',
            },
            custom: {
                label: 'Custom Solutions',
                description: 'Custom development',
            },
            seo: {
                label: 'SEO',
                description: 'SEO optimization',
            },
            solutions: {
                label: 'Solutions',
                description: 'Business solutions',
            },
            websites: {
                label: 'Websites',
                description: 'Website development',
            },
        },
    },
} as any;

describe('Header', () => {
    const defaultProps = {
        lang: 'en' as const,
        dict: mockDict,
    };

    // Helper function to create mock return value
    const createMockReturnValue = (overrides = {}) => ({
        isScrolled: false,
        isMobileMenuOpen: false,
        isDesktopServicesOpen: false,
        isMobileServicesOpen: false,
        scrollY: 0,
        pathname: '/en',
        navDict: mockNavDict,
        headerDict: mockHeaderDict,
        servicesSubLinks: [
            { title: 'Web Development', href: '/services/web-development' },
            { title: 'Mobile Apps', href: '/services/mobile-apps' },
            { title: 'UI/UX Design', href: '/services/ui-ux-design' },
        ],
        servicesMenu: {
            branding: {
                label: 'Branding',
                description: 'Branding services',
            },
            custom: {
                label: 'Custom Solutions',
                description: 'Custom development',
            },
            seo: {
                label: 'SEO',
                description: 'SEO optimization',
            },
            solutions: {
                label: 'Solutions',
                description: 'Business solutions',
            },
            websites: {
                label: 'Websites',
                description: 'Website development',
            },
        },
        toggleMobileMenu: jest.fn(),
        closeMobileMenu: jest.fn(),
        toggleDesktopServices: jest.fn(),
        closeDesktopServices: jest.fn(),
        toggleMobileServices: jest.fn(),
        closeMobileServices: jest.fn(),
        ...overrides,
    });

    beforeEach(() => {
        jest.clearAllMocks();

        // Setup mock function
        mockUseNavigationLogic.mockReturnValue(createMockReturnValue());
    });

    it('renders header correctly', () => {
        render(<Header {...defaultProps} />);

        expect(screen.getByTestId('logo')).toBeInTheDocument();
        expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
        expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    });

    it('renders mobile menu button', () => {
        render(<Header {...defaultProps} />);

        const mobileMenuButton = screen.getByRole('button', { name: /menu/i });
        expect(mobileMenuButton).toBeInTheDocument();
    });

    it('renders desktop navigation', () => {
        render(<Header {...defaultProps} />);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Services')).toBeInTheDocument();
        expect(screen.getByText('Showreel')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
        expect(screen.getByText('Get Started')).toBeInTheDocument();
    });

    it('renders correct links for English locale', () => {
        render(<Header {...defaultProps} />);

        expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/en');
        expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute(
            'href',
            '/Services',
        );
        expect(screen.getByRole('link', { name: /showreel/i })).toHaveAttribute(
            'href',
            '/en/showreel',
        );
        expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/en/about');
        expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute(
            'href',
            '/en/contact',
        );
    });

    it('applies scrolled class when scrolled', () => {
        mockUseNavigationLogic.mockReturnValue(
            createMockReturnValue({ isScrolled: true, scrollY: 100 }),
        );

        render(<Header {...defaultProps} />);

        const header = screen.getByRole('banner');
        expect(header).toHaveClass('scrolled');
    });

    it('does not apply scrolled class when not scrolled', () => {
        render(<Header {...defaultProps} />);

        const header = screen.getByRole('banner');
        expect(header).not.toHaveClass('scrolled');
    });

    it('renders mobile menu when open', () => {
        mockUseNavigationLogic.mockReturnValue({
            isScrolled: false,
            isMobileMenuOpen: true,
            isDesktopServicesOpen: false,
            isMobileServicesOpen: false,
            scrollY: 0,
            toggleMobileMenu: jest.fn(),
            closeMobileMenu: jest.fn(),
            toggleDesktopServices: jest.fn(),
            closeDesktopServices: jest.fn(),
            toggleMobileServices: jest.fn(),
            closeMobileServices: jest.fn(),
        });

        render(<Header {...defaultProps} />);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Services')).toBeInTheDocument();
        expect(screen.getByText('Showreel')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('does not render mobile menu when closed', () => {
        render(<Header {...defaultProps} />);

        // Mobile menu should not be visible when closed
        expect(screen.queryByTestId('mobile-menu-backdrop')).not.toBeInTheDocument();
    });

    it('calls toggleMobileMenu when mobile menu button is clicked', () => {
        const mockToggleMobileMenu = jest.fn();
        mockUseNavigationLogic.mockReturnValue({
            isScrolled: false,
            isMobileMenuOpen: false,
            isDesktopServicesOpen: false,
            isMobileServicesOpen: false,
            scrollY: 0,
            toggleMobileMenu: mockToggleMobileMenu,
            closeMobileMenu: jest.fn(),
            toggleDesktopServices: jest.fn(),
            closeDesktopServices: jest.fn(),
            toggleMobileServices: jest.fn(),
            closeMobileServices: jest.fn(),
        });

        render(<Header {...defaultProps} />);

        const mobileMenuButton = screen.getByRole('button', { name: /menu/i });
        fireEvent.click(mobileMenuButton);

        expect(mockToggleMobileMenu).toHaveBeenCalled();
    });

    it('handles different languages correctly', () => {
        const spanishProps = {
            lang: 'es' as const,
            dict: mockDict,
        };

        render(<Header {...spanishProps} />);

        expect(screen.getByText('Inicio')).toBeInTheDocument();
        expect(screen.getByText('Servicios')).toBeInTheDocument();
        expect(screen.getByText('Contacto')).toBeInTheDocument();
        expect(screen.getByText('Empezar')).toBeInTheDocument();
    });

    it('handles empty services sublinks gracefully', () => {
        render(<Header {...defaultProps} />);

        expect(screen.getByText('Services')).toBeInTheDocument();
        // Should not throw errors with empty sublinks
    });

    it('handles missing dict gracefully', () => {
        render(<Header {...defaultProps} dict={{} as any} />);

        // Should render header without crashing
        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('applies correct CSS classes for animations', () => {
        render(<Header {...defaultProps} />);

        const header = screen.getByRole('banner');
        expect(header).toHaveClass('fixed');
        expect(header).toHaveClass('top-0');
        expect(header).toHaveClass('left-0');
        expect(header).toHaveClass('right-0');
        expect(header).toHaveClass('z-50');
    });

    it('renders with correct accessibility attributes', () => {
        render(<Header {...defaultProps} />);

        const header = screen.getByRole('banner');
        expect(header).toHaveAttribute('aria-label');
    });

    it('renders get started button correctly', () => {
        render(<Header {...defaultProps} />);

        const getStartedButton = screen.getByRole('link', { name: /get started/i });
        expect(getStartedButton).toHaveAttribute('href', '/en/contact');
        expect(getStartedButton).toHaveClass('bg-red-600');
    });

    it('handles desktop services dropdown state', () => {
        mockUseNavigationLogic.mockReturnValue({
            isScrolled: false,
            isMobileMenuOpen: false,
            isDesktopServicesOpen: true,
            isMobileServicesOpen: false,
            scrollY: 0,
            toggleMobileMenu: jest.fn(),
            closeMobileMenu: jest.fn(),
            toggleDesktopServices: jest.fn(),
            closeDesktopServices: jest.fn(),
            toggleMobileServices: jest.fn(),
            closeMobileServices: jest.fn(),
        });

        render(<Header {...defaultProps} />);

        // Should handle desktop services dropdown state
        expect(screen.getByText('Services')).toBeInTheDocument();
    });

    it('handles mobile services dropdown state', () => {
        mockUseNavigationLogic.mockReturnValue({
            isScrolled: false,
            isMobileMenuOpen: true,
            isDesktopServicesOpen: false,
            isMobileServicesOpen: true,
            scrollY: 0,
            toggleMobileMenu: jest.fn(),
            closeMobileMenu: jest.fn(),
            toggleDesktopServices: jest.fn(),
            closeDesktopServices: jest.fn(),
            toggleMobileServices: jest.fn(),
            closeMobileServices: jest.fn(),
        });

        render(<Header {...defaultProps} />);

        // Should handle mobile services dropdown state
        expect(screen.getByText('Services')).toBeInTheDocument();
    });
});
