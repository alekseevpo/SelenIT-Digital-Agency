import { MetadataRoute } from 'next';
import { i18n } from '@/i18n-config';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://selen.it';
    const locales = i18n.locales;

    const routes: {
        path: string;
        changeFrequency: 'daily' | 'weekly' | 'monthly';
        priority: number;
    }[] = [
        { path: '', changeFrequency: 'daily', priority: 1.0 },
        { path: '/services', changeFrequency: 'weekly', priority: 0.9 },
        { path: '/services/websites', changeFrequency: 'weekly', priority: 0.8 },
        { path: '/services/branding', changeFrequency: 'weekly', priority: 0.8 },
        { path: '/services/seo', changeFrequency: 'weekly', priority: 0.8 },
        { path: '/services/solutions', changeFrequency: 'weekly', priority: 0.8 },
        { path: '/services/custom', changeFrequency: 'weekly', priority: 0.8 },
        { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
        { path: '/showreel', changeFrequency: 'weekly', priority: 0.7 },
        { path: '/privacy', changeFrequency: 'monthly', priority: 0.3 },
        { path: '/terms', changeFrequency: 'monthly', priority: 0.3 },
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    locales.forEach((locale) => {
        routes.forEach((route) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route.path}`,
                lastModified: new Date(),
                changeFrequency: route.changeFrequency,
                priority: route.priority,
                alternates: {
                    languages: Object.fromEntries(
                        locales.map((l) => [l, `${baseUrl}/${l}${route.path}`]),
                    ),
                },
            });
        });
    });

    return sitemapEntries;
}
