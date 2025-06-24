import type { Weapon } from './Weapon'

export interface Tile {
  id: string
  weapon: Weapon
  isFlipped: boolean
  isMatched: boolean
  position: {
    x: number
    y: number
  }
}
