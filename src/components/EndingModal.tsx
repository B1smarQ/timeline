import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleSystem, FloatingOrbs } from './ParticleSystem';
import { RotateCcw, X, Sparkles } from 'lucide-react';

interface EndingModalProps {
    show: boolean;
    onRestart: () => void;
    onClose: () => void;
}

export const EndingModal: React.FC<EndingModalProps> = ({ show, onRestart, onClose }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[100] overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    style={{
                        background: 'radial-gradient(ellipse at center, #0a0a0f 0%, #000000 100%)'
                    }}
                >
                    {/* Background Effects */}
                    <ParticleSystem />
                    <FloatingOrbs />

                    {/* Enhanced Shooting Stars */}
                    <div className="shooting-stars">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="shooting-star" />
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                        <motion.div
                            className="relative max-w-5xl w-full text-center"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 1.5, type: 'spring', stiffness: 80 }}
                        >
                            {/* Decorative Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/15 to-purple-500/10 rounded-3xl blur-3xl" />

                            {/* Main Card */}
                            <div className="relative mystery-card rounded-3xl p-16 md:p-24 backdrop-blur-xl border border-purple-500/20">

                                {/* Floating Sparkles */}
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute"
                                        style={{
                                            left: `${20 + Math.random() * 60}%`,
                                            top: `${20 + Math.random() * 60}%`,
                                        }}
                                        animate={{
                                            y: [0, -20, 0],
                                            opacity: [0, 1, 0],
                                            rotate: [0, 180, 360],
                                        }}
                                        transition={{
                                            duration: 4 + Math.random() * 2,
                                            repeat: Infinity,
                                            delay: Math.random() * 3,
                                        }}
                                    >
                                        <Sparkles size={16 + Math.random() * 8} className="text-purple-400/60" />
                                    </motion.div>
                                ))}

                                {/* Main Title */}
                                <motion.div
                                    className="mb-16"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                >
                                    <motion.h1
                                        className="text-6xl md:text-8xl lg:text-9xl font-bold glow-text mb-8 tracking-wider"
                                        animate={{
                                            textShadow: [
                                                '0 0 20px rgba(167, 139, 250, 0.5)',
                                                '0 0 40px rgba(167, 139, 250, 0.8)',
                                                '0 0 20px rgba(167, 139, 250, 0.5)'
                                            ]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        To be continued...
                                    </motion.h1>

                                    <motion.div
                                        className="text-xl md:text-2xl text-purple-200/80 font-light tracking-wide"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.5 }}
                                    >
                                        The story continues to unfold
                                    </motion.div>
                                </motion.div>

                                {/* Action Buttons */}
                                <motion.div
                                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 2, duration: 0.8 }}
                                >
                                    {/* Restart Button */}
                                    <motion.button
                                        className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg shadow-2xl border border-purple-400/30 overflow-hidden min-w-48"
                                        onClick={onRestart}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Button Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Button Content */}
                                        <div className="relative flex items-center justify-center gap-3">
                                            <motion.div
                                                animate={{ rotate: [0, 360] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            >
                                                <RotateCcw size={20} />
                                            </motion.div>
                                            <span>Start Over</span>
                                        </div>

                                        {/* Shimmer Effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            initial={{ x: '-100%' }}
                                            animate={{ x: '100%' }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                repeatDelay: 4,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    </motion.button>

                                    {/* Continue Button */}
                                    <motion.button
                                        className="group relative px-8 py-4 rounded-2xl bg-transparent border-2 border-purple-400/50 text-purple-200 font-semibold text-lg hover:bg-purple-500/10 transition-all duration-300 min-w-48"
                                        onClick={onClose}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="relative flex items-center justify-center gap-3">
                                            <X size={20} />
                                            <span>Continue Exploring</span>
                                        </div>
                                    </motion.button>
                                </motion.div>

                                {/* Subtitle */}
                                <motion.div
                                    className="mt-12 text-gray-400 text-sm"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2.5 }}
                                >
                                    Thank you for experiencing this journey
                                </motion.div>

                                {/* Decorative Corner Elements */}
                                <div className="absolute top-8 left-8 w-3 h-3 bg-purple-400/60 rounded-full animate-pulse" />
                                <div className="absolute top-12 right-12 w-2 h-2 bg-indigo-400/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                                <div className="absolute bottom-8 left-12 w-2 h-2 bg-purple-300/60 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                                <div className="absolute bottom-12 right-8 w-1.5 h-1.5 bg-indigo-300/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};