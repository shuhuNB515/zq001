
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SafeIcon from '@/components/common/SafeIcon.vue'
import PackageManagementTable from './PackageManagementTable.vue'
import { MOCK_PACKAGE_RECORDS } from '@/data/admin_data'
import type { PackageRecordModel } from '@/data/admin_data'

const searchQuery = ref('')
const filteredRecords = computed(() => {
  if (!searchQuery.value.trim()) {
    return MOCK_PACKAGE_RECORDS
  }
  return MOCK_PACKAGE_RECORDS.filter(record =>
    record.trackingNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    record.customerName.includes(searchQuery.value)
  )
})

const handleExport = () => {
  // 模拟导出功能
  const csvContent = [
    ['单号', '状态', '入库时间', '出库时间', '分拣状态', '货架位置', '客户名称'],
    ...filteredRecords.value.map(record => [
      record.trackingNumber,
      getStatusLabel(record.status),
      record.entryTime,
      record.exitTime || '-',
      record.sortingStatus,
      record.shelfLocation,
      record.customerName
    ])
  ]
  
  const csv = csvContent.map(row => row.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `快件记录_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

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

const handleBack = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-dashboard.html'
  }
}
</script>

<template>
  <div class="flex flex-col h-full bg-background">
    <!-- Header Section -->
    <div class="border-b border-border bg-card p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-bold text-foreground">快件管理</h1>
          <p class="text-muted-foreground mt-2">查看和管理所有快件的入库、出库记录和分拣状态</p>
        </div>
        <Button variant="outline" @click="handleBack" class="gap-2">
          <SafeIcon name="ArrowLeft" :size="18" />
          返回管理主页
        </Button>
      </div>

      <!-- Search and Export Section -->
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <SafeIcon 
              name="Search" 
              :size="18" 
              class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              v-model="searchQuery"
              type="text"
              placeholder="搜索单号或客户名称..."
              class="pl-10 h-10"
            />
          </div>
        </div>
        <Button @click="handleExport" variant="outline" class="gap-2 whitespace-nowrap">
          <SafeIcon name="Download" :size="18" />
          批量导出
        </Button>
      </div>
    </div>

    <!-- Table Section -->
    <div class="flex-1 overflow-auto p-6">
      <PackageManagementTable :records="filteredRecords" />
    </div>

    <!-- Footer Stats -->
    <div class="border-t border-border bg-card p-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center">
          <p class="text-2xl font-bold text-primary">{{ MOCK_PACKAGE_RECORDS.length }}</p>
          <p class="text-sm text-muted-foreground">总快件数</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-blue-500">{{ MOCK_PACKAGE_RECORDS.filter(r => r.status === 'Sorting').length }}</p>
          <p class="text-sm text-muted-foreground">分拣中</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-amber-500">{{ MOCK_PACKAGE_RECORDS.filter(r => r.status === 'AwaitingPickup').length }}</p>
          <p class="text-sm text-muted-foreground">待取件</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-green-500">{{ MOCK_PACKAGE_RECORDS.filter(r => r.status === 'Delivered').length }}</p>
          <p class="text-sm text-muted-foreground">已取件</p>
        </div>
      </div>
    </div>
  </div>
</template>
