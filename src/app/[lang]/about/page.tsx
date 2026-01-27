import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About Us | Selen.IT Digital Agency',
    description: 'Learn about Selen.IT Digital Agency - a team of passionate developers, designers, and strategists.',
};

interface AboutPageProps {
    params: { lang: string };
}

const team = [
    {
        name: 'Alexander Petrov',
        role: 'Founder & CEO',
        bio: '15+ years in tech, previously led engineering at major tech companies.',
        avatar: 'AP',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        name: 'Maria Ivanova',
        role: 'Creative Director',
        bio: 'Award-winning designer with a passion for creating beautiful user experiences.',
        avatar: 'MI',
        color: 'from-purple-500 to-pink-500',
    },
    {
        name: 'Dmitry Sokolov',
        role: 'Lead Developer',
        bio: 'Full-stack expert specializing in React, Node.js, and cloud architecture.',
        avatar: 'DS',
        color: 'from-green-500 to-emerald-500',
    },
    {
        name: 'Elena Kozlova',
        role: 'UX Researcher',
        bio: 'User psychology specialist who ensures our products delight and convert.',
        avatar: 'EK',
        color: 'from-orange-500 to-amber-500',
    },
];

const values = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        title: 'Innovation First',
        description: 'We stay ahead of the curve, constantly exploring new technologies and approaches to deliver cutting-edge solutions.',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        title: 'Client Partnership',
        description: 'We treat every project as a true partnership, working closely with clients to understand their vision and goals.',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
        title: 'Quality Obsession',
        description: 'We never compromise on quality. Every pixel, every line of code is crafted with meticulous attention to detail.',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: 'Results Driven',
        description: 'Beautiful design is nothing without results. We focus on measurable outcomes that drive your business forward.',
    },
];

const stats = [
    { value: '8+', label: 'Years in Business' },
    { value: '150+', label: 'Projects Delivered' },
    { value: '50+', label: 'Happy Clients' },
    { value: '15+', label: 'Team Members' },
];

const getAboutData = (lang: string) => ({
    hero: {
        badge: lang === 'ru' ? 'О нас' : lang === 'es' ? 'Sobre Nosotros' : 'About Us',
        title1: lang === 'ru' ? 'Мы — команда' : lang === 'es' ? 'Somos un equipo' : 'We are a Team of',
        titleGradient: lang === 'ru' ? 'цифровых мастеров' : lang === 'es' ? 'Artesanos Digitales' : 'Digital Craftsmen',
        subtitle: lang === 'ru' ? 'Страстно создаем исключительный цифровой опыт.' : lang === 'es' ? 'Apasionados por crear experiencias digitales excepcionales.' : 'Passionate about creating exceptional digital experiences that transform businesses and delight users.'
    },
    story: {
        badge: lang === 'ru' ? 'Наша история' : lang === 'es' ? 'Nuestra Historia' : 'Our Story',
        title1: lang === 'ru' ? 'От маленькой студии к' : lang === 'es' ? 'De un pequeño estudio a' : 'From a Small Studio to a',
        titleGradient: lang === 'ru' ? 'мировому агентству' : lang === 'es' ? 'Agencia Global' : 'Global Agency',
        p1: lang === 'ru' ? 'Selen.IT был основан в 2016 году.' : 'Selen.IT was founded in 2016 with a simple mission.',
        p2: lang === 'ru' ? 'То, что начиналось как работа двух человек, выросло в полноценное агентство.' : 'What started as a two-person operation has grown into a full-service digital agency.',
        p3: lang === 'ru' ? 'Сегодня мы сотрудничаем со стартапами и корпорациями.' : 'Today, we partner with startups and enterprises alike.'
    },
    team: {
        badge: lang === 'ru' ? 'Наша команда' : lang === 'es' ? 'Nuestro Equipo' : 'Our Team',
        title1: lang === 'ru' ? 'Познакомьтесь с людьми' : lang === 'es' ? 'Conoce a la gente' : 'Meet the',
        titleGradient: lang === 'ru' ? 'стоящими за Selen.IT' : lang === 'es' ? 'Detrás de Selen.IT' : 'People Behind Selen.IT',
        subtitle: lang === 'ru' ? 'Разнообразная команда экспертов.' : 'A diverse team of experts passionate about creating exceptional digital experiences.'
    }
});

export default function AboutPage({ params: { lang } }: AboutPageProps) {
    const data = getAboutData(lang);
    return (
        <>
            <section className="pt-32 pb-20 relative overflow-hidden bg-white dark:bg-dark-950 transition-colors duration-300">
                <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {data.hero.badge}
                        </span>
                        <h1 className="heading-1 mb-6 text-slate-900 dark:text-white">
                            {data.hero.title1}{' '}
                            <span className="gradient-text">{data.hero.titleGradient}</span>
                        </h1>
                        <p className="text-body transition-colors duration-300">
                            {data.hero.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            <section className="section-padding bg-slate-50 dark:bg-dark-900 transition-colors duration-300">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                                {data.story.badge}
                            </span>
                            <h2 className="heading-2 mb-6 text-slate-900 dark:text-white">
                                {data.story.title1}{' '}
                                <span className="gradient-text">{data.story.titleGradient}</span>
                            </h2>
                            <div className="space-y-4 text-slate-600 dark:text-dark-400 transition-colors duration-300">
                                <p>{data.story.p1}</p>
                                <p>{data.story.p2}</p>
                                <p>{data.story.p3}</p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((stat) => (
                                <div key={stat.label} className="glass-card p-8 text-center bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700">
                                    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
                                    <div className="text-slate-500 dark:text-dark-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            Our Values
                        </span>
                        <h2 className="heading-2 mb-6">
                            What{' '}
                            <span className="gradient-text">Drives Us</span>
                        </h2>
                        <p className="text-body">
                            Our core values guide every decision we make and every project we undertake.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((value) => (
                            <div key={value.title} className="glass-card p-8 card-hover">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-primary-400 mb-6">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{value.title}</h3>
                                <p className="text-slate-600 dark:text-dark-400">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding bg-slate-50 dark:bg-dark-900 transition-colors duration-300">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {data.team.badge}
                        </span>
                        <h2 className="heading-2 mb-6 text-slate-900 dark:text-white">
                            {data.team.title1}{' '}
                            <span className="gradient-text">{data.team.titleGradient}</span>
                        </h2>
                        <p className="text-body transition-colors duration-300">
                            {data.team.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member) => (
                            <div key={member.name} className="glass-card p-6 text-center card-hover group bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 shadow-sm">
                                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {member.avatar}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                                <p className="text-primary-500 font-medium text-sm mb-4">{member.role}</p>
                                <p className="text-slate-600 dark:text-dark-400 text-sm">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="glass-card p-12 text-center bg-gradient-to-r from-primary-500/10 to-accent-500/10">
                        <h2 className="heading-2 mb-6">
                            Ready to Work{' '}
                            <span className="gradient-text">Together?</span>
                        </h2>
                        <p className="text-body max-w-2xl mx-auto mb-10">
                            Let us discuss how we can help you achieve your digital goals.
                        </p>
                        <Link href={`/${lang}/contact`} className="btn-primary text-lg px-8 py-4">
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
