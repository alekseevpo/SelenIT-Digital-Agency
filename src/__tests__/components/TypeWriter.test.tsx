import { render, screen, act } from '@testing-library/react';
import { TypeWriter } from '@/components/ui/TypeWriter';

describe('TypeWriter', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe('Rendering', () => {
        it('renders empty initially', () => {
            render(<TypeWriter words={['Hello', 'World']} />);

            const textElement = document.querySelector('.gradient-text');
            expect(textElement).toBeInTheDocument();
            expect(textElement).toHaveTextContent('');
        });

        it('applies custom className', () => {
            render(<TypeWriter words={['Hello']} className="custom-class" />);

            const container = screen.getByText('', { selector: 'span.custom-class' });
            expect(container).toBeInTheDocument();
        });

        it('renders cursor element', () => {
            render(<TypeWriter words={['Hello']} />);

            // The cursor is a span with specific styling
            const container = document.querySelector('span.inline-flex');
            expect(container?.children.length).toBeGreaterThanOrEqual(2);
        });
    });

    describe('Typing animation', () => {
        it('types characters one by one', async () => {
            render(<TypeWriter words={['Hi']} typingSpeed={100} />);

            const textElement = document.querySelector('.gradient-text');

            // Initially empty
            expect(textElement).toHaveTextContent('');

            // After 100ms, first character
            act(() => {
                jest.advanceTimersByTime(100);
            });
            expect(textElement).toHaveTextContent('H');

            // After another 100ms, second character
            act(() => {
                jest.advanceTimersByTime(100);
            });
            expect(textElement).toHaveTextContent('Hi');
        });

        it('respects custom typing speed', async () => {
            render(<TypeWriter words={['AB']} typingSpeed={50} />);

            const textElement = document.querySelector('.gradient-text');

            // After 50ms (not 100ms default), first character should appear
            act(() => {
                jest.advanceTimersByTime(50);
            });
            expect(textElement).toHaveTextContent('A');

            act(() => {
                jest.advanceTimersByTime(50);
            });
            expect(textElement).toHaveTextContent('AB');
        });
    });

    describe('Pause and delete animation', () => {
        it('pauses after completing a word', async () => {
            render(
                <TypeWriter
                    words={['Hi']}
                    typingSpeed={100}
                    pauseDuration={1000}
                    deletingSpeed={50}
                />
            );

            const textElement = document.querySelector('.gradient-text');

            // Type each character
            act(() => {
                jest.advanceTimersByTime(100); // H
            });
            act(() => {
                jest.advanceTimersByTime(100); // Hi
            });
            expect(textElement).toHaveTextContent('Hi');

            // During pause, text should remain
            act(() => {
                jest.advanceTimersByTime(500);
            });
            expect(textElement).toHaveTextContent('Hi');
        });

        it('deletes characters after pause', async () => {
            render(
                <TypeWriter
                    words={['Hi']}
                    typingSpeed={100}
                    pauseDuration={500}
                    deletingSpeed={50}
                />
            );

            const textElement = document.querySelector('.gradient-text');

            // Type the word character by character
            act(() => {
                jest.advanceTimersByTime(100); // H
            });
            act(() => {
                jest.advanceTimersByTime(100); // Hi
            });
            expect(textElement).toHaveTextContent('Hi');

            // Wait for pause to end
            act(() => {
                jest.advanceTimersByTime(500);
            });

            // Start deleting
            act(() => {
                jest.advanceTimersByTime(50);
            });
            expect(textElement).toHaveTextContent('H');

            act(() => {
                jest.advanceTimersByTime(50);
            });
            expect(textElement?.textContent).toBe('');
        });

        it('respects custom deleting speed', async () => {
            render(
                <TypeWriter
                    words={['AB']}
                    typingSpeed={100}
                    pauseDuration={100}
                    deletingSpeed={25}
                />
            );

            const textElement = document.querySelector('.gradient-text');

            // Type the word
            act(() => {
                jest.advanceTimersByTime(100); // A
            });
            act(() => {
                jest.advanceTimersByTime(100); // AB
            });
            expect(textElement).toHaveTextContent('AB');

            // Wait for pause
            act(() => {
                jest.advanceTimersByTime(100);
            });

            // Delete with custom speed (25ms per char)
            act(() => {
                jest.advanceTimersByTime(25);
            });
            expect(textElement).toHaveTextContent('A');
        });
    });

    describe('Word cycling', () => {
        it('cycles through multiple words', async () => {
            render(
                <TypeWriter
                    words={['Hi', 'Bye']}
                    typingSpeed={50}
                    pauseDuration={100}
                    deletingSpeed={25}
                />
            );

            const textElement = document.querySelector('.gradient-text');

            // Type first word "Hi"
            act(() => {
                jest.advanceTimersByTime(50); // H
            });
            act(() => {
                jest.advanceTimersByTime(50); // Hi
            });
            expect(textElement).toHaveTextContent('Hi');

            // Pause
            act(() => {
                jest.advanceTimersByTime(100);
            });

            // Delete "Hi"
            act(() => {
                jest.advanceTimersByTime(25); // H
            });
            act(() => {
                jest.advanceTimersByTime(25); // empty
            });
            expect(textElement?.textContent).toBe('');

            // Type second word "Bye"
            act(() => {
                jest.advanceTimersByTime(50); // B
            });
            act(() => {
                jest.advanceTimersByTime(50); // By
            });
            act(() => {
                jest.advanceTimersByTime(50); // Bye
            });
            expect(textElement).toHaveTextContent('Bye');
        });

        it('loops back to first word after last word', async () => {
            render(
                <TypeWriter
                    words={['A', 'B']}
                    typingSpeed={50}
                    pauseDuration={50}
                    deletingSpeed={25}
                />
            );

            const textElement = document.querySelector('.gradient-text');

            // Type "A"
            act(() => {
                jest.advanceTimersByTime(50);
            });
            expect(textElement).toHaveTextContent('A');

            // Pause then delete "A"
            act(() => {
                jest.advanceTimersByTime(50); // pause
            });
            act(() => {
                jest.advanceTimersByTime(25); // delete A -> empty
            });
            expect(textElement?.textContent).toBe('');

            // Type "B"
            act(() => {
                jest.advanceTimersByTime(50);
            });
            expect(textElement).toHaveTextContent('B');

            // Pause then delete "B"
            act(() => {
                jest.advanceTimersByTime(50); // pause
            });
            act(() => {
                jest.advanceTimersByTime(25); // delete B -> empty
            });
            expect(textElement?.textContent).toBe('');

            // Should loop back to "A"
            act(() => {
                jest.advanceTimersByTime(50);
            });
            expect(textElement).toHaveTextContent('A');
        });
    });

    describe('Edge cases', () => {
        it('handles empty words array', () => {
            render(<TypeWriter words={[]} />);

            const container = document.querySelector('.gradient-text');
            expect(container).toBeInTheDocument();
        });

        it('handles single word', async () => {
            render(
                <TypeWriter
                    words={['Ok']}
                    typingSpeed={50}
                    pauseDuration={100}
                    deletingSpeed={25}
                />
            );

            const textElement = document.querySelector('.gradient-text');

            // Type the word
            act(() => {
                jest.advanceTimersByTime(50); // O
            });
            act(() => {
                jest.advanceTimersByTime(50); // Ok
            });
            expect(textElement).toHaveTextContent('Ok');

            // Pause and delete
            act(() => {
                jest.advanceTimersByTime(100); // pause
            });
            act(() => {
                jest.advanceTimersByTime(25); // O
            });
            act(() => {
                jest.advanceTimersByTime(25); // empty
            });
            expect(textElement?.textContent).toBe('');

            // Should cycle back to same word
            act(() => {
                jest.advanceTimersByTime(50); // O
            });
            act(() => {
                jest.advanceTimersByTime(50); // Ok
            });
            expect(textElement).toHaveTextContent('Ok');
        });

        it('handles long words', async () => {
            render(
                <TypeWriter
                    words={['ABCDE']}
                    typingSpeed={10}
                />
            );

            const textElement = document.querySelector('.gradient-text');

            // Type the long word character by character
            for (let i = 0; i < 5; i++) {
                act(() => {
                    jest.advanceTimersByTime(10);
                });
            }
            expect(textElement).toHaveTextContent('ABCDE');
        });

        it('handles words with spaces', async () => {
            render(
                <TypeWriter
                    words={['Hi you']}
                    typingSpeed={50}
                />
            );

            const textElement = document.querySelector('.gradient-text');

            // Type "Hi you" (6 chars including space)
            for (let i = 0; i < 6; i++) {
                act(() => {
                    jest.advanceTimersByTime(50);
                });
            }
            expect(textElement).toHaveTextContent('Hi you');
        });
    });
});
