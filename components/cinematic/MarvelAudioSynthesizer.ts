/**
 * Marvel Cinematic Audio Synthesizer
 * Uses Web Audio API to synthesize cinematic sci-fi and comic sound effects
 * without relying on external MP3 assets (zero latency, zero 404s, works offline).
 */

class MarvelAudioSynthesizer {
  private ctx: AudioContext | null = null
  private isMuted: boolean = false

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {})
    }
    return this.ctx
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted
  }

  public getMuted(): boolean {
    return this.isMuted
  }

  /**
   * Sound of comic pages rapidly flipping
   */
  public playPageFlip() {
    if (this.isMuted) return
    const ctx = this.getContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const bufferSize = ctx.sampleRate * 0.05
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3))
      }

      const noise = ctx.createBufferSource()
      noise.buffer = buffer

      const filter = ctx.createBiquadFilter()
      filter.type = "bandpass"
      filter.frequency.setValueAtTime(1400 + Math.random() * 600, now)
      filter.Q.setValueAtTime(3, now)

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      noise.start(now)
    } catch {
      // Audio context might fail on un-interacted browsers
    }
  }

  /**
   * Arc Reactor power-up energy hum
   */
  public playReactorHum() {
    if (this.isMuted) return
    const ctx = this.getContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = "sine"
      osc.frequency.setValueAtTime(90, now)
      osc.frequency.exponentialRampToValueAtTime(180, now + 1.2)

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.15, now + 0.4)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 1.2)
    } catch {}
  }

  /**
   * Arc Reactor energy charge whine when clicked
   */
  public playChargeWhine() {
    if (this.isMuted) return
    const ctx = this.getContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = "triangle"
      osc.frequency.setValueAtTime(120, now)
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.8)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.linearRampToValueAtTime(0.25, now + 0.6)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.85)
    } catch {}
  }

  /**
   * Thunderous Marvel Assemble cinematic boom / blast
   */
  public playAssembleBoom() {
    if (this.isMuted) return
    const ctx = this.getContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime

      // 1. Sub-bass drop
      const subOsc = ctx.createOscillator()
      const subGain = ctx.createGain()
      subOsc.type = "sine"
      subOsc.frequency.setValueAtTime(150, now)
      subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.9)

      subGain.gain.setValueAtTime(0.5, now)
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2)

      subOsc.connect(subGain)
      subGain.connect(ctx.destination)
      subOsc.start(now)
      subOsc.stop(now + 1.2)

      // 2. Cinematic Impact Noise / Shockwave
      const bufferSize = ctx.sampleRate * 0.8
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2))
      }

      const noise = ctx.createBufferSource()
      noise.buffer = buffer

      const filter = ctx.createBiquadFilter()
      filter.type = "lowpass"
      filter.frequency.setValueAtTime(800, now)
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.7)

      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.35, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8)

      noise.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(ctx.destination)

      noise.start(now)
    } catch {}
  }
}

export const marvelAudio = new MarvelAudioSynthesizer()
