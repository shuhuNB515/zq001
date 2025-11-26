
<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { Button } from '@/components/ui/button'

const navigationItems = [
  {
    title: '网点详情',
    description: '查看完整的网点地址、营业时间和联系方式',
    icon: 'MapPin',
    href: './client-station-details.html',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: '常见问题',
    description: '浏览所有常见问题解答，快速解决疑问',
    icon: 'HelpCircle',
    href: './client-faq.html',
    color: 'from-green-500 to-green-600'
  },
  {
    title: '返回仪表盘',
    description: '回到客户端主页，继续使用其他服务',
    icon: 'LayoutDashboard',
    href: './client-dashboard.html',
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: '返回首页',
    description: '返回应用首页',
    icon: 'Home',
    href: './homepage.html',
    color: 'from-orange-500 to-orange-600'
  }
]

const handleNavigation = (href: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = href
  }
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold text-foreground mb-6">快速导航</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card 
        v-for="item in navigationItems"
        :key="item.title"
        class="hover:shadow-card transition-all cursor-pointer group"
        @click="handleNavigation(item.href)"
      >
        <CardContent class="pt-6">
          <div class="flex items-start space-x-4">
            <div :class="`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`">
              <SafeIcon :name="item.icon" :size="24" color="white" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {{ item.title }}
              </h3>
              <p class="mt-1 text-sm text-muted-foreground">{{ item.description }}</p>
            </div>
            <SafeIcon 
              name="ChevronRight" 
              :size="20" 
              class="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
