
<script setup lang="ts">
import SafeIcon from '@/components/common/SafeIcon.vue'

interface Props {
  title: string
  value: number | string
  unit: string
  icon: string
  color: string
}

defineProps<Props>()
</script>

<template>
  <div :class="['rounded-lg border border-border p-4 transition-all hover:shadow-card', color]">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium opacity-75">{{ title }}</p>
        <p class="text-2xl font-bold mt-2">{{ value }}<span class="text-lg ml-1">{{ unit }}</span></p>
      </div>
      <div class="p-2 rounded-lg bg-white/20">
        <SafeIcon :name="icon" :size="24" />
      </div>
    </div>
  </div>
</template>
