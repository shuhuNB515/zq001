
<script setup lang="ts">
import { ADMIN_DASHBOARD_STATS } from '@/data/admin_data'
import { Card, CardContent } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'

const stats = ADMIN_DASHBOARD_STATS
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <Card 
      v-for="stat in stats" 
      :key="stat.title"
      class="dashboard-stat-card hover:shadow-lg transition-all duration-300"
    >
      <CardContent class="p-6">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-muted-foreground mb-2">
              {{ stat.title }}
            </p>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-bold text-foreground">
                {{ stat.value }}
              </span>
              <span class="text-sm text-muted-foreground">
                {{ stat.unit }}
              </span>
            </div>
            <div class="mt-3 flex items-center gap-1">
              <SafeIcon 
                :name="stat.trend === 'up' ? 'TrendingUp' : stat.trend === 'down' ? 'TrendingDown' : 'Minus'"
                :size="16"
                :color="stat.trend === 'up' ? '#10b981' : stat.trend === 'down' ? '#ef4444' : '#6b7280'"
              />
              <span 
                class="text-xs font-medium"
                :class="{
                  'text-green-600': stat.trend === 'up',
                  'text-red-600': stat.trend === 'down',
                  'text-gray-600': stat.trend === 'flat'
                }"
              >
                {{ stat.trend === 'up' ? '上升' : stat.trend === 'down' ? '下降' : '平稳' }}
              </span>
            </div>
          </div>
          <div class="ml-4 p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
            <SafeIcon 
              :name="stat.iconName" 
              :size="24" 
              color="hsl(var(--primary))"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.dashboard-stat-card {
  @apply border border-border bg-card;
}

.dashboard-stat-card:hover {
  @apply border-primary/50;
}
</style>
