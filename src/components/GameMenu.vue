<template>
  <div class="game-menu">
    <div class="game-menu__container">
      <h1 class="game-menu__title">CS2 Memory Game</h1>

      <div class="game-menu__form">
        <DifficultySelector v-model="selectedDifficulty" class="game-menu__field" />

        <SeedInput v-model="gameSeed" class="game-menu__field" />

        <div class="game-menu__actions">
          <button @click="startGame" class="btn btn--primary btn--large">Rozpocznij Grę</button>

          <button @click="$emit('showHistory')" class="btn btn--secondary">Historia Gier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DifficultySelector from '@/components/DifficultySelector.vue'
import SeedInput from '@/components/SeedInput.vue'

const emit = defineEmits<{
  start: [{ difficulty: string; seed: string }]
  showHistory: []
}>()

const selectedDifficulty = ref('medium')
const gameSeed = ref('')

function startGame() {
  emit('start', {
    difficulty: selectedDifficulty.value,
    seed: gameSeed.value || Date.now().toString(),
  })
}
</script>

<style lang="scss" src="@/styles/components/game-menu.scss" scoped></style>
