
<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'

const services = ref([
  {
    id: 'pickup',
    title: '取件服务',
    description: '刷脸/取件码/手机号快速取件',
    icon: 'PackageOpen',
    color: 'from-blue-500 to-blue-600',
    href: './client-pickup-service-entry.html',
    stats: '今日可取件'
  },
  {
    id: 'delivery',
    title: '寄件服务',
    description: '在线预约寄件，人脸核验身份',
    icon: 'Send',
    color: 'from-green-500 to-green-600',
    href: './client-delivery-entry.html',
    stats: '随时预约'
  },
  {
    id: 'tracking',
    title: '快件查询',
    description: '输入单号或手机号查看实时状态',
    icon: 'Search',
    color: 'from-purple-500 to-purple-600',
    href: './client-package-tracking-entry.html',
    stats: '实时追踪'
  },
  {
    id: 'info',
    title: '基础信息',
    description: '网点地址、服务时间、常见问题',
    icon: 'Info',
    color: 'from-orange-500 to-orange-600',
    href: './client-basic-info.html',
    stats: '了解更多'
  }
])
</script>

<template>
  <div class="mb-8">
    <h2 class="text-2xl font-bold text-foreground mb-6">核心服务</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <a
        v-for="service in services"
        :key="service.id"
        :href="service.href"
        class="group"
      >
        <Card class="h-full hover:shadow-card transition-all duration-300 hover:border-primary/50 cursor-pointer">
          <CardHeader class="pb-3">
            <div class="flex items-start justify-between mb-2">
              <div :class="['p-3 rounded-lg bg-gradient-to-br', service.color]">
                <SafeIcon :name="service.icon" :size="24" color="white" />
              </div>
              <span class="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                {{ service.stats }}
              </span>
            </div>
            <CardTitle class="text-lg group-hover:text-primary transition-colors">
              {{ service.title }}
            </CardTitle>
            <CardDescription class="text-sm">
              {{ service.description }}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="ghost" 
              class="w-full justify-start text-primary hover:text-primary hover:bg-primary/10 group-hover:translate-x-1 transition-transform"
            >
              进入服务
              <SafeIcon name="ArrowRight" :size="16" class="ml-2" />
            </Button>
          </CardContent>
        </Card>
      </a>
    </div>
  </div>
</template>
