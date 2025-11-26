
<script setup lang="ts">
import { computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'
import type { DeviceStatusModel } from '@/data/admin_data'

interface Props {
  device: DeviceStatusModel
  isSelected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: false
})

const emit = defineEmits<{
  click: []
  'view-details': [deviceId: string]
}>()

const getStatusColor = computed(() => {
  switch (props.device.status) {
    case 'Normal':
      return 'bg-green-100 text-green-800 border-green-300'
    case 'Fault':
      return 'bg-red-100 text-red-800 border-red-300'
    case 'Maintenance':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300'
  }
})

const getStatusLabel = computed(() => {
  switch (props.device.status) {
    case 'Normal':
      return '正常运行'
    case 'Fault':
      return '故障'
    case 'Maintenance':
      return '维护中'
    default:
      return '未知'
  }
})

const getStatusIcon = computed(() => {
  switch (props.device.status) {
    case 'Normal':
      return 'CheckCircle2'
    case 'Fault':
      return 'AlertCircle'
    case 'Maintenance':
      return 'Wrench'
    default:
      return 'HelpCircle'
  }
})

const getDeviceIcon = computed(() => {
  const type = props.device.type
  if (type.includes('传送带')) return 'Zap'
  if (type.includes('机器人')) return 'Bot'
  if (type.includes('货架')) return 'Package'
  return 'Package'
})

const handleClick = () => {
  emit('click')
}

const handleViewDetails = () => {
  emit('view-details', props.device.deviceId)
}
</script>

<template>
  <Card 
    :class="[
      'cursor-pointer transition-all hover:shadow-lg',
      isSelected ? 'ring-2 ring-primary' : ''
    ]"
    @click="handleClick"
  >
    <CardHeader class="pb-3">
      <div class="flex items-start justify-between">
        <div class="flex items-start space-x-3 flex-1">
          <div class="p-2 rounded-lg bg-primary/10">
            <SafeIcon :name="getDeviceIcon" :size="20" class="text-primary" />
          </div>
          <div class="flex-1">
            <CardTitle class="text-base">{{ device.name }}</CardTitle>
            <p class="text-xs text-muted-foreground mt-1">{{ device.type }}</p>
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent class="space-y-3">
      <!-- Status Badge -->
      <div class="flex items-center space-x-2">
        <SafeIcon :name="getStatusIcon" :size="16" :class="getStatusColor" />
        <Badge :class="getStatusColor" variant="outline">
          {{ getStatusLabel }}
        </Badge>
      </div>

      <!-- Device Info -->
      <div class="space-y-2 text-sm">
        <div class="flex items-center text-muted-foreground">
          <SafeIcon name="MapPin" :size="14" class="mr-2" />
          <span>{{ device.location }}</span>
        </div>
        <div class="flex items-center text-muted-foreground">
          <SafeIcon name="Clock" :size="14" class="mr-2" />
          <span>{{ device.lastUpdated }}</span>
        </div>
      </div>

      <!-- Alerts -->
      <div v-if="device.criticalAlerts > 0" class="p-2 bg-red-50 rounded border border-red-200">
        <p class="text-xs font-medium text-red-700">
          <SafeIcon name="AlertTriangle" :size="12" class="inline mr-1" />
          {{ device.criticalAlerts }} 个关键告警
        </p>
      </div>

      <!-- Action Button -->
      <Button 
        variant="outline" 
        size="sm" 
        class="w-full"
        @click.stop="handleViewDetails"
      >
        <SafeIcon name="ChevronRight" :size="16" class="mr-1" />
        查看详情
      </Button>
    </CardContent>
  </Card>
</template>
