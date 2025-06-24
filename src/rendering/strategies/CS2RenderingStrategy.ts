import type {
  IRenderingStrategy,
  RenderingConfig,
  CanvasDimensions,
} from '@/rendering/interfaces/IRenderingStrategy'
import type { Tile } from '@/types/Tile'
import { TileRenderer } from '@/rendering/renderers/TileRenderer'
import { EffectRenderer } from '@/rendering/renderers/EffectRenderer'

export class CS2RenderingStrategy implements IRenderingStrategy {
  private tileRenderer = new TileRenderer()
  private effectRenderer = new EffectRenderer()

  render(ctx: CanvasRenderingContext2D, tiles: Tile[], config: RenderingConfig): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    this.renderBackground(ctx, config)

    tiles.forEach((tile, index) => {
      const position = this.calculateTilePosition(index, config)
      const isHovered = config.hoveredIndex === index

      ctx.save()

      if (isHovered) {
        this.effectRenderer.renderHoverEffect(
          ctx,
          position.x,
          position.y,
          position.width,
          position.height
        )
      }

      if (tile.isMatched) {
        this.effectRenderer.renderMatchEffect(
          ctx,
          position.x,
          position.y,
          position.width,
          position.height
        )
      }

      if (config.mousePosition && isHovered) {
        this.effectRenderer.renderParallaxEffect(
          ctx,
          position.x,
          position.y,
          position.width,
          position.height,
          config.mousePosition
        )
      }

      this.tileRenderer.renderTile(ctx, tile, position, config, isHovered)

      ctx.restore()
    })
  }

  calculateCanvasDimensions(config: RenderingConfig): CanvasDimensions {
    const width = config.columns * config.tileSize + (config.columns - 1) * config.tileGap
    const height = config.rows * config.tileSize + (config.rows - 1) * config.tileGap

    return { width, height }
  }

  getTileAtPosition(
    x: number,
    y: number,
    tiles: Tile[],
    config: RenderingConfig
  ): { tile: Tile; index: number } | null {
    for (let index = 0; index < tiles.length; index++) {
      const position = this.calculateTilePosition(index, config)

      if (
        x >= position.x &&
        x <= position.x + position.width &&
        y >= position.y &&
        y <= position.y + position.height
      ) {
        return { tile: tiles[index], index }
      }
    }

    return null
  }

  private renderBackground(ctx: CanvasRenderingContext2D, config: RenderingConfig): void {
    const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height)
    gradient.addColorStop(0, '#1a1a1a')
    gradient.addColorStop(1, '#2d2d2d')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  private calculateTilePosition(index: number, config: RenderingConfig) {
    const col = index % config.columns
    const row = Math.floor(index / config.columns)

    return {
      x: col * (config.tileSize + config.tileGap),
      y: row * (config.tileSize + config.tileGap),
      width: config.tileSize,
      height: config.tileSize,
    }
  }
}
