
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'

const quickLinks = ref([
  {
    id: 'station-info',
    title: '网点信息',
    description: '查看网点地址、服务时间',
    icon: 'MapPin',
    href: './client-station-info-help.html'
  },
  {
    id: 'faq',
    title: '常见问题',
    description: '了解超时规则、寄件限制等',
    icon: 'HelpCircle',
    href: './client-faq.html'
  },
  {
    id: 'account',
    title: '账户设置',
    description: '修改个人信息、安全设置',
    icon: 'Settings',
    href: '#account-settings'
  }
])

const recentActivities = ref([
  {
    id: 1,
    action: '取件',
    package: 'ZYWK20251123001',
    time: '2025-11-23 14:30',
    status: '已完成'
  },
  {
    id: 2,
    action: '寄件',
    package: 'DLY922055',
    time: '2025-11-22 10:15',
    status: '已发出'
  },
  {
    id: 3,
    action: '取件',
    package: 'ZYWK20251121005',
    time: '2025-11-21 16:45',
    status: '已完成'
  }
])
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Quick Links -->
    <div class="lg:col-span-1">
      <h3 class="text-lg font-bold text-foreground mb-4">快速链接</h3>
      <div class="space-y-2">
        <a
          v-for="link in quickLinks"
          :key="link.id"
          :href="link.href"
          class="block"
        >
          <Button 
            variant="outline" 
            class="w-full justify-start hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <SafeIcon :name="link.icon" :size="18" class="mr-2" />
            <div class="text-left">
              <div class="font-medium text-sm">{{ link.title }}</div>
              <div class="text-xs text-muted-foreground">{{ link.description }}</div>
            </div>
          </Button>
        </a>
      </div>
    </div>

    <!-- Recent Activities -->
    <div class="lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">最近活动</CardTitle>
          <CardDescription>您最近的取件和寄件记录</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-3">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
            >
              <div class="flex items-center space-x-3 flex-1">
                <div class="p-2 bg-primary/10 rounded-lg">
                  <SafeIcon 
                    :name="activity.action === '取件' ? 'PackageOpen' : 'Send'" 
                    :size="18" 
                    class="text-primary"
                  />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-foreground">
                    {{ activity.action }} - {{ activity.package }}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {{ activity.time }}
                  </p>
                </div>
              </div>
              <span class="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                {{ activity.status }}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
