# Selen.IT Digital Agency - Development Log

## 2026-02-04

### 00:40 - Dependency Audit & Stabilization

- Обновлены зависимости до Next.js 15.5.x
- Приведены типы PageProps к требованиям Next.js 15 (params как Promise)
- Исправлены тестовые моки ContactForm и актуализированы сценарии reCAPTCHA
- Исправлены типы Framer Motion variants в Logo
- Запущены build/lint/tests: ✅ build, ✅ lint, ✅ tests (92/92)
- Выполнен npm audit: 2 high severity (next, glob)
- Временно зафиксирован Next.js на 15.5.7 для соответствия SWC (без warning)

---

## 2026-02-10

### 01:30 - Development Etiquette & Strict Rules (Project Standards)

**Хороший тон в разработке (по пунктам):**

1. **Сначала диагностика → потом изменение.** Любая правка начинается с чтения контекста, логов и причины.
2. **Минимальные правки — максимальный эффект.** Избегаем крупных рефакторингов без нужды.
3. **Сначала типы и тесты.** TypeScript strict и тесты считаем источником правды.
4. **Никаких хардкодов.** Тексты → словари, контакты/секреты → `.env`, URL → общие константы.
5. **UI/UX консистентность.** Визуальные правки не должны ломать сетку, типографику и контраст.
6. **SEO и доступность — обязательны.** Metadata, JSON-LD, alt, aria, robots/sitemap — всегда проверяем.
7. **Стабильность важнее красоты.** Никаких «магических» стилей без объяснения и повторного использования.
8. **Один источник правды.** Повторяющиеся стили → утилитарные классы; повторяющиеся тексты → словари.

**Строгие правила, которые соблюдаем:**

- ✅ `tsc --noEmit` должен быть без ошибок.
- ✅ ESLint без ошибок.
- ✅ Все тесты должны проходить (Jest 92/92).
- ✅ Любые секреты только через env-переменные.
- ✅ Изменения не должны ломать i18n (en/ru/es).
- ✅ Никаких inline styles без крайней необходимости.
- ✅ Каждая правка фиксируется в DEV_LOG и AUDIT.

**Параметры здоровья кода (держим в хорошем состоянии):**

- Build: `next build` ✅
- Lint: `next lint` ✅
- TypeScript: `tsc --noEmit` ✅
- Tests: `jest` ✅
- Security headers: CSP + основные security headers ✅
- i18n consistency: все ключи в 3 словарях ✅
- SEO: metadata + sitemap + robots + JSON-LD ✅
- Perf: контролируем First Load JS (shared ~102 kB)

### 01:40 - Audit Follow-up & Implementation Details

- ✅ Добавлены JSON-LD schema (Organization, WebSite, LocalBusiness) в layout
- ✅ Добавлен Breadcrumb JSON-LD для внутренних страниц (about/contact/services/showreel/privacy/terms + service pages + case)
- ✅ Обновлён sitemap (включены все сервисные подстраницы + hreflang)
- ✅ Добавлен web manifest (`/app/manifest.ts`)
- ✅ `generateStaticParams` в layout для генерации всех локалей
- ✅ Исправлен `cream-50` (прозрачность 0 → 0.3)
- ✅ Ограничен `p { max-width: 70ch }` только для `.text-body` и `article p`
- ✅ Вынесены email/WhatsApp в env-переменные
- ✅ Удалён fallback reCAPTCHA ключ
- ✅ Удалены `as any` и лишние импорты
- ✅ Стили `fontVariationSettings/scaleX` заменены на `.font-frantz-stretch` (About + Footer)
- ✅ Тексты `emailActionText` перенесены в словари

### 09:20 - i18n Completion, Style Cleanup & Test Runs

- ✅ Переводы Header/Hero/Showreel приведены к словарям (без hardcoded строк)
- ✅ Inline styles удалены в Services и Showreel (Tailwind утилиты + `font-frantz-stretch`)
- ✅ Обновлены тесты Header (mock dict) и Playwright smoke (переключение на callback)
- ✅ Lint/Test/Build/E2E: `npm run lint`, `npm run test`, `npm run build`, `npm run test:e2e`
- ⚠️ E2E требовали освобождения порта 5001 (остановлен лишний процесс)

**Что остаётся:**

- Уменьшить крупные компоненты (Header, ContactForm)
- Добавить тест валидации полноты словарей
- Добавить lazy-load для секций ниже fold (Technologies/Testimonials/CTA)
- Рассмотреть миграцию next.config.js → next.config.ts

## 2026-02-01

### 11:15 - Typography System Update

- Применены глобальные стили шрифтов ко всему сайту
- Заголовки (h1-h6) используют Hedvig Letters Serif
- Основной текст (p, span, a, button, etc.) использует Rethink Sans
- Обновлён `globals.css` с явными font-family для всех элементов

### 11:20 - Showreel Section Refinement

- Поднято выезжающее слово "SHOWREEL" выше (уменьшен контейнер, добавлен negative margin)
- Уменьшено расстояние между буквами (letter-spacing: -0.04em)
- Улучшена консистентность шрифтов через CSS переменную --font-hedvig

### 11:30 - Project Audit

- Проведён полный аудит проекта
- Создан файл AUDIT.md с детальным отчётом
- Build: ✅ Успешно (87.4 kB shared JS)
- ESLint: ✅ Без ошибок
- Tests: ⚠️ 71/92 passed (устаревшие mocks в ContactForm.test.tsx)
- Выявлены security vulnerabilities в dependencies (Next.js, ESLint)

---

## 2026-01-27

### 16:30 - Project Initialization

- Initialized Next.js 14 project with TypeScript and Tailwind CSS.
- Configured project structure and core design system (dark theme).

### 16:45 - Core Components & Layout

- Developed `Header`, `Footer`, and `Hero` components.
- Implemented responsive navigation and glassmorphism effects.

### 17:00 - Main Pages & Sections

- Built Homepage, Services, About, and Contact pages.
- Added `Testimonials`, `CTA`, and `Process` sections.
- Resolved ESLint issues related to unescaped characters.

### 17:15 - Port Reconfiguration & Renaming

- Renamed "Portfolio" section and page to "Showreel" as per user request.
- Configured development server to run on port **5001**.
- Updated all internal links and metadata references.
- Embedded YouTube showreel video on Homepage and Showreel page.

### 17:20 - Branding Update

- Updated brand name from **SelenIT** to **Selen.IT** across the entire codebase.
- Updated logo structure in Header and Footer.
- Updated email from `hello@selenit.agency` to `hello@selen.it`.
- Updated metadata, README, and artifacts.

### 17:30 - Finalization

- Added `.gitignore` file.
- Established this development log.
- Verified build and verified all pages at `http://localhost:5001`.
