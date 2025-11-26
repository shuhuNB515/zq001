
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { MOCK_CLIENT_PACKAGE_STATUS, type ClientPackageStatus } from '@/data/client_data'

const packageData = ref(MOCK_CLIENT_PACKAGE_STATUS)

const statusConfig: Record<ClientPackageStatus, { label: string; color: string; icon: string }> = {
  'Sorting': { label: '分拣中', color: 'bg-yellow-100 text-yellow-800', icon: 'Zap' },
  'Inbound': { label: '已入库', color: 'bg-blue-100 text-blue-800', icon: 'CheckCircle' },
  'AwaitingPickup': { label: '待取件', color: 'bg-purple-100 text-purple-800', icon: 'Clock' },
  'Delivered': { label: '已取件', color: 'bg-green-100 text-green-800', icon: 'CheckCircle2' }
}

const currentStatus = computed(() => statusConfig[packageData.value.status])

const handleReQuery = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './client-package-tracking-entry.html'
  }
}

const handleBackToDashboard = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './client-dashboard.html'
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-foreground mb-2">快件查询结果</h1>
        <p class="text-muted-foreground">查看您的快件实时状态和物流轨迹</p>
      </div>
      <Button variant="outline" @click="handleBackToDashboard">
        <SafeIcon name="ArrowLeft" :size="18" class="mr-2" />
        返回仪表盘
      </Button>
    </div>

    <!-- Package Status Card -->
    <Card class="border-2">
      <CardHeader class="pb-4">
        <div class="flex items-start justify-between">
          <div>
            <CardTitle class="text-2xl mb-2">{{ packageData.trackingNumber }}</CardTitle>
            <CardDescription>收件人：{{ packageData.receiver }}</CardDescription>
          </div>
          <Badge :class="currentStatus.color" class="text-base px-4 py-2">
            <SafeIcon :name="currentStatus.icon" :size="16" class="mr-2" />
            {{ currentStatus.label }}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="flex items-center space-x-3 p-3 bg-secondary/50 rounded-lg">
            <SafeIcon name="Calendar" :size="20" class="text-primary" />
            <div>
              <p class="text-xs text-muted-foreground">最后更新</p>
              <p class="font-semibold">{{ packageData.latestUpdateTime }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-3 p-3 bg-secondary/50 rounded-lg">
            <SafeIcon name="MapPin" :size="20" class="text-primary" />
            <div>
              <p class="text-xs text-muted-foreground">当前位置</p>
              <p class="font-semibold">{{ packageData.timeline[packageData.timeline.length - 1]?.location || '未知' }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-3 p-3 bg-secondary/50 rounded-lg">
            <SafeIcon name="Package" :size="20" class="text-primary" />
            <div>
              <p class="text-xs text-muted-foreground">快件状态</p>
              <p class="font-semibold">{{ currentStatus.label }}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Timeline Section -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center">
          <SafeIcon name="Route" :size="20" class="mr-2 text-primary" />
          物流轨迹
        </CardTitle>
        <CardDescription>完整的快件流转记录</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-0">
          <div
            v-for="(event, index) in packageData.timeline"
            :key="index"
            class="relative pb-8 last:pb-0"
          >
            <!-- Timeline Line -->
            <div v-if="index < packageData.timeline.length - 1" class="absolute left-6 top-12 w-0.5 h-12 bg-border"></div>

            <!-- Timeline Item -->
            <div class="flex gap-4">
              <!-- Timeline Dot -->
              <div class="relative flex flex-col items-center">
                <div class="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 z-10"></div>
              </div>

              <!-- Content -->
              <div class="flex-1 pt-1">
                <div class="flex items-start justify-between mb-1">
                  <p class="font-semibold text-foreground">{{ event.description }}</p>
                  <span class="text-xs text-muted-foreground whitespace-nowrap ml-4">{{ event.timestamp }}</span>
                </div>
                <p class="text-sm text-muted-foreground flex items-center">
                  <SafeIcon name="MapPin" :size="14" class="mr-1" />
                  {{ event.location }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
      <Button size="lg" @click="handleReQuery" class="sm:w-auto">
        <SafeIcon name="RotateCcw" :size="18" class="mr-2" />
        重新查询
      </Button>
      <Button size="lg" variant="outline" @click="handleBackToDashboard" class="sm:w-auto">
        <SafeIcon name="Home" :size="18" class="mr-2" />
        返回仪表盘
      </Button>
    </div>

    <!-- Additional Info -->
    <Card class="bg-accent/10 border-accent/20">
      <CardContent class="pt-6">
        <div class="flex items-start gap-3">
          <SafeIcon name="Info" :size="20" class="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p class="font-semibold text-foreground mb-1">温馨提示</p>
            <p class="text-sm text-muted-foreground">
              您的快件已进入智取未来网点，请在规定时间内取件。如有任何问题，请联系客服：400-123-4567
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
/* Timeline styling */
:deep(.timeline-item) {
  position: relative;
  padding-left: 2rem;
}

:deep(.timeline-dot) {
  position: absolute;
  left: 0;
  top: 0;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: hsl(var(--primary));
  box-shadow: 0 0 0 4px hsl(var(--primary) / 0.2);
}
</style>
