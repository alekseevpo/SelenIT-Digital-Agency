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
- **Interactive Elements** — clickable service cards, animated cookie consent, chat widget
- **Progressive Loading** — minimal loading animation with progress bar
- **Responsive Design** — mobile-first approach with adaptive layouts

## Pages

| Route                        | Description                                                      |
| ---------------------------- | ---------------------------------------------------------------- |
| `/[lang]`                    | Home — Hero, Services, Showreel, Technologies, Testimonials, CTA |
| `/[lang]/services`           | Service overview with process timeline                           |
| `/[lang]/services/branding`  | Branding service detail                                          |
| `/[lang]/services/websites`  | Web development service detail                                   |
| `/[lang]/services/seo`       | SEO service detail                                               |
| `/[lang]/services/custom`    | Custom support service detail (redirected from support)          |
| `/[lang]/services/solutions` | Integrated solutions detail                                      |
| `/[lang]/showreel`           | Project showcase with YouTube embed and filterable grid          |
| `/[lang]/about`              | Company story, values, stats, and team                           |
| `/[lang]/contact`            | Contact form with reCAPTCHA and callback request                 |
| `/[lang]/case/[slug]`        | Individual case study pages                                      |
| `/[lang]/privacy`            | Privacy policy                                                   |
| `/[lang]/terms`              | Terms of service                                                 |
| `/api/contact`               | Contact form API endpoint                                        |

## Recent UI/UX Improvements

### Navigation & Header

- Fixed contact button styling in desktop menu to match other navigation items
- Improved mobile language switcher positioning
- Enhanced dropdown menu animations and interactions

### Hero Section

- Updated mobile hero image to `/conversation_two.png`
- Adjusted hero title positioning for better desktop balance
- Maintained responsive typography across all screen sizes

### Cookie Consent

- Redesigned cookie consent window: smaller, centered on all devices
- Added transparent blurred background with backdrop blur
- Increased title font size for better readability
- Removed intrusive full-screen overlay

### Services Section

- **Interactive Service Cards**: Clickable cards with navigation to service pages
- **Special Routing**: Individual Support → `/services/custom` for all languages
- **Typography**: Increased service title font size (`text-4xl/md:text-5xl`)
- **Visual**: Removed icons for cleaner appearance
- **Color Scheme**: Cream background for service blocks in light theme
- **Content**: Updated custom service title to "Формат для вас" (Russian)

### CTA Section

- **Red Highlight**: "цифровое присутствие" / "digital presence" / "presencia digital" in red
- **Multilingual**: Consistent highlighting across all supported languages

### Technologies Section

- **Mobile Optimization**: Added line break before "современном стеке" on mobile only
- **Responsive**: Improved readability on smaller screens

### Loading Experience

- **Minimal Loading**: Removed center spinner animation
- **Progress Bar**: Kept red progress bar at top for page transitions
- **Performance**: Faster perceived loading times

### Color System

- **Light Theme**: Fixed global text colors to match design specifications
- **Consistency**: Unified color scheme across all components
- **Accessibility**: Improved contrast ratios for better readability

### Typography & Content

- **Showreel Title**: Updated "Projects & Showreel" → "Projects & Showreels"
- **Spacing**: Optimized subtitle positioning in Services section
- **Multilingual**: Enhanced content presentation across all languages

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
│   │   │   ├── custom/page.tsx # Custom support service
│   │   ├── showreel/page.tsx   # Showreel page
│   │   ├── case/[slug]/        # Case study pages (SSG)
│   │   ├── privacy/page.tsx    # Privacy policy
│   │   ├── terms/page.tsx      # Terms of service
│   │   └── layout.tsx          # Root layout with providers
│   ├── api/contact/            # Contact form API route
│   ├── globals.css             # Global styles & design system
│   └── manifest.ts             # PWA manifest with updated description
├── components/
│   ├── layout/                 # Header, Footer
│   │   ├── Header.tsx          # Enhanced navigation with service dropdown
│   │   └── Footer.tsx          # Updated links and styling
│   ├── sections/               # Hero, Services, Showreel, Technologies, Testimonials, CTA
│   │   ├── Hero.tsx            # Updated mobile image and positioning
│   │   ├── Services.tsx        # Interactive cards with routing
│   │   ├── CTA.tsx             # Red highlighted phrases
│   │   ├── Technologies.tsx    # Mobile line breaks
│   │   └── Showreel.tsx        # Updated title spacing
│   ├── providers/              # ThemeProvider, SmoothScroll, CookieConsent, Analytics, PageTransition
│   ├── ui/                     # Reveal, BackToTop, ChatWidget, Logo, ThemeToggle, LanguageSwitcher, YouTubeEmbed
│   │   ├── CookieConsent.tsx   # Redesigned compact consent window
│   │   └── ProgressBar.tsx     # Loading progress bar
│   └── icons/                  # SVG technology icons (12 files)
├── dictionaries/               # ru.json, en.json, es.json (~500 lines each)
│   ├── en.json                 # Updated "Projects & Showreels"
│   ├── ru.json                 # Updated custom service content
│   └── es.json                 # Multilingual support
├── __tests__/                  # Jest test suites
├── types/                      # TypeScript type definitions
├── lib/                        # Utility functions
├── middleware.ts                # i18n locale detection middleware
├── i18n-config.ts              # Locale configuration
└── get-dictionary.ts           # Dictionary loader with lazy imports
```

## Tech Stack

| Category      | Technology                                                                      |
| ------------- | ------------------------------------------------------------------------------- |
| Framework     | [Next.js 15](https://nextjs.org/) (App Router)                                  |
| Language      | [TypeScript 5](https://www.typescriptlang.org/)                                 |
| Styling       | [Tailwind CSS 3.4](https://tailwindcss.com/)                                    |
| UI            | [React 18](https://react.dev/)                                                  |
| Animations    | [Framer Motion 12](https://www.framer.com/motion/)                              |
| Smooth Scroll | [Lenis](https://lenis.darkroom.engineering/)                                    |
| Icons         | [Lucide React](https://lucide.dev/)                                             |
| Email         | [Resend](https://resend.com/)                                                   |
| Analytics     | [Vercel Analytics](https://vercel.com/analytics)                                |
| Testing       | [Jest 30](https://jestjs.io/) + [Testing Library](https://testing-library.com/) |

## Environment Variables

Create a `.env.local` file in the project root:

```env
RESEND_API_KEY=                        # Resend API key for email delivery
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=        # Google reCAPTCHA v3 site key
RECAPTCHA_SECRET_KEY=                  # Google reCAPTCHA v3 secret key
NEXT_PUBLIC_CONTACT_EMAIL=             # Contact email (default: alekseevpo@gmail.com)
NEXT_PUBLIC_WHATSAPP_NUMBER=           # WhatsApp number (default: +34 624 68 27 95)
```

## Key Design Decisions

### Color System

- **Light Theme**: Cream-based palette (`#fdfcf0`) with dark gray text (`#334155`)
- **Dark Theme**: Dark background with light text
- **Accent**: Red (`#dc2626`) for highlights and CTAs
- **Glass Morphism**: Translucent cards with backdrop blur

### Typography

- **Headings**: Custom font scales with responsive sizing
- **Body**: Optimized line height and readability
- **Multilingual**: Proper font support for Cyrillic and Latin scripts

### Interactive Elements

- **Service Cards**: Clickable with hover effects and proper routing
- **Navigation**: Dropdown menus with smooth animations
- **Forms**: Enhanced validation and user feedback
- **Loading**: Minimal progress indicators

### Performance

- **Images**: Optimized with Next.js Image component
- **Animations**: Hardware-accelerated with Framer Motion
- **Code Splitting**: Automatic with Next.js App Router
- **SEO**: Optimized metadata and structured data

## License

MIT © Selen.IT Digital Agency
