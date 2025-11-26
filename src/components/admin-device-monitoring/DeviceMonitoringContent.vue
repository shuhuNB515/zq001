
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon.vue'
import DeviceStatusCard from '@/components/admin-device-monitoring/DeviceStatusCard.vue'
import DeviceMonitoringActions from '@/components/admin-device-monitoring/DeviceMonitoringActions.vue'
import { MOCK_DEVICE_STATUS, MOCK_DEVICE_MONITORING_IMAGE } from '@/data/admin_data'

const devices = ref(MOCK_DEVICE_STATUS)
const selectedDevice = ref<typeof MOCK_DEVICE_STATUS[0] | null>(null)
const isLoading = ref(false)

const handleDeviceClick = (device: typeof MOCK_DEVICE_STATUS[0]) => {
  selectedDevice.value = device
}

const handleViewDetails = (deviceId: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = `./admin-device-status-detail.html?id=${deviceId}`
  }
}

const handleGoBack = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-dashboard.html'
  }
}

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

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Normal':
      return 'CheckCircle2'
    case 'Fault':
      return 'AlertCircle'
    case 'Maintenance':
      return 'Wrench'
    default:
      return 'HelpCircle'
  }
}

const normalDevices = devices.value.filter(d => d.status === 'Normal').length
const faultDevices = devices.value.filter(d => d.status === 'Fault').length
const maintenanceDevices = devices.value.filter(d => d.status === 'Maintenance').length
</script>

<template>
  <div class="flex flex-col h-full bg-background">
    <!-- Header -->
    <div class="border-b border-border bg-card p-6">
      <div class="flex items-center justify-between">
        <div>
          <div class="flex items-center space-x-3 mb-2">
            <Button variant="ghost" size="icon" @click="handleGoBack" class="h-8 w-8">
              <SafeIcon name="ArrowLeft" :size="20" />
            </Button>
            <h1 class="text-3xl font-bold text-foreground">设备监控</h1>
          </div>
          <p class="text-muted-foreground ml-11">实时监控智能物流设备运行状态</p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-auto p-6">
      <div class="space-y-6">
        <!-- Status Summary -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="text-sm font-medium text-muted-foreground">正常运行</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-bold text-green-600">{{ normalDevices }}</div>
              <p class="text-xs text-muted-foreground mt-1">台设备</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="text-sm font-medium text-muted-foreground">故障</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-bold text-red-600">{{ faultDevices }}</div>
              <p class="text-xs text-muted-foreground mt-1">台设备</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="text-sm font-medium text-muted-foreground">维护中</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-bold text-yellow-600">{{ maintenanceDevices }}</div>
              <p class="text-xs text-muted-foreground mt-1">台设备</p>
            </CardContent>
          </Card>
        </div>

        <!-- Device Monitoring Visualization -->
        <Card>
          <CardHeader>
            <CardTitle>设备监控可视化</CardTitle>
            <CardDescription>实时设备运行状态和位置分布</CardDescription>
          </CardHeader>
          <CardContent>
            <img 
              :src="MOCK_DEVICE_MONITORING_IMAGE.url" 
              alt="设备监控可视化" 
              class="w-full h-auto rounded-lg object-cover"
            />
          </CardContent>
        </Card>

        <!-- Device List -->
        <Card>
          <CardHeader>
            <CardTitle>设备列表</CardTitle>
            <CardDescription>点击设备卡片查看详细信息</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DeviceStatusCard
                v-for="device in devices"
                :key="device.deviceId"
                :device="device"
                :is-selected="selectedDevice?.deviceId === device.deviceId"
                @click="handleDeviceClick(device)"
                @view-details="handleViewDetails"
              />
            </div>
          </CardContent>
        </Card>

        <!-- Quick Actions -->
        <DeviceMonitoringActions />
      </div>
    </div>
  </div>
</template>
