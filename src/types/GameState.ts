export type GameState = 'menu' | 'playing' | 'finished'

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface DifficultyConfig {
  pairs: number
  columns: number
  rows: number
}
