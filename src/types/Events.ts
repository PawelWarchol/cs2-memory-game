import { Tile } from './Tile'

export interface GameEvents {
  'tile-flip': { tile: Tile; index: number }
  'tile-match': { tiles: Tile[]; indices: number[] }
  'game-complete': { moves: number; time: number }
  'game-start': { difficulty: string; seed: string }
}

export type EventCallback<T = any> = (data: T) => void
