
<script setup lang="ts">
import { ref, computed } from 'vue'
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
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon.vue'
import type { UserModel, UserVerificationType } from '@/data/admin_data'

interface Props {
  users: UserModel[]
  tab: 'overview' | 'verification'
}

const props = defineProps<Props>()
const searchQuery = ref('')

const filteredUsers = computed(() => {
  return props.users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.phone.includes(searchQuery.value) ||
    user.userId.includes(searchQuery.value)
  )
})

const getVerificationIcon = (type: UserVerificationType) => {
  const icons: Record<UserVerificationType, string> = {
    Face: 'FaceIcon',
    Code: 'QrCode',
    Phone: 'Phone'
  }
  return icons[type]
}

const getVerificationLabel = (type: UserVerificationType) => {
  const labels: Record<UserVerificationType, string> = {
    Face: '人脸识别',
    Code: '取件码',
    Phone: '手机号'
  }
  return labels[type]
}

const getVerificationColor = (type: UserVerificationType) => {
  const colors: Record<UserVerificationType, string> = {
    Face: 'bg-blue-100 text-blue-800',
    Code: 'bg-purple-100 text-purple-800',
    Phone: 'bg-green-100 text-green-800'
  }
  return colors[type]
}

const handleExport = () => {
  // Export functionality
  const csvContent = [
    ['用户ID', '用户名', '手机号', '取件数', '寄件数', '最后验证方式', '最后验证时间'],
    ...filteredUsers.value.map(user => [
      user.userId,
      user.name,
      user.phone,
      user.pickupCount,
      user.deliveryCount,
      getVerificationLabel(user.lastVerificationType),
      user.lastVerificationTime
    ])
  ]
    .map(row => row.join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `用户数据_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <div class="space-y-4">
    <!-- Search and Export -->
    <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      <div class="w-full md:w-64">
        <Input
          v-model="searchQuery"
          placeholder="搜索用户名、手机号或用户ID..."
          class="w-full"
        />
      </div>
      <Button @click="handleExport" variant="outline" class="flex items-center">
        <SafeIcon name="Download" :size="18" class="mr-2" />
        导出数据
      </Button>
    </div>

    <!-- Table -->
    <div class="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow class="bg-muted/50">
            <TableHead class="w-24">用户ID</TableHead>
            <TableHead class="w-24">用户名</TableHead>
            <TableHead class="w-32">手机号</TableHead>
            <TableHead v-if="tab === 'overview'" class="w-20 text-center">取件数</TableHead>
            <TableHead v-if="tab === 'overview'" class="w-20 text-center">寄件数</TableHead>
            <TableHead v-if="tab === 'verification'" class="w-32">最后验证方式</TableHead>
            <TableHead v-if="tab === 'verification'" class="w-40">最后验证时间</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="user in filteredUsers" :key="user.userId" class="hover:bg-muted/50">
            <TableCell class="font-mono text-sm">{{ user.userId }}</TableCell>
            <TableCell class="font-medium">{{ user.name }}</TableCell>
            <TableCell class="text-muted-foreground">{{ user.phone }}</TableCell>
            <TableCell v-if="tab === 'overview'" class="text-center">
              <Badge variant="secondary" class="font-semibold">
                {{ user.pickupCount }}
              </Badge>
            </TableCell>
            <TableCell v-if="tab === 'overview'" class="text-center">
              <Badge variant="secondary" class="font-semibold">
                {{ user.deliveryCount }}
              </Badge>
            </TableCell>
            <TableCell v-if="tab === 'verification'">
              <Badge :class="getVerificationColor(user.lastVerificationType)">
                <SafeIcon
                  :name="getVerificationIcon(user.lastVerificationType)"
                  :size="14"
                  class="mr-1"
                />
                {{ getVerificationLabel(user.lastVerificationType) }}
              </Badge>
            </TableCell>
            <TableCell v-if="tab === 'verification'" class="text-muted-foreground text-sm">
              {{ user.lastVerificationTime }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Empty State -->
    <div v-if="filteredUsers.length === 0" class="text-center py-12">
      <SafeIcon name="Users" :size="48" class="mx-auto text-muted-foreground/50 mb-4" />
      <p class="text-muted-foreground">未找到匹配的用户</p>
    </div>

    <!-- Summary -->
    <div class="bg-muted/50 rounded-lg p-4 flex items-center justify-between">
      <span class="text-sm text-muted-foreground">
        显示 <span class="font-semibold">{{ filteredUsers.length }}</span> / <span class="font-semibold">{{ props.users.length }}</span> 条用户记录
      </span>
      <div class="flex gap-2 text-sm text-muted-foreground">
        <span>总取件数：<span class="font-semibold">{{ filteredUsers.reduce((sum, u) => sum + u.pickupCount, 0) }}</span></span>
        <span class="text-border">|</span>
        <span>总寄件数：<span class="font-semibold">{{ filteredUsers.reduce((sum, u) => sum + u.deliveryCount, 0) }}</span></span>
      </div>
    </div>
  </div>
</template>
