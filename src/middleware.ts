import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    const locales = i18n.locales as unknown as string[];
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    // Filter out wildcards and invalid locale strings
    languages = languages.filter((lang) => lang !== '*' && /^[a-zA-Z]{2,3}(-[a-zA-Z]{2,3})?$/.test(lang));

    // If no valid languages, return default
    if (languages.length === 0) {
        return i18n.defaultLocale;
    }

    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                request.url
            )
        );
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.html$).*)'],
};
