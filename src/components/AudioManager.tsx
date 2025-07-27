import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import { Howl } from 'howler';
import { useLocalization } from '../hooks/useLocalization';

interface AudioManagerProps {
    currentScene: 'welcome' | 'timeline' | 'reading' | 'ending' | 'credits';
    isReading: boolean;
    storyMood?: 'mysterious' | 'melancholic' | 'hopeful' | 'dramatic';
    isShowingCredits?: boolean; // Additional flag to detect when credits are active
}

class AmbientSoundManager {
    private static instance: AmbientSoundManager | null = null;
    private currentSound: Howl | null = null;
    private currentMood: string | null = null;
    private masterVolume: number = .5;
    private ambientVolume: number = 1.0;
    private pendingTimeout: NodeJS.Timeout | null = null;
    private isEnabled: boolean = true;

    private constructor() {
        // Initialize with default volumes
        console.log('🎛️ AmbientSoundManager singleton instance created');
    }

    static getInstance(): AmbientSoundManager {
        if (!AmbientSoundManager.instance) {
            AmbientSoundManager.instance = new AmbientSoundManager();
        } else {
            console.log('🎛️ Reusing existing AmbientSoundManager singleton instance');
        }
        return AmbientSoundManager.instance;
    }

    static destroyInstance(): void {
        if (AmbientSoundManager.instance) {
            console.log('🎛️ Destroying AmbientSoundManager singleton instance');
            AmbientSoundManager.instance.stopCurrentSound();
            AmbientSoundManager.instance = null;
        }

        // Nuclear option: stop all possible audio sources
        console.log('🚨 Stopping all audio sources globally');

        // Stop all HTML5 audio elements
        const audioElements = document.querySelectorAll('audio');
        audioElements.forEach((audio, index) => {
            console.log(`🔇 Stopping HTML5 audio element ${index}: ${audio.src}`);
            audio.pause();
            audio.currentTime = 0;
            audio.src = '';
            audio.remove();
        });

        // Try multiple approaches to stop Howler sounds
        // Try to stop all Howler instances using the correct API
        try {
            const howlerGlobal = (window as any).Howler;
            if (howlerGlobal && howlerGlobal._howls) {
                console.log(`🔇 Stopping ${howlerGlobal._howls.length} Howl instances from Howler._howls`);
                howlerGlobal._howls.forEach((sound: any, index: number) => {
                    if (sound) {
                        console.log(`🔇 Stopping Howl ${index}: ${sound._src}`);
                        sound.stop();
                        sound.unload();
                    }
                });
                // Clear the array
                howlerGlobal._howls = [];
            }
        } catch (error) {
            console.warn('Could not stop Howler instances:', error);
        }

        try {
            // Method 2: Try Howler global stop
            if ((window as any).Howler && (window as any).Howler.stop) {
                console.log('🔇 Using Howler.stop()');
                (window as any).Howler.stop();
            }
        } catch (error) {
            console.warn('Howler.stop() failed:', error);
        }
    }

    static hasInstance(): boolean {
        return AmbientSoundManager.instance !== null;
    }

    static listAllSounds(): void {
        console.log('🔍 Listing all audio sources:');

        // Try multiple ways to access Howler instances
        console.log('=== HOWLER INVESTIGATION ===');

        // Method 1: Check Howler global object
        try {
            const howlerGlobal = (window as any).Howler;
            if (howlerGlobal) {
                console.log('Howler global object found');
                console.log('Howler._howls:', howlerGlobal._howls);

                if (howlerGlobal._howls && howlerGlobal._howls.length > 0) {
                    console.log(`Found ${howlerGlobal._howls.length} Howl instances in Howler._howls:`);
                    howlerGlobal._howls.forEach((sound: any, index: number) => {
                        console.log(`Howl ${index}:`, {
                            src: sound._src,
                            playing: sound.playing(),
                            state: sound.state(),
                            volume: sound.volume(),
                            loop: sound.loop(),
                            id: sound._id
                        });
                    });
                } else {
                    console.log('No Howl instances found in Howler._howls');
                }
            }
        } catch (error) {
            console.warn('Could not access Howler global:', error);
        }

        // Method 2: Check old approach
        try {
            const pool = (Howl as any)._pool || [];
            console.log(`Total Howl instances in old pool approach: ${pool.length}`);
        } catch (error) {
            console.warn('Could not access Howler internal pool:', error);
        }

        // Check HTML5 audio elements
        const audioElements = document.querySelectorAll('audio');
        console.log(`HTML5 audio elements found: ${audioElements.length}`);
        audioElements.forEach((audio, index) => {
            console.log(`Audio ${index}: src=${audio.src}, paused=${audio.paused}, currentTime=${audio.currentTime}`);
            if (!audio.paused) {
                console.log(`🎵 PLAYING: Audio element ${index} is currently playing!`);
            }
        });

        // Check Web Audio API contexts
        try {
            const contexts = (window as any).webkitAudioContext || (window as any).AudioContext;
            console.log('Web Audio API contexts available:', !!contexts);
        } catch (error) {
            console.warn('Could not check Web Audio API:', error);
        }

        // Check for any global audio variables
        console.log('Checking global audio variables...');
        const globalKeys = Object.keys(window).filter(key =>
            key.toLowerCase().includes('audio') ||
            key.toLowerCase().includes('sound') ||
            key.toLowerCase().includes('howl')
        );
        console.log('Global audio-related variables:', globalKeys);
    }

    playMoodAmbient(mood: string) {
        // Don't start any sound if disabled
        if (!this.isEnabled) {
            console.log(`🔇 Audio disabled, not starting ${mood} mood`);
            return;
        }

        // Check if we're already playing the correct mood
        if (this.currentSound && this.currentMood === mood) {
            // Double-check that it's actually playing
            if (this.currentSound.playing()) {
                console.log(`✅ Already playing ${mood} mood ambient, not restarting`);
                return;
            } else {
                console.log(`🔄 ${mood} mood was set but not playing, restarting...`);
            }
        }

        // Clear any pending timeout
        if (this.pendingTimeout) {
            clearTimeout(this.pendingTimeout);
            this.pendingTimeout = null;
        }

        // Always stop current sound when switching moods or starting new one
        if (this.currentSound) {
            console.log(`🔄 Stopping current sound (${this.currentMood}) to switch to ${mood}`);
            this.stopCurrentSound();

            // Small delay to ensure cleanup is complete, but only if still enabled
            this.pendingTimeout = setTimeout(() => {
                if (this.isEnabled) {
                    this.startMoodSound(mood);
                }
                this.pendingTimeout = null;
            }, 100);
            return;
        }

        this.startMoodSound(mood);
    }

    private startMoodSound(mood: string) {
        // Double-check that audio is still enabled before starting
        if (!this.isEnabled) {
            console.log(`🔇 Audio was disabled before starting ${mood}, aborting`);
            return;
        }

        // Check if there are already sounds playing this mood to prevent duplicates
        try {
            const howlerGlobal = (window as any).Howler;
            if (howlerGlobal && howlerGlobal._howls) {
                const existingSounds = howlerGlobal._howls.filter((sound: any) =>
                    sound._src && sound._src.includes(`${mood}.mp3`) && sound.playing()
                );
                if (existingSounds.length > 0) {
                    console.log(`⚠️ Found ${existingSounds.length} existing ${mood} sounds already playing, stopping them first`);
                    existingSounds.forEach((sound: any) => {
                        console.log(`🔇 Stopping duplicate sound: ${sound._src}`);
                        sound.stop();
                        sound.unload();
                    });
                }
            }
        } catch (error) {
            console.warn('Could not check for duplicate sounds:', error);
        }

        // Use mood-based ambient track with correct base path for GitHub Pages
        const basePath = import.meta.env.BASE_URL || '/';
        const soundUrl = `${basePath}sounds/ambient/ambient-${mood}.mp3`;
        console.log(`🎵 Starting ${mood} mood ambient: ${soundUrl}`);

        this.currentMood = mood;
        this.currentSound = new Howl({
            src: [soundUrl],
            loop: true,
            volume: this.masterVolume * this.ambientVolume,
            autoplay: true,
            onload: () => {
                console.log(`✅ Successfully loaded ${mood} ambient: ${soundUrl}`);
            },
            onloaderror: (_id, error) => {
                console.error(`Failed to load ${mood} ambient: ${soundUrl}`, error);
                // Try alternative names for this mood
                const basePath = import.meta.env.BASE_URL || '/';
                const alternatives = [
                    `${basePath}sounds/ambient/welcome-${mood}.mp3`, // These files exist
                    `${basePath}sounds/ambient/${mood}.mp3`,
                    `${basePath}sounds/ambient/${mood}-ambient.mp3`,
                    `${basePath}sounds/ambient/timeline-${mood}.mp3`,
                    `${basePath}sounds/ambient/reading-${mood}.mp3`
                ];

                console.log(`🔍 Trying alternative files for ${mood}:`, alternatives);
                this.tryAlternativeFiles(alternatives, 0, mood);
            },
            onplayerror: (_id, error) => {
                console.error(`Error playing ${mood} ambient: ${soundUrl}`, error);
            }
        });
    }

    private tryAlternativeFiles(alternatives: string[], index: number, mood: string) {
        // Don't try alternatives if audio is disabled
        if (!this.isEnabled) {
            console.log(`🔇 Audio disabled, not trying alternative files for ${mood}`);
            return;
        }

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
            onload: () => {
                console.log(`✅ Successfully loaded alternative ${mood}: ${soundUrl}`);
            },
            onloaderror: () => {
                console.warn(`Failed to load: ${soundUrl}`);
                // Check if still enabled before trying next alternative
                if (this.isEnabled) {
                    this.tryAlternativeFiles(alternatives, index + 1, mood);
                }
            }
        });
    }

    stopCurrentSound() {
        // Clear any pending timeout
        if (this.pendingTimeout) {
            clearTimeout(this.pendingTimeout);
            this.pendingTimeout = null;
        }

        if (this.currentSound) {
            console.log(`🔇 Stopping current sound: ${this.currentMood}`);
            console.log(`🔇 Sound instance ID: ${(this.currentSound as any)._id || 'unknown'}`);
            this.currentSound.stop();
            this.currentSound.unload();
            this.currentSound = null;
        }
        this.currentMood = null;
        console.log('🔇 Current sound cleared from singleton');
    }

    setEnabled(enabled: boolean) {
        console.log(`🎛️ AmbientSoundManager.setEnabled(${enabled})`);
        this.isEnabled = enabled;
        if (!enabled) {
            this.stopCurrentSound();
        }
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

    // Play ending/credits music
    playEndingMusic() {
        console.log(`🎵 playEndingMusic called:`, {
            isEnabled: this.isEnabled,
            currentMood: this.currentMood,
            hasCurrentSound: !!this.currentSound,
            isCurrentSoundPlaying: this.currentSound?.playing()
        });

        // Don't start any sound if disabled
        if (!this.isEnabled) {
            console.log(`🔇 Audio disabled, not starting ending music`);
            return;
        }

        // Check if we're already playing ending music
        if (this.currentSound && this.currentMood === 'ending') {
            if (this.currentSound.playing()) {
                console.log(`✅ Already playing ending music, not restarting`);
                return;
            } else {
                console.log(`🔄 Ending music was set but not playing, restarting...`);
            }
        }

        // Always stop current sound before starting ending music
        console.log(`🔄 Stopping current sound to switch to ending music`);
        this.stopCurrentSound();

        // Also try to stop any other sounds that might be playing
        try {
            const howlerGlobal = (window as any).Howler;
            if (howlerGlobal && howlerGlobal._howls) {
                console.log(`🔍 Found ${howlerGlobal._howls.length} total Howl instances`);
                howlerGlobal._howls.forEach((sound: any, index: number) => {
                    if (sound.playing()) {
                        console.log(`🔇 Stopping playing sound ${index}: ${sound._src}`);
                        sound.stop();
                        sound.unload();
                    }
                });
            }
        } catch (error) {
            console.warn('Could not check/stop global sounds:', error);
        }

        // Small delay to ensure cleanup is complete
        this.pendingTimeout = setTimeout(() => {
            if (this.isEnabled) {
                this.startEndingMusic();
            }
            this.pendingTimeout = null;
        }, 300); // Increased delay to ensure cleanup
    }

    private startEndingMusic() {
        // Double-check that audio is still enabled before starting
        if (!this.isEnabled) {
            console.log(`🔇 Audio was disabled before starting ending music, aborting`);
            return;
        }

        // Use ending music track with correct base path for GitHub Pages
        const basePath = import.meta.env.BASE_URL || '/';
        const soundUrl = `${basePath}sounds/music/ending.mp3`;
        console.log(`🎵 Starting ending music: ${soundUrl}`);

        this.currentMood = 'ending';
        this.currentSound = new Howl({
            src: [soundUrl],
            loop: true,
            volume: this.masterVolume * this.ambientVolume,
            autoplay: true,
            onload: () => {
                console.log(`✅ Successfully loaded ending music: ${soundUrl}`);
            },
            onloaderror: (_id, error) => {
                console.error(`Failed to load ending music: ${soundUrl}`, error);
                // Try alternative names for ending music
                const basePath = import.meta.env.BASE_URL || '/';
                const alternatives = [
                    `${basePath}sounds/music/credits.mp3`,
                    `${basePath}sounds/ambient/ending.mp3`,
                    `${basePath}sounds/music/finale.mp3`,
                    `${basePath}sounds/ambient/credits.mp3`
                ];

                console.log(`🔍 Trying alternative ending music files:`, alternatives);
                this.tryAlternativeFiles(alternatives, 0, 'ending');
            },
            onplayerror: (_id, error) => {
                console.error(`Error playing ending music: ${soundUrl}`, error);
            }
        });
    }

    // Simple UI sound effects using Howler
    playUISound(type: 'click' | 'hover' | 'success') {
        console.log(`Would play UI sound: ${type}`);

        // Example of how you would load UI sound files:
        // const basePath = import.meta.env.BASE_URL || '/';
        // const uiSound = new Howl({
        //     src: [`${basePath}sounds/ui/${type}.mp3`],
        //     volume: 0.3,
        //     onloaderror: () => console.warn(`Could not load UI sound: ${type}`)
        // });
        // uiSound.play();
    }
}

export const AudioManager: React.FC<AudioManagerProps> = ({
    currentScene,
    isReading,
    storyMood = 'mysterious',
    isShowingCredits = false
}) => {
    const { t } = useLocalization();
    const [isEnabled, setIsEnabled] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const [masterVolume, setMasterVolume] = useState(.5);
    const [ambientVolume, setAmbientVolume] = useState(1.0);
    const soundManagerRef = useRef<AmbientSoundManager | null>(null);

    useEffect(() => {
        console.log('🎛️ AudioManager component mounting');
        soundManagerRef.current = AmbientSoundManager.getInstance();

        // In development with StrictMode, this effect runs twice
        // The singleton pattern ensures we only have one instance
        console.log(`🎛️ Using singleton instance, hasInstance: ${AmbientSoundManager.hasInstance()}`);

        return () => {
            console.log('🎛️ AudioManager component unmounting');
            // Don't destroy the singleton on unmount in StrictMode
            // Just stop current sound to prevent overlaps
            soundManagerRef.current?.stopCurrentSound();
        };
    }, []);

    useEffect(() => {
        console.log(`🎛️ AudioManager useEffect triggered:`, {
            isEnabled,
            currentScene,
            storyMood,
            isShowingCredits,
            hasManager: !!soundManagerRef.current
        });

        if (soundManagerRef.current) {
            soundManagerRef.current.setEnabled(isEnabled);

            if (isEnabled) {
                if (currentScene === 'ending' || currentScene === 'credits' || isShowingCredits) {
                    console.log(`🎛️ Audio Manager: Switching to ending music for scene ${currentScene} (credits: ${isShowingCredits})`);
                    soundManagerRef.current.playEndingMusic();
                } else {
                    console.log(`🎛️ Audio Manager: Switching to ${storyMood} mood for scene ${currentScene}`);
                    soundManagerRef.current.playMoodAmbient(storyMood);
                }
            } else {
                console.log(`🔇 Audio Manager: Stopping all sounds (enabled: ${isEnabled})`);
                soundManagerRef.current.stopCurrentSound();
            }
        }
    }, [isEnabled, storyMood, currentScene, isShowingCredits]); // Now depend on isShowingCredits too

    // Log scene changes and handle audio accordingly
    useEffect(() => {
        if (isEnabled) {
            if (currentScene === 'ending' || currentScene === 'credits' || isShowingCredits) {
                console.log(`Scene changed to: ${currentScene} (credits: ${isShowingCredits}) - ending music will play`);
            } else {
                console.log(`Scene changed to: ${currentScene} - ${storyMood} mood audio continues`);
            }
        }
    }, [currentScene, isEnabled, storyMood, isShowingCredits]);

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
                                <div className="text-xs text-purple-300 mb-1">{t.audio.currentScene}</div>
                                <div className="text-sm font-medium text-white capitalize">
                                    {currentScene} {isReading && '(Reading)'}
                                </div>
                                <div className="text-xs text-purple-400 capitalize">
                                    {storyMood} mood
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-purple-200 mb-1 block">{t.audio.masterVolume}</label>
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
                                <label className="text-xs text-purple-200 mb-1 block">{t.audio.ambientVolume}</label>
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
                                    const basePath = import.meta.env.BASE_URL || '/';
                                    moods.forEach(mood => {
                                        testFiles.push(`${basePath}sounds/ambient/${mood}.mp3`);
                                        testFiles.push(`${basePath}sounds/ambient/ambient-${mood}.mp3`);
                                        testFiles.push(`${basePath}sounds/ambient/timeline-${mood}.mp3`);
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
                                className="w-full text-xs bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 py-1 px-2 rounded transition-colors mb-2"
                            >
                                {t.audio.testMoodFiles}
                            </button>

                            {/* List all sounds button */}
                            <button
                                onClick={() => {
                                    AmbientSoundManager.listAllSounds();
                                }}
                                className="w-full text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-200 py-1 px-2 rounded transition-colors mb-2"
                            >
                                {t.audio.listAllSounds}
                            </button>

                            {/* Force reload page button */}
                            <button
                                onClick={() => {
                                    console.log('🔄 Force reloading page to clear all audio');
                                    window.location.reload();
                                }}
                                className="w-full text-xs bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-200 py-1 px-2 rounded transition-colors mb-2"
                            >
                                {t.audio.forceReload}
                            </button>

                            {/* Emergency stop button */}
                            <button
                                onClick={() => {
                                    console.log('🚨 Emergency stop - destroying singleton and stopping all sounds');
                                    console.log(`Singleton exists: ${AmbientSoundManager.hasInstance()}`);
                                    AmbientSoundManager.listAllSounds();
                                    AmbientSoundManager.destroyInstance();
                                    soundManagerRef.current = null;

                                    // Recreate the singleton after a brief delay and restart audio
                                    setTimeout(() => {
                                        console.log('🔄 Recreating singleton after emergency stop');
                                        soundManagerRef.current = AmbientSoundManager.getInstance();

                                        // Restart audio if enabled
                                        if (isEnabled && soundManagerRef.current) {
                                            console.log('🔄 Restarting audio after emergency stop');
                                            soundManagerRef.current.setEnabled(true);
                                            soundManagerRef.current.playMoodAmbient(storyMood);
                                        }
                                    }, 500);
                                }}
                                className="w-full text-xs bg-red-600/20 hover:bg-red-600/30 text-red-200 py-1 px-2 rounded transition-colors"
                            >
                                {t.audio.emergencyStop}
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