import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { Chapter, Story } from '../types';
import { useSound } from '../hooks/useSound';

interface ChapterSplashScreenProps {
    chapter: Chapter;
    story: Story;
    chapterNumber: number;
    onContinue: () => void;
}

export const ChapterSplashScreen: React.FC<ChapterSplashScreenProps> = ({
    chapter,
    story,
    chapterNumber,
    onContinue
}) => {
    const { playSound } = useSound();

    const handleContinue = () => {
        playSound('page-turn');
        onContinue();
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
                background: 'radial-gradient(ellipse at center, #0a0a0f 0%, #000000 100%)'
            }}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating Particles */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 50 - 25, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 6 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 6,
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}

                {/* Gradient Orb */}
                <motion.div
                    className="absolute w-96 h-96 rounded-full opacity-10"
                    style={{
                        background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-4xl w-full px-6">
                <motion.div
                    className="text-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, type: 'spring', stiffness: 100 }}
                >
                    {/* Decorative Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl blur-3xl" />

                    {/* Main Card */}
                    <div className="relative mystery-card rounded-3xl p-12 md:p-16 backdrop-blur-xl border border-purple-500/20">

                        {/* Book Icon */}
                        <motion.div
                            className="flex justify-center mb-8"
                            initial={{ y: -20, opacity: 0, rotate: -10 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
                        >
                            <div className="relative">
                                <motion.div
                                    className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl w-16 h-16"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.5, 0.8, 0.5]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                                <BookOpen size={48} className="text-purple-400 relative z-10" />
                            </div>
                        </motion.div>

                        {/* Chapter Number */}
                        <motion.div
                            className="mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            <div className="flex items-center justify-center gap-3 text-purple-300 text-lg mb-2">
                                <div className="w-8 h-px bg-purple-400/50" />
                                <span className="font-medium">Chapter {chapterNumber}</span>
                                <div className="w-8 h-px bg-purple-400/50" />
                            </div>
                            <div className="text-sm text-purple-400/70 font-light">
                                {story.title}
                            </div>
                        </motion.div>

                        {/* Chapter Title */}
                        <motion.h1
                            className="text-4xl md:text-5xl font-bold glow-text mb-8 tracking-wide leading-tight"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            {chapter.title}
                        </motion.h1>

                        {/* Chapter Description */}
                        {chapter.description && (
                            <motion.div
                                className="mb-10 max-w-2xl mx-auto"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.6 }}
                            >
                                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light italic">
                                    "{chapter.description}"
                                </p>
                            </motion.div>
                        )}

                        {/* Mood Indicator */}
                        {chapter.mood && (
                            <motion.div
                                className="mb-8 flex justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.1, duration: 0.5 }}
                            >
                                <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full">
                                    <Sparkles size={16} className="text-purple-400" />
                                    <span className="text-sm text-purple-200 capitalize font-medium">
                                        {chapter.mood} mood
                                    </span>
                                </div>
                            </motion.div>
                        )}

                        {/* Continue Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 1.3, duration: 0.6, type: 'spring', stiffness: 200 }}
                        >
                            <motion.button
                                className="group relative px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg shadow-2xl border border-purple-400/30 overflow-hidden"
                                onClick={handleContinue}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                autoFocus
                            >
                                {/* Button Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Button Content */}
                                <div className="relative flex items-center gap-3">
                                    <span>Begin Reading</span>
                                    <motion.div
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <ArrowRight size={20} />
                                    </motion.div>
                                </div>

                                {/* Shimmer Effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 3,
                                        ease: "easeInOut"
                                    }}
                                />
                            </motion.button>

                            {/* Skip Hint */}
                            <motion.div
                                className="mt-6 text-xs text-purple-300/60"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2 }}
                            >
                                Press Enter, Space, or Escape to continue
                            </motion.div>
                        </motion.div>

                        {/* Decorative Elements */}
                        <div className="absolute top-8 left-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                        <div className="absolute top-12 right-12 w-1 h-1 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                        <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                        <div className="absolute bottom-12 right-8 w-1 h-1 bg-indigo-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};