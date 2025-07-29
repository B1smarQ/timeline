import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { TypewriterMarkdown } from './TypewriterMarkdown';
import { ParticleSystem } from './ParticleSystem';
import { Epilogue } from '../types';
import { useSound } from '../hooks/useSound';

interface EpilogueModalProps {
    show: boolean;
    epilogue: Epilogue;
    onComplete: () => void;
}

export const EpilogueModal: React.FC<EpilogueModalProps> = ({
    show,
    epilogue,
    onComplete
}) => {
    const [isTypewriterMode, setIsTypewriterMode] = useState(true);
    const [typewriterComplete, setTypewriterComplete] = useState(false);
    const { playSound } = useSound();

    const handleComplete = () => {
        playSound('success');
        onComplete();
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}

                >
                    {/* Background Effects */}
                    <div className="absolute inset-0">
                        <ParticleSystem />
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-indigo-900/20" />
                    </div>

                    {/* Content Container */}
                    <motion.div
                        className="relative z-10 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                        initial={{ scale: 0.9, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 50 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="text-center mb-8">
                            <motion.h1
                                className="text-4xl md:text-5xl font-bold text-white glow-text mb-2"
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                {epilogue.title}
                            </motion.h1>
                            {epilogue.description && (
                                <motion.p
                                    className="text-lg text-gray-300"
                                    initial={{ opacity: 0, y: -30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                >
                                    {epilogue.description}
                                </motion.p>
                            )}
                        </div>

                        {/* Content */}
                        <motion.div
                            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8 mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            {/* Typewriter Toggle */}
                            <div className="flex justify-end mb-6">
                                <motion.button
                                    onClick={() => {
                                        setIsTypewriterMode(!isTypewriterMode);
                                        playSound('click');
                                    }}
                                    className="px-4 py-2 rounded-lg bg-purple-600/20 border border-purple-500/40 text-purple-200 hover:bg-purple-600/30 transition-colors text-sm"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {isTypewriterMode ? 'Instant Mode' : 'Typewriter Mode'}
                                </motion.button>
                            </div>

                            {/* Text Content */}
                            <div className="prose prose-invert prose-purple max-w-none text-gray-200 leading-relaxed story-content">
                                {isTypewriterMode ? (
                                    <TypewriterMarkdown
                                        content={epilogue.content}
                                        speed={30}
                                        onComplete={() => setTypewriterComplete(true)}
                                    />
                                ) : (
                                    <ReactMarkdown>{epilogue.content}</ReactMarkdown>
                                )}
                            </div>

                            {/* Epilogue Image */}
                            <AnimatePresence>
                                {epilogue.image && (typewriterComplete || !isTypewriterMode) && (
                                    <motion.div
                                        className="mt-8 flex justify-center"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    >
                                        <motion.div
                                            className="relative max-w-2xl w-full"
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <img
                                                src={epilogue.image}
                                                alt={`Illustration for ${epilogue.title}`}
                                                className="w-full h-auto rounded-2xl shadow-2xl border border-purple-500/20"
                                                style={{
                                                    filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))'
                                                }}
                                                onError={(e) => {
                                                    console.error('Failed to load epilogue image:', epilogue.image);
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />

                                            {/* Image overlay */}
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Continue Button */}
                        <AnimatePresence>
                            {(typewriterComplete || !isTypewriterMode) && (
                                <motion.div
                                    className="flex justify-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <motion.button
                                        onClick={handleComplete}
                                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span>Continue to Ending</span>
                                        <ArrowRight size={20} />
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};