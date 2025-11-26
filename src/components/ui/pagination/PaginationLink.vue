<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  isActive?: boolean
}>(), {
  isActive: false,
})

defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    data-slot="pagination-link"
    type="button"
    :class="cn('w-full h-full', props.class)"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>