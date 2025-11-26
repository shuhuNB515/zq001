
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { MOCK_MAINTENANCE_PLANS, MOCK_MAINTENANCE_SCHEDULE_IMAGE } from '@/data/admin_data'
import type { MaintenancePlanModel } from '@/data/admin_data'

const selectedStatus = ref<'all' | 'Scheduled' | 'InProgress' | 'Completed'>('all')

const filteredPlans = computed(() => {
  if (selectedStatus.value === 'all') {
    return MOCK_MAINTENANCE_PLANS
  }
  return MOCK_MAINTENANCE_PLANS.filter(plan => plan.status === selectedStatus.value)
})

const statusConfig = {
  Scheduled: {
    label: '已排期',
    color: 'bg-blue-100 text-blue-800',
    icon: 'Clock'
  },
  InProgress: {
    label: '进行中',
    color: 'bg-yellow-100 text-yellow-800',
    icon: 'Wrench'
  },
  Completed: {
    label: '已完成',
    color: 'bg-green-100 text-green-800',
    icon: 'CheckCircle'
  }
}

const getStatusConfig = (status: string) => {
  return statusConfig[status as keyof typeof statusConfig] || { label: status, color: 'bg-gray-100 text-gray-800', icon: 'HelpCircle' }
}

const handleGoBack = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-device-monitoring.html'
  }
}

const stats = computed(() => {
  return {
    total: MOCK_MAINTENANCE_PLANS.length,
    scheduled: MOCK_MAINTENANCE_PLANS.filter(p => p.status === 'Scheduled').length,
    inProgress: MOCK_MAINTENANCE_PLANS.filter(p => p.status === 'InProgress').length,
    completed: MOCK_MAINTENANCE_PLANS.filter(p => p.status === 'Completed').length
  }
})
</script>

<template>
  <div class="flex flex-col h-full bg-background">
    <!-- Header -->
    <div class="border-b border-border bg-card">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <Button variant="ghost" size="icon" @click="handleGoBack">
              <SafeIcon name="ArrowLeft" :size="24" />
            </Button>
            <div>
              <h1 class="text-3xl font-bold text-foreground">设备维护计划</h1>
              <p class="text-sm text-muted-foreground mt-1">管理和查看所有智能设备的维护计划</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-auto">
      <div class="container mx-auto px-4 py-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="text-sm font-medium text-muted-foreground">总计划数</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-bold">{{ stats.total }}</div>
              <p class="text-xs text-muted-foreground mt-1">全部维护计划</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="text-sm font-medium text-muted-foreground">已排期</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-bold text-blue-600">{{ stats.scheduled }}</div>
              <p class="text-xs text-muted-foreground mt-1">待执行</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="text-sm font-medium text-muted-foreground">进行中</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-bold text-yellow-600">{{ stats.inProgress }}</div>
              <p class="text-xs text-muted-foreground mt-1">执行中</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="text-sm font-medium text-muted-foreground">已完成</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-bold text-green-600">{{ stats.completed }}</div>
              <p class="text-xs text-muted-foreground mt-1">已完成</p>
            </CardContent>
          </Card>
        </div>

        <!-- Tabs for filtering -->
        <Tabs :default-value="selectedStatus" @update:model-value="(val) => selectedStatus = val" class="mb-6">
          <TabsList class="grid w-full grid-cols-4">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="Scheduled">已排期</TabsTrigger>
            <TabsTrigger value="InProgress">进行中</TabsTrigger>
            <TabsTrigger value="Completed">已完成</TabsTrigger>
          </TabsList>
        </Tabs>

        <!-- Maintenance Plans Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card 
            v-for="plan in filteredPlans" 
            :key="plan.planId"
            class="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div class="flex items-start justify-between mb-2">
                <div class="flex-1">
                  <CardTitle class="text-lg">{{ plan.deviceName }}</CardTitle>
                  <CardDescription class="text-xs mt-1">计划ID: {{ plan.planId }}</CardDescription>
                </div>
                <Badge :class="getStatusConfig(plan.status).color" class="ml-2">
                  <SafeIcon :name="getStatusConfig(plan.status).icon" :size="14" class="mr-1" />
                  {{ getStatusConfig(plan.status).label }}
                </Badge>
              </div>
            </CardHeader>
            <CardContent class="space-y-4">
              <!-- Device Info -->
              <div class="flex items-start space-x-3 pb-4 border-b border-border">
                <SafeIcon name="Cpu" :size="20" class="text-primary mt-0.5 flex-shrink-0" />
                <div class="flex-1">
                  <p class="text-xs text-muted-foreground">设备ID</p>
                  <p class="text-sm font-medium">{{ plan.deviceId }}</p>
                </div>
              </div>

              <!-- Schedule Date -->
              <div class="flex items-start space-x-3 pb-4 border-b border-border">
                <SafeIcon name="Calendar" :size="20" class="text-primary mt-0.5 flex-shrink-0" />
                <div class="flex-1">
                  <p class="text-xs text-muted-foreground">计划日期</p>
                  <p class="text-sm font-medium">{{ plan.scheduledDate }}</p>
                </div>
              </div>

              <!-- Assignee -->
              <div class="flex items-start space-x-3 pb-4 border-b border-border">
                <SafeIcon name="User" :size="20" class="text-primary mt-0.5 flex-shrink-0" />
                <div class="flex-1">
                  <p class="text-xs text-muted-foreground">负责人</p>
                  <p class="text-sm font-medium">{{ plan.assignee }}</p>
                </div>
              </div>

              <!-- Description -->
              <div class="flex items-start space-x-3">
                <SafeIcon name="FileText" :size="20" class="text-primary mt-0.5 flex-shrink-0" />
                <div class="flex-1">
                  <p class="text-xs text-muted-foreground">维护内容</p>
                  <p class="text-sm text-foreground">{{ plan.description }}</p>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-2 pt-4 border-t border-border">
                <Button variant="outline" size="sm" class="flex-1">
                  <SafeIcon name="Eye" :size="16" class="mr-2" />
                  查看详情
                </Button>
                <Button 
                  v-if="plan.status === 'Scheduled'" 
                  variant="default" 
                  size="sm" 
                  class="flex-1"
                >
                  <SafeIcon name="Play" :size="16" class="mr-2" />
                  开始维护
                </Button>
                <Button 
                  v-else-if="plan.status === 'InProgress'" 
                  variant="default" 
                  size="sm" 
                  class="flex-1"
                >
                  <SafeIcon name="CheckCircle" :size="16" class="mr-2" />
                  标记完成
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Visualization Image -->
        <Card class="mb-8">
          <CardHeader>
            <CardTitle>维护计划可视化</CardTitle>
            <CardDescription>设备维护时间表和进度概览</CardDescription>
          </CardHeader>
          <CardContent>
<img 
              :src="MOCK_MAINTENANCE_SCHEDULE_IMAGE.url" 
              alt="维护计划可视化" 
              class="w-full h-auto rounded-lg object-cover"
            />
          </CardContent>
        </Card>

        <!-- Empty State -->
        <div v-if="filteredPlans.length === 0" class="text-center py-12">
          <SafeIcon name="Calendar" :size="48" class="mx-auto text-muted-foreground mb-4 opacity-50" />
          <h3 class="text-lg font-semibold text-foreground mb-2">暂无维护计划</h3>
          <p class="text-muted-foreground">当前筛选条件下没有维护计划</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.tabs) {
  @apply w-full;
}
</style>
