'use client';

import { CookieConsent } from '@/components/ui/CookieConsent';
import { CookiesDict } from '@/types/dictionary';

interface CookieConsentWrapperProps {
    lang: string;
    dictionary: CookiesDict;
}

export function CookieConsentWrapper({ lang, dictionary }: CookieConsentWrapperProps) {
    return <CookieConsent lang={lang} dictionary={dictionary} />;
}
