<template>
  <div class="game-history">
    <h2 class="game-history__title">Historia Gier</h2>

    <div v-if="history.length === 0" class="game-history__empty">
      <p>Brak ukończonych gier</p>
    </div>

    <div v-else class="game-history__list">
      <div v-for="entry in sortedHistory" :key="entry.id" class="game-history__item">
        <div class="game-history__item-header">
          <span class="game-history__difficulty">{{ getDifficultyName(entry.difficulty) }}</span>
          <span class="game-history__date">{{ formatDate(entry.completedAt) }}</span>
        </div>

        <div class="game-history__item-stats">
          <div class="game-history__stat">
            <span class="game-history__stat-label">Ruchy:</span>
            <span class="game-history__stat-value">{{ entry.moves }}</span>
          </div>

          <div class="game-history__stat">
            <span class="game-history__stat-label">Czas:</span>
            <span class="game-history__stat-value">{{ formatTime(entry.time) }}</span>
          </div>

          <div v-if="entry.seed" class="game-history__stat">
            <span class="game-history__stat-label">Seed:</span>
            <span class="game-history__stat-value game-history__seed">{{ entry.seed }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="history.length > 0" class="game-history__actions">
      <button @click="clearHistory" class="btn btn--danger btn--small">Wyczyść historię</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { GameHistoryEntry } from '@/types/GameHistoryEntry'
import { GameService } from '@/services/GameService'

const props = defineProps<{
  history: GameHistoryEntry[]
}>()

const emit = defineEmits<{
  clearHistory: []
}>()

const sortedHistory = computed(() =>
  [...props.history].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  )
)

function getDifficultyName(difficulty: string): string {
  const names = {
    easy: 'Łatwy',
    medium: 'Średni',
    hard: 'Trudny',
  }
  return names[difficulty as keyof typeof names] || difficulty
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatTime(milliseconds: number): string {
  return GameService.formatTime(milliseconds)
}

function clearHistory() {
  emit('clearHistory')
}
</script>

<style lang="scss" src="@/styles/components/game-history.scss" scoped></style>
