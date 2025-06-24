<template>
  <div class="game-root">
    <GameMenu
      v-if="gameState === 'menu'"
      @start="startGame"
      @show-history="showHistoryModal = true"
    />

    <div v-else class="game-root__game">
      <div class="game-root__header">
        <h1 class="game-root__title">CS2 Memory Game</h1>

        <GameStats
          :moves="moves"
          :time="time"
          :matched-pairs="matchedPairs"
          :total-pairs="totalPairs"
        />
      </div>

      <div class="game-root__board">
        <GameBoardCanvas
          :tiles="tiles"
          :columns="columns"
          :rows="rows"
          :tile-size="96"
          :tile-gap="16"
          :on-tile-click="handleTileClick"
        />
      </div>

      <div class="game-root__controls">
        <button @click="showHistoryModal = true" class="btn btn--secondary">Historia Gier</button>

        <button
          @click="toggleAudio"
          :class="['btn', audioEnabled ? 'btn--primary' : 'btn--secondary']"
        >
          {{ audioEnabled ? '🔊' : '🔇' }} Dźwięk
        </button>

        <button @click="resetGame" class="btn btn--secondary">Nowa Gra</button>
      </div>

      <Modal :show="gameState === 'finished'" @close="gameState = 'menu'">
        <div class="game-root__victory">
          <h2 class="game-root__victory-title">🎉 Gratulacje!</h2>
          <p class="game-root__victory-text">
            Ukończyłeś grę w {{ moves }} ruchach w czasie {{ formattedTime }}!
          </p>
          <div class="game-root__victory-actions">
            <button @click="startGame(lastGameConfig)" class="btn btn--primary">
              Zagraj ponownie
            </button>
            <button @click="gameState = 'menu'" class="btn btn--secondary">Menu główne</button>
          </div>
        </div>
      </Modal>
    </div>

    <Modal :show="showHistoryModal" @close="showHistoryModal = false">
      <GameHistory :history="gameHistory" @clear-history="clearHistory" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Tile } from '@/types/Tile'
import type { GameState } from '@/types/GameState'
import type { GameHistoryEntry } from '@/types/GameHistoryEntry'
import GameMenu from '@/components/GameMenu.vue'
import GameBoardCanvas from './GameBoardCanvas.vue'
import GameStats from '@/components/GameStats.vue'
import GameHistory from '@/components/GameHistory.vue'
import Modal from '@/components/Modal.vue'
import { GameService } from '@/services/GameService'
import { AudioService } from '@/services/AudioService'
import { StorageService } from '@/services/StorageService'

// Game state
const gameState = ref<GameState>('menu')
const tiles = ref<Tile[]>([])
const moves = ref(0)
const time = ref(0)
const timer = ref<ReturnType<typeof setInterval> | null>(null)
const columns = ref(4)
const rows = ref(4)
const totalPairs = ref(0)
const lastGameConfig = ref<{ difficulty: string; seed: string }>({
  difficulty: 'medium',
  seed: '',
})

// UI state
const showHistoryModal = ref(false)
const gameHistory = ref<GameHistoryEntry[]>([])
const audioEnabled = ref(true)

// Services
const audioService = AudioService.getInstance()
const storageService = StorageService.getInstance()

// Computed
const matchedPairs = computed(() => tiles.value.filter((tile) => tile.isMatched).length / 2)

const formattedTime = computed(() => GameService.formatTime(time.value))

// Game logic
function startGame(config: { difficulty: string; seed: string }) {
  const difficultyConfig = GameService.getDifficultyConfig(config.difficulty)

  tiles.value = GameService.createTiles(difficultyConfig.pairs, config.seed)
  columns.value = difficultyConfig.columns
  rows.value = difficultyConfig.rows
  totalPairs.value = difficultyConfig.pairs
  moves.value = 0
  time.value = 0
  gameState.value = 'playing'
  lastGameConfig.value = config

  // Start timer
  if (timer.value) clearInterval(timer.value)
  timer.value = setInterval(() => {
    time.value += 100
  }, 100)

  // Save game state
  saveGameState()
}

function handleTileClick(tile: Tile, index: number) {
  if (tile.isFlipped || tile.isMatched) return

  const flippedTiles = GameService.getFlippedTiles(tiles.value)
  if (flippedTiles.length >= 2) return

  // Flip tile
  tile.isFlipped = true

  if (audioEnabled.value) {
    audioService.playFlipSound()
  }

  const newFlippedTiles = GameService.getFlippedTiles(tiles.value)

  if (newFlippedTiles.length === 2) {
    moves.value++

    if (GameService.checkMatch(newFlippedTiles[0], newFlippedTiles[1])) {
      // Match found
      newFlippedTiles[0].isMatched = true
      newFlippedTiles[1].isMatched = true

      if (audioEnabled.value) {
        audioService.playMatchSound()
      }

      // Check if game is complete
      if (GameService.isGameComplete(tiles.value)) {
        finishGame()
      }
    } else {
      // No match - flip back after delay
      setTimeout(() => {
        GameService.resetTileFlips(tiles.value)
      }, 1000)
    }
  }

  saveGameState()
}

function finishGame() {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }

  gameState.value = 'finished'

  if (audioEnabled.value) {
    audioService.playGameCompleteSound()
  }

  // Save to history
  const historyEntry: GameHistoryEntry = {
    id: Date.now().toString(),
    moves: moves.value,
    time: time.value,
    difficulty: lastGameConfig.value.difficulty,
    seed: lastGameConfig.value.seed,
    completedAt: new Date().toISOString(),
  }

  storageService.addHistoryEntry(historyEntry)
  loadHistory()
  storageService.clearGameState()
}

function resetGame() {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }

  gameState.value = 'menu'
  storageService.clearGameState()
}

function toggleAudio() {
  audioEnabled.value = !audioEnabled.value
  audioService.setEnabled(audioEnabled.value)

  storageService.saveSettings({
    audioEnabled: audioEnabled.value,
  })
}

function clearHistory() {
  gameHistory.value = []
  storageService.saveHistory([])
  showHistoryModal.value = false
}

function saveGameState() {
  if (gameState.value === 'playing') {
    storageService.saveGameState({
      tiles: tiles.value,
      moves: moves.value,
      time: time.value,
      difficulty: lastGameConfig.value.difficulty,
      seed: lastGameConfig.value.seed,
      gameState: gameState.value,
    })
  }
}

function loadGameState() {
  const savedState = storageService.loadGameState()
  if (savedState && savedState.gameState === 'playing') {
    // Resume game
    tiles.value = savedState.tiles
    moves.value = savedState.moves
    time.value = savedState.time
    lastGameConfig.value = {
      difficulty: savedState.difficulty,
      seed: savedState.seed,
    }

    const difficultyConfig = GameService.getDifficultyConfig(savedState.difficulty)
    columns.value = difficultyConfig.columns
    rows.value = difficultyConfig.rows
    totalPairs.value = difficultyConfig.pairs
    gameState.value = 'playing'

    // Resume timer
    timer.value = setInterval(() => {
      time.value += 100
    }, 100)
  }
}

function loadHistory() {
  gameHistory.value = storageService.loadHistory()
}

function loadSettings() {
  const settings = storageService.loadSettings()
  if (settings.audioEnabled !== undefined) {
    audioEnabled.value = settings.audioEnabled
    audioService.setEnabled(audioEnabled.value)
  }
}

// Lifecycle
onMounted(() => {
  loadGameState()
  loadHistory()
  loadSettings()
})
</script>

<style lang="scss" src="@/styles/components/game-root.scss" scoped></style>
