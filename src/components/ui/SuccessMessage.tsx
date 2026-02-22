import { motion } from 'framer-motion';

interface SuccessMessageProps {
    title: string;
    subtitle: string;
    onSendAnother: () => void;
    sendAnotherText: string;
}

export function SuccessMessage({
    title,
    subtitle,
    onSendAnother,
    sendAnotherText,
}: SuccessMessageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-center py-10 max-w-full overflow-hidden success-message"
        >
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="w-10 h-10 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                    />
                </motion.svg>
            </div>
            <h2 className="heading-1 mb-4 text-slate-900 dark:text-white font-bold tracking-tight break-words overflow-hidden">
                {title}
            </h2>
            <p className="text-slate-600 dark:text-dark-400 mb-8 max-w-sm mx-auto leading-relaxed">
                {subtitle}
            </p>
            <button
                onClick={onSendAnother}
                className="btn-primary group/btn relative overflow-hidden"
                type="button"
            >
                <span className="relative z-10">{sendAnotherText}</span>
                <div className="absolute inset-0 bg-primary-500/5 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            </button>
        </motion.div>
    );
}
