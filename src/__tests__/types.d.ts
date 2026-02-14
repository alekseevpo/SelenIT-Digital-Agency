/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

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
            toHaveDescription(text: string): R;
            toHaveDisplayValue(value: string): R;
            toHaveErrorMessage(message: string): R;
            toHaveFormValues(values: Record<string, string>): R;
            toHaveRole(role: string): R;
            toHaveAccessibleDescription(text: string): R;
            toHaveAccessibleName(text: string): R;
            toHaveClass(...classNames: string[]): R;
            toHaveTextContent(text: string, options?: { normalizeWhitespace: boolean }): R;
            toBePartiallyChecked(percentage?: number): R;
            toBeRequired(): R;
            toBeInvalid(): R;
            toBeValid(): R;
            toBeVisible(options?: { opacity?: number; visibility?: string }): R;
            toBeDisabled(): R;
            toBeEnabled(): R;
            toHaveFocus(): R;
            toHaveStyle(style: string): R;
            toHaveValue(value: string): R;
            toBeChecked(): R;
            toBeEmpty(): R;
            toContainElement(element: HTMLElement): R;
            toHaveDescription(text: string): R;
            toHaveDisplayValue(value: string): R;
            toHaveErrorMessage(message: string): R;
            toHaveFormValues(values: Record<string, string>): R;
            toHaveRole(role: string): R;
            toHaveAccessibleDescription(text: string): R;
            toHaveAccessibleName(text: string): R;
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
            toHaveDescription(text: string): R;
            toHaveDisplayValue(value: string): R;
            toHaveErrorMessage(message: string): R;
            toHaveFormValues(values: Record<string, string>): R;
            toHaveRole(role: string): R;
            toHaveAccessibleDescription(text: string): R;
            toHaveAccessibleName(text: string): R;
        }
    }
}

export {};
