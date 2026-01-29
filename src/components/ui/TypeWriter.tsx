'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypeWriterProps {
    words: string[];
    className?: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
}

export function TypeWriter({
    words,
    className = '',
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000,
}: TypeWriterProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const currentWord = words[currentWordIndex];

        if (isPaused) {
            const pauseTimeout = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, pauseDuration);
            return () => clearTimeout(pauseTimeout);
        }

        if (isDeleting) {
            if (currentText === '') {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            } else {
                const timeout = setTimeout(() => {
                    setCurrentText(currentText.slice(0, -1));
                }, deletingSpeed);
                return () => clearTimeout(timeout);
            }
        } else {
            if (currentText === currentWord) {
                setIsPaused(true);
            } else {
                const timeout = setTimeout(() => {
                    setCurrentText(currentWord.slice(0, currentText.length + 1));
                }, typingSpeed);
                return () => clearTimeout(timeout);
            }
        }
    }, [currentText, isDeleting, isPaused, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <span className={`inline-flex items-baseline ${className}`}>
            <span className="gradient-text">{currentText}</span>
            <motion.span
                className="inline-block w-[3px] h-[1em] bg-gradient-to-b from-primary-500 to-accent-500 ml-1 rounded-full"
                animate={{ opacity: [1, 0] }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                }}
            />
        </span>
    );
}
