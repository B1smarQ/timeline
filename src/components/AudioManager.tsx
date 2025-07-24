import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Settings } from 'lucide-react';

interface AudioManagerProps {
    currentScene: 'welcome' | 'timeline' | 'reading' | 'ending';
    isReading: boolean;
    storyMood?: 'mysterious' | 'melancholic' | 'hopeful' | 'dramatic';
}

// Web Audio API based sound generator
class SoundGenerator {
    private audioContext: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private ambientGain: GainNode | null = null;
    private effectsGain: GainNode | null = null;

    constructor() {
        this.initAudio();
    }

    private async initAudio() {
        try {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.ambientGain = this.audioContext.createGain();
            this.effectsGain = this.audioContext.createGain();

            this.masterGain.connect(this.audioContext.destination);
            this.ambientGain.connect(this.masterGain);
            this.effectsGain.connect(this.masterGain);

            this.masterGain.gain.value = 0.3;
            this.ambientGain.gain.value = 0.4;
            this.effectsGain.gain.value = 0.6;
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
        }
    }

    // Generate ambient space sounds
    generateSpaceAmbient() {
        if (!this.audioContext || !this.ambientGain) return null;

        const oscillator = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(60, this.audioContext.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, this.audioContext.currentTime);

        gain.gain.setValueAtTime(0, this.audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 2);

        oscillator.connect(filter);
        filter.connect(gain);
        gain.connect(this.ambientGain);

        return { oscillator, gain };
    }

    // Generate UI interaction sounds
    playClickSound() {
        if (!this.audioContext || !this.effectsGain) return;

        const oscillator = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);

        gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        oscillator.connect(gain);
        gain.connect(this.effectsGain);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    setMasterVolume(volume: number) {
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(volume, this.audioContext?.currentTime || 0);
        }
    }

    setAmbientVolume(volume: number) {
        if (this.ambientGain) {
            this.ambientGain.gain.setValueAtTime(volume, this.audioContext?.currentTime || 0);
        }
    }
}

export const AudioManager: React.FC<AudioManagerProps> = ({
    currentScene,
    isReading,
    storyMood = 'mysterious'
}) => {
    // Use parameters to avoid TS warnings
    console.debug('Audio scene:', currentScene, 'Reading:', isReading, 'Mood:', storyMood);

    const [isEnabled, setIsEnabled] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [masterVolume, setMasterVolume] = useState(0.3);
    const [ambientVolume, setAmbientVolume] = useState(0.4);
    const soundGeneratorRef = useRef<SoundGenerator | null>(null);
    const ambientSoundRef = useRef<{ oscillator: OscillatorNode; gain: GainNode } | null>(null);

    useEffect(() => {
        soundGeneratorRef.current = new SoundGenerator();
        return () => {
            if (ambientSoundRef.current) {
                ambientSoundRef.current.oscillator.stop();
            }
        };
    }, []);

    useEffect(() => {
        if (isEnabled && soundGeneratorRef.current) {
            startAmbientSound();
        } else {
            stopAmbientSound();
        }
    }, [isEnabled, currentScene]);

    const startAmbientSound = () => {
        if (ambientSoundRef.current) {
            ambientSoundRef.current.oscillator.stop();
        }

        const ambient = soundGeneratorRef.current?.generateSpaceAmbient();
        if (ambient) {
            ambientSoundRef.current = ambient;
            ambient.oscillator.start();
        }
    };

    const stopAmbientSound = () => {
        if (ambientSoundRef.current) {
            ambientSoundRef.current.oscillator.stop();
            ambientSoundRef.current = null;
        }
    };

    const handleVolumeChange = (type: 'master' | 'ambient', value: number) => {
        if (type === 'master') {
            setMasterVolume(value);
            soundGeneratorRef.current?.setMasterVolume(value);
        } else {
            setAmbientVolume(value);
            soundGeneratorRef.current?.setAmbientVolume(value);
        }
    };

    const playInteractionSound = () => {
        if (isEnabled) {
            soundGeneratorRef.current?.playClickSound();
        }
    };

    // Expose sound function globally for other components
    useEffect(() => {
        (window as any).playSound = playInteractionSound;
    }, [isEnabled]);

    return (
        <div className="fixed top-4 left-4 z-50">
            <div className="flex items-center gap-2">
                {/* Main Toggle */}
                <motion.button
                    onClick={() => setIsEnabled(!isEnabled)}
                    className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${isEnabled
                        ? 'bg-purple-500/20 border-purple-500/40 text-purple-200'
                        : 'bg-gray-800/50 border-gray-600/40 text-gray-400'
                        }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </motion.button>

                {/* Settings Toggle */}
                {isEnabled && (
                    <motion.button
                        onClick={() => setShowControls(!showControls)}
                        className="p-2 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-200 backdrop-blur-sm"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <Settings size={16} />
                    </motion.button>
                )}
            </div>

            {/* Volume Controls */}
            <AnimatePresence>
                {showControls && isEnabled && (
                    <motion.div
                        className="mt-3 p-4 bg-black/80 backdrop-blur-md rounded-xl border border-purple-500/30 min-w-48"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    >
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-purple-200 mb-1 block">Master Volume</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={masterVolume}
                                    onChange={(e) => handleVolumeChange('master', parseFloat(e.target.value))}
                                    className="w-full accent-purple-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-purple-200 mb-1 block">Ambient</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={ambientVolume}
                                    onChange={(e) => handleVolumeChange('ambient', parseFloat(e.target.value))}
                                    className="w-full accent-purple-500"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};