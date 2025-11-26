
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { MOCK_PACKAGE_RECORDS, MOCK_PACKAGE_TIMELINE } from '@/data/admin_data'
import type { PackageRecordModel, TimelineEventModel } from '@/data/admin_data'
import PackageDetailHeader from './PackageDetailHeader.vue'
import PackageDetailTimeline from './PackageDetailTimeline.vue'

// Use first package record as default
const packageDetail = ref<PackageRecordModel>(MOCK_PACKAGE_RECORDS[0])
const timeline = ref<TimelineEventModel[]>(MOCK_PACKAGE_TIMELINE)

const getStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    'Inbound': '入库中',
    'Sorting': '分拣中',
    'AwaitingPickup': '待取件',
    'Outbound': '出库中',
    'Delivered': '已取件'
  }
  return statusMap[status] || status
}

const getStatusColor = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  const colorMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'Inbound': 'secondary',
    'Sorting': 'default',
    'AwaitingPickup': 'default',
    'Outbound': 'secondary',
    'Delivered': 'secondary'
  }
  return colorMap[status] || 'outline'
}

const handleGoBack = () => {
  if (typeof window !== 'undefined') {
    window.history.back()
  }
}
</script>

<template>
  <main class="flex-1 p-6">
    <!-- Header with Back Button -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-foreground">快件详情</h1>
        <p class="text-muted-foreground mt-1">查看快件的完整信息和操作记录</p>
      </div>
      <Button variant="outline" @click="handleGoBack">
        <SafeIcon name="ArrowLeft" :size="18" class="mr-2" />
        返回
      </Button>
    </div>

    <!-- Package Detail Header -->
    <PackageDetailHeader :package="packageDetail" />

    <!-- Basic Information -->
    <Card class="mb-6">
      <CardHeader>
        <CardTitle class="flex items-center">
          <SafeIcon name="Info" :size="20" class="mr-2 text-primary" />
          基本信息
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="text-sm text-muted-foreground mb-1">快件单号</p>
            <p class="text-lg font-semibold text-foreground">{{ packageDetail.trackingNumber }}</p>
          </div>
          <div>
            <p class="text-sm text-muted-foreground mb-1">客户名称</p>
            <p class="text-lg font-semibold text-foreground">{{ packageDetail.customerName }}</p>
          </div>
          <div>
            <p class="text-sm text-muted-foreground mb-1">当前状态</p>
            <Badge :variant="getStatusColor(packageDetail.status)" class="text-base">
              {{ getStatusLabel(packageDetail.status) }}
            </Badge>
          </div>
          <div>
            <p class="text-sm text-muted-foreground mb-1">分拣状态</p>
            <p class="text-lg font-semibold text-foreground">{{ packageDetail.sortingStatus }}</p>
          </div>
          <div>
            <p class="text-sm text-muted-foreground mb-1">入库时间</p>
            <p class="text-lg font-semibold text-foreground">{{ packageDetail.entryTime }}</p>
          </div>
          <div>
            <p class="text-sm text-muted-foreground mb-1">出库时间</p>
            <p class="text-lg font-semibold text-foreground">
              {{ packageDetail.exitTime || '未出库' }}
            </p>
          </div>
          <div>
            <p class="text-sm text-muted-foreground mb-1">当前位置</p>
            <p class="text-lg font-semibold text-foreground">{{ packageDetail.shelfLocation }}</p>
          </div>
          <div>
            <p class="text-sm text-muted-foreground mb-1">存储时长</p>
            <p class="text-lg font-semibold text-foreground">
              {{ packageDetail.exitTime ? '已取件' : '进行中' }}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Timeline -->
    <PackageDetailTimeline :events="timeline" />
  </main>
</template>
