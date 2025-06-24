<template>
  <div class="game-board">
    <canvas
      ref="canvasRef"
      :width="canvasDimensions.width"
      :height="canvasDimensions.height"
      class="game-board__canvas"
      @click="handleCanvasClick"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { Tile } from '@/types/Tile'
import { RenderingContext } from '@/rendering/context/RenderingContext'
import type { RenderingConfig } from '@/rendering/interfaces/IRenderingStrategy'

const props = defineProps<{
  tiles: Tile[]
  columns: number
  rows: number
  tileSize: number
  tileGap: number
  onTileClick: (tile: Tile, index: number) => void
}>()

const canvasRef = ref<HTMLCanvasElement>()
const hoveredIndex = ref<number | null>(null)
const mousePosition = ref<{ x: number; y: number } | undefined>()
const renderingContext = new RenderingContext('cs2')

const canvasDimensions = computed(() =>
  renderingContext.calculateCanvasDimensions({
    columns: props.columns,
    rows: props.rows,
    tileSize: props.tileSize,
    tileGap: props.tileGap,
  })
)

const renderingConfig = computed(
  (): RenderingConfig => ({
    columns: props.columns,
    rows: props.rows,
    tileSize: props.tileSize,
    tileGap: props.tileGap,
    hoveredIndex: hoveredIndex.value,
    mousePosition: mousePosition.value,
  })
)

onMounted(() => {
  if (canvasRef.value) {
    renderingContext.setCanvas(canvasRef.value)
    render()
  }
})

watch([() => props.tiles, renderingConfig], render, { deep: true })

function render() {
  renderingContext.render(props.tiles, renderingConfig.value)
}

function handleCanvasClick(event: MouseEvent) {
  const rect = canvasRef.value!.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const result = renderingContext.handleClick(x, y, props.tiles, renderingConfig.value)
  if (result) {
    props.onTileClick(result.tile, result.index)
  }
}

function handleMouseMove(event: MouseEvent) {
  const rect = canvasRef.value!.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  mousePosition.value = { x, y }
  hoveredIndex.value = renderingContext.getHoveredTile(x, y, props.tiles, renderingConfig.value)
}

function handleMouseLeave() {
  hoveredIndex.value = null
  mousePosition.value = undefined
}
</script>

<style lang="scss" src="@/styles/components/game-board.scss" scoped></style>
