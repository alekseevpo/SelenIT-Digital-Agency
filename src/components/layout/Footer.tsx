import Link from 'next/link';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/types/dictionary';
import { Logo } from '../ui/Logo';

interface FooterProps {
    lang: Locale;
}

const getFooterLinks = (lang: string) => {
    const isRu = lang === 'ru';
    const isEs = lang === 'es';

    return {
        services: [
            { href: `/${lang}/services#web-development`, label: isRu ? 'Веб-разработка' : isEs ? 'Desarrollo Web' : 'Web Development' },
            { href: `/${lang}/services#ui-ux-design`, label: isRu ? 'UI/UX Дизайн' : isEs ? 'Diseño UI/UX' : 'UI/UX Design' },
            { href: `/${lang}/services#ecommerce`, label: isRu ? 'E-Commerce' : isEs ? 'E-Commerce' : 'E-Commerce' },
            { href: `/${lang}/services#maintenance`, label: isRu ? 'Поддержка' : isEs ? 'Soporte' : 'Support & Maintenance' },
        ],
        company: [
            { href: `/${lang}/about`, label: isRu ? 'О нас' : isEs ? 'Nosotros' : 'About Us' },
            { href: `/${lang}/showreel`, label: isRu ? 'Шоурил' : isEs ? 'Showreel' : 'Showreel' },
            { href: `/${lang}/contact`, label: isRu ? 'Контакты' : isEs ? 'Contacto' : 'Contact' },
        ],
        social: [
            { href: 'https://github.com', label: 'GitHub', icon: 'github' },
            { href: 'https://t.me/ppmtrue', label: 'Telegram', icon: 'telegram' },
            { href: 'https://wa.me/34624682795', label: 'WhatsApp', icon: 'whatsapp' },
        ],
    };
};

export default function Footer({ lang }: FooterProps) {
    const footerLinks = getFooterLinks(lang);

    const navigations: Record<Locale, Dictionary['common']['footer'] & { mission: string, privacy: string, terms: string }> = {
        en: {
            services: 'Services',
            company: 'Company',
            getInTouch: 'Get in Touch',
            rights: 'All rights reserved.',
            mission: 'We craft stunning digital experiences that transform businesses and delight users.',
            privacy: 'Privacy Policy',
            terms: 'Terms of Service'
        },
        ru: {
            services: 'Услуги',
            company: 'Компания',
            getInTouch: 'Связаться',
            rights: 'Все права защищены.',
            mission: 'Мы создаем потрясающий цифровой опыт, который трансформирует бизнес и радует пользователей.',
            privacy: 'Политика конфиденциальности',
            terms: 'Условия использования'
        },
        es: {
            services: 'Servicios',
            company: 'Compañía',
            getInTouch: 'Contacto',
            rights: 'Todos los derechos reservados.',
            mission: 'Creamos experiencias digitales impresionantes que transforman negocios y deleitan a los usuarios.',
            privacy: 'Política de Privacidad',
            terms: 'Términos de Servicio'
        }
    };

    const dict = navigations[lang] || navigations.en;

    return (
        <footer className="bg-white dark:bg-dark-950 border-t border-slate-200 dark:border-dark-800 transition-colors duration-300">
            <div className="container-custom py-10 md:py-12 px-4 sm:px-6 lg:px-8">

                {/* Mobile: Centered Brand Section */}
                <div className="flex flex-col items-center text-center md:hidden mb-8">
                    <Link href={`/${lang}`} className="inline-block mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg">
                        <Logo size={48} showText={true} />
                    </Link>
                    <p className="text-slate-600 dark:text-dark-400 mb-5 leading-relaxed text-sm max-w-xs">
                        {dict.mission}
                    </p>
                    {/* Social Links - Mobile */}
                    <div className="flex gap-3">
                        {footerLinks.social.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-dark-800 flex items-center justify-center text-primary-600 dark:text-primary-400 hover:text-white hover:bg-gradient-to-r hover:from-primary-500 hover:to-accent-500 transition-all duration-300 shadow-sm"
                                aria-label={link.label}
                            >
                                <SocialIcon name={link.icon} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Mobile: Links Grid (2 columns) */}
                <div className="grid grid-cols-2 gap-6 md:hidden mb-8">
                    {/* Services */}
                    <div>
                        <h4 className="text-slate-900 dark:text-white font-semibold mb-3 uppercase tracking-wider text-xs">
                            {dict.services}
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-600 dark:text-dark-400 hover:text-primary-500 transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-slate-900 dark:text-white font-semibold mb-3 uppercase tracking-wider text-xs">
                            {dict.company}
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-600 dark:text-dark-400 hover:text-primary-500 transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Mobile: Contact Section */}
                <div className="md:hidden mb-8 p-4 rounded-2xl bg-slate-50 dark:bg-dark-900/50 border border-slate-100 dark:border-dark-800">
                    <h4 className="text-slate-900 dark:text-white font-semibold mb-3 uppercase tracking-wider text-xs text-center">
                        {dict.getInTouch}
                    </h4>
                    <div className="flex flex-col gap-3">
                        <a
                            href="mailto:alekseevpo@gmail.com"
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white dark:bg-dark-800 text-slate-600 dark:text-dark-400 hover:text-primary-500 transition-all duration-300 text-sm shadow-sm"
                        >
                            <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            alekseevpo@gmail.com
                        </a>
                        <div className="grid grid-cols-2 gap-3">
                            <a
                                href="https://wa.me/34624682795"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white dark:bg-dark-800 text-slate-600 dark:text-dark-400 hover:text-green-500 transition-all duration-300 text-sm shadow-sm"
                            >
                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.897.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.084 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                </svg>
                                WhatsApp
                            </a>
                            <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white dark:bg-dark-800 text-slate-600 dark:text-dark-400 text-sm shadow-sm">
                                <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Madrid
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href={`/${lang}`} className="inline-block mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg">
                            <Logo size={48} showText={true} />
                        </Link>
                        <p className="text-slate-600 dark:text-dark-400 mb-4 leading-relaxed text-sm">
                            {dict.mission}
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3">
                            {footerLinks.social.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-slate-100 dark:bg-dark-800 flex items-center justify-center text-primary-600 dark:text-primary-400 hover:text-white hover:bg-gradient-to-r hover:from-primary-500 hover:to-accent-500 transition-all duration-300"
                                    aria-label={link.label}
                                >
                                    <SocialIcon name={link.icon} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-slate-900 dark:text-white font-semibold mb-4 uppercase tracking-wider text-xs">{dict.services}</h4>
                        <ul className="space-y-2 text-sm">
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-600 dark:text-dark-400 hover:text-primary-500 transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-slate-900 dark:text-white font-semibold mb-4 uppercase tracking-wider text-xs">{dict.company}</h4>
                        <ul className="space-y-2 text-sm">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-600 dark:text-dark-400 hover:text-primary-500 transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-slate-900 dark:text-white font-semibold mb-4 uppercase tracking-wider text-xs">{dict.getInTouch}</h4>
                        <ul className="space-y-2 text-slate-600 dark:text-dark-400 text-sm">
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-primary-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:alekseevpo@gmail.com" className="hover:text-primary-500 transition-colors truncate">
                                    alekseevpo@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-primary-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href="https://wa.me/34624682795" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">
                                    WhatsApp
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-primary-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Madrid, Getafe</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-dark-800">
                    <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
                        <p className="text-slate-500 dark:text-dark-500 text-xs text-center md:text-left">
                            © {new Date().getFullYear()} Selen.IT Digital Agency. {dict.rights}
                        </p>
                        <div className="flex gap-4 text-xs font-medium">
                            <Link href={`/${lang}/privacy`} className="text-slate-500 dark:text-dark-500 hover:text-primary-500 transition-colors">
                                {dict.privacy}
                            </Link>
                            <span className="text-slate-300 dark:text-dark-700">•</span>
                            <Link href={`/${lang}/terms`} className="text-slate-500 dark:text-dark-500 hover:text-primary-500 transition-colors">
                                {dict.terms}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ name }: { name: string }) {
    switch (name) {
        case 'github':
            return (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            );
        case 'whatsapp':
            return (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.897.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.084 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
            );
        case 'telegram':
            return (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
            );
        case 'linkedin':
            return (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            );
        case 'twitter':
            return (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            );
        default:
            return null;
    }
}
