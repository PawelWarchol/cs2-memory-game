import type { IEffectRenderer } from '@/rendering/interfaces/IEffectRenderer'

export class EffectRenderer implements IEffectRenderer {
  renderParallaxEffect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    mousePosition?: { x: number; y: number }
  ): void {
    if (!mousePosition) return

    const centerX = x + width / 2
    const centerY = y + height / 2

    const offsetX = (mousePosition.x - centerX) * 0.02
    const offsetY = (mousePosition.y - centerY) * 0.02

    ctx.save()
    ctx.translate(offsetX, offsetY)
    // Dodatkowe efekty paralaksy mogą być tutaj implementowane
    ctx.restore()
  }

  renderHoverEffect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ): void {
    // Subtelny efekt świecenia
    ctx.shadowColor = '#FFD700'
    ctx.shadowBlur = 10
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
  }

  renderMatchEffect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ): void {
    // Efekt dla dopasowanych kafelków
    ctx.shadowColor = '#00ff00'
    ctx.shadowBlur = 15
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    // Dodatkowy blask
    const centerX = x + width / 2
    const centerY = y + height / 2
    const radius = Math.max(width, height) * 0.6

    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
    gradient.addColorStop(0, 'rgba(0, 255, 0, 0.1)')
    gradient.addColorStop(1, 'rgba(0, 255, 0, 0)')

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fill()
  }
}
