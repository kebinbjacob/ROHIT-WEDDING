// Web Audio API Synthesizer for Traditional Indian Temple Flute & Tanpura Drone
// Provides an authentic, zero-latency, zero-dependency auspicious wedding soundtrack.

class TempleFluteEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private tanpuraOscs: OscillatorNode[] = [];
  private melodyTimer: number | null = null;
  private volume = 0.65;
  private subscribers: Array<(playing: boolean) => void> = [];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Subscribe to play/pause status
  public onStateChange(cb: (playing: boolean) => void) {
    this.subscribers.push(cb);
    cb(this.isPlaying);
    return () => {
      this.subscribers = this.subscribers.filter(fn => fn !== cb);
    };
  }

  private notify() {
    this.subscribers.forEach(cb => cb(this.isPlaying));
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public async start() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.isPlaying) return;
    this.isPlaying = true;
    this.notify();

    // 1. Start Tanpura Drone (Sa, Pa, Sa', Sa_low)
    // C#3 = 138.59 Hz, G#3 = 207.65 Hz, C#4 = 277.18 Hz
    const baseFreq = 138.59;
    const tanpuraFreqs = [baseFreq, baseFreq * 1.5, baseFreq * 2, baseFreq * 0.5];

    this.tanpuraOscs = tanpuraFreqs.map((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.2, this.ctx!.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450 + idx * 80, this.ctx!.currentTime);

      // Subtle breathing amplitude modulation (tremolo)
      gain.gain.setValueAtTime(0.04, this.ctx!.currentTime);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      return osc;
    });

    // 2. Play Melodic Flute Phrases (Raga Mohanam / Bhupali: Sa, Ri2, Ga3, Pa, Dha2)
    // Auspicious South Indian Wedding scale
    const root = 277.18; // C#4
    const scale = [
      root,             // Sa
      root * (9 / 8),   // Ri2
      root * (5 / 4),   // Ga3
      root * (3 / 2),   // Pa
      root * (5 / 3),   // Dha2
      root * 2,         // Sa'
      root * 2 * (9/8), // Ri2'
      root * 2 * (5/4), // Ga3'
    ];

    // Melodic phrases resembling temple mangalya flute
    const melodyPattern = [
      0, 1, 2, 3, 2, 1, 0,
      2, 3, 4, 5, 4, 3, 2,
      4, 5, 6, 7, 6, 5, 4, 3,
      5, 4, 3, 2, 3, 2, 1, 0,
      0, 2, 4, 5, 3, 2, 0, 0
    ];

    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const freq = scale[melodyPattern[noteIdx % melodyPattern.length]];
      const duration = (noteIdx % 7 === 6 || noteIdx % 7 === 0) ? 1.6 : 0.85;

      this.synthesizeFluteNote(freq, duration);

      noteIdx++;
      const nextDelay = duration * 850;
      this.melodyTimer = window.setTimeout(playNextNote, nextDelay);
    };

    playNextNote();
  }

  private synthesizeFluteNote(freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Main flute tone
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm overtone
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Vibrato LFO
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(5.2, now); // 5.2 Hz Indian flute vibrato
    lfoGain.gain.setValueAtTime(3.5, now);
    lfo.connect(osc.frequency);
    lfo.connect(osc2.frequency);
    lfo.start(now);

    // Filter to soften harmonics like bamboo
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    // Articulation Envelope
    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.22, now + 0.15); // Smooth bamboo attack
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Breath noise generator
    const bufferSize = this.ctx.sampleRate * 0.05;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1200, now);
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.02, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    whiteNoise.start(now);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    osc2.start(now);

    osc.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
    lfo.stop(now + duration + 0.1);
  }

  public stop() {
    this.isPlaying = false;
    this.notify();

    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }

    this.tanpuraOscs.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    });
    this.tanpuraOscs = [];
  }

  public toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  public isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }
}

export const templeAudio = new TempleFluteEngine();
