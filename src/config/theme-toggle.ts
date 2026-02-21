// Theme Toggle Configuration
export interface ThemeToggleConfig {
    mobile: {
        iconSize: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
        buttonSize: 'small' | 'medium' | 'large' | 'xlarge';
        showHoverEffect: boolean;
        containerPadding: string;
    };
    desktop: {
        iconSize: 'small' | 'medium' | 'large';
        buttonSize: 'small' | 'medium' | 'large';
        showHoverEffect: boolean;
        containerPadding: string;
    };
}

// Default configurations
export const themeToggleConfig: ThemeToggleConfig = {
    mobile: {
        iconSize: 'large', // w-8 h-8 (32px)
        buttonSize: 'large', // w-12 h-12 (48px)
        showHoverEffect: false, // No hover animations on mobile
        containerPadding: 'px-1.5 py-0.5',
    },
    desktop: {
        iconSize: 'medium', // w-5 h-5 (20px)
        buttonSize: 'small', // w-8 h-8 (32px)
        showHoverEffect: true, // Hover animations on desktop
        containerPadding: 'p-1.5',
    },
};

// Size mappings
export const sizeMappings = {
    button: {
        small: 'w-8 h-8', // 32px
        medium: 'w-10 h-10', // 40px
        large: 'w-12 h-12', // 48px
    },
    icon: {
        small: 'w-4 h-4', // 16px
        medium: 'w-5 h-5', // 20px
        large: 'w-8 h-8', // 32px
        xlarge: 'w-10 h-10', // 40px
        xxlarge: 'w-12 h-12', // 48px
    },
};

// Responsive configurations
export const responsiveConfigs = {
    compact: {
        mobile: { ...themeToggleConfig.mobile, iconSize: 'medium', buttonSize: 'medium' },
        desktop: { ...themeToggleConfig.desktop, iconSize: 'small', buttonSize: 'small' },
    },
    default: themeToggleConfig,
    large: {
        mobile: { ...themeToggleConfig.mobile, iconSize: 'large', buttonSize: 'large' },
        desktop: { ...themeToggleConfig.desktop, iconSize: 'large', buttonSize: 'large' },
    },
};
