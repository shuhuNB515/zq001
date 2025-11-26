
<script setup lang="ts">
import { ref } from 'vue'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { CLIENT_DASHBOARD_PROFILE_AVATAR } from '@/data/client_data'

const userInfo = ref({
  name: '张三',
  phone: '138****1234',
  pickupCount: 12,
  deliveryCount: 8,
  memberLevel: '普通会员',
  joinDate: '2024年加入'
})

const stats = [
  {
    label: '取件次数',
    value: userInfo.value.pickupCount,
    icon: 'PackageOpen',
    color: 'text-blue-500'
  },
  {
    label: '寄件次数',
    value: userInfo.value.deliveryCount,
    icon: 'Send',
    color: 'text-green-500'
  },
  {
    label: '会员等级',
    value: userInfo.value.memberLevel,
    icon: 'Star',
    color: 'text-yellow-500'
  }
]
</script>

<template>
  <div class="mb-8">
    <!-- Welcome Card -->
    <div class="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6 mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <Avatar class="w-16 h-16">
            <AvatarImage :src="CLIENT_DASHBOARD_PROFILE_AVATAR.url" :alt="userInfo.name" />
            <AvatarFallback class="bg-primary text-primary-foreground text-lg font-semibold">
              {{ userInfo.name.substring(0, 2) }}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 class="text-2xl font-bold text-foreground">
              欢迎回来，{{ userInfo.name }}！
            </h1>
            <p class="text-sm text-muted-foreground mt-1">
              {{ userInfo.joinDate }} • {{ userInfo.phone }}
            </p>
          </div>
        </div>
        <div class="hidden md:flex items-center space-x-2 bg-white/50 px-4 py-2 rounded-lg">
          <SafeIcon name="Crown" :size="20" class="text-yellow-500" />
          <span class="text-sm font-medium">{{ userInfo.memberLevel }}</span>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-card border border-border rounded-lg p-4 hover:shadow-card transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-muted-foreground mb-1">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-foreground">
              {{ typeof stat.value === 'number' ? stat.value : stat.value }}
            </p>
          </div>
          <div :class="['p-3 rounded-lg bg-secondary', stat.color]">
            <SafeIcon :name="stat.icon" :size="24" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
