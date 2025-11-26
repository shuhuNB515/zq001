
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { MOCK_PACKAGE_RECORDS } from '@/data/admin_data'

const isExporting = ref(false)

const exportToCSV = () => {
  isExporting.value = true
  
  try {
    // Prepare CSV headers
    const headers = ['快件单号', '客户名称', '入库时间', '出库时间', '分拣状态', '货架位置', '当前状态']
    
    // Prepare CSV rows
    const rows = MOCK_PACKAGE_RECORDS.map(pkg => [
      pkg.trackingNumber,
      pkg.customerName,
      pkg.entryTime,
      pkg.exitTime || '-',
      pkg.sortingStatus,
      pkg.shelfLocation,
      getStatusLabel(pkg.status),
    ])
    
    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `快件数据_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } finally {
    isExporting.value = false
  }
}

const exportToJSON = () => {
  isExporting.value = true
  
  try {
    const jsonContent = JSON.stringify(MOCK_PACKAGE_RECORDS, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `快件数据_${new Date().toISOString().split('T')[0]}.json`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } finally {
    isExporting.value = false
  }
}

const getStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    'Inbound': '已入库',
    'Sorting': '分拣中',
    'AwaitingPickup': '待取件',
    'Outbound': '已出库',
    'Delivered': '已送达',
  }
  return statusMap[status] || status
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button 
        class="bg-primary hover:bg-primary/90"
        :disabled="isExporting"
      >
        <SafeIcon 
          :name="isExporting ? 'Loader' : 'Download'" 
          :size="18" 
          class="mr-2"
          :class="{ 'animate-spin': isExporting }"
        />
        {{ isExporting ? '导出中...' : '导出数据' }}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-48">
      <DropdownMenuItem @click="exportToCSV" class="cursor-pointer">
        <SafeIcon name="FileText" :size="16" class="mr-2" />
        <span>导出为 CSV</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="exportToJSON" class="cursor-pointer">
        <SafeIcon name="Code" :size="16" class="mr-2" />
        <span>导出为 JSON</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
