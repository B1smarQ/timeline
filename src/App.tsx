import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timeline } from './components/Timeline';
import { StoryModal } from './components/StoryModal';
import { ChapterReader } from './components/ChapterReader';
import { FontSizeControls } from './components/FontSizeControls';
import { TimelineScrollbar } from './components/TimelineScrollbar';
import { ParticleSystem, FloatingOrbs } from './components/ParticleSystem';
import { useAppStore } from './store';
import { WelcomeModal } from './components/WelcomeModal';

function App() {
    const { selectedStory, selectedChapter, showWelcome, setShowWelcome } = useAppStore();

    const handleCloseWelcome = () => {
        setShowWelcome(false);
    };

    return (
        <div className="min-h-screen text-white relative overflow-hidden">
            {/* Background Effects */}
            <ParticleSystem />
            <FloatingOrbs />

            <WelcomeModal show={showWelcome} onClose={handleCloseWelcome} />
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
                        <FontSizeControls />
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
                                As I've Written
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
            )}
        </div>
    );
}

export default App;