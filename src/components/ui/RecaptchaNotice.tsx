interface RecaptchaNoticeProps {
    lang: string;
}

export function RecaptchaNotice({ lang }: RecaptchaNoticeProps) {
    const texts = {
        protected:
            lang === 'ru'
                ? 'Защищено reCAPTCHA'
                : lang === 'es'
                  ? 'Protegido por reCAPTCHA'
                  : 'Protected by reCAPTCHA',
        privacy: lang === 'ru' ? 'Конфиденциальность' : lang === 'es' ? 'Privacidad' : 'Privacy',
        terms: lang === 'ru' ? 'Условия' : lang === 'es' ? 'Términos' : 'Terms',
    };

    return (
        <div className="mt-8 flex flex-col items-center gap-1.5 opacity-60">
            <p className="text-[9px] text-slate-500 dark:text-dark-500 text-center font-bold uppercase tracking-[0.2em]">
                {texts.protected}
            </p>
            <div className="flex items-center gap-2 text-[9px] text-slate-500 dark:text-dark-500 font-bold uppercase tracking-[0.2em]">
                <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-500 transition-colors underline decoration-dotted underline-offset-4"
                >
                    {texts.privacy}
                </a>
                <span className="text-[8px]">&</span>
                <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-500 transition-colors underline decoration-dotted underline-offset-4"
                >
                    {texts.terms}
                </a>
            </div>
        </div>
    );
}
