import type {
  IRenderingStrategy,
  RenderingConfig,
} from "@/rendering/interfaces/IRenderingStrategy";
import type { Tile } from "@/types/Tile";
import { CS2RenderingStrategy } from "@/rendering/strategies/CS2RenderingStrategy";

export class RenderingContext {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private strategy: IRenderingStrategy;

  constructor(strategyType: "cs2" = "cs2") {
    this.strategy = this.createStrategy(strategyType);
  }

  setCanvas(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
  }

  render(tiles: Tile[], config: RenderingConfig): void {
    if (!this.ctx) {
      throw new Error("Canvas context not initialized");
    }

    this.strategy.render(this.ctx, tiles, config);
  }

  calculateCanvasDimensions(config: RenderingConfig) {
    return this.strategy.calculateCanvasDimensions(config);
  }

  handleClick(x: number, y: number, tiles: Tile[], config: RenderingConfig) {
    return this.strategy.getTileAtPosition(x, y, tiles, config);
  }

  getHoveredTile(
    x: number,
    y: number,
    tiles: Tile[],
    config: RenderingConfig
  ): number | null {
    const result = this.strategy.getTileAtPosition(x, y, tiles, config);
    return result ? result.index : null;
  }

  private createStrategy(type: string): IRenderingStrategy {
    switch (type) {
      case "cs2":
        return new CS2RenderingStrategy();
      default:
        return new CS2RenderingStrategy();
    }
  }
}
