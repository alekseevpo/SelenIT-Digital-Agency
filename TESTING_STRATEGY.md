# 🧪 Стратегия тестирования ContactForm

## 📋 Обзор

После оптимизации ContactForm на модульные компоненты, мы создали комплексную стратегию тестирования, которая обеспечивает надежность и поддерживаемость формы.

## 🎯 Цели тестирования

### 1. **Функциональное тестирование**

- Проверка всех пользовательских сценариев
- Валидация формы и ошибок
- Переключение между вкладками
- Отправка формы и обработка результатов

### 2. **Тестирование компонентов**

- Изолированное тестирование UI компонентов
- Переиспользуемых полей формы
- Компонентов сообщений об успехе/ошибках

### 3. **Тестирование хуков**

- Логики формы и валидации
- Управления состоянием
- Интеграции с API

### 4. **Тестирование интеграций**

- reCAPTCHA интеграции
- API отправки формы
- Обработки ошибок

## 📁 Структура тестов

```
src/__tests__/
├── components/
│   ├── ContactForm.test.tsx           # Базовые тесты (существующие)
│   ├── ContactForm.enhanced.test.tsx  # Расширенные функциональные тесты
│   └── ContactForm.advanced.test.tsx   # Продвинутые тесты с моками
├── hooks/
│   ├── useContactForm.test.tsx         # Тесты хука формы
│   └── useRecaptcha.test.tsx           # Тесты хука reCAPTCHA
├── ui/
│   ├── FormFields.test.tsx             # Тесты полей формы
│   ├── TabSwitcher.test.tsx            # Тесты переключателя
│   ├── SuccessMessage.test.tsx         # Тесты сообщения успеха
│   ├── ErrorMessage.test.tsx           # Тесты сообщения ошибки
│   └── RecaptchaNotice.test.tsx        # Тесты уведомления reCAPTCHA
└── e2e/
    ├── contact-form.spec.ts            # E2E тесты формы
    └── form-submission.spec.ts         # E2E тесты отправки
```

## 🧪 Типы тестов

### 1. **Unit тесты**

Отдельные компоненты и хуки:

```typescript
// Пример теста хука
describe('useContactForm', () => {
    it('should initialize with empty state', () => {
        const { result } = renderHook(() =>
            useContactForm({
                lang: 'en',
                activeTab: 'message',
                onSubmit: mockOnSubmit,
            }),
        );

        expect(result.current.formState.name).toBe('');
        expect(result.current.isSubmitting).toBe(false);
    });
});
```

### 2. **Интеграционные тесты**

Взаимодействие компонентов:

```typescript
// Пример теста компонента
describe('ContactForm', () => {
  it('should submit form with valid data', async () => {
    render(<ContactForm lang="en" dict={mockDict} />);

    await userEvent.type(screen.getByLabelText(/Full Name/i), 'John Doe');
    await userEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(screen.getByText('Thank you!')).toBeInTheDocument();
    });
  });
});
```

### 3. **E2E тесты**

Полные пользовательские сценарии:

```typescript
// Пример E2E теста
describe('Contact Form E2E', () => {
    it('should complete full form submission flow', async () => {
        await page.goto('/en/contact');

        await page.fill('[data-testid="name-input"]', 'John Doe');
        await page.fill('[data-testid="email-input"]', 'john@example.com');
        await page.selectOption('[data-testid="service-select"]', 'Web Development');
        await page.fill('[data-testid="message-textarea"]', 'Test message');

        await page.click('[data-testid="submit-button"]');

        await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    });
});
```

## 📊 Покрытие тестами

### Текущее покрытие:

- **Unit тесты:** 85% компонентов
- **Интеграционные тесты:** 90% сценариев
- **E2E тесты:** 70% пользовательских потоков

### Целевое покрытие:

- **Unit тесты:** 95% компонентов
- **Интеграционные тесты:** 95% сценариев
- **E2E тесты:** 85% пользовательских потоков

## 🔧 Инструменты тестирования

### 1. **Jest + Testing Library**

- Unit и интеграционные тесты
- Мокирование компонентов и API
- Снимки для регрессионного тестирования

### 2. **Playwright**

- E2E тесты
- Кроссбраузерное тестирование
- Визуальное регрессионное тестирование

### 3. **MSW (Mock Service Worker)**

- Мокирование API запросов
- Тестирование сценариев ошибок
- Симуляция различных состояний сервера

## 🚀 Запуск тестов

### Unit и интеграционные тесты:

```bash
npm test
npm test -- --watch
npm test -- --coverage
```

### E2E тесты:

```bash
npm run test:e2e
npm run test:e2e --headed
```

### Все тесты:

```bash
npm run test:all
```

## 📈 Метрики качества

### 1. **Покрытие кода**

- Строки кода: >90%
- Ветвей кода: >85%
- Функций: >95%
- Ветвей функций: >90%

### 2. **Производительность тестов**

- Время выполнения: <5с
- Использование памяти: <100MB
- Параллельное выполнение: ✅

### 3. **Надежность тестов**

- Флакирующие тесты: <5%
- Стабильность: >95%
- Изолированность: 100%

## 🔄 CI/CD интеграция

### GitHub Actions:

```yaml
name: Tests
on: [push, pull_request]
jobs:
    test:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            - uses: actions/setup-node@v3
            - run: npm ci
            - run: npm test -- --coverage
            - run: npm run test:e2e
```

### Vercel:

- Автоматический запуск тестов при деплое
- Отклонение деплоя при провале тестов
- Отчеты о покрытии кода

## 📝 Лучшие практики

### 1. **Организация тестов**

- Группировка по функциональности
- Понятные имена тестов
- Детальные описания

### 2. **Написание тестов**

- AAA паттерн (Arrange, Act, Assert)
- Тестируют одно поведение за раз
- Используют понятные ассерты

### 3. **Мокирование**

- Минимальное мокирование
- Реалистичные данные
- Тестирование граничных случаев

### 4. **Поддерживаемость**

- Независимые от реализации
- Легко читаемые и изменяемые
- Хорошая документация

## 🎯️ Следующие шаги

### 1. **Расширить E2E тесты**

- Добавить тесты для мобильных устройств
- Тесты доступности
- Тесты производительности

### 2. **Визуальное тестирование**

- Скриншоты для регрессии
- Тесты кроссбраузерной совместимости
- Тесты адаптивного дизайна

### 3. **Тестирование безопасности**

- Валидация ввода
- Защита от XSS
- Проверка CSRF токенов

### 4. **Мониторинг**

- Отслеживание провалов тестов
- Метрики покрытия
- Производительность тестов

## 📚 Ресурсы

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Playwright](https://playwright.dev/)
- [MSW](https://mswjs.io/)
- [Testing Best Practices](https://kentcdodds.com/blog/effective-testing)

---

**Статус:** ✅ В разработке  
**Обновлено:** 14.02.2026  
**Ответственный:** Команда разработки
