<template>
  <div class="game-stats">
    <div class="game-stats__container">
      <div class="game-stats__item">
        <span class="game-stats__label">Ruchy</span>
        <span class="game-stats__value">{{ moves }}</span>
      </div>

      <div class="game-stats__item">
        <span class="game-stats__label">Czas</span>
        <span class="game-stats__value">{{ formattedTime }}</span>
      </div>

      <div class="game-stats__item">
        <span class="game-stats__label">Znalezione pary</span>
        <span class="game-stats__value">{{ matchedPairs }} / {{ totalPairs }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { GameService } from '@/services/GameService'

const props = defineProps<{
  moves: number
  time: number
  matchedPairs: number
  totalPairs: number
}>()

const formattedTime = computed(() => GameService.formatTime(props.time))
</script>

<style lang="scss" src="@/styles/components/game-stats.scss" scoped></style>
