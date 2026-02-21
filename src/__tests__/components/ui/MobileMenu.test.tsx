import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, jest } from '@jest/globals';
import { MobileMenu } from '@/components/ui/MobileMenu';
import '@/__tests__/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children }: any) => <div>{children}</div>,
        nav: ({ children }: any) => <nav>{children}</nav>,
    },
    AnimatePresence: ({ children }: any) => <div>{children}</div>,
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
    usePathname: () => '/en',
}));

// Mock ThemeToggle
jest.mock('@/components/ui/ThemeToggle', () => ({
    ThemeToggle: () => <button data-testid="theme-toggle">Theme</button>,
}));

// Mock LanguageSwitcher
jest.mock('@/components/ui/LanguageSwitcher', () => ({
    LanguageSwitcher: () => <button data-testid="language-switcher">Language</button>,
}));

const mockNavDict = {
    home: 'Home',
    services: 'Services',
    showreel: 'Showreel',
    about: 'About',
    contact: 'Contact',
    getStarted: 'Get Started',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
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
    footer: {
        rights: 'All rights reserved.',
        services: 'Services',
        company: 'Company',
        getInTouch: 'Get in Touch',
        mission: 'We craft stunning digital experiences.',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        address: 'Madrid, Getafe',
    },
} as any;

describe('MobileMenu', () => {
    const defaultProps = {
        lang: 'en' as const,
        dict: mockDict,
        isMobileMenuOpen: false,
        pathname: '/en',
        navDict: mockNavDict,
        headerDict: mockHeaderDict,
        servicesSubLinks: [
            {
                href: '/en/services/branding',
                label: 'Branding',
                description: 'Branding description',
            },
            {
                href: '/en/services/websites',
                label: 'Websites',
                description: 'Websites description',
            },
        ],
        isServicesOpen: false,
        closeMenu: jest.fn(),
        toggleServices: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders mobile menu when open', () => {
        render(<MobileMenu {...defaultProps} isMobileMenuOpen={true} />);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Services')).toBeInTheDocument();
        expect(screen.getByText('Showreel')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
        render(<MobileMenu {...defaultProps} isMobileMenuOpen={false} />);

        expect(screen.queryByText('Home')).not.toBeInTheDocument();
        expect(screen.queryByText('Services')).not.toBeInTheDocument();
    });

    it('renders close button', () => {
        render(<MobileMenu {...defaultProps} isMobileMenuOpen={true} />);

        const closeButton = screen.getByRole('button', { name: /close/i });
        expect(closeButton).toBeInTheDocument();
    });

    it('calls closeMenu when close button is clicked', () => {
        const closeMenu = jest.fn();
        render(<MobileMenu {...defaultProps} isMobileMenuOpen={true} closeMenu={closeMenu} />);

        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);

        expect(closeMenu).toHaveBeenCalled();
    });

    it('calls closeMenu when backdrop is clicked', () => {
        const closeMenu = jest.fn();
        render(<MobileMenu {...defaultProps} isMobileMenuOpen={true} closeMenu={closeMenu} />);

        const backdrop = screen.getByTestId('mobile-menu-backdrop');
        fireEvent.click(backdrop);

        expect(closeMenu).toHaveBeenCalled();
    });

    it('renders navigation links correctly', () => {
        render(<MobileMenu {...defaultProps} isMobileMenuOpen={true} />);

        const servicesLink = screen.getByRole('link', { name: /services/i });
        expect(servicesLink).toHaveAttribute('href', '/en/services');

        const showreelLink = screen.getByRole('link', { name: /showreel/i });
        expect(showreelLink).toHaveAttribute('href', '/en/showreel');

        const aboutLink = screen.getByRole('link', { name: /about/i });
        expect(aboutLink).toHaveAttribute('href', '/en/about');

        const contactLink = screen.getByRole('link', { name: /contact/i });
        expect(contactLink).toHaveAttribute('href', '/en/contact');
    });

    it('highlights active link correctly', () => {
        render(<MobileMenu {...defaultProps} isMobileMenuOpen={true} />);

        const homeLink = screen.getByRole('link', { name: /home/i });
        expect(homeLink).toHaveClass('text-red-600');
    });

    it('does not highlight inactive links', () => {
        render(<MobileMenu {...defaultProps} isMobileMenuOpen={true} />);

        const servicesLink = screen.getByRole('link', { name: /services/i });
        expect(servicesLink).not.toHaveClass('text-red-600');
    });

    it('renders services dropdown when open', () => {
        render(<MobileMenu {...defaultProps} isMobileMenuOpen={true} isServicesOpen={true} />);

        expect(screen.getByText('Branding')).toBeInTheDocument();
        expect(screen.getByText('Websites')).toBeInTheDocument();
        expect(screen.getByText('Branding description')).toBeInTheDocument();
        expect(screen.getByText('Websites description')).toBeInTheDocument();
    });

    it('does not render services dropdown when closed', () => {
        render(<MobileMenu {...defaultProps} isMobileMenuOpen={true} isServicesOpen={false} />);

        expect(screen.queryByText('Branding')).not.toBeInTheDocument();
        expect(screen.queryByText('Websites')).not.toBeInTheDocument();
    });

    it('calls toggleServices when services button is clicked', () => {
        const toggleServices = jest.fn();
        render(
            <MobileMenu
                {...defaultProps}
                isMobileMenuOpen={true}
                toggleServices={toggleServices}
            />,
        );

        const servicesButton = screen.getByRole('button', { name: /services/i });
        fireEvent.click(servicesButton);

        expect(toggleServices).toHaveBeenCalled();
    });

    it('renders utility controls', () => {
        render(<MobileMenu {...defaultProps} isMobileMenuOpen={true} />);

        expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
        expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    });

    it('handles different languages correctly', () => {
        const spanishProps = {
            ...defaultProps,
            lang: 'es' as const,
            navDict: {
                home: 'Inicio',
                services: 'Servicios',
                showreel: 'Showreel',
                about: 'Nosotros',
                contact: 'Contacto',
                getStarted: 'Empezar',
                privacy: 'Privacy Policy',
                terms: 'Terms of Service',
            },
            headerDict: {
                menu: 'Menú',
                closeMenu: 'Cerrar',
                openMenu: 'Abrir',
                language: 'Idioma',
            },
        };

        render(<MobileMenu {...spanishProps} isMobileMenuOpen={true} />);

        expect(screen.getByText('Inicio')).toBeInTheDocument();
        expect(screen.getByText('Servicios')).toBeInTheDocument();
        expect(screen.getByText('Contacto')).toBeInTheDocument();
        expect(screen.getByText('Cerrar')).toBeInTheDocument();
    });

    it('handles empty services sublinks gracefully', () => {
        render(<MobileMenu {...defaultProps} isMobileMenuOpen={true} servicesSubLinks={[]} />);

        expect(screen.getByText('Services')).toBeInTheDocument();
        // Should not throw errors with empty sublinks
    });

    it('handles missing navDict gracefully', () => {
        render(
            <MobileMenu
                {...defaultProps}
                isMobileMenuOpen={true}
                navDict={{
                    home: '',
                    services: '',
                    showreel: '',
                    about: '',
                    contact: '',
                    getStarted: '',
                    privacy: '',
                    terms: '',
                }}
            />,
        );

        // Should render navigation without crashing
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('handles missing headerDict gracefully', () => {
        render(
            <MobileMenu
                {...defaultProps}
                isMobileMenuOpen={true}
                headerDict={{ menu: '', openMenu: '', closeMenu: '', language: '' }}
            />,
        );

        // Should render navigation without crashing
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('applies correct CSS classes for animations', () => {
        render(<MobileMenu {...defaultProps} isMobileMenuOpen={true} />);

        const menu = screen.getByTestId('mobile-menu');
        expect(menu).toHaveClass('fixed');
        expect(menu).toHaveClass('inset-0');
    });

    it('renders with correct accessibility attributes', () => {
        render(<MobileMenu {...defaultProps} isMobileMenuOpen={true} />);

        const nav = screen.getByRole('navigation');
        expect(nav).toHaveAttribute('aria-label');
    });

    it('closes menu when navigation link is clicked', () => {
        const closeMenu = jest.fn();
        render(<MobileMenu {...defaultProps} isMobileMenuOpen={true} closeMenu={closeMenu} />);

        const homeLink = screen.getByRole('link', { name: /home/i });
        fireEvent.click(homeLink);

        expect(closeMenu).toHaveBeenCalled();
    });

    it('renders get started button correctly', () => {
        render(<MobileMenu {...defaultProps} isMobileMenuOpen={true} />);

        const getStartedButton = screen.getByRole('link', { name: /get started/i });
        expect(getStartedButton).toHaveAttribute('href', '/en/contact');
        expect(getStartedButton).toHaveClass('bg-red-600');
    });
});
