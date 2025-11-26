
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon.vue'

const trackingNumber = ref('')
const phoneNumber = ref('')
const activeTab = ref('tracking')
const isLoading = ref(false)

const handleSearch = () => {
  if (activeTab.value === 'tracking' && !trackingNumber.value.trim()) {
    alert('请输入运单号')
    return
  }
  if (activeTab.value === 'phone' && !phoneNumber.value.trim()) {
    alert('请输入手机号')
    return
  }

  isLoading.value = true
  
  // Simulate search delay
  setTimeout(() => {
    isLoading.value = false
    if (typeof window !== 'undefined') {
      const query = activeTab.value === 'tracking' 
        ? `?trackingNumber=${encodeURIComponent(trackingNumber.value)}`
        : `?phone=${encodeURIComponent(phoneNumber.value)}`
      window.location.href = `./client-package-tracking-results.html${query}`
    }
  }, 800)
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearch()
  }
}
</script>

<template>
  <div class="bg-card rounded-lg border border-border shadow-soft p-8">
    <Tabs v-model="activeTab" class="w-full">
      <TabsList class="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="tracking" class="flex items-center justify-center">
          <SafeIcon name="Package" :size="18" class="mr-2" />
          运单号查询
        </TabsTrigger>
        <TabsTrigger value="phone" class="flex items-center justify-center">
          <SafeIcon name="Smartphone" :size="18" class="mr-2" />
          手机号查询
        </TabsTrigger>
      </TabsList>

      <!-- Tracking Number Tab -->
      <TabsContent value="tracking" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-foreground mb-2">
            请输入运单号
          </label>
          <Input
            v-model="trackingNumber"
            type="text"
            placeholder="例如：ZYWK20251124001"
            class="w-full"
            @keypress="handleKeyPress"
          />
          <p class="text-xs text-muted-foreground mt-2">
            运单号通常在快递单据或确认邮件中可以找到
          </p>
        </div>
      </TabsContent>

      <!-- Phone Number Tab -->
      <TabsContent value="phone" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-foreground mb-2">
            请输入手机号
          </label>
          <Input
            v-model="phoneNumber"
            type="tel"
            placeholder="例如：13800138000"
            class="w-full"
            @keypress="handleKeyPress"
          />
          <p class="text-xs text-muted-foreground mt-2">
            输入您注册时使用的手机号，系统将显示您的所有快件
          </p>
        </div>
      </TabsContent>

      <!-- Search Button -->
      <div class="mt-6">
        <Button
          @click="handleSearch"
          :disabled="isLoading"
          class="w-full h-12 text-base font-semibold"
        >
          <SafeIcon 
            v-if="!isLoading"
            name="Search" 
            :size="20" 
            class="mr-2" 
          />
          <svg 
            v-else
            class="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? '查询中...' : '查询快件' }}
        </Button>
      </div>
    </Tabs>

    <!-- Info Box -->
    <div class="mt-8 p-4 bg-accent/10 border border-accent/20 rounded-lg">
      <div class="flex items-start space-x-3">
        <SafeIcon name="Info" :size="20" class="text-accent mt-0.5 flex-shrink-0" />
        <div class="text-sm text-foreground/80">
          <p class="font-medium mb-1">查询提示</p>
          <ul class="space-y-1 text-xs">
            <li>• 运单号查询可获得单个快件的详细信息</li>
            <li>• 手机号查询可查看您的所有快件列表</li>
            <li>• 查询结果包含实时物流状态和预计送达时间</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
