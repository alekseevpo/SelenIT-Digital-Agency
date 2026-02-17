import '@testing-library/jest-dom';

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeInTheDocument(): R;
            toHaveTextContent(text: string | RegExp): R;
            toHaveAttribute(attr: string, value?: string): R;
            toBeVisible(): R;
            toBeDisabled(): R;
            toBeEnabled(): R;
            toHaveFocus(): R;
            toHaveValue(value: any): R;
            toBeChecked(): R;
        }
    }

    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
            execute: () => Promise<string>;
        };
    }
}
