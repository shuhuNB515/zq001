
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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
import { MOCK_VERIFICATION_RECORDS } from '@/data/admin_data'
import type { VerificationRecordModel, UserVerificationType } from '@/data/admin_data'

// State
const records = ref<VerificationRecordModel[]>(MOCK_VERIFICATION_RECORDS)
const searchUserName = ref('')
const selectedVerificationType = ref<UserVerificationType | 'All'>('All')
const selectedResult = ref<'All' | 'Success' | 'Failure'>('All')
const startDate = ref('')
const endDate = ref('')
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

// Computed filtered records
const filteredRecords = computed(() => {
  return records.value.filter(record => {
    // Filter by user name
    if (searchUserName.value && !record.userName.includes(searchUserName.value)) {
      return false
    }

    // Filter by verification type
    if (selectedVerificationType.value !== 'All' && record.verificationType !== selectedVerificationType.value) {
      return false
    }

    // Filter by result
    if (selectedResult.value !== 'All' && record.result !== selectedResult.value) {
      return false
    }

    // Filter by date range
    if (startDate.value) {
      const recordDate = new Date(record.timestamp).toISOString().split('T')[0]
      if (recordDate < startDate.value) {
        return false
      }
    }

    if (endDate.value) {
      const recordDate = new Date(record.timestamp).toISOString().split('T')[0]
      if (recordDate > endDate.value) {
        return false
      }
    }

    return true
  })
})

// Methods
const handleReset = () => {
  searchUserName.value = ''
  selectedVerificationType.value = 'All'
  selectedResult.value = 'All'
  startDate.value = ''
  endDate.value = ''
}

const handleViewUserProfile = (userId: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = `./admin-user-profile.html?userId=${userId}`
  }
}

const getVerificationTypeLabel = (type: UserVerificationType): string => {
  const labels: Record<UserVerificationType, string> = {
    Face: '人脸识别',
    Code: '取件码',
    Phone: '手机号'
  }
  return labels[type]
}

const getResultBadgeVariant = (result: string) => {
  return result === 'Success' ? 'default' : 'destructive'
}

const getResultLabel = (result: string): string => {
  return result === 'Success' ? '成功' : '失败'
}
</script>

<template>
  <div class="flex flex-col h-full bg-background">
    <!-- Header -->
    <div class="border-b border-border bg-card p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-bold text-foreground">验证记录管理</h1>
          <p class="text-sm text-muted-foreground mt-1">查看和管理所有用户的身份验证记录</p>
        </div>
        <Button variant="outline" @click="() => window.location.href = './admin-user-management.html'">
          <SafeIcon name="ArrowLeft" :size="18" class="mr-2" />
          返回用户管理
        </Button>
      </div>

      <!-- Filters -->
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <!-- User Name Search -->
          <div>
            <label class="text-sm font-medium text-foreground mb-2 block">用户名称</label>
            <Input
              v-model="searchUserName"
              placeholder="搜索用户名称..."
              class="h-10"
            />
          </div>

          <!-- Verification Type Filter -->
          <div>
            <label class="text-sm font-medium text-foreground mb-2 block">验证类型</label>
            <Select v-model="selectedVerificationType">
              <SelectTrigger class="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">全部类型</SelectItem>
                <SelectItem value="Face">人脸识别</SelectItem>
                <SelectItem value="Code">取件码</SelectItem>
                <SelectItem value="Phone">手机号</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Result Filter -->
          <div>
            <label class="text-sm font-medium text-foreground mb-2 block">验证结果</label>
            <Select v-model="selectedResult">
              <SelectTrigger class="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">全部结果</SelectItem>
                <SelectItem value="Success">成功</SelectItem>
                <SelectItem value="Failure">失败</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Start Date -->
          <div>
            <label class="text-sm font-medium text-foreground mb-2 block">开始日期</label>
            <Input
              v-model="startDate"
              type="date"
              class="h-10"
            />
          </div>

          <!-- End Date -->
          <div>
            <label class="text-sm font-medium text-foreground mb-2 block">结束日期</label>
            <Input
              v-model="endDate"
              type="date"
              class="h-10"
            />
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2 justify-end">
          <Button variant="outline" @click="handleReset">
            <SafeIcon name="RotateCcw" :size="18" class="mr-2" />
            重置筛选
          </Button>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="flex-1 overflow-auto p-6">
      <div class="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow class="bg-muted/50">
              <TableHead class="w-24">记录ID</TableHead>
              <TableHead class="w-20">用户名</TableHead>
              <TableHead class="w-24">验证类型</TableHead>
              <TableHead class="w-32">验证时间</TableHead>
              <TableHead class="w-16">结果</TableHead>
              <TableHead class="w-24">快件单号</TableHead>
              <TableHead class="w-32">失败原因</TableHead>
              <TableHead class="w-20 text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-if="filteredRecords.length === 0">
              <TableCell colspan="8" class="text-center py-8 text-muted-foreground">
                <SafeIcon name="Search" :size="32" class="mx-auto mb-2 opacity-50" />
                <p>未找到匹配的验证记录</p>
              </TableCell>
            </TableRow>
            <TableRow v-for="record in filteredRecords" :key="record.recordId" class="hover:bg-muted/50 transition-colors">
              <TableCell class="font-mono text-sm">{{ record.recordId }}</TableCell>
              <TableCell>
                <button
                  @click="handleViewUserProfile(record.userId)"
                  class="text-primary hover:underline font-medium"
                >
                  {{ record.userName }}
                </button>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {{ getVerificationTypeLabel(record.verificationType) }}
                </Badge>
              </TableCell>
              <TableCell class="text-sm">{{ record.timestamp }}</TableCell>
              <TableCell>
                <Badge :variant="getResultBadgeVariant(record.result)">
                  {{ getResultLabel(record.result) }}
                </Badge>
              </TableCell>
              <TableCell class="font-mono text-sm">
                {{ record.trackingNumber || '-' }}
              </TableCell>
              <TableCell class="text-sm text-muted-foreground">
                {{ record.failureReason || '-' }}
              </TableCell>
              <TableCell class="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="handleViewUserProfile(record.userId)"
                  class="h-8 w-8 p-0"
                >
                  <SafeIcon name="ChevronRight" :size="16" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <!-- Summary -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-card border border-border rounded-lg p-4">
          <p class="text-sm text-muted-foreground mb-1">总记录数</p>
          <p class="text-2xl font-bold text-foreground">{{ filteredRecords.length }}</p>
        </div>
        <div class="bg-card border border-border rounded-lg p-4">
          <p class="text-sm text-muted-foreground mb-1">成功验证</p>
          <p class="text-2xl font-bold text-green-600">
            {{ filteredRecords.filter(r => r.result === 'Success').length }}
          </p>
        </div>
        <div class="bg-card border border-border rounded-lg p-4">
          <p class="text-sm text-muted-foreground mb-1">失败验证</p>
          <p class="text-2xl font-bold text-red-600">
            {{ filteredRecords.filter(r => r.result === 'Failure').length }}
          </p>
        </div>
        <div class="bg-card border border-border rounded-lg p-4">
          <p class="text-sm text-muted-foreground mb-1">成功率</p>
          <p class="text-2xl font-bold text-primary">
            {{
              filteredRecords.length > 0
                ? ((filteredRecords.filter(r => r.result === 'Success').length / filteredRecords.length) * 100).toFixed(1)
                : '0'
            }}%
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
