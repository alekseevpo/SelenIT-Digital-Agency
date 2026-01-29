# CLAUDE.md

This file provides guidance for Claude Code when working with this repository.

## Project Overview

SelenIT Digital Agency - A multilingual marketing website built with Next.js 14, React 18, TypeScript, and Tailwind CSS. The site showcases digital agency services with support for English, Russian, and Spanish.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme (dark mode via `next-themes`)
- **Animations**: Framer Motion, Lenis (smooth scrolling)
- **Icons**: Lucide React

## Commands

```bash
npm run dev      # Start dev server on port 5001
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/[lang]/           # Locale-based routing (en, ru, es)
│   ├── page.tsx          # Homepage
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── services/         # Services page
│   ├── showreel/         # Portfolio/showreel page
│   ├── privacy/          # Privacy policy
│   └── terms/            # Terms of service
├── components/
│   ├── layout/           # Header, Footer
│   ├── sections/         # Hero, Services, CTA, Testimonials, Technologies
│   ├── providers/        # ThemeProvider, SmoothScrollProvider
│   └── ui/               # Reusable UI components (Logo, TypeWriter, Reveal, etc.)
├── dictionaries/         # i18n JSON files (en.json, ru.json, es.json)
├── types/                # TypeScript type definitions
├── i18n-config.ts        # Locale configuration
├── get-dictionary.ts     # Dictionary loader
└── middleware.ts         # i18n routing middleware
```

## Internationalization (i18n)

- **Locales**: `en` (default), `ru`, `es`
- **Config**: `src/i18n-config.ts`
- **Dictionaries**: `src/dictionaries/*.json`
- **Types**: `src/types/dictionary.ts` - strongly typed dictionary interface

All text content is stored in dictionary JSON files. When adding new text:
1. Add the content to all three dictionary files (en.json, ru.json, es.json)
2. Update the `Dictionary` type in `src/types/dictionary.ts` if adding new keys

## Styling Conventions

- **Dark mode**: Class-based (`darkMode: 'class'` in Tailwind config)
- **Custom colors**: `primary`, `accent`, `dark` color palettes defined in `tailwind.config.ts`
- **Custom animations**: `fade-in`, `fade-in-up`, `slide-in-left`, `float`, `pulse-glow`, etc.
- **Global styles**: `src/app/globals.css`

## Key Patterns

- **Page components**: Receive `params.lang` for locale, call `getDictionary(lang)` to fetch translations
- **Animation wrapper**: Use `<Reveal>` component for scroll-triggered animations
- **Smooth scroll**: Provided by `SmoothScrollProvider` using Lenis
- **Theme toggle**: `ThemeToggle` component with `next-themes`

## Security Headers

Configured in `next.config.js`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection enabled
- Strict Referrer-Policy
- Restricted Permissions-Policy
