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
                    if (stage.id === stageId && stage.isUnlocked) {
                        // Get stories sorted by unlock order
                        const storiesWithOrder = stage.stories.map(story => ({
                            ...story,
                            effectiveOrder: story.unlockOrder || 1
                        })).sort((a, b) => a.effectiveOrder - b.effectiveOrder);

                        // Check which stories should be unlocked
                        const updatedStories = storiesWithOrder.map((story, index) => {
                            // Stories with order 1 (or no order) are unlocked when stage is unlocked
                            if (story.effectiveOrder === 1) {
                                console.log(`Unlocking first story: ${story.title}`);
                                return { ...story, isUnlocked: true };
                            }

                            // For subsequent stories, check if all previous stories are completed
                            const previousStories = storiesWithOrder.slice(0, index);
                            const allPreviousCompleted = previousStories.every(prevStory =>
                                prevStory.chapters.every(ch => ch.isRead)
                            );

                            console.log(`Story ${story.title} (order ${story.effectiveOrder}): ${allPreviousCompleted ? 'UNLOCKED' : 'LOCKED'}`);
                            return { ...story, isUnlocked: allPreviousCompleted };
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

                if (!current || !current.isUnlocked) return;

                // Check stage completion requirements
                let stageCompleted = false;

                if (current.requiresAllChaptersRead) {
                    // Must read all chapters in all unlocked stories
                    const unlockedStories = current.stories.filter(story => story.isUnlocked);
                    stageCompleted = unlockedStories.length > 0 && unlockedStories.every(story =>
                        story.chapters.every(chapter => chapter.isRead)
                    );
                } else {
                    // Just need to read at least one story completely
                    const unlockedStories = current.stories.filter(story => story.isUnlocked);
                    stageCompleted = unlockedStories.some(story =>
                        story.chapters.every(chapter => chapter.isRead)
                    );
                }

                console.log(`Stage ${currentStage} completion check:`, {
                    stageCompleted,
                    requiresAllChaptersRead: current.requiresAllChaptersRead,
                    unlockedStories: current.stories.filter(story => story.isUnlocked).length,
                    totalStories: current.stories.length
                });

                if (stageCompleted && currentStage < stages.length - 1) {
                    const nextStageIndex = currentStage + 1;
                    const updatedStages = stages.map((stage, index) => {
                        if (index === nextStageIndex) {
                            // Unlock the next stage and initialize its first stories
                            const updatedStories = stage.stories.map(story => ({
                                ...story,
                                isUnlocked: story.unlockOrder === 1 || !story.unlockOrder
                            }));
                            console.log(`Unlocking stage ${nextStageIndex}:`, stage.title);
                            return { ...stage, isUnlocked: true, stories: updatedStories };
                        }
                        return stage;
                    });
                    set({ stages: updatedStages, currentStage: nextStageIndex });
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