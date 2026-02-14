import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import { RecaptchaNotice } from '@/components/ui/RecaptchaNotice';
import '@/__tests__/types';

describe('RecaptchaNotice Component', () => {
    beforeEach(() => {
        // Mock console methods to avoid noise in tests
        jest.spyOn(console, 'log').mockImplementation();
        jest.spyOn(console, 'warn').mockImplementation();
        jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders recaptcha notice for English', () => {
        render(<RecaptchaNotice lang="en" />);

        expect(screen.getByText('Protected by reCAPTCHA')).toBeInTheDocument();
        expect(screen.getByText('Privacy')).toBeInTheDocument();
        expect(screen.getByText('Terms')).toBeInTheDocument();
    });

    it('renders recaptcha notice for Russian', () => {
        render(<RecaptchaNotice lang="ru" />);

        expect(screen.getByText('Защищено reCAPTCHA')).toBeInTheDocument();
        expect(screen.getByText('Конфиденциальность')).toBeInTheDocument();
        expect(screen.getByText('Условия')).toBeInTheDocument();
    });

    it('renders recaptcha notice for Spanish', () => {
        render(<RecaptchaNotice lang="es" />);

        expect(screen.getByText('Protegido por reCAPTCHA')).toBeInTheDocument();
        expect(screen.getByText('Privacidad')).toBeInTheDocument();
        expect(screen.getByText('Términos')).toBeInTheDocument();
    });

    it('has correct CSS classes', () => {
        render(<RecaptchaNotice lang="en" />);

        const container = screen.getByText('Protected by reCAPTCHA').closest('div');
        expect(container).toHaveClass(
            'mt-8',
            'flex',
            'flex-col',
            'items-center',
            'gap-1.5',
            'opacity-60',
        );
    });

    it('has correct text styling', () => {
        render(<RecaptchaNotice lang="en" />);

        const mainText = screen.getByText('Protected by reCAPTCHA');
        expect(mainText).toHaveClass(
            'text-[9px]',
            'text-slate-500',
            'dark:text-dark-500',
            'text-center',
            'font-bold',
            'uppercase',
            'tracking-[0.2em]',
        );
    });

    it('has correct link styling', () => {
        render(<RecaptchaNotice lang="en" />);

        const privacyLink = screen.getByText('Privacy');
        const termsLink = screen.getByText('Terms');

        expect(privacyLink).toHaveClass(
            'hover:text-primary-500',
            'transition-colors',
            'underline',
            'decoration-dotted',
            'underline-offset-4',
        );
        expect(termsLink).toHaveClass(
            'hover:text-primary-500',
            'transition-colors',
            'underline',
            'decoration-dotted',
            'underline-offset-4',
        );
    });

    it('has correct link attributes', () => {
        render(<RecaptchaNotice lang="en" />);

        const privacyLink = screen.getByText('Privacy');
        const termsLink = screen.getByText('Terms');

        expect(privacyLink).toHaveAttribute('href', 'https://policies.google.com/privacy');
        expect(privacyLink).toHaveAttribute('target', '_blank');
        expect(privacyLink).toHaveAttribute('rel', 'noopener noreferrer');

        expect(termsLink).toHaveAttribute('href', 'https://policies.google.com/terms');
        expect(termsLink).toHaveAttribute('target', '_blank');
        expect(termsLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders links in correct container', () => {
        render(<RecaptchaNotice lang="en" />);

        const linksContainer = screen.getByText('Privacy').closest('div');
        expect(linksContainer).toHaveClass(
            'flex',
            'items-center',
            'gap-2',
            'text-[9px]',
            'text-slate-500',
            'dark:text-dark-500',
            'font-bold',
            'uppercase',
            'tracking-[0.2em]',
        );
    });

    it('has separator between links', () => {
        render(<RecaptchaNotice lang="en" />);

        const separator = document.querySelector('.text-[8px]');
        expect(separator).toBeInTheDocument();
        expect(separator).toHaveTextContent('&');
    });

    it('renders all elements in correct order', () => {
        render(<RecaptchaNotice lang="en" />);

        const container = screen.getByText('Protected by reCAPTCHA').closest('div')!;
        const children = container.children;

        expect(children[0]).toHaveTextContent('Protected by reCAPTCHA');
        expect(children[1]).toHaveClass('flex', 'items-center', 'gap-2');
    });

    it('handles unknown language gracefully', () => {
        render(<RecaptchaNotice lang="unknown" />);

        // Should fallback to English
        expect(screen.getByText('Protected by reCAPTCHA')).toBeInTheDocument();
        expect(screen.getByText('Privacy')).toBeInTheDocument();
        expect(screen.getByText('Terms')).toBeInTheDocument();
    });
});
