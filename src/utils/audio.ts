// Audio System using Web Audio API (Synthesized in-browser sounds)
let audioCtx: AudioContext | null = null;
let ambientOsc: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;
let isSoundEnabled = false;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
};

export const setSoundEnabled = (enabled: boolean) => {
  isSoundEnabled = enabled;
  if (typeof window === "undefined") return;

  if (enabled) {
    try {
      initAudio();
      startAmbientHum();
    } catch (e) {
      console.warn("AudioContext failed to initialize:", e);
    }
  } else {
    stopAmbientHum();
  }
};

export const playClickSound = () => {
  if (!isSoundEnabled || !audioCtx) return;
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } catch (e) {
    // Ignore context errors
  }
};

export const playHoverSound = () => {
  if (!isSoundEnabled || !audioCtx) return;
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    // Ignore
  }
};

export const playSuccessSound = () => {
  if (!isSoundEnabled || !audioCtx) return;
  try {
    initAudio();
    const now = audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio

    notes.forEach((freq, index) => {
      const osc = audioCtx!.createOscillator();
      const gain = audioCtx!.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gain.gain.setValueAtTime(0.0, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.05, now + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(audioCtx!.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.25);
    });
  } catch (e) {
    // Ignore
  }
};

export const playStartupSound = () => {
  if (!isSoundEnabled || !audioCtx) return;
  try {
    initAudio();
    const now = audioCtx.currentTime;
    const freqs = [150, 300, 600, 1200];
    freqs.forEach((freq, index) => {
      const osc = audioCtx!.createOscillator();
      const gain = audioCtx!.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.6);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      // Low pass filter to make it warmer
      const filter = audioCtx!.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1000, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx!.destination);

      osc.start(now);
      osc.stop(now + 0.6);
    });
  } catch (e) {
    // Ignore
  }
};

export const playLoadingTick = () => {
  if (!isSoundEnabled || !audioCtx) return;
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(1800, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(0.004, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.015);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.015);
  } catch (e) {
    // Ignore
  }
};

export const playFizzySound = (isOpening = true) => {
  if (!isSoundEnabled || !audioCtx) return;
  try {
    initAudio();
    const now = audioCtx.currentTime;
    const duration = 0.35;
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate white noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "highpass";
    
    if (isOpening) {
      filter.frequency.setValueAtTime(1500, now);
      filter.frequency.exponentialRampToValueAtTime(7500, now + duration);
    } else {
      filter.frequency.setValueAtTime(7500, now);
      filter.frequency.exponentialRampToValueAtTime(1500, now + duration);
    }

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    noise.start(now);
    noise.stop(now + duration);
  } catch (e) {
    // Ignore
  }
};

const startAmbientHum = () => {
  if (!audioCtx || ambientOsc) return;
  try {
    ambientOsc = audioCtx.createOscillator();
    ambientGain = audioCtx.createGain();

    // Custom deep hum node
    ambientOsc.type = "sine";
    ambientOsc.frequency.setValueAtTime(55, audioCtx.currentTime); // Low A hum

    ambientGain.gain.setValueAtTime(0.03, audioCtx.currentTime);

    // Apply lowpass filter
    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(100, audioCtx.currentTime);

    ambientOsc.connect(filter);
    filter.connect(ambientGain);
    ambientGain.connect(audioCtx.destination);

    ambientOsc.start();
  } catch (e) {
    // Ignore
  }
};

const stopAmbientHum = () => {
  if (ambientOsc) {
    try {
      ambientOsc.stop();
      ambientOsc.disconnect();
    } catch (e) {
      // Ignore
    }
    ambientOsc = null;
  }
  if (ambientGain) {
    try {
      ambientGain.disconnect();
    } catch (e) {
      // Ignore
    }
    ambientGain = null;
  }
};
