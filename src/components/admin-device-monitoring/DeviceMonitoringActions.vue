
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'

const handleRFIDData = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-rfid-data-view.html'
  }
}

const handleMaintenanceSchedule = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-device-maintenance-schedule.html'
  }
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>快速操作</CardTitle>
      <CardDescription>访问设备相关功能</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          class="h-auto py-4 flex flex-col items-center justify-center space-y-2"
          @click="handleRFIDData"
        >
          <SafeIcon name="Radio" :size="24" class="text-primary" />
          <span class="text-sm font-medium">RFID数据视图</span>
          <span class="text-xs text-muted-foreground">查看货物位置和轨迹</span>
        </Button>
        <Button 
          variant="outline" 
          class="h-auto py-4 flex flex-col items-center justify-center space-y-2"
          @click="handleMaintenanceSchedule"
        >
          <SafeIcon name="Calendar" :size="24" class="text-primary" />
          <span class="text-sm font-medium">维护计划</span>
          <span class="text-xs text-muted-foreground">查看和安排设备维护</span>
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
