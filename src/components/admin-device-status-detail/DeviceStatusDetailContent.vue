
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon.vue'
import {
  MOCK_DEVICE_STATUS,
  MOCK_DEVICE_PERFORMANCE,
  MOCK_DEVICE_ALERTS,
  MOCK_ROS_ROBOT_DETAIL_IMAGE,
  type DeviceStatusModel,
  type PerformanceMetricModel,
  type AlertModel,
} from '@/data/admin_data'

// Initialize with first device (RB003 - ROS Robot)
const selectedDevice = ref<DeviceStatusModel>(MOCK_DEVICE_STATUS[1])
const performanceMetrics = ref<PerformanceMetricModel[]>(MOCK_DEVICE_PERFORMANCE)
const alerts = ref<AlertModel[]>(MOCK_DEVICE_ALERTS)
const deviceImageUrl = ref(MOCK_ROS_ROBOT_DETAIL_IMAGE.url)

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Normal':
      return 'bg-green-100 text-green-800'
    case 'Fault':
      return 'bg-red-100 text-red-800'
    case 'Maintenance':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'Normal':
      return '正常运行'
    case 'Fault':
      return '故障'
    case 'Maintenance':
      return '维护中'
    default:
      return '未知'
  }
}

const getAlertIcon = (level: string) => {
  switch (level) {
    case 'Error':
      return 'AlertCircle'
    case 'Warning':
      return 'AlertTriangle'
    case 'Info':
      return 'Info'
    default:
      return 'AlertCircle'
  }
}

const getAlertColor = (level: string) => {
  switch (level) {
    case 'Error':
      return 'border-red-200 bg-red-50'
    case 'Warning':
      return 'border-yellow-200 bg-yellow-50'
    case 'Info':
      return 'border-blue-200 bg-blue-50'
    default:
      return 'border-gray-200 bg-gray-50'
  }
}

const handleViewLogs = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-device-log-review.html'
  }
}

const handleViewMaintenance = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-device-maintenance-schedule.html'
  }
}

const handleBack = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-device-monitoring.html'
  }
}
</script>

<template>
  <main class="flex-1 overflow-auto">
    <div class="container mx-auto px-4 py-8">
      <!-- Header with Back Button -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center space-x-4">
          <Button variant="ghost" size="icon" @click="handleBack">
            <SafeIcon name="ArrowLeft" :size="24" />
          </Button>
          <div>
            <h1 class="text-3xl font-bold text-foreground">设备状态详情</h1>
            <p class="text-muted-foreground mt-1">实时监控设备运行状态和性能指标</p>
          </div>
        </div>
      </div>

      <!-- Device Header Card -->
      <Card class="mb-6 border-2">
        <CardHeader class="pb-4">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4">
              <div class="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <SafeIcon name="Cpu" :size="32" class="text-primary" />
              </div>
              <div>
                <CardTitle class="text-2xl">{{ selectedDevice.name }}</CardTitle>
                <CardDescription class="text-base mt-2">
                  {{ selectedDevice.type }} | {{ selectedDevice.location }}
                </CardDescription>
              </div>
            </div>
            <Badge :class="getStatusColor(selectedDevice.status)" class="text-lg px-4 py-2">
              {{ getStatusLabel(selectedDevice.status) }}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <SafeIcon name="Zap" :size="20" class="text-primary" />
              <div>
                <p class="text-sm text-muted-foreground">设备ID</p>
                <p class="font-semibold">{{ selectedDevice.deviceId }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <SafeIcon name="AlertCircle" :size="20" class="text-destructive" />
              <div>
                <p class="text-sm text-muted-foreground">严重警告</p>
                <p class="font-semibold">{{ selectedDevice.criticalAlerts }} 条</p>
              </div>
            </div>
            <div class="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <SafeIcon name="Clock" :size="20" class="text-accent" />
              <div>
                <p class="text-sm text-muted-foreground">最后更新</p>
                <p class="font-semibold">{{ selectedDevice.lastUpdated }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Device Image -->
      <Card class="mb-6 overflow-hidden">
        <CardHeader>
          <CardTitle>设备实时影像</CardTitle>
        </CardHeader>
        <CardContent>
          <img 
            :src="deviceImageUrl" 
            :alt="selectedDevice.name"
            class="w-full h-96 object-cover rounded-lg"
          />
        </CardContent>
      </Card>

      <!-- Performance Metrics -->
      <Card class="mb-6">
        <CardHeader>
          <CardTitle>性能指标</CardTitle>
          <CardDescription>设备当前运行状态的关键指标</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="metric in performanceMetrics" :key="metric.name" class="border rounded-lg p-4">
              <p class="text-sm text-muted-foreground mb-2">{{ metric.name }}</p>
              <div class="flex items-baseline space-x-2">
                <span class="text-3xl font-bold text-primary">{{ metric.value }}</span>
                <span class="text-sm text-muted-foreground">{{ metric.unit }}</span>
              </div>
              <div class="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-primary to-accent"
                  :style="{ width: `${Math.min(parseInt(metric.value), 100)}%` }"
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Alerts Section -->
      <Card class="mb-6">
        <CardHeader>
          <CardTitle>异常警告</CardTitle>
          <CardDescription>{{ alerts.length }} 条活跃警告</CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="alerts.length > 0" class="space-y-3">
            <Alert 
              v-for="(alert, index) in alerts" 
              :key="index"
              :class="getAlertColor(alert.level)"
            >
              <SafeIcon :name="getAlertIcon(alert.level)" :size="20" />
              <AlertTitle class="ml-2">{{ alert.timestamp }}</AlertTitle>
              <AlertDescription class="ml-6 mt-2">
                {{ alert.description }}
              </AlertDescription>
            </Alert>
          </div>
          <div v-else class="text-center py-8">
            <SafeIcon name="CheckCircle" :size="48" class="mx-auto text-green-500 mb-4" />
            <p class="text-muted-foreground">暂无警告，设备运行正常</p>
          </div>
        </CardContent>
      </Card>

      <!-- Action Buttons -->
      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <Button 
          variant="default" 
          size="lg"
          class="flex-1"
          @click="handleViewLogs"
        >
          <SafeIcon name="FileText" :size="20" class="mr-2" />
          查看设备日志
        </Button>
        <Button 
          variant="default" 
          size="lg"
          class="flex-1"
          @click="handleViewMaintenance"
        >
          <SafeIcon name="Wrench" :size="20" class="mr-2" />
          查看维护计划
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          class="flex-1"
          @click="handleBack"
        >
          <SafeIcon name="ArrowLeft" :size="20" class="mr-2" />
          返回设备监控
        </Button>
      </div>
    </div>
  </main>
</template>
