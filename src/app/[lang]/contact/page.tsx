import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';

interface PageProps {
    params: { lang: string };
}

export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
    const dict = await getDictionary(lang as Locale);
    return {
        title: `${dict.contact.hero.badge} | Selen.IT Digital Agency`,
        description: dict.contact.hero.subtitle,
    };
}

export default async function ContactPage({ params: { lang } }: PageProps) {
    const dict = await getDictionary(lang as Locale);
    const { hero, info, form } = dict.contact;

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: info.email,
            value: 'alekseevpo@gmail.com',
            href: 'mailto:alekseevpo@gmail.com',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.897.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.084 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
            ),
            title: "WhatsApp",
            value: '+34 624 68 27 95',
            href: 'https://wa.me/34624682795',
        }
    ];

    return (
        <div className="bg-white dark:bg-dark-950 min-h-screen transition-colors duration-300">
            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden bg-white dark:bg-dark-950 transition-colors duration-300">
                <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {hero.badge}
                        </span>
                        <h1 className="heading-1 mb-6 text-slate-900 dark:text-white">
                            {hero.title1}{' '}
                            <span className="gradient-text">{hero.titleGradient}</span>
                        </h1>
                        <p className="text-body transition-colors duration-300">
                            {hero.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section-padding bg-slate-50 dark:bg-dark-900 transition-colors duration-300">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-8">
                            <div>
                                <h2 className="heading-3 mb-6 text-slate-900 dark:text-white">{info.title}</h2>
                                <p className="text-slate-600 dark:text-dark-400 mb-8">
                                    {info.subtitle}
                                </p>
                            </div>

                            <div className="space-y-4">
                                {contactInfo.map((item) => (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        target={item.title === 'Telegram' || item.title === 'WhatsApp' ? '_blank' : undefined}
                                        rel={item.title === 'Telegram' || item.title === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-md transition-all group w-full"
                                    >
                                        <div className="w-12 h-12 rounded-lg bg-slate-50 dark:bg-dark-700 flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="text-slate-500 dark:text-dark-500 text-xs uppercase tracking-wider mb-1">{item.title}</div>
                                            <div className="text-slate-900 dark:text-white font-medium">
                                                {item.value}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            {/* Office Hours */}
                            <div className="glass-card p-6 bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 shadow-sm mt-8">
                                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{info.hoursTitle}</h3>
                                <div className="space-y-2 text-sm text-slate-600 dark:text-dark-400">
                                    <div className="flex justify-between">
                                        <span>{info.mondayFriday}</span>
                                        <span className="text-slate-900 dark:text-white">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{info.saturday}</span>
                                        <span className="text-slate-900 dark:text-white">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{info.sunday}</span>
                                        <span className="text-slate-900 dark:text-white">{info.closed}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <ContactForm lang={lang} dict={form} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
