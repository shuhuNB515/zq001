
<script setup lang="ts">
import type { DeliveryServiceTypeOption } from '@/data/client_data'
import SafeIcon from '@/components/common/SafeIcon.vue'

interface Props {
  options: DeliveryServiceTypeOption[]
  selected: string
}

const emit = defineEmits<{
  change: [typeId: string]
}>()

const getIconName = (serviceId: string): string => {
  const iconMap: Record<string, string> = {
    standard: 'Package',
    express: 'Zap',
    same_city: 'Rocket',
  }
  return iconMap[serviceId] || 'Package'
}

const handleSelect = (typeId: string) => {
  emit('change', typeId)
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <button
      v-for="option in options"
      :key="option.id"
      @click="handleSelect(option.id)"
      :class="[
        'relative p-6 rounded-lg border-2 transition-all duration-200 text-left',
        selected === option.id
          ? 'border-primary bg-primary/5 shadow-lg'
          : 'border-border bg-card hover:border-primary/50 hover:shadow-soft'
      ]"
    >
      <!-- Selection Indicator -->
      <div
        v-if="selected === option.id"
        class="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
      >
        <SafeIcon name="Check" :size="16" color="white" :stroke-width="3" />
      </div>

      <!-- Icon -->
      <div class="mb-3">
        <div
          :class="[
            'w-12 h-12 rounded-lg flex items-center justify-center',
            selected === option.id
              ? 'bg-primary text-white'
              : 'bg-secondary text-primary'
          ]"
        >
          <SafeIcon :name="getIconName(option.id)" :size="24" />
        </div>
      </div>

      <!-- Content -->
      <h3 class="font-semibold text-foreground mb-1">{{ option.name }}</h3>
      
      <div class="space-y-2 text-sm">
        <div class="flex items-center text-muted-foreground">
          <SafeIcon name="DollarSign" :size="16" class="mr-1" />
          <span>{{ option.estimatedPrice }}</span>
        </div>
        <div class="flex items-center text-muted-foreground">
          <SafeIcon name="Clock" :size="16" class="mr-1" />
          <span>{{ option.estimatedTime }}</span>
        </div>
      </div>
    </button>
  </div>
</template>
