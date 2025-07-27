import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SupportedLanguage, UITranslations, SUPPORTED_LANGUAGES } from '../types/localization';
import { enTranslations } from '../localization/en';
import { ruTranslations } from '../localization/ru';
import { deTranslations } from '../localization/de';
import { viTranslations } from '../localization/vi';
import { frTranslations } from '../localization/fr';

const translations: Record<SupportedLanguage, UITranslations> = {
    en: enTranslations,
    ru: ruTranslations,
    de: deTranslations,
    vi: viTranslations,
    fr: frTranslations
};

interface LocalizationContextType {
    currentLanguage: SupportedLanguage;
    setLanguage: (language: SupportedLanguage) => void;
    t: UITranslations;
    availableLanguages: typeof SUPPORTED_LANGUAGES;
    formatString: (template: string, ...args: (string | number)[]) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

// Detect browser language and return supported language or default to English
const detectBrowserLanguage = (): SupportedLanguage => {
    const browserLang = navigator.language.toLowerCase();

    // Check for exact matches first
    if (browserLang.startsWith('ru')) return 'ru';
    if (browserLang.startsWith('de')) return 'de';
    if (browserLang.startsWith('vi')) return 'vi';

    // Default to English
    return 'en';
};

// Get saved language from localStorage or detect browser language
const getInitialLanguage = (): SupportedLanguage => {
    try {
        const saved = localStorage.getItem('timeline-language') as SupportedLanguage;
        if (saved && SUPPORTED_LANGUAGES.some(lang => lang.code === saved)) {
            console.log(`📋 Restored saved language: ${saved}`);
            return saved;
        }
    } catch (error) {
        console.warn('Could not load saved language:', error);
    }

    const detected = detectBrowserLanguage();
    console.log(`🌍 Detected browser language: ${detected}`);
    return detected;
};

interface LocalizationProviderProps {
    children: ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(getInitialLanguage);

    const setLanguage = (language: SupportedLanguage) => {
        console.log(`🌍 Setting localization language to: ${language}`);
        setCurrentLanguage(language);
        try {
            localStorage.setItem('timeline-language', language);
            console.log(`💾 Saved language preference: ${language}`);
        } catch (error) {
            console.warn('Could not save language preference:', error);
        }
    };

    const formatString = (template: string, ...args: (string | number)[]): string => {
        return template.replace(/{(\d+)}/g, (match, index) => {
            const argIndex = parseInt(index, 10);
            return args[argIndex] !== undefined ? String(args[argIndex]) : match;
        });
    };

    const contextValue: LocalizationContextType = {
        currentLanguage,
        setLanguage,
        t: translations[currentLanguage],
        availableLanguages: SUPPORTED_LANGUAGES,
        formatString
    };

    return (
        <LocalizationContext.Provider value={contextValue}>
            {children}
        </LocalizationContext.Provider>
    );
};

export const useLocalization = (): LocalizationContextType => {
    const context = useContext(LocalizationContext);
    if (!context) {
        throw new Error('useLocalization must be used within a LocalizationProvider');
    }
    return context;
};