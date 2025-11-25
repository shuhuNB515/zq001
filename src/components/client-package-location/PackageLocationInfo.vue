
<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'

interface Props {
  trackingNumber: string
  shelfId: string
  gridId: string
}

const props = defineProps<Props>()

const infoItems = [
  {
    label: '快件单号',
    value: props.trackingNumber,
    icon: 'Package'
  },
  {
    label: '货架编号',
    value: props.shelfId,
    icon: 'Grid3x3'
  },
  {
    label: '格子位置',
    value: props.gridId,
    icon: 'MapPin'
  }
]
</script>

<template>
  <Card class="shadow-card h-full">
    <CardHeader class="bg-gradient-to-r from-accent/10 to-primary/10 border-b">
      <CardTitle class="flex items-center">
        <SafeIcon name="Info" :size="20" class="mr-2 text-accent" />
        快件信息
      </CardTitle>
      <CardDescription>您的快件详细位置信息</CardDescription>
    </CardHeader>
    <CardContent class="p-6">
      <div class="space-y-6">
        <div v-for="(item, index) in infoItems" :key="index" class="pb-6 border-b last:border-b-0 last:pb-0">
          <div class="flex items-start space-x-3">
            <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <SafeIcon :name="item.icon" :size="18" class="text-primary" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-medium text-muted-foreground uppercase tracking-wide">{{ item.label }}</p>
              <p class="text-lg font-bold text-foreground mt-1 break-all">{{ item.value }}</p>
            </div>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="pt-4 border-t">
          <div class="bg-accent/5 rounded-lg p-4">
            <p class="text-xs font-medium text-muted-foreground mb-2 flex items-center">
              <SafeIcon name="AlertCircle" :size="14" class="mr-1.5" />
              温馨提示
            </p>
            <p class="text-sm text-foreground/80 leading-relaxed">
              您的快件已准备就绪，机器人正在为您取件。请在取件柜前等待，快件将在预计时间内送达。
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
