import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Selen.IT Digital Agency',
        short_name: 'Selen.IT',
        description:
            'Professional web development, UI/UX design, branding, marketing and SEO services',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#dc2626',
        icons: [
            {
                src: '/logo.svg',
                sizes: '200x60',
                type: 'image/svg+xml',
                purpose: 'any',
            },
            {
                src: '/favicons/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/favicons/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/favicons/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
                purpose: 'any',
            },
        ],
    };
}
