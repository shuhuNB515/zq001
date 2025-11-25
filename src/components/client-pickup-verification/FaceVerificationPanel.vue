
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { MOCK_FACE_VERIFICATION } from '@/data/client_data'

interface Props {
  status: 'idle' | 'loading' | 'success' | 'failure'
  message: string
}

const emit = defineEmits<{
  success: [message: string]
  failure: [message: string]
  back: []
}>()

const props = defineProps<Props>()

const isScanning = ref(false)
const scanProgress = ref(0)
const cameraActive = ref(false)

onMounted(() => {
  // Simulate camera activation
  setTimeout(() => {
    cameraActive.value = true
  }, 500)
})

const handleStartScan = () => {
  isScanning.value = true
  scanProgress.value = 0

  // Simulate scanning progress
  const interval = setInterval(() => {
    scanProgress.value += Math.random() * 30
    if (scanProgress.value >= 100) {
      scanProgress.value = 100
      clearInterval(interval)
      
      // Simulate verification result
      setTimeout(() => {
        isScanning.value = false
        emit('success', MOCK_FACE_VERIFICATION.message)
      }, 500)
    }
  }, 300)
}

const handleRetry = () => {
  scanProgress.value = 0
  isScanning.value = false
  handleStartScan()
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold text-foreground">人脸识别验证</h2>

    <!-- Camera Preview Area -->
    <div class="relative bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
      <!-- Camera Feed Placeholder -->
      <div v-if="cameraActive" class="absolute inset-0 flex items-center justify-center">
        <img 
          :src="MOCK_FACE_VERIFICATION.previewImageUrl" 
          alt="摄像头预览"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Scanning Overlay -->
      <div v-if="isScanning" class="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div class="text-center">
          <!-- Animated Scan Circle -->
          <div class="relative w-32 h-32 mx-auto mb-4">
            <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin"></div>
            <div class="absolute inset-2 rounded-full border-2 border-primary/30"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <SafeIcon name="ScanFace" :size="48" class="text-primary animate-pulse" />
            </div>
          </div>
          <p class="text-white font-medium">正在扫描人脸...</p>
          <p class="text-white/70 text-sm mt-2">{{ Math.round(scanProgress) }}%</p>
        </div>
      </div>

      <!-- Initial State -->
      <div v-if="!isScanning && cameraActive" class="absolute inset-0 flex items-center justify-center bg-black/20">
        <div class="text-center">
          <SafeIcon name="ScanFace" :size="64" class="text-white/80 mx-auto mb-4" />
          <p class="text-white font-medium">请对准摄像头</p>
          <p class="text-white/70 text-sm mt-2">确保脸部清晰可见</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="!cameraActive" class="flex items-center justify-center">
        <div class="text-center">
          <div class="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin mx-auto mb-4"></div>
          <p class="text-white font-medium">正在启动摄像头...</p>
        </div>
      </div>
    </div>

    <!-- Status Messages -->
    <div v-if="status === 'failure'" class="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
      <div class="flex items-start">
        <SafeIcon name="AlertCircle" :size="20" class="text-destructive mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <p class="font-semibold text-destructive">验证失败</p>
          <p class="text-sm text-destructive/80 mt-1">{{ message }}</p>
        </div>
      </div>
    </div>

    <!-- Instructions -->
    <div class="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
      <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
        <SafeIcon name="Info" :size="18" class="mr-2" />
        验证提示
      </h3>
      <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
        <li>• 确保光线充足，脸部清晰可见</li>
        <li>• 请勿佩戴墨镜或口罩</li>
        <li>• 保持脸部正对摄像头</li>
        <li>• 验证过程约需5-10秒</li>
      </ul>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-3">
      <Button 
        variant="outline" 
        class="flex-1"
        @click="$emit('back')"
        :disabled="isScanning"
      >
        <SafeIcon name="ArrowLeft" :size="18" class="mr-2" />
        返回选择
      </Button>
      <Button 
        v-if="!isScanning && status !== 'failure'"
        class="flex-1"
        @click="handleStartScan"
        :disabled="!cameraActive"
      >
        <SafeIcon name="Play" :size="18" class="mr-2" />
        开始扫描
      </Button>
      <Button 
        v-if="status === 'failure'"
        class="flex-1"
        @click="handleRetry"
      >
        <SafeIcon name="RotateCcw" :size="18" class="mr-2" />
        重新尝试
      </Button>
    </div>
  </div>
</template>

<style scoped>
@keyframes scan-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-scan-pulse {
  animation: scan-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
