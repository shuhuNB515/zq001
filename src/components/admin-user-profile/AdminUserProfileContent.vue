
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { MOCK_USER_MANAGEMENT_DATA, MOCK_VERIFICATION_RECORDS, MOCK_PACKAGE_RECORDS } from '@/data/admin_data'
import type { UserModel, VerificationRecordModel, PackageRecordModel } from '@/data/admin_data'

// Get user ID from URL query parameter, default to first user
const selectedUserId = ref('U001')
const currentUser = ref<UserModel | null>(null)
const userVerifications = ref<VerificationRecordModel[]>([])
const userPackages = ref<PackageRecordModel[]>([])

// Initialize with mock data
const initializeData = () => {
  // Find current user
  const user = MOCK_USER_MANAGEMENT_DATA.find(u => u.userId === selectedUserId.value)
  if (user) {
    currentUser.value = user
  } else {
    currentUser.value = MOCK_USER_MANAGEMENT_DATA[0]
    selectedUserId.value = currentUser.value.userId
  }

  // Filter verifications for this user
  userVerifications.value = MOCK_VERIFICATION_RECORDS.filter(
    v => v.userId === selectedUserId.value
  )

  // Filter packages for this user (using customerName as proxy)
  userPackages.value = MOCK_PACKAGE_RECORDS.filter(
    p => p.customerName === currentUser.value?.name
  )
}

// Initialize on mount
onMounted(() => {
  // Check for query parameter
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const userId = params.get('id')
    if (userId) {
      selectedUserId.value = userId
    }
  }
  initializeData()
})

// Initialize with default data for SSG
initializeData()

const successVerifications = computed(() => 
  userVerifications.value.filter(v => v.result === 'Success').length
)

const failureVerifications = computed(() => 
  userVerifications.value.filter(v => v.result === 'Failure').length
)

const getVerificationTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    'Face': '人脸识别',
    'Code': '取件码',
    'Phone': '手机号'
  }
  return labels[type] || type
}

const getStatusBadgeVariant = (status: string) => {
  const variants: Record<string, any> = {
    'Success': 'default',
    'Failure': 'destructive',
    'Normal': 'default',
    'Fault': 'destructive',
    'Maintenance': 'secondary'
  }
  return variants[status] || 'default'
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    'Success': '成功',
    'Failure': '失败',
    'Normal': '正常',
    'Fault': '故障',
    'Maintenance': '维护中',
    'AwaitingPickup': '待取件',
    'Sorting': '分拣中',
    'Inbound': '已入库',
    'Outbound': '已出库',
    'Delivered': '已送达'
  }
  return labels[status] || status
}

const handleGoBack = () => {
  if (typeof window !== 'undefined') {
    window.history.back()
  }
}

const handleViewVerifications = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-verification-records.html'
  }
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background">
    <!-- Header Section -->
    <div class="border-b border-border bg-card">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <Button variant="ghost" size="icon" @click="handleGoBack">
              <SafeIcon name="ArrowLeft" :size="20" />
            </Button>
            <h1 class="text-3xl font-bold">用户详情</h1>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- User Info Card -->
        <Card class="lg:col-span-1">
          <CardHeader>
            <CardTitle>用户信息</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div v-if="currentUser" class="space-y-4">
              <!-- Avatar -->
              <div class="flex justify-center">
                <div class="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold">
                  {{ currentUser.name.charAt(0) }}
                </div>
              </div>

              <!-- User Details -->
              <div class="space-y-3 text-sm">
                <div>
                  <p class="text-muted-foreground">姓名</p>
                  <p class="font-semibold">{{ currentUser.name }}</p>
                </div>
                <div>
                  <p class="text-muted-foreground">用户ID</p>
                  <p class="font-mono text-xs bg-muted p-2 rounded">{{ currentUser.userId }}</p>
                </div>
                <div>
                  <p class="text-muted-foreground">电话</p>
                  <p class="font-semibold">{{ currentUser.phone }}</p>
                </div>
                <div>
                  <p class="text-muted-foreground">注册日期</p>
                  <p class="font-semibold">{{ currentUser.registrationDate }}</p>
                </div>
                <div>
                  <p class="text-muted-foreground">最后验证方式</p>
                  <Badge class="mt-1">{{ getVerificationTypeLabel(currentUser.lastVerificationType) }}</Badge>
                </div>
                <div>
                  <p class="text-muted-foreground">最后验证时间</p>
                  <p class="text-xs">{{ currentUser.lastVerificationTime }}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Activity Stats -->
        <Card class="lg:col-span-2">
          <CardHeader>
            <CardTitle>用户活动统计</CardTitle>
            <CardDescription>取寄件频率和验证记录概览</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <!-- Pickup Count -->
              <div class="text-center p-4 rounded-lg bg-muted/50">
                <div class="flex justify-center mb-2">
                  <SafeIcon name="PackageOpen" :size="24" class="text-primary" />
                </div>
                <p class="text-2xl font-bold">{{ currentUser?.pickupCount || 0 }}</p>
                <p class="text-xs text-muted-foreground">取件次数</p>
              </div>

              <!-- Delivery Count -->
              <div class="text-center p-4 rounded-lg bg-muted/50">
                <div class="flex justify-center mb-2">
                  <SafeIcon name="Send" :size="24" class="text-accent" />
                </div>
                <p class="text-2xl font-bold">{{ currentUser?.deliveryCount || 0 }}</p>
                <p class="text-xs text-muted-foreground">寄件次数</p>
              </div>

              <!-- Success Verifications -->
              <div class="text-center p-4 rounded-lg bg-muted/50">
                <div class="flex justify-center mb-2">
                  <SafeIcon name="CheckCircle" :size="24" class="text-green-500" />
                </div>
                <p class="text-2xl font-bold">{{ successVerifications }}</p>
                <p class="text-xs text-muted-foreground">成功验证</p>
              </div>

              <!-- Failed Verifications -->
              <div class="text-center p-4 rounded-lg bg-muted/50">
                <div class="flex justify-center mb-2">
                  <SafeIcon name="XCircle" :size="24" class="text-destructive" />
                </div>
                <p class="text-2xl font-bold">{{ failureVerifications }}</p>
                <p class="text-xs text-muted-foreground">失败验证</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Tabs Section -->
      <Tabs defaultValue="verifications" class="w-full">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="verifications">验证记录</TabsTrigger>
          <TabsTrigger value="history">取寄件历史</TabsTrigger>
        </TabsList>

        <!-- Verification Records Tab -->
        <TabsContent value="verifications" class="space-y-4">
          <Card>
            <CardHeader class="flex flex-row items-center justify-between">
              <div>
                <CardTitle>验证记录</CardTitle>
                <CardDescription>该用户的所有身份验证记录</CardDescription>
              </div>
              <Button variant="outline" size="sm" @click="handleViewVerifications">
                <SafeIcon name="ExternalLink" :size="16" class="mr-2" />
                查看全部
              </Button>
            </CardHeader>
            <CardContent>
              <div v-if="userVerifications.length > 0" class="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>验证时间</TableHead>
                      <TableHead>验证方式</TableHead>
                      <TableHead>结果</TableHead>
                      <TableHead>关联快件</TableHead>
                      <TableHead>备注</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow v-for="record in userVerifications" :key="record.recordId">
                      <TableCell class="text-sm">{{ record.timestamp }}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{{ getVerificationTypeLabel(record.verificationType) }}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge :variant="getStatusBadgeVariant(record.result)">
                          {{ getStatusLabel(record.result) }}
                        </Badge>
                      </TableCell>
                      <TableCell class="text-sm font-mono">
                        {{ record.trackingNumber || '-' }}
                      </TableCell>
                      <TableCell class="text-sm text-muted-foreground">
                        {{ record.failureReason || '-' }}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div v-else class="text-center py-8">
                <SafeIcon name="FileX" :size="32" class="mx-auto mb-2 text-muted-foreground" />
                <p class="text-muted-foreground">暂无验证记录</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- History Tab -->
        <TabsContent value="history" class="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>取寄件历史</CardTitle>
              <CardDescription>该用户的快件处理记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div v-if="userPackages.length > 0" class="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>快件单号</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>入库时间</TableHead>
                      <TableHead>出库时间</TableHead>
                      <TableHead>分拣状态</TableHead>
                      <TableHead>货架位置</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow v-for="pkg in userPackages" :key="pkg.trackingNumber">
                      <TableCell class="font-mono text-sm">{{ pkg.trackingNumber }}</TableCell>
                      <TableCell>
                        <Badge :variant="getStatusBadgeVariant(pkg.status)">
                          {{ getStatusLabel(pkg.status) }}
                        </Badge>
                      </TableCell>
                      <TableCell class="text-sm">{{ pkg.entryTime }}</TableCell>
                      <TableCell class="text-sm">{{ pkg.exitTime || '-' }}</TableCell>
                      <TableCell class="text-sm">{{ pkg.sortingStatus }}</TableCell>
                      <TableCell class="text-sm font-mono">{{ pkg.shelfLocation }}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div v-else class="text-center py-8">
                <SafeIcon name="Package" :size="32" class="mx-auto mb-2 text-muted-foreground" />
                <p class="text-muted-foreground">暂无快件记录</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
