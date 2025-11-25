
<script setup lang="ts">
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon.vue'
import type { PackageRecordStatus } from '@/data/admin_data'

interface Props {
  status: PackageRecordStatus
}

const props = defineProps<Props>()

const statusConfig = computed(() => {
  const config: Record<PackageRecordStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: string; color: string }> = {
    'Inbound': {
      label: '入库中',
      variant: 'outline',
      icon: 'ArrowDown',
      color: 'text-blue-600'
    },
    'Sorting': {
      label: '分拣中',
      variant: 'secondary',
      icon: 'Zap',
      color: 'text-amber-600'
    },
    'AwaitingPickup': {
      label: '待取件',
      variant: 'default',
      icon: 'Clock',
      color: 'text-orange-600'
    },
    'Outbound': {
      label: '出库中',
      variant: 'outline',
      icon: 'ArrowUp',
      color: 'text-purple-600'
    },
    'Delivered': {
      label: '已取件',
      variant: 'secondary',
      icon: 'CheckCircle2',
      color: 'text-green-600'
    }
  }
  return config[props.status]
})
</script>

<template>
  <Badge :variant="statusConfig.variant" class="gap-1">
    <SafeIcon :name="statusConfig.icon" :size="14" :class="statusConfig.color" />
    {{ statusConfig.label }}
  </Badge>
</template>
