import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import CTA from '@/components/sections/CTA';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { Reveal } from '@/components/ui/Reveal';

const content = {
    en: {
        badge: 'Branding',
        title1: "We'll build a",
        titleGradient: 'brand',
        title2: "they'll <span class='text-red-600 dark:text-red-500 underline decoration-black dark:decoration-white decoration-2 underline-offset-4'>remember</span>",
        subtitle:
            'Strategy, identity and messaging that makes you stand out and converts attention into trust.',
        bullets: [
            'Brand strategy',
            'Visual identity',
            'Tone of voice',
            'Brand guidelines',
            'Market research',
            'Positioning',
            'Systematic approach',
            'Brand voice',
        ],
        mainContent: {
            intro1: 'In a world where the average user sees up to 10,000 advertising messages per day, "just a logo" is no longer enough. For a client to choose you over a competitor with a 5% lower price, your brand must have something more than a pretty picture. It must have character, values, and DNA.',
            intro2: `At SELEN.<span class="text-red-600 dark:text-red-500">IT</span>, we don't just "draw brands" — we design emotional experiences that make audiences fall in love.`,
            section1: {
                title: '1. Foundation: ',
                highlight: 'Meaning and forms',
                content:
                    'A memorable brand starts not with choosing a font, but with answering uncomfortable questions: "Why do you exist? What problem do you solve like no one else?"',
                points: [
                    '<strong>Research:</strong> We analyze the market and competitors to find the "white spot" — that niche where you will sound louder than anyone else.',
                    '<strong>Positioning:</strong> We formulate the essence of the brand. This is the very "hook" that will catch your target audience.',
                ],
            },
            section2: {
                title: '2. Visual identity: A face recognized ',
                highlight: 'from a thousand',
                content:
                    "Visual style is not fashion, it's communication. Color, typography, and graphic elements must work on the subconscious.",
                points: [
                    'We create design that conveys your message in fractions of a second.',
                    '<strong>Systematic approach:</strong> Your brand will look equally expensive and professional both on a mobile app icon and on a huge billboard.',
                ],
            },
            section3: {
                title: '3. Brand voice ',
                highlight: '(Tone of Voice)',
                content:
                    'Memorable brands know how to talk. They can be bold, caring, expert, or ironic. We help find that unique tone that will make communication with your clients personal and trusting.',
                points: [],
            },
            section4: {
                title: '4. Evolution: Brand as a ',
                highlight: 'living organism',
                content:
                    'Creating a brand is only 20% of success. The remaining 80% is its implementation and maintenance.',
                points: [
                    'We help integrate the brand into all customer touchpoints.',
                    "We develop a promotion strategy so that people don't just learn about you, but start talking about you.",
                ],
            },
            quote: 'Branding is a long-term investment in added value. A strong brand allows you to sell at higher prices, hire better employees, and maintain customer loyalty for years.',
            whyUs: {
                title: 'Why trust ',
                highlight: 'this ',
                highlight2: 'to SELEN.',
                highlight3: 'IT?',
                content:
                    "We combine the analytical approach of a digital agency with creative vision. We don't offer template solutions because your business is unique. Our task is to make sure that when your niche is mentioned, your company name immediately pops into the client's head.",
            },
            ctaBox: {
                title: "Ready to announce yourself so you can't be ignored?",
                subtitle:
                    'Would you like us to prepare a brief or free consultation plan for you so we can discuss your future brand?',
            },
        },
    },
    ru: {
        badge: 'Брендинг',
        title1: 'Создадим',
        titleGradient: 'бренд',
        title2: ', который <span class="text-red-600 dark:text-red-500 underline decoration-black dark:decoration-white decoration-2 underline-offset-4">запомнят</span>',
        subtitle:
            'Стратегия, айдентика и коммуникация, которые выделяют и превращают внимание в доверие.',
        bullets: [
            'Бренд-стратегия',
            'Визуальная айдентика',
            'Тон коммуникации',
            'Брендбук и гайдлайны',
            'Исследование рынка',
            'Позиционирование',
            'Системный подход',
            'Голос бренда',
        ],
        mainContent: {
            intro1: 'В мире, где средний пользователь видит до 10 000 рекламных сообщений в день, «просто логотипа» уже недостаточно. Чтобы клиент выбрал вас, а не конкурента с ценой на 5% ниже, ваш бренд должен обладать чем-то большим, чем симпатичная картинка. Он должен обладать характером, ценностями и ДНК.',
            intro2: `В SELEN.<span class="text-red-600 dark:text-red-500">IT</span> мы не просто «рисуем бренды» — мы проектируем эмоциональный опыт, который заставляет аудиторию влюбляться.`,
            section1: {
                title: '1. Фундамент: ',
                highlight: 'Смысл и формы',
                content:
                    'Запоминающийся бренд начинается не с выбора шрифта, а с ответов на неудобные вопросы: «Почему вы существуете? Какую проблему вы решаете так, как никто другой?»',
                points: [
                    '<strong>Исследование:</strong> Мы анализируем рынок и конкурентов, чтобы найти «белое пятно» — ту нишу, где вы будете звучать громче всех.',
                    '<strong>Позиционирование:</strong> Мы формулируем суть бренда. Это тот самый «крючок», который зацепит вашу целевую аудиторию.',
                ],
            },
            section2: {
                title: '2. Визуальная айдентика: Лицо, которое ',
                highlight: 'узнают из тысячи',
                content:
                    'Визуальный стиль — это не мода, это коммуникация. Цвет, типографика и графические элементы должны работать на подсознание.',
                points: [
                    'Мы создаем дизайн, который передает ваше сообщение за доли секунды.',
                    '<strong>Системность:</strong> Ваш бренд будет выглядеть одинаково дорого и профессионально как на иконке мобильного приложения, так и на огромном билборде.',
                ],
            },
            section3: {
                title: '3. Голос бренда ',
                highlight: '(Tone of Voice)',
                content:
                    'Бренды, которые запоминаются, умеют разговаривать. Они могут быть дерзкими, заботливыми, экспертными или ироничными. Мы помогаем найти тот уникальный тон, который сделает общение с вашими клиентами личным и доверительным.',
                points: [],
            },
            section4: {
                title: '4. Развитие: Бренд как ',
                highlight: 'живой организм',
                content:
                    'Создать бренд — это только 20% успеха. Остальные 80% — это его внедрение и поддержка.',
                points: [
                    'Мы помогаем интегрировать бренд во все точки контакта с клиентом.',
                    'Разрабатываем стратегию продвижения, чтобы о вас не просто узнали, а начали говорить.',
                ],
            },
            quote: 'Брендинг — это долгосрочная инвестиция в добавочную стоимость. Сильный бренд позволяет продавать дороже, нанимать лучших сотрудников и сохранять лояльность клиентов годами.',
            whyUs: {
                title: 'Почему стоит доверить ',
                highlight: 'это ',
                highlight2: 'SELEN.',
                highlight3: 'IT?',
                content:
                    'Мы объединяем аналитический подход digital-агентства с креативным видением. Мы не предлагаем шаблонных решений, потому что ваш бизнес уникален. Наша задача — сделать так, чтобы при упоминании вашей ниши у клиента в голове сразу всплывало название вашей компании.',
            },
            ctaBox: {
                title: 'Готовы заявить о себе так, чтобы вас невозможно было игнорировать?',
                subtitle:
                    'Хотите, мы подготовим для вас краткий бриф или план бесплатной консультации, чтобы мы могли обсудить ваш будущий бренд?',
            },
        },
    },
    es: {
        badge: 'Branding',
        title1: 'Crearemos una',
        titleGradient: 'marca',
        title2: '¡que <span class="text-red-600 dark:text-red-500 underline decoration-black dark:decoration-white decoration-2 underline-offset-4">recordarán</span>',
        subtitle:
            'Estrategia, identidad y mensajes que te diferencian y convierten la atención en confianza.',
        bullets: [
            'Estrategia de marca',
            'Identidad visual',
            'Tono de voz',
            'Guías de marca',
            'Investigación de mercado',
            'Posicionamiento',
            'Enfoque sistemático',
            'Voz de la marca',
        ],
        mainContent: {
            intro1: 'En un mundo donde el usuario promedio ve hasta 10,000 mensajes publicitarios al día, "solo un logo" ya no es suficiente. Para que un cliente te elija a ti en lugar de un competidor con un precio 5% más bajo, tu marca debe tener algo más que una imagen bonita. Debe tener carácter, valores y ADN.',
            intro2: `En SELEN.<span class="text-red-600 dark:text-red-500">IT</span>, no solo "dibujamos marcas" — diseñamos experiencias emocionales que hacen que la audiencia se enamore.`,
            section1: {
                title: '1. Fundamento: ',
                highlight: 'Significado y formas',
                content:
                    'Una marca memorable no comienza con elegir una fuente, sino con responder preguntas incómodas: "¿Por qué existes? ¿Qué problema resuelves como nadie más?"',
                points: [
                    '<strong>Investigación:</strong> Analizamos el mercado y competidores para encontrar el "espacio en blanco" — ese nicho donde sonarás más fuerte que nadie.',
                    '<strong>Posicionamiento:</strong> Formulamos la esencia de la marca. Ese es el "gancho" que capturará a tu audiencia objetivo.',
                ],
            },
            section2: {
                title: '2. Identidad visual: Un rostro reconocido ',
                highlight: 'entre mil',
                content:
                    'El estilo visual no es moda, es comunicación. El color, la tipografía y los elementos gráficos deben trabajar en el subconsciente.',
                points: [
                    'Creamos diseño que transmite tu mensaje en fracciones de segundo.',
                    '<strong>Sistematicidad:</strong> Tu marca se verá igualmente cara y profesional tanto en el ícono de una aplicación móvil como en una valla publicitaria enorme.',
                ],
            },
            section3: {
                title: '3. Voz de la marca ',
                highlight: '(Tono de Voz)',
                content:
                    'Las marcas memorables saben conversar. Pueden ser audaces, cuidadoras, expertas o irónicas. Ayudamos a encontrar ese tono único que hará la comunicación con tus clientes personal y confiable.',
                points: [],
            },
            section4: {
                title: '4. Evolución: La marca como un ',
                highlight: 'organismo vivo',
                content:
                    'Crear una marca es solo el 20% del éxito. El 80% restante es su implementación y mantenimiento.',
                points: [
                    'Ayudamos a integrar la marca en todos los puntos de contacto con el cliente.',
                    'Desarrollamos estrategia de promoción para que la gente no solo te conozca, sino que empiece a hablar de ti.',
                ],
            },
            quote: 'El branding es una inversión a largo plazo en valor agregado. Una marca fuerte te permite vender a precios más altos, contratar mejores empleados y mantener la lealtad de los clientes durante años.',
            whyUs: {
                title: '¿Por qué confiar ',
                highlight: 'esto ',
                highlight2: 'a SELEN.',
                highlight3: 'IT?',
                content:
                    'Combinamos el enfoque analítico de una agencia digital con visión creativa. No ofrecemos soluciones plantilla porque tu negocio es único. Nuestra tarea es hacer que cuando se mencione tu nicho, el nombre de tu empresa aparezca inmediatamente en la mente del cliente.',
            },
            ctaBox: {
                title: '¿Listos para anunciarse de manera que sea imposible ignorarlos?',
                subtitle:
                    '¿Quieren que preparemos para ustedes un breve o un plan de consulta gratuita para que podamos discutir su futuro marca?',
            },
        },
    },
} as const;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const c = content[(lang as Locale) in content ? (lang as Locale) : 'en'];

    return {
        title: `${c.badge} | ${dict.common.nav.services}`,
        description: c.subtitle,
    };
}

interface PageProps {
    params: Promise<{ lang: string }>;
}

export default async function BrandingPage({ params }: PageProps) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const c = content[(lang as Locale) in content ? (lang as Locale) : 'en'];
    const baseUrl = 'https://selen.it';
    const breadcrumbs = [
        { name: dict.common.nav.home, url: `${baseUrl}/${lang}` },
        { name: dict.common.nav.services, url: `${baseUrl}/${lang}/services` },
        { name: c.badge, url: `${baseUrl}/${lang}/services/branding` },
    ];

    return (
        <div className="min-h-screen bg-cream-50 dark:bg-black transition-colors duration-300 branding-page">
            <BreadcrumbJsonLd items={breadcrumbs} />
            <section className="pt-40 pb-20 relative overflow-hidden bg-transparent dark:bg-black transition-colors duration-300">
                <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <Reveal width="100%">
                        <span className="text-red-600 dark:text-red-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {c.badge}
                        </span>
                    </Reveal>
                    <Reveal width="100%" delay={0.35}>
                        <h1
                            className="heading-1 mb-6 text-slate-900 dark:text-white"
                            style={{
                                fontSize: '5rem',
                                lineHeight: 0.95,
                                fontWeight: 700,
                                letterSpacing: '0.01em',
                            }}
                            dangerouslySetInnerHTML={{
                                __html: `${c.title1} <span class="gradient-text">${c.titleGradient}</span>${c.title2}`,
                            }}
                        />
                    </Reveal>
                    <Reveal width="100%" delay={0.45}>
                        <p className="text-body max-w-2xl mx-auto transition-colors duration-300 mb-2">
                            {c.subtitle}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* New Content Section */}
            <section className="pt-4 section-padding">
                <div className="container-custom px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                            <p
                                className="mb-4 text-body leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: c.mainContent.intro1 }}
                            />
                            <p
                                className="mb-4 text-body leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: c.mainContent.intro2 }}
                            />

                            {/* Two Column Layout with Image */}
                            <div className="mb-8 flex flex-col-reverse lg:flex-row gap-8 items-center">
                                <div className="flex-1">
                                    <p className="text-body leading-relaxed mb-4">
                                        В мире, где средний пользователь видит до 10 000 рекламных
                                        сообщений в день, «просто логотипа» уже недостаточно. Чтобы
                                        клиент выбрал вас, а не конкурента с ценой на 5% ниже, ваш
                                        бренд должен обладать чем-то большим, чем симпатичная
                                        картинка. Он должен обладать характером, ценностями и ДНК.
                                    </p>
                                    <p className="text-body leading-relaxed">
                                        В SELEN.IT мы не просто «рисуем бренды» — мы проектируем
                                        эмоциональный опыт, который заставляет аудиторию влюбляться.
                                    </p>
                                </div>
                                <div className="flex-shrink-0 lg:w-1/3 -mt-8 pt-8">
                                    <img
                                        src="/artist_.png"
                                        alt="Artist illustration"
                                        className="max-w-full h-auto rounded-lg dark:invert"
                                    />
                                </div>
                            </div>

                            <h3
                                className="mb-3 text-slate-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight font-frantz"
                                style={{
                                    fontSize: '3rem',
                                    lineHeight: 1.15,
                                    fontWeight: 700,
                                    letterSpacing: '0.02em',
                                }}
                            >
                                {c.mainContent.section1.title}
                                <span className="text-red-600 dark:text-red-500">
                                    {c.mainContent.section1.highlight}
                                </span>
                            </h3>
                            <p
                                className="mb-4 text-body leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: c.mainContent.section1.content }}
                            />
                            <ul className="list-disc list-inside mb-4 text-body space-y-2">
                                {c.mainContent.section1.points.map((point, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: point }} />
                                ))}
                            </ul>

                            <h3
                                className="mb-3 text-slate-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight font-frantz"
                                style={{
                                    fontSize: '3rem',
                                    lineHeight: 1.15,
                                    fontWeight: 700,
                                    letterSpacing: '0.02em',
                                }}
                            >
                                {c.mainContent.section2.title}
                                <span className="text-red-600 dark:text-red-500">
                                    {c.mainContent.section2.highlight}
                                </span>
                            </h3>
                            <p
                                className="mb-4 text-body leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: c.mainContent.section2.content }}
                            />
                            <ul className="list-disc list-inside mb-4 text-body space-y-2">
                                {c.mainContent.section2.points.map((point, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: point }} />
                                ))}
                            </ul>

                            <h3
                                className="mb-3 text-slate-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight font-frantz"
                                style={{
                                    fontSize: '3rem',
                                    lineHeight: 1.15,
                                    fontWeight: 700,
                                    letterSpacing: '0.02em',
                                }}
                            >
                                {c.mainContent.section3.title}
                                <span className="text-red-600 dark:text-red-500">
                                    {c.mainContent.section3.highlight}
                                </span>
                            </h3>
                            <p
                                className="mb-4 text-body leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: c.mainContent.section3.content }}
                            />

                            <h3
                                className="mb-3 text-slate-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight font-frantz"
                                style={{
                                    fontSize: '3rem',
                                    lineHeight: 1.15,
                                    fontWeight: 700,
                                    letterSpacing: '0.02em',
                                }}
                            >
                                {c.mainContent.section4.title}
                                <span className="text-red-600 dark:text-red-500">
                                    {c.mainContent.section4.highlight}
                                </span>
                            </h3>
                            <p
                                className="mb-4 text-body leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: c.mainContent.section4.content }}
                            />
                            <ul className="list-disc list-inside mb-4 text-body space-y-2">
                                {c.mainContent.section4.points.map((point, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: point }} />
                                ))}
                            </ul>

                            <blockquote className="border-l-4 border-red-600 pl-6 my-6 text-slate-700 dark:text-slate-300">
                                <p>{c.mainContent.quote}</p>
                            </blockquote>

                            <h3
                                className="mb-3 text-slate-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight font-frantz"
                                style={{
                                    fontSize: '3rem',
                                    lineHeight: 1.15,
                                    fontWeight: 700,
                                    letterSpacing: '0.02em',
                                }}
                            >
                                {c.mainContent.whyUs.title}
                                <span className="text-red-600 dark:text-red-500">
                                    {c.mainContent.whyUs.highlight}
                                </span>
                                SELEN.<span className="text-red-600 dark:text-red-500">IT</span>?
                            </h3>
                            <p
                                className="mb-10 text-body leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: c.mainContent.whyUs.content }}
                            />

                            <div className="flex flex-wrap gap-2 justify-center mb-10">
                                {c.bullets.map((item) => (
                                    <span
                                        key={item}
                                        className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>

                            <div className="bg-cream-50 dark:bg-dark-800 rounded-2xl p-8 my-6 border border-slate-200 dark:border-dark-700">
                                <p className="text-center text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                    {c.mainContent.ctaBox.title}
                                </p>
                                <p className="text-center text-body mb-6">
                                    {c.mainContent.ctaBox.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CTA lang={lang as Locale} dict={dict.services.cta} commonDict={dict.hero} />
        </div>
    );
}
