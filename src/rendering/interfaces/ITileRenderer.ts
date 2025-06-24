import type { Tile } from '@/types/Tile'
import type { RenderingConfig } from './IRenderingStrategy'

export interface TilePosition {
  x: number
  y: number
  width: number
  height: number
}

export interface ITileRenderer {
  renderTile(
    ctx: CanvasRenderingContext2D,
    tile: Tile,
    position: TilePosition,
    config: RenderingConfig,
    isHovered: boolean
  ): void
}
