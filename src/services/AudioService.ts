export class AudioService {
  private static instance: AudioService
  private audioContext: AudioContext | null = null
  private enabled = true

  private constructor() {
    try {
      this.audioContext = new AudioContext()
    } catch (error) {
      console.warn('Web Audio API not supported:', error)
    }
  }

  static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService()
    }
    return AudioService.instance
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }

  isEnabled(): boolean {
    return this.enabled
  }

  playFlipSound(): void {
    if (!this.enabled || !this.audioContext) return

    this.createAndPlayTone(800, 0.1, 'sine')
  }

  playMatchSound(): void {
    if (!this.enabled || !this.audioContext) return

    this.createAndPlayTone(523, 0.1, 'sine')
    setTimeout(() => this.createAndPlayTone(659, 0.1, 'sine'), 100)
    setTimeout(() => this.createAndPlayTone(784, 0.1, 'sine'), 200)
  }

  playGameCompleteSound(): void {
    if (!this.enabled || !this.audioContext) return

    const notes = [523, 659, 784, 1047]
    notes.forEach((freq, index) => {
      setTimeout(() => this.createAndPlayTone(freq, 0.2, 'sine'), index * 150)
    })
  }

  private createAndPlayTone(
    frequency: number,
    duration: number,
    type: OscillatorType = 'sine'
  ): void {
    if (!this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
    oscillator.type = type

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + duration)
  }
}
