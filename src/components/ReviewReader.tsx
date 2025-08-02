import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { TypewriterMarkdown } from './TypewriterMarkdown';
import { ParticleSystem } from './ParticleSystem';
import { Review } from '../data/reviewsData';
import { useSound } from '../hooks/useSound';

interface ReviewReaderProps {
    show: boolean;
    review: Review | null;
    onClose: () => void;
}

export const ReviewReader: React.FC<ReviewReaderProps> = ({ show, review, onClose }) => {
    const [isTypewriterMode, setIsTypewriterMode] = useState(true);
    // @ts-ignore - used in setTypewriterComplete calls
    const [typewriterComplete, setTypewriterComplete] = useState(false);
    const { playSound } = useSound();

    const handleClose = () => {
        playSound('click');
        onClose();
    };

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - Math.ceil(rating);

        return (
            <div className="flex items-center gap-1">
                {/* Full stars */}
                {Array.from({ length: fullStars }, (_, i) => (
                    <Star key={`full-${i}`} size={20} className="text-yellow-400 fill-yellow-400" />
                ))}

                {/* Half star */}
                {hasHalfStar && (
                    <div className="relative">
                        <Star size={20} className="text-gray-600" />
                        <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                            <Star size={20} className="text-yellow-400 fill-yellow-400" />
                        </div>
                    </div>
                )}

                {/* Empty stars */}
                {Array.from({ length: emptyStars }, (_, i) => (
                    <Star key={`empty-${i}`} size={20} className="text-gray-600" />
                ))}

                <span className="ml-2 text-lg font-medium text-gray-300">
                    {rating.toFixed(1)}
                </span>
            </div>
        );
    };

    if (!review) return null;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 bg-black/95 backdrop-blur-md z-[300] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={handleClose}
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
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex-1 mr-4">
                                <motion.h1
                                    className="text-3xl md:text-4xl font-bold text-white glow-text mb-3"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                >
                                    {review.title}
                                </motion.h1>

                                <motion.div
                                    className="flex items-center gap-4 mb-2"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                >
                                    <span className="text-lg text-gray-300">by {review.author}</span>
                                    {renderStars(review.rating)}
                                </motion.div>
                            </div>

                            <motion.button
                                onClick={handleClose}
                                className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors border border-gray-600/50"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7, duration: 0.3 }}
                            >
                                <X size={20} />
                            </motion.button>
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
                                        setTypewriterComplete(false);
                                        playSound('click');
                                    }}
                                    className="px-4 py-2 rounded-lg bg-purple-600/20 border border-purple-500/40 text-purple-200 hover:bg-purple-600/30 transition-colors text-sm"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {isTypewriterMode ? 'Instant Mode' : 'Typewriter Mode'}
                                </motion.button>
                            </div>

                            {/* Review Content */}
                            <div className="prose prose-invert prose-purple max-w-none text-gray-200 leading-relaxed story-content">
                                {isTypewriterMode ? (
                                    <TypewriterMarkdown
                                        content={review.content}
                                        speed={25}
                                        onComplete={() => setTypewriterComplete(true)}
                                    />
                                ) : (
                                    <ReactMarkdown>{review.content}</ReactMarkdown>
                                )}
                            </div>
                        </motion.div>

                        {/* Back Button */}
                        <motion.div
                            className="flex justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <motion.button
                                onClick={handleClose}
                                className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium rounded-xl transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ArrowLeft size={20} />
                                <span>Back to Reviews</span>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};