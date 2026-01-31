# CLAUDE.md

Инструкции для Claude Code при работе с этим репозиторием.

## Обзор проекта

**SelenIT Digital Agency** — мультиязычный маркетинговый сайт цифрового агентства. Поддерживает три языка: английский, русский и испанский.

## Технологический стек

| Категория | Технология |
|-----------|------------|
| Фреймворк | Next.js 14 (App Router) |
| Язык | TypeScript |
| Стилизация | Tailwind CSS + next-themes (тёмная тема) |
| Анимации | Framer Motion, Lenis (плавный скролл) |
| Иконки | Lucide React |
| Email | Resend |
| Аналитика | Vercel Analytics, Speed Insights |

## Команды

```bash
npm run dev      # Запуск dev-сервера на порту 5001
npm run build    # Продакшен сборка
npm run start    # Запуск продакшен сервера
npm run lint     # Запуск ESLint
```

## Структура проекта

```
src/
├── app/
│   ├── [lang]/                 # Роутинг по локалям (en, ru, es)
│   │   ├── page.tsx            # Главная страница
│   │   ├── about/              # О нас
│   │   ├── contact/            # Контакты
│   │   ├── services/           # Услуги
│   │   ├── showreel/           # Портфолио
│   │   ├── privacy/            # Политика конфиденциальности
│   │   ├── terms/              # Условия использования
│   │   ├── [...not-found]/     # Catch-all для 404
│   │   ├── layout.tsx          # Корневой layout
│   │   ├── loading.tsx         # Состояние загрузки
│   │   ├── error.tsx           # Обработка ошибок
│   │   └── not-found.tsx       # Страница 404
│   ├── api/contact/            # API endpoint для формы контактов
│   ├── robots.ts               # Генерация robots.txt
│   ├── sitemap.ts              # Генерация sitemap.xml
│   └── globals.css             # Глобальные стили
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Шапка сайта с навигацией
│   │   └── Footer.tsx          # Подвал сайта
│   │
│   ├── sections/               # Секции страниц
│   │   ├── Hero.tsx            # Главный баннер
│   │   ├── Services.tsx        # Секция услуг
│   │   ├── Technologies.tsx    # Технологии
│   │   ├── Testimonials.tsx    # Отзывы
│   │   ├── Showreel.tsx        # Превью портфолио
│   │   └── CTA.tsx             # Call-to-action блок
│   │
│   ├── providers/              # React провайдеры
│   │   ├── theme-provider.tsx  # Провайдер темы
│   │   ├── SmoothScrollProvider.tsx  # Lenis плавный скролл
│   │   ├── PageTransition.tsx  # Анимации переходов
│   │   ├── CookieConsentProvider.tsx # Провайдер согласия на cookies
│   │   ├── CookieConsentWrapper.tsx  # Обёртка для cookies
│   │   └── AnalyticsWrapper.tsx      # Обёртка аналитики
│   │
│   ├── ui/                     # UI компоненты
│   │   ├── Logo.tsx            # Логотип
│   │   ├── ThemeToggle.tsx     # Переключатель темы
│   │   ├── LanguageSwitcher.tsx # Переключатель языка
│   │   ├── Reveal.tsx          # Анимация появления при скролле
│   │   ├── AnimatedTitle.tsx   # Анимированные заголовки
│   │   ├── TypeWriter.tsx      # Эффект печатной машинки
│   │   ├── FluidBackground.tsx # Анимированный фон
│   │   ├── YouTubeEmbed.tsx    # Встраивание YouTube видео
│   │   └── CookieConsent.tsx   # Баннер согласия на cookies
│   │
│   ├── ContactForm.tsx         # Форма обратной связи
│   └── ShowreelGrid.tsx        # Сетка портфолио
│
├── dictionaries/               # Файлы переводов
│   ├── en.json                 # Английский
│   ├── ru.json                 # Русский
│   └── es.json                 # Испанский
│
├── types/
│   └── dictionary.ts           # Типы для словарей i18n
│
├── i18n-config.ts              # Конфигурация локалей
├── get-dictionary.ts           # Загрузчик словарей
└── middleware.ts               # Middleware для i18n роутинга
```

## Интернационализация (i18n)

### Локали
- `en` — английский (по умолчанию)
- `ru` — русский
- `es` — испанский

### Как добавить новый текст
1. Добавить контент во все три файла словарей (`en.json`, `ru.json`, `es.json`)
2. Обновить тип `Dictionary` в `src/types/dictionary.ts`

### Использование в компонентах
```tsx
// В серверных компонентах страниц
import { getDictionary } from '@/get-dictionary';

export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang);
  return <h1>{dict.home.title}</h1>;
}
```

## Стилизация

### Темы
- Тёмная тема через класс (`darkMode: 'class'` в Tailwind)
- Переключение через `ThemeToggle` компонент

### Кастомные цвета (tailwind.config.ts)
- `primary` — основной цвет бренда
- `accent` — акцентный цвет
- `dark` — цвета для тёмной темы

### Кастомные анимации
- `fade-in`, `fade-in-up` — появление
- `slide-in-left` — выезд слева
- `float` — плавающий эффект
- `pulse-glow` — пульсирующее свечение

## Ключевые паттерны

### Анимация появления при скролле
```tsx
import Reveal from '@/components/ui/Reveal';

<Reveal>
  <div>Контент появится при скролле</div>
</Reveal>
```

### Плавный скролл
Обеспечивается `SmoothScrollProvider` с библиотекой Lenis.

### Переходы между страницами
Используется `PageTransition` компонент с Framer Motion.

## API Endpoints

### POST /api/contact
Обработка формы обратной связи через Resend.

**Body:**
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

## Переменные окружения

```env
RESEND_API_KEY=          # API ключ Resend для отправки email
```

## Безопасность

Заголовки безопасности в `next.config.js`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- Strict `Referrer-Policy`
- Ограниченная `Permissions-Policy`

## Рекомендации по разработке

1. **Всегда** обновляй все три файла словарей при добавлении текста
2. Используй компонент `<Reveal>` для анимаций появления
3. Серверные компоненты по умолчанию — добавляй `'use client'` только при необходимости
4. Следуй существующей структуре папок при добавлении компонентов
5. Используй Tailwind классы, избегай inline стилей
