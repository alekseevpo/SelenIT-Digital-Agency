import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import { DesktopNav } from '@/components/ui/DesktopNav';
import '@/__tests__/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        nav: ({ children }: any) => <nav>{children}</nav>,
        div: ({ children }: any) => <div>{children}</div>,
    },
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

const mockDict = {
    common: {
        nav: mockNavDict,
        header: {
            menu: 'Menu',
            closeMenu: 'Close',
            openMenu: 'Open',
            language: 'Language',
        },
    },
} as any;

describe('DesktopNav', () => {
    const defaultProps = {
        lang: 'en' as const,
        dict: mockDict,
        isScrolled: false,
        pathname: '/en',
        navDict: mockNavDict,
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
        isDesktopServicesOpen: false,
        handleDesktopServicesEnter: jest.fn(),
        handleDesktopServicesLeave: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders desktop navigation correctly', () => {
        render(<DesktopNav {...defaultProps} />);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Services')).toBeInTheDocument();
        expect(screen.getByText('Showreel')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
        expect(screen.getByText('Get Started')).toBeInTheDocument();
    });

    it('applies scrolled class when isScrolled is true', () => {
        render(<DesktopNav {...defaultProps} isScrolled={true} />);

        const nav = screen.getByRole('navigation');
        expect(nav).toHaveClass('scrolled');
    });

    it('does not apply scrolled class when isScrolled is false', () => {
        render(<DesktopNav {...defaultProps} isScrolled={false} />);

        const nav = screen.getByRole('navigation');
        expect(nav).not.toHaveClass('scrolled');
    });

    it('renders logo correctly', () => {
        render(<DesktopNav {...defaultProps} />);

        expect(screen.getByTestId('logo')).toBeInTheDocument();
    });

    it('renders navigation links correctly', () => {
        render(<DesktopNav {...defaultProps} />);

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
        render(<DesktopNav {...defaultProps} />);

        const homeLink = screen.getByRole('link', { name: /home/i });
        expect(homeLink).toHaveClass('text-red-600');
    });

    it('does not highlight inactive links', () => {
        render(<DesktopNav {...defaultProps} />);

        const servicesLink = screen.getByRole('link', { name: /services/i });
        expect(servicesLink).not.toHaveClass('text-red-600');
    });

    it('renders utility controls', () => {
        render(<DesktopNav {...defaultProps} />);

        expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
        expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    });

    it('calls handleDesktopServicesEnter when mouse enters services', () => {
        const handleDesktopServicesEnter = jest.fn();
        render(
            <DesktopNav
                {...defaultProps}
                handleDesktopServicesEnter={handleDesktopServicesEnter}
            />,
        );

        const servicesLink = screen.getByRole('link', { name: /services/i });
        fireEvent.mouseEnter(servicesLink);

        expect(handleDesktopServicesEnter).toHaveBeenCalled();
    });

    it('calls handleDesktopServicesLeave when mouse leaves services', () => {
        const handleDesktopServicesLeave = jest.fn();
        render(
            <DesktopNav
                {...defaultProps}
                handleDesktopServicesLeave={handleDesktopServicesLeave}
            />,
        );

        const servicesLink = screen.getByRole('link', { name: /services/i });
        fireEvent.mouseLeave(servicesLink);

        expect(handleDesktopServicesLeave).toHaveBeenCalled();
    });

    it('renders get started button correctly', () => {
        render(<DesktopNav {...defaultProps} />);

        const getStartedButton = screen.getByRole('link', { name: /get started/i });
        expect(getStartedButton).toHaveAttribute('href', '/en/contact');
        expect(getStartedButton).toHaveClass('bg-red-600');
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
            },
        };

        render(<DesktopNav {...spanishProps} />);

        expect(screen.getByText('Inicio')).toBeInTheDocument();
        expect(screen.getByText('Servicios')).toBeInTheDocument();
        expect(screen.getByText('Contacto')).toBeInTheDocument();
        expect(screen.getByText('Empezar')).toBeInTheDocument();
    });

    it('handles empty services sublinks gracefully', () => {
        render(<DesktopNav {...defaultProps} servicesSubLinks={[]} />);

        expect(screen.getByText('Services')).toBeInTheDocument();
        // Should not throw errors with empty sublinks
    });

    it('handles missing navDict gracefully', () => {
        render(<DesktopNav {...defaultProps} navDict={{}} />);

        // Should render navigation without crashing
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('applies correct CSS classes based on scroll state', () => {
        const { rerender } = render(<DesktopNav {...defaultProps} isScrolled={false} />);

        const nav = screen.getByRole('navigation');
        expect(nav).toHaveClass('transition-all');

        rerender(<DesktopNav {...defaultProps} isScrolled={true} />);
        expect(nav).toHaveClass('scrolled');
    });

    it('renders with correct accessibility attributes', () => {
        render(<DesktopNav {...defaultProps} />);

        const nav = screen.getByRole('navigation');
        expect(nav).toHaveAttribute('aria-label');
    });
});
