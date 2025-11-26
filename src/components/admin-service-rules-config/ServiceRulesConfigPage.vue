
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'
import ServiceRuleCard from '@/components/admin-service-rules-config/ServiceRuleCard.vue'
import { MOCK_SERVICE_RULES } from '@/data/admin_data'
import type { ServiceRuleModel } from '@/data/admin_data'

const serviceRules = ref<ServiceRuleModel[]>(MOCK_SERVICE_RULES)
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

const handleNavigateToPricing = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-pricing-config.html'
  }
}

const handleNavigateToStorage = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-storage-duration-config.html'
  }
}

const handleBackToDashboard = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-basic-settings.html'
  }
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background">
    <!-- Header Section -->
    <div class="border-b border-border bg-card">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-foreground flex items-center">
              <SafeIcon name="Settings" :size="32" class="mr-3 text-primary" />
              服务规则配置
            </h1>
            <p class="text-muted-foreground mt-2">
              管理寄件价格、存储时长等核心服务规则，所有更改将直接影响用户端的业务逻辑
            </p>
          </div>
          <Button 
            variant="outline" 
            @click="handleBackToDashboard"
            class="flex items-center"
          >
            <SafeIcon name="ArrowLeft" :size="18" class="mr-2" />
            返回基础设置
          </Button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 container mx-auto px-4 py-8">
      <!-- Service Rules Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ServiceRuleCard 
          v-for="rule in serviceRules" 
          :key="rule.key"
          :rule="rule"
          @navigate-pricing="handleNavigateToPricing"
          @navigate-storage="handleNavigateToStorage"
        />
      </div>

      <!-- Quick Actions Section -->
      <Card class="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle class="flex items-center">
            <SafeIcon name="Zap" :size="24" class="mr-2 text-primary" />
            快速操作
          </CardTitle>
          <CardDescription>
            直接跳转到具体配置页面进行详细设置
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Pricing Config Button -->
            <Button 
              variant="default"
              class="h-auto py-4 px-6 flex flex-col items-start justify-start"
              @click="handleNavigateToPricing"
            >
              <div class="flex items-center w-full mb-2">
                <SafeIcon name="DollarSign" :size="20" class="mr-2" />
                <span class="font-semibold">寄件价格配置</span>
              </div>
              <span class="text-xs opacity-90">设置不同快递类型和区域的寄件价格</span>
            </Button>

            <!-- Storage Duration Config Button -->
            <Button 
              variant="default"
              class="h-auto py-4 px-6 flex flex-col items-start justify-start"
              @click="handleNavigateToStorage"
            >
              <div class="flex items-center w-full mb-2">
                <SafeIcon name="CalendarDays" :size="20" class="mr-2" />
                <span class="font-semibold">存储时长配置</span>
              </div>
              <span class="text-xs opacity-90">设置快件免费存储时长和超时收费规则</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Info Section -->
      <Card class="mt-8 border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
        <CardHeader>
          <CardTitle class="text-blue-900 dark:text-blue-100 flex items-center">
            <SafeIcon name="Info" :size="20" class="mr-2" />
            重要提示
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm text-blue-800 dark:text-blue-200 space-y-2">
          <p>• 所有规则修改将实时生效，请谨慎操作</p>
          <p>• 价格调整将影响用户端的寄件费用计算</p>
          <p>• 存储时长规则将影响超时收费的计算</p>
          <p>• 建议在非业务高峰期进行重要规则修改</p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
