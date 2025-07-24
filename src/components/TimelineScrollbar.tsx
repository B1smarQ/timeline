import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAppStore } from '../store';

export const TimelineScrollbar: React.FC = () => {
    const { stages, currentStage } = useAppStore();
    const { scrollYProgress } = useScroll();
    const [hoveredStage, setHoveredStage] = useState<number | null>(null);

    const scrollToStage = (stageIndex: number) => {
        const stageElement = document.getElementById(`stage-${stages[stageIndex]?.id}`);
        if (stageElement) {
            stageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 flex flex-col items-center">
            {/* Timeline Track */}
            <div className="relative w-1 h-80 bg-gray-800/50 rounded-full backdrop-blur-sm">
                {/* Progress Line */}
                <motion.div
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-400 via-indigo-400 to-purple-600 rounded-full"
                    style={{
                        height: useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
                    }}
                />

                {/* Glow Effect */}
                <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 bg-gradient-to-b from-purple-400/50 via-indigo-400/50 to-purple-600/50 rounded-full blur-sm"
                    style={{
                        height: useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
                    }}
                />

                {/* Stage Dots */}
                {stages.map((stage, index) => {
                    const isActive = index === currentStage;
                    const isPast = index < currentStage;
                    const isHovered = hoveredStage === index;

                    return (
                        <motion.div
                            key={stage.id}
                            className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer group"
                            style={{
                                top: `${(index / Math.max(stages.length - 1, 1)) * 100}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                            onClick={() => scrollToStage(index)}
                            onMouseEnter={() => setHoveredStage(index)}
                            onMouseLeave={() => setHoveredStage(null)}
                            whileHover={{ scale: 1.5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            {/* Progress Ring */}
                            <svg className="absolute inset-0 w-6 h-6 -translate-x-1.5 -translate-y-1.5" viewBox="0 0 24 24">
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="2"
                                />
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    fill="none"
                                    stroke={isPast ? "#22c55e" : isActive ? "#a78bfa" : "#6b7280"}
                                    strokeWidth="2"
                                    strokeDasharray={`${2 * Math.PI * 10}`}
                                    strokeDashoffset={`${2 * Math.PI * 10 * (1 - (stage.stories.filter(s => s.isUnlocked).reduce((acc, story) => acc + story.chapters.filter(ch => ch.isRead).length, 0) / Math.max(stage.stories.filter(s => s.isUnlocked).reduce((acc, story) => acc + story.chapters.length, 0), 1)) * 100 / 100)}`}
                                    strokeLinecap="round"
                                    className="transition-all duration-500"
                                    style={{ transform: 'rotate(-90deg)', transformOrigin: '12px 12px' }}
                                />
                            </svg>

                            {/* Main Dot */}
                            <div
                                className={`w-3 h-3 rounded-full border-2 border-white/20 transition-all duration-300 ${isActive
                                    ? 'bg-purple-400 shadow-lg shadow-purple-400/50'
                                    : isPast
                                        ? 'bg-green-400 shadow-lg shadow-green-400/50'
                                        : stage.isUnlocked
                                            ? 'bg-indigo-400 shadow-lg shadow-indigo-400/50'
                                            : 'bg-gray-600 shadow-lg shadow-gray-600/30'
                                    }`}
                            />

                            {/* Pulse Effect for Active */}
                            {isActive && (
                                <motion.div
                                    className="absolute inset-0 w-3 h-3 rounded-full bg-purple-400/30"
                                    animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            )}

                            {/* Tooltip */}
                            <motion.div
                                className={`absolute right-6 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-black/80 backdrop-blur-md rounded-lg border border-purple-500/30 whitespace-nowrap pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'
                                    }`}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{
                                    opacity: isHovered ? 1 : 0,
                                    x: isHovered ? 0 : 10
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="text-sm font-medium text-white">{stage.title}</div>
                                <div className="text-xs text-purple-200 mb-2">{stage.year}</div>

                                {/* Progress Info */}
                                {stage.isUnlocked && (
                                    <>
                                        <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                                            <div
                                                className="bg-gradient-to-r from-purple-400 to-indigo-400 h-1.5 rounded-full transition-all duration-300"
                                                style={{
                                                    width: `${(stage.stories.filter(s => s.isUnlocked).reduce((acc, story) => acc + story.chapters.filter(ch => ch.isRead).length, 0) / Math.max(stage.stories.filter(s => s.isUnlocked).reduce((acc, story) => acc + story.chapters.length, 0), 1)) * 100}%`
                                                }}
                                            />
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {stage.stories.filter(s => s.isUnlocked).reduce((acc, story) => acc + story.chapters.filter(ch => ch.isRead).length, 0)}/
                                            {stage.stories.filter(s => s.isUnlocked).reduce((acc, story) => acc + story.chapters.length, 0)} chapters read
                                        </div>
                                    </>
                                )}

                                {/* Arrow */}
                                <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-black/80 rotate-45 border-l border-b border-purple-500/30" />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Progress Indicator */}
            <motion.div
                className="mt-4 text-xs text-purple-200 font-mono bg-black/50 backdrop-blur-sm px-2 py-1 rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <motion.span>
                    {Math.round(scrollYProgress.get() * 100)}%
                </motion.span>
            </motion.div>
        </div>
    );
};