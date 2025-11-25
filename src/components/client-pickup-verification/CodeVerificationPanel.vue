
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

const pickupCode = ref('')
const isVerifying = ref(false)

const handleVerify = async () => {
  if (!pickupCode.value.trim()) {
    emit('failure', '请输入取件码')
    return
  }

  isVerifying.value = true

  // Simulate verification delay
  setTimeout(() => {
    isVerifying.value = false
    
    // Mock verification logic - accept any 6-digit code
    if (pickupCode.value.length === 6 && /^\d+$/.test(pickupCode.value)) {
      emit('success', `取件码 ${pickupCode.value} 验证成功，正在检索您的快件...`)
    } else {
      emit('failure', '取件码格式不正确，请输入6位数字')
    }
  }, 1500)
}

const handleInputChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  // Only allow digits
  input.value = input.value.replace(/[^\d]/g, '').slice(0, 6)
  pickupCode.value = input.value
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleVerify()
  }
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold text-foreground">取件码验证</h2>

    <!-- Code Input Section -->
    <div class="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-8 border border-primary/10">
      <div class="text-center mb-6">
        <SafeIcon name="KeyRound" :size="48" class="text-primary mx-auto mb-4" />
        <p class="text-muted-foreground">请输入您收到的6位取件码</p>
      </div>

      <!-- Code Input -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-foreground mb-2">取件码</label>
          <Input
            v-model="pickupCode"
            type="text"
            placeholder="输入6位数字"
            maxlength="6"
            class="text-center text-2xl font-mono tracking-widest"
            @input="handleInputChange"
            @keydown="handleKeyDown"
            :disabled="isVerifying"
          />
          <p class="text-xs text-muted-foreground mt-2">
            {{ pickupCode.length }}/6
          </p>
        </div>

        <!-- Visual Code Display -->
        <div class="flex justify-center gap-2">
          <div
            v-for="(digit, index) in 6"
            :key="index"
            class="w-12 h-12 rounded-lg border-2 border-border flex items-center justify-center font-bold text-lg transition-all"
            :class="index < pickupCode.length ? 'border-primary bg-primary/10 text-primary' : 'bg-muted'"
          >
            {{ pickupCode[index] || '' }}
          </div>
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
        取件码说明
      </h3>
      <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
        <li>• 取件码由6位数字组成</li>
        <li>• 取件码在快件入库时生成</li>
        <li>• 您可以在短信或邮件中查看取件码</li>
        <li>• 取件码有效期为30天</li>
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
        class="flex-1"
        @click="handleVerify"
        :disabled="pickupCode.length !== 6 || isVerifying"
      >
        <SafeIcon v-if="!isVerifying" name="Check" :size="18" class="mr-2" />
        <div v-if="isVerifying" class="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin mr-2"></div>
        {{ isVerifying ? '验证中...' : '验证' }}
      </Button>
    </div>
  </div>
</template>

<style scoped>
input::placeholder {
  letter-spacing: 0.1em;
}
</style>
