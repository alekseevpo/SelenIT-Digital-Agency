// This file is used to extend the global types for Jest and Testing Library
declare namespace jest {
    interface Matchers<R> {
        // Testing Library matchers
        toBeInTheDocument(): R;
        toHaveClass(className: string | string[]): R;
        toHaveAttribute(attr: string, value?: any): R;
        toHaveTextContent(
            text: string | RegExp | ((text: string, element: Element | null) => boolean),
        ): R;
        toBeVisible(): R;
        toBeDisabled(): R;
        toBeEnabled(): R;
        toHaveFocus(): R;
        toHaveStyle(style: string | Record<string, any>): R;
        toHaveValue(value: string | string[] | number | null): R;
        toBeChecked(): R;
        toBeEmptyDOMElement(): R;
        toContainElement(element: Element | null): R;
        toHaveProperty(property: string, value?: any): R;

        // Additional matchers
        toBeInViewport(): R;
        toBeRequired(): R;
        toBeValid(): R;
        toBeInvalid(): R;
    }
}

// This is needed to make TypeScript understand the global Jest types
export {};
