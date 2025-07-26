import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useLocalization } from '../hooks/useLocalization';

export const LanguageSelector: React.FC = () => {
    const { currentLanguage, setLanguage, availableLanguages } = useLocalization();
    const [isOpen, setIsOpen] = useState(false);

    const currentLangInfo = availableLanguages.find(lang => lang.code === currentLanguage);

    return (
        <div className="relative">
            <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    Before we begin, please select your language.
                    All localizations are verified to be accurate.
                </motion.div>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-purple-600/20 border border-purple-400/30 rounded-lg text-purple-200 hover:bg-purple-600/30 transition-colors backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Globe size={16} />
                <span className="text-sm font-medium">
                    {currentLangInfo?.flag} {currentLangInfo?.nativeName}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={14} />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            className="absolute top-full right-0 mt-2 py-2 bg-black/90 backdrop-blur-md rounded-xl border border-purple-500/30 shadow-xl z-50 min-w-48"
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            {availableLanguages.map((language) => (
                                <motion.button
                                    key={language.code}
                                    onClick={() => {
                                        setLanguage(language.code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${currentLanguage === language.code
                                            ? 'bg-purple-600/30 text-purple-100'
                                            : 'text-gray-300 hover:bg-purple-600/20 hover:text-purple-200'
                                        }`}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="text-lg">{language.flag}</span>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{language.nativeName}</span>
                                        <span className="text-xs opacity-70">{language.name}</span>
                                    </div>
                                    {currentLanguage === language.code && (
                                        <motion.div
                                            className="ml-auto w-2 h-2 bg-purple-400 rounded-full"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.1 }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};