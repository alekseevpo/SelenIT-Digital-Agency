/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom';

// Глобальные типы для Jest DOM matchers
declare global {
    namespace jest {
        interface Matchers<R> {
            toBeInTheDocument(): R;
            toHaveClass(...classNames: string[]): R;
            toHaveAttribute(attr: string, value?: string): R;
            toHaveTextContent(text: string | RegExp): R;
            toBeVisible(): R;
            toBeDisabled(): R;
            toBeEnabled(): R;
            toHaveFocus(): R;
            toHaveStyle(style: string | Record<string, string>): R;
            toHaveValue(value: string | number): R;
            toBeChecked(): R;
            toBeEmpty(): R;
            toContainElement(element: HTMLElement | null): R;
            toHaveProperty(property: string, value?: any): R;
        }
    }
}

export {};
