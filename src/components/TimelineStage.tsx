import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle } from 'lucide-react';
import { TimelineStage as TimelineStageType } from '../types';
import { StoryCard } from './StoryCard';

interface TimelineStageProps {
    stage: TimelineStageType;
    index: number;
    isActive: boolean;
    isPast: boolean;
}

export const TimelineStage: React.FC<TimelineStageProps> = ({
    stage,
    index,
    isActive,
    isPast
}) => {
    if (!stage.isUnlocked && !isPast) {
        console.log(stage.title + " is not unlocked");
        return (
            <div className="flex items-center justify-center">
                <motion.div
                    className="relative bg-gray-800 rounded-lg p-6 max-w-md border border-gray-700"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="flex items-center gap-3 text-gray-500">
                        <Lock size={24} />
                        <div>
                            <h3 className="text-lg font-semibold">{stage.title}</h3>
                            <p className="text-sm">Complete previous chapters to unlock</p>
                        </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="absolute top-1/2 transform -translate-y-1/2 -left-8 w-4 h-4 bg-gray-600 rounded-full" />
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex justify-center">
            <motion.div
                className="relative max-w-4xl w-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Stage header */}
                <div className="mb-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-white">{stage.title}</h2>
                        <span className="text-primary-400 font-mono">{stage.year}</span>
                        {isPast && <CheckCircle className="text-green-500" size={20} />}
                    </div>
                    <p className="text-gray-400">{stage.description}</p>
                </div>

                {/* Stories grid */}
                <div className="grid gap-4 md:grid-cols-2 justify-items-center">
                    {stage.stories.map((story) => (
                        <StoryCard
                            key={story.id}
                            story={story}
                            stageId={stage.id}
                        />
                    ))}
                </div>

                {/* Timeline dot */}
                <div className={`absolute top-8 -left-8 w-6 h-6 rounded-full ${isActive ? 'bg-primary-500' : isPast ? 'bg-green-500' : 'bg-gray-600'
                    }`} />
            </motion.div>
        </div>
    );
};