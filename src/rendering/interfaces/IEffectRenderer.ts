export interface IEffectRenderer {
  renderParallaxEffect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    mousePosition?: { x: number; y: number }
  ): void

  renderHoverEffect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ): void

  renderMatchEffect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ): void
}
