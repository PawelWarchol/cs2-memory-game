import { describe, it, expect } from 'vitest'
import { RandomGenerator } from '@/services/RandomGenerator'

describe('RandomGenerator', () => {
  describe('constructor', () => {
    it('should create generator with string seed', () => {
      const rng = new RandomGenerator('test-seed')
      expect(rng).toBeInstanceOf(RandomGenerator)
    })

    it('should create generator with numeric seed', () => {
      const rng = new RandomGenerator(12345)
      expect(rng).toBeInstanceOf(RandomGenerator)
    })
  })

  describe('next', () => {
    it('should generate numbers between 0 and 1', () => {
      const rng = new RandomGenerator('test')

      for (let i = 0; i < 100; i++) {
        const value = rng.next()
        expect(value).toBeGreaterThanOrEqual(0)
        expect(value).toBeLessThan(1)
      }
    })

    it('should be deterministic with same seed', () => {
      const rng1 = new RandomGenerator('test-seed')
      const rng2 = new RandomGenerator('test-seed')

      const sequence1 = Array.from({ length: 10 }, () => rng1.next())
      const sequence2 = Array.from({ length: 10 }, () => rng2.next())

      expect(sequence1).toEqual(sequence2)
    })

    it('should generate different sequences with different seeds', () => {
      const rng1 = new RandomGenerator('seed1')
      const rng2 = new RandomGenerator('seed2')

      const sequence1 = Array.from({ length: 10 }, () => rng1.next())
      const sequence2 = Array.from({ length: 10 }, () => rng2.next())

      expect(sequence1).not.toEqual(sequence2)
    })
  })

  describe('nextInt', () => {
    it('should generate integers in range', () => {
      const rng = new RandomGenerator('test')

      for (let i = 0; i < 100; i++) {
        const value = rng.nextInt(1, 10)
        expect(value).toBeGreaterThanOrEqual(1)
        expect(value).toBeLessThanOrEqual(10)
        expect(Number.isInteger(value)).toBe(true)
      }
    })
  })

  describe('shuffle', () => {
    it('should shuffle array', () => {
      const rng = new RandomGenerator('test')
      const original = [1, 2, 3, 4, 5]
      const shuffled = rng.shuffle(original)

      expect(shuffled).toHaveLength(original.length)
      expect(shuffled.sort()).toEqual(original.sort())
    })

    it('should not modify original array', () => {
      const rng = new RandomGenerator('test')
      const original = [1, 2, 3, 4, 5]
      const originalCopy = [...original]

      rng.shuffle(original)
      expect(original).toEqual(originalCopy)
    })

    it('should be deterministic with same seed', () => {
      const original = [1, 2, 3, 4, 5]

      const rng1 = new RandomGenerator('test')
      const shuffled1 = rng1.shuffle(original)

      const rng2 = new RandomGenerator('test')
      const shuffled2 = rng2.shuffle(original)

      expect(shuffled1).toEqual(shuffled2)
    })
  })

  describe('pick', () => {
    it('should pick element from array', () => {
      const rng = new RandomGenerator('test')
      const array = ['a', 'b', 'c', 'd', 'e']

      for (let i = 0; i < 50; i++) {
        const picked = rng.pick(array)
        expect(array).toContain(picked)
      }
    })
  })
})
