import type { Locale } from './i18n-config';
import type { Dictionary } from './types/dictionary';

const dictionaries = {
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    ru: () => import('./dictionaries/ru.json').then((module) => module.default),
    es: () => import('./dictionaries/es.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
    const loadDictionary = (dictionaries[locale] || dictionaries.en) as unknown as () => Promise<Dictionary>;
    return loadDictionary();
};
