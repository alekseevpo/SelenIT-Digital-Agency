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
        theme_color: '#ff0000',
        icons: [
            {
                src: '/logo.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            },
        ],
    };
}
