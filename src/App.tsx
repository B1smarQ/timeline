import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timeline } from './components/Timeline';
import { StoryModal } from './components/StoryModal';
import { ChapterReader } from './components/ChapterReader';
import { FontSizeControls } from './components/FontSizeControls';
import { TimelineScrollbar } from './components/TimelineScrollbar';
import { ParticleSystem, FloatingOrbs } from './components/ParticleSystem';
import { useAppStore } from './store';
import { WelcomeModal } from './components/WelcomeModal';
import { EndingModal } from './components/EndingModal';
import { EpilogueModal } from './components/EpilogueModal';
import { ReviewsModal } from './components/ReviewsModal';
import { AudioManager } from './components/AudioManager';
import { StageUnlockNotification } from './components/StageUnlockNotification';
import { LocalizationProvider, useLocalization } from './hooks/useLocalization';
import { LanguageSelectionPanel } from './components/LanguageSelectionPanel';
import { useLanguageSync } from './hooks/useLanguageSync';
import { ErrorBoundary } from './components/ErrorBoundary';

const AppContent: React.FC = () => {
    const {
        selectedStory,
        selectedChapter,
        showWelcome,
        setShowWelcome,
        showLanguageSelection,
        setShowLanguageSelection,
        showEnding,
        setShowEnding,
        showEpilogue,
        setShowEpilogue,
        isInCreditsPhase,
        setIsInCreditsPhase,
        showReviews,
        setShowReviews,
        stages,
        resetProgress,
        currentLanguage,
        isLoadingData
    } = useAppStore();

    const { t } = useLocalization();
    const [isShowingCredits, setIsShowingCredits] = useState(false);

    // Debug state changes
    React.useEffect(() => {
        console.log(`🎬 Credits state changed: ${isShowingCredits}`);
    }, [isShowingCredits]);

    React.useEffect(() => {
        console.log(`📖 Reviews state changed: ${showReviews}`);
    }, [showReviews]);

    React.useEffect(() => {
        console.log(`🎭 Ending modal visibility: ${showEnding && !showReviews}`);
    }, [showEnding, showReviews]);

    // Debug reviews state changes
    React.useEffect(() => {
        console.log(`📖 Reviews state changed: ${showReviews}`);
    }, [showReviews]);

    // Debug ending modal state
    React.useEffect(() => {
        console.log(`🎭 Ending modal state:`, {
            showEnding,
            isInCreditsPhase,
            showReviews
        });
    }, [showEnding, isInCreditsPhase, showReviews]);

    // Sync language between store and localization
    useLanguageSync();

    // Debug logging
    React.useEffect(() => {
        console.log(`🌍 App: Current language = ${currentLanguage}, Loading = ${isLoadingData}`);
    }, [currentLanguage, isLoadingData]);

    // Note: Initial data loading is now handled in the LanguageSelectionPanel
    // when the user selects a language, so we don't need to load it here

    if (isLoadingData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
                    <p className="text-purple-200 text-lg">{t.general.loading}</p>
                </div>
            </div>
        );
    }

    const handleCloseWelcome = () => {
        setShowWelcome(false);
    };

    const handleShowLanguageSelection = () => {
        setShowWelcome(false);
        setShowLanguageSelection(true);
    };

    const handleCloseLanguageSelection = () => {
        setShowLanguageSelection(false);
    };

    const handleRestartJourney = () => {
        resetProgress();
        setShowEnding(false);
        setShowEpilogue(false);
        setIsShowingCredits(false);
        setIsInCreditsPhase(true);
        setShowReviews(false);
    };

    const handleCloseEnding = () => {
        setShowEnding(false);
        setIsShowingCredits(false);
        setIsInCreditsPhase(true);
        setShowReviews(false);
    };



    const handleCreditsComplete = () => {
        // Check if there's an epilogue to show
        if (stages.length > 0 && stages[stages.length - 1]?.epilogue) {
            setShowEnding(false);
            setShowEpilogue(true);
        } else {
            // No epilogue, go straight to final ending
            setIsInCreditsPhase(false);
        }
    };

    const handleEpilogueComplete = () => {
        setShowEpilogue(false);
        setShowEnding(true);
        setIsInCreditsPhase(false);
    };

    const handleShowReviews = () => {
        console.log('🎬 handleShowReviews called');
        setShowReviews(true);
    };

    const handleCloseReviews = () => {
        setShowReviews(false);
    };

    // Determine current scene for audio
    const getCurrentScene = () => {
        if (showWelcome) return 'welcome';
        if (showLanguageSelection) return 'welcome'; // Use welcome audio for language selection
        if (showReviews) return 'reviews';
        if (showEpilogue) return 'epilogue';
        if (showEnding) return 'ending';
        if (selectedChapter) return 'reading';
        return 'timeline';
    };

    // Determine current mood for audio
    const getCurrentMood = (): 'mysterious' | 'melancholic' | 'hopeful' | 'dramatic' => {
        // If showing epilogue, use the epilogue's mood
        if (showEpilogue && stages.length > 0) {
            const finalStage = stages[stages.length - 1];
            if (finalStage?.epilogue?.mood) {
                return finalStage.epilogue.mood;
            }
        }

        // If reading a chapter, use the chapter's mood or default to mysterious
        if (selectedChapter) {
            return selectedChapter.mood || 'mysterious';
        }

        // Default mood for other scenes
        return 'mysterious';
    };

    return (
        <div className="min-h-screen text-white relative overflow-hidden">
            {/* Background Effects */}
            <ParticleSystem />
            <FloatingOrbs />

            {/* Audio Manager */}
            <AudioManager
                currentScene={getCurrentScene() as 'welcome' | 'timeline' | 'reading' | 'ending' | 'credits' | 'epilogue' | 'reviews'}
                isReading={!!selectedChapter}
                storyMood={getCurrentMood()}
                isShowingCredits={isShowingCredits}
            />

            <WelcomeModal
                show={showWelcome}
                onClose={handleCloseWelcome}
                onShowLanguageSelection={handleShowLanguageSelection}
            />
            <LanguageSelectionPanel
                show={showLanguageSelection}
                onContinue={handleCloseLanguageSelection}
            />
            <EndingModal
                show={showEnding && !showReviews}
                onRestart={handleRestartJourney}
                onClose={handleCloseEnding}
                onCreditsStateChange={setIsShowingCredits}
                onCreditsComplete={handleCreditsComplete}
                showCredits={isInCreditsPhase}
                onShowReviews={handleShowReviews}
            />
            {showEpilogue && stages.length > 0 && stages[stages.length - 1]?.epilogue && (
                <EpilogueModal
                    show={showEpilogue}
                    epilogue={stages[stages.length - 1].epilogue!}
                    onComplete={handleEpilogueComplete}
                />
            )}
            <ReviewsModal
                show={showReviews}
                onClose={handleCloseReviews}
            />
            <StageUnlockNotification />
            {!showWelcome && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-10"
                >
                    {/* Shooting stars overlay */}
                    <div className="shooting-stars">
                        <div className="shooting-star" />
                        <div className="shooting-star" />
                        <div className="shooting-star" />
                        <div className="shooting-star" />
                        <div className="shooting-star" />
                    </div>

                    <motion.header
                        className="fixed top-0 right-0 z-50 p-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="flex flex-col gap-4 items-end">
                            <FontSizeControls />
                            {/* Development Buttons */}
                            {true && (
                                <>
                                    <motion.button
                                        className="px-3 py-2 text-xs bg-purple-600/20 border border-purple-400/30 rounded-lg text-purple-200 hover:bg-purple-600/30 transition-colors backdrop-blur-sm"
                                        onClick={() => setShowEnding(true)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        title="Show Credits (Dev Only)"
                                    >
                                        {t.ending.credits}
                                    </motion.button>

                                </>
                            )}
                        </div>
                    </motion.header>

                    {/* Timeline Scrollbar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <TimelineScrollbar />
                    </motion.div>

                    <main className="pt-16 max-w-7xl mx-auto px-4 relative z-20">
                        <motion.div
                            className="mystery-card rounded-3xl glow backdrop-blur-xl p-6 md:p-12"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <motion.h1
                                className="text-5xl md:text-6xl font-bold mb-12 text-center glow-text tracking-widest select-none"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                                {t.appTitle}
                            </motion.h1>
                            <Timeline />
                        </motion.div>
                    </main>

                    <AnimatePresence mode="wait">
                        {selectedStory && !selectedChapter && (
                            <StoryModal />
                        )}
                        {selectedChapter && (
                            <ChapterReader />
                        )}
                    </AnimatePresence>
                </motion.div>
            )
            }
        </div >
    );
};

function App() {
    return (
        <ErrorBoundary>
            <LocalizationProvider>
                <AppContent />
            </LocalizationProvider>
        </ErrorBoundary>
    );
}

export default App;