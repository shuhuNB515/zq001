
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'
import RFIDVisualization from './RFIDVisualization.vue'
import RFIDDataTable from './RFIDDataTable.vue'
import { MOCK_RFID_DATA, MOCK_RFID_VISUALIZATION_IMAGE } from '@/data/admin_data'

const activeTab = ref<'visualization' | 'table'>('visualization')
const rfidData = MOCK_RFID_DATA
const visualizationImage = MOCK_RFID_VISUALIZATION_IMAGE.url

const handleBack = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-device-monitoring.html'
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="border-b border-border bg-card p-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <Button variant="ghost" size="icon" @click="handleBack">
            <SafeIcon name="ArrowLeft" :size="20" />
          </Button>
          <div>
            <h1 class="text-3xl font-bold text-foreground">RFID数据视图</h1>
            <p class="text-sm text-muted-foreground mt-1">智能货架实时定位数据</p>
          </div>
        </div>
        <div class="flex items-center space-x-2 text-sm text-muted-foreground">
          <SafeIcon name="RefreshCw" :size="16" />
          <span>实时更新中</span>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="flex space-x-2">
        <Button
          :variant="activeTab === 'visualization' ? 'default' : 'outline'"
          size="sm"
          @click="activeTab = 'visualization'"
        >
          <SafeIcon name="Grid3x3" :size="16" class="mr-2" />
          货架可视化
        </Button>
        <Button
          :variant="activeTab === 'table' ? 'default' : 'outline'"
          size="sm"
          @click="activeTab = 'table'"
        >
          <SafeIcon name="Table2" :size="16" class="mr-2" />
          数据表格
        </Button>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-auto p-6">
      <!-- Visualization Tab -->
      <div v-if="activeTab === 'visualization'" class="space-y-6">
        <!-- Info Card -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center">
              <SafeIcon name="Info" :size="20" class="mr-2 text-blue-500" />
              RFID定位系统
            </CardTitle>
            <CardDescription>
              实时显示智能货架中快件的精确位置和移动轨迹
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="p-4 bg-accent/50 rounded-lg">
                <p class="text-sm text-muted-foreground">在架快件总数</p>
                <p class="text-2xl font-bold text-foreground">{{ rfidData.length }}</p>
              </div>
              <div class="p-4 bg-accent/50 rounded-lg">
                <p class="text-sm text-muted-foreground">货架行数</p>
                <p class="text-2xl font-bold text-foreground">8</p>
              </div>
              <div class="p-4 bg-accent/50 rounded-lg">
                <p class="text-sm text-muted-foreground">每行格位数</p>
                <p class="text-2xl font-bold text-foreground">20</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Visualization -->
        <RFIDVisualization :rfid-data="rfidData" :visualization-image="visualizationImage" />
      </div>

      <!-- Table Tab -->
      <div v-else>
        <RFIDDataTable :rfid-data="rfidData" />
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.rfid-container) {
  @apply space-y-6;
}
</style>
