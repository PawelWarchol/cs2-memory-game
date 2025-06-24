import type { GameHistoryEntry } from '@/types/GameHistoryEntry'

export interface GameState {
  tiles: any[]
  moves: number
  time: number
  difficulty: string
  seed: string
  gameState: string
}

export class StorageService {
  private static instance: StorageService
  private readonly GAME_STATE_KEY = 'cs2-memory-game-state'
  private readonly GAME_HISTORY_KEY = 'cs2-memory-game-history'
  private readonly SETTINGS_KEY = 'cs2-memory-game-settings'
  private readonly HISTORY_GAME_LENGTH = 10

  private constructor() {}

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService()
    }
    return StorageService.instance
  }

  saveGameState(state: GameState): void {
    try {
      localStorage.setItem(this.GAME_STATE_KEY, JSON.stringify(state))
    } catch (error) {
      console.warn('Failed to save game state:', error)
    }
  }

  loadGameState(): GameState | null {
    try {
      const data = localStorage.getItem(this.GAME_STATE_KEY)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.warn('Failed to load game state:', error)
      return null
    }
  }

  clearGameState(): void {
    try {
      localStorage.removeItem(this.GAME_STATE_KEY)
    } catch (error) {
      console.warn('Failed to clear game state:', error)
    }
  }

  saveHistory(history: GameHistoryEntry[]): void {
    try {
      localStorage.setItem(this.GAME_HISTORY_KEY, JSON.stringify(history))
    } catch (error) {
      console.warn('Failed to save game history:', error)
    }
  }

  loadHistory(): GameHistoryEntry[] {
    try {
      const data = localStorage.getItem(this.GAME_HISTORY_KEY)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.warn('Failed to load game history:', error)
      return []
    }
  }

  addHistoryEntry(entry: GameHistoryEntry): void {
    const history = this.loadHistory()
    history.push(entry)

    if (history.length > this.HISTORY_GAME_LENGTH) {
      history.splice(0, history.length - this.HISTORY_GAME_LENGTH)
    }
    this.saveHistory(history)
  }

  saveSettings(settings: Record<string, any>): void {
    try {
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings))
    } catch (error) {
      console.warn('Failed to save settings:', error)
    }
  }

  loadSettings(): Record<string, any> {
    try {
      const data = localStorage.getItem(this.SETTINGS_KEY)
      return data ? JSON.parse(data) : {}
    } catch (error) {
      console.warn('Failed to load settings:', error)
      return {}
    }
  }
}
