
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SafeIcon from '@/components/common/SafeIcon.vue'

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

const phoneNumber = ref('')
const verificationCode = ref('')
const codeSent = ref(false)
const isVerifying = ref(false)
const countdown = ref(0)

const handleSendCode = async () => {
  if (!phoneNumber.value.trim()) {
    emit('failure', '请输入手机号')
    return
  }

  if (!/^1[3-9]\d{9}$/.test(phoneNumber.value)) {
    emit('failure', '请输入有效的手机号')
    return
  }

  isVerifying.value = true

  // Simulate sending code
  setTimeout(() => {
    isVerifying.value = false
    codeSent.value = true
    countdown.value = 60

    // Countdown timer
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  }, 1000)
}

const handleVerify = async () => {
  if (!verificationCode.value.trim()) {
    emit('failure', '请输入验证码')
    return
  }

  isVerifying.value = true

  // Simulate verification
  setTimeout(() => {
    isVerifying.value = false
    
    // Mock verification - accept any 6-digit code
    if (verificationCode.value.length === 6 && /^\d+$/.test(verificationCode.value)) {
      emit('success', `手机号 ${phoneNumber.value} 验证成功，正在检索您的快件...`)
    } else {
      emit('failure', '验证码不正确，请重新输入')
    }
  }, 1500)
}

const handlePhoneInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  input.value = input.value.replace(/[^\d]/g, '').slice(0, 11)
  phoneNumber.value = input.value
}

const handleCodeInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  input.value = input.value.replace(/[^\d]/g, '').slice(0, 6)
  verificationCode.value = input.value
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && codeSent.value) {
    handleVerify()
  }
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold text-foreground">手机号验证</h2>

    <!-- Phone Input Section -->
    <div class="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-8 border border-primary/10">
      <div class="text-center mb-6">
        <SafeIcon name="Smartphone" :size="48" class="text-primary mx-auto mb-4" />
        <p class="text-muted-foreground">请输入注册时使用的手机号</p>
      </div>

      <!-- Phone Number Input -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-foreground mb-2">手机号</label>
          <Input
            v-model="phoneNumber"
            type="tel"
            placeholder="输入11位手机号"
            maxlength="11"
            @input="handlePhoneInput"
            :disabled="codeSent || isVerifying"
          />
          <p class="text-xs text-muted-foreground mt-2">
            {{ phoneNumber.length }}/11
          </p>
        </div>

        <!-- Send Code Button -->
        <Button 
          v-if="!codeSent"
          class="w-full"
          @click="handleSendCode"
          :disabled="phoneNumber.length !== 11 || isVerifying"
        >
          <SafeIcon v-if="!isVerifying" name="Send" :size="18" class="mr-2" />
          <div v-if="isVerifying" class="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin mr-2"></div>
          {{ isVerifying ? '发送中...' : '发送验证码' }}
        </Button>
      </div>
    </div>

    <!-- Verification Code Section -->
    <div v-if="codeSent" class="bg-gradient-to-br from-accent/5 to-primary/5 rounded-lg p-8 border border-accent/10">
      <div class="text-center mb-6">
        <SafeIcon name="Mail" :size="48" class="text-accent mx-auto mb-4" />
        <p class="text-muted-foreground">验证码已发送至 {{ phoneNumber }}</p>
      </div>

      <!-- Verification Code Input -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-foreground mb-2">验证码</label>
          <Input
            v-model="verificationCode"
            type="text"
            placeholder="输入6位验证码"
            maxlength="6"
            class="text-center text-2xl font-mono tracking-widest"
            @input="handleCodeInput"
            @keydown="handleKeyDown"
            :disabled="isVerifying"
          />
          <p class="text-xs text-muted-foreground mt-2">
            {{ verificationCode.length }}/6
          </p>
        </div>

        <!-- Resend Code -->
        <div class="text-center">
          <p class="text-sm text-muted-foreground">
            <span v-if="countdown > 0">
              {{ countdown }}秒后可重新发送
            </span>
            <button 
              v-else
              @click="handleSendCode"
              class="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              重新发送验证码
            </button>
          </p>
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

    <!-- Help Section -->
    <div class="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
      <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
        <SafeIcon name="Info" :size="18" class="mr-2" />
        验证说明
      </h3>
      <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
        <li>• 验证码将通过短信发送到您的手机</li>
        <li>• 验证码有效期为5分钟</li>
        <li>• 请勿将验证码分享给他人</li>
        <li>• 如未收到验证码，请检查短信或垃圾箱</li>
      </ul>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-3">
      <Button 
        variant="outline" 
        class="flex-1"
        @click="$emit('back')"
        :disabled="isVerifying"
      >
        <SafeIcon name="ArrowLeft" :size="18" class="mr-2" />
        返回选择
      </Button>
      <Button 
        v-if="codeSent"
        class="flex-1"
        @click="handleVerify"
        :disabled="verificationCode.length !== 6 || isVerifying"
      >
        <SafeIcon v-if="!isVerifying" name="Check" :size="18" class="mr-2" />
        <div v-if="isVerifying" class="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin mr-2"></div>
        {{ isVerifying ? '验证中...' : '验证' }}
      </Button>
    </div>
  </div>
</template>
