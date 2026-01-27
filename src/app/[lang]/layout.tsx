import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import type { Locale } from '@/i18n-config';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'Selen.IT | Digital Agency - Web Development & Design',
    description: 'We craft stunning, high-performance websites and digital experiences that elevate your brand. Expert web development, UI/UX design, and digital solutions.',
    keywords: ['web development', 'digital agency', 'web design', 'UI/UX', 'React', 'Next.js'],
    authors: [{ name: 'Selen.IT Digital Agency' }],
    openGraph: {
        title: 'Selen.IT | Digital Agency',
        description: 'We craft stunning, high-performance websites and digital experiences that elevate your brand.',
        type: 'website',
        locale: 'en_US',
        siteName: 'Selen.IT Digital Agency',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Selen.IT | Digital Agency',
        description: 'We craft stunning, high-performance websites and digital experiences.',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
    params: { lang },
}: {
    children: React.ReactNode;
    params: { lang: string };
}) {
    return (
        <html lang={lang} suppressHydrationWarning>
            <body className="antialiased bg-white dark:bg-dark-900 transition-colors duration-300">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header lang={lang as any} />
                    <main className="min-h-screen bg-white dark:bg-dark-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
                        {children}
                    </main>
                    <Footer lang={lang as any} />
                </ThemeProvider>
            </body>
        </html>
    );
}
