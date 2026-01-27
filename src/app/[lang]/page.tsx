import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Showreel from '@/components/sections/Showreel';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';

export default async function Home({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dict = await getDictionary(lang);

    return (
        <>
            <Hero dict={dict.hero} lang={lang} />
            {/* These will need updates to their props too */}
            <Services lang={lang} />
            <Showreel lang={lang} />
            <Testimonials lang={lang} />
            <CTA lang={lang} />
        </>
    );
}
