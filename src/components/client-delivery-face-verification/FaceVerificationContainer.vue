
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon.vue'
import FaceVerificationCamera from './FaceVerificationCamera.vue'
import FaceVerificationStatus from './FaceVerificationStatus.vue'

type VerificationStatus = 'idle' | 'scanning' | 'success' | 'failure'

const verificationStatus = ref<VerificationStatus>('scanning')
const scanProgress = ref(0)
const errorMessage = ref('')
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
  
  // Simulate face scanning process
  const scanInterval = setInterval(() => {
    if (scanProgress.value < 100) {
      scanProgress.value += Math.random() * 30
      if (scanProgress.value > 100) {
        scanProgress.value = 100
      }
    } else {
      clearInterval(scanInterval)
      // Simulate success after scanning completes
      setTimeout(() => {
        verificationStatus.value = 'success'
      }, 500)
    }
  }, 800)
})

const handleRetry = () => {
  verificationStatus.value = 'scanning'
  scanProgress.value = 0
  errorMessage.value = ''
  
  const scanInterval = setInterval(() => {
    if (scanProgress.value < 100) {
      scanProgress.value += Math.random() * 30
      if (scanProgress.value > 100) {
        scanProgress.value = 100
      }
    } else {
      clearInterval(scanInterval)
      setTimeout(() => {
        verificationStatus.value = 'success'
      }, 500)
    }
  }, 800)
}

const handleGoBack = () => {
  if (typeof window !== 'undefined') {
    window.history.back()
  }
}

const handleContinue = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './client-delivery-code-generation.html'
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-80px-120px)] bg-gradient-to-b from-background to-secondary/30 flex items-center justify-center p-4">
    <div class="w-full max-w-2xl">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-foreground mb-2">
          寄件人脸核验
        </h1>
        <p class="text-lg text-muted-foreground">
          请对准摄像头，系统将进行人脸身份核验
        </p>
      </div>

      <!-- Main Content Card -->
      <div class="bg-card rounded-2xl shadow-card overflow-hidden">
        <!-- Camera Preview Section -->
        <div class="relative bg-black/5 aspect-video flex items-center justify-center overflow-hidden">
          <FaceVerificationCamera 
            :status="verificationStatus"
            :progress="scanProgress"
          />
        </div>

        <!-- Status Section -->
        <div class="p-8">
          <FaceVerificationStatus 
            :status="verificationStatus"
            :progress="scanProgress"
            :error-message="errorMessage"
          />

          <!-- Alert Messages -->
          <div v-if="verificationStatus === 'failure' && isMounted" class="mt-6">
            <Alert variant="destructive">
              <SafeIcon name="AlertCircle" :size="20" class="mr-2" />
              <AlertDescription>
                人脸识别失败，请确保光线充足，面部清晰可见。请重新尝试。
              </AlertDescription>
            </Alert>
          </div>

          <div v-if="verificationStatus === 'success' && isMounted" class="mt-6">
            <Alert class="border-green-200 bg-green-50">
              <SafeIcon name="CheckCircle2" :size="20" class="mr-2 text-green-600" />
              <AlertDescription class="text-green-800">
                人脸核验成功！您的身份已确认，即将生成寄件码。
              </AlertDescription>
            </Alert>
          </div>

          <!-- Action Buttons -->
          <div class="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              size="lg"
              class="flex-1"
              @click="handleGoBack"
            >
              <SafeIcon name="ArrowLeft" :size="18" class="mr-2" />
              返回上一步
            </Button>

            <Button
              v-if="verificationStatus === 'scanning'"
              disabled
              size="lg"
              class="flex-1"
            >
              <SafeIcon name="Loader2" :size="18" class="mr-2 animate-spin" />
              识别中...
            </Button>

            <Button
              v-else-if="verificationStatus === 'failure'"
              size="lg"
              class="flex-1"
              @click="handleRetry"
            >
              <SafeIcon name="RotateCcw" :size="18" class="mr-2" />
              重新尝试
            </Button>

            <Button
              v-else-if="verificationStatus === 'success'"
              size="lg"
              class="flex-1"
              @click="handleContinue"
            >
              <SafeIcon name="ArrowRight" :size="18" class="mr-2" />
              继续生成寄件码
            </Button>
          </div>

          <!-- Tips Section -->
          <div class="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
            <h3 class="font-semibold text-foreground mb-3 flex items-center">
              <SafeIcon name="Lightbulb" :size="18" class="mr-2 text-accent" />
              识别提示
            </h3>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li class="flex items-start">
                <SafeIcon name="Check" :size="16" class="mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                <span>确保面部清晰可见，避免遮挡</span>
              </li>
              <li class="flex items-start">
                <SafeIcon name="Check" :size="16" class="mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                <span>保持光线充足，避免逆光</span>
              </li>
              <li class="flex items-start">
                <SafeIcon name="Check" :size="16" class="mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                <span>头部保持正对摄像头，表情自然</span>
              </li>
              <li class="flex items-start">
                <SafeIcon name="Check" :size="16" class="mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                <span>识别过程中请保持静止，勿移动</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-8 text-center text-sm text-muted-foreground">
        <p>
          您的人脸信息将被安全加密存储，仅用于身份核验。
          <a href="#privacy" class="text-primary hover:underline">了解隐私政策</a>
        </p>
      </div>
    </div>
  </div>
</template>
