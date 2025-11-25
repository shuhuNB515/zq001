
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'

interface Props {
  status: 'idle' | 'loading' | 'success' | 'failure'
  message: string
}

const emit = defineEmits<{
  retry: []
  back: []
}>()

const props = defineProps<Props>()
</script>

<template>
  <div class="text-center py-8">
    <!-- Success State -->
    <div v-if="status === 'success'" class="space-y-6">
      <div class="flex justify-center">
        <div class="relative w-24 h-24">
          <div class="absolute inset-0 rounded-full bg-green-100 dark:bg-green-950/30 animate-pulse"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <SafeIcon name="CheckCircle2" :size="64" class="text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-bold text-foreground mb-2">验证成功</h3>
        <p class="text-muted-foreground">{{ message }}</p>
      </div>

      <div class="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <p class="text-sm text-green-800 dark:text-green-200">
          系统正在为您检索快件，请稍候...
        </p>
      </div>

      <div class="flex gap-3">
        <Button 
          variant="outline" 
          class="flex-1"
          @click="$emit('back')"
        >
          <SafeIcon name="ArrowLeft" :size="18" class="mr-2" />
          返回选择
        </Button>
        <Button 
          class="flex-1"
          disabled
        >
          <div class="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin mr-2"></div>
          跳转中...
        </Button>
      </div>
    </div>

    <!-- Failure State -->
    <div v-if="status === 'failure'" class="space-y-6">
      <div class="flex justify-center">
        <div class="relative w-24 h-24">
          <div class="absolute inset-0 rounded-full bg-red-100 dark:bg-red-950/30"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <SafeIcon name="XCircle" :size="64" class="text-red-600 dark:text-red-400" />
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-bold text-foreground mb-2">验证失败</h3>
        <p class="text-muted-foreground">{{ message }}</p>
      </div>

      <div class="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p class="text-sm text-red-800 dark:text-red-200">
          请检查输入信息是否正确，或尝试其他验证方式
        </p>
      </div>

      <div class="flex gap-3">
        <Button 
          variant="outline" 
          class="flex-1"
          @click="$emit('back')"
        >
          <SafeIcon name="ArrowLeft" :size="18" class="mr-2" />
          返回选择
        </Button>
        <Button 
          class="flex-1"
          @click="$emit('retry')"
        >
          <SafeIcon name="RotateCcw" :size="18" class="mr-2" />
          重新尝试
        </Button>
      </div>
    </div>
  </div>
</template>
