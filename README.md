# Selen.IT Digital Agency

A modern, high-performance website for a digital agency built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ⚡ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** with custom design system
- 📱 **Fully Responsive** design
- 🌙 **Dark Mode** premium theme
- ✨ **Smooth Animations** and micro-interactions
- 🔍 **SEO Optimized** with metadata
- 💅 **Glassmorphism** effects
- 🚀 **Performance Optimized**

## Pages

- **Home** - Hero, Services, Showreel, Testimonials, CTA
- **Services** - Detailed service offerings with process timeline
- **Showreel** - Project showcase with filtering
- **About** - Company story, values, and team
- **Contact** - Contact form with validation

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server (port 5001)
npm run dev
```

Open [http://localhost:5001](http://localhost:5001) in your browser.

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── [lang]/             # i18n routing (en, ru, es)
│   ├── api/contact/        # Contact API endpoint
│   └── globals.css         # Global styles
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Page sections
│   └── ui/                 # Reusable UI components
├── dictionaries/           # i18n translations
└── types/                  # TypeScript types
```

## Technologies

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Environment Variables

```env
RESEND_API_KEY=          # API key for Resend email delivery
```

## License

MIT © Selen.IT Digital Agency
