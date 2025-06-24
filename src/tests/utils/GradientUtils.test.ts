import { describe, it, expect } from 'vitest'
import { getRarityGradient, getRarityColor } from '@/utils/GradientUtils'

describe('GradientUtils', () => {
  describe('getRarityGradient', () => {
    it('should return correct gradient for Consumer rarity', () => {
      const gradient = getRarityGradient('Consumer')
      expect(gradient).toEqual([
        [0, '#B0C3D9'],
        [1, '#5E98D9'],
      ])
    })

    it('should return correct gradient for Industrial rarity', () => {
      const gradient = getRarityGradient('Industrial')
      expect(gradient).toEqual([
        [0, '#5E98D9'],
        [1, '#4B69FF'],
      ])
    })

    it('should return correct gradient for MilSpec rarity', () => {
      const gradient = getRarityGradient('MilSpec')
      expect(gradient).toEqual([
        [0, '#4B69FF'],
        [1, '#8847FF'],
      ])
    })

    it('should return correct gradient for Restricted rarity', () => {
      const gradient = getRarityGradient('Restricted')
      expect(gradient).toEqual([
        [0, '#8847FF'],
        [1, '#D32CE6'],
      ])
    })

    it('should return correct gradient for Classified rarity', () => {
      const gradient = getRarityGradient('Classified')
      expect(gradient).toEqual([
        [0, '#D32CE6'],
        [1, '#EB4B4B'],
      ])
    })

    it('should return correct gradient for Covert rarity', () => {
      const gradient = getRarityGradient('Covert')
      expect(gradient).toEqual([
        [0, '#EB4B4B'],
        [1, '#E4AE39'],
      ])
    })

    it('should return correct gradient for Extraordinary rarity', () => {
      const gradient = getRarityGradient('Extraordinary')
      expect(gradient).toEqual([
        [0, '#E4AE39'],
        [1, '#FFD700'],
      ])
    })

    it('should return default gradient for unknown rarity', () => {
      const gradient = getRarityGradient('Unknown' as any)
      expect(gradient).toEqual([
        [0, '#222'],
        [1, '#444'],
      ])
    })
  })

  describe('getRarityColor', () => {
    it('should return first color from gradient', () => {
      expect(getRarityColor('Consumer')).toBe('#B0C3D9')
      expect(getRarityColor('Industrial')).toBe('#5E98D9')
      expect(getRarityColor('MilSpec')).toBe('#4B69FF')
      expect(getRarityColor('Restricted')).toBe('#8847FF')
      expect(getRarityColor('Classified')).toBe('#D32CE6')
      expect(getRarityColor('Covert')).toBe('#EB4B4B')
      expect(getRarityColor('Extraordinary')).toBe('#E4AE39')
    })
  })
})
