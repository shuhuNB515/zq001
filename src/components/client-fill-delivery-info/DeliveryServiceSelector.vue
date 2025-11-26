
<script setup lang="ts">
import type { DeliveryServiceTypeOption } from '@/data/client_data'
import { Card } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'

interface Props {
  service: DeliveryServiceTypeOption
  isSelected: boolean
}

const emit = defineEmits<{
  select: []
}>()

const props = defineProps<Props>()
</script>

<template>
  <Card
    :class="[
      'p-4 cursor-pointer transition-all border-2',
      isSelected
        ? 'border-primary bg-primary/5'
        : 'border-border hover:border-primary/50 hover:bg-accent/30'
    ]"
    @click="emit('select')"
  >
    <div class="flex items-start gap-3">
      <div
        :class="[
          'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5',
          isSelected
            ? 'border-primary bg-primary'
            : 'border-border'
        ]"
      >
        <SafeIcon
          v-if="isSelected"
          name="Check"
          :size="14"
          color="white"
          :stroke-width="3"
        />
      </div>
      
      <div class="flex-1 min-w-0">
        <h4 class="font-semibold text-sm mb-1">{{ service.name }}</h4>
        <div class="space-y-1">
          <p class="text-xs text-muted-foreground">
            <span class="font-medium text-primary">{{ service.estimatedPrice }}</span>
          </p>
          <p class="text-xs text-muted-foreground">
            配送：{{ service.estimatedTime }}
          </p>
        </div>
      </div>
    </div>
  </Card>
</template>
