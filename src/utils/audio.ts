/**
 * Procedural Web Audio Ambient Synth
 * Synthesizes a warm, soft, non-intrusive lo-fi ambient pad progression.
 * Works entirely offline and uses no external assets.
 */

class AmbientSynth {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private timer: number | null = null;
  private activeNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
  private masterGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayGain: GainNode | null = null;

  // Deep, warm lofi chord progression notes (Hz)
  // Progression: DbMaj7 -> Fm7 -> Bbm7 -> AbMaj7 (cozy, warm, respectful mood)
  private chords = [
    [130.81, 164.81, 196.00, 246.94], // Cmaj7 (C3, E3, G3, B3)
    [138.59, 174.61, 207.65, 261.63], // DbMaj7 (Db3, F3, Ab3, C4)
    [116.54, 146.83, 174.61, 220.00], // Bbm7 (Bb2, D3, F3, A3)
    [104.82, 130.81, 155.56, 196.00], // AbMaj7 (Ab2, C3, Eb3, G3)
  ];

  private currentChordIndex = 0;

  start() {
    if (this.isRunning) return;

    try {
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.isRunning = true;

      // Master output filter (very warm, filtered high frequencies to sound like lo-fi tape)
      const biquadFilter = this.ctx.createBiquadFilter();
      biquadFilter.type = 'lowpass';
      biquadFilter.frequency.setValueAtTime(320, this.ctx.currentTime); // Low frequency filter for warmth

      // Master gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime); // Soft, background volume

      // Soft feedback delay for spacey ambiance
      this.delayNode = this.ctx.createDelay(1.5);
      this.delayNode.delayTime.setValueAtTime(0.8, this.ctx.currentTime);
      
      this.delayGain = this.ctx.createGain();
      this.delayGain.gain.setValueAtTime(0.4, this.ctx.currentTime); // 40% feedback

      // Connect delay loop
      this.delayNode.connect(this.delayGain);
      this.delayGain.connect(this.delayNode);

      // Connect components
      biquadFilter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
      this.delayNode.connect(this.masterGain); // Feed delay back to master

      // Start the chord loop
      this.playChordSequence();
    } catch (e) {
      console.error('Failed to initialize Web Audio API ambient synth:', e);
    }
  }

  stop() {
    this.isRunning = false;
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
    this.fadeOutAndStopActiveNodes();
    if (this.ctx && this.ctx.state !== 'closed') {
      this.ctx.close();
    }
    this.ctx = null;
  }

  toggle() {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  getActiveState(): boolean {
    return this.isRunning;
  }

  private playChordSequence() {
    if (!this.ctx || !this.isRunning) return;

    const playNext = () => {
      if (!this.ctx || !this.isRunning) return;
      
      this.fadeOutAndStopActiveNodes();
      
      const chord = this.chords[this.currentChordIndex];
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

      // Schedule notes for the chord
      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        
        // Slight stagger for natural, strummed human feel
        const timeOffset = idx * 0.15;
        const startTime = this.ctx.currentTime + timeOffset;

        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        // Warm triangle wave for organic, keyboard-like timbre
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        // Gentle vibrato (pitch LFO) for retro/lo-fi character
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(4.5, startTime); // 4.5Hz wobble
        lfoGain.gain.setValueAtTime(1.5, startTime); // subtle wobble
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(startTime);

        // Slow attack and release for pad sensation
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.08, startTime + 2.5); // attack
        gainNode.gain.setValueAtTime(0.08, startTime + 6.0);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 10.0); // release

        osc.connect(gainNode);
        
        // Connect to both the main filter and the delay node
        gainNode.connect(this.masterGain!);
        if (this.delayNode) {
          gainNode.connect(this.delayNode);
        }

        osc.start(startTime);
        
        this.activeNodes.push({ osc, gain: gainNode });

        // Clean up LFO and osc later
        setTimeout(() => {
          try {
            lfo.stop();
          } catch (e) {}
        }, 11000);
      });
    };

    // Play immediately
    playNext();

    // Loop chords every 8.5 seconds (gives overlap)
    this.timer = window.setInterval(playNext, 8500);
  }

  private fadeOutAndStopActiveNodes() {
    const fadeTime = 2.0; // 2 second crossfade/fadeout
    const now = this.ctx ? this.ctx.currentTime : 0;

    this.activeNodes.forEach(({ osc, gain }) => {
      try {
        if (this.ctx) {
          gain.gain.cancelScheduledValues(now);
          gain.gain.setValueAtTime(gain.gain.value, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + fadeTime);
          
          setTimeout(() => {
            try {
              osc.stop();
            } catch (e) {}
          }, fadeTime * 1000 + 500);
        } else {
          osc.stop();
        }
      } catch (e) {
        // Safe catch for stopped nodes
      }
    });

    this.activeNodes = [];
  }
}

export const ambientSynth = new AmbientSynth();
