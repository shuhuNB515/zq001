
<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'
import type { TimelineEventModel } from '@/data/admin_data'

interface Props {
  events: TimelineEventModel[]
}

defineProps<Props>()

const getEventIcon = (description: string): string => {
  if (description.includes('入库')) return 'LogIn'
  if (description.includes('分拣')) return 'Shuffle'
  if (description.includes('入架')) return 'Package'
  if (description.includes('出库')) return 'LogOut'
  if (description.includes('核验')) return 'CheckCircle'
  return 'Clock'
}

const getEventColor = (index: number): string => {
  const colors = ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981', '#06b6d4']
  return colors[index % colors.length]
}
</script>

<template>
   <Card>
     <CardHeader>
       <CardTitle class="flex items-center">
         <SafeIcon name="History" :size="20" class="mr-2 text-primary" />
         操作记录时间线
       </CardTitle>
     </CardHeader>
     <CardContent>
      <div class="space-y-6">
        <div 
          v-for="(event, index) in events" 
          :key="index"
          class="flex gap-4"
        >
          <!-- Timeline Dot and Line -->
          <div class="flex flex-col items-center">
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              :style="{ backgroundColor: getEventColor(index) + '20' }"
            >
              <SafeIcon 
                :name="getEventIcon(event.description)" 
                :size="20"
                :color="getEventColor(index)"
              />
            </div>
            <div 
              v-if="index < events.length - 1"
              class="w-0.5 h-12 mt-2"
              :style="{ backgroundColor: getEventColor(index) + '40' }"
            />
          </div>

          <!-- Event Content -->
          <div class="flex-1 pt-1">
            <div class="flex items-start justify-between">
              <div>
                <p class="font-semibold text-foreground">{{ event.description }}</p>
                <p class="text-sm text-muted-foreground mt-1">
                  <SafeIcon name="MapPin" :size="14" class="inline mr-1" />
                  {{ event.location }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-muted-foreground">
                  {{ event.timestamp }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
