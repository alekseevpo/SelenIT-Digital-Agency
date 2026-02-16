import type { Locale } from './i18n-config';
import type { Dictionary } from './types/dictionary';

const dictionaries = {
    en: () =>
        import('./dictionaries/en.json').then((module) => module.default as unknown as Dictionary),
    ru: () =>
        import('./dictionaries/ru.json').then((module) => module.default as unknown as Dictionary),
    es: () =>
        import('./dictionaries/es.json').then((module) => module.default as unknown as Dictionary),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
    const loadDictionary = (dictionaries[locale] || dictionaries.en) as () => Promise<Dictionary>;
    return loadDictionary();
};
