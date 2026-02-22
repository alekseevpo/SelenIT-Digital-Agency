import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/types/dictionary';

interface NavigationLogicProps {
    lang: Locale;
    dict: Dictionary;
}

interface ServicesSubLink {
    href: string;
    label: string;
    description: string;
}

export function useNavigationLogic({ lang, dict }: NavigationLogicProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isTopElementsHidden, setIsTopElementsHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false);
    const pathname = usePathname();
    const navDict = dict.common.nav;
    const headerDict = dict.common.header;
    const servicesMenu = dict.services.menuLinks;

    const servicesSubLinks: ServicesSubLink[] = [
        {
            href: `/${lang}/services/branding`,
            label: servicesMenu.branding.label,
            description: servicesMenu.branding.description,
        },
        {
            href: `/${lang}/services/websites`,
            label: servicesMenu.websites.label,
            description: servicesMenu.websites.description,
        },
        {
            href: `/${lang}/services/seo`,
            label: servicesMenu.seo.label,
            description: servicesMenu.seo.description,
        },
        {
            href: `/${lang}/services/custom`,
            label: servicesMenu.custom.label,
            description: servicesMenu.custom.description,
        },
        {
            href: `/${lang}/services/solutions`,
            label: servicesMenu.solutions.label,
            description: servicesMenu.solutions.description,
        },
    ];

    // Scroll detection
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Standard scrolled state (for header background)
            setIsScrolled(currentScrollY > 20);

            // Smart header state (hiding elements based on direction)
            if (currentScrollY <= 20) {
                // Always show at the very top
                setIsTopElementsHidden(false);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down past 100px - hide
                setIsTopElementsHidden(true);
            } else if (currentScrollY < lastScrollY - 5) {
                // Scrolling up by at least 5px - show
                setIsTopElementsHidden(false);
            }

            lastScrollY = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            // Save current scroll position
            const scrollY = window.scrollY;
            const scrollBarWidth = Math.max(
                0,
                window.innerWidth - document.documentElement.clientWidth,
            );
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = scrollBarWidth ? `${scrollBarWidth}px` : '';
        } else {
            // Restore scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isMobileMenuOpen]);

    // Keyboard navigation
    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isMobileMenuOpen]);

    const closeMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
    }, []);

    // Close menu on route change
    useEffect(() => {
        const cleanup = () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };

        closeMenu();
        cleanup();
    }, [pathname, closeMenu]);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen((prev) => !prev);
    }, []);

    const toggleServices = useCallback(() => {
        setIsServicesOpen((prev) => !prev);
    }, []);

    const handleDesktopServicesEnter = useCallback(() => {
        setIsDesktopServicesOpen(true);
    }, []);

    const handleDesktopServicesLeave = useCallback(() => {
        setIsDesktopServicesOpen(false);
    }, []);

    return {
        // State
        isScrolled,
        isTopElementsHidden,
        isMobileMenuOpen,
        isServicesOpen,
        isDesktopServicesOpen,
        pathname,

        // Data
        navDict,
        headerDict,
        servicesSubLinks,

        // Actions
        closeMenu,
        toggleMobileMenu,
        toggleServices,
        handleDesktopServicesEnter,
        handleDesktopServicesLeave,
    };
}
