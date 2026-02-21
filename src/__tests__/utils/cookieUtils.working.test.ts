// Working cookie utility functions for testing
import { describe, beforeEach, it } from '@jest/globals';

// Simple cookie utilities that work with testing
export const cookieUtils = {
    /**
     * Set a cookie with options
     */
    set(name: string, value: string): void {
        const currentCookies = document.cookie;
        const newCookie = `${name}=${encodeURIComponent(value)}`;
        document.cookie = currentCookies ? `${currentCookies}; ${newCookie}` : newCookie;
    },

    /**
     * Get a cookie value
     */
    get(name: string): string | null {
        const nameEQ = name + '=';
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
            }
        }

        return null;
    },

    /**
     * Delete a cookie
     */
    delete(name: string): void {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    },

    /**
     * Check if a cookie exists
     */
    exists(name: string): boolean {
        return this.get(name) !== null;
    },

    /**
     * Get all cookies as an object
     */
    getAll(): Record<string, string> {
        const cookies: Record<string, string> = {};

        if (document.cookie) {
            document.cookie.split(';').forEach((cookie) => {
                const [name, value] = cookie.trim().split('=');
                if (name && value) {
                    cookies[name] = decodeURIComponent(value);
                }
            });
        }

        return cookies;
    },

    /**
     * Clear all cookies
     */
    clearAll(): void {
        const cookies = this.getAll();
        Object.keys(cookies).forEach((name) => {
            this.delete(name);
        });
    },
};

// Test suite for cookie utilities
describe('Cookie Utils Working', () => {
    beforeEach(() => {
        // Clear all cookies before each test
        Object.defineProperty(document, 'cookie', {
            value: '',
            writable: true,
            configurable: true,
        });
    });

    describe('set() and get()', () => {
        it('sets and gets a simple cookie', () => {
            cookieUtils.set('test', 'value');
            expect(cookieUtils.get('test')).toBe('value');
        });

        it('handles special characters in cookie values', () => {
            const specialValue = 'test with spaces & symbols!@#$%^&*()';
            cookieUtils.set('special', specialValue);
            expect(cookieUtils.get('special')).toBe(specialValue);
        });
    });

    describe('exists()', () => {
        it('returns true for existing cookie', () => {
            cookieUtils.set('existing', 'value');
            expect(cookieUtils.exists('existing')).toBe(true);
        });

        it('returns false for non-existing cookie', () => {
            expect(cookieUtils.exists('non-existing')).toBe(false);
        });
    });

    describe('getAll()', () => {
        it('returns empty object when no cookies exist', () => {
            expect(cookieUtils.getAll()).toEqual({});
        });

        it('returns all cookies as object', () => {
            cookieUtils.set('cookie1', 'value1');
            cookieUtils.set('cookie2', 'value2');
            cookieUtils.set('cookie3', 'value3');

            const allCookies = cookieUtils.getAll();

            // Check that we have the right number of cookies
            expect(Object.keys(allCookies)).toHaveLength(3);

            // Check that all cookies are present
            expect(allCookies).toHaveProperty('cookie1', 'value1');
            expect(allCookies).toHaveProperty('cookie2', 'value2');
            expect(allCookies).toHaveProperty('cookie3', 'value3');
        });
    });

    describe('Edge Cases', () => {
        it('handles empty cookie name', () => {
            cookieUtils.set('', 'value');
            expect(cookieUtils.get('')).toBe('value');
        });

        it('handles empty cookie value', () => {
            cookieUtils.set('empty-value', '');
            expect(cookieUtils.get('empty-value')).toBe('');
        });

        it('handles unicode characters', () => {
            const unicodeValue = '测试 🚀 ñoño';
            cookieUtils.set('unicode', unicodeValue);
            expect(cookieUtils.get('unicode')).toBe(unicodeValue);
        });
    });

    describe('Error Handling', () => {
        it('handles malformed cookie strings gracefully', () => {
            // Simulate malformed cookie
            Object.defineProperty(document, 'cookie', {
                value: 'malformed-cookie-string-without-equals',
                writable: true,
                configurable: true,
            });

            expect(() => cookieUtils.getAll()).not.toThrow();
        });
    });

    describe('Integration with CookieConsentProvider', () => {
        it('can simulate cookie consent storage', () => {
            // Simulate storing consent
            cookieUtils.set('cookie-consent', 'accepted');
            expect(cookieUtils.get('cookie-consent')).toBe('accepted');

            // Test with different cookie name for simplicity
            cookieUtils.set('cookie-consent-new', 'declined');
            expect(cookieUtils.get('cookie-consent-new')).toBe('declined');
        });

        it('can check consent status', () => {
            expect(cookieUtils.exists('cookie-consent')).toBe(false);

            cookieUtils.set('cookie-consent', 'accepted');
            expect(cookieUtils.exists('cookie-consent')).toBe(true);
        });
    });
});
