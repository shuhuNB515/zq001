
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import SafeIcon from '@/components/common/SafeIcon.vue'

const emit = defineEmits<{
  success: []
}>()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const validateForm = (): boolean => {
  errorMessage.value = ''

  if (!username.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = '请填写所有字段'
    return false
  }

  if (username.value.length < 3) {
    errorMessage.value = '用户名至少需要3个字符'
    return false
  }

  if (!email.value.includes('@')) {
    errorMessage.value = '请输入有效的邮箱地址'
    return false
  }

  if (password.value.length < 6) {
    errorMessage.value = '密码至少需要6个字符'
    return false
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = '两次输入的密码不一致'
    return false
  }

  if (!agreeTerms.value) {
    errorMessage.value = '请同意服务条款和隐私政策'
    return false
  }

  return true
}

const handleRegister = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true
  successMessage.value = ''

  // Simulate API call
  setTimeout(() => {
    isLoading.value = false
    successMessage.value = '注册成功！正在跳转...'
    
    // Redirect after 1.5 seconds
    setTimeout(() => {
      emit('success')
    }, 1500)
  }, 1000)
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !isLoading.value) {
    handleRegister()
  }
}
</script>

<template>
  <form @submit.prevent="handleRegister" class="space-y-4">
    <!-- Username Field -->
    <div class="space-y-2">
      <Label for="username" class="text-sm font-medium">用户名</Label>
      <div class="relative">
        <Input
          id="username"
          v-model="username"
          type="text"
          placeholder="请输入用户名"
          class="pl-10"
          @keydown="handleKeyDown"
          :disabled="isLoading"
        />
        <SafeIcon 
          name="User" 
          :size="18" 
          class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
      </div>
    </div>

    <!-- Email Field -->
    <div class="space-y-2">
      <Label for="reg-email" class="text-sm font-medium">邮箱地址</Label>
      <div class="relative">
        <Input
          id="reg-email"
          v-model="email"
          type="email"
          placeholder="请输入邮箱地址"
          class="pl-10"
          @keydown="handleKeyDown"
          :disabled="isLoading"
        />
        <SafeIcon 
          name="Mail" 
          :size="18" 
          class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
      </div>
    </div>

    <!-- Password Field -->
    <div class="space-y-2">
      <Label for="reg-password" class="text-sm font-medium">密码</Label>
      <div class="relative">
        <Input
          id="reg-password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="请输入密码（至少6个字符）"
          class="pl-10 pr-10"
          @keydown="handleKeyDown"
          :disabled="isLoading"
        />
        <SafeIcon 
          name="Lock" 
          :size="18" 
          class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <button
          type="button"
          @click="showPassword = !showPassword"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          :disabled="isLoading"
        >
          <SafeIcon 
            :name="showPassword ? 'EyeOff' : 'Eye'" 
            :size="18"
          />
        </button>
      </div>
    </div>

    <!-- Confirm Password Field -->
    <div class="space-y-2">
      <Label for="confirm-password" class="text-sm font-medium">确认密码</Label>
      <div class="relative">
        <Input
          id="confirm-password"
          v-model="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="请再次输入密码"
          class="pl-10 pr-10"
          @keydown="handleKeyDown"
          :disabled="isLoading"
        />
        <SafeIcon 
          name="Lock" 
          :size="18" 
          class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <button
          type="button"
          @click="showConfirmPassword = !showConfirmPassword"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          :disabled="isLoading"
        >
          <SafeIcon 
            :name="showConfirmPassword ? 'EyeOff' : 'Eye'" 
            :size="18"
          />
        </button>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="p-3 bg-destructive/10 border border-destructive/30 rounded-md">
      <p class="text-sm text-destructive flex items-center">
        <SafeIcon name="AlertCircle" :size="16" class="mr-2" />
        {{ errorMessage }}
      </p>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="p-3 bg-green-50 border border-green-200 rounded-md">
      <p class="text-sm text-green-700 flex items-center">
        <SafeIcon name="CheckCircle2" :size="16" class="mr-2" />
        {{ successMessage }}
      </p>
    </div>

    <!-- Terms & Conditions -->
    <div class="flex items-start space-x-2 pt-2">
      <Checkbox 
        id="terms" 
        v-model:checked="agreeTerms"
        :disabled="isLoading"
        class="mt-1"
      />
      <label for="terms" class="text-sm text-muted-foreground cursor-pointer leading-relaxed">
        我同意
        <a href="#" class="text-primary hover:underline">服务条款</a>
        和
        <a href="#" class="text-primary hover:underline">隐私政策</a>
      </label>
    </div>

    <!-- Register Button -->
    <Button 
      type="submit" 
      class="w-full h-10 text-base font-medium mt-6"
      :disabled="isLoading"
    >
      <SafeIcon v-if="isLoading" name="Loader2" :size="18" class="mr-2 animate-spin" />
      {{ isLoading ? '注册中...' : '创建账户' }}
    </Button>

    <!-- Login Link -->
    <p class="text-center text-sm text-muted-foreground pt-2">
      已有账户？
      <button 
        type="button"
        class="text-primary hover:underline font-medium"
        @click="$emit('switch-to-login')"
      >
        立即登录
      </button>
    </p>
  </form>
</template>
