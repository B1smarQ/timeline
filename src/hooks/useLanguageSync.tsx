import { useEffect, useRef } from 'react';
import { useLocalization } from './useLocalization';
import { useAppStore } from '../store';

export const useLanguageSync = () => {
    const { currentLanguage: localizationLanguage, setLanguage: setLocalizationLanguage } = useLocalization();
    const { currentLanguage: storeLanguage, setLanguage: setStoreLanguage, isLoadingData } = useAppStore();

    // Use refs to track the source of language changes to prevent loops
    const localizationChangeRef = useRef(false);
    const storeChangeRef = useRef(false);

    // Sync localization language to store when it changes (user selects from dropdown)
    useEffect(() => {
        if (localizationLanguage !== storeLanguage && !storeChangeRef.current && !isLoadingData) {
            console.log(`🔄 Syncing localization language (${localizationLanguage}) to store`);
            localizationChangeRef.current = true;

            const syncLanguage = async () => {
                try {
                    await setStoreLanguage(localizationLanguage);
                } catch (error) {
                    console.error('Failed to sync language to store:', error);
                } finally {
                    localizationChangeRef.current = false;
                }
            };

            syncLanguage();
        }
    }, [localizationLanguage, storeLanguage, setStoreLanguage, isLoadingData]);

    // Sync store language to localization when it changes (fallback scenarios)
    useEffect(() => {
        if (storeLanguage !== localizationLanguage && !localizationChangeRef.current && !isLoadingData) {
            console.log(`🔄 Syncing store language (${storeLanguage}) to localization`);
            storeChangeRef.current = true;
            setLocalizationLanguage(storeLanguage);
            // Reset the flag after a short delay to allow the change to propagate
            setTimeout(() => {
                storeChangeRef.current = false;
            }, 100);
        }
    }, [storeLanguage, localizationLanguage, setLocalizationLanguage, isLoadingData]);
};