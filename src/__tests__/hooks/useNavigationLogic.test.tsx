import { act, waitFor } from '@testing-library/react';
import { describe, it, jest, beforeEach, beforeAll } from '@jest/globals';
import { useNavigationLogic } from '@/hooks/useNavigationLogic';
import type { Dictionary } from '@/types/dictionary';
import { renderHook as renderHookCustom } from '../utils/renderHook';

// Mock window methods
Object.defineProperty(window, 'scrollY', { writable: true, value: 0 });
Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 });
Object.defineProperty(window, 'addEventListener', { writable: true, value: jest.fn() });
Object.defineProperty(window, 'removeEventListener', { writable: true, value: jest.fn() });

// Mock document methods cleanly
beforeAll(() => {
    Object.defineProperty(document.documentElement, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 1024,
    });
});

// Mock usePathname
jest.mock('next/navigation', () => ({
    usePathname: () => '/en',
}));

const mockDict = {
    common: {
        nav: {
            home: 'Home',
            services: 'Services',
            showreel: 'Showreel',
            about: 'About',
            contact: 'Contact',
            getStarted: 'Get Started',
            privacy: 'Privacy Policy',
            terms: 'Terms of Service',
        },
        header: {
            menu: 'Menu',
            closeMenu: 'Close',
            openMenu: 'Open',
            language: 'Language',
        },
    },
    services: {
        title: 'Services',
        subtitle: 'Our services',
        menuLinks: {
            branding: { label: 'Branding', description: 'Branding description' },
            websites: { label: 'Websites', description: 'Websites description' },
            seo: { label: 'SEO', description: 'SEO description' },
            custom: { label: 'Custom', description: 'Custom description' },
            solutions: { label: 'Solutions', description: 'Solutions description' },
        },
    },
    home: {
        title: 'Home',
        subtitle: 'Welcome',
    },
    hero: {},
    testimonials: [],
    cookies: {
        title: 'Cookie Settings',
        message: 'We use cookies',
        accept: 'Accept',
        decline: 'Decline',
    },
    contact: {
        title: 'Contact',
        subtitle: 'Get in touch',
    },
    showreel: {
        title: 'Showreel',
        subtitle: 'Our work',
    },
    about: {
        title: 'About',
        subtitle: 'About us',
    },
} as unknown as Dictionary;

describe('useNavigationLogic', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        window.scrollY = 0;
        document.body.style.cssText =
            'position: ""; top: ""; left: ""; right: ""; width: ""; overflow: ""; paddingRight: "";';
    });

    it('should initialize with default values', () => {
        const { result } = renderHookCustom(() =>
            useNavigationLogic({ lang: 'en', dict: mockDict }),
        );

        expect(result.current.isScrolled).toBe(false);
        expect(result.current.isMobileMenuOpen).toBe(false);
        expect(result.current.isServicesOpen).toBe(false);
        expect(result.current.isDesktopServicesOpen).toBe(false);
        expect(result.current.pathname).toBe('/en');
    });

    it('should handle scroll detection', () => {
        const { result } = renderHookCustom(() =>
            useNavigationLogic({ lang: 'en', dict: mockDict }),
        );

        expect(result.current.isScrolled).toBe(false);

        act(() => {
            window.scrollY = 30;
            const scrollEvent = new Event('scroll');
            window.dispatchEvent(scrollEvent);
        });

        expect(result.current.isScrolled).toBe(true);
    });

    it('should hide top elements on scroll down, and show on scroll up', () => {
        const { result } = renderHookCustom(() =>
            useNavigationLogic({ lang: 'en', dict: mockDict }),
        );

        expect(result.current.isTopElementsHidden).toBe(false);

        // Scroll down past 100
        act(() => {
            window.scrollY = 120;
            window.dispatchEvent(new Event('scroll'));
        });
        expect(result.current.isTopElementsHidden).toBe(true);

        // Scroll up
        act(() => {
            window.scrollY = 100;
            window.dispatchEvent(new Event('scroll'));
        });
        expect(result.current.isTopElementsHidden).toBe(false);

        // Scroll to top
        act(() => {
            window.scrollY = 10;
            window.dispatchEvent(new Event('scroll'));
        });
        expect(result.current.isTopElementsHidden).toBe(false);
    });

    it('should toggle mobile menu', () => {
        const { result } = renderHookCustom(() =>
            useNavigationLogic({ lang: 'en', dict: mockDict }),
        );

        expect(result.current.isMobileMenuOpen).toBe(false);

        act(() => {
            result.current.toggleMobileMenu();
        });

        expect(result.current.isMobileMenuOpen).toBe(true);

        act(() => {
            result.current.toggleMobileMenu();
        });

        expect(result.current.isMobileMenuOpen).toBe(false);
    });

    it('should toggle services menu', () => {
        const { result } = renderHookCustom(() =>
            useNavigationLogic({ lang: 'en', dict: mockDict }),
        );

        expect(result.current.isServicesOpen).toBe(false);

        act(() => {
            result.current.toggleServices();
        });

        expect(result.current.isServicesOpen).toBe(true);

        act(() => {
            result.current.toggleServices();
        });

        expect(result.current.isServicesOpen).toBe(false);
    });

    it('should handle desktop services hover', () => {
        const { result } = renderHookCustom(() =>
            useNavigationLogic({ lang: 'en', dict: mockDict }),
        );

        expect(result.current.isDesktopServicesOpen).toBe(false);

        act(() => {
            result.current.handleDesktopServicesEnter();
        });

        expect(result.current.isDesktopServicesOpen).toBe(true);

        act(() => {
            result.current.handleDesktopServicesLeave();
        });

        expect(result.current.isDesktopServicesOpen).toBe(false);
    });

    it('should close menu when closeMenu is called', () => {
        const { result } = renderHookCustom(() =>
            useNavigationLogic({ lang: 'en', dict: mockDict }),
        );

        act(() => {
            result.current.toggleMobileMenu();
            result.current.toggleServices();
        });

        expect(result.current.isMobileMenuOpen).toBe(true);
        expect(result.current.isServicesOpen).toBe(true);

        act(() => {
            result.current.closeMenu();
        });

        expect(result.current.isMobileMenuOpen).toBe(false);
        expect(result.current.isServicesOpen).toBe(false);
    });

    it('should manage body scroll when mobile menu is open', () => {
        const { result } = renderHookCustom(() =>
            useNavigationLogic({ lang: 'en', dict: mockDict }),
        );

        act(() => {
            result.current.toggleMobileMenu();
        });

        expect(document.body.style.position).toBe('fixed');
        expect(document.body.style.overflow).toBe('hidden');

        act(() => {
            result.current.closeMenu();
        });

        expect(document.body.style.position).toBe('');
        expect(document.body.style.overflow).toBe('');
    });

    it('should handle keyboard navigation (Escape key)', async () => {
        const { result } = renderHookCustom(() =>
            useNavigationLogic({ lang: 'en', dict: mockDict }),
        );

        act(() => {
            result.current.toggleMobileMenu();
        });

        expect(result.current.isMobileMenuOpen).toBe(true);

        act(() => {
            const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
            window.dispatchEvent(escapeEvent);
        });

        await waitFor(() => {
            expect(result.current.isMobileMenuOpen).toBe(false);
        });
    });

    it('should generate correct services sublinks', () => {
        const { result } = renderHookCustom(() =>
            useNavigationLogic({ lang: 'en', dict: mockDict }),
        );

        expect(result.current.servicesSubLinks).toHaveLength(5);
        expect(result.current.servicesSubLinks[0]).toEqual({
            href: '/en/services/branding',
            label: 'Branding',
            description: 'Branding description',
        });
    });

    it('should provide access to dictionary data', () => {
        const { result } = renderHookCustom(() =>
            useNavigationLogic({ lang: 'en', dict: mockDict }),
        );

        expect(result.current.navDict).toBeDefined();
        expect(result.current.headerDict).toBeDefined();
        expect(result.current.navDict.home).toBe('Home');
        expect(result.current.headerDict.menu).toBe('Menu');
    });

    it('should handle different languages', () => {
        const spanishDict = { ...mockDict };
        spanishDict.common.nav.home = 'Inicio';
        spanishDict.common.nav.services = 'Servicios';

        const { result } = renderHookCustom(() =>
            useNavigationLogic({ lang: 'es', dict: spanishDict }),
        );

        expect(result.current.servicesSubLinks[0].href).toBe('/es/services/branding');
    });

    it('should handle scroll bar width calculation', () => {
        const { result } = renderHookCustom(() =>
            useNavigationLogic({ lang: 'en', dict: mockDict }),
        );

        // Mock scrollbar width
        Object.defineProperty(window, 'innerWidth', { writable: true, value: 1000 });
        Object.defineProperty(document, 'documentElement', {
            writable: true,
            value: { clientWidth: 980 },
        });

        act(() => {
            result.current.toggleMobileMenu();
        });

        expect(document.body.style.paddingRight).toBe('20px');
    });

    it('should restore scroll position on menu close', () => {
        const { result } = renderHookCustom(() =>
            useNavigationLogic({ lang: 'en', dict: mockDict }),
        );
        const scrollToSpy = jest.spyOn(window, 'scrollTo');

        act(() => {
            result.current.toggleMobileMenu();
        });

        act(() => {
            result.current.closeMenu();
        });

        expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    });
});
