
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'
import VerificationMethodSelector from './VerificationMethodSelector.vue'
import FaceVerificationPanel from './FaceVerificationPanel.vue'
import CodeVerificationPanel from './CodeVerificationPanel.vue'
import PhoneVerificationPanel from './PhoneVerificationPanel.vue'
import VerificationResult from './VerificationResult.vue'
import type { PickupOptionModel } from '@/data/client_data'

type VerificationStep = 'select' | 'verify' | 'result'
type VerificationMethod = 'face' | 'code' | 'phone'

const currentStep = ref<VerificationStep>('select')
const selectedMethod = ref<VerificationMethod | null>(null)
const verificationStatus = ref<'idle' | 'loading' | 'success' | 'failure'>('idle')
const verificationMessage = ref('')

const handleMethodSelect = (method: VerificationMethod) => {
  selectedMethod.value = method
  currentStep.value = 'verify'
  verificationStatus.value = 'idle'
}

const handleVerificationSuccess = (message: string) => {
  verificationStatus.value = 'success'
  verificationMessage.value = message
  currentStep.value = 'result'
  // 自动导航到快件位置页面
  setTimeout(() => {
    if (typeof window !== 'undefined') {
      window.location.href = './client-package-location.html'
    }
  }, 2000)
}

const handleVerificationFailure = (message: string) => {
  verificationStatus.value = 'failure'
  verificationMessage.value = message
}

const handleRetry = () => {
  currentStep.value = 'verify'
  verificationStatus.value = 'idle'
  verificationMessage.value = ''
}

const handleBackToSelect = () => {
  currentStep.value = 'select'
  selectedMethod.value = null
  verificationStatus.value = 'idle'
  verificationMessage.value = ''
}

const handleBackToEntry = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './client-pickup-service-entry.html'
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-80px-60px)] bg-gradient-to-b from-background to-secondary/30 py-8 px-4">
    <div class="container mx-auto max-w-2xl">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold text-foreground">取件身份验证</h1>
          <Button 
            variant="ghost" 
            size="icon"
            @click="handleBackToEntry"
            class="hover:bg-accent"
          >
            <SafeIcon name="X" :size="24" />
          </Button>
        </div>
        <p class="text-muted-foreground">请选择验证方式完成身份验证</p>
      </div>

      <!-- Progress Indicator -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div 
            class="flex items-center"
            :class="currentStep === 'select' ? 'text-primary' : 'text-muted-foreground'"
          >
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
              :class="currentStep === 'select' ? 'bg-primary text-primary-foreground' : 'bg-muted'"
            >
              1
            </div>
            <span class="ml-3 font-medium">选择验证方式</span>
          </div>
          <div class="flex-1 h-1 mx-4" :class="currentStep !== 'select' ? 'bg-primary' : 'bg-muted'"></div>
          <div 
            class="flex items-center"
            :class="currentStep === 'verify' || currentStep === 'result' ? 'text-primary' : 'text-muted-foreground'"
          >
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
              :class="currentStep === 'verify' || currentStep === 'result' ? 'bg-primary text-primary-foreground' : 'bg-muted'"
            >
              2
            </div>
            <span class="ml-3 font-medium">完成验证</span>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="bg-card rounded-lg shadow-card p-8">
        <!-- Step 1: Select Verification Method -->
        <VerificationMethodSelector 
          v-if="currentStep === 'select'"
          @select="handleMethodSelect"
        />

        <!-- Step 2: Verify -->
        <div v-if="currentStep === 'verify'">
          <!-- Face Verification -->
          <FaceVerificationPanel 
            v-if="selectedMethod === 'face'"
            :status="verificationStatus"
            :message="verificationMessage"
            @success="handleVerificationSuccess"
            @failure="handleVerificationFailure"
            @back="handleBackToSelect"
          />

          <!-- Code Verification -->
          <CodeVerificationPanel 
            v-if="selectedMethod === 'code'"
            :status="verificationStatus"
            :message="verificationMessage"
            @success="handleVerificationSuccess"
            @failure="handleVerificationFailure"
            @back="handleBackToSelect"
          />

          <!-- Phone Verification -->
          <PhoneVerificationPanel 
            v-if="selectedMethod === 'phone'"
            :status="verificationStatus"
            :message="verificationMessage"
            @success="handleVerificationSuccess"
            @failure="handleVerificationFailure"
            @back="handleBackToSelect"
          />
        </div>

        <!-- Step 3: Result -->
        <VerificationResult 
          v-if="currentStep === 'result'"
          :status="verificationStatus"
          :message="verificationMessage"
          @retry="handleRetry"
          @back="handleBackToSelect"
        />
      </div>

      <!-- Help Section -->
      <div class="mt-8 bg-accent/10 border border-accent/20 rounded-lg p-6">
        <h3 class="font-semibold text-foreground mb-3 flex items-center">
          <SafeIcon name="HelpCircle" :size="20" class="mr-2 text-accent" />
          验证帮助
        </h3>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li class="flex items-start">
            <span class="text-accent mr-3">•</span>
            <span><strong>刷脸取件</strong>：使用摄像头进行人脸识别，最快速的验证方式</span>
          </li>
          <li class="flex items-start">
            <span class="text-accent mr-3">•</span>
            <span><strong>取件码</strong>：输入您收到的6位数字取件码</span>
          </li>
          <li class="flex items-start">
            <span class="text-accent mr-3">•</span>
            <span><strong>手机号验证</strong>：输入注册时使用的手机号，接收验证码</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions for step changes */
:deep(.verification-panel-enter-active),
:deep(.verification-panel-leave-active) {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

:deep(.verification-panel-enter-from),
:deep(.verification-panel-leave-to) {
  opacity: 0;
  transform: translateY(10px);
}
</style>
