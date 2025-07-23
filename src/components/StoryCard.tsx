import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle } from 'lucide-react';
import { StoryCover } from './StoryCover';
import { Story } from '../types';
import { useAppStore } from '../store';

interface StoryCardProps {
    story: Story;
    stageId: string;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
    const { selectStory } = useAppStore();

    const readChapters = story.chapters.filter(ch => ch.isRead).length;
    const totalChapters = story.chapters.length;
    const isCompleted = readChapters === totalChapters;
    const progressPercent = (readChapters / totalChapters) * 100;

    const handleClick = () => {
        if (story.isUnlocked) {
            selectStory(story);
        }
    };

    return (
        <motion.div
            className={`relative bg-gray-800 rounded-lg overflow-hidden border transition-all duration-300 ${story.isUnlocked
                ? 'border-gray-700 hover:border-primary-500 cursor-pointer'
                : 'border-gray-800 opacity-60'
                }`}
            whileHover={story.isUnlocked ? { scale: 1.02, y: -2 } : {}}
            onClick={handleClick}
        >
            {/* Story Cover */}
            <div className="min-h-72 h-32 relative">
                {story.isUnlocked ? (
                    <StoryCover
                        cover={story.cover}
                        title={story.title}
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
                    <h3 className="font-extrabold text-lg md:text-xl text-white decoration-primary-400 break-words leading-tight">{story.title}</h3>
                    {isCompleted && <CheckCircle size={16} className="text-green-500 flex-shrink-0 ml-2" />}
                </div>

                <p className="text-sm text-gray-300 mb-3 line-clamp-2">{story.description}</p>

                {story.isUnlocked && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>Progress</span>
                            <span>{readChapters}/{totalChapters} chapters</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div
                                className="bg-primary-500 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                )}

                {!story.isUnlocked && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Lock size={12} />
                        <span>Complete previous stories to unlock</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};