
<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon.vue'
import type { PackageRecordModel } from '@/data/admin_data'

interface Props {
  package: PackageRecordModel
}

defineProps<Props>()

const getStatusIcon = (status: string): string => {
  const iconMap: Record<string, string> = {
    'Inbound': 'LogIn',
    'Sorting': 'Shuffle',
    'AwaitingPickup': 'Clock',
    'Outbound': 'LogOut',
    'Delivered': 'CheckCircle'
  }
  return iconMap[status] || 'Package'
}

const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    'Inbound': '#3b82f6',
    'Sorting': '#f59e0b',
    'AwaitingPickup': '#8b5cf6',
    'Outbound': '#10b981',
    'Delivered': '#06b6d4'
  }
  return colorMap[status] || '#6b7280'
}
</script>

<template>
  <Card class="mb-6 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
    <CardContent class="pt-6">
      <div class="flex items-start justify-between">
        <div class="flex items-start space-x-4">
          <div 
            class="w-16 h-16 rounded-lg flex items-center justify-center"
            :style="{ backgroundColor: getStatusColor(package.status) + '20' }"
          >
            <SafeIcon 
              :name="getStatusIcon(package.status)" 
              :size="32" 
              :color="getStatusColor(package.status)"
            />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-foreground">{{ package.trackingNumber }}</h2>
            <p class="text-muted-foreground mt-1">{{ package.customerName }} 的快件</p>
            <div class="mt-3 flex items-center space-x-2">
              <Badge variant="default" class="text-base">
                {{ package.status === 'Inbound' ? '入库中' : 
                   package.status === 'Sorting' ? '分拣中' :
                   package.status === 'AwaitingPickup' ? '待取件' :
                   package.status === 'Outbound' ? '出库中' :
                   package.status === 'Delivered' ? '已取件' : package.status }}
              </Badge>
              <span class="text-sm text-muted-foreground">
                {{ package.sortingStatus }}
              </span>
            </div>
          </div>
        </div>
        <div class="text-right">
          <p class="text-sm text-muted-foreground">当前位置</p>
          <p class="text-xl font-semibold text-foreground mt-1">{{ package.shelfLocation }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
