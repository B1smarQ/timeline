import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Check, Play, Pause, Loader2, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { TypewriterMarkdown } from './TypewriterMarkdown';
import { useAppStore } from '../store';
import { useSound } from '../hooks/useSound';

export const ChapterReader: React.FC = () => {
    const {
        selectedChapter,
        selectedStory,
        selectChapter,
        markChapterAsRead,
        fontSize,
        stages
    } = useAppStore();

    const [isTypewriterMode, setIsTypewriterMode] = useState(true);
    const [typewriterComplete, setTypewriterComplete] = useState(false);
    const [isMarkingAsRead, setIsMarkingAsRead] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { playSound } = useSound();

    // Reset typewriter state when chapter changes
    React.useEffect(() => {
        setTypewriterComplete(false);
        setIsMarkingAsRead(false);
        setShowSuccess(false);
    }, [selectedChapter?.id]);

    if (!selectedChapter || !selectedStory) return null;

    const handleMarkAsRead = async () => {
        setIsMarkingAsRead(true);
        playSound('click');

        // Add a small delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 300));

        const stage = stages.find(s => s.stories.some(story => story.id === selectedStory.id));
        if (stage) {
            markChapterAsRead(stage.id, selectedStory.id, selectedChapter.id);
            playSound('success');
            setShowSuccess(true);

            // Hide success message after animation
            setTimeout(() => {
                setShowSuccess(false);
            }, 2000);
        }

        setIsMarkingAsRead(false);
    };

    const handleClose = () => {
        selectChapter(null);
    };

    const handleBackToStory = () => {
        selectChapter(null);
    };

    const fontSizeClasses = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg'
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex flex-col overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    background: 'radial-gradient(ellipse at center, #0a0a0f 0%, #000000 100%)'
                }}
            >
                {/* Animated Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Floating Particles */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
                            animate={{
                                y: [0, -100, 0],
                                x: [0, Math.random() * 50 - 25, 0],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 8 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 8,
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}

                    {/* Gradient Orbs */}
                    <motion.div
                        className="absolute w-96 h-96 rounded-full opacity-10"
                        style={{
                            background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)',
                            filter: 'blur(60px)',
                        }}
                        animate={{
                            x: [0, 100, -50, 0],
                            y: [0, -50, 100, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        initial={{ x: '20%', y: '30%' }}
                    />
                </div>
                {/* Header */}
                <motion.div
                    className="sticky top-0 backdrop-blur-xl bg-black/40 border-b border-purple-500/20 p-6 z-10"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="flex items-center justify-between max-w-6xl mx-auto">
                        <div className="flex items-center gap-6">
                            <motion.button
                                onClick={handleBackToStory}
                                className="p-3 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 hover:text-white transition-all duration-300 backdrop-blur-sm border border-purple-500/30"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ArrowLeft size={20} />
                            </motion.button>
                            <div className="text-center flex-1">
                                <motion.h1
                                    className="text-3xl md:text-4xl font-bold text-white glow-text mb-2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {selectedChapter.title}
                                </motion.h1>
                                <motion.p
                                    className="text-lg text-purple-200 opacity-80"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {selectedStory.title}
                                </motion.p>
                                {selectedChapter.description && (
                                    <motion.p
                                        className="text-sm text-gray-300 opacity-70 mt-2 italic max-w-2xl mx-auto"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        {selectedChapter.description}
                                    </motion.p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <motion.button
                                onClick={() => setIsTypewriterMode(!isTypewriterMode)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm border transition-all duration-300 ${isTypewriterMode
                                    ? 'bg-purple-500/20 border-purple-500/40 text-purple-200'
                                    : 'bg-indigo-500/20 border-indigo-500/40 text-indigo-200'
                                    } hover:scale-105`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                title={isTypewriterMode ? "Switch to instant view" : "Switch to typewriter mode"}
                            >
                                {isTypewriterMode ? <Pause size={16} /> : <Play size={16} />}
                                <span className="hidden sm:inline">
                                    {isTypewriterMode ? "Instant" : "Typewriter"}
                                </span>
                            </motion.button>

                            <AnimatePresence>
                                {!selectedChapter.isRead && (typewriterComplete || !isTypewriterMode) && (
                                    <motion.button
                                        onClick={handleMarkAsRead}
                                        disabled={isMarkingAsRead}
                                        initial={{ opacity: 0, scale: 0.8, x: -20 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            x: 0,
                                        }}
                                        exit={{ opacity: 0, scale: 0.8, x: -20 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 ${isMarkingAsRead
                                            ? 'bg-green-500/20 border-green-500/40 cursor-not-allowed'
                                            : 'bg-green-500/20 border-green-500/40 hover:bg-green-500/30 hover:border-green-400/60 hover:scale-105 glow'
                                            } text-white shadow-lg`}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {isMarkingAsRead ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Marking...
                                            </>
                                        ) : (
                                            <>
                                                <Check size={16} />
                                                Mark as Read
                                            </>
                                        )}
                                    </motion.button>
                                )}
                            </AnimatePresence>

                            {/* Success notification */}
                            <AnimatePresence>
                                {showSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                        className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg"
                                    >
                                        <CheckCircle size={16} />
                                        <span>Marked as read!</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <motion.button
                                onClick={handleClose}
                                className="p-3 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white transition-all duration-300 backdrop-blur-sm border border-red-500/30"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <X size={20} />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto relative">
                    <div className="max-w-5xl mx-auto p-8 md:p-12 relative z-10">
                        {/* Reading Progress Bar */}
                        <motion.div
                            className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 z-50 shadow-lg shadow-purple-500/50"
                            initial={{ width: '0%' }}
                            animate={{
                                width: isTypewriterMode && !typewriterComplete ? '0%' : '100%'
                            }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />

                        {/* Chapter Navigation */}
                        <motion.div
                            className="flex justify-between items-center mb-8 text-sm text-purple-200/60"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="flex items-center gap-4">
                                <span>Chapter {selectedStory.chapters.findIndex(ch => ch.id === selectedChapter.id) + 1} of {selectedStory.chapters.length}</span>
                                {selectedChapter.mood && (
                                    <span className="px-2 py-1 bg-purple-500/20 border border-purple-400/30 rounded-md text-xs capitalize">
                                        {selectedChapter.mood} mood
                                    </span>
                                )}
                            </div>
                            <span>{selectedChapter.isRead ? 'Completed' : 'In Progress'}</span>
                        </motion.div>

                        {/* Content Container */}
                        <motion.div
                            className="mystery-card rounded-3xl p-8 md:p-12 backdrop-blur-xl glow max-w-4xl mx-auto"
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <motion.div
                                className={`story-content ${fontSizeClasses[fontSize]} relative`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                {isTypewriterMode ? (
                                    <TypewriterMarkdown
                                        content={selectedChapter.content}
                                        speed={25}
                                        onComplete={() => setTypewriterComplete(true)}
                                    />
                                ) : (
                                    <ReactMarkdown>{selectedChapter.content}</ReactMarkdown>
                                )}
                            </motion.div>

                            {/* Reading completion indicator */}
                            <AnimatePresence>
                                {selectedChapter.isRead && (
                                    <motion.div
                                        className="mt-12 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl max-w-md mx-auto backdrop-blur-sm glow"
                                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, y: -30 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                    >
                                        <motion.div
                                            className="flex items-center justify-center gap-3 text-green-100"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{
                                                    delay: 0.3,
                                                    type: "spring",
                                                    stiffness: 200,
                                                    duration: 0.8
                                                }}
                                            >
                                                <CheckCircle size={24} className="text-green-400" />
                                            </motion.div>
                                            <span className="font-semibold text-lg">Chapter completed!</span>
                                        </motion.div>

                                        {/* Celebration particles */}
                                        {[...Array(6)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute w-2 h-2 bg-green-400 rounded-full"
                                                initial={{
                                                    scale: 0,
                                                    x: 0,
                                                    y: 0
                                                }}
                                                animate={{
                                                    scale: [0, 1, 0],
                                                    x: [0, (Math.random() - 0.5) * 100],
                                                    y: [0, (Math.random() - 0.5) * 100],
                                                }}
                                                transition={{
                                                    duration: 1.5,
                                                    delay: 0.5 + i * 0.1,
                                                    ease: "easeOut"
                                                }}
                                                style={{
                                                    left: '50%',
                                                    top: '50%',
                                                }}
                                            />
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};