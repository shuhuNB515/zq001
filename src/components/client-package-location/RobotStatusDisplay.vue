
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'

interface Props {
  robotStatus: 'Preparing' | 'Retrieving' | 'Delivered'
  estimatedPickupTime: string
}

const props = defineProps<Props>()

const countdownSeconds = ref(45)
const isCountingDown = ref(true)

onMounted(() => {
  // Start countdown timer
  const interval = setInterval(() => {
    if (countdownSeconds.value > 0) {
      countdownSeconds.value--
    } else {
      isCountingDown.value = false
      clearInterval(interval)
    }
  }, 1000)

  // Cleanup on unmount
  return () => clearInterval(interval)
})

const statusConfig = computed(() => {
  const configs: Record<string, { label: string; color: string; icon: string; description: string }> = {
    'Preparing': {
      label: '准备中',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      icon: 'Clock',
      description: '机器人正在准备，即将开始取件'
    },
    'Retrieving': {
      label: '取件中',
      color: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: 'Zap',
      description: '机器人正在为您取件，请稍候'
    },
    'Delivered': {
      label: '已送达',
      color: 'bg-green-100 text-green-800 border-green-300',
      icon: 'CheckCircle',
      description: '您的快件已送达取件柜'
    }
  }
  return configs[props.robotStatus] || configs['Preparing']
})

const formattedTime = computed(() => {
  const minutes = Math.floor(countdownSeconds.value / 60)
  const seconds = countdownSeconds.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})
</script>

<template>
  <Card class="shadow-card border-2 border-primary/20">
    <CardHeader class="bg-gradient-to-r from-primary/5 to-accent/5 border-b">
      <CardTitle class="flex items-center">
        <SafeIcon name="Zap" :size="20" class="mr-2 text-primary animate-pulse" />
        机器人取件状态
      </CardTitle>
      <CardDescription>实时取件进度</CardDescription>
    </CardHeader>
    <CardContent class="p-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Status Display -->
        <div class="flex flex-col items-center justify-center">
          <div :class="['px-6 py-3 rounded-full border-2 mb-4 flex items-center space-x-2', statusConfig.color]">
            <SafeIcon :name="statusConfig.icon" :size="20" />
            <span class="font-semibold">{{ statusConfig.label }}</span>
          </div>
          <p class="text-center text-muted-foreground">{{ statusConfig.description }}</p>
        </div>

        <!-- Countdown Timer -->
        <div class="flex flex-col items-center justify-center">
          <div class="relative w-32 h-32 flex items-center justify-center mb-4">
            <!-- Circular progress background -->
            <svg class="absolute w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="text-muted/30"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="text-primary transition-all duration-1000"
                :style="{
                  strokeDasharray: `${(45 - countdownSeconds) / 45 * 339.29} 339.29`,
                  strokeLinecap: 'round'
                }"
              />
            </svg>
            
            <!-- Timer text -->
            <div class="text-center z-10">
              <div class="text-4xl font-bold text-primary font-mono">{{ formattedTime }}</div>
              <p class="text-xs text-muted-foreground mt-1">预计时间</p>
            </div>
          </div>
          <p class="text-center text-sm text-muted-foreground">{{ estimatedPickupTime }}</p>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="mt-8 pt-8 border-t">
        <p class="text-sm font-medium text-foreground mb-3">取件进度</p>
        <div class="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
            :style="{ width: `${(45 - countdownSeconds) / 45 * 100}%` }"
          ></div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
