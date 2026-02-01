# Selen.IT Digital Agency - Development Log

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
