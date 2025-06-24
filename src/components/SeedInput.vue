<template>
  <div class="seed-input">
    <label class="seed-input__label" for="seed-input"> Seed gry (opcjonalny) </label>

    <div class="seed-input__wrapper">
      <input
        id="seed-input"
        :value="modelValue"
        @input="updateValue"
        class="seed-input__field"
        type="text"
        placeholder="Zostaw puste dla losowego"
        maxlength="50"
      />

      <button
        @click="generateRandomSeed"
        class="seed-input__generate"
        type="button"
        title="Wygeneruj losowy seed"
      >
        🎲
      </button>
    </div>

    <p class="seed-input__help">Użyj tego samego seed-a aby odtworzyć identyczny układ kafelków</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function generateRandomSeed() {
  const seed = Math.random().toString(36).substring(2, 12)
  emit('update:modelValue', seed)
}
</script>

<style lang="scss" src="@/styles/components/seed-input.scss" scoped />
