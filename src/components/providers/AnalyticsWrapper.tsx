'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useCookieConsent } from './CookieConsentProvider';

export function AnalyticsWrapper() {
    const { hasConsent } = useCookieConsent();

    if (!hasConsent) {
        return null;
    }

    return (
        <>
            <Analytics />
            <SpeedInsights />
        </>
    );
}
