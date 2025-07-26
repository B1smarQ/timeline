import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAppStore } from '../store';
import { TimelineStage } from './TimelineStage';

export const Timeline: React.FC = () => {
    const { stages, currentStage, currentLanguage } = useAppStore();
    const { scrollYProgress } = useScroll();
    const timelineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    // Debug logging
    React.useEffect(() => {
        console.log(`📊 Timeline: Language=${currentLanguage}, Stages=${stages.length}`);
        if (stages.length > 0) {
            console.log(`📊 First stage title: "${stages[0].title}"`);
        }
    }, [currentLanguage, stages]);

    return (
        <div className="relative">
            {/* Animated Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full timeline-animated-line">
                <div className="w-full bg-gradient-to-b from-purple-500 via-indigo-500 to-transparent h-full opacity-60" />
                <motion.div
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-400 to-indigo-400"
                    style={{ height: timelineHeight }}
                />
            </div>

            {/* Floating Timeline Dots */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full">
                {stages.map((stage, index) => (
                    <motion.div
                        key={`dot-${stage.id}`}
                        className={`absolute w-4 h-4 rounded-full ${index === currentStage
                            ? 'bg-purple-400 animate-timeline-dot-pulse'
                            : index < currentStage
                                ? 'bg-green-400 animate-timeline-dot-glow'
                                : 'bg-gray-600 animate-timeline-dot-twinkle'
                            }`}
                        style={{
                            top: `${(index / Math.max(stages.length - 1, 1)) * 100}%`,
                            transform: 'translateY(-50%)'
                        }}
                        whileHover={{ scale: 1.5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                ))}
            </div>

            <div className="space-y-20 py-12">
                {stages.map((stage, index) => (
                    <motion.div
                        key={stage.id}
                        initial={{ opacity: 0, y: 100, rotateX: -15 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            duration: 0.8,
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 100
                        }}
                        className="flex justify-center"
                    >
                        <TimelineStage
                            stage={stage}
                            isActive={index === currentStage}
                            isPast={index < currentStage}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};