// Procedural Web Audio Ambient Sound Generator & Audiobook Narrator

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isInitialized = false;

  // Gain nodes for ambient sounds
  private rainGain: GainNode | null = null;
  private fireGain: GainNode | null = null;
  private cafeGain: GainNode | null = null;
  private nightGain: GainNode | null = null;
  private vinylGain: GainNode | null = null;
  private chordsGain: GainNode | null = null;
  private masterGain: GainNode | null = null;

  // Active intervals
  private intervals: number[] = [];
  private rainBufferSource: AudioBufferSourceNode | null = null;
  private vinylBufferSource: AudioBufferSourceNode | null = null;

  // Speech synthesis for reading book chapters
  private synthUtterance: SpeechSynthesisUtterance | null = null;
  private activeText = '';
  private activeRate = 1.0;

  private initContext(): AudioContext {
    if (this.ctx) return this.ctx;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();
    return this.ctx;
  }

  public init() {
    if (this.isInitialized) return;
    const ctx = this.initContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Master Gain
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.85, ctx.currentTime);
    this.masterGain.connect(ctx.destination);

    // Chords / Mellow Piano Gain
    this.chordsGain = ctx.createGain();
    this.chordsGain.gain.setValueAtTime(0.12, ctx.currentTime);
    this.chordsGain.connect(this.masterGain);
    this.startChordsGenerator(ctx);

    // Rain Gain
    this.rainGain = ctx.createGain();
    this.rainGain.gain.setValueAtTime(0, ctx.currentTime);
    this.rainGain.connect(this.masterGain);
    this.startRainGenerator(ctx);

    // Fire Gain
    this.fireGain = ctx.createGain();
    this.fireGain.gain.setValueAtTime(0, ctx.currentTime);
    this.fireGain.connect(this.masterGain);
    this.startFireGenerator(ctx);

    // Cafe Murmur Gain
    this.cafeGain = ctx.createGain();
    this.cafeGain.gain.setValueAtTime(0, ctx.currentTime);
    this.cafeGain.connect(this.masterGain);
    this.startCafeGenerator(ctx);

    // Summer Night Gain
    this.nightGain = ctx.createGain();
    this.nightGain.gain.setValueAtTime(0, ctx.currentTime);
    this.nightGain.connect(this.masterGain);
    this.startNightGenerator(ctx);

    // Vinyl Gain
    this.vinylGain = ctx.createGain();
    this.vinylGain.gain.setValueAtTime(0, ctx.currentTime);
    this.vinylGain.connect(this.masterGain);
    this.startVinylGenerator(ctx);

    this.isInitialized = true;
  }

  // 1. Procedural Rain generator (Pink/Brown noise with resonant filters)
  private startRainGenerator(ctx: AudioContext) {
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
      b6 = white * 0.115926;
    }

    const rainSource = ctx.createBufferSource();
    rainSource.buffer = noiseBuffer;
    rainSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(850, ctx.currentTime);

    rainSource.connect(filter);
    if (this.rainGain) filter.connect(this.rainGain);
    rainSource.start();
    this.rainBufferSource = rainSource;
  }

  // 2. Procedural Fireplace Crackle generator
  private startFireGenerator(ctx: AudioContext) {
    if (!this.fireGain) return;

    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(45, ctx.currentTime);
    const rumbleGain = ctx.createGain();
    rumbleGain.gain.setValueAtTime(0.04, ctx.currentTime);
    osc.connect(rumbleGain);
    rumbleGain.connect(this.fireGain);
    osc.start();

    const crackleInterval = window.setInterval(() => {
      if (!this.fireGain || this.fireGain.gain.value < 0.01) return;
      if (Math.random() > 0.4) {
        const crackleOsc = ctx.createOscillator();
        const cGain = ctx.createGain();
        crackleOsc.type = 'square';
        crackleOsc.frequency.setValueAtTime(800 + Math.random() * 2600, ctx.currentTime);

        const crackleVol = (0.02 + Math.random() * 0.08) * this.fireGain.gain.value;
        cGain.gain.setValueAtTime(crackleVol, ctx.currentTime);
        cGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015 + Math.random() * 0.02);

        crackleOsc.connect(cGain);
        cGain.connect(this.fireGain);
        crackleOsc.start();
        crackleOsc.stop(ctx.currentTime + 0.04);
      }
    }, 110);

    this.intervals.push(crackleInterval);
  }

  // 3. Procedural Cafe Murmur generator
  private startCafeGenerator(ctx: AudioContext) {
    if (!this.cafeGain) return;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = 'sine';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(110, ctx.currentTime);
    osc2.frequency.setValueAtTime(145, ctx.currentTime);

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(320, ctx.currentTime);
    filter.Q.setValueAtTime(2.0, ctx.currentTime);

    const cafeBaseGain = ctx.createGain();
    cafeBaseGain.gain.setValueAtTime(0.03, ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(cafeBaseGain);
    cafeBaseGain.connect(this.cafeGain);

    osc1.start();
    osc2.start();
  }

  // 4. Procedural Summer Night Crickets & Breeze
  private startNightGenerator(ctx: AudioContext) {
    if (!this.nightGain) return;
    const cricketInterval = window.setInterval(() => {
      if (!this.nightGain || this.nightGain.gain.value < 0.01) return;
      if (Math.random() > 0.45) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(4400 + Math.random() * 300, ctx.currentTime);

        const vol = 0.025 * this.nightGain.gain.value;
        g.gain.setValueAtTime(vol, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

        osc.connect(g);
        g.connect(this.nightGain);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      }
    }, 240);

    this.intervals.push(cricketInterval);
  }

  // 5. Procedural Vinyl Lo-fi Hiss
  private startVinylGenerator(ctx: AudioContext) {
    const bufferSize = ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.015;
    }

    const vinylSource = ctx.createBufferSource();
    vinylSource.buffer = buffer;
    vinylSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2800, ctx.currentTime);

    vinylSource.connect(filter);
    if (this.vinylGain) filter.connect(this.vinylGain);
    vinylSource.start();
    this.vinylBufferSource = vinylSource;
  }

  // 6. Cozy Mellow Lo-Fi Electric Piano Chords (Gentle harmonic accompaniment)
  private startChordsGenerator(ctx: AudioContext) {
    // Lo-fi chord progression: Fmaj7 -> Em7 -> Dm7 -> Cmaj7
    const chords = [
      [174.61, 220.00, 261.63, 329.63], // Fmaj7 (F3, A3, C4, E4)
      [164.81, 196.00, 246.94, 293.66], // Em7   (E3, G3, B3, D4)
      [146.83, 174.61, 220.00, 261.63], // Dm7   (D3, F3, A3, C4)
      [130.81, 164.81, 196.00, 246.94], // Cmaj7 (C3, E3, G3, B3)
    ];

    let chordIdx = 0;

    const playChord = () => {
      if (!this.chordsGain || !this.ctx) return;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      currentChord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Soft, gentle decay like an electric Rhodes piano with tape saturation
        const noteGain = 0.035 / (i + 1);
        gain.gain.setValueAtTime(noteGain, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.8);

        osc.connect(gain);
        gain.connect(this.chordsGain!);

        osc.start(ctx.currentTime + i * 0.03); // slight strum delay
        osc.stop(ctx.currentTime + 4.0);
      });
    };

    // Play once right away, then every 4.2 seconds
    playChord();
    const chordInterval = window.setInterval(playChord, 4200);
    this.intervals.push(chordInterval);
  }

  public setAmbientVolume(type: 'rain' | 'fire' | 'cafe' | 'night' | 'vinyl', volume: number) {
    if (!this.isInitialized) this.init();
    const ctx = this.ctx;
    if (!ctx) return;

    const gainMap: Record<string, GainNode | null> = {
      rain: this.rainGain,
      fire: this.fireGain,
      cafe: this.cafeGain,
      night: this.nightGain,
      vinyl: this.vinylGain,
    };

    const targetGain = gainMap[type];
    if (targetGain) {
      targetGain.gain.linearRampToValueAtTime(Math.max(0, Math.min(volume, 1)), ctx.currentTime + 0.1);
    }
  }

  public setMasterVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(Math.max(0, Math.min(volume, 1)), this.ctx.currentTime + 0.05);
    }
  }

  public fadeOutMaster(durationSeconds = 30, onComplete?: () => void) {
    if (!this.masterGain || !this.ctx) return;
    const startTime = this.ctx.currentTime;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, startTime);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, startTime + durationSeconds);

    if (onComplete) {
      setTimeout(onComplete, durationSeconds * 1000);
    }
  }

  // Vietnamese Audiobook Speech Narration
  public speakChapter(text: string, rate = 1.0, onEnd?: () => void) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    this.activeText = text;
    this.activeRate = rate;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = Math.max(0.7, Math.min(rate, 2.0));
    utterance.pitch = 0.96; // slightly deeper, calm tone

    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VN') || v.name.toLowerCase().includes('vietnam'));
    if (viVoice) {
      utterance.voice = viVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
    }

    this.synthUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  public pauseNarration() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  }

  public resumeNarration() {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else if (this.activeText) {
        this.speakChapter(this.activeText, this.activeRate);
      }
    }
  }

  public stopNarration() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public destroy() {
    this.intervals.forEach(id => clearInterval(id));
    this.intervals = [];
    if (this.rainBufferSource) this.rainBufferSource.stop();
    if (this.vinylBufferSource) this.vinylBufferSource.stop();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (this.ctx && this.ctx.state !== 'closed') {
      this.ctx.close();
    }
    this.isInitialized = false;
  }
}

export const audioEngine = new AmbientAudioEngine();
