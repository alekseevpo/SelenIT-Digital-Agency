// Cookie utility functions for testing
import { describe, beforeEach, it } from '@jest/globals';
export interface CookieOptions {
    domain?: string;
    path?: string;
    expires?: Date;
    maxAge?: number;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
}

// Cookie utility functions
export const cookieUtils = {
    /**
     * Set a cookie with options
     */
    set(name: string, value: string, options: CookieOptions = {}): void {
        let cookieString = `${name}=${encodeURIComponent(value)}`;

        if (options.expires) {
            cookieString += `; expires=${options.expires.toUTCString()}`;
        }

        if (options.maxAge) {
            cookieString += `; max-age=${options.maxAge}`;
        }

        if (options.domain) {
            cookieString += `; domain=${options.domain}`;
        }

        if (options.path) {
            cookieString += `; path=${options.path}`;
        }

        if (options.secure) {
            cookieString += '; secure';
        }

        if (options.httpOnly) {
            cookieString += '; httponly';
        }

        if (options.sameSite) {
            cookieString += `; samesite=${options.sameSite}`;
        }

        document.cookie = cookieString;
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
    delete(name: string, options: Pick<CookieOptions, 'domain' | 'path'> = {}): void {
        if (typeof document !== 'undefined') {
            // Standard approach to delete cookie
            this.set(name, '', {
                ...options,
                expires: new Date(0),
                maxAge: -1,
            });
        }
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

                    // Handle deletion - check for empty value or deletion attributes
                    if (
                        value === '' ||
                        newCookie.includes('max-age=-1') ||
                        newCookie.includes('expires=Thu, 01 Jan 1970')
                    ) {
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
        // Mock document.cookie
        Object.defineProperty(document, 'cookie', {
            get: () => mockCookie.value,
            set: (val: string) => {
                mockCookie.value = val;
            },
            writable: true,
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

        it('sets cookie with path option', () => {
            cookieUtils.set('path-test', 'value', { path: '/test' });
            expect(cookieUtils.get('path-test')).toBe('value');
        });

        it('sets cookie with domain option', () => {
            cookieUtils.set('domain-test', 'value', { domain: 'example.com' });
            expect(cookieUtils.get('domain-test')).toBe('value');
        });

        it('sets cookie with expiration date', () => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 7);

            cookieUtils.set('expire-test', 'value', { expires: futureDate });
            expect(cookieUtils.get('expire-test')).toBe('value');
        });

        it('sets cookie with max-age', () => {
            cookieUtils.set('maxage-test', 'value', { maxAge: 3600 });
            expect(cookieUtils.get('maxage-test')).toBe('value');
        });

        it('sets secure cookie', () => {
            cookieUtils.set('secure-test', 'value', { secure: true });
            expect(cookieUtils.get('secure-test')).toBe('value');
            expect(document.cookie).toContain('secure');
        });

        it('sets httpOnly cookie', () => {
            cookieUtils.set('httponly-test', 'value', { httpOnly: true });
            expect(cookieUtils.get('httponly-test')).toBe('value');
            expect(document.cookie).toContain('httponly');
        });

        it('sets sameSite cookie', () => {
            cookieUtils.set('samesite-test', 'value', { sameSite: 'strict' });
            expect(cookieUtils.get('samesite-test')).toBe('value');
            expect(document.cookie).toContain('samesite=strict');
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

        it('deletes cookie with path', () => {
            cookieUtils.set('delete-path', 'value', { path: '/test' });
            cookieUtils.delete('delete-path', { path: '/test' });
            expect(cookieUtils.get('delete-path')).toBe(null);
        });

        it('deletes cookie with domain', () => {
            cookieUtils.set('delete-domain', 'value', { domain: 'example.com' });
            cookieUtils.delete('delete-domain', { domain: 'example.com' });
            expect(cookieUtils.get('delete-domain')).toBe(null);
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

        it('handles cookies with special characters', () => {
            const specialValue = 'special value with spaces & symbols';
            cookieUtils.set('special', specialValue);

            const allCookies = cookieUtils.getAll();
            expect(allCookies.special).toBe(specialValue);
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

        it('handles very long cookie values', () => {
            const longValue = 'a'.repeat(4000); // 4KB string
            cookieUtils.set('long', longValue);
            expect(cookieUtils.get('long')).toBe(longValue);
        });

        it('handles unicode characters', () => {
            const unicodeValue = '测试 🚀 ñoño';
            cookieUtils.set('unicode', unicodeValue);
            expect(cookieUtils.get('unicode')).toBe(unicodeValue);
        });

        it('handles multiple cookies with similar names', () => {
            cookieUtils.set('test', 'value1');
            cookieUtils.set('testing', 'value2');
            cookieUtils.set('tested', 'value3');

            expect(cookieUtils.get('test')).toBe('value1');
            expect(cookieUtils.get('testing')).toBe('value2');
            expect(cookieUtils.get('tested')).toBe('value3');
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

        it('handles cookie name with spaces', () => {
            cookieUtils.set('cookie with spaces', 'value');
            expect(cookieUtils.get('cookie with spaces')).toBe('value');
        });
    });
});
