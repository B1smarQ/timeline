import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';
import { TimelineStage } from './TimelineStage';

export const Timeline: React.FC = () => {
    const { stages, currentStage } = useAppStore();

    return (
        <div className="relative max-w-6xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-1 bg-gradient-to-b from-primary-500 to-gray-600 h-full" />

            <div className="space-y-32 py-20">
                {stages.map((stage, index) => (
                    <motion.div
                        key={stage.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="flex justify-center"
                    >
                        <TimelineStage
                            stage={stage}
                            index={index}
                            isActive={index === currentStage}
                            isPast={index < currentStage}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};