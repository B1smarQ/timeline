import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, TimelineStage } from './types';
import { sampleData } from './data/sampleData';

const initializeStages = (stages: TimelineStage[]): TimelineStage[] => {
    return stages.map((stage, stageIndex) => {
        if (stageIndex === 0) {
            // First stage is unlocked, initialize its stories
            const updatedStories = stage.stories.map(story => ({
                ...story,
                isUnlocked: story.unlockOrder === 1 || !story.unlockOrder
            }));
            return { ...stage, isUnlocked: true, stories: updatedStories };
        }
        return stage;
    });
};

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            currentStage: 0,
            fontSize: 'medium',
            stages: initializeStages(sampleData),
            selectedStory: null,
            selectedChapter: null,
            showWelcome: true,
            setShowWelcome: (show: boolean) => set({ showWelcome: show }),

            setCurrentStage: (stage: number) => set({ currentStage: stage }),

            setFontSize: (size: 'small' | 'medium' | 'large') => set({ fontSize: size }),

            markChapterAsRead: (stageId: string, storyId: string, chapterId: string) => {
                const { stages } = get();
                const updatedStages = stages.map(stage => {
                    if (stage.id === stageId) {
                        const updatedStories = stage.stories.map(story => {
                            if (story.id === storyId) {
                                const updatedChapters = story.chapters.map(chapter =>
                                    chapter.id === chapterId ? { ...chapter, isRead: true } : chapter
                                );
                                return { ...story, chapters: updatedChapters };
                            }
                            return story;
                        });
                        return { ...stage, stories: updatedStories };
                    }
                    return stage;
                });

                set({ stages: updatedStages });

                // Check if we can unlock more stories in the current stage
                get().unlockNextStories(stageId);

                // Check if we can unlock the next stage
                get().unlockNextStage();
            },

            selectStory: (story) => set({ selectedStory: story, selectedChapter: null }),

            selectChapter: (chapter) => set({ selectedChapter: chapter }),

            unlockNextStories: (stageId: string) => {
                const { stages } = get();
                const updatedStages = stages.map(stage => {
                    if (stage.id === stageId) {
                        // Get stories sorted by unlock order
                        const storiesWithOrder = stage.stories.map(story => ({
                            ...story,
                            effectiveOrder: story.unlockOrder || 1
                        })).sort((a, b) => a.effectiveOrder - b.effectiveOrder);

                        // Check which stories should be unlocked
                        const updatedStories = storiesWithOrder.map((story, index) => {
                            // First story (order 1) is always unlocked if stage is unlocked
                            if (story.effectiveOrder === 1) {
                                return { ...story, isUnlocked: stage.isUnlocked };
                            }

                            // For subsequent stories, check if previous story is completed
                            const previousStory = storiesWithOrder[index - 1];
                            if (previousStory) {
                                const isPreviousCompleted = previousStory.chapters.every(ch => ch.isRead);
                                return { ...story, isUnlocked: isPreviousCompleted };
                            }

                            return story;
                        });

                        // Restore original order
                        const finalStories = stage.stories.map(originalStory => {
                            const updatedStory = updatedStories.find(s => s.id === originalStory.id);
                            return updatedStory || originalStory;
                        });

                        return { ...stage, stories: finalStories };
                    }
                    return stage;
                });

                set({ stages: updatedStages });
            },

            unlockNextStage: () => {
                const { stages, currentStage } = get();
                const current = stages[currentStage];

                if (!current) return;

                // Check if all required chapters are read in unlocked stories
                const unlockedStories = current.stories.filter(story => story.isUnlocked);
                const allChaptersRead = unlockedStories.every(story =>
                    story.chapters.every(chapter => chapter.isRead)
                );

                if (allChaptersRead && currentStage < stages.length - 1) {
                    const updatedStages = stages.map((stage, index) => {
                        if (index === currentStage + 1) {
                            // Unlock the next stage
                            return { ...stage, isUnlocked: true };
                        }
                        return stage;
                    });
                    set({ stages: updatedStages, currentStage: currentStage + 1 });

                    // Call unlockNextStories after state is updated, using setTimeout to ensure state is committed
                    setTimeout(() => {
                        const { currentStage: newCurrentStage, stages: newStages, unlockNextStories } = get();
                        unlockNextStories(newStages[newCurrentStage].id);
                    }, 0);
                }
            },

            resetProgress: () => {
                set({
                    currentStage: 0,
                    fontSize: 'medium',
                    stages: initializeStages(sampleData),
                    selectedStory: null,
                    selectedChapter: null,
                    showWelcome: true,
                });
            },
        }),
        {
            name: 'timeline-stories-storage',
        }
    )
);