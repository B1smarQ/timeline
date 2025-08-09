import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowRight, Sparkles } from 'lucide-react';
import { useLocalization } from '../hooks/useLocalization';
import { useAppStore } from '../store';
import { useSound } from '../hooks/useSound';

interface LanguageSelectionPanelProps {
    show: boolean;
    onContinue: () => void;
}

export const LanguageSelectionPanel: React.FC<LanguageSelectionPanelProps> = ({ show, onContinue }) => {
    const { currentLanguage, setLanguage, availableLanguages } = useLocalization();
    const { loadDataForLanguage } = useAppStore();
    const { playSound } = useSound();

    const handleLanguageSelect = async (languageCode: import('../types/localization').SupportedLanguage) => {
        playSound('click');
        await setLanguage(languageCode);
        await loadDataForLanguage(languageCode);
    };

    const handleContinue = () => {
        playSound('chime');
        onContinue();
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[100] overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                        background: 'radial-gradient(ellipse at center, #0a0a0f 0%, #000000 100%)'
                    }}
                >
                    {/* Background Effects */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {/* Floating Particles */}
                        {[...Array(20)].map((_, i) => (
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
                    <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                        <motion.div
                            className="relative max-w-2xl w-full"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 1.2, type: 'spring', stiffness: 100 }}
                        >
                            {/* Decorative Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl blur-3xl" />

                            {/* Main Card */}
                            <div className="relative mystery-card rounded-3xl p-8 md:p-12 backdrop-blur-xl border border-purple-500/20">
                                {/* Header */}
                                <motion.div
                                    className="text-center mb-8"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <motion.div
                                        className="flex justify-center mb-4"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                    >
                                        <div className="p-4 bg-purple-500/20 rounded-full border border-purple-400/30">
                                            <Globe size={32} className="text-purple-300" />
                                        </div>
                                    </motion.div>

                                    <motion.h2
                                        className="text-3xl md:text-4xl font-bold text-white mb-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        Choose Your Language
                                    </motion.h2>

                                    <motion.p
                                        className="text-gray-300 text-lg"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.9 }}
                                    >
                                        Before we begin, please select your language.
                                    </motion.p>
                                    
                                    <motion.p
                                        className="text-gray-300 text-lg"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.9 }}
                                    >
                                        Some UI elements may be in English.
                                    </motion.p>
                                </motion.div>

                                {/* Language Options */}
                                <motion.div
                                    className="space-y-3 mb-8"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.1 }}
                                >
                                    {availableLanguages.map((language, index) => (
                                        <motion.button
                                            key={language.code}
                                            onClick={() => handleLanguageSelect(language.code)}
                                            className={`w-full p-4 rounded-xl border transition-all duration-300 ${
                                                currentLanguage === language.code
                                                    ? 'bg-purple-600/30 border-purple-400/60 text-purple-100 shadow-lg shadow-purple-500/20'
                                                    : 'bg-gray-800/30 border-gray-600/40 text-gray-300 hover:bg-gray-700/30 hover:border-gray-500/50'
                                            } backdrop-blur-sm`}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1.2 + index * 0.1 }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-2xl">{language.flag}</span>
                                                    <div className="text-left">
                                                        <div className="font-semibold text-lg">{language.nativeName}</div>
                                                        <div className="text-sm opacity-70">{language.name}</div>
                                                    </div>
                                                </div>
                                                {currentLanguage === language.code && (
                                                    <motion.div
                                                        className="flex items-center gap-2"
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.2 }}
                                                    >
                                                        <Sparkles size={16} className="text-purple-300" />
                                                        <span className="text-sm font-medium text-purple-300">Selected</span>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </motion.button>
                                    ))}
                                </motion.div>

                                {/* Continue Button */}
                                <motion.div
                                    className="text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.5 }}
                                >
                                    <motion.button
                                        className="group relative px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg shadow-2xl border border-purple-400/30 overflow-hidden"
                                        onClick={handleContinue}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        autoFocus
                                    >
                                        {/* Button Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Button Content */}
                                        <div className="relative flex items-center gap-3">
                                            <span>Continue to Journey</span>
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
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}; 