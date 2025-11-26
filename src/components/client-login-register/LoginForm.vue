
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SafeIcon from '@/components/common/SafeIcon.vue'

const emit = defineEmits<{
  success: []
}>()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  
  // Validation
  if (!email.value || !password.value) {
    errorMessage.value = '请填写所有字段'
    return
  }

  if (!email.value.includes('@')) {
    errorMessage.value = '请输入有效的邮箱地址'
    return
  }

  isLoading.value = true

  // Simulate API call
  setTimeout(() => {
    isLoading.value = false
    // Mock successful login
    emit('success')
  }, 1000)
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleLogin()
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin" class="space-y-4">
    <!-- Email Field -->
    <div class="space-y-2">
      <Label for="email" class="text-sm font-medium">邮箱地址</Label>
      <div class="relative">
        <Input
          id="email"
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
      <Label for="password" class="text-sm font-medium">密码</Label>
      <div class="relative">
        <Input
          id="password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="请输入密码"
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

    <!-- Error Message -->
    <div v-if="errorMessage" class="p-3 bg-destructive/10 border border-destructive/30 rounded-md">
      <p class="text-sm text-destructive flex items-center">
        <SafeIcon name="AlertCircle" :size="16" class="mr-2" />
        {{ errorMessage }}
      </p>
    </div>

    <!-- Remember & Forgot -->
    <div class="flex items-center justify-between text-sm">
      <label class="flex items-center space-x-2 cursor-pointer">
        <input type="checkbox" class="w-4 h-4 rounded border-border" />
        <span class="text-muted-foreground">记住我</span>
      </label>
      <a href="#" class="text-primary hover:underline">忘记密码？</a>
    </div>

    <!-- Login Button -->
    <Button 
      type="submit" 
      class="w-full h-10 text-base font-medium"
      :disabled="isLoading"
    >
      <SafeIcon v-if="isLoading" name="Loader2" :size="18" class="mr-2 animate-spin" />
      {{ isLoading ? '登录中...' : '登录' }}
    </Button>

    <!-- Divider -->
    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-border"></div>
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">或</span>
      </div>
    </div>

    <!-- Social Login -->
    <div class="grid grid-cols-2 gap-3">
      <Button 
        type="button" 
        variant="outline" 
        class="h-10"
        :disabled="isLoading"
      >
        <SafeIcon name="ScanFace" :size="18" class="mr-2" />
        <span class="hidden sm:inline">人脸登录</span>
        <span class="sm:hidden">人脸</span>
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        class="h-10"
        :disabled="isLoading"
      >
        <SafeIcon name="Smartphone" :size="18" class="mr-2" />
        <span class="hidden sm:inline">手机登录</span>
        <span class="sm:hidden">手机</span>
      </Button>
    </div>
  </form>
</template>
