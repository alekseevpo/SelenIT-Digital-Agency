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
                    }
                }
                testimonials={dict.testimonials || []}
            />
        </>
    );
}
