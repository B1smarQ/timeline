import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { useAppStore } from '../store';
import { useSound } from '../hooks/useSound';

export const StageUnlockNotification: React.FC = () => {
    const {
        stageUnlockNotification,
        setStageUnlockNotification,
        stages,
        selectStory,
        selectChapter
    } = useAppStore();
    const { playSound } = useSound();

    useEffect(() => {
        if (stageUnlockNotification) {
            playSound('unlock');
        }
    }, [stageUnlockNotification, playSound]);

    const handleClose = () => {
        playSound('click');
        setStageUnlockNotification(null);
    };

    const handleViewStage = () => {
        playSound('success');

        // Store the notification data before closing
        const notificationData = stageUnlockNotification;

        // Close all modals and return to timeline view
        selectChapter(null);  // Close chapter reader
        selectStory(null);    // Close story modal
        setStageUnlockNotification(null); // Close notification

        // Small delay to allow notification to close, then scroll
        setTimeout(() => {
            if (notificationData) {
                const targetStage = stages[notificationData.stageIndex];

                if (targetStage) {
                    console.log(`Scrolling to stage: ${notificationData.stageId}`);
                    const stageElement = document.getElementById(`stage-${notificationData.stageId}`);
                    if (stageElement) {
                        stageElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                            inline: 'nearest'
                        });
                    } else {
                        console.warn(`Stage element not found: stage-${notificationData.stageId}`);
                        // Try alternative approach - scroll to stage by index
                        const allStageElements = document.querySelectorAll('[id^="stage-"]');
                        const targetElement = allStageElements[notificationData.stageIndex];
                        if (targetElement) {
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center',
                                inline: 'nearest'
                            });
                        }
                    }
                } else {
                    console.warn(`Target stage not found at index: ${notificationData.stageIndex}`);
                }
            }
        }, 300);
    };

    return (
        <AnimatePresence>
            {stageUnlockNotification && (
                <motion.div
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        background: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(8px)'
                    }}
                >
                    <motion.div
                        className="relative max-w-md w-full"
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: -50 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                            duration: 0.6
                        }}
                    >
                        {/* Decorative Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl" />

                        {/* Main Card */}
                        <div className="relative mystery-card rounded-3xl p-8 backdrop-blur-xl border border-purple-500/30 text-center overflow-hidden">
                            {/* Close Button */}
                            <motion.button
                                className="absolute top-4 right-4 p-2 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 hover:text-white transition-all duration-300"
                                onClick={handleClose}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <X size={16} />
                            </motion.button>

                            {/* Celebration Particles */}
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"
                                    initial={{
                                        scale: 0,
                                        x: 0,
                                        y: 0,
                                        opacity: 0
                                    }}
                                    animate={{
                                        scale: [0, 1, 0],
                                        x: [0, (Math.random() - 0.5) * 200],
                                        y: [0, (Math.random() - 0.5) * 200],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: i * 0.1,
                                        ease: "easeOut"
                                    }}
                                    style={{
                                        left: '50%',
                                        top: '50%',
                                    }}
                                />
                            ))}

                            {/* Icon */}
                            <motion.div
                                className="flex justify-center mb-6"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    delay: 0.2,
                                    type: 'spring',
                                    stiffness: 200,
                                    duration: 0.8
                                }}
                            >
                                <div className="relative">
                                    <motion.div
                                        className="absolute inset-0 bg-purple-500/30 rounded-full blur-xl w-16 h-16"
                                        animate={{
                                            scale: [1, 1.3, 1],
                                            opacity: [0.5, 0.8, 0.5]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <Sparkles size={48} className="text-purple-400 relative z-10" />
                                </div>
                            </motion.div>

                            {/* Title */}
                            <motion.div
                                className="mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                <h2 className="text-2xl md:text-3xl font-bold glow-text mb-2 tracking-wide">
                                    New Stage Unlocked!
                                </h2>
                                <p className="text-lg text-purple-200/80 font-light">
                                    {stageUnlockNotification.stageTitle}
                                </p>
                            </motion.div>

                            {/* Description */}
                            <motion.div
                                className="mb-8 text-gray-300 text-sm leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                You've completed the requirements and unlocked the next chapter of your journey.
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-3 justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                {/* View Stage Button */}
                                <motion.button
                                    className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-2xl border border-purple-400/30 overflow-hidden"
                                    onClick={handleViewStage}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Button Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Button Content */}
                                    <div className="relative flex items-center gap-2">
                                        <span>Explore Now</span>
                                        <motion.div
                                            animate={{ x: [0, 3, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <ArrowRight size={16} />
                                        </motion.div>
                                    </div>

                                    {/* Shimmer Effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        initial={{ x: '-100%' }}
                                        animate={{ x: '100%' }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatDelay: 3,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </motion.button>

                                {/* Continue Button */}
                                <motion.button
                                    className="px-6 py-3 rounded-xl bg-transparent border border-purple-400/50 text-purple-200 font-semibold hover:bg-purple-500/10 transition-all duration-300"
                                    onClick={handleClose}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Continue Reading
                                </motion.button>
                            </motion.div>

                            {/* Decorative Elements */}
                            <div className="absolute top-6 left-6 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                            <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};