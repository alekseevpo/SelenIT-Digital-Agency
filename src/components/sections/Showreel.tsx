import Link from 'next/link';

const projects = [
    {
        id: 1,
        title: 'Luxe Fashion E-Commerce',
        category: 'E-Commerce',
        description: 'A premium online fashion store with advanced filtering, wishlist, and seamless checkout.',
        image: '/images/portfolio/project-1.jpg',
        tags: ['Next.js', 'Stripe', 'Tailwind'],
        color: 'from-purple-500 to-pink-500',
    },
    {
        id: 2,
        title: 'FinTech Dashboard',
        category: 'Web Application',
        description: 'Real-time financial analytics platform with interactive charts and AI-powered insights.',
        image: '/images/portfolio/project-2.jpg',
        tags: ['React', 'D3.js', 'Node.js'],
        color: 'from-blue-500 to-cyan-500',
    },
    {
        id: 3,
        title: 'Health & Wellness App',
        category: 'Mobile-First Web',
        description: 'Progressive web app for fitness tracking, meal planning, and community features.',
        image: '/images/portfolio/project-3.jpg',
        tags: ['PWA', 'Firebase', 'React'],
        color: 'from-green-500 to-emerald-500',
    },
    {
        id: 4,
        title: 'Real Estate Platform',
        category: 'Web Application',
        description: 'Property listing platform with virtual tours, advanced search, and agent matching.',
        image: '/images/portfolio/project-4.jpg',
        tags: ['Next.js', 'PostgreSQL', 'Maps'],
        color: 'from-orange-500 to-amber-500',
    },
];

interface ShowreelProps {
    lang: string;
}

export default function Showreel({ lang }: ShowreelProps) {
    const content = {
        en: { badge: 'Our Showreel', title1: 'Featured', titleGradient: 'Showreel', subtitle: 'Explore our latest work and see how we have helped businesses achieve their digital goals through high-impact video and design.', button: 'View All Showreels' },
        ru: { badge: 'Наш Шоурил', title1: 'Лучшее', titleGradient: 'Видео', subtitle: 'Посмотрите наши последние работы и узнайте, как мы помогаем бизнесу достигать целей.', button: 'Все работы' },
        es: { badge: 'Nuestro Showreel', title1: 'Destacados', titleGradient: 'Video', subtitle: 'Explore nuestro trabajo más reciente y vea cómo hemos ayudado a las empresas.', button: 'Ver todos' }
    }[lang as 'en' | 'ru' | 'es'] || { badge: 'Our Showreel', title1: 'Featured', titleGradient: 'Showreel', subtitle: 'Explore our latest work.', button: 'View All' };
    return (
        <section className="section-padding bg-white dark:bg-dark-950 relative overflow-hidden transition-colors duration-300">
            {/* Background */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary-500/5 to-transparent" />

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {content.badge}
                        </span>
                        <h2 className="heading-2 mb-6 text-slate-900 dark:text-white">
                            {content.title1}{' '}
                            <span className="gradient-text">{content.titleGradient}</span>
                        </h2>
                        <p className="text-body text-balance">
                            {content.subtitle}
                        </p>
                    </div>
                    <Link href={`/${lang}/showreel`} className="btn-outline inline-flex items-center gap-2 shrink-0">
                        {content.button}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                {/* Showreel Video Embed */}
                <div className="relative aspect-video rounded-3xl overflow-hidden glass-card shadow-2xl border border-white/10 group">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/W6ZDTqE6jWU?autoplay=0&mute=1&controls=1&rel=0"
                        title="Selen.IT Showreel"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>

                    {/* Hover Overlay Gradient */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-dark-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Optional Grid of smaller showreels can go here */}
            </div>
        </section>
    );
}
