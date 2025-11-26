
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'

const modules = [
  {
    id: 'package-management',
    title: '快件管理',
    description: '查看入库/出库记录、分拣状态，支持单号搜索、批量导出数据',
    icon: 'Package',
    href: './admin-package-management.html',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'device-monitoring',
    title: '设备监控',
    description: '显示智能传送带、ROS机器人、智能货架的运行状态及RFID定位数据',
    icon: 'Monitor',
    href: './admin-device-monitoring.html',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'user-management',
    title: '用户管理',
    description: '统计取寄件用户数据，查看验证记录（人脸/取件码）',
    icon: 'Users',
    href: './admin-user-management.html',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'settings',
    title: '基础设置',
    description: '修改服务规则（寄件价格、存储时长），发布系统公告',
    icon: 'Settings',
    href: './admin-settings.html',
    color: 'from-orange-500 to-red-500'
  }
]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Card 
      v-for="module in modules"
      :key="module.id"
      class="module-card group hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <CardHeader class="pb-4">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <CardTitle class="text-lg">{{ module.title }}</CardTitle>
            <CardDescription class="mt-2">
              {{ module.description }}
            </CardDescription>
          </div>
          <div :class="`p-3 rounded-lg bg-gradient-to-br ${module.color} shadow-md`">
            <SafeIcon 
              :name="module.icon" 
              :size="24" 
              color="white"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button 
          as="a"
          :href="module.href"
          class="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          进入模块
          <SafeIcon name="ArrowRight" :size="16" class="ml-2" />
        </Button>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.module-card {
  @apply border border-border bg-card;
}

.module-card:hover {
  @apply border-primary/50;
}
</style>
