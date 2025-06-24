import { describe, it, expect } from 'vitest'
import { GameService } from '@/services/GameService'
import type { Tile } from '@/types/Tile'

describe('GameService', () => {
  describe('getDifficultyConfig', () => {
    it('should return correct config for easy difficulty', () => {
      const config = GameService.getDifficultyConfig('easy')
      expect(config).toEqual({ pairs: 6, columns: 3, rows: 4 })
    })

    it('should return correct config for medium difficulty', () => {
      const config = GameService.getDifficultyConfig('medium')
      expect(config).toEqual({ pairs: 8, columns: 4, rows: 4 })
    })

    it('should return correct config for hard difficulty', () => {
      const config = GameService.getDifficultyConfig('hard')
      expect(config).toEqual({ pairs: 12, columns: 6, rows: 4 })
    })

    it('should return easy config for unknown difficulty', () => {
      const config = GameService.getDifficultyConfig('unknown')
      expect(config).toEqual({ pairs: 6, columns: 3, rows: 4 })
    })
  })

  describe('createTiles', () => {
    it('should create correct number of tiles', () => {
      const tiles = GameService.createTiles(6, 'test-seed')
      expect(tiles).toHaveLength(12) // 6 pairs = 12 tiles
    })

    it('should create tiles in pairs', () => {
      const tiles = GameService.createTiles(3, 'test-seed')
      const weaponIds = tiles.map((tile) => tile.weapon.id)
      const uniqueWeaponIds = [...new Set(weaponIds)]

      expect(uniqueWeaponIds).toHaveLength(3)
      uniqueWeaponIds.forEach((weaponId) => {
        const count = weaponIds.filter((id) => id === weaponId).length
        expect(count).toBe(2)
      })
    })

    it('should create tiles with correct initial state', () => {
      const tiles = GameService.createTiles(2, 'test-seed')

      tiles.forEach((tile) => {
        expect(tile.isFlipped).toBe(false)
        expect(tile.isMatched).toBe(false)
        expect(tile.id).toBeDefined()
        expect(tile.weapon).toBeDefined()
        expect(tile.position).toEqual({ x: 0, y: 0 })
      })
    })
  })

  describe('checkMatch', () => {
    it('should return true for matching tiles', () => {
      const tile1: Tile = {
        id: 'ak47-a',
        weapon: {
          id: 'ak47',
          name: 'AK-47',
          image: '/test.png',
          rarity: 'Covert',
        },
        isFlipped: true,
        isMatched: false,
        position: { x: 0, y: 0 },
      }

      const tile2: Tile = {
        id: 'ak47-b',
        weapon: {
          id: 'ak47',
          name: 'AK-47',
          image: '/test.png',
          rarity: 'Covert',
        },
        isFlipped: true,
        isMatched: false,
        position: { x: 0, y: 0 },
      }

      expect(GameService.checkMatch(tile1, tile2)).toBe(true)
    })

    it('should return false for non-matching tiles', () => {
      const tile1: Tile = {
        id: 'ak47-a',
        weapon: {
          id: 'ak47',
          name: 'AK-47',
          image: '/test.png',
          rarity: 'Covert',
        },
        isFlipped: true,
        isMatched: false,
        position: { x: 0, y: 0 },
      }

      const tile2: Tile = {
        id: 'awp-a',
        weapon: {
          id: 'awp',
          name: 'AWP',
          image: '/test.png',
          rarity: 'Covert',
        },
        isFlipped: true,
        isMatched: false,
        position: { x: 0, y: 0 },
      }

      expect(GameService.checkMatch(tile1, tile2)).toBe(false)
    })

    it('should return false for same tile', () => {
      const tile: Tile = {
        id: 'ak47-a',
        weapon: {
          id: 'ak47',
          name: 'AK-47',
          image: '/test.png',
          rarity: 'Covert',
        },
        isFlipped: true,
        isMatched: false,
        position: { x: 0, y: 0 },
      }

      expect(GameService.checkMatch(tile, tile)).toBe(false)
    })
  })

  describe('formatTime', () => {
    it('should format time correctly', () => {
      expect(GameService.formatTime(0)).toBe('00:00')
      expect(GameService.formatTime(1000)).toBe('00:01')
      expect(GameService.formatTime(60000)).toBe('01:00')
      expect(GameService.formatTime(65000)).toBe('01:05')
      expect(GameService.formatTime(125000)).toBe('02:05')
    })
  })
})
