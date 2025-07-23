import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Check, Play, Pause, Loader2, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { TypewriterMarkdown } from './TypewriterMarkdown';
import { useAppStore } from '../store';

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

    // Reset typewriter state when chapter changes
    React.useEffect(() => {
        setTypewriterComplete(false);
        setIsMarkingAsRead(false);
        setShowSuccess(false);
    }, [selectedChapter?.id]);

    if (!selectedChapter || !selectedStory) return null;

    const handleMarkAsRead = async () => {
        setIsMarkingAsRead(true);

        // Add a small delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 300));

        const stage = stages.find(s => s.stories.some(story => story.id === selectedStory.id));
        if (stage) {
            markChapterAsRead(stage.id, selectedStory.id, selectedChapter.id);
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
                className="fixed inset-0 bg-gray-900 z-50 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Header */}
                <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4">
                    <div className="flex items-center justify-between max-w-4xl mx-auto">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleBackToStory}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div className="text-center flex-1">
                                <h1 className="text-lg font-semibold text-white">{selectedChapter.title}</h1>
                                <p className="text-sm text-gray-400">{selectedStory.title} by {selectedStory.author}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsTypewriterMode(!isTypewriterMode)}
                                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
                                    title={isTypewriterMode ? "Switch to instant view" : "Switch to typewriter mode"}
                                >
                                    {isTypewriterMode ? <Pause size={16} /> : <Play size={16} />}
                                    {isTypewriterMode ? "Instant" : "Typewriter"}
                                </button>
                            </div>

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
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isMarkingAsRead
                                            ? 'bg-primary-500 cursor-not-allowed'
                                            : 'bg-primary-600 hover:bg-primary-700 hover:scale-105 hover:shadow-primary-500/25 hover:shadow-lg'
                                            } text-white shadow-lg ring-2 ring-primary-500/20`}
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
                            <button
                                onClick={handleClose}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto bg-gray-900">
                    <div className="max-w-4xl mx-auto p-8">
                        <motion.div
                            className={`story-content ${fontSizeClasses[fontSize]} text-center max-w-3xl mx-auto`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
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
                                    className="mt-8 p-4 bg-gradient-to-r from-green-900 to-green-800 border border-green-600 rounded-lg max-w-md mx-auto shadow-lg"
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    <motion.div
                                        className="flex items-center justify-center gap-2 text-green-100"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                        >
                                            <CheckCircle size={20} className="text-green-400" />
                                        </motion.div>
                                        <span className="font-medium">Chapter completed!</span>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};