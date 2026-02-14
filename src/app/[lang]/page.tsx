import { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';
import Hero from '@/components/sections/Hero';
import {
    LazyServices,
    LazyShowreel,
    LazyTechnologies,
    LazyTestimonials,
    LazyCTA,
} from '@/components/ui/LazySection';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    return {
        title: `Selen.IT | Digital Agency`,
        description: dict.hero.subtitle,
    };
}

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <>
            <Hero dict={dict.hero} lang={lang} />
            <LazyServices lang={lang} dict={dict.home.services} servicesList={dict.services.list} />
            <LazyShowreel lang={lang} dict={dict.home.showreel} />
            <LazyTechnologies dict={dict.home.technologies} />
            <LazyTestimonials
                lang={lang}
                dict={dict.home.testimonials}
                testimonials={dict.testimonials}
            />
            <LazyCTA lang={lang} dict={dict.home.cta} commonDict={dict.hero} />
        </>
    );
}
