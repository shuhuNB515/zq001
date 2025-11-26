
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { MOCK_SERVICE_RULES, MOCK_ANNOUNCEMENTS } from '@/data/admin_data'

const serviceRules = ref(MOCK_SERVICE_RULES)
const announcements = ref(MOCK_ANNOUNCEMENTS)

const handleNavigateToServiceRules = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-service-rules-config.html'
  }
}

const handleNavigateToAnnouncements = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-system-announcement-publish.html'
  }
}

const handleBackToDashboard = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-dashboard.html'
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="border-b border-border bg-card p-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-foreground flex items-center">
            <SafeIcon name="Settings" :size="32" class="mr-3 text-primary" />
            基础设置
          </h1>
          <p class="text-muted-foreground mt-2">
            配置系统级别的服务规则和发布系统公告
          </p>
        </div>
        <Button variant="outline" @click="handleBackToDashboard">
          <SafeIcon name="ArrowLeft" :size="18" class="mr-2" />
          返回管理中心
        </Button>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-auto p-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl">
        <!-- Service Rules Configuration Card -->
        <Card class="hover:shadow-card transition-shadow">
          <CardHeader>
            <div class="flex items-start justify-between">
              <div>
                <CardTitle class="flex items-center text-xl">
                  <SafeIcon name="Sliders" :size="24" class="mr-2 text-primary" />
                  服务规则配置
                </CardTitle>
                <CardDescription class="mt-2">
                  修改寄件价格、存储时长等核心服务规则
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <!-- Service Rules Preview -->
              <div class="space-y-3 mb-6">
                <div
                  v-for="rule in serviceRules"
                  :key="rule.key"
                  class="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <SafeIcon :name="rule.iconName" :size="20" class="text-primary" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-foreground">{{ rule.description }}</p>
                      <p class="text-xs text-muted-foreground">当前值: {{ rule.value }} {{ rule.unit }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Button -->
              <Button
                class="w-full"
                @click="handleNavigateToServiceRules"
              >
                <SafeIcon name="ChevronRight" :size="18" class="mr-2" />
                进入服务规则配置
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- System Announcement Card -->
        <Card class="hover:shadow-card transition-shadow">
          <CardHeader>
            <div class="flex items-start justify-between">
              <div>
                <CardTitle class="flex items-center text-xl">
                  <SafeIcon name="Megaphone" :size="24" class="mr-2 text-accent" />
                  系统公告发布
                </CardTitle>
                <CardDescription class="mt-2">
                  发布系统公告，如设备维护通知等重要信息
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <!-- Announcements Preview -->
              <div class="space-y-3 mb-6 max-h-48 overflow-y-auto">
                <div
                  v-for="announcement in announcements"
                  :key="announcement.id"
                  class="p-3 bg-secondary/50 rounded-lg border-l-4"
                  :class="announcement.isUrgent ? 'border-l-destructive' : 'border-l-primary'"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center gap-2">
                        <p class="text-sm font-medium text-foreground">{{ announcement.title }}</p>
                        <span
                          v-if="announcement.isUrgent"
                          class="px-2 py-1 text-xs font-semibold bg-destructive/20 text-destructive rounded"
                        >
                          紧急
                        </span>
                      </div>
                      <p class="text-xs text-muted-foreground mt-1">
                        发布时间: {{ announcement.releaseDate }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Button -->
              <Button
                class="w-full"
                @click="handleNavigateToAnnouncements"
              >
                <SafeIcon name="ChevronRight" :size="18" class="mr-2" />
                进入公告发布
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Info Section -->
      <div class="mt-8 max-w-6xl">
        <Card class="bg-accent/5 border-accent/20">
          <CardContent class="pt-6">
            <div class="flex items-start space-x-4">
              <SafeIcon name="Info" :size="20" class="text-accent mt-0.5 flex-shrink-0" />
              <div>
                <h3 class="font-semibold text-foreground mb-2">关于基础设置</h3>
                <p class="text-sm text-muted-foreground">
                  基础设置模块允许您配置系统级别的参数和发布重要通知。所有更改将直接影响用户端的业务逻辑和系统运营。请谨慎修改这些设置，确保系统的稳定运行。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions for interactive elements */
:deep(.hover\:shadow-card) {
  transition: box-shadow 0.3s ease;
}
</style>
