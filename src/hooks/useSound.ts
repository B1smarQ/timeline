import { useCallback } from 'react';

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

    playClick() {
        if (!this.audioContext || !this.effectsGain) return;

        const oscillator = this.createOscillator(800);
        const gain = this.createGain(0.1);

        if (!oscillator || !gain) return;

        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        oscillator.connect(gain);
        gain.connect(this.effectsGain);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    playHover() {
        if (!this.audioContext || !this.effectsGain) return;

        const oscillator = this.createOscillator(600);
        const gain = this.createGain(0.05);

        if (!oscillator || !gain) return;

        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

        oscillator.connect(gain);
        gain.connect(this.effectsGain);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.05);
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
            gain.connect(this.effectsGain);

            oscillator.start(this.audioContext!.currentTime + delay);
            oscillator.stop(this.audioContext!.currentTime + delay + 0.5);
        });
    }

    playUnlock() {
        if (!this.audioContext || !this.effectsGain) return;

        // Ascending magical sound
        const oscillator = this.createOscillator(200);
        const gain = this.createGain(0.1);

        if (!oscillator || !gain) return;

        oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.3);
        gain.gain.linearRampToValueAtTime(0.15, this.audioContext.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);

        oscillator.connect(gain);
        gain.connect(this.effectsGain);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.4);
    }

    playPageTurn() {
        if (!this.audioContext || !this.effectsGain) return;

        // Soft whoosh sound
        const noise = this.audioContext.createBufferSource();
        const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.3, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < data.length; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.1 * Math.exp(-i / (this.audioContext.sampleRate * 0.1));
        }

        noise.buffer = buffer;
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1000, this.audioContext.currentTime);

        const gain = this.createGain(0.3);
        if (!gain) return;

        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.effectsGain);

        noise.start();
        noise.stop(this.audioContext.currentTime + 0.3);
    }

    playTypewriter() {
        if (!this.audioContext || !this.effectsGain) return;

        const oscillator = this.createOscillator(150, 'square');
        const gain = this.createGain(0.03);

        if (!oscillator || !gain) return;

        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

        oscillator.connect(gain);
        gain.connect(this.effectsGain);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }

    playWhoosh() {
        if (!this.audioContext || !this.effectsGain) return;

        const oscillator = this.createOscillator(100);
        const gain = this.createGain(0.1);

        if (!oscillator || !gain) return;

        oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

        oscillator.connect(gain);
        gain.connect(this.effectsGain);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.2);
    }

    playChime() {
        if (!this.audioContext || !this.effectsGain) return;

        const oscillator = this.createOscillator(1000);
        const gain = this.createGain(0.1);

        if (!oscillator || !gain) return;

        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1);

        oscillator.connect(gain);
        gain.connect(this.effectsGain);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 1);
    }
}

let soundEffectsInstance: SoundEffects | null = null;

export const useSound = () => {
    const playSound = useCallback((effect: SoundEffect) => {
        if (!soundEffectsInstance) {
            soundEffectsInstance = new SoundEffects();
        }

        switch (effect) {
            case 'click':
                soundEffectsInstance.playClick();
                break;
            case 'hover':
                soundEffectsInstance.playHover();
                break;
            case 'success':
                soundEffectsInstance.playSuccess();
                break;
            case 'unlock':
                soundEffectsInstance.playUnlock();
                break;
            case 'page-turn':
                soundEffectsInstance.playPageTurn();
                break;
            case 'typewriter':
                soundEffectsInstance.playTypewriter();
                break;
            case 'whoosh':
                soundEffectsInstance.playWhoosh();
                break;
            case 'chime':
                soundEffectsInstance.playChime();
                break;
        }
    }, []);

    return { playSound };
};