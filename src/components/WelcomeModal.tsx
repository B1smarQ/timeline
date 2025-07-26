import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypewriterMarkdown } from './TypewriterMarkdown';
import { ParticleSystem, FloatingOrbs } from './ParticleSystem';
import { BookOpen, Sparkles, ArrowRight, SkipForward } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { useLocalization } from '../hooks/useLocalization';

interface WelcomeModalProps {
  show: boolean;
  onClose?: () => void;
  onShowLanguageSelection: () => void;
}

const welcomeText = `These are the fragments of my life,
and the souls who became its punctuation—

commas in my breath,

exclamation marks in my blood,

ellipses in the spaces between my ribs.

I offer them to you like pressed flowers:

delicate, imperfect,

but alive with the memory of sun.

This is my first dance with words.

Be gentle with its stumbling steps.

(Even the moon was once new.)

These stories are not mirrors, but prisms—

shaped by the light I first saw you in,

bent by the angle of my own trembling hands.

They are secrets whispered to paper,

meant only for the eyes they name.

If these pages found you,

it's because your heartbeat echoes in their margins.

Time required: The span of a held breath (45 minutes) or a slow sunrise (55 minutes).

Leave your footprints softly, if you choose to leave them at all.

*Click below to begin your journey...*`;

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ show, onShowLanguageSelection }) => {
  const { t } = useLocalization();
  const [titleDone, setTitleDone] = React.useState(false);
  const [contentDone, setContentDone] = React.useState(false);
  const { playSound } = useSound();

  React.useEffect(() => {
    if (show) {
      setTitleDone(false);
      setContentDone(false);
    }
  }, [show]);

  // Keyboard shortcuts for testing
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Skip intro with 'S' key
      if (show && (event.key === 's' || event.key === 'S')) {
        event.preventDefault();
        playSound('click');
        onShowLanguageSelection();
      }
    };

    if (show) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [show, onShowLanguageSelection, playSound]);

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
          <ParticleSystem />
          <FloatingOrbs />

          {/* Shooting Stars */}
          <div className="shooting-stars">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="shooting-star" />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 1.2, type: 'spring', stiffness: 100 }}
            >
              {/* Decorative Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl blur-3xl" />

              {/* Main Card */}
              <div className="relative mystery-card rounded-3xl backdrop-blur-xl border border-purple-500/20 text-center flex flex-col min-h-0">
                {/* Skip Intro Button - Top Right */}
                <motion.button
                  className="absolute top-4 right-4 p-2 text-purple-300 hover:text-purple-100 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg border border-purple-400/30 transition-all duration-300 backdrop-blur-sm z-10"
                  onClick={() => {
                    playSound('click');
                    onShowLanguageSelection();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  title="Skip Intro (Testing)"
                >
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <SkipForward size={16} />
                    <span>Skip Intro</span>
                  </div>
                </motion.button>

                {/* Header Section - Fixed */}
                <div className="flex-shrink-0 p-8 md:p-12 pb-4">
                  {/* Floating Book Icon */}
                  <motion.div
                    className="flex justify-center mb-8"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl w-20 h-20"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <BookOpen size={64} className="text-purple-400 relative z-10" />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h1 className="text-4xl md:text-6xl font-bold glow-text mb-4 tracking-wide">
                      <TypewriterMarkdown
                        content={"A Whispered Constellation"}
                        speed={60}
                        onComplete={() => setTitleDone(true)}
                      />
                    </h1>

                    {titleDone && (
                      <motion.div
                        className="flex items-center justify-center gap-2 text-purple-200 text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Sparkles size={20} />
                        <span>A Journey Through Time</span>
                        <Sparkles size={20} />
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* Scrollable Content Section */}
                <div className="flex-1 overflow-y-auto px-8 md:px-12 min-h-0 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent">
                  <motion.div
                    className="max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: titleDone ? 1 : 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-lg md:text-xl text-gray-200 leading-relaxed story-content pb-8">
                      {titleDone && (
                        <TypewriterMarkdown
                          content={welcomeText}
                          speed={30}
                          onComplete={() => setContentDone(true)}
                        />
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Footer Section - Fixed */}
                <div className="flex-shrink-0 p-8 md:p-12 pt-4">
                  {/* Begin Button */}
                  <AnimatePresence>
                    {contentDone && (
                      <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -30, scale: 0.8 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                      >
                        <motion.button
                          className="group relative px-12 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xl shadow-2xl border border-purple-400/30 overflow-hidden"
                          onClick={() => {
                            playSound('chime');
                            onShowLanguageSelection();
                          }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          autoFocus
                        >
                          {/* Button Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Button Content */}
                          <div className="relative flex items-center gap-3">
                            <span>{t.welcome.startJourney}</span>
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowRight size={24} />
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
                    )}
                  </AnimatePresence>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-8 left-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <div className="absolute top-12 right-12 w-1 h-1 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-12 right-8 w-1 h-1 bg-indigo-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 