
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { MOCK_DEVICE_LOGS, MOCK_DEVICE_STATUS } from '@/data/admin_data'
import type { DeviceLogModel } from '@/data/admin_data'

// 获取当前设备信息（从URL或使用第一个设备作为默认）
const selectedDeviceId = ref('RB003')
const selectedDevice = computed(() => {
  return MOCK_DEVICE_STATUS.find(d => d.deviceId === selectedDeviceId.value) || MOCK_DEVICE_STATUS[0]
})

// 日志过滤
const searchQuery = ref('')
const selectedLevel = ref<'ALL' | 'INFO' | 'WARN' | 'ERROR'>('ALL')

const filteredLogs = computed(() => {
  return MOCK_DEVICE_LOGS.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         log.component.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesLevel = selectedLevel.value === 'ALL' || log.level === selectedLevel.value
    return matchesSearch && matchesLevel
  })
})

// 获取日志级别的样式
const getLevelBadgeVariant = (level: string) => {
  switch (level) {
    case 'ERROR':
      return 'destructive'
    case 'WARN':
      return 'secondary'
    case 'INFO':
    default:
      return 'default'
  }
}

// 获取日志级别的图标
const getLevelIcon = (level: string) => {
  switch (level) {
    case 'ERROR':
      return 'AlertCircle'
    case 'WARN':
      return 'AlertTriangle'
    case 'INFO':
    default:
      return 'Info'
  }
}

// 格式化时间
const formatTime = (timestamp: string) => {
  return timestamp
}

// 返回设备状态详情页
const handleGoBack = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-device-status-detail.html'
  }
}
</script>

<template>
  <div class="flex flex-col h-full bg-background">
    <!-- 页面头部 -->
    <div class="border-b border-border bg-card p-6">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-4">
          <Button variant="ghost" size="icon" @click="handleGoBack">
            <SafeIcon name="ArrowLeft" :size="20" />
          </Button>
          <div>
            <h1 class="text-3xl font-bold text-foreground">设备日志审查</h1>
            <p class="text-sm text-muted-foreground mt-1">
              设备：{{ selectedDevice.name }} ({{ selectedDevice.deviceId }})
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-2 px-4 py-2 bg-muted rounded-lg">
          <SafeIcon name="Clock" :size="18" class="text-muted-foreground" />
          <span class="text-sm text-muted-foreground">实时更新</span>
        </div>
      </div>

      <!-- 过滤器 -->
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <Input
            v-model="searchQuery"
            placeholder="搜索日志内容或组件..."
            class="w-full"
          />
        </div>
        <Select v-model="selectedLevel">
          <SelectTrigger class="w-full md:w-48">
            <SelectValue placeholder="选择日志级别" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">全部级别</SelectItem>
            <SelectItem value="INFO">信息 (INFO)</SelectItem>
            <SelectItem value="WARN">警告 (WARN)</SelectItem>
            <SelectItem value="ERROR">错误 (ERROR)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- 日志表格 -->
    <div class="flex-1 overflow-auto p-6">
      <div class="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow class="bg-muted/50 hover:bg-muted/50">
              <TableHead class="w-48">时间戳</TableHead>
              <TableHead class="w-32">级别</TableHead>
              <TableHead class="w-32">组件</TableHead>
              <TableHead>消息</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(log, index) in filteredLogs" :key="index" class="hover:bg-muted/30">
              <TableCell class="font-mono text-sm text-muted-foreground">
                {{ formatTime(log.timestamp) }}
              </TableCell>
              <TableCell>
                <Badge :variant="getLevelBadgeVariant(log.level)" class="flex w-fit items-center gap-1">
                  <SafeIcon :name="getLevelIcon(log.level)" :size="14" />
                  {{ log.level }}
                </Badge>
              </TableCell>
              <TableCell class="font-mono text-sm font-medium">
                {{ log.component }}
              </TableCell>
              <TableCell class="text-sm">
                {{ log.message }}
              </TableCell>
            </TableRow>
            <TableRow v-if="filteredLogs.length === 0">
              <TableCell colspan="4" class="text-center py-8 text-muted-foreground">
                <div class="flex flex-col items-center justify-center">
                  <SafeIcon name="Search" :size="32" class="mb-2 opacity-50" />
                  <p>未找到匹配的日志记录</p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <!-- 日志统计 -->
      <div v-if="filteredLogs.length > 0" class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-card border border-border rounded-lg p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-muted-foreground">总日志数</p>
              <p class="text-2xl font-bold text-foreground">{{ filteredLogs.length }}</p>
            </div>
            <SafeIcon name="FileText" :size="32" class="text-muted-foreground opacity-50" />
          </div>
        </div>
        <div class="bg-card border border-border rounded-lg p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-muted-foreground">错误数</p>
              <p class="text-2xl font-bold text-destructive">
                {{ filteredLogs.filter(l => l.level === 'ERROR').length }}
              </p>
            </div>
            <SafeIcon name="AlertCircle" :size="32" class="text-destructive opacity-50" />
          </div>
        </div>
        <div class="bg-card border border-border rounded-lg p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-muted-foreground">警告数</p>
              <p class="text-2xl font-bold text-yellow-600">
                {{ filteredLogs.filter(l => l.level === 'WARN').length }}
              </p>
            </div>
            <SafeIcon name="AlertTriangle" :size="32" class="text-yellow-600 opacity-50" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 确保表格在小屏幕上可滚动 */
:deep(.overflow-auto) {
  -webkit-overflow-scrolling: touch;
}
</style>
