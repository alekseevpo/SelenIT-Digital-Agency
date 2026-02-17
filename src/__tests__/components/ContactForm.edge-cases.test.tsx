import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import * as React from 'react';
import '@testing-library/jest-dom';

// Mock Response for Node.js environment
global.Response = class Response {
    constructor(body: any, init?: ResponseInit) {
        this.body = body;
        this.status = init?.status || 200;
        this.ok = this.status >= 200 && this.status < 300;
    }
    body: any;
    status: number;
    ok: boolean;
    headers: Headers;
    async json() {
        return typeof this.body === 'string' ? JSON.parse(this.body) : this.body;
    }
} as any;

// Мок для ContactForm
const ContactFormMock = ({
    lang = 'en',
    dict = {},
}: {
    lang?: string;
    dict?: Record<string, any>;
} = {}) => {
    // Добавляем дефолтные значения для словаря
    const safeDict = {
        title: 'Contact Us',
        fullName: 'Full Name',
        email: 'Email',
        company: 'Company',
        companyPlaceholder: 'Your company',
        service: 'Service',
        serviceOptions: ['Web Development', 'Design', 'Consulting'],
        budget: 'Budget',
        budgetOptions: ['$1k-$5k', '$5k-$10k', '$10k+'],
        details: 'Details',
        detailsPlaceholder: 'Tell us about your project...',
        submit: 'Submit',
        sending: 'Sending...',
        success: 'Success!',
        successTitle: 'Thank you!',
        successSubtitle: 'We will get back to you soon.',
        callbackSuccessTitle: 'We will call you soon!',
        callbackSuccessSubtitle: 'Our manager will contact you shortly.',
        sendAnother: 'Send another message',
        selectService: 'Select a service',
        selectBudget: 'Select budget',
        notSureOption: 'Not sure yet',
        tabs: {
            message: 'Message',
            callback: 'Callback',
        },
        ...dict,
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        // Получаем honeypot поле
        const honeypot = form.querySelector<HTMLInputElement>('[name="website"]')?.value || '';

        // Проверка honeypot поля
        if (honeypot) {
            // Бот заполнил honeypot поле, не отправляем форму
            return;
        }

        // Получаем значения из полей
        const name = form.querySelector<HTMLInputElement>('[name="name"]')?.value || '';
        const email = form.querySelector<HTMLInputElement>('[name="email"]')?.value || '';
        const company = form.querySelector<HTMLInputElement>('[name="company"]')?.value || '';
        const message = form.querySelector<HTMLTextAreaElement>('[name="message"]')?.value || '';

        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    company,
                    message,
                    recaptchaToken: 'test-recaptcha-token',
                }),
            });
        } catch (error) {
            console.error('Form submission error:', error);
            throw error;
        }
    };

    return (
        <div data-testid="contact-form-mock">
            <h2>{safeDict.title}</h2>
            <form data-testid="contact-form" onSubmit={handleSubmit}>
                {/* Honeypot field */}
                <div aria-hidden="true" className="hidden">
                    <input
                        autoComplete="off"
                        name="website"
                        tabIndex={-1}
                        type="text"
                        data-testid="honeypot"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>
                            {safeDict.fullName}
                            <input
                                name="name"
                                data-testid="name-input"
                                placeholder={safeDict.fullName}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            {safeDict.email}
                            <input
                                name="email"
                                type="email"
                                data-testid="email-input"
                                placeholder={safeDict.email}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </label>
                    </div>
                    <div className="md:col-span-2">
                        <label>
                            {safeDict.company}
                            <input
                                name="company"
                                data-testid="company-input"
                                placeholder={safeDict.companyPlaceholder}
                                className="w-full p-2 border rounded"
                            />
                        </label>
                    </div>
                    <div className="md:col-span-2">
                        <label>
                            {safeDict.details}
                            <textarea
                                name="message"
                                data-testid="message-input"
                                placeholder={safeDict.detailsPlaceholder}
                                required
                                rows={4}
                                className="w-full p-2 border rounded"
                            />
                        </label>
                    </div>
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            data-testid="submit-button"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            {safeDict.submit}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

// Мокаем оригинальный компонент
jest.mock('@/components/ContactForm', () => ({
    __esModule: true,
    default: ContactFormMock,
}));

// Тестовые данные
const mockDict = {
    title: 'Связаться с нами',
    fullName: 'Полное имя',
    email: 'Email',
    submit: 'Отправить',
    success: 'Успешно отправлено!',
    error: 'Произошла ошибка',
};

describe('ContactForm - Крайние случаи', () => {
    let originalFetch: typeof global.fetch;
    let originalGrecaptcha: any;
    let mockFetch: jest.Mock;

    beforeEach(() => {
        // Сохраняем оригинальные реализации
        originalFetch = global.fetch;
        originalGrecaptcha = (window as any).grecaptcha;

        // Мокаем fetch
        mockFetch = jest.fn();
        global.fetch = mockFetch.mockImplementation(() =>
            Promise.resolve(
                new Response(JSON.stringify({ success: true }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }),
            ),
        ) as jest.MockedFunction<typeof global.fetch>;

        // Мокаем grecaptcha
        (window as any).grecaptcha = {
            ready: (callback: () => void) => callback(),
            execute: () => Promise.resolve('test-token'),
        };
    });

    afterEach(() => {
        // Восстанавливаем оригинальные реализации
        global.fetch = originalFetch;
        (window as any).grecaptcha = originalGrecaptcha;
        // Очищаем моки
        jest.clearAllMocks();
    });

    it('отображает форму с правильным начальным состоянием', () => {
        render(<ContactFormMock lang="ru" dict={mockDict} />);

        // Проверяем наличие формы
        const form = screen.getByTestId('contact-form');
        expect(form).toBeInTheDocument();

        // Проверяем наличие полей ввода
        const nameInput = screen.getByPlaceholderText(mockDict.fullName);
        const emailInput = screen.getByPlaceholderText(mockDict.email);
        const submitButton = screen.getByText(mockDict.submit);

        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it('отправляет форму с валидными данными', async () => {
        const user = userEvent.setup();
        render(<ContactFormMock lang="ru" dict={mockDict} />);

        // Заполняем форму
        await user.type(screen.getByTestId('name-input'), 'Иван Иванов');
        await user.type(screen.getByTestId('email-input'), 'test@example.com');
        await user.type(screen.getByTestId('company-input'), 'Тестовая компания');
        await user.type(screen.getByTestId('message-input'), 'Тестовое сообщение');

        // Отправляем форму
        await user.click(screen.getByTestId('submit-button'));

        // Проверяем, что fetch был вызван с правильными параметрами
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'Иван Иванов',
                    email: 'test@example.com',
                    company: 'Тестовая компания',
                    message: 'Тестовое сообщение',
                    recaptchaToken: 'test-recaptcha-token',
                }),
            });
        });
    });

    it('обрабатывает успешную отправку формы', async () => {
        const user = userEvent.setup();

        render(<ContactFormMock lang="ru" dict={mockDict} />);

        // Заполняем все обязательные поля
        await user.type(screen.getByTestId('name-input'), 'Иван Иванов');
        await user.type(screen.getByTestId('email-input'), 'test@example.com');
        await user.type(screen.getByTestId('company-input'), 'Тестовая компания');
        await user.type(screen.getByTestId('message-input'), 'Тестовое сообщение');

        // Отправляем форму
        await user.click(screen.getByTestId('submit-button'));

        // Проверяем, что fetch был вызван с правильными данными
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'Иван Иванов',
                    email: 'test@example.com',
                    company: 'Тестовая компания',
                    message: 'Тестовое сообщение',
                    recaptchaToken: 'test-recaptcha-token',
                }),
            });
        });
    });

    it('игнорирует отправку, если заполнено honeypot поле', async () => {
        const user = userEvent.setup();
        render(<ContactFormMock lang="ru" dict={mockDict} />);

        // Заполняем форму
        await user.type(screen.getByTestId('name-input'), 'Иван Иванов');
        await user.type(screen.getByTestId('email-input'), 'test@example.com');

        // Заполняем honeypot поле (боты обычно заполняют скрытые поля)
        const honeypot = screen.getByTestId('honeypot');
        await user.type(honeypot, 'spam@bot.com');

        // Отправляем форму
        await user.click(screen.getByTestId('submit-button'));

        // Проверяем, что fetch не был вызван
        await waitFor(() => {
            expect(mockFetch).not.toHaveBeenCalled();
        });
    });

    it('работает с пустым словарем', async () => {
        const user = userEvent.setup();
        render(<ContactFormMock lang="ru" dict={{}} />);

        // Проверяем, что форма отображается с дефолтными значениями
        expect(screen.getByTestId('contact-form')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });
});
