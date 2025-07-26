import { TimelineStage } from '../types';
import { SupportedLanguage } from '../types/localization';

// Dynamic imports for each language
const dataLoaders = {
    en: () => import('./sampleData_en').then(module => module.sampleData),
    ru: () => import('./sampleData_ru').then(module => module.sampleData_ru),
    de: () => import('./sampleData_de').then(module => module.sampleData_de),
    vi: () => import('./sampleData_vi').then(module => module.sampleData_vi),
};

// Cache for loaded data to avoid re-importing
const dataCache = new Map<SupportedLanguage, TimelineStage[]>();

export const loadStoryData = async (language: SupportedLanguage): Promise<TimelineStage[]> => {
    // Check cache first
    if (dataCache.has(language)) {
        console.log(`📋 Using cached data for language: ${language}`);
        return dataCache.get(language)!;
    }

    try {
        // Load data for the specified language
        const loader = dataLoaders[language];
        if (!loader) {
            console.warn(`⚠️ No data loader found for language: ${language}, falling back to English`);
            if (language !== 'en') {
                const fallbackData = await loadStoryData('en'); // Recursive call for English
                return fallbackData;
            } else {
                throw new Error(`No loader available for English language`);
            }
        }

        console.log(`📚 Loading data for language: ${language}`);
        const data = await loader();

        // Validate data structure
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error(`Invalid data structure for language: ${language}`);
        }

        dataCache.set(language, data);
        console.log(`✅ Successfully loaded and cached story data for language: ${language}`);
        return data;
    } catch (error) {
        console.error(`❌ Failed to load story data for language: ${language}`, error);

        // Fallback to English if loading fails and we're not already trying English
        if (language !== 'en') {
            console.log(`🔄 Attempting fallback to English for failed language: ${language}`);
            try {
                const fallbackData = await loadStoryData('en'); // Recursive call for English
                // Don't cache the fallback data under the failed language
                console.log(`✅ Successfully loaded English fallback data for language: ${language}`);
                return fallbackData;
            } catch (fallbackError) {
                console.error(`❌ Failed to load English fallback data:`, fallbackError);
                throw new Error(`Could not load story data for ${language} or English fallback`);
            }
        } else {
            // If English itself fails, this is a critical error
            console.error(`🚨 Critical error: English data failed to load`);
            throw new Error('Could not load English story data - this is a critical error');
        }
    }
};

// Preload data for a language (useful for performance)
export const preloadStoryData = async (language: SupportedLanguage): Promise<void> => {
    if (!dataCache.has(language)) {
        await loadStoryData(language);
    }
};

// Clear cache (useful for development or memory management)
export const clearDataCache = (): void => {
    dataCache.clear();
    console.log('📝 Story data cache cleared');
};

// Get cached languages
export const getCachedLanguages = (): SupportedLanguage[] => {
    return Array.from(dataCache.keys());
};