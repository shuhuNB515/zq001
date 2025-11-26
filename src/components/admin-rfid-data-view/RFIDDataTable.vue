
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import SafeIcon from '@/components/common/SafeIcon.vue'
import type { RFIDLocationModel } from '@/data/admin_data'

interface Props {
  rfidData: RFIDLocationModel[]
}

const props = defineProps<Props>()

const searchQuery = ref('')
const sortBy = ref<'tagId' | 'location' | 'lastSeen'>('tagId')

const filteredData = computed(() => {
  let result = [...props.rfidData]

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(item =>
      item.tagId.toLowerCase().includes(query) ||
      item.packageDesc.toLowerCase().includes(query)
    )
  }

  // Sort
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'tagId':
        return a.tagId.localeCompare(b.tagId)
      case 'location':
        return a.location[0] - b.location[0] || a.location[1] - b.location[1]
      case 'lastSeen':
        return b.lastSeen.localeCompare(a.lastSeen)
      default:
        return 0
    }
  })

  return result
})

const handleExport = () => {
  // Create CSV content
  const headers = ['快件单号', '位置(行)', '位置(列)', '包裹描述', '最后扫描时间']
  const rows = filteredData.value.map(item => [
    item.tagId,
    item.location[0],
    item.location[1],
    item.packageDesc,
    item.lastSeen
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  // Download CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `rfid-data-${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <div>
          <CardTitle class="flex items-center">
            <SafeIcon name="Table2" :size="20" class="mr-2" />
            RFID数据表格
          </CardTitle>
          <CardDescription>
            共 {{ filteredData.length }} 件快件
          </CardDescription>
        </div>
        <Button size="sm" @click="handleExport">
          <SafeIcon name="Download" :size="16" class="mr-2" />
          导出数据
        </Button>
      </div>
    </CardHeader>

    <CardContent>
      <div class="space-y-4">
        <!-- Search and Sort -->
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <Input
              v-model="searchQuery"
              placeholder="搜索快件单号或包裹描述..."
              class="w-full"
            />
          </div>
          <div class="flex gap-2">
            <Button
              :variant="sortBy === 'tagId' ? 'default' : 'outline'"
              size="sm"
              @click="sortBy = 'tagId'"
            >
              按单号
            </Button>
            <Button
              :variant="sortBy === 'location' ? 'default' : 'outline'"
              size="sm"
              @click="sortBy = 'location'"
            >
              按位置
            </Button>
            <Button
              :variant="sortBy === 'lastSeen' ? 'default' : 'outline'"
              size="sm"
              @click="sortBy = 'lastSeen'"
            >
              按时间
            </Button>
          </div>
        </div>

        <!-- Table -->
        <div class="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-32">快件单号</TableHead>
                <TableHead class="w-24">行号</TableHead>
                <TableHead class="w-24">列号</TableHead>
                <TableHead class="flex-1">包裹描述</TableHead>
                <TableHead class="w-32">最后扫描</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="item in filteredData" :key="item.tagId" class="hover:bg-accent/50">
                <TableCell class="font-mono text-sm">{{ item.tagId }}</TableCell>
                <TableCell class="text-center">{{ item.location[0] }}</TableCell>
                <TableCell class="text-center">{{ item.location[1] }}</TableCell>
                <TableCell>
                  <div class="flex items-center space-x-2">
                    <div
                      class="w-3 h-3 rounded-full"
                      :class="{
                        'bg-blue-500': item.packageDesc.includes('文件'),
                        'bg-yellow-500': item.packageDesc.includes('中型'),
                        'bg-red-500': item.packageDesc.includes('大型'),
                        'bg-green-500': !item.packageDesc.includes('文件') && !item.packageDesc.includes('中型') && !item.packageDesc.includes('大型')
                      }"
                    ></div>
                    <span>{{ item.packageDesc }}</span>
                  </div>
                </TableCell>
                <TableCell class="text-sm text-muted-foreground">{{ item.lastSeen }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredData.length === 0" class="text-center py-8">
          <SafeIcon name="Search" :size="32" class="mx-auto text-muted-foreground mb-2 opacity-50" />
          <p class="text-muted-foreground">未找到匹配的快件</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
