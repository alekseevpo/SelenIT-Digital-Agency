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
        en: 'Professional web development, UI/UX design, branding and SEO services based in Madrid, Spain. We build modern, high-performance websites and digital solutions.',
        ru: 'Профессиональная веб-разработка, UI/UX дизайн, брендинг и SEO. Базируемся в Мадриде, Испания. Создаём современные высокопроизводительные сайты и цифровые решения.',
        es: 'Desarrollo web profesional, diseño UI/UX, branding y SEO con sede en Madrid, España. Creamos sitios web modernos y soluciones digitales de alto rendimiento.',
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
                    addressLocality: 'Madrid',
                },
                knowsAbout: [
                    'Web Development',
                    'UI/UX Design',
                    'Search Engine Optimization',
                    'Branding',
                    'React',
                    'Next.js',
                    'TypeScript',
                    'Frontend Development',
                    'Backend Development',
                    'Full-Stack Development',
                    'Mobile Development',
                    'Progressive Web Apps',
                    'API Development',
                    'Database Design',
                    'Cloud Solutions',
                    'DevOps',
                    'Performance Optimization',
                    'Accessibility',
                    'E-commerce Solutions',
                    'Custom Web Applications',
                    'Digital Transformation',
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
                    addressLocality: 'Madrid',
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

export function ServiceJsonLd({
    url,
    lang,
    serviceName,
}: {
    url: string;
    lang: string;
    serviceName: string;
}) {
    const serviceDescriptions: Record<string, Record<string, string>> = {
        'web-development': {
            en: 'Professional web development services using modern technologies like React, Next.js, and TypeScript. We build scalable, performant, and user-friendly web applications.',
            ru: 'Профессиональные услуги веб-разработки с использованием современных технологий React, Next.js и TypeScript. Создаем масштабируемые, производительные и удобные веб-приложения.',
            es: 'Servicios profesionales de desarrollo web utilizando tecnologías modernas como React, Next.js y TypeScript. Construimos aplicaciones web escalables, de alto rendimiento y fáciles de usar.',
        },
        'ui-ux-design': {
            en: 'Expert UI/UX design services creating intuitive, beautiful, and user-centered digital experiences. We focus on usability, accessibility, and conversion optimization.',
            ru: 'Экспертные услуги UI/UX дизайна, создающие интуитивные, красивые и ориентированные на пользователя цифровые впечатления. Фокусируемся на удобстве использования, доступности и оптимизации конверсии.',
            es: 'Servicios expertos de diseño UI/UX creando experiencias digitales intuitivas, hermosas y centradas en el usuario. Nos enfocamos en usabilidad, accesibilidad y optimización de conversión.',
        },
        'seo-optimization': {
            en: 'Comprehensive SEO optimization services to improve your website visibility and rankings. We offer technical SEO, content optimization, and performance enhancement.',
            ru: 'Комплексные услуги SEO оптимизации для улучшения видимости и позиций вашего сайта. Предлагаем технический SEO, оптимизацию контента и улучшение производительности.',
            es: 'Servicios integrales de optimización SEO para mejorar la visibilidad y clasificación de su sitio web. Ofrecemos SEO técnico, optimización de contenido y mejora del rendimiento.',
        },
        branding: {
            en: 'Complete branding services including logo design, brand identity, visual systems, and marketing materials. We create memorable and impactful brand experiences.',
            ru: 'Полные услуги брендинга включая дизайн логотипа, фирменный стиль, визуальные системы и маркетинговые материалы. Создаем запоминающиеся и эффектные бренд-впечатления.',
            es: 'Servicios completos de branding que incluyen diseño de logotipo, identidad de marca, sistemas visuales y materiales de marketing. Creamos experiencias de marca memorables e impactantes.',
        },
    };

    const descriptions = serviceDescriptions[serviceName] || serviceDescriptions['web-development'];

    return (
        <JsonLd
            data={{
                '@context': 'https://schema.org',
                '@type': 'Service',
                name: serviceName.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
                description: descriptions[lang] || descriptions.en,
                provider: {
                    '@type': 'Organization',
                    name: 'Selen.IT Digital Agency',
                    url,
                },
                areaServed: {
                    '@type': 'Place',
                    address: {
                        '@type': 'PostalAddress',
                        addressCountry: 'ES',
                        addressLocality: 'Madrid',
                    },
                },
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Digital Services',
                    itemListElement: [
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: serviceName
                                    .replace('-', ' ')
                                    .replace(/\b\w/g, (l) => l.toUpperCase()),
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
