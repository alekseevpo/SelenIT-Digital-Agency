'use client';

import { motion } from 'framer-motion';

import type { Dictionary } from '@/types/dictionary';

interface SubmitButtonProps {
    isSubmitting: boolean;
    activeTab: 'message' | 'callback';
    dict: Dictionary['contact']['form'];
}

export default function SubmitButton({ isSubmitting, activeTab, dict }: SubmitButtonProps) {
    return (
        <div className="col-span-1 md:col-span-2">
            <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary group/btn relative overflow-hidden w-full max-w-xs mx-auto block"
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
            >
                <span className="relative z-10">
                    {isSubmitting
                        ? dict.sending
                        : activeTab === 'message'
                          ? dict.submit
                          : dict.submit}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            </motion.button>
        </div>
    );
}
