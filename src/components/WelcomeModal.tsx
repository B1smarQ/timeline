import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypewriterMarkdown } from './TypewriterMarkdown';
import { ParticleSystem, FloatingOrbs } from './ParticleSystem';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface WelcomeModalProps {
  show: boolean;
  onClose: () => void;
}

const welcomeText = `This is a story of my life, and the people who have been a part of it.

I hope you enjoy reading them as much as I enjoyed writing them.

Those stories are based on my initial impressions of you and may not be entirely accurate.

*Click below to begin your journey...*`;

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ show, onClose }) => {
  const [titleDone, setTitleDone] = React.useState(false);
  const [contentDone, setContentDone] = React.useState(false);
  const { playSound } = useSound();

  React.useEffect(() => {
    if (show) {
      setTitleDone(false);
      setContentDone(false);
    }
  }, [show]);

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
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 1.2, type: 'spring', stiffness: 100 }}
            >
              {/* Decorative Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl blur-3xl" />

              {/* Main Card */}
              <div className="relative mystery-card rounded-3xl p-12 md:p-16 backdrop-blur-xl border border-purple-500/20 text-center">
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
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <h1 className="text-5xl md:text-7xl font-bold glow-text mb-4 tracking-wide">
                    <TypewriterMarkdown
                      content={"As I've Written"}
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

                {/* Content */}
                <motion.div
                  className="mb-12 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: titleDone ? 1 : 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-xl text-gray-200 leading-relaxed story-content">
                    {titleDone && (
                      <TypewriterMarkdown
                        content={welcomeText}
                        speed={30}
                        onComplete={() => setContentDone(true)}
                      />
                    )}
                  </div>
                </motion.div>

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
                          onClose();
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        autoFocus
                      >
                        {/* Button Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Button Content */}
                        <div className="relative flex items-center gap-3">
                          <span>Begin Journey</span>
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