import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, TimelineStage } from './types';
import { SupportedLanguage } from './types/localization';
import { loadStoryData } from './data/dataLoader';
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
            stages: [],
            selectedStory: null,
            selectedChapter: null,
            currentLanguage: 'en' as SupportedLanguage,
            isLoadingData: false,
            showWelcome: true,
            setShowWelcome: (show: boolean) => set({ showWelcome: show }),
            showLanguageSelection: false,
            setShowLanguageSelection: (show: boolean) => set({ showLanguageSelection: show }),
            showEnding: false,
            setShowEnding: (show: boolean) => set({ showEnding: show }),
            showEpilogue: false,
            setShowEpilogue: (show: boolean) => set({ showEpilogue: show }),
            isInCreditsPhase: true,
            setIsInCreditsPhase: (inCredits: boolean) => set({ isInCreditsPhase: inCredits }),
            stageUnlockNotification: null,
            setStageUnlockNotification: (notification) => set({ stageUnlockNotification: notification }),

            setCurrentStage: (stage: number) => set({ currentStage: stage }),

            setFontSize: (size: 'small' | 'medium' | 'large') => set({ fontSize: size }),

            markChapterAsRead: (stageId: string, storyId: string, chapterId: string) => {
                const { stages } = get();
                console.log('Marking chapter as read:', { stageId, storyId, chapterId });

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

                // Check if all content is completed
                get().checkForCompletion();
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
                    const nextStage = stages[nextStageIndex];
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

                    // Trigger stage unlock notification
                    set({
                        stages: updatedStages,
                        currentStage: nextStageIndex,
                        stageUnlockNotification: {
                            stageTitle: nextStage.title,
                            stageIndex: nextStageIndex,
                            stageId: nextStage.id
                        }
                    });
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
                    showLanguageSelection: false,
                    showEnding: false,
                    showEpilogue: false,
                    isInCreditsPhase: true,
                    stageUnlockNotification: null,
                });
            },

            checkForCompletion: () => {
                const { stages } = get();
                const allStagesUnlocked = stages.every(stage => stage.isUnlocked);
                const allChaptersRead = stages.every(stage =>
                    stage.stories.filter(story => story.isUnlocked).every(story =>
                        story.chapters.every(chapter => chapter.isRead)
                    )
                );

                if (allStagesUnlocked && allChaptersRead) {
                    // Always show credits first (EndingModal)
                    set({ showEnding: true, isInCreditsPhase: true });
                }
            },

            // Helper method to merge progress from old data with new language data
            mergeProgressWithNewData: (newData: TimelineStage[], oldData: TimelineStage[]): TimelineStage[] => {
                return newData.map(newStage => {
                    const oldStage = oldData.find(stage => stage.id === newStage.id);
                    if (!oldStage) return newStage;

                    const updatedStories = newStage.stories.map(newStory => {
                        const oldStory = oldStage.stories.find(story => story.id === newStory.id);
                        if (!oldStory) return newStory;

                        const updatedChapters = newStory.chapters.map(newChapter => {
                            const oldChapter = oldStory.chapters.find(chapter => chapter.id === newChapter.id);
                            return {
                                ...newChapter,
                                isRead: oldChapter ? oldChapter.isRead : newChapter.isRead
                            };
                        });

                        return {
                            ...newStory,
                            chapters: updatedChapters,
                            isUnlocked: oldStory.isUnlocked
                        };
                    });

                    return {
                        ...newStage,
                        stories: updatedStories,
                        isUnlocked: oldStage.isUnlocked
                    };
                });
            },

            // Language methods
            setLanguage: async (language: SupportedLanguage) => {
                const currentLang = get().currentLanguage;
                if (currentLang === language) return;

                console.log(`🌍 Switching language from ${currentLang} to ${language}`);

                // Clear current data to force reload
                set({
                    stages: [],
                    currentLanguage: language,
                    selectedStory: null,
                    selectedChapter: null
                });

                await get().loadDataForLanguage(language);
            },

            loadDataForLanguage: async (language: SupportedLanguage) => {
                const { stages: currentStages } = get();

                // Don't reload if we already have data and it's the same language
                const currentLang = get().currentLanguage;
                if (currentStages.length > 0 && currentLang === language && !get().isLoadingData) {
                    console.log(`✅ Data already loaded for language: ${language}`);
                    return;
                }

                console.log(`🔄 Loading data: currentLang=${currentLang}, requestedLang=${language}, hasStages=${currentStages.length > 0}`);

                set({ isLoadingData: true });

                try {
                    console.log(`📚 Loading story data for language: ${language}`);
                    const data = await loadStoryData(language);
                    const initializedData = initializeStages(data);

                    // Preserve progress from current stages if switching languages
                    let finalData = initializedData;
                    const preserveCurrentStage = get().currentStage;
                    if (currentStages.length > 0 && currentLang !== language) {
                        console.log(`🔄 Preserving progress when switching from ${currentLang} to ${language}`);
                        finalData = get().mergeProgressWithNewData(initializedData, currentStages);
                    }

                    set({
                        stages: finalData,
                        isLoadingData: false,
                        currentLanguage: language,
                        // Preserve current stage when switching languages
                        currentStage: currentStages.length > 0 && currentLang !== language ? preserveCurrentStage : get().currentStage,
                        // Reset selections when changing language
                        selectedStory: null,
                        selectedChapter: null
                    });

                    // After loading new data, check if any stages should be unlocked
                    // This is especially important when switching languages and preserving progress
                    setTimeout(() => {
                        // Check for story unlocks in all stages
                        finalData.forEach(stage => {
                            if (stage.isUnlocked) {
                                get().unlockNextStories(stage.id);
                            }
                        });
                        // Check for stage unlocks
                        get().unlockNextStage();
                    }, 100);

                    console.log(`✅ Successfully loaded data for language: ${language}`);
                } catch (error) {
                    console.error(`❌ Failed to load data for language: ${language}`, error);

                    // Fallback to English if not already English
                    if (language !== 'en') {
                        console.log(`🔄 Falling back to English due to error`);
                        try {
                            const fallbackData = await loadStoryData('en');
                            const initializedFallbackData = initializeStages(fallbackData);

                            // Preserve progress even in fallback
                            const finalFallbackData = currentStages.length > 0
                                ? get().mergeProgressWithNewData(initializedFallbackData, currentStages)
                                : initializedFallbackData;
                            const preserveCurrentStage = get().currentStage;

                            set({
                                stages: finalFallbackData,
                                isLoadingData: false,
                                currentLanguage: 'en', // Force to English
                                currentStage: currentStages.length > 0 ? preserveCurrentStage : get().currentStage,
                                selectedStory: null,
                                selectedChapter: null
                            });

                            // After loading fallback data, check if any stages should be unlocked
                            setTimeout(() => {
                                // Check for story unlocks in all stages
                                finalFallbackData.forEach(stage => {
                                    if (stage.isUnlocked) {
                                        get().unlockNextStories(stage.id);
                                    }
                                });
                                // Check for stage unlocks
                                get().unlockNextStage();
                            }, 100);

                            console.log(`✅ Successfully loaded fallback English data`);
                        } catch (fallbackError) {
                            console.error(`❌ Failed to load fallback English data:`, fallbackError);

                            // Last resort: use the imported sampleData
                            const lastResortData = initializeStages(sampleData);
                            const finalLastResortData = currentStages.length > 0
                                ? get().mergeProgressWithNewData(lastResortData, currentStages)
                                : lastResortData;
                            const preserveCurrentStage = get().currentStage;

                            set({
                                stages: finalLastResortData,
                                isLoadingData: false,
                                currentLanguage: 'en',
                                currentStage: currentStages.length > 0 ? preserveCurrentStage : get().currentStage,
                                selectedStory: null,
                                selectedChapter: null
                            });

                            // After loading last resort data, check if any stages should be unlocked
                            setTimeout(() => {
                                // Check for story unlocks in all stages
                                finalLastResortData.forEach(stage => {
                                    if (stage.isUnlocked) {
                                        get().unlockNextStories(stage.id);
                                    }
                                });
                                // Check for stage unlocks
                                get().unlockNextStage();
                            }, 100);

                            console.log(`⚠️ Using last resort sample data`);
                        }
                    } else {
                        // If English fails, use the imported sampleData as last resort
                        console.log(`🚨 English failed, using imported sample data`);
                        const lastResortData = initializeStages(sampleData);
                        const finalLastResortData = currentStages.length > 0
                            ? get().mergeProgressWithNewData(lastResortData, currentStages)
                            : lastResortData;
                        const preserveCurrentStage = get().currentStage;

                        set({
                            stages: finalLastResortData,
                            isLoadingData: false,
                            currentLanguage: 'en',
                            currentStage: currentStages.length > 0 ? preserveCurrentStage : get().currentStage,
                            selectedStory: null,
                            selectedChapter: null
                        });

                        // After loading last resort data, check if any stages should be unlocked
                        setTimeout(() => {
                            // Check for story unlocks in all stages
                            finalLastResortData.forEach(stage => {
                                if (stage.isUnlocked) {
                                    get().unlockNextStories(stage.id);
                                }
                            });
                            // Check for stage unlocks
                            get().unlockNextStage();
                        }, 100);
                    }
                }
            },
        }),
        {
            name: 'timeline-stories-storage',
        }
    )
);