'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ConsentStatus = 'pending' | 'accepted' | 'declined';

interface CookieConsentContextType {
    consent: ConsentStatus;
    setConsent: (status: ConsentStatus) => void;
    hasConsent: boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const STORAGE_KEY = 'cookie-consent';

export function CookieConsentProvider({ children }: { children: ReactNode }) {
    const [consent, setConsentState] = useState<ConsentStatus>('pending');
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'accepted' || stored === 'declined') {
            setConsentState(stored);
        }
        setIsHydrated(true);
    }, []);

    const setConsent = (status: ConsentStatus) => {
        setConsentState(status);
        localStorage.setItem(STORAGE_KEY, status);
    };

    const hasConsent = consent === 'accepted';

    return (
        <CookieConsentContext.Provider value={{ consent, setConsent, hasConsent }}>
            {children}
        </CookieConsentContext.Provider>
    );
}

export function useCookieConsent() {
    const context = useContext(CookieConsentContext);
    if (context === undefined) {
        throw new Error('useCookieConsent must be used within a CookieConsentProvider');
    }
    return context;
}
