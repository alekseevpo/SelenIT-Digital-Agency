import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import '../globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { CookieConsentProvider } from '@/components/providers/CookieConsentProvider';
import { CookieConsentWrapper } from '@/components/providers/CookieConsentWrapper';
import { AnalyticsWrapper } from '@/components/providers/AnalyticsWrapper';
import type { Locale } from '@/i18n-config';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/components/providers/PageTransition';
import BackToTop from '@/components/ui/BackToTop';
import ChatWidget from '@/components/ui/ChatWidget';
import { OrganizationJsonLd, WebSiteJsonLd, LocalBusinessJsonLd } from '@/components/seo/JsonLd';

const inter = Inter({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-inter',
    display: 'swap',
});

const ttFrantz = localFont({
    src: [
        {
            path: '../../../public/fonts/TT-Frantz-Trial-Variable-BF6694e95051de0.ttf',
            weight: '100 900',
            style: 'normal',
        },
    ],
    variable: '--font-frantz',
    display: 'swap',
});

import { getDictionary } from '@/get-dictionary';
import { i18n } from '@/i18n-config';

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: {
            template: `%s | Selen.IT Digital Agency`,
            default: `Selen.IT | Digital Agency - Web Development & Design`,
        },
        description: dict.hero.subtitle,
        keywords: ['web development', 'digital agency', 'web design', 'UI/UX', 'React', 'Next.js', 'software engineering'],
        authors: [{ name: 'Selen.IT Digital Agency' }],
        metadataBase: new URL('https://selen.it'),
        alternates: {
            canonical: `/${lang}`,
            languages: {
                'en-US': '/en',
                'ru-RU': '/ru',
                'es-ES': '/es',
            },
        },
        openGraph: {
            title: 'Selen.IT | Digital Agency',
            description: dict.hero.subtitle,
            type: 'website',
            url: `https://selen.it/${lang}`,
            locale: lang === 'ru' ? 'ru_RU' : lang === 'es' ? 'es_ES' : 'en_US',
            siteName: 'Selen.IT Digital Agency',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: 'Selen.IT Digital Agency Preview',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Selen.IT | Digital Agency',
            description: dict.hero.subtitle,
            images: ['/og-image.png'],
            creator: '@selen_it',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        icons: {
            icon: '/favicon.ico',
            shortcut: '/favicon-16x16.png',
            apple: '/apple-touch-icon.png',
        },
    };
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <html lang={lang} suppressHydrationWarning>
            <head>
                <OrganizationJsonLd url="https://selen.it" lang={lang} />
                <WebSiteJsonLd url="https://selen.it" lang={lang} />
                <LocalBusinessJsonLd url="https://selen.it" />
            </head>
            <body className={`${inter.variable} ${ttFrantz.variable} font-sans antialiased transition-colors duration-300`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <CookieConsentProvider>
                        <SmoothScrollProvider>
                            <Header lang={lang as Locale} />
                            <main className="min-h-screen transition-colors duration-300">
                                <PageTransition>
                                    {children}
                                </PageTransition>
                            </main>
                            <Footer lang={lang as Locale} dict={dict} />
                        </SmoothScrollProvider>
                        <CookieConsentWrapper lang={lang} dictionary={dict.cookies} />
                        <AnalyticsWrapper />
                        <BackToTop />
                        <ChatWidget />
                    </CookieConsentProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
