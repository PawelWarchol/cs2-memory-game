<template>
  <div class="difficulty-selector">
    <label class="difficulty-selector__label"> Poziom trudności </label>

    <div class="difficulty-selector__options">
      <button
        v-for="option in difficultyOptions"
        :key="option.value"
        @click="selectDifficulty(option.value)"
        :class="[
          'difficulty-selector__option',
          {
            'difficulty-selector__option--active': modelValue === option.value,
          },
        ]"
      >
        <span class="difficulty-selector__option-name">{{ option.name }}</span>
        <span class="difficulty-selector__option-desc">{{ option.description }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const difficultyOptions = [
  { value: 'easy', name: 'Łatwy', description: '6 par (3×4)' },
  { value: 'medium', name: 'Średni', description: '8 par (4×4)' },
  { value: 'hard', name: 'Trudny', description: '12 par (6×4)' },
]

function selectDifficulty(value: string) {
  emit('update:modelValue', value)
}
</script>

<style lang="scss" src="@/styles/components/difficulty-selector.scss" scoped></style>
