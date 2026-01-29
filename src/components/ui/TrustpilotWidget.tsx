'use client';

import { useEffect, useRef } from 'react';

interface TrustpilotWidgetProps {
    businessUnitId: string;
    templateId?: string;
    locale?: string;
    theme?: 'light' | 'dark';
    height?: string;
    width?: string;
    stars?: string;
}

export function TrustpilotWidget({
    businessUnitId,
    templateId = '56278e9abfbbba0bdcd568bc', // Mini widget
    locale = 'en-US',
    theme = 'light',
    height = '52px',
    width = '100%',
    stars = '4,5',
}: TrustpilotWidgetProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load Trustpilot script if not already loaded
        if (typeof window !== 'undefined' && !document.getElementById('trustpilot-script')) {
            const script = document.createElement('script');
            script.id = 'trustpilot-script';
            script.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
            script.async = true;
            document.head.appendChild(script);

            script.onload = () => {
                if (window.Trustpilot && ref.current) {
                    window.Trustpilot.loadFromElement(ref.current, true);
                }
            };
        } else if (typeof window !== 'undefined' && window.Trustpilot && ref.current) {
            window.Trustpilot.loadFromElement(ref.current, true);
        }
    }, []);

    return (
        <div
            ref={ref}
            className="trustpilot-widget"
            data-locale={locale}
            data-template-id={templateId}
            data-businessunit-id={businessUnitId}
            data-style-height={height}
            data-style-width={width}
            data-theme={theme}
            data-stars={stars}
            data-review-languages={locale.split('-')[0]}
        >
            <a
                href={`https://www.trustpilot.com/review/${businessUnitId}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Trustpilot
            </a>
        </div>
    );
}

// Carousel widget for showing multiple reviews
export function TrustpilotCarousel({
    businessUnitId,
    locale = 'en-US',
    theme = 'light',
}: {
    businessUnitId: string;
    locale?: string;
    theme?: 'light' | 'dark';
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && !document.getElementById('trustpilot-script')) {
            const script = document.createElement('script');
            script.id = 'trustpilot-script';
            script.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
            script.async = true;
            document.head.appendChild(script);

            script.onload = () => {
                if (window.Trustpilot && ref.current) {
                    window.Trustpilot.loadFromElement(ref.current, true);
                }
            };
        } else if (typeof window !== 'undefined' && window.Trustpilot && ref.current) {
            window.Trustpilot.loadFromElement(ref.current, true);
        }
    }, []);

    return (
        <div
            ref={ref}
            className="trustpilot-widget"
            data-locale={locale}
            data-template-id="54ad5defc6454f065c28af8b" // Carousel
            data-businessunit-id={businessUnitId}
            data-style-height="240px"
            data-style-width="100%"
            data-theme={theme}
            data-stars="4,5"
            data-review-languages={locale.split('-')[0]}
        >
            <a
                href={`https://www.trustpilot.com/review/${businessUnitId}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Trustpilot
            </a>
        </div>
    );
}

// Add Trustpilot type to window
declare global {
    interface Window {
        Trustpilot?: {
            loadFromElement: (element: HTMLElement, reload?: boolean) => void;
        };
    }
}
