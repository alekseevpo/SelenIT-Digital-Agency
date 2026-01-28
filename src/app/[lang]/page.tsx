import { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Showreel from '@/components/sections/Showreel';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
    const dict = await getDictionary(lang as Locale);
    return {
        title: `Selen.IT | Digital Agency`,
        description: dict.hero.subtitle,
    };
}

export default async function Home({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dict = await getDictionary(lang);

    return (
        <>
            <Hero dict={dict.hero} lang={lang} />
            <Services
                lang={lang}
                dict={dict.home.services}
                servicesList={dict.services.list}
            />
            <Showreel
                lang={lang}
                dict={dict.home.showreel}
            />
            <Testimonials
                lang={lang}
                dict={dict.home.testimonials}
                testimonials={dict.testimonials}
            />
            <CTA
                lang={lang}
                dict={dict.home.cta}
                commonDict={dict.hero}
            />
        </>
    );
}
