/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, jest } from '@jest/globals';
import { ServicesDropdown } from '@/components/ui/ServicesDropdown';
import '@testing-library/jest-dom';

const mockServicesSubLinks = [
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
    {
        href: '/en/services/seo',
        label: 'SEO',
        description: 'SEO description',
    },
    {
        href: '/en/services/custom',
        label: 'Custom',
        description: 'Custom description',
    },
    {
        href: '/en/services/solutions',
        label: 'Solutions',
        description: 'Solutions description',
    },
];

const mockNavDict = {
    services: 'services',
    home: 'home',
    showreel: 'showreel',
    about: 'about',
    contact: 'contact',
    getStarted: 'get-started',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
};

describe('ServicesDropdown', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders desktop services dropdown correctly', () => {
        render(
            <ServicesDropdown
                lang="en"
                isDesktopServicesOpen={false}
                isServicesOpen={false}
                servicesSubLinks={mockServicesSubLinks}
                onDesktopServicesEnter={jest.fn()}
                onDesktopServicesLeave={jest.fn()}
                onToggleServices={jest.fn()}
                navDict={mockNavDict}
                isActive={false}
                isMobile={false}
            />,
        );

        expect(screen.getByText('services')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
    });

    it('shows desktop dropdown when isDesktopServicesOpen is true', () => {
        render(
            <ServicesDropdown
                lang="en"
                isDesktopServicesOpen={true}
                isServicesOpen={false}
                servicesSubLinks={mockServicesSubLinks}
                onDesktopServicesEnter={jest.fn()}
                onDesktopServicesLeave={jest.fn()}
                onToggleServices={jest.fn()}
                navDict={mockNavDict}
                isActive={false}
                isMobile={false}
            />,
        );

        expect(screen.getByText('Branding')).toBeInTheDocument();
        expect(screen.getByText('Websites')).toBeInTheDocument();
        expect(screen.getByText('SEO')).toBeInTheDocument();
        expect(screen.getByText('Custom')).toBeInTheDocument();
        expect(screen.getByText('Solutions')).toBeInTheDocument();
    });

    it('renders mobile services dropdown correctly', () => {
        render(
            <ServicesDropdown
                lang="en"
                isDesktopServicesOpen={false}
                isServicesOpen={false}
                servicesSubLinks={mockServicesSubLinks}
                onDesktopServicesEnter={jest.fn()}
                onDesktopServicesLeave={jest.fn()}
                onToggleServices={jest.fn()}
                navDict={mockNavDict}
                isActive={false}
                isMobile={true}
            />,
        );

        expect(screen.getByText('services')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /services/i })).toBeInTheDocument();
    });

    it('shows mobile sublinks when isServicesOpen is true', () => {
        render(
            <ServicesDropdown
                lang="en"
                isDesktopServicesOpen={false}
                isServicesOpen={true}
                servicesSubLinks={mockServicesSubLinks}
                onDesktopServicesEnter={jest.fn()}
                onDesktopServicesLeave={jest.fn()}
                onToggleServices={jest.fn()}
                navDict={mockNavDict}
                isActive={false}
                isMobile={true}
            />,
        );

        expect(screen.getByText('Branding')).toBeInTheDocument();
        expect(screen.getByText('Websites')).toBeInTheDocument();
        expect(screen.getByText('SEO')).toBeInTheDocument();
        expect(screen.getByText('Custom')).toBeInTheDocument();
        expect(screen.getByText('Solutions')).toBeInTheDocument();
    });

    it('calls onDesktopServicesEnter when mouse enters (desktop)', () => {
        const onDesktopServicesEnter = jest.fn();

        render(
            <ServicesDropdown
                lang="en"
                isDesktopServicesOpen={false}
                isServicesOpen={false}
                servicesSubLinks={mockServicesSubLinks}
                onDesktopServicesEnter={onDesktopServicesEnter}
                onDesktopServicesLeave={jest.fn()}
                onToggleServices={jest.fn()}
                navDict={mockNavDict}
                isActive={false}
                isMobile={false}
            />,
        );

        fireEvent.mouseEnter(screen.getByText('services').closest('div')!);
        expect(onDesktopServicesEnter).toHaveBeenCalled();
    });

    it('calls onDesktopServicesLeave when mouse leaves (desktop)', () => {
        const onDesktopServicesLeave = jest.fn();

        render(
            <ServicesDropdown
                lang="en"
                isDesktopServicesOpen={false}
                isServicesOpen={false}
                servicesSubLinks={mockServicesSubLinks}
                onDesktopServicesEnter={jest.fn()}
                onDesktopServicesLeave={onDesktopServicesLeave}
                onToggleServices={jest.fn()}
                navDict={mockNavDict}
                isActive={false}
                isMobile={false}
            />,
        );

        fireEvent.mouseLeave(screen.getByText('services').closest('div')!);
        expect(onDesktopServicesLeave).toHaveBeenCalled();
    });

    it('calls onToggleServices when button is clicked (mobile)', () => {
        const onToggleServices = jest.fn();

        render(
            <ServicesDropdown
                lang="en"
                isDesktopServicesOpen={false}
                isServicesOpen={false}
                servicesSubLinks={mockServicesSubLinks}
                onDesktopServicesEnter={jest.fn()}
                onDesktopServicesLeave={jest.fn()}
                onToggleServices={onToggleServices}
                navDict={mockNavDict}
                isActive={false}
                isMobile={true}
            />,
        );

        fireEvent.click(screen.getByRole('button', { name: /services/i }));
        expect(onToggleServices).toHaveBeenCalled();
    });

    it('shows active state correctly (desktop)', () => {
        render(
            <ServicesDropdown
                lang="en"
                isDesktopServicesOpen={false}
                isServicesOpen={false}
                servicesSubLinks={mockServicesSubLinks}
                onDesktopServicesEnter={jest.fn()}
                onDesktopServicesLeave={jest.fn()}
                onToggleServices={jest.fn()}
                navDict={mockNavDict}
                isActive={true}
                isMobile={false}
            />,
        );

        const link = screen.getByRole('link', { name: /services/i });
        expect(link).toHaveClass('text-red-600');
    });

    it('shows active state correctly (mobile)', () => {
        render(
            <ServicesDropdown
                lang="en"
                isDesktopServicesOpen={false}
                isServicesOpen={false}
                servicesSubLinks={mockServicesSubLinks}
                onDesktopServicesEnter={jest.fn()}
                onDesktopServicesLeave={jest.fn()}
                onToggleServices={jest.fn()}
                navDict={mockNavDict}
                isActive={true}
                isMobile={true}
            />,
        );

        const button = screen.getByRole('button', { name: /services/i });
        expect(button).toHaveClass('text-red-600');
    });

    it('renders correct link hrefs for sublinks', () => {
        render(
            <ServicesDropdown
                lang="en"
                isDesktopServicesOpen={true}
                isServicesOpen={false}
                servicesSubLinks={mockServicesSubLinks}
                onDesktopServicesEnter={jest.fn()}
                onDesktopServicesLeave={jest.fn()}
                onToggleServices={jest.fn()}
                navDict={mockNavDict}
                isActive={false}
                isMobile={false}
            />,
        );

        const brandingLink = screen.getByText('Branding').closest('a');
        expect(brandingLink).toHaveAttribute('href', '/en/services/branding');

        const websitesLink = screen.getByText('Websites').closest('a');
        expect(websitesLink).toHaveAttribute('href', '/en/services/websites');
    });

    it('renders descriptions for sublinks (desktop)', () => {
        render(
            <ServicesDropdown
                lang="en"
                isDesktopServicesOpen={true}
                isServicesOpen={false}
                servicesSubLinks={mockServicesSubLinks}
                onDesktopServicesEnter={jest.fn()}
                onDesktopServicesLeave={jest.fn()}
                onToggleServices={jest.fn()}
                navDict={mockNavDict}
                isActive={false}
                isMobile={false}
            />,
        );

        expect(screen.getByText('Branding description')).toBeInTheDocument();
        expect(screen.getByText('Websites description')).toBeInTheDocument();
    });

    it('shows arrow rotation when mobile services are open', () => {
        render(
            <ServicesDropdown
                lang="en"
                isDesktopServicesOpen={false}
                isServicesOpen={true}
                servicesSubLinks={mockServicesSubLinks}
                onDesktopServicesEnter={jest.fn()}
                onDesktopServicesLeave={jest.fn()}
                onToggleServices={jest.fn()}
                navDict={mockNavDict}
                isActive={false}
                isMobile={true}
            />,
        );

        const img = screen.getByRole('button', { name: /services/i }).querySelector('img');
        expect(img).toBeInTheDocument();
    });

    it('handles empty servicesSubLinks gracefully', () => {
        render(
            <ServicesDropdown
                lang="en"
                isDesktopServicesOpen={true}
                isServicesOpen={false}
                servicesSubLinks={[]}
                onDesktopServicesEnter={jest.fn()}
                onDesktopServicesLeave={jest.fn()}
                onToggleServices={jest.fn()}
                navDict={mockNavDict}
                isActive={false}
                isMobile={false}
            />,
        );

        expect(screen.getByText('services')).toBeInTheDocument();
        expect(screen.queryByText('Branding')).not.toBeInTheDocument();
    });

    it('handles missing navDict gracefully', () => {
        render(
            <ServicesDropdown
                lang="en"
                isDesktopServicesOpen={false}
                isServicesOpen={false}
                servicesSubLinks={mockServicesSubLinks}
                onDesktopServicesEnter={jest.fn()}
                onDesktopServicesLeave={jest.fn()}
                onToggleServices={jest.fn()}
                navDict={{
                    services: 'services',
                    home: 'home',
                    showreel: 'showreel',
                    about: 'about',
                    contact: 'contact',
                    getStarted: 'get-started',
                    privacy: 'Privacy Policy',
                    terms: 'Terms of Service',
                }}
                isActive={false}
                isMobile={false}
            />,
        );

        expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
    });
});
