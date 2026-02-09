# Selen.IT Digital Agency — Полный аудит проекта

**Дата аудита:** 2026-02-09  
**Версия проекта:** 0.1.0  
**Ветка:** v0.2.0

---

## Статус сборки

### Production Build: ✅ УСПЕШНО

```
Route (app)                                 Size  First Load JS
┌ ○ /_not-found                            995 B         103 kB
├ ƒ /[lang]                              21.5 kB         173 kB
├ ƒ /[lang]/about                          173 B         111 kB
├ ● /[lang]/case/[slug]                  1.07 kB         147 kB
├ ƒ /[lang]/contact                      6.53 kB         149 kB
├ ƒ /[lang]/services                     1.08 kB         147 kB
├ ƒ /[lang]/services/branding            1.08 kB         147 kB
├ ƒ /[lang]/services/custom              1.08 kB         147 kB
├ ƒ /[lang]/services/seo                 1.08 kB         147 kB
├ ƒ /[lang]/services/solutions             161 B         106 kB
├ ƒ /[lang]/services/websites            1.08 kB         147 kB
├ ƒ /[lang]/showreel                     3.27 kB         150 kB
├ ƒ /[lang]/terms                          141 B         102 kB
├ ƒ /[lang]/privacy                        141 B         102 kB
├ ƒ /api/contact                           141 B         102 kB
├ ○ /robots.txt                            141 B         102 kB
└ ○ /sitemap.xml                           141 B         102 kB
+ First Load JS shared by all             102 kB
```

### ESLint: ✅ БЕЗ ОШИБОК
### TypeScript: ✅ БЕЗ ОШИБОК (`tsc --noEmit` — 0 ошибок)

### Тесты: ⚠️ 88/92 PASSED (4 failed)

| Файл | Статус | Деталь |
|------|--------|--------|
| TypeWriter.test.tsx | ✅ PASS | 14/14 |
| CookieConsentProvider.test.tsx | ✅ PASS | 30/30 |
| ContactForm.test.tsx | ✅ PASS | 30/30 |
| LanguageSwitcher.test.tsx | ❌ FAIL | 1 failed — `has different styling for active vs inactive buttons` |
| Header.test.tsx | ❌ FAIL | 3 failed — `renders logo`, `closes mobile menu (overlay)`, `closes mobile menu (link click)` |

### Merge Conflicts: ✅ ОТСУТСТВУЮТ (в исходном коде)

---

## Общая информация

| Параметр | Значение |
|----------|----------|
| Фреймворк | Next.js ^15.5.7 (App Router) |
| Язык | TypeScript ^5.0, strict mode |
| Стилизация | Tailwind CSS ^3.4.0 |
| React | ^18.3.0 |
| Анимации | Framer Motion ^12.29.2 |
| Smooth Scroll | Lenis ^1.3.17 |
| Email | Resend ^6.9.1 |
| Аналитика | @vercel/analytics, @vercel/speed-insights |
| Тестирование | Jest ^30.2.0, @testing-library/react ^16.3.2 |
| Исходных файлов (.ts/.tsx) | 74 |
| Словари (i18n) | 3 (en, ru, es) — ~500 строк каждый |
| Node.js | >=22 <23 |

---

## 1. АРХИТЕКТУРА И СТРУКТУРА

### ✅ Сильные стороны

```
src/
├── app/[lang]/              # i18n routing (en, ru, es)
│   ├── page.tsx             # Главная (Hero, Services, Showreel, Technologies, Testimonials, CTA)
│   ├── about/page.tsx       # О нас
│   ├── contact/page.tsx     # Контакты
│   ├── services/page.tsx    # Услуги (+ подстраницы: branding, websites, seo, custom, solutions)
│   ├── showreel/page.tsx    # Шоурилс
│   ├── case/[slug]/page.tsx # Кейсы
│   ├── privacy/page.tsx     # Политика конфиденциальности
│   └── terms/page.tsx       # Условия использования
├── components/
│   ├── layout/              # Header (569 строк), Footer (299 строк)
│   ├── sections/            # Hero, Services, Showreel, Technologies, Testimonials, CTA
│   ├── providers/           # ThemeProvider, SmoothScrollProvider, CookieConsent, Analytics, PageTransition
│   ├── ui/                  # Reveal, BackToTop, ChatWidget, Logo, ThemeToggle, LanguageSwitcher, YouTubeEmbed и др.
│   └── icons/               # SVG иконки технологий (12 файлов)
├── dictionaries/            # ru.json, en.json, es.json
├── __tests__/               # 5 тестовых файлов
├── types/                   # dictionary.ts
├── lib/                     # утилиты
├── middleware.ts             # i18n middleware
├── i18n-config.ts           # конфигурация локалей
└── get-dictionary.ts        # загрузчик словарей
```

- **Чёткое разделение** серверных (page.tsx) и клиентских ('use client') компонентов
- **Middleware** корректно обрабатывает определение локали через `@formatjs/intl-localematcher` и `negotiator`
- **Типизация словарей** через `Dictionary` тип в `src/types/dictionary.ts`
- **Lazy loading** словарей через dynamic `import()`

### ⚠️ Замечания

- **Header.tsx — 569 строк.** Слишком большой компонент. Содержит: десктопную навигацию, мобильное меню, dropdown услуг, анимации, scroll-логику. Рекомендуется разбить на подкомпоненты.
- **ContactForm.tsx — 35 530 байт.** Очень большой файл. Содержит форму, валидацию, reCAPTCHA, табы, анимации. Стоит вынести логику валидации и API-вызовы в отдельные хуки.
- **Дублирование переводов в компонентах.** Навигационные тексты захардкожены в `Header.tsx` (строки 97-101) вместо использования словарей:
  ```typescript
  const navigations: Record<Locale, ...> = {
      en: { home: 'Home', services: 'Services', ... },
      ru: { home: 'Главная', services: 'Услуги', ... },
      ...
  };
  ```
  Эти тексты уже есть в `common.nav` словарей. Нужно передавать `dict` через props.

---

## 2. КАЧЕСТВО КОДА

### ✅ Сильные стороны

- **TypeScript strict mode** — 0 ошибок компиляции
- **ESLint** — 0 ошибок и предупреждений
- **Консистентные интерфейсы** — все компоненты имеют типизированные props
- **Хорошее использование Framer Motion** — `useScroll`, `useTransform`, `useInView`, `AnimatePresence`
- **Reveal компонент** — универсальный, поддерживает 7 типов анимаций

### 🔴 Критические проблемы кода

#### 2.1. `as any` type assertions

В `layout.tsx` (строки 122, 128):
```typescript
<Header lang={lang as any} />
<Footer lang={lang as any} dict={dict} />
```
**Проблема:** Обход типизации. `lang` — это `string`, а `Header` ожидает `Locale`.  
**Решение:** Использовать `lang as Locale` после валидации или типизировать `params` как `Locale`.

#### 2.2. Захардкоженный reCAPTCHA ключ

В `ContactForm.tsx`:
```typescript
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LdTllosAAAAAMPpiP2SBA8aXW0JRKc5Legha5Jp';
```
**Проблема:** Fallback-ключ в коде — утечка секрета. Если `.env.local` не настроен, используется публичный ключ.  
**Решение:** Убрать fallback, показывать ошибку если ключ не задан.

#### 2.3. Захардкоженные тексты в компонентах

Несколько компонентов содержат тексты напрямую вместо словарей:

- **Showreel.tsx** (строки 20-24): `showreelTitle` объект с переводами
- **Showreel.tsx** (строки 86-90): subtitle текст через тернарный оператор `lang === 'ru' ? ... : ...`
- **Hero.tsx** (строки 219-222): labels статистики (`'Проектов'`, `'Клиентов'`, `'Лет'`)
- **Contact page** (строки 24-28): `emailActionText` объект
- **Footer.tsx** (строки 34-38): `emailActionText` дублирован

**Решение:** Перенести все тексты в словари `ru.json`, `en.json`, `es.json`.

#### 2.4. Неиспользуемые импорты и переменные

- **Showreel.tsx**: импортирует `useState` для `showPlayButton`, но `slideInRight` и `fadeIn` (строки 50-51) нигде не используются в JSX
- **Services.tsx**: `slideInRight` (строка 56) вычисляется, но не используется в JSX
- **Testimonials.tsx**: `mounted` state (строка 34) устанавливается, но нигде не проверяется

#### 2.5. Inline styles вместо Tailwind классов

Множество компонентов используют `style={{}}` вместо Tailwind:
- **Services.tsx** (строка 91): `style={{ fontVariationSettings: "'wght' 900", transform: 'scaleX(1.15)' }}`
- **Showreel.tsx** (строка 73): `style={{ display: 'inline-block', transform: 'scaleY(1.7) scaleX(1.05)', transformOrigin: 'center' }}`
- **About page** (строка 138, 183): повторяющиеся `style={{ fontVariationSettings: "'wght' 900", transform: 'scaleX(1.15)' }}`

**Решение:** Создать утилитарные CSS-классы в `globals.css` для повторяющихся стилей:
```css
.font-frantz-stretch {
    font-variation-settings: 'wght' 900;
    transform: scaleX(1.15);
    transform-origin: left;
}
```

---

## 3. СЛОВАРИ И ЛОКАЛИЗАЦИЯ

### ✅ Сильные стороны

- 3 полных словаря: `ru.json` (504 строки), `en.json` (502 строки), `es.json` (502 строки)
- Структурированная иерархия: `cookies`, `common`, `contact`, `hero`, `home`, `services`, `showreel`, `about`, `testimonials`
- Middleware корректно фильтрует wildcard языки и невалидные строки

### ⚠️ Замечания

- **ru.json строка 98**: лишний пробел перед `"subtitle"` — косметический дефект, но может вызвать проблемы при diff/merge
- **Subtitle в hero** — очень длинная строка (~400 символов). Рекомендуется разбить на отдельные ключи (`subtitle_line1`, `subtitle_line2`, ...) для удобства редактирования
- **Нет валидации словарей.** Если ключ отсутствует в одном из словарей, приложение упадёт в runtime. Рекомендуется добавить проверку полноты словарей в тестах

---

## 4. СТИЛИЗАЦИЯ И CSS

### ✅ Сильные стороны

- **Дизайн-система** в `tailwind.config.ts`: кастомные цвета (`cream`, `primary`, `accent`, `dark`), шрифты, анимации, тени
- **CSS-переменные** для тем (light/dark) в `globals.css`
- **Компонентные классы** через `@layer components`: `.glass-card`, `.btn-primary`, `.btn-secondary`, `.section-padding`, `.container-custom`, `.heading-hero`
- **Smooth theme transition** — плавный переход между темами
- **Tech scroll** — бесконечная прокрутка технологий с паузой при hover

### ⚠️ Замечания

- **`heading-hero` класс** (globals.css строки 115-127) использует `transform: scaleY(1.7) scaleX(1.15)` — это может вызвать проблемы с accessibility (размытие текста при масштабировании). Рекомендуется тестировать на разных устройствах
- **`p { max-width: 70ch }` глобальное правило** (строка 111) — может неожиданно ограничивать ширину параграфов в компонентах, где это нежелательно
- **Дублирование `next.config.js` images.domains** — используется deprecated `domains` вместо `remotePatterns`
- **`cream-50` цвет полностью прозрачный** (`rgba(253, 248, 240, 0)`) — комментарий говорит "force rebuild", возможно это временное решение

---

## 5. БЕЗОПАСНОСТЬ

### ✅ Сильные стороны

- **Security headers** в `next.config.js`: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy
- **reCAPTCHA v3** для защиты формы
- **Honeypot поле** в ContactForm
- **Серверная валидация** в API route `/api/contact`
- **`rel="noopener noreferrer"`** на внешних ссылках

### 🔴 Проблемы

- **Отсутствует Content-Security-Policy (CSP) header** — критически важный заголовок для защиты от XSS
- **Захардкоженный reCAPTCHA ключ** (см. п. 2.2)
- **Email `alekseevpo@gmail.com` захардкожен** в нескольких файлах (contact/page.tsx, Footer.tsx). Рекомендуется вынести в env-переменную
- **WhatsApp номер захардкожен** (`+34 624 68 27 95`) в нескольких местах

---

## 6. ПРОИЗВОДИТЕЛЬНОСТЬ

### ✅ Сильные стороны

- **First Load JS shared: 102 kB** — хороший показатель
- **Статическая генерация** для case study страниц (SSG с `generateStaticParams`)
- **Оптимизация изображений**: `next/image` с форматами avif/webp
- **Font optimization**: `next/font` с `display: 'swap'`
- **Lazy loading** словарей через dynamic import
- **Video preload="metadata"** — не загружает видео до взаимодействия

### ⚠️ Замечания

- **Главная страница: 173 kB First Load JS** — самая тяжёлая страница. Причина — 6 секций с Framer Motion анимациями. Рекомендуется lazy-load для секций ниже fold (Technologies, Testimonials, CTA)
- **Framer Motion ^12.29.2** — тяжёлая библиотека. Для простых анимаций (fade-in, slide) можно использовать CSS transitions
- **Technologies.tsx** — тройное дублирование массива технологий для бесконечного скролла (`[...technologies, ...technologies, ...technologies]`). Работает, но создаёт лишние DOM-элементы (42 вместо 14)
- **SVG иконки inline** в Header.tsx, Footer.tsx, Services.tsx — увеличивают размер bundle. Рекомендуется использовать sprite или lucide-react (уже в зависимостях)

---

## 7. ТЕСТЫ

### Текущий статус

```
Test Suites: 2 failed, 3 passed, 5 total
Tests:       4 failed, 88 passed, 92 total
```

### Проваленные тесты

| Тест | Файл | Причина |
|------|-------|---------|
| `has different styling for active vs inactive buttons` | LanguageSwitcher.test.tsx | Вероятно, изменился CSS/className компонента |
| `renders logo with link to home` | Header.test.tsx | Компонент Logo изменился, тест не обновлён |
| `closes mobile menu when overlay is clicked` | Header.test.tsx | `waitFor` timeout — framer-motion AnimatePresence не обрабатывается в тестовом окружении |
| `closes mobile menu when a navigation link is clicked` | Header.test.tsx | Аналогично — проблема с mock framer-motion |

### Рекомендации по тестам

- **Обновить mock для framer-motion** — AnimatePresence и motion компоненты нужно корректно мокать
- **Добавить тесты для**: API route `/api/contact`, ShowreelGrid, CTA, About page, Services page
- **Добавить e2e тесты** (Playwright/Cypress) для критических user flows: навигация, смена языка, отправка формы
- **Добавить тест валидации словарей** — проверять что все ключи присутствуют во всех 3 словарях

---

## 8. КОНФИГУРАЦИЯ

### ⚠️ Замечания

- **`next.config.js`** использует CommonJS (`module.exports`) вместо ESM. Next.js 15 поддерживает `next.config.ts`
- **`images.domains`** — deprecated в Next.js 15, нужно использовать `images.remotePatterns`
- **`engines: "node": ">=22 <23"`** — очень строгое ограничение. Node 22 — текущий LTS, но ограничение `<23` может вызвать проблемы при обновлении
- **Отсутствует `.nvmrc`** или `.node-version` файл для автоматического переключения версии Node
- **Отсутствует `prettier`** — только ESLint для форматирования

---

## 📊 СВОДНАЯ ТАБЛИЦА МЕТРИК

| Метрика | Значение | Оценка |
|---------|----------|--------|
| Production Build | ✅ Успешно | ✅ |
| TypeScript | 0 ошибок | ✅ |
| ESLint | 0 ошибок | ✅ |
| Тесты | 88/92 passed (96%) | ⚠️ |
| Merge Conflicts | 0 | ✅ |
| Security Headers | 5/6 (нет CSP) | ⚠️ |
| i18n | 3 языка, полные словари | ✅ |
| First Load JS (shared) | 102 kB | ✅ |
| Heaviest page | /[lang] — 173 kB | ⚠️ |
| Количество страниц | 17 routes | ✅ |

---

## 📋 ИТОГОВАЯ ОЦЕНКА

| Категория | Балл | Комментарий |
|-----------|------|-------------|
| Архитектура | 8/10 | Отличная структура, но Header слишком большой |
| Качество кода | 7/10 | TS без ошибок, но есть `as any`, захардкоженные значения |
| Стилизация | 8/10 | Продуманная дизайн-система, но много inline styles |
| Безопасность | 6/10 | Хорошие headers, но нет CSP, захардкоженные ключи |
| Производительность | 8/10 | Хорошие показатели, есть потенциал оптимизации |
| Тесты | 6/10 | 88 тестов, но 4 провалены, нет e2e |
| Локализация | 9/10 | Полная поддержка 3 языков |
| Документация | 4/10 | README устаревший, нет API docs |

**Общая оценка: 7.0/10** — Проект в рабочем состоянии, хорошо структурирован, успешно собирается. Основные области для улучшения: починить 4 теста, убрать захардкоженные значения, разбить крупные компоненты, добавить CSP.

---

## 🚀 ПЛАН ДЕЙСТВИЙ (по приоритетам)

### P0 — Немедленно
1. Починить 4 проваленных теста (Header.test.tsx, LanguageSwitcher.test.tsx)
2. Убрать захардкоженный reCAPTCHA fallback ключ

### P1 — В течение недели
3. Вынести email и WhatsApp номер в env-переменные
4. Убрать `as any` в layout.tsx — заменить на `as Locale`
5. Перенести захардкоженные тексты из компонентов в словари
6. Удалить неиспользуемые переменные (slideInRight в Services, mounted в Testimonials)

### P2 — В течение месяца
7. Разбить Header.tsx на подкомпоненты (DesktopNav, MobileMenu, ServicesDropdown)
8. Создать CSS-класс для повторяющихся inline styles (`font-frantz-stretch`)
9. Добавить Content-Security-Policy header
10. Заменить `images.domains` на `images.remotePatterns` в next.config
11. Добавить тест валидации полноты словарей
12. Обновить README.md

### P3 — По возможности
13. Lazy-load секций ниже fold на главной странице
14. Добавить e2e тесты (Playwright)
15. Настроить prettier + husky + lint-staged
16. Рассмотреть миграцию next.config.js → next.config.ts
17. Добавить `.nvmrc` файл
