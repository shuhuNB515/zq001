
<script setup lang="ts">
import { computed } from 'vue'
import SafeIcon from '@/components/common/SafeIcon.vue'

type VerificationStatus = 'idle' | 'scanning' | 'success' | 'failure'

interface Props {
  status: VerificationStatus
  progress: number
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  errorMessage: ''
})

const statusConfig = computed(() => {
  const configs = {
    idle: {
      title: '准备识别',
      description: '请对准摄像头，系统将进行人脸识别',
      icon: 'Camera',
      color: 'text-muted-foreground'
    },
    scanning: {
      title: '正在识别',
      description: `识别进度: ${Math.round(props.progress)}% - 请保持静止，不要移动`,
      icon: 'Loader2',
      color: 'text-primary'
    },
    success: {
      title: '识别成功',
      description: '您的身份已确认，即将生成寄件码',
      icon: 'CheckCircle2',
      color: 'text-green-600'
    },
    failure: {
      title: '识别失败',
      description: props.errorMessage || '未能识别到人脸，请重新尝试',
      icon: 'XCircle',
      color: 'text-red-600'
    }
  }

  return configs[props.status]
})
</script>

<template>
  <div class="text-center">
    <!-- Status Icon -->
    <div class="flex justify-center mb-4">
      <div :class="statusConfig.color">
<SafeIcon
           :name="statusConfig.icon"
           :size="40"
           :class="{ 'animate-spin': status === 'scanning' }"
         />
      </div>
    </div>

    <!-- Status Title -->
    <h2 class="text-2xl font-bold text-foreground mb-2">
      {{ statusConfig.title }}
    </h2>

    <!-- Status Description -->
    <p class="text-muted-foreground mb-4">
      {{ statusConfig.description }}
    </p>

    <!-- Progress Bar (for scanning) -->
    <div v-if="status === 'scanning'" class="w-full bg-secondary rounded-full h-2 overflow-hidden">
      <div
        class="bg-gradient-to-r from-primary to-accent h-full transition-all duration-300"
        :style="{ width: `${progress}%` }"
      />
    </div>
  </div>
</template>
