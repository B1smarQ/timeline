import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import { Howl } from 'howler';

interface AudioManagerProps {
    currentScene: 'welcome' | 'timeline' | 'reading' | 'ending';
    isReading: boolean;
    storyMood?: 'mysterious' | 'melancholic' | 'hopeful' | 'dramatic';
}

class AmbientSoundManager {
    private currentSound: Howl | null = null;
    private currentMood: string | null = null;
    private masterVolume: number = 0.3;
    private ambientVolume: number = 0.4;

    constructor() {
        // Initialize with default volumes
    }

    playMoodAmbient(mood: string) {
        // Check if we're already playing the correct mood
        if (this.currentSound && this.currentSound.playing() && this.currentMood === mood) {
            console.log(`Already playing ${mood} mood ambient, not restarting`);
            return;
        }

        // Stop current sound if switching moods
        this.stopCurrentSound();

        // Use mood-based ambient track
        const soundUrl = `/sounds/ambient/${mood}.mp3`;
        console.log(`Starting ${mood} mood ambient: ${soundUrl}`);

        this.currentMood = mood;
        this.currentSound = new Howl({
            src: [soundUrl],
            loop: true,
            volume: this.masterVolume * this.ambientVolume,
            autoplay: true,
            onload: () => console.log(`Successfully loaded ${mood} ambient: ${soundUrl}`),
            onloaderror: (_id, error) => {
                console.error(`Failed to load ${mood} ambient: ${soundUrl}`, error);
                // Try alternative names for this mood
                const alternatives = [
                    `/sounds/ambient/ambient-${mood}.mp3`,
                    `/sounds/ambient/${mood}-ambient.mp3`,
                    `/sounds/ambient/timeline-${mood}.mp3`, // Fallback to existing files
                    `/sounds/ambient/welcome-${mood}.mp3`,
                    `/sounds/ambient/reading-${mood}.mp3`
                ];

                this.tryAlternativeFiles(alternatives, 0, mood);
            },
            onplayerror: (_id, error) => {
                console.error(`Error playing ${mood} ambient: ${soundUrl}`, error);
            }
        });
    }

    private tryAlternativeFiles(alternatives: string[], index: number, mood: string) {
        if (index >= alternatives.length) {
            console.error(`Could not load any ${mood} ambient sound files`);
            return;
        }

        const soundUrl = alternatives[index];
        console.log(`Trying alternative ${mood} ambient file: ${soundUrl}`);

        this.currentSound = new Howl({
            src: [soundUrl],
            loop: true,
            volume: this.masterVolume * this.ambientVolume,
            autoplay: true,
            onload: () => console.log(`Successfully loaded alternative ${mood}: ${soundUrl}`),
            onloaderror: () => {
                console.warn(`Failed to load: ${soundUrl}`);
                this.tryAlternativeFiles(alternatives, index + 1, mood);
            }
        });
    }

    stopCurrentSound() {
        if (this.currentSound) {
            this.currentSound.stop();
            this.currentSound.unload();
            this.currentSound = null;
        }
        this.currentMood = null;
    }

    setMasterVolume(volume: number) {
        this.masterVolume = volume;
        if (this.currentSound) {
            this.currentSound.volume(this.masterVolume * this.ambientVolume);
        }
    }

    setAmbientVolume(volume: number) {
        this.ambientVolume = volume;
        if (this.currentSound) {
            this.currentSound.volume(this.masterVolume * this.ambientVolume);
        }
    }

    // Simple UI sound effects using Howler
    playUISound(type: 'click' | 'hover' | 'success') {
        console.log(`Would play UI sound: ${type}`);

        // Example of how you would load UI sound files:
        // const uiSound = new Howl({
        //     src: [`/sounds/ui/${type}.mp3`],
        //     volume: 0.3,
        //     onloaderror: () => console.warn(`Could not load UI sound: ${type}`)
        // });
        // uiSound.play();
    }
}

export const AudioManager: React.FC<AudioManagerProps> = ({
    currentScene,
    isReading,
    storyMood = 'mysterious'
}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [masterVolume, setMasterVolume] = useState(0.3);
    const [ambientVolume, setAmbientVolume] = useState(0.4);
    const soundManagerRef = useRef<AmbientSoundManager | null>(null);

    useEffect(() => {
        soundManagerRef.current = new AmbientSoundManager();
        return () => {
            soundManagerRef.current?.stopCurrentSound();
        };
    }, []);

    useEffect(() => {
        if (isEnabled && soundManagerRef.current) {
            soundManagerRef.current.playMoodAmbient(storyMood);
        } else {
            soundManagerRef.current?.stopCurrentSound();
        }
    }, [isEnabled, storyMood]); // Depend on isEnabled and storyMood, not scene

    // Log scene changes without interrupting audio
    useEffect(() => {
        if (isEnabled) {
            console.log(`Scene changed to: ${currentScene} - ${storyMood} mood audio continues`);
        }
    }, [currentScene, isEnabled]);

    const handleVolumeChange = (type: 'master' | 'ambient', value: number) => {
        if (type === 'master') {
            setMasterVolume(value);
            soundManagerRef.current?.setMasterVolume(value);
        } else {
            setAmbientVolume(value);
            soundManagerRef.current?.setAmbientVolume(value);
        }
    };

    const playInteractionSound = () => {
        if (isEnabled) {
            soundManagerRef.current?.playUISound('click');
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
                            {/* Scene Indicator */}
                            <div className="text-center mb-3">
                                <div className="text-xs text-purple-300 mb-1">Current Scene</div>
                                <div className="text-sm font-medium text-white capitalize">
                                    {currentScene} {isReading && '(Reading)'}
                                </div>
                                <div className="text-xs text-purple-400 capitalize">
                                    {storyMood} mood
                                </div>
                            </div>

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

                            {/* Test button */}
                            <button
                                onClick={() => {
                                    const moods = ['mysterious', 'melancholic', 'hopeful', 'dramatic'];
                                    const testFiles: string[] = [];

                                    // Test mood-based files
                                    moods.forEach(mood => {
                                        testFiles.push(`/sounds/ambient/${mood}.mp3`);
                                        testFiles.push(`/sounds/ambient/ambient-${mood}.mp3`);
                                        testFiles.push(`/sounds/ambient/timeline-${mood}.mp3`);
                                    });

                                    console.log('Testing mood-based ambient files...');
                                    testFiles.forEach(testUrl => {
                                        fetch(testUrl)
                                            .then(response => {
                                                if (response.ok) {
                                                    console.log(`✅ ${testUrl} - accessible`);
                                                } else {
                                                    console.log(`❌ ${testUrl} - not found`);
                                                }
                                            })
                                            .catch(error => {
                                                console.error(`❌ ${testUrl} - error:`, error);
                                            });
                                    });
                                }}
                                className="w-full text-xs bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 py-1 px-2 rounded transition-colors"
                            >
                                Test Mood Files
                            </button>

                            {/* Note about sound files */}
                            <div className="text-xs text-gray-400 mt-2 text-center">
                                Check console for file loading details
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};