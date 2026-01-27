import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
    title: 'Contact Us | Selen.IT Digital Agency',
    description: 'Get in touch with Selen.IT Digital Agency for your next project.',
};

const getContactData = (lang: string) => ({
    hero: {
        badge: lang === 'ru' ? 'Контакты' : lang === 'es' ? 'Contacto' : 'Contact Us',
        title1: lang === 'ru' ? 'Давайте начнем' : lang === 'es' ? 'Empecemos una' : 'Let us Start a',
        titleGradient: lang === 'ru' ? 'диалог' : lang === 'es' ? 'Conversación' : 'Conversation',
        subtitle: lang === 'ru' ? 'Готовы преобразить ваше цифровое присутствие? Мы будем рады вас услышать.' : 'Ready to transform your digital presence? We would love to hear from you.'
    },
    info: {
        title: lang === 'ru' ? 'Связаться с нами' : 'Get in Touch',
        subtitle: lang === 'ru' ? 'Есть идея для проекта? Давайте обсудим.' : 'Have a project in mind? Let us talk about how we can help you achieve your goals.',
        email: 'Email',
        phone: lang === 'ru' ? 'Телефон' : 'Phone',
        office: lang === 'ru' ? 'Офис' : 'Office',
        hoursTitle: lang === 'ru' ? 'Часы работы' : 'Office Hours',
    },
    form: {
        title: lang === 'ru' ? 'Напишите нам' : 'Write to Us',
        subtitle: lang === 'ru' ? 'Заполните форму ниже' : 'Fill out the form below',
        fullName: lang === 'ru' ? 'Полное имя' : 'Full Name',
        email: 'Email Address',
        company: lang === 'ru' ? 'Название компании' : 'Company Name',
        service: lang === 'ru' ? 'Интересующая услуга' : 'Service Interested In',
        serviceOptions: lang === 'ru' ? ['Веб-разработка', 'Дизайн', 'E-Commerce', 'Другое'] : ['Web Development', 'UI/UX Design', 'E-Commerce', 'Web Application', 'Support & Maintenance', 'Other'],
        budget: lang === 'ru' ? 'Проектный бюджет' : 'Project Budget',
        budgetOptions: lang === 'ru' ? ['До $5,000', '$5,000 - $15,000', '$15,000+', 'Не определен'] : ['Under $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '$50,000 - $100,000', '$100,000+'],
        details: lang === 'ru' ? 'Детали проекта' : 'Project Details',
        detailsPlaceholder: lang === 'ru' ? 'Расскажите о вашем проекте...' : 'Tell us about your project, goals, and timeline...',
        submit: lang === 'ru' ? 'Отправить сообщение' : 'Send Message',
        sending: lang === 'ru' ? 'Отправка...' : 'Sending...',
        success: lang === 'ru' ? 'Успешно' : 'Success',
        successTitle: lang === 'ru' ? 'Спасибо!' : 'Thank You!',
        successSubtitle: lang === 'ru' ? 'Ваше сообщение успешно отправлено.' : 'Your message has been sent successfully.',
        sendAnother: lang === 'ru' ? 'Отправить еще' : 'Send Another Message',
        selectService: lang === 'ru' ? 'Выберите услугу' : 'Select a service',
        selectBudget: lang === 'ru' ? 'Выберите бюджет' : 'Select budget range',
    }
});

interface PageProps {
    params: { lang: string };
}

export default function ContactPage({ params: { lang } }: PageProps) {
    const data = getContactData(lang);

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: data.info.email,
            value: 'hello@selen.it',
            href: 'mailto:hello@selen.it',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: data.info.phone,
            value: '+1 (234) 567-890',
            href: 'tel:+1234567890',
        },
    ];

    return (
        <div className="bg-white dark:bg-dark-950 min-h-screen transition-colors duration-300">
            {/* Hero Section */}
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

            {/* Contact Section */}
            <section className="section-padding bg-slate-50 dark:bg-dark-900 transition-colors duration-300">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-8">
                            <div>
                                <h2 className="heading-3 mb-6 text-slate-900 dark:text-white">{data.info.title}</h2>
                                <p className="text-slate-600 dark:text-dark-400 mb-8">
                                    {data.info.subtitle}
                                </p>
                            </div>

                            <div className="space-y-6">
                                {contactInfo.map((info) => (
                                    <a
                                        key={info.title}
                                        href={info.href}
                                        className="flex items-start gap-4 group"
                                    >
                                        <div className="w-12 h-12 rounded-lg bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 flex items-center justify-center text-primary-500 group-hover:bg-primary-500/20 transition-colors shadow-sm">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <div className="text-slate-500 dark:text-dark-500 text-sm mb-1">{info.title}</div>
                                            <div className="text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors font-medium">
                                                {info.value}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            {/* Office Hours */}
                            <div className="glass-card p-6 bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 shadow-sm">
                                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{data.info.hoursTitle}</h3>
                                <div className="space-y-2 text-sm text-slate-600 dark:text-dark-400">
                                    <div className="flex justify-between">
                                        <span>Monday - Friday</span>
                                        <span className="text-slate-900 dark:text-white">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday</span>
                                        <span className="text-slate-900 dark:text-white">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday</span>
                                        <span className="text-slate-900 dark:text-white">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <ContactForm lang={lang} dict={data.form} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
