import type { Rarity } from './Rarity'

export interface Weapon {
  id: string
  name: string
  image: string
  rarity: Rarity
}
