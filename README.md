# Selen.IT Digital Agency

A modern, high-performance multilingual website for a digital agency built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Next.js 15** with App Router and Server Components
- **TypeScript** with strict mode
- **Tailwind CSS 3.4** with custom design system (cream/dark themes)
- **Framer Motion** for scroll-driven animations and micro-interactions
- **Lenis** for smooth scrolling
- **i18n** — full support for 3 languages (English, Russian, Spanish)
- **Dark Mode** with glassmorphism effects and smooth theme transitions
- **SEO** — dynamic metadata, OpenGraph, Twitter Cards, sitemap, robots.txt
- **Security** — reCAPTCHA v3, honeypot fields, security headers
- **Analytics** — Vercel Analytics and Speed Insights
- **Email** — contact form with Resend API
- **Testing** — Jest + React Testing Library (92 tests)

## Pages

| Route | Description |
|-------|-------------|
| `/[lang]` | Home — Hero, Services, Showreel, Technologies, Testimonials, CTA |
| `/[lang]/services` | Service overview with process timeline |
| `/[lang]/services/branding` | Branding service detail |
| `/[lang]/services/websites` | Web development service detail |
| `/[lang]/services/seo` | SEO service detail |
| `/[lang]/services/custom` | Support service detail |
| `/[lang]/services/solutions` | Integrated solutions detail |
| `/[lang]/showreel` | Project showcase with YouTube embed and filterable grid |
| `/[lang]/about` | Company story, values, stats, and team |
| `/[lang]/contact` | Contact form with reCAPTCHA and callback request |
| `/[lang]/case/[slug]` | Individual case study pages |
| `/[lang]/privacy` | Privacy policy |
| `/[lang]/terms` | Terms of service |
| `/api/contact` | Contact form API endpoint |

## Getting Started

### Prerequisites

- **Node.js** >=22 <23
- **npm**

### Installation

```bash
# Install dependencies
npm install

# Start development server (port 5001)
npm run dev
```

Open [http://localhost:5001](http://localhost:5001) in your browser.

### Build & Production

```bash
npm run build    # Create production build
npm start        # Start production server
```

### Testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Linting

```bash
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── [lang]/                 # i18n dynamic routing (en, ru, es)
│   │   ├── page.tsx            # Home page
│   │   ├── about/page.tsx      # About page
│   │   ├── contact/page.tsx    # Contact page
│   │   ├── services/           # Services pages (+ subpages)
│   │   ├── showreel/page.tsx   # Showreel page
│   │   ├── case/[slug]/        # Case study pages (SSG)
│   │   ├── privacy/page.tsx    # Privacy policy
│   │   ├── terms/page.tsx      # Terms of service
│   │   └── layout.tsx          # Root layout with providers
│   ├── api/contact/            # Contact form API route
│   └── globals.css             # Global styles & design system
├── components/
│   ├── layout/                 # Header, Footer
│   ├── sections/               # Hero, Services, Showreel, Technologies, Testimonials, CTA
│   ├── providers/              # ThemeProvider, SmoothScroll, CookieConsent, Analytics, PageTransition
│   ├── ui/                     # Reveal, BackToTop, ChatWidget, Logo, ThemeToggle, LanguageSwitcher, YouTubeEmbed
│   └── icons/                  # SVG technology icons (12 files)
├── dictionaries/               # ru.json, en.json, es.json (~500 lines each)
├── __tests__/                  # Jest test suites
├── types/                      # TypeScript type definitions
├── lib/                        # Utility functions
├── middleware.ts                # i18n locale detection middleware
├── i18n-config.ts              # Locale configuration
└── get-dictionary.ts           # Dictionary loader with lazy imports
```

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| UI | [React 18](https://react.dev/) |
| Animations | [Framer Motion 12](https://www.framer.com/motion/) |
| Smooth Scroll | [Lenis](https://lenis.darkroom.engineering/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Email | [Resend](https://resend.com/) |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) |
| Testing | [Jest 30](https://jestjs.io/) + [Testing Library](https://testing-library.com/) |

## Environment Variables

Create a `.env.local` file in the project root:

```env
RESEND_API_KEY=                        # Resend API key for email delivery
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=        # Google reCAPTCHA v3 site key
RECAPTCHA_SECRET_KEY=                  # Google reCAPTCHA v3 secret key
NEXT_PUBLIC_CONTACT_EMAIL=             # Contact email (default: alekseevpo@gmail.com)
NEXT_PUBLIC_WHATSAPP_NUMBER=           # WhatsApp number (default: +34 624 68 27 95)
```

## License

MIT © Selen.IT Digital Agency
