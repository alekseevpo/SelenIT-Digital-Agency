/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom';

// Расширяем глобальные типы для Jest DOM
declare global {
    namespace jest {
        interface Matchers<R> {
            toBeInTheDocument(): R;
            toHaveClass(className: string): R;
            toHaveAttribute(attr: string, value?: string): R;
            toHaveTextContent(text: string): R;
            toBeVisible(): R;
            toBeDisabled(): R;
            toBeEnabled(): R;
            toHaveFocus(): R;
            toHaveStyle(style: string): R;
            toHaveValue(value: string): R;
            toBeChecked(): R;
            toBeEmpty(): R;
            toContainElement(element: HTMLElement): R;
            toHaveProperty(property: string, value?: any): R;
        }
    }
}

export {};
