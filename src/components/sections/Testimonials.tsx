import { useState } from 'react';

interface TestimonialsProps {
    lang: string;
}

const getTestimonialsData = (lang: string) => [
    {
        id: 1,
        content: lang === 'ru'
            ? "Selen.IT превратили наш устаревший сайт в современную машину для лидов. Количество заявок выросло на 200% за первый месяц."
            : lang === 'es'
                ? "Selen.IT transformó nuestro sitio web obsoleto en una máquina moderna de alta conversión. Nuestros clientes aumentaron un 200%."
                : "Selen.IT transformed our outdated website into a modern, high-converting machine. Our leads increased by 200% within the first month. Their attention to detail and expertise is unmatched.",
        author: 'Sarah Johnson',
        role: lang === 'ru' ? 'CEO, TechStart Inc.' : 'CEO, TechStart Inc.',
        avatar: 'SJ',
        rating: 5,
    },
    {
        id: 2,
        content: lang === 'ru'
            ? "Работать с Selen.IT было одно удовольствие. Они поняли наше видение и превзошли ожидания."
            : lang === 'es'
                ? "Trabajar con Selen.IT fue un placer absoluto. Entendieron nuestra visión y superaron las expectativas."
                : "Working with Selen.IT was an absolute pleasure. They understood our vision and delivered beyond expectations. The new e-commerce platform is fast, beautiful, and our sales have skyrocketed.",
        author: 'Michael Chen',
        role: lang === 'ru' ? 'Основатель, Luxe Brands' : 'Founder, Luxe Brands',
        avatar: 'MC',
        rating: 5,
    },
];

export default function Testimonials({ lang }: TestimonialsProps) {
    const testimonials = getTestimonialsData(lang);
    const content = {
        en: { badge: 'Testimonials', title1: 'What Our', titleGradient: 'Clients Say', subtitle: 'Do not just take our word for it. Here is what our clients have to say about working with us.' },
        ru: { badge: 'Отзывы', title1: 'Что говорят', titleGradient: 'наши клиенты', subtitle: 'Не верьте нам на слово. Вот что говорят наши клиенты о работе с нами.' },
        es: { badge: 'Testimonios', title1: 'Lo que dicen', titleGradient: 'nuestros clientes', subtitle: 'No confíe sólo en nuestra palabra. Esto es lo que dicen nuestros clientes.' }
    }[lang as 'en' | 'ru' | 'es'] || { badge: 'Testimonials', title1: 'What Our', titleGradient: 'Clients Say', subtitle: 'What our clients say.' };
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="section-padding bg-white dark:bg-dark-950 relative overflow-hidden transition-colors duration-300">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -translate-x-1/2" />
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl translate-x-1/2" />
            </div>

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                        {content.badge}
                    </span>
                    <h2 className="heading-2 mb-6 text-slate-900 dark:text-white">
                        {content.title1}{' '}
                        <span className="gradient-text">{content.titleGradient}</span>
                    </h2>
                    <p className="text-body transition-colors duration-300">
                        {content.subtitle}
                    </p>
                </div>

                {/* Testimonials Slider */}
                <div className="max-w-4xl mx-auto">
                    {/* Main Testimonial */}
                    <div className="glass-card p-8 md:p-12 mb-8">
                        {/* Quote Icon */}
                        <div className="text-primary-500/20 mb-6">
                            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                        </div>

                        {/* Content */}
                        <p className="text-xl md:text-2xl text-slate-800 dark:text-white leading-relaxed mb-8">
                            &ldquo;{testimonials[activeIndex].content}&rdquo;
                        </p>

                        {/* Rating */}
                        <div className="flex gap-1 mb-6">
                            {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg">
                                {testimonials[activeIndex].avatar}
                            </div>
                            <div>
                                <div className="text-slate-900 dark:text-white font-semibold">
                                    {testimonials[activeIndex].author}
                                </div>
                                <div className="text-slate-500 dark:text-dark-400 text-sm">
                                    {testimonials[activeIndex].role}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-3">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                                    ? 'bg-primary-500 w-8'
                                    : 'bg-dark-600 hover:bg-dark-500'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
