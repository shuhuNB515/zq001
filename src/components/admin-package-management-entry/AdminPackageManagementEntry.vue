
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon.vue'
import PackageStatsCard from './PackageStatsCard.vue'
import PackageListPreview from './PackageListPreview.vue'
import { MOCK_PACKAGE_RECORDS, type PackageRecordModel } from '@/data/admin_data'

const searchQuery = ref('')
const selectedStatus = ref('all')

// Calculate statistics
const stats = computed(() => {
  return {
    totalInbound: MOCK_PACKAGE_RECORDS.filter(r => r.status === 'Inbound').length,
    totalOutbound: MOCK_PACKAGE_RECORDS.filter(r => r.status === 'Delivered').length,
    sorting: MOCK_PACKAGE_RECORDS.filter(r => r.status === 'Sorting').length,
    awaitingPickup: MOCK_PACKAGE_RECORDS.filter(r => r.status === 'AwaitingPickup').length,
  }
})

// Filter records based on search and status
const filteredRecords = computed(() => {
  let filtered = MOCK_PACKAGE_RECORDS

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(r =>
      r.trackingNumber.toLowerCase().includes(query) ||
      r.customerName.toLowerCase().includes(query)
    )
  }

  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter(r => r.status === selectedStatus.value)
  }

  return filtered
})

const handleExport = () => {
  // Mock export functionality
  const csvContent = [
    ['单号', '状态', '入库时间', '出库时间', '分拣状态', '货架位置', '客户名称'],
    ...filteredRecords.value.map(r => [
      r.trackingNumber,
      r.status,
      r.entryTime,
      r.exitTime || '-',
      r.sortingStatus,
      r.shelfLocation,
      r.customerName,
    ])
  ]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `快件记录_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="border-b border-border bg-card p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-bold text-foreground">快件管理</h1>
          <p class="text-muted-foreground mt-2">查看和管理所有快件的入库、出库记录及分拣状态</p>
        </div>
        <Button
          variant="outline"
          size="lg"
          @click="() => window.location.href = './admin-dashboard.html'"
          class="gap-2"
        >
          <SafeIcon name="ArrowLeft" :size="18" />
          返回仪表盘
        </Button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PackageStatsCard
          title="今日入库"
          :value="stats.totalInbound"
          unit="件"
          icon="PackagePlus"
          color="bg-blue-50 text-blue-600"
        />
        <PackageStatsCard
          title="已出库"
          :value="stats.totalOutbound"
          unit="件"
          icon="CheckCircle"
          color="bg-green-50 text-green-600"
        />
        <PackageStatsCard
          title="分拣中"
          :value="stats.sorting"
          unit="件"
          icon="Zap"
          color="bg-yellow-50 text-yellow-600"
        />
        <PackageStatsCard
          title="待取件"
          :value="stats.awaitingPickup"
          unit="件"
          icon="Clock"
          color="bg-purple-50 text-purple-600"
        />
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-auto p-6">
      <Card class="h-full flex flex-col">
        <CardHeader class="border-b border-border">
          <div class="flex items-center justify-between">
            <div>
              <CardTitle>快件列表</CardTitle>
              <CardDescription>显示所有快件的详细信息</CardDescription>
            </div>
            <div class="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                @click="handleExport"
                class="gap-2"
              >
                <SafeIcon name="Download" :size="16" />
                导出数据
              </Button>
              <Button
                size="sm"
                @click="() => window.location.href = './admin-package-search-and-export.html'"
                class="gap-2"
              >
                <SafeIcon name="Search" :size="16" />
                高级搜索
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent class="flex-1 flex flex-col p-6">
          <!-- Search and Filter -->
          <div class="flex flex-col md:flex-row gap-4 mb-6">
            <div class="flex-1">
              <Input
                v-model="searchQuery"
                placeholder="搜索单号或客户名称..."
                class="w-full"
              />
            </div>
            <Tabs v-model="selectedStatus" class="w-full md:w-auto">
              <TabsList class="grid w-full grid-cols-5">
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="Inbound">入库</TabsTrigger>
                <TabsTrigger value="Sorting">分拣</TabsTrigger>
                <TabsTrigger value="AwaitingPickup">待取</TabsTrigger>
                <TabsTrigger value="Delivered">已出</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <!-- Package List -->
          <div class="flex-1 overflow-auto">
            <PackageListPreview
              :records="filteredRecords"
              @view-detail="(trackingNumber) => window.location.href = `./admin-package-detail.html?id=${trackingNumber}`"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
