
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { MOCK_USER_MANAGEMENT_DATA, MOCK_USER_ACTIVITY_STAT_IMAGE, type UserModel } from '@/data/admin_data'

// State
const searchQuery = ref('')
const filterType = ref('all')
const sortBy = ref('registrationDate')
const currentPage = ref(1)
const itemsPerPage = 10

// Computed
const filteredUsers = computed(() => {
  let result = [...MOCK_USER_MANAGEMENT_DATA]

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.phone.includes(query) ||
      user.userId.toLowerCase().includes(query)
    )
  }

  // Filter by type
  if (filterType.value !== 'all') {
    if (filterType.value === 'active') {
      result = result.filter(user => user.pickupCount + user.deliveryCount > 5)
    } else if (filterType.value === 'inactive') {
      result = result.filter(user => user.pickupCount + user.deliveryCount <= 5)
    }
  }

  // Sort
  if (sortBy.value === 'registrationDate') {
    result.sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime())
  } else if (sortBy.value === 'activity') {
    result.sort((a, b) => (b.pickupCount + b.deliveryCount) - (a.pickupCount + a.deliveryCount))
  } else if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  }

  return result
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredUsers.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage))

// Statistics
const totalUsers = MOCK_USER_MANAGEMENT_DATA.length
const activeUsers = MOCK_USER_MANAGEMENT_DATA.filter(u => u.pickupCount + u.deliveryCount > 5).length
const totalPickups = MOCK_USER_MANAGEMENT_DATA.reduce((sum, u) => sum + u.pickupCount, 0)
const totalDeliveries = MOCK_USER_MANAGEMENT_DATA.reduce((sum, u) => sum + u.deliveryCount, 0)

const handleViewDetails = (userId: string) => {
  window.location.href = `./admin-user-profile.html?id=${userId}`
}

const handleExport = () => {
  // Mock export functionality
  const csvContent = [
    ['用户ID', '姓名', '电话', '取件次数', '寄件次数', '最后验证类型', '最后验证时间', '注册日期'],
    ...filteredUsers.value.map(u => [
      u.userId,
      u.name,
      u.phone,
      u.pickupCount,
      u.deliveryCount,
      u.lastVerificationType,
      u.lastVerificationTime,
      u.registrationDate
    ])
  ]
  const csv = csvContent.map(row => row.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `user_statistics_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const handleBackToUserManagement = () => {
  window.location.href = './admin-user-management.html'
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="border-b border-border bg-background p-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-3xl font-bold text-foreground">用户数据统计</h1>
          <p class="text-muted-foreground mt-1">查看和分析所有用户的取寄件数据</p>
        </div>
        <Button variant="outline" @click="handleBackToUserManagement">
          <SafeIcon name="ArrowLeft" :size="18" class="mr-2" />
          返回用户管理
        </Button>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-auto p-6">
      <div class="space-y-6">
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="text-sm font-medium text-muted-foreground">总用户数</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-bold">{{ totalUsers }}</div>
              <p class="text-xs text-muted-foreground mt-1">已注册用户</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="text-sm font-medium text-muted-foreground">活跃用户</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-bold">{{ activeUsers }}</div>
              <p class="text-xs text-muted-foreground mt-1">取寄件次数 > 5</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="text-sm font-medium text-muted-foreground">总取件次数</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-bold">{{ totalPickups }}</div>
              <p class="text-xs text-muted-foreground mt-1">全部用户</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="text-sm font-medium text-muted-foreground">总寄件次数</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-bold">{{ totalDeliveries }}</div>
              <p class="text-xs text-muted-foreground mt-1">全部用户</p>
            </CardContent>
          </Card>
        </div>

        <!-- Activity Chart -->
        <Card>
          <CardHeader>
            <CardTitle>用户活跃度统计</CardTitle>
            <CardDescription>用户取寄件频率分布</CardDescription>
          </CardHeader>
          <CardContent>
            <img 
              :src="MOCK_USER_ACTIVITY_STAT_IMAGE.url" 
              alt="用户活跃度统计图表"
              class="w-full h-auto rounded-lg"
            />
          </CardContent>
        </Card>

        <!-- Filters and Search -->
        <Card>
          <CardHeader>
            <CardTitle>用户列表</CardTitle>
            <CardDescription>查看和管理所有用户数据</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <!-- Search and Filters -->
              <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-1">
                  <Input
                    v-model="searchQuery"
                    placeholder="搜索用户名、电话或用户ID..."
                    class="w-full"
                  />
                </div>
                <Select v-model="filterType">
                  <SelectTrigger class="w-full md:w-48">
                    <SelectValue placeholder="筛选用户类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部用户</SelectItem>
                    <SelectItem value="active">活跃用户</SelectItem>
                    <SelectItem value="inactive">非活跃用户</SelectItem>
                  </SelectContent>
                </Select>
                <Select v-model="sortBy">
                  <SelectTrigger class="w-full md:w-48">
                    <SelectValue placeholder="排序方式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="registrationDate">注册时间</SelectItem>
                    <SelectItem value="activity">活跃度</SelectItem>
                    <SelectItem value="name">姓名</SelectItem>
                  </SelectContent>
                </Select>
                <Button @click="handleExport" variant="outline">
                  <SafeIcon name="Download" :size="18" class="mr-2" />
                  导出数据
                </Button>
              </div>

              <!-- User Table -->
              <div class="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow class="bg-muted/50">
                      <TableHead>用户ID</TableHead>
                      <TableHead>姓名</TableHead>
                      <TableHead>电话</TableHead>
                      <TableHead class="text-center">取件次数</TableHead>
                      <TableHead class="text-center">寄件次数</TableHead>
                      <TableHead>最后验证</TableHead>
                      <TableHead>注册日期</TableHead>
                      <TableHead class="text-center">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow v-for="user in paginatedUsers" :key="user.userId" class="hover:bg-muted/50">
                      <TableCell class="font-mono text-sm">{{ user.userId }}</TableCell>
                      <TableCell class="font-medium">{{ user.name }}</TableCell>
                      <TableCell>{{ user.phone }}</TableCell>
                      <TableCell class="text-center">
                        <Badge variant="secondary">{{ user.pickupCount }}</Badge>
                      </TableCell>
                      <TableCell class="text-center">
                        <Badge variant="secondary">{{ user.deliveryCount }}</Badge>
                      </TableCell>
                      <TableCell>
                        <div class="text-sm">
                          <div class="font-medium">{{ user.lastVerificationType === 'Face' ? '人脸识别' : user.lastVerificationType === 'Code' ? '取件码' : '手机号' }}</div>
                          <div class="text-xs text-muted-foreground">{{ user.lastVerificationTime }}</div>
                        </div>
                      </TableCell>
                      <TableCell class="text-sm text-muted-foreground">{{ user.registrationDate }}</TableCell>
                      <TableCell class="text-center">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          @click="handleViewDetails(user.userId)"
                        >
                          <SafeIcon name="Eye" :size="16" class="mr-1" />
                          查看
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <!-- Pagination -->
              <div class="flex items-center justify-between pt-4">
                <p class="text-sm text-muted-foreground">
                  共 {{ filteredUsers.length }} 条记录，显示 {{ (currentPage - 1) * itemsPerPage + 1 }} 到 {{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }}
                </p>
                <div class="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    :disabled="currentPage === 1"
                    @click="currentPage = Math.max(1, currentPage - 1)"
                  >
                    <SafeIcon name="ChevronLeft" :size="16" />
                  </Button>
                  <div class="flex items-center gap-1">
                    <span class="text-sm text-muted-foreground">
                      第 {{ currentPage }} / {{ totalPages }} 页
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    :disabled="currentPage === totalPages"
                    @click="currentPage = Math.min(totalPages, currentPage + 1)"
                  >
                    <SafeIcon name="ChevronRight" :size="16" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.table) {
  width: 100%;
}
</style>
