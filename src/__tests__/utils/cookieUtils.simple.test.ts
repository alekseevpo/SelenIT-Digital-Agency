// Simple cookie utility functions for testing
import { describe, beforeEach, it } from '@jest/globals';

// Simple cookie utilities for testing
export const cookieUtils = {
    /**
     * Set a cookie with options
     */
    set(name: string, value: string): void {
        document.cookie = `${name}=${encodeURIComponent(value)}`;
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

// Mock document.cookie for testing
const mockCookie = (() => {
    let cookieStore: Record<string, string> = {};

    return {
        get value(): string {
            return Object.entries(cookieStore)
                .map(([name, value]) => `${name}=${value}`)
                .join('; ');
        },
        set value(newCookie: string) {
            // Parse cookie string and update store
            newCookie.split(';').forEach((cookie) => {
                const [name, ...valueParts] = cookie.trim().split('=');
                if (typeof name === 'string' && valueParts.length > 0) {
                    const value = valueParts.join('=');

                    // Handle deletion - check for expiration in the past
                    if (newCookie.includes('expires=Thu, 01 Jan 1970')) {
                        delete cookieStore[name];
                    } else {
                        cookieStore[name] = value;
                    }
                }
            });
        },
    };
})();

// Test suite for cookie utilities
describe('Cookie Utils', () => {
    beforeEach(() => {
        Object.defineProperty(document, 'cookie', {
            get: () => mockCookie.value,
            set: (val) => {
                mockCookie.value = val;
            },
            configurable: true,
        });

        // Clear all cookies before each test
        cookieUtils.clearAll();
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

        it('returns false for deleted cookie', () => {
            cookieUtils.set('to-delete', 'value');
            expect(cookieUtils.exists('to-delete')).toBe(true);

            cookieUtils.delete('to-delete');
            expect(cookieUtils.exists('to-delete')).toBe(false);
        });
    });

    describe('delete()', () => {
        it('deletes a cookie', () => {
            cookieUtils.set('delete-me', 'value');
            expect(cookieUtils.get('delete-me')).toBe('value');

            cookieUtils.delete('delete-me');
            expect(cookieUtils.get('delete-me')).toBe(null);
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
            expect(allCookies).toEqual({
                cookie1: 'value1',
                cookie2: 'value2',
                cookie3: 'value3',
            });
        });
    });

    describe('clearAll()', () => {
        it('clears all cookies', () => {
            cookieUtils.set('keep1', 'value1');
            cookieUtils.set('keep2', 'value2');
            cookieUtils.set('keep3', 'value3');

            expect(cookieUtils.getAll()).toEqual({
                keep1: 'value1',
                keep2: 'value2',
                keep3: 'value3',
            });

            cookieUtils.clearAll();
            expect(cookieUtils.getAll()).toEqual({});
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
});
