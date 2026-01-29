'use client';

import { TypeWriter } from './TypeWriter';

interface AnimatedTitleProps {
    title1: string;
    words: string[];
    className?: string;
}

export function AnimatedTitle({ title1, words, className = '' }: AnimatedTitleProps) {
    return (
        <h1 className={className}>
            {title1}{' '}
            <TypeWriter words={words} />
        </h1>
    );
}
