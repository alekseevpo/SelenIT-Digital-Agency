import { useState, useCallback, useEffect } from 'react';

declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

export function useRecaptcha() {
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && !document.getElementById('recaptcha-script')) {
            const script = document.createElement('script');
            script.id = 'recaptcha-script';
            script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                window.grecaptcha.ready(() => {
                    setRecaptchaLoaded(true);
                });
            };
            document.head.appendChild(script);
        } else if (typeof window !== 'undefined' && window.grecaptcha) {
            window.grecaptcha.ready(() => {
                setRecaptchaLoaded(true);
            });
        }
    }, []);

    const getRecaptchaToken = useCallback(async (): Promise<string | null> => {
        if (!recaptchaLoaded || !window.grecaptcha) {
            return null;
        }
        try {
            const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
                action: 'contact_form',
            });
            return token;
        } catch (error) {
            console.error('reCAPTCHA error:', error);
            return null;
        }
    }, [recaptchaLoaded]);

    return {
        recaptchaLoaded,
        getRecaptchaToken,
    };
}
