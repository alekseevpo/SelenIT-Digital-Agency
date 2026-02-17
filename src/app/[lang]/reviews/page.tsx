import { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';
import TestimonialsGrid from '@/components/sections/TestimonialsGrid';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    return {
        title: `Selen.IT | ${dict.reviews?.title || 'Reviews'}`,
        description: dict.reviews?.subtitle || 'Client testimonials and reviews',
    };
}

export default async function ReviewsPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <>
            <TestimonialsGrid
                lang={lang}
                dict={
                    dict.reviews || {
                        badge:
                            lang === 'ru'
                                ? 'Все отзывы'
                                : lang === 'es'
                                  ? 'Todas las Reseñas'
                                  : 'All Reviews',
                        title:
                            lang === 'ru'
                                ? 'Все отзывы клиентов'
                                : lang === 'es'
                                  ? 'Todas las Reseñas de Clientes'
                                  : 'All Client Reviews',
                        subtitle:
                            lang === 'ru'
                                ? 'Полная коллекция отзывов от наших партнеров и клиентов по всему миру. Узнайте, как мы помогаем бизнесу расти и достигать целей.'
                                : lang === 'es'
                                  ? 'Colección completa de testimonios de nuestros socios y clientes de todo el mundo. Descubra cómo ayudamos a las empresas a crecer y alcanzar sus objetivos.'
                                  : 'Complete collection of testimonials from our partners and clients worldwide. See how we help businesses grow and achieve their goals.',
                        companies:
                            lang === 'es'
                                ? [
                                      { name: 'REMEMBER', link: null },
                                      { name: 'AURA', link: null },
                                      { name: 'kw - Keller Williams', link: null },
                                      { name: 'Coachella', link: null },
                                      { name: 'Publix', link: null },
                                      { name: 'EPIC Games', link: null },
                                      { name: 'Chick-fil-A', link: 'https://www.chick-fil-a.com' },
                                      { name: 'StubHub', link: 'https://www.stubhub.com' },
                                      { name: 'crunchyroll', link: 'https://www.crunchyroll.com' },
                                      { name: 'TOSHIBA', link: null },
                                      { name: 'WALMART', link: null },
                                  ]
                                : undefined,
                    }
                }
                testimonials={dict.testimonials || []}
            />
        </>
    );
}
