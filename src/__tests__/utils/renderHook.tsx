import { renderHook as renderHookOriginal } from '@testing-library/react';

// Wrapper для renderHook с правильным DOM моками
export function renderHook<Result, Props>(
    callback: (props: Props) => Result,
    options?: { initialProps?: Props },
) {
    // Создаем реальный DOM контейнер
    const container = document.createElement('div');

    // Проверяем, есть ли у document.body метод appendChild
    if (typeof document.body.appendChild === 'function') {
        // Добавляем контейнер в body
        document.body.appendChild(container);
    }

    // Вызываем оригинальный renderHook
    const result = renderHookOriginal(callback, options);

    // Очищаем после теста
    return {
        ...result,
        unmount: () => {
            result.unmount();
            if (typeof document.body.removeChild === 'function') {
                document.body.removeChild(container);
            }
        },
    };
}
