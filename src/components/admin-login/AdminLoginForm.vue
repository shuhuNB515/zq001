
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon.vue'

interface LoginForm {
  username: string
  password: string
}

const form = ref<LoginForm>({
  username: '',
  password: ''
})

const isLoading = ref(false)
const error = ref('')
const showPassword = ref(false)

// Mock admin credentials for demo
const MOCK_ADMIN = {
  username: 'admin',
  password: 'admin123'
}

const handleSubmit = async () => {
  error.value = ''
  
  // Validation
  if (!form.value.username.trim()) {
    error.value = '请输入管理员账号'
    return
  }
  
  if (!form.value.password) {
    error.value = '请输入密码'
    return
  }
  
  isLoading.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Mock authentication
  if (form.value.username === MOCK_ADMIN.username && form.value.password === MOCK_ADMIN.password) {
    // Success - redirect to admin dashboard
    if (typeof window !== 'undefined') {
      window.location.href = './admin-dashboard.html'
    }
  } else {
    error.value = '账号或密码错误，请重试'
    isLoading.value = false
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleSubmit()
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6 w-full max-w-md">
    <!-- Error Alert -->
    <Alert v-if="error" variant="destructive" class="border-destructive/50 bg-destructive/10">
      <SafeIcon name="AlertCircle" :size="16" class="text-destructive" />
      <AlertDescription class="text-destructive">
        {{ error }}
      </AlertDescription>
    </Alert>

    <!-- Username Field -->
    <div class="space-y-2">
      <Label for="username" class="text-base font-medium">
        管理员账号
      </Label>
      <div class="relative">
        <Input
          id="username"
          v-model="form.username"
          type="text"
          placeholder="请输入您的账号"
          class="pl-10 h-12 text-base"
          :disabled="isLoading"
          @keydown="handleKeyDown"
        />
        <SafeIcon 
          name="User" 
          :size="18" 
          class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
      </div>
      <p class="text-xs text-muted-foreground mt-1">
        演示账号：admin
      </p>
    </div>

    <!-- Password Field -->
    <div class="space-y-2">
      <Label for="password" class="text-base font-medium">
        密码
      </Label>
      <div class="relative">
        <Input
          id="password"
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="请输入您的密码"
          class="pl-10 pr-10 h-12 text-base"
          :disabled="isLoading"
          @keydown="handleKeyDown"
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
      <p class="text-xs text-muted-foreground mt-1">
        演示密码：admin123
      </p>
    </div>

    <!-- Remember Me & Forgot Password -->
    <div class="flex items-center justify-between text-sm">
      <label class="flex items-center space-x-2 cursor-pointer">
        <input 
          type="checkbox" 
          class="w-4 h-4 rounded border-border bg-background cursor-pointer"
          :disabled="isLoading"
        />
        <span class="text-muted-foreground">记住我</span>
      </label>
      <a 
        href="#forgot" 
        class="text-primary hover:text-accent transition-colors font-medium"
      >
        忘记密码？
      </a>
    </div>

    <!-- Submit Button -->
    <Button
      type="submit"
      class="w-full h-12 text-base font-semibold"
      :disabled="isLoading"
    >
      <SafeIcon 
        v-if="isLoading"
        name="Loader2" 
        :size="18" 
        class="mr-2 animate-spin"
      />
      <span v-else>登录</span>
    </Button>

    <!-- Security Notice -->
    <div class="p-4 bg-accent/10 rounded-lg border border-accent/20">
      <div class="flex items-start space-x-3">
        <SafeIcon 
          name="Shield" 
          :size="18" 
          class="text-accent mt-0.5 flex-shrink-0"
        />
        <div class="text-sm text-muted-foreground">
          <p class="font-medium text-foreground mb-1">安全提示</p>
          <p>请勿在公共计算机上勾选"记住我"，确保您的账户安全。</p>
        </div>
      </div>
    </div>
  </form>
</template>
