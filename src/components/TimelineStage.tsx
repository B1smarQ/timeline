import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle } from 'lucide-react';
import { TimelineStage as TimelineStageType } from '../types';
import { StoryCard } from './StoryCard';

interface TimelineStageProps {
    stage: TimelineStageType;
    isActive: boolean;
    isPast: boolean;
}

export const TimelineStage: React.FC<TimelineStageProps> = ({
    stage,
    isActive,
    isPast
}) => {
    if (!stage.isUnlocked && !isPast) {
        console.log(stage.title + " is not unlocked");
        return (
            <div id={`stage-${stage.id}`} className="relative py-32">
                {/* Locked Stage Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-gray-500 rounded-full"
                            animate={{
                                y: [0, -50, 0],
                                opacity: [0, 0.5, 0],
                            }}
                            transition={{
                                duration: 4 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 4,
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>

                <div className="flex items-center justify-center">
                    <motion.div
                        className="relative mystery-card rounded-2xl p-8 max-w-lg border border-gray-600/30 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Lock Icon with Glow */}
                        <motion.div
                            className="flex justify-center mb-6"
                            animate={{
                                rotateY: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gray-500/20 rounded-full blur-xl w-16 h-16" />
                                <Lock size={48} className="text-gray-400 relative z-10" />
                            </div>
                        </motion.div>

                        <div className="text-center">
                            <motion.h3
                                className="text-2xl font-bold text-gray-300 mb-3"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {stage.title}
                            </motion.h3>

                            <motion.div
                                className="text-gray-400 font-mono mb-4"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                {stage.year}
                            </motion.div>

                            <motion.p
                                className="text-gray-500 text-sm leading-relaxed mb-6"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                Complete previous chapters to unlock this stage
                            </motion.p>

                            {/* Progress Indicator */}
                            <motion.div
                                className="flex items-center justify-center gap-2"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-2 h-2 bg-gray-600 rounded-full"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.5, 1, 0.5]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                        }}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>


            </div>
        );
    }

    return (
        <div id={`stage-${stage.id}`} className="relative py-20">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating Orbs */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-32 h-32 rounded-full opacity-5"
                        style={{
                            background: `radial-gradient(circle, ${isActive ? '#a78bfa' : isPast ? '#22c55e' : '#6b7280'
                                } 0%, transparent 70%)`,
                            filter: 'blur(40px)',
                        }}
                        animate={{
                            x: [0, 50, -30, 0],
                            y: [0, -30, 20, 0],
                            scale: [1, 1.1, 0.9, 1],
                        }}
                        transition={{
                            duration: 15 + i * 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 2,
                        }}
                        initial={{
                            x: `${20 + i * 30}%`,
                            y: `${10 + i * 20}%`,
                        }}
                    />
                ))}

                {/* Constellation Pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 600">
                    {[...Array(8)].map((_, i) => (
                        <motion.circle
                            key={i}
                            cx={100 + (i * 100)}
                            cy={100 + (i % 3) * 150}
                            r="2"
                            fill={isActive ? '#a78bfa' : isPast ? '#22c55e' : '#6b7280'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.5,
                            }}
                        />
                    ))}
                </svg>
            </div>

            <motion.div
                className="relative max-w-6xl mx-auto px-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Decorative Top Border */}
                <motion.div
                    className="flex justify-center mb-8"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                </motion.div>

                {/* Stage Header with Enhanced Design */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="relative inline-block">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl blur-xl" />

                        <div className="relative mystery-card rounded-2xl p-8 backdrop-blur-xl border border-purple-500/30 max-w-3xl">
                            <motion.div
                                className="mb-4"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h2 className="text-4xl font-bold text-white glow-text text-center">{stage.title}</h2>
                            </motion.div>

                            <motion.div
                                className="text-purple-200 font-mono text-lg mb-4"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                {stage.year}
                            </motion.div>

                            <motion.p
                                className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                {stage.description}
                            </motion.p>

                            {isPast && (
                                <motion.div
                                    className="mt-4 flex items-center justify-center gap-2 text-green-400"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ delay: 0.7, type: "spring" }}
                                >
                                    <CheckCircle size={20} />
                                    <span className="text-sm font-medium">Completed</span>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Stories Section */}
                <div className="relative">
                    {/* Section Divider */}


                    {/* Stories Grid with Better Layout */}
                    <div className="grid gap-8 md:gap-12 lg:grid-cols-2 xl:grid-cols-3 justify-items-center max-w-7xl mx-auto">
                        {stage.stories.map((story, idx) => (
                            <motion.div
                                key={story.id}
                                className="w-full max-w-sm"
                                initial={{ opacity: 0, y: 60, rotateX: -15 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    delay: 0.4 + idx * 0.15,
                                    duration: 0.8,
                                    type: "spring",
                                    stiffness: 100
                                }}
                            >
                                <StoryCard
                                    story={story}
                                    stageId={stage.id}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Decorative Bottom Border */}
                <motion.div
                    className="flex justify-center mt-16"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <div className="h-px w-48 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                </motion.div>
            </motion.div>

            {/* Timeline Connection Dot */}
            <motion.div
                className={`absolute left-1/2 top-8 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white/20 ${isActive ? 'bg-purple-500 shadow-lg shadow-purple-500/50' :
                    isPast ? 'bg-green-500 shadow-lg shadow-green-500/50' :
                        'bg-gray-600 shadow-lg shadow-gray-600/30'
                    }`}
                whileInView={{ scale: [0.8, 1.2, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {isActive && (
                    <motion.div
                        className="absolute inset-0 rounded-full bg-purple-400/30"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}
            </motion.div>
        </div>
    );
};