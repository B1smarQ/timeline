import { useCallback, useRef } from 'react';

// Sound effect types
export type SoundEffect =
    | 'click'
    | 'hover'
    | 'success'
    | 'unlock'
    | 'page-turn'
    | 'typewriter'
    | 'whoosh'
    | 'chime';

// Web Audio API based sound effects
class SoundEffects {
    private audioContext: AudioContext | null = null;
    private effectsGain: GainNode | null = null;

    constructor() {
        this.initAudio();
    }

    private async initAudio() {
        try {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.effectsGain = this.audioContext.createGain();
            this.effectsGain.connect(this.audioContext.destination);
            this.effectsGain.gain.value = 0.3;
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
        }
    }

    private createOscillator(frequency: number, type: OscillatorType = 'sine') {
        if (!this.audioContext) return null;
        const oscillator = this.audioContext.createOscillator();
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        return oscillator;
    }

    private createGain(initialValue: number = 0.1) {
        if (!this.audioContext) return null;
        const gain = this.audioContext.createGain();
        gain.gain.setValueAtTime(initialValue, this.audioContext.currentTime);
        return gain;
    }

    private connectAndPlay(oscillator: OscillatorNode, gain: GainNode, duration: number) {
        if (!this.audioContext || !this.effectsGain) return;

        oscillator.connect(gain);
        gain.connect(this.effectsGain);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    playClick() {
        if (!this.audioContext || !this.effectsGain) return;

        const oscillator = this.createOscillator(800);
        const gain = this.createGain(0.1);

        if (!oscillator || !gain) return;

        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        this.connectAndPlay(oscillator, gain, 0.1);
    }

    playHover() {
        if (!this.audioContext || !this.effectsGain) return;

        const oscillator = this.createOscillator(600);
        const gain = this.createGain(0.05);

        if (!oscillator || !gain) return;

        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

        this.connectAndPlay(oscillator, gain, 0.05);
    }

    playSuccess() {
        if (!this.audioContext || !this.effectsGain) return;

        // Play a pleasant chord progression
        const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5

        frequencies.forEach((freq, index) => {
            const oscillator = this.createOscillator(freq);
            const gain = this.createGain(0.08);

            if (!oscillator || !gain) return;

            const delay = index * 0.1;
            gain.gain.setValueAtTime(0, this.audioContext!.currentTime + delay);
            gain.gain.linearRampToValueAtTime(0.08, this.audioContext!.currentTime + delay + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext!.currentTime + delay + 0.5);

            oscillator.connect(gain);
            if (this.effectsGain) {
                gain.connect(this.effectsGain);
            }

            oscillator.start(this.audioContext!.currentTime + delay);
            oscillator.stop(this.audioContext!.currentTime + delay + 0.5);
        });
    }

    playUnlock() {
        if (!this.audioContext || !this.effectsGain) return;

        const oscillator = this.createOscillator(440);
        const gain = this.createGain(0.1);

        if (!oscillator || !gain) return;

        oscillator.frequency.exponentialRampToValueAtTime(880, this.audioContext.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

        this.connectAndPlay(oscillator, gain, 0.3);
    }

    playPageTurn() {
        if (!this.audioContext || !this.effectsGain) return;

        const oscillator = this.createOscillator(200, 'sawtooth');
        const gain = this.createGain(0.05);

        if (!oscillator || !gain) return;

        oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

        this.connectAndPlay(oscillator, gain, 0.2);
    }

    playTypewriter() {
        if (!this.audioContext || !this.effectsGain) return;

        const oscillator = this.createOscillator(1200, 'square');
        const gain = this.createGain(0.03);

        if (!oscillator || !gain) return;

        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

        this.connectAndPlay(oscillator, gain, 0.05);
    }

    playWhoosh() {
        if (!this.audioContext || !this.effectsGain) return;

        const oscillator = this.createOscillator(300, 'sawtooth');
        const gain = this.createGain(0.08);

        if (!oscillator || !gain) return;

        oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);

        this.connectAndPlay(oscillator, gain, 0.4);
    }

    playChime() {
        if (!this.audioContext || !this.effectsGain) return;

        const oscillator = this.createOscillator(1047, 'sine');
        const gain = this.createGain(0.1);

        if (!oscillator || !gain) return;

        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1.0);

        this.connectAndPlay(oscillator, gain, 1.0);
    }

    play(effect: SoundEffect) {
        switch (effect) {
            case 'click':
                this.playClick();
                break;
            case 'hover':
                this.playHover();
                break;
            case 'success':
                this.playSuccess();
                break;
            case 'unlock':
                this.playUnlock();
                break;
            case 'page-turn':
                this.playPageTurn();
                break;
            case 'typewriter':
                this.playTypewriter();
                break;
            case 'whoosh':
                this.playWhoosh();
                break;
            case 'chime':
                this.playChime();
                break;
        }
    }
}

// Create a singleton instance
const soundEffects = new SoundEffects();

// Hook for using sound effects
export const useSound = () => {
    const soundEffectsRef = useRef(soundEffects);

    const playSound = useCallback((effect: SoundEffect) => {
        soundEffectsRef.current.play(effect);
    }, []);

    return { playSound };
};