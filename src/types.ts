export interface Chapter {
    id: string;
    title: string;
    content: string; // Markdown content
    isRead: boolean;
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

    // Welcome modal state
    showWelcome: boolean;
    setShowWelcome: (show: boolean) => void;

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
}