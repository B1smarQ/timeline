export type SupportedLanguage = 'en' | 'ru' | 'de' | 'vi';

export interface LanguageInfo {
    code: SupportedLanguage;
    name: string;
    nativeName: string;
    flag: string;
}

export interface UITranslations {
    // App title and main navigation
    appTitle: string;

    // Welcome Modal
    welcome: {
        title: string;
        subtitle: string;
        description: string;
        startJourney: string;
        skipIntro: string;
        features: {
            immersive: string;
            progressive: string;
            atmospheric: string;
        };
    };

    // Timeline
    timeline: {
        title: string;
        stage: string;
        story: string;
        chapter: string;
        readChapter: string;
        markAsRead: string;
        marking: string;
        completed: string;
        locked: string;
        unlocked: string;
        progress: string;
        inProgress: string;
        completePrevious: string;
    };

    // Chapter Reader
    reader: {
        chapterOf: string;
        backToStory: string;
        typewriterMode: string;
        instantMode: string;
        markAsRead: string;
        chapterCompleted: string;
        continue: string;
        skip: string;
        mood: string;
    };

    // Audio Controls
    audio: {
        enabled: string;
        disabled: string;
        masterVolume: string;
        ambientVolume: string;
        currentScene: string;
        mood: string;
        testMoodFiles: string;
        emergencyStop: string;
        listAllSounds: string;
        forceReload: string;
    };

    // Font Controls
    font: {
        small: string;
        medium: string;
        large: string;
    };

    // Ending Modal
    ending: {
        title: string;
        subtitle: string;
        restartJourney: string;
        close: string;
        credits: string;
        thankYou: string;
    };

    // Stage Unlock Notification
    unlock: {
        stageUnlocked: string;
        newStoriesAvailable: string;
        explore: string;
    };

    // UI Controls
    ui: {
        resetProgress: string;
    };

    // General UI
    general: {
        loading: string;
        error: string;
        retry: string;
        close: string;
        back: string;
        next: string;
        previous: string;
        save: string;
        cancel: string;
        confirm: string;
    };

    // Moods
    moods: {
        mysterious: string;
        melancholic: string;
        hopeful: string;
        dramatic: string;
    };
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
    {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        flag: '🇺🇸'
    },
    {
        code: 'ru',
        name: 'Russian',
        nativeName: 'Русский',
        flag: '🇷🇺'
    },
    {
        code: 'de',
        name: 'German',
        nativeName: 'Deutsch',
        flag: '🇩🇪'
    },
    {
        code: 'vi',
        name: 'Vietnamese',
        nativeName: 'Tiếng Việt',
        flag: '🇻🇳'
    }
];