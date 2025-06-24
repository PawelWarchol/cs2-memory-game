import type { Tile } from '@/types/Tile'

export interface RenderingConfig {
  columns: number
  rows: number
  tileSize: number
  tileGap: number
  hoveredIndex?: number | null
  mousePosition?: { x: number; y: number }
}

export interface CanvasDimensions {
  width: number
  height: number
}

export interface IRenderingStrategy {
  render(ctx: CanvasRenderingContext2D, tiles: Tile[], config: RenderingConfig): void

  calculateCanvasDimensions(config: RenderingConfig): CanvasDimensions

  getTileAtPosition(
    x: number,
    y: number,
    tiles: Tile[],
    config: RenderingConfig
  ): { tile: Tile; index: number } | null
}
