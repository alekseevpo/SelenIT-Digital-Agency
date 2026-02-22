import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, jest } from '@jest/globals';
import { DesktopNav } from '@/components/ui/DesktopNav';
import '@/__tests__/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        nav: ({ children }: any) => <nav>{children}</nav>,
        div: ({ children, className, 'data-testid': testId }: any) => (
            <div className={className} data-testid={testId}>
                {children}
            </div>
        ),
    },
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
    usePathname: () => '/en',
}));

// Mock DesktopThemeToggle
jest.mock('@/components/ui/DesktopThemeToggle', () => ({
    __esModule: true,
    DesktopThemeToggle: () => <button data-testid="theme-toggle">Theme</button>,
}));

// Mock LanguageSwitcher
jest.mock('@/components/ui/LanguageSwitcher', () => ({
    __esModule: true,
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
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
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
        isTopElementsHidden: false,
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
    });

    it('applies scrolled class when isScrolled is true', () => {
        render(<DesktopNav {...defaultProps} isScrolled={true} />);

        const nav = screen.getByRole('navigation');
        const motionDiv = nav.firstElementChild;
        expect(motionDiv).toHaveClass('shadow-[0_8px_32px_rgba(0,0,0,0.12)]');
    });

    it('does not apply scrolled class when isScrolled is false', () => {
        render(<DesktopNav {...defaultProps} isScrolled={false} />);

        const nav = screen.getByRole('navigation');
        expect(nav).not.toHaveClass('scrolled');
    });

    it('hides utility controls when isTopElementsHidden is true', () => {
        const { container } = render(<DesktopNav {...defaultProps} isTopElementsHidden={true} />);

        // The utility controls container should have -translate-y-20
        const utilityContainer = container.querySelector('.hidden.md\\:flex');
        expect(utilityContainer).toHaveClass('-translate-y-20');
        expect(utilityContainer).toHaveClass('opacity-0');
        expect(utilityContainer).toHaveClass('pointer-events-none');
    });

    it('shows utility controls when isTopElementsHidden is false', () => {
        const { container } = render(<DesktopNav {...defaultProps} isTopElementsHidden={false} />);

        const utilityContainer = container.querySelector('.hidden.md\\:flex');
        expect(utilityContainer).toHaveClass('translate-y-0');
        expect(utilityContainer).toHaveClass('opacity-100');
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
        render(<DesktopNav {...defaultProps} isScrolled={false} />);

        // Instead of test IDs, query the actual rendered controls by their accessible roles
        expect(screen.getByRole('button', { name: /switch to (dark|light) mode/i })).toBeInTheDocument();
        expect(screen.getByRole('group', { name: /select language/i })).toBeInTheDocument();
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
        };

        render(<DesktopNav {...spanishProps} />);

        expect(screen.getByText('Inicio')).toBeInTheDocument();
        expect(screen.getByText('Servicios')).toBeInTheDocument();
        expect(screen.getByText('Contacto')).toBeInTheDocument();
    });

    it('handles empty services sublinks gracefully', () => {
        render(<DesktopNav {...defaultProps} servicesSubLinks={[]} />);

        expect(screen.getByText('Services')).toBeInTheDocument();
        // Should not throw errors with empty sublinks
    });

    it('handles missing navDict gracefully', () => {
        render(
            <DesktopNav
                {...defaultProps}
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

    it('applies correct CSS classes based on scroll state', () => {
        const { rerender } = render(<DesktopNav {...defaultProps} isScrolled={false} />);

        const nav = screen.getByRole('navigation');
        const motionDiv = nav.firstElementChild;
        expect(motionDiv).toHaveClass('transition-all');

        rerender(<DesktopNav {...defaultProps} isScrolled={true} />);
        expect(motionDiv).toHaveClass('shadow-[0_8px_32px_rgba(0,0,0,0.12)]');
    });

    it('renders with correct accessibility attributes', () => {
        render(<DesktopNav {...defaultProps} />);

        const nav = screen.getByRole('navigation');
        expect(nav).toHaveAttribute('aria-label');
    });
});
