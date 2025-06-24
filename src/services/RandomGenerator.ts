export class RandomGenerator {
  private seed: number

  constructor(seed: string | number) {
    this.seed = typeof seed === 'string' ? this.hash(seed) : seed
  }

  private hash(str: string): number {
    let hash = 5381
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) + hash + str.charCodeAt(i)
    }
    return Math.abs(hash)
  }

  next(): number {
    // Linear Congruential Generator
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed / 233280
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min
  }

  shuffle<T>(array: T[]): T[] {
    const arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  pick<T>(array: T[]): T {
    const index = Math.floor(this.next() * array.length)
    return array[index]
  }

  getSeed(): number {
    return this.seed
  }
}
