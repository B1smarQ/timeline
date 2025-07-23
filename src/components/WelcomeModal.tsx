import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypewriterMarkdown } from './TypewriterMarkdown';

interface WelcomeModalProps {
  show: boolean;
  onClose: () => void;
}

const welcomeText = `This is a story of my life, and the people who have been a part of it.\n\nI hope you enjoy reading them as much as I enjoyed writing them.\n\nThose stories are based on my initial impressions of you and may not be entirely accurate.\n\nClick the button below to begin.`;

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ show, onClose }) => {
  const [titleDone, setTitleDone] = React.useState(false);

  React.useEffect(() => {
    if (show) setTitleDone(false);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-gradient-to-br from-indigo-900/80 to-black/90 border border-violet-700/40 rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text tracking-wider">
              <TypewriterMarkdown content={"As I've Written"} speed={40} onComplete={() => setTitleDone(true)} />
            </h2>
            <div className="mb-8 text-lg text-gray-200 min-h-[4.5em]">
              {titleDone && <TypewriterMarkdown content={welcomeText} speed={40} />}
            </div>
            <button
              className="px-8 py-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-semibold text-lg shadow-lg transition-all duration-200 glow-element"
              onClick={onClose}
              autoFocus
            >
              Begin
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 