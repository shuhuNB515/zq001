
<script setup lang="ts">
import { ref } from 'vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon.vue'

const notifications = ref([
  {
    id: 1,
    type: 'info',
    title: '系统维护通知',
    message: '智能货架将于本周日凌晨2:00-4:00进行定期维护，期间取件服务暂停。',
    icon: 'AlertCircle',
    timestamp: '2小时前'
  },
  {
    id: 2,
    type: 'success',
    title: '快件已入库',
    message: '您的快件ZYWK20251124001已成功入库，位置：A-5-12A，可随时取件。',
    icon: 'CheckCircle',
    timestamp: '1小时前'
  },
  {
    id: 3,
    type: 'warning',
    title: '超时提醒',
    message: '您有1件快件即将超时（剩余2天），请尽快取件。',
    icon: 'AlertTriangle',
    timestamp: '30分钟前'
  }
])

const getAlertVariant = (type: string) => {
  switch (type) {
    case 'success':
      return 'default'
    case 'warning':
      return 'destructive'
    default:
      return 'default'
  }
}

const getIconColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'text-green-500'
    case 'warning':
      return 'text-orange-500'
    default:
      return 'text-blue-500'
  }
}
</script>

<template>
  <div class="mb-8">
    <h2 class="text-2xl font-bold text-foreground mb-6">系统通知</h2>
    
    <div class="space-y-3">
      <Alert
        v-for="notification in notifications"
        :key="notification.id"
        :variant="getAlertVariant(notification.type)"
        class="border-l-4"
      >
        <div class="flex items-start gap-3">
          <SafeIcon 
            :name="notification.icon" 
            :size="20" 
            :class="getIconColor(notification.type)"
            class="mt-0.5 flex-shrink-0"
          />
          <div class="flex-1">
            <AlertTitle class="text-base font-semibold">
              {{ notification.title }}
            </AlertTitle>
            <AlertDescription class="text-sm mt-1">
              {{ notification.message }}
            </AlertDescription>
            <p class="text-xs text-muted-foreground mt-2">
              {{ notification.timestamp }}
            </p>
          </div>
        </div>
      </Alert>
    </div>
  </div>
</template>
