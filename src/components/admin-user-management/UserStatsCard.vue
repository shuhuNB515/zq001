
<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'

interface Props {
  title: string
  value: string
  unit: string
  icon: string
  trend: 'up' | 'down' | 'flat'
}

defineProps<Props>()

const trendConfig = {
  up: { icon: 'TrendingUp', color: 'text-green-600', bg: 'bg-green-50' },
  down: { icon: 'TrendingDown', color: 'text-red-600', bg: 'bg-red-50' },
  flat: { icon: 'Minus', color: 'text-gray-600', bg: 'bg-gray-50' }
}
</script>

<template>
  <Card class="hover:shadow-card transition-shadow">
    <CardContent class="pt-6">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <p class="text-sm font-medium text-muted-foreground">{{ title }}</p>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="text-3xl font-bold text-foreground">{{ value }}</span>
            <span class="text-sm text-muted-foreground">{{ unit }}</span>
          </div>
        </div>
        <div class="flex flex-col items-end gap-2">
          <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <SafeIcon :name="icon" :size="24" class="text-primary" />
          </div>
          <div :class="[trendConfig[trend].bg, 'rounded px-2 py-1 flex items-center gap-1']">
            <SafeIcon
              :name="trendConfig[trend].icon"
              :size="14"
              :class="trendConfig[trend].color"
            />
            <span :class="[trendConfig[trend].color, 'text-xs font-medium']">
              {{ trend === 'up' ? '上升' : trend === 'down' ? '下降' : '平稳' }}
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
