
<script setup lang="ts">
import { PICKUP_OPTIONS } from '@/data/client_data'
import SafeIcon from '@/components/common/SafeIcon.vue'

const emit = defineEmits<{
  select: [method: 'face' | 'code' | 'phone']
}>()

const handleSelect = (id: string) => {
  if (id === 'face' || id === 'code' || id === 'phone') {
    emit('select', id)
  }
}
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold text-foreground mb-6">选择验证方式</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button
        v-for="option in PICKUP_OPTIONS"
        :key="option.id"
        @click="handleSelect(option.id)"
        class="group relative overflow-hidden rounded-lg border-2 border-border bg-background p-6 transition-all duration-300 hover:border-primary hover:shadow-lg hover:bg-accent/5"
      >
        <!-- Background gradient on hover -->
        <div class="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-300"></div>

        <!-- Content -->
        <div class="relative z-10 flex flex-col items-center text-center">
          <!-- Icon -->
          <div class="mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <SafeIcon 
              :name="option.iconName" 
              :size="32" 
              class="text-primary group-hover:text-primary transition-colors"
            />
          </div>

          <!-- Title -->
          <h3 class="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {{ option.title }}
          </h3>

          <!-- Description -->
          <p class="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            {{ option.description }}
          </p>

          <!-- Arrow indicator -->
          <div class="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <SafeIcon name="ArrowRight" :size="20" class="text-primary" />
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
button {
  cursor: pointer;
}

button:active {
  transform: scale(0.98);
}
</style>
