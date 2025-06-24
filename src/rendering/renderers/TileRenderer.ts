import type {
  ITileRenderer,
  TilePosition,
} from "@/rendering/interfaces/ITileRenderer";
import type { Tile } from "@/types/Tile";
import type { RenderingConfig } from "@/rendering/interfaces/IRenderingStrategy";
import { getRarityGradient } from "@/utils/GradientUtils";

export class TileRenderer implements ITileRenderer {
  renderTile(
    ctx: CanvasRenderingContext2D,
    tile: Tile,
    position: TilePosition,
    config: RenderingConfig,
    isHovered: boolean
  ): void {
    const { x, y, width, height } = position;

    // Tło kafelka - jednolite przed obróceniem, gradient po obróceniu
    this.renderTileBackground(ctx, tile, x, y, width, height, isHovered);

    // Zawartość kafelka
    if (tile.isFlipped || tile.isMatched) {
      this.renderWeaponIcon(ctx, tile, x, y, width, height);
    } else {
      this.renderTileBack(ctx, x, y, width, height);
    }

    // Ramka
    this.renderTileBorder(ctx, x, y, width, height, isHovered, tile.isMatched);
  }

  private renderTileBackground(
    ctx: CanvasRenderingContext2D,
    tile: Tile,
    x: number,
    y: number,
    width: number,
    height: number,
    isHovered: boolean
  ): void {
    if (tile.isFlipped || tile.isMatched) {
      // Gradient tylko dla odkrytych kafelków
      const gradientStops = getRarityGradient(tile.weapon.rarity);
      const gradient = ctx.createLinearGradient(x, y, x + width, y + height);

      gradientStops.forEach(([stop, color]) => {
        gradient.addColorStop(stop, color);
      });

      ctx.fillStyle = gradient;
    } else {
      // Jednolite tło dla zakrytych kafelków
      ctx.fillStyle = isHovered ? "#3a3a3a" : "#2a2a2a";
    }

    this.roundRect(ctx, x, y, width, height, 12);
    ctx.fill();
  }

  private renderTileBack(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ): void {
    // Symbol CS2 na odwrocie kafelka
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    const radius = Math.min(width, height) * 0.15;

    ctx.fillStyle = "#FF6600";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    // Logo CS2 text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 12px Rajdhani, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("CS2", centerX, centerY);
  }

  private renderWeaponIcon(
    ctx: CanvasRenderingContext2D,
    tile: Tile,
    x: number,
    y: number,
    width: number,
    height: number
  ): void {
    const padding = 8;
    // Upewnij się, że tile.weapon.image to ścieżka do PNG (np. '/assets/weapons/ak47.png')
    const img = new window.Image();
    img.src = tile.weapon.image;

    // Jeśli obrazek jest już załadowany, rysuj od razu
    if (img.complete) {
      ctx.drawImage(
        img,
        x + padding,
        y + padding,
        width - 2 * padding,
        height - 2 * padding
      );
    } else {
      // Jeśli nie, rysuj po załadowaniu
      img.onload = () => {
        ctx.drawImage(
          img,
          x + padding,
          y + padding,
          width - 2 * padding,
          height - 2 * padding
        );
      };
    }
  }

  private renderTileBorder(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    isHovered: boolean,
    isMatched: boolean
  ): void {
    ctx.strokeStyle = isMatched ? "#00ff00" : isHovered ? "#FFD700" : "#444444";
    ctx.lineWidth = isMatched ? 3 : isHovered ? 2 : 1;

    this.roundRect(ctx, x, y, width, height, 12);
    ctx.stroke();
  }

  private roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ): void {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}
