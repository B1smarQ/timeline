export interface Chapter {
    id: string;
    title: string;
    description?: string; // Brief description of the chapter (optional)
    content: string; // Markdown content
    isRead: boolean;
    mood?: 'mysterious' | 'melancholic' | 'hopeful' | 'dramatic'; // Optional mood for ambient audio
}

export interface Story {
    id: string;
    title: string;
    description: string;
    cover: string; // Image path
    chapters: Chapter[];
    isUnlocked: boolean;
    unlockOrder?: number; // For progressive unlocking
}

export interface TimelineStage {
    id: string;
    title: string;
    year: number | string;
    description: string;
    stories: Story[];
    isUnlocked: boolean;
    requiresAllChaptersRead: boolean; // Must read all chapters to progress
}

export interface AppState {
    currentStage: number;
    fontSize: 'small' | 'medium' | 'large';
    stages: TimelineStage[];
    selectedStory: Story | null;
    selectedChapter: Chapter | null;

    // Language support
    currentLanguage: import('./types/localization').SupportedLanguage;
    isLoadingData: boolean;

    // Welcome modal state
    showWelcome: boolean;
    setShowWelcome: (show: boolean) => void;

    // Language selection panel state
    showLanguageSelection: boolean;
    setShowLanguageSelection: (show: boolean) => void;

    // Ending modal state
    showEnding: boolean;
    setShowEnding: (show: boolean) => void;

    // Stage unlock notification
    stageUnlockNotification: { stageTitle: string; stageIndex: number; stageId: string } | null;
    setStageUnlockNotification: (notification: { stageTitle: string; stageIndex: number; stageId: string } | null) => void;

    // Actions
    setCurrentStage: (stage: number) => void;
    setFontSize: (size: 'small' | 'medium' | 'large') => void;
    markChapterAsRead: (stageId: string, storyId: string, chapterId: string) => void;
    selectStory: (story: Story | null) => void;
    selectChapter: (chapter: Chapter | null) => void;
    unlockNextStories: (stageId: string) => void;
    unlockNextStage: () => void;
    resetProgress: () => void;
    checkForCompletion: () => void;

    // Language actions
    setLanguage: (language: import('./types/localization').SupportedLanguage) => void;
    loadDataForLanguage: (language: import('./types/localization').SupportedLanguage) => Promise<void>;
    
    // Helper methods
    mergeProgressWithNewData: (newData: TimelineStage[], oldData: TimelineStage[]) => TimelineStage[];
}