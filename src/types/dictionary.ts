export interface NavLink {
    home: string;
    services: string;
    showreel: string;
    about: string;
    contact: string;
    getStarted: string;
    privacy: string;
    terms: string;
}

export interface FooterLinks {
    rights: string;
    services: string;
    company: string;
    getInTouch: string;
}

export interface CommonDict {
    nav: NavLink;
    footer: FooterLinks;
}

export interface HeroDict {
    badge: string;
    title1: string;
    titleGradient: string;
    title2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
}

export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    features: string[];
    videoId: string;
}

export interface ServicesDict {
    hero: {
        badge: string;
        title1: string;
        titleGradient: string;
        subtitle: string;
    };
    list: ServiceItem[];
    process: {
        badge: string;
        title1: string;
        titleGradient: string;
        subtitle: string;
        steps: {
            step: string;
            title: string;
            description: string;
        }[];
    };
    cta: {
        title1: string;
        titleGradient: string;
        subtitle: string;
        button: string;
    };
}

export interface Testimonial {
    id: number;
    content: string;
    author: string;
    role: string;
    avatar: string;
    rating: number;
}

export interface AboutDict {
    hero: {
        badge: string;
        title1: string;
        titleGradient: string;
        titleWords: string[];
        subtitle: string;
    };
    story: {
        badge: string;
        title1: string;
        titleGradient: string;
        p1: string;
        p2: string;
        p3: string;
    };
    stats: {
        value: string;
        label: string;
    }[];
    values: {
        badge: string;
        title1: string;
        titleGradient: string;
        subtitle: string;
        list: {
            id: string;
            title: string;
            description: string;
        }[];
    };
    team: {
        badge: string;
        title1: string;
        titleGradient: string;
        subtitle: string;
        members: {
            id: string;
            name: string;
            role: string;
            bio: string;
            avatar: string;
        }[];
    };
    cta: {
        title1: string;
        titleGradient: string;
        subtitle: string;
        button: string;
    };
}

export interface Dictionary {
    common: CommonDict;
    contact: {
        hero: {
            badge: string;
            title1: string;
            titleGradient: string;
            subtitle: string;
        };
        info: {
            title: string;
            subtitle: string;
            email: string;
            phone: string;
            office: string;
            hoursTitle: string;
            mondayFriday: string;
            saturday: string;
            sunday: string;
            closed: string;
        };
        form: {
            title: string;
            subtitle: string;
            fullName: string;
            email: string;
            company: string;
            companyPlaceholder: string;
            service: string;
            serviceOptions: string[];
            budget: string;
            budgetOptions: string[];
            details: string;
            detailsPlaceholder: string;
            submit: string;
            sending: string;
            success: string;
            successTitle: string;
            successSubtitle: string;
            sendAnother: string;
            selectService: string;
            selectBudget: string;
        };
    };
    hero: HeroDict;
    home: {
        services: {
            badge: string;
            title1: string;
            titleGradient: string;
            subtitle: string;
            learnMore: string;
        };
        showreel: {
            badge: string;
            title1: string;
            titleGradient: string;
            subtitle: string;
            videoId: string;
            button: string;
        };
        testimonials: {
            badge: string;
            title1: string;
            titleGradient: string;
            subtitle: string;
            trustpilotCta?: string;
        };
        technologies: {
            badge: string;
            title: string;
            titleGradient: string;
            subtitle: string;
        };
        cta: {
            title1: string;
            titleGradient: string;
            subtitle: string;
            button: string;
        };
    };
    services: ServicesDict;
    showreel: {
        hero: {
            badge: string;
            title1: string;
            titleGradient: string;
            subtitle: string;
            videoId: string;
        };
        grid: {
            filterAll: string;
            projectPreview: string;
            client: string;
            year: string;
            results: string;
        };
        projects: {
            id: number;
            title: string;
            category: string;
            videoId: string;
            description: string;
            client: string;
            year: string;
            results: string[];
            tags?: string[];
            color?: string;
        }[];
        cta: {
            title1: string;
            titleGradient: string;
            subtitle: string;
            button: string;
        };
        categories: string[];
    };
    about: AboutDict;
    testimonials: Testimonial[];
    privacy: {
        hero: {
            title: string;
            lastUpdated: string;
        };
        content: {
            title: string;
            text: string;
        }[];
    };
    terms: {
        hero: {
            title: string;
            lastUpdated: string;
        };
        content: {
            title: string;
            text: string;
        }[];
    };
}
