import type { Rarity } from '@/types/Rarity'

export function getRarityGradient(rarity: Rarity): [number, string][] {
  switch (rarity) {
    case 'Consumer':
      return [
        [0, '#B0C3D9'],
        [1, '#5E98D9'],
      ]
    case 'Industrial':
      return [
        [0, '#5E98D9'],
        [1, '#4B69FF'],
      ]
    case 'MilSpec':
      return [
        [0, '#4B69FF'],
        [1, '#8847FF'],
      ]
    case 'Restricted':
      return [
        [0, '#8847FF'],
        [1, '#D32CE6'],
      ]
    case 'Classified':
      return [
        [0, '#D32CE6'],
        [1, '#EB4B4B'],
      ]
    case 'Covert':
      return [
        [0, '#EB4B4B'],
        [1, '#E4AE39'],
      ]
    case 'Extraordinary':
      return [
        [0, '#E4AE39'],
        [1, '#FFD700'],
      ]
    default:
      return [
        [0, '#222'],
        [1, '#444'],
      ]
  }
}

export function getRarityColor(rarity: Rarity): string {
  const gradient = getRarityGradient(rarity)
  return gradient[0][1] // Pierwszy kolor z gradientu
}
