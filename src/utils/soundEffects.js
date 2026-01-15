// Web Audio API Utility for Digital Insight Agent
// Generates sci-fi UI sounds programmatically to avoid external dependency issues.

// Singleton AudioContext
let audioCtx = null;

const getAudioContext = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
};

// 1. Glitch Sound (White Noise Burst)
export const playGlitchSound = (volume = 0.2) => {
    try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') ctx.resume();

        const bufferSize = ctx.sampleRate * 0.05; // 50ms (Shortened for punchiness)
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.8; // Normalized
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const gainNode = ctx.createGain();
        // Use consistent time scheduling
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

        // Lower filter to let more mid-range 'crunch' through
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 400; // Lowered from 1000Hz

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        noise.start();
    } catch (e) {
        console.warn('Audio play failed', e);
    }
};

// 2. Mechanical Click (Heavy Switch)
export const playClickSound = (volume = 0.5) => {
    try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') ctx.resume();

        // Use noise for a "physical" click texture
        const bufferSize = ctx.sampleRate * 0.05; // 50ms
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const gainNode = ctx.createGain();
        // Envelope: Instant attack, fast decay
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

        // Lowpass filter to make it sound "solid" rather than "hissy"
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, ctx.currentTime);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        noise.start();
    } catch (e) {
        console.warn('Audio play failed', e);
    }
};

// 3. Unlock/Success Sound (Futuristic Interface Beep)
export const playUnlockSound = (volume = 0.4) => {
    try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        // Sawtooth for a sharper, more "tech" sound
        osc.type = 'sawtooth';
        // High pitched "confirmation" tone logic
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * 0.5, ctx.currentTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

        // Highpass to remove muddiness
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 800;

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
        console.warn('Audio play failed', e);
    }
};
