<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="modal"
        @click.self="closeModal"
        @keydown.esc="closeModal"
        tabindex="0"
        ref="modalRef"
      >
        <div class="modal__content">
          <button @click="closeModal" class="modal__close" aria-label="Zamknij modal">✕</button>

          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const modalRef = ref<HTMLDivElement>()

function closeModal() {
  emit('close')
}

// Focus management
watch(
  () => props.show,
  async (newShow) => {
    if (newShow) {
      await nextTick()
      modalRef.value?.focus()
    }
  }
)
</script>

<style lang="scss" src="@/styles/components/modal.scss" scoped></style>
