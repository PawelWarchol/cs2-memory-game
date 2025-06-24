import type { Tile } from '@/types/Tile'
import type { Weapon } from '@/types/Weapon'
import type { DifficultyConfig } from '@/types/GameState'
import { RandomGenerator } from './RandomGenerator'
import { weapons } from '@/utils/CS2Assets'

export class GameService {
  private static readonly DIFFICULTY_CONFIGS: Record<string, DifficultyConfig> = {
    easy: { pairs: 6, columns: 3, rows: 4 },
    medium: { pairs: 8, columns: 4, rows: 4 },
    hard: { pairs: 12, columns: 6, rows: 4 },
  }

  static getDifficultyConfig(difficulty: string): DifficultyConfig {
    return this.DIFFICULTY_CONFIGS[difficulty] || this.DIFFICULTY_CONFIGS.easy
  }

  static createTiles(pairCount: number, seed: string): Tile[] {
    const rng = new RandomGenerator(seed)

    const selectedWeapons = rng.shuffle(weapons).slice(0, pairCount)

    const tiles: Tile[] = []
    selectedWeapons.forEach((weapon, index) => {
      tiles.push({
        id: `${weapon.id}-a`,
        weapon,
        isFlipped: false,
        isMatched: false,
        position: { x: 0, y: 0 },
      })

      tiles.push({
        id: `${weapon.id}-b`,
        weapon,
        isFlipped: false,
        isMatched: false,
        position: { x: 0, y: 0 },
      })
    })

    return rng.shuffle(tiles)
  }

  static checkMatch(tile1: Tile, tile2: Tile): boolean {
    return tile1.weapon.id === tile2.weapon.id && tile1.id !== tile2.id
  }

  static isGameComplete(tiles: Tile[]): boolean {
    return tiles.every((tile) => tile.isMatched)
  }

  static getFlippedTiles(tiles: Tile[]): Tile[] {
    return tiles.filter((tile) => tile.isFlipped && !tile.isMatched)
  }

  static resetTileFlips(tiles: Tile[]): void {
    tiles.forEach((tile) => {
      if (!tile.isMatched) {
        tile.isFlipped = false
      }
    })
  }

  static formatTime(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
}
