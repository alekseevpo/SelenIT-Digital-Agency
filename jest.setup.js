import '@testing-library/jest-dom';

// Mock next-themes
jest.mock('next-themes', () => ({
    useTheme: () => ({
        theme: 'light',
        setTheme: jest.fn(),
        resolvedTheme: 'light',
        systemTheme: 'light',
        themes: ['light', 'dark'],
    }),
    ThemeProvider: ({ children }) => children,
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(() => '/en'),
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
    })),
    useSearchParams: jest.fn(() => new URLSearchParams()),
}));

// Mock framer-motion
jest.mock('framer-motion', () => {
    const React = require('react');

    // Helper to filter out framer-motion specific props
    const filterFramerProps = (props) => {
        const {
            layoutId, animate, initial, exit, transition, whileHover, whileTap,
            variants, layout, drag, dragConstraints, onDragEnd, whileInView,
            viewport, custom, onHoverStart, onHoverEnd, onAnimationComplete,
            whileDrag, dragElastic, dragMomentum, onDragStart, onDrag,
            ...rest
        } = props;
        return rest;
    };

    return {
        motion: {
            div: React.forwardRef(({ children, ...props }, ref) =>
                React.createElement('div', { ...filterFramerProps(props), ref }, children)
            ),
            span: React.forwardRef(({ children, ...props }, ref) =>
                React.createElement('span', { ...filterFramerProps(props), ref }, children)
            ),
            button: React.forwardRef(({ children, ...props }, ref) =>
                React.createElement('button', { ...filterFramerProps(props), ref }, children)
            ),
            li: React.forwardRef(({ children, ...props }, ref) =>
                React.createElement('li', { ...filterFramerProps(props), ref }, children)
            ),
            ul: React.forwardRef(({ children, ...props }, ref) =>
                React.createElement('ul', { ...filterFramerProps(props), ref }, children)
            ),
            nav: React.forwardRef(({ children, ...props }, ref) =>
                React.createElement('nav', { ...filterFramerProps(props), ref }, children)
            ),
            a: React.forwardRef(({ children, ...props }, ref) =>
                React.createElement('a', { ...filterFramerProps(props), ref }, children)
            ),
            svg: React.forwardRef(({ children, ...props }, ref) =>
                React.createElement('svg', { ...filterFramerProps(props), ref }, children)
            ),
            path: React.forwardRef((props, ref) =>
                React.createElement('path', { ...filterFramerProps(props), ref })
            ),
            circle: React.forwardRef((props, ref) =>
                React.createElement('circle', { ...filterFramerProps(props), ref })
            ),
            g: React.forwardRef(({ children, ...props }, ref) =>
                React.createElement('g', { ...filterFramerProps(props), ref }, children)
            ),
        },
        AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
        useMotionValue: jest.fn(() => ({ get: () => 0, set: jest.fn() })),
        useTransform: jest.fn(() => ({ get: () => 0 })),
        useSpring: jest.fn(() => ({ get: () => 0 })),
        useAnimation: jest.fn(() => ({
            start: jest.fn(),
            stop: jest.fn(),
        })),
        useAnimationControls: jest.fn(() => ({
            start: jest.fn(),
            stop: jest.fn(),
            set: jest.fn(),
        })),
        useInView: jest.fn(() => true),
    };
});

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: jest.fn((key) => store[key] ?? null),
        setItem: jest.fn((key, value) => {
            store[key] = value.toString();
        }),
        removeItem: jest.fn((key) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        }),
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock IntersectionObserver
class MockIntersectionObserver {
    constructor(callback) {
        this.callback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
}
Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
});

// Mock grecaptcha
Object.defineProperty(window, 'grecaptcha', {
    writable: true,
    configurable: true,
    value: {
        ready: jest.fn((callback) => callback()),
        execute: jest.fn(() => Promise.resolve('mock-recaptcha-token')),
    },
});

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
    writable: true,
    configurable: true,
    value: jest.fn(),
});

// Reset mocks between tests
beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
});
