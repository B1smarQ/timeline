import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleSystem, FloatingOrbs } from './ParticleSystem';
import { RotateCcw, X, User } from 'lucide-react';
import { creditsData, creditsConfig, CreditEntry } from '../data/creditsData';
import { useSound } from '../hooks/useSound';
import { useLocalization } from '../hooks/useLocalization';

interface EndingModalProps {
    show: boolean;
    onRestart: () => void;
    onClose: () => void;
    onCreditsStateChange?: (isShowingCredits: boolean) => void;
    onCreditsComplete?: () => void;
    showCredits?: boolean;
}

interface CreditPanelProps {
    credit: CreditEntry;
    isVisible: boolean;
}

const CreditPanel: React.FC<CreditPanelProps> = ({ credit, isVisible }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center px-8"
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -50 }}
                    transition={{
                        opacity: { duration: creditsConfig.fadeInDuration },
                        scale: { duration: creditsConfig.fadeInDuration, type: 'spring', stiffness: 100 },
                        y: { duration: creditsConfig.fadeInDuration }
                    }}
                >
                    <div className="flex items-center gap-12 max-w-4xl w-full">
                        {/* Image Container - Left Side */}
                        <motion.div
                            className="flex-shrink-0"
                            initial={{ scale: 0, rotate: -180, x: -100 }}
                            animate={{ scale: 1, rotate: 0, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
                        >
                            <div className="w-48 h-64 rounded-2xl overflow-hidden border-4 border-purple-400/30 shadow-2xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 backdrop-blur-sm">
                                {credit.image ? (
                                    <img
                                        src={credit.image}
                                        alt={credit.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            // Fallback to icon if image fails to load
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            target.nextElementSibling?.classList.remove('hidden');
                                        }}
                                    />
                                ) : null}
                                <div className={`w-full h-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center ${credit.image ? 'hidden' : ''}`}>
                                    <User size={64} className="text-white/80" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Credit Text - Right Side */}
                        <motion.div
                            className="flex-1 text-left"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            <h2 className="text-5xl md:text-6xl font-bold glow-text mb-6 tracking-wide">
                                {credit.name}
                            </h2>
                            <p className="text-2xl md:text-3xl text-purple-200/80 font-light tracking-wider">
                                as {credit.role}
                            </p>
                        </motion.div>

                        {/* Decorative Elements */}
                        <motion.div
                            className="absolute top-8 left-8 w-2 h-2 bg-purple-400 rounded-full"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute bottom-8 right-8 w-1.5 h-1.5 bg-indigo-400 rounded-full"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const EndingModal: React.FC<EndingModalProps> = ({ show, onRestart, onClose, onCreditsStateChange, onCreditsComplete, showCredits = true }) => {
    const [currentCreditIndex, setCurrentCreditIndex] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const [creditsComplete, setCreditsComplete] = useState(false);
    const { playSound } = useSound();
    const { t } = useLocalization();

    useEffect(() => {
        if (!show) {
            setCurrentCreditIndex(0);
            setShowControls(false);
            setCreditsComplete(false);
            onCreditsStateChange?.(false);
            return;
        }

        if (showCredits) {
            // Notify that credits are starting
            onCreditsStateChange?.(true);

            // Start credits sequence
            const intervals: ReturnType<typeof setTimeout>[] = [];

            creditsData.forEach((credit, index) => {
                const showTime = (credit.delay || index * creditsConfig.panelDuration) * 1000;

                const showInterval = setTimeout(() => {
                    setCurrentCreditIndex(index);
                    //playSound('chime');
                }, showTime);

                intervals.push(showInterval);
            });

            // Show controls after all credits
            const controlsTimeout = setTimeout(() => {
                setCreditsComplete(true);
                setShowControls(true);
                //playSound('success');
                onCreditsComplete?.();
            }, (creditsConfig.totalDuration + creditsConfig.restartDelay) * 1000);

            intervals.push(controlsTimeout);

            return () => {
                intervals.forEach(clearTimeout);
            };
        } else {
            // If not showing credits, show controls immediately
            setCreditsComplete(true);
            setShowControls(true);
            onCreditsStateChange?.(false);
        }
    }, [show, showCredits, playSound, onCreditsStateChange, onCreditsComplete]);
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

                    {/* Credits Container */}
                    <div className="relative z-10 min-h-screen">
                        {showCredits && (
                            <>
                                {/* Credits Title */}
                                <motion.div
                                    className="absolute top-16 left-0 right-0 z-20 flex justify-center"
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                >
                                    <h1 className="text-4xl md:text-6xl font-bold glow-text tracking-wider">
                                        Credits
                                    </h1>
                                </motion.div>

                                {/* Credits Panels */}
                                <div className="relative w-full h-screen flex items-center justify-center">
                                    {creditsData.map((credit, index) => (
                                        <CreditPanel
                                            key={index}
                                            credit={credit}
                                            isVisible={currentCreditIndex === index && !creditsComplete}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Final Screen with Controls */}
                        <AnimatePresence>
                            {showControls && (
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 1, type: 'spring', stiffness: 100 }}
                                >
                                    <div className="text-center max-w-4xl px-4">
                                        {/* Decorative Background Glow */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/15 to-purple-500/10 rounded-3xl blur-3xl" />

                                        {/* Main Card */}
                                        <div className="relative mystery-card rounded-3xl p-16 md:p-24 backdrop-blur-xl border border-purple-500/20">
                                            {/* Final Title */}
                                            <motion.div
                                                className="mb-16"
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5, duration: 1 }}
                                            >
                                                <motion.h1
                                                    className="text-5xl md:text-7xl font-bold glow-text mb-8 tracking-wider"
                                                    animate={{
                                                        textShadow: [
                                                            '0 0 20px rgba(167, 139, 250, 0.5)',
                                                            '0 0 40px rgba(167, 139, 250, 0.8)',
                                                            '0 0 20px rgba(167, 139, 250, 0.5)'
                                                        ]
                                                    }}
                                                    transition={{ duration: 3, repeat: Infinity }}
                                                >
                                                    Ephemera
                                                </motion.h1>

                                                <motion.div
                                                    className="text-xl md:text-2xl text-purple-200/80 font-light tracking-wide"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 1.5 }}
                                                >
                                                    Gratitude, like starlight,
                                                    arrives long after the source has gone dark.
                                                </motion.div>
                                                <motion.div
                                                    className="text-xl md:text-2xl text-purple-200/80 font-light tracking-wide"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 1.5 }}
                                                >
                                                    These words were never meant to linger—
                                                    fugitive sparks against the night,
                                                    already dissolving as you read them.
                                                </motion.div>
                                                <motion.div
                                                    className="text-xl md:text-2xl text-purple-200/80 font-light tracking-wide"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 1.5 }}
                                                >
                                                    The archive will swallow them whole
                                                    by next tide.
                                                </motion.div>
                                                <motion.div
                                                    className="text-xl md:text-2xl text-purple-200/80 font-light tracking-wide"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 1.5 }}
                                                >
                                                    But for the patient wanderer,
                                                    a single path remains:
                                                    https://github.com/b1smarq/timeline/tree/master/src/data
                                                </motion.div>
                                                <motion.div
                                                    className="text-xl md:text-2xl text-purple-200/80 font-light tracking-wide"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 1.5 }}
                                                >
                                                    Where the ghosts of these stories
                                                    dance a little longer
                                                    in the cathedral of zeros and ones.
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
                                                    onClick={() => {
                                                        playSound('click');
                                                        onRestart();
                                                    }}
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
                                                        <span>{t.ending.restartJourney}</span>
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
                                                    onClick={() => {
                                                        playSound('click');
                                                        onClose();
                                                    }}
                                                    whileHover={{ scale: 1.05, y: -2 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <div className="relative flex items-center justify-center gap-3">
                                                        <X size={20} />
                                                        <span>{t.ending.close}</span>
                                                    </div>
                                                </motion.button>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};