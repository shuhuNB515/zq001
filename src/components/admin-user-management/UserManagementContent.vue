
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'
import UserStatsCard from './UserStatsCard.vue'
import UserActivityChart from './UserActivityChart.vue'
import UserVerificationTable from './UserVerificationTable.vue'
import { MOCK_USER_MANAGEMENT_DATA, MOCK_USER_ACTIVITY_STAT_IMAGE } from '@/data/admin_data'

const users = ref(MOCK_USER_MANAGEMENT_DATA)
const selectedTab = ref<'overview' | 'verification'>('overview')

const handleBack = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-dashboard.html'
  }
}

// Calculate statistics
const totalUsers = users.value.length
const totalPickups = users.value.reduce((sum, user) => sum + user.pickupCount, 0)
const totalDeliveries = users.value.reduce((sum, user) => sum + user.deliveryCount, 0)
const avgPickupPerUser = (totalPickups / totalUsers).toFixed(1)
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="border-b border-border bg-card p-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-foreground flex items-center">
            <SafeIcon name="Users" :size="32" class="mr-3 text-primary" />
            用户管理
          </h1>
          <p class="text-muted-foreground mt-2">统计和管理取寄件用户数据，查看验证记录</p>
        </div>
        <Button variant="outline" @click="handleBack" class="flex items-center">
          <SafeIcon name="ArrowLeft" :size="18" class="mr-2" />
          返回管理主页
        </Button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-auto p-6">
      <div class="space-y-6">
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <UserStatsCard
            title="总用户数"
            value={totalUsers.toString()}
            unit="人"
            icon="Users"
            trend="up"
          />
          <UserStatsCard
            title="总取件数"
            value={totalPickups.toString()}
            unit="件"
            icon="PackagePlus"
            trend="up"
          />
          <UserStatsCard
            title="总寄件数"
            value={totalDeliveries.toString()}
            unit="件"
            icon="Send"
            trend="up"
          />
          <UserStatsCard
            title="人均取件数"
            value={avgPickupPerUser}
            unit="件"
            icon="TrendingUp"
            trend="flat"
          />
        </div>

        <!-- User Activity Chart -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center">
              <SafeIcon name="BarChart3" :size="20" class="mr-2 text-primary" />
              用户活动统计
            </CardTitle>
            <CardDescription>用户取寄件行为分析</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="w-full h-80 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={MOCK_USER_ACTIVITY_STAT_IMAGE.url}
                alt="用户活动统计图表"
                class="w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </Card>

        <!-- Tabs for Overview and Verification Records -->
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <div>
                <CardTitle class="flex items-center">
                  <SafeIcon name="Users" :size="20" class="mr-2 text-primary" />
                  用户列表
                </CardTitle>
                <CardDescription>用户验证记录和活动统计</CardDescription>
              </div>
              <div class="flex gap-2">
                <Button
                  :variant="selectedTab === 'overview' ? 'default' : 'outline'"
                  size="sm"
                  @click="selectedTab = 'overview'"
                >
                  <SafeIcon name="Eye" :size="16" class="mr-2" />
                  概览
                </Button>
                <Button
                  :variant="selectedTab === 'verification' ? 'default' : 'outline'"
                  size="sm"
                  @click="selectedTab = 'verification'"
                >
                  <SafeIcon name="CheckCircle" :size="16" class="mr-2" />
                  验证记录
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <UserVerificationTable
              :users="users"
              :tab="selectedTab"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
