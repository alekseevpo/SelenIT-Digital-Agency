interface JsonLdProps {
    data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
            suppressHydrationWarning
        />
    );
}

export function OrganizationJsonLd({ url, lang }: { url: string; lang: string }) {
    const names: Record<string, string> = {
        en: 'Selen.IT Digital Agency — Web Development & Design',
        ru: 'Selen.IT Digital Agency — Веб-разработка и дизайн',
        es: 'Selen.IT Digital Agency — Desarrollo web y diseño',
    };

    const descriptions: Record<string, string> = {
        en: 'Professional web development, UI/UX design, branding and SEO services. We build modern, high-performance websites and digital solutions.',
        ru: 'Профессиональная веб-разработка, UI/UX дизайн, брендинг и SEO. Создаём современные высокопроизводительные сайты и цифровые решения.',
        es: 'Desarrollo web profesional, diseño UI/UX, branding y SEO. Creamos sitios web modernos y soluciones digitales de alto rendimiento.',
    };

    return (
        <JsonLd
            data={{
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Selen.IT Digital Agency',
                alternateName: 'SelenIT',
                url,
                logo: `${url}/logo.svg`,
                description: descriptions[lang] || descriptions.en,
                foundingDate: '2024',
                sameAs: ['https://github.com/alekseevpo', 'https://t.me/ppmtrue'],
                contactPoint: {
                    '@type': 'ContactPoint',
                    email: 'alekseevpo@gmail.com',
                    contactType: 'customer service',
                    availableLanguage: ['English', 'Russian', 'Spanish'],
                },
                address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'ES',
                    addressLocality: 'Barcelona',
                },
                knowsAbout: [
                    'Web Development',
                    'UI/UX Design',
                    'Search Engine Optimization',
                    'Branding',
                    'React',
                    'Next.js',
                    'TypeScript',
                ],
            }}
        />
    );
}

export function WebSiteJsonLd({ url, lang }: { url: string; lang: string }) {
    const names: Record<string, string> = {
        en: 'Selen.IT Digital Agency',
        ru: 'Selen.IT Digital Agency',
        es: 'Selen.IT Digital Agency',
    };

    return (
        <JsonLd
            data={{
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: names[lang] || names.en,
                url: `${url}/${lang}`,
                inLanguage: lang === 'ru' ? 'ru-RU' : lang === 'es' ? 'es-ES' : 'en-US',
                publisher: {
                    '@type': 'Organization',
                    name: 'Selen.IT Digital Agency',
                    url,
                },
            }}
        />
    );
}

export function LocalBusinessJsonLd({ url }: { url: string }) {
    return (
        <JsonLd
            data={{
                '@context': 'https://schema.org',
                '@type': 'ProfessionalService',
                name: 'Selen.IT Digital Agency',
                url,
                logo: `${url}/logo.svg`,
                image: `${url}/conversation_two.png`,
                priceRange: '$$',
                address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'ES',
                    addressLocality: 'Barcelona',
                },
                openingHoursSpecification: [
                    {
                        '@type': 'OpeningHoursSpecification',
                        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                        opens: '09:00',
                        closes: '18:00',
                    },
                    {
                        '@type': 'OpeningHoursSpecification',
                        dayOfWeek: 'Saturday',
                        opens: '10:00',
                        closes: '16:00',
                    },
                ],
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Digital Services',
                    itemListElement: [
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Web Development',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'UI/UX Design',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'SEO Optimization',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Branding',
                            },
                        },
                    ],
                },
            }}
        />
    );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
    return (
        <JsonLd
            data={{
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: items.map((item, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: item.name,
                    item: item.url,
                })),
            }}
        />
    );
}
