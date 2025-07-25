import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle } from 'lucide-react';
import { StoryCover } from './StoryCover';
import { Story } from '../types';
import { useAppStore } from '../store';
import { useSound } from '../hooks/useSound';

interface StoryCardProps {
    story: Story;
    stageId: string;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story: initialStory, stageId }) => {
    const { selectStory, stages } = useAppStore();
    const { playSound } = useSound();

    // Get the current story data from the store to ensure we have the latest state
    const currentStory = React.useMemo(() => {
        const stage = stages.find(s => s.id === stageId);
        return stage?.stories.find(s => s.id === initialStory.id) || initialStory;
    }, [stages, stageId, initialStory.id, initialStory]);

    const readChapters = currentStory.chapters.filter(ch => ch.isRead).length;
    const totalChapters = currentStory.chapters.length;
    const isCompleted = readChapters === totalChapters;
    const progressPercent = (readChapters / totalChapters) * 100;

    const handleClick = () => {
        if (currentStory.isUnlocked) {
            playSound('click');
            selectStory(currentStory);
        }
    };

    const handleHover = () => {
        if (currentStory.isUnlocked) {
            playSound('hover');
        }
    };

    return (
        <motion.div
            className={`relative mystery-card rounded-xl overflow-hidden border transition-all duration-500 ${currentStory.isUnlocked
                ? 'border-purple-500/30 hover:border-purple-400/60 cursor-pointer glow'
                : 'border-gray-700/30 opacity-50'
                } backdrop-blur-md`}
            whileHover={currentStory.isUnlocked ? {
                scale: 1.05,
                y: -8,
                rotateY: 5,
                rotateX: 5
            } : {}}
            whileTap={currentStory.isUnlocked ? { scale: 0.98 } : {}}
            onClick={handleClick}
            onHoverStart={handleHover}
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
            }}
        >
            {/* Story Cover */}
            <div className="min-h-72 h-32 relative">
                {currentStory.isUnlocked ? (
                    <StoryCover
                        cover={currentStory.cover}
                        title={currentStory.title}
                        className="w-full h-full"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        <Lock size={32} className="text-gray-600" />
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-extrabold text-lg md:text-xl text-white decoration-primary-400 break-words leading-tight">{currentStory.title}</h3>
                    {isCompleted && <CheckCircle size={16} className="text-green-500 flex-shrink-0 ml-2" />}
                </div>

                <p className="text-sm text-gray-300 mb-3 line-clamp-2">{currentStory.description}</p>

                {currentStory.isUnlocked && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>Progress</span>
                            <span>{readChapters}/{totalChapters} chapters</span>
                        </div>
                        <div className="w-full bg-gray-800/60 rounded-full h-2 overflow-hidden">
                            <motion.div
                                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercent}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                style={{
                                    boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
                                }}
                            />
                        </div>
                    </div>
                )}

                {!currentStory.isUnlocked && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Lock size={12} />
                        <span>Complete previous stories to unlock</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};