import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, CheckCircle } from 'lucide-react';
import { StoryCover } from './StoryCover';
import { useAppStore } from '../store';
import { useLocalization } from '../hooks/useLocalization';

export const StoryModal: React.FC = () => {
    const { t } = useLocalization();
    const { selectedStory, selectStory, selectChapter, stages } = useAppStore();

    // Get the current story data from the store to ensure we have the latest state
    const currentStory = React.useMemo(() => {
        if (!selectedStory) return null;

        for (const stage of stages) {
            const story = stage.stories.find(s => s.id === selectedStory.id);
            if (story) return story;
        }
        return selectedStory;
    }, [selectedStory, stages]);

    if (!currentStory) return null;

    const handleChapterClick = (chapter: any) => {
        selectChapter(chapter);
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => selectStory(null)}
            >
                <motion.div
                    className="mystery-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto glow backdrop-blur-xl"
                    initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
                    animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                    exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4">
                        <div className="flex justify-end">
                            <button
                                onClick={() => selectStory(null)}
                                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {/* Story Cover and Info */}
                        <div className="flex gap-6 mb-8">
                            <div className="flex-shrink-0 min-h-72 h-auto flex items-center">
                                <StoryCover
                                    cover={currentStory.cover}
                                    title={currentStory.title}
                                    className="w-48 h-72 object-contain"
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-center">
                                <div className="mb-4">
                                    <h2 className="text-2xl font-bold text-white mb-2">{currentStory.title}</h2>
                                    <p className="text-gray-300 leading-relaxed">{currentStory.description}</p>
                                </div>

                                {/* Progress indicator */}
                                <div className="bg-gray-700 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-300">Reading Progress</span>
                                        <span className="text-sm text-gray-400">
                                            {currentStory.chapters.filter(ch => ch.isRead).length} / {currentStory.chapters.length} chapters
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-600 rounded-full h-2">
                                        <div
                                            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                                            style={{
                                                width: `${(currentStory.chapters.filter(ch => ch.isRead).length / currentStory.chapters.length) * 100}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-white mb-4 text-center">{t.timeline.chapter}s</h3>
                        <div className="space-y-3">
                            {currentStory.chapters.map((chapter, index) => (
                                <motion.button
                                    key={chapter.id}
                                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${chapter.isRead
                                        ? 'bg-green-900 border-green-700 text-green-100'
                                        : 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                                        }`}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => handleChapterClick(chapter)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2">
                                                <BookOpen size={16} />
                                                <span className="font-medium">Chapter {index + 1}</span>
                                            </div>
                                            <span className="text-sm opacity-75">{chapter.title}</span>
                                        </div>
                                        {chapter.isRead && <CheckCircle size={16} className="text-green-400" />}
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};