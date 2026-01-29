import { MetadataRoute } from 'next';
import { i18n } from '@/i18n-config';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://selen.it';
    const locales = i18n.locales;
    const routes = ['', '/services', '/about', '/contact', '/showreel', '/privacy', '/terms'];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    locales.forEach((locale) => {
        routes.forEach((route) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: route === '' ? 'daily' : 'weekly',
                priority: route === '' ? 1.0 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
